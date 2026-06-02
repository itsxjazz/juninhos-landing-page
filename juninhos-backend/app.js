if (typeof fetch === 'undefined') {
    const fetch = require('node-fetch');
    global.fetch = fetch;
    global.Headers = fetch.Headers;
    global.Request = fetch.Request;
    global.Response = fetch.Response;
}
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const Waitlist = require('./models/Waitlist');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { // Configurações de conexão para evitar timeouts
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
})
    .then(() => {})
    .catch(err => {
        console.error('❌ Erro ao conectar ao MongoDB:', err.message);
        // Dica de conexão suprimida em produção
    });

// Diagnóstico de Ambiente suprimido em produção

const auth = new google.auth.GoogleAuth({ // Configurações para autenticação com a API do Google Sheets
    credentials: process.env.GOOGLE_CREDENTIALS
        ? JSON.parse(process.env.GOOGLE_CREDENTIALS)
        : undefined,
    keyFile: !process.env.GOOGLE_CREDENTIALS
        ? path.join(__dirname, 'credentials.json')
        : undefined,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

async function getSheetsClient() { // Função para obter o cliente autenticado do Google Sheets
    const authClient = await auth.getClient();
    return google.sheets({ version: 'v4', auth: authClient });
}

async function getSheetData(range) { // Função para buscar dados da planilha de projetos e aulas, com tratamento de erros 
    try {
        const sheets = await getSheetsClient();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: range,
        });
        return response.data.values || [];
    } catch (error) {
        console.error(`Erro ao buscar dados da planilha (${range}):`, error.message);
        if (error.message.includes('Method doesn\'t allow unregistered callers')) {
        }
        return [];
    }
}

/* 
const transporter = nodemailer.createTransport({ // Configurações para envio de e-mails usando o Nodemailer
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true para porta 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    family: 4 // Insiste no IPv4
});
*/

const resend = new Resend(process.env.RESEND_API_KEY);

app.get('/api/projects', async (req, res) => { // Endpoint para buscar os projetos da planilha, com tratamento de erros e resposta adequada
    try {
        const rows = await getSheetData('Gestão de Projetos!A2:I');
        const projects = rows
            .filter(row => row[0])
            .map(row => ({
                titulo: row[0] || 'Sem título',
                descricao_simples: row[1] || '',
                descricao_detalhada: row[2] || '',
                status: row[3] || 'Em andamento',
                links: {
                    imagem: row[4] || '',
                    deploy: row[5] || '',
                    github: row[6] || '',
                },
                stack: row[7] ? row[7].split(',').map(s => s.trim()) : [],
                membros: row[8] ? row[8].split(',').map(m => m.trim()) : [],
            }));
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar projetos' });
    }
});

app.get('/api/classes', async (req, res) => {
    try {
        const rows = await getSheetData('Gestão de Aula!A2:G');
        const classes = rows
            .filter(row => row[0]) // Ignora linhas sem título
            .map(row => ({
                titulo: row[0] || 'Sem título',
                desc: row[1] || '',
                mentor: row[2] || '',
                data: row[3] || '',
                status: row[4] || 'Próxima',
                canal: row[5] || '',
                tema: row[6] || '',
            }));
        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar aulas' });
    }
});

app.get('/api/supporters', async (req, res) => {
    try {
        const rows = await getSheetData('Apoiadores!A2:E');
        const supporters = rows
            .filter(row => row[0]) // Ignora linhas sem nome
            .map(row => ({
                name: row[0] || 'Apoiador Anônimo',
                github: row[1] || '',
                portfolio: row[2] || '',
                linkedin: row[3] || '',
                // tier: row[4] || '', // Comentado por enquanto 
            }));
        res.json(supporters);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar apoiadores' });
    }
});

app.post('/api/waitlist', async (req, res) => { // Endpoint para processar a inscrição na lista de espera
    try {
        const { name, phone, level, areas, technologies } = req.body;

        res.status(201).json({ message: 'Inscrição realizada com sucesso! Nossa equipe logo entrará em contato.' });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.NOTIFY_EMAIL,
            subject: 'Novo Interessado na Juninhos!',
            text: `Novo cadastro realizado!\n\n` +
                `Nome: ${name}\n` +
                `Telefone: ${phone}\n` +
                `Nível: ${level}\n` +
                `Áreas: ${areas.join(', ')}\n` +
                `Tecnologias: ${technologies}`,
        };

        /*
        transporter.sendMail(mailOptions, (error, info) => { // Callback para logar o resultado do envio de e-mail
            if (error) console.error(' Erro ao enviar e-mail:', error);
            else console.log('E-mail enviado com sucesso:', info.response);
        });
        */

        resend.emails.send({
            from: 'Juninhos <contato@juninhos.com>',
            to: ['contato@juninhos.com', 'juninhosdevs@gmail.com'],
            subject: mailOptions.subject,
            text: mailOptions.text
        }).then(() => {})
            .catch(err => console.error('Erro Resend:', err.message));

        const newLead = new Waitlist({ name, phone, level, areas, technologies });
        newLead.save()
            .then(() => {})
            .catch(err => console.error('Erro MongoDB:', err.message));

    } catch (error) {
        console.error('Erro crítico:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Erro ao processar sua inscrição.' });
        }
    }
});

app.post('/api/instructor', async (req, res) => {
    try {
        const { name, discord, whatsapp, theme, title, description, level, days, shift, support } = req.body;

        res.status(201).json({ message: 'Sua proposta de aula foi enviada! A liderança entrará em contato em breve.' });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.NOTIFY_EMAIL,
            subject: 'Nova Proposta de Aula!',
            text: `Um novo membro quer dar aula!\n\n` +
                `--- Perfil ---\n` +
                `Nome: ${name}\n` +
                `Discord: ${discord}\n` +
                `WhatsApp: ${whatsapp}\n\n` +
                `--- Aula ---\n` +
                `Tema: ${theme}\n` +
                `Título: ${title}\n` +
                `O que será ensinado: ${description}\n` +
                `Nível: ${level}\n\n` +
                `--- Organização ---\n` +
                `Dias: ${days.join(', ')}\n` +
                `Turno: ${shift}\n` +
                `Suporte necessário: ${support}`
        };

        /*
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.error(' Erro ao enviar e-mail de instrutor:', error);
            else console.log('E-mail de instrutor enviado:', info.response);
        });
        */

        resend.emails.send({
            from: 'Juninhos <contato@juninhos.com>',
            to: ['educacional@juninhos.com', 'juninhosdevs@gmail.com', 'juninhosedu@gmail.com'],
            subject: mailOptions.subject,
            text: mailOptions.text
        }).then(() => {})
            .catch(err => console.error('Erro Resend:', err.message));

    } catch (error) {
        console.error('Erro no endpoint de instrutor:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Erro ao enviar proposta.' });
        }
    }
});

const PORT = process.env.PORT || 5000; // Inicia o servidor na porta definida nas variáveis de ambiente ou na porta 5000 por padrão
app.listen(PORT, () => {
});
