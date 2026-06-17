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
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
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

app.post('/api/project-registration', async (req, res) => {
    try {
        const { teamName, description, leaderIndex, members } = req.body;

        if (!teamName || !description || !members || !Array.isArray(members) || members.length < 3) {
            return res.status(400).json({ error: 'Dados inválidos. A equipe deve conter pelo menos 3 integrantes.' });
        }

        const leader = members[leaderIndex] || members[0];

        // 1. Integração com Google Sheets - Criação de aba, escrita de dados e tratamento de erros
        try {
            const sheets = await getSheetsClient();
            const spreadsheetId = process.env.GOOGLE_SHEET_ID;
            const sheetName = 'Inscrições Hackathon';

            // Verifica se a aba ja existe, se não existir, cria uma nova aba para as inscrições
            let metadata;
            try {
                metadata = await sheets.spreadsheets.get({ spreadsheetId });
            } catch (err) {
                console.error('Erro ao ler metadados da planilha:', err.message);
                throw err;
            }

            const sheetExists = metadata.data.sheets.some(s => s.properties.title === sheetName);

            if (!sheetExists) {
                await sheets.spreadsheets.batchUpdate({
                    spreadsheetId,
                    resource: {
                        requests: [
                            {
                                addSheet: {
                                    properties: {
                                        title: sheetName
                                    }
                                }
                            }
                        ]
                    }
                });
            }

            // Lê os dados atuais da aba para verificar se os cabeçalhos já existem, se não existirem, escreve os cabeçalhos na primeira linha
            const range = `${sheetName}!A1:AG`;
            let rows = [];
            try {
                const sheetData = await sheets.spreadsheets.values.get({ spreadsheetId, range });
                rows = sheetData.data.values || [];
            } catch (err) {
                console.log('Criando cabeçalhos na nova aba...');
            }

            const headers = [
                'Carimbo de data/hora',
                'Nome da Equipe / Projeto',
                'Descrição do Projeto',
                'Nome do Líder',
                'E-mail do Líder',
                'Telefone do Líder',
                'GitHub do Líder',
                'LinkedIn do Líder',
                'Discord do Líder',
                'Integrante 1 - Nome Completo',
                'Integrante 1 - E-mail',
                'Integrante 1 - Telefone',
                'Integrante 1 - GitHub',
                'Integrante 1 - LinkedIn',
                'Integrante 1 - Discord',
                'Integrante 2 - Nome Completo',
                'Integrante 2 - E-mail',
                'Integrante 2 - Telefone',
                'Integrante 2 - GitHub',
                'Integrante 2 - LinkedIn',
                'Integrante 2 - Discord',
                'Integrante 3 - Nome Completo',
                'Integrante 3 - E-mail',
                'Integrante 3 - Telefone',
                'Integrante 3 - GitHub',
                'Integrante 3 - LinkedIn',
                'Integrante 3 - Discord',
                'Integrante 4 - Nome Completo',
                'Integrante 4 - E-mail',
                'Integrante 4 - Telefone',
                'Integrante 4 - GitHub',
                'Integrante 4 - LinkedIn',
                'Integrante 4 - Discord'
            ];

            if (rows.length === 0) {
                await sheets.spreadsheets.values.update({
                    spreadsheetId,
                    range: `${sheetName}!A1`,
                    valueInputOption: 'RAW',
                    resource: { values: [headers] }
                });
            }

            const timestamp = new Date().toISOString();
            const rowData = [
                timestamp,
                teamName,
                description,
                leader.fullName,
                leader.email,
                leader.phone,
                leader.github,
                leader.linkedin,
                leader.discord
            ];

            for (let i = 0; i < 4; i++) {
                const m = members[i];
                if (m) {
                    rowData.push(m.fullName, m.email, m.phone, m.github, m.linkedin, m.discord);
                } else {
                    rowData.push('', '', '', '', '', '');
                }
            }

            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range: `${sheetName}!A:A`,
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                resource: { values: [rowData] }
            });

        } catch (sheetError) {
            console.error('Erro na integração com Google Sheets:', sheetError.message);
        }

        // 2. E-mail para a organização
        const orgHtml = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
            </head>
            <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #080628; color: #f2f2f2; margin: 0; padding: 0;">
                <div style="max-width: 600px; margin: 40px auto; background-color: #080628; border: 1px solid rgba(0, 229, 255, 0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);">
                    <div style="background-color: #080628; padding: 30px; text-align: center; border-bottom: 2px solid #00E5FF;">
                        <h1 style="color: #00E5FF; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1.5px;">Nova Inscrição Hackathon</h1>
                    </div>
                    <div style="padding: 30px; line-height: 1.6; color: #f2f2f2;">
                        <h2 style="color: #FFFFFF; font-size: 20px; margin-top: 0;">Uma nova equipe se inscreveu!</h2>
                        <div style="background: rgba(255, 255, 255, 0.03); border-left: 4px solid #00E5FF; padding: 15px; margin: 20px 0; border-radius: 4px;">
                            <p style="color: #f2f2f2; margin: 8px 0;"><strong style="color: #00E5FF;">Nome da Equipe:</strong> ${teamName}</p>
                            <p style="color: #f2f2f2; margin: 8px 0;"><strong style="color: #00E5FF;">Descrição do Projeto:</strong> ${description}</p>
                            <p style="color: #f2f2f2; margin: 8px 0;"><strong style="color: #00E5FF;">Líder da Equipe:</strong> ${leader.fullName} (${leader.email})</p>
                        </div>
                        <h3 style="color: #FFFFFF; font-size: 18px; margin-top: 20px;">Integrantes:</h3>
                        <ul style="margin: 15px 0; padding-left: 20px; color: #f2f2f2;">
                            ${members.map((m, idx) => {
                                const role = idx === leaderIndex ? ' (Líder)' : '';
                                return `<li style="margin-bottom: 8px; color: #f2f2f2;"><strong style="color: #00E5FF;">${m.fullName}${role}</strong> - E-mail: ${m.email} | Tel: ${m.phone} | GitHub: ${m.github} | Discord: ${m.discord}</li>`;
                            }).join('')}
                        </ul>
                    </div>
                    <div style="background-color: #080628; padding: 20px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid rgba(255, 255, 255, 0.05);">
                        Juninhos Platform Admin Notification
                    </div>
                </div>
            </body>
            </html>
        `;

        resend.emails.send({
            from: 'Juninhos <contato@juninhos.com>',
            to: ['juninhosdevs@gmail.com'],
            subject: `[Hackathon] Nova Inscrição: ${teamName}`,
            html: orgHtml
        }).catch(err => console.error('Erro Resend (Org Notification):', err.message));

        // E-mail para o líder da equipe com confirmação e detalhes, com tratamento de erros
        const leaderHtml = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
            </head>
            <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #080628; color: #f2f2f2; margin: 0; padding: 0;">
                <div style="max-width: 600px; margin: 40px auto; background-color: #080628; border: 1px solid rgba(0, 229, 255, 0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);">
                    <div style="background-color: #080628; padding: 30px; text-align: center; border-bottom: 2px solid #00E5FF;">
                        <h1 style="color: #00E5FF; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1.5px;">Juninhos Hackathon</h1>
                    </div>
                    <div style="padding: 30px; line-height: 1.6; color: #f2f2f2;">
                        <h2 style="color: #FFFFFF; font-size: 20px; margin-top: 0;">Olá, ${leader.fullName}!</h2>
                        <p style="color: #f2f2f2; margin: 16px 0;">Parabéns! A inscrição da sua equipe <strong style="color: #00E5FF;">${teamName}</strong> foi recebida com sucesso para o Juninhos Hackathon.</p>
                        
                        <div style="background: rgba(255, 255, 255, 0.03); border-left: 4px solid #00E5FF; padding: 15px; margin: 20px 0; border-radius: 4px;">
                            <p style="color: #f2f2f2; margin: 8px 0;"><strong style="color: #00E5FF;">Projeto:</strong> ${teamName}</p>
                            <p style="color: #f2f2f2; margin: 8px 0;"><strong style="color: #00E5FF;">Descrição:</strong> ${description}</p>
                            <p style="color: #f2f2f2; margin: 8px 0;"><strong style="color: #00E5FF;">Líder da Equipe:</strong> ${leader.fullName}</p>
                            <p style="color: #f2f2f2; margin: 8px 0;"><strong style="color: #00E5FF;">Total de Integrantes:</strong> ${members.length}</p>
                        </div>

                        <p style="color: #f2f2f2; margin: 16px 0;">Nossa equipe está analisando os dados e em breve enviaremos novas instruções sobre as próximas etapas, cronograma e links de acesso ao evento no Discord.</p>
                        
                        <p style="color: #f2f2f2; margin: 16px 0;">Se você precisar de qualquer alteração nos dados do time, entre em contato respondendo a este e-mail.</p>
                        
                        <center style="margin-top: 25px;">
                            <a href="https://discord.gg/3VmKgv8Yny" style="display: inline-block; padding: 12px 24px; background-color: #00E5FF; color: #080628; text-decoration: none; font-weight: bold; border-radius: 8px; transition: all 0.3s ease;">Entrar no Discord da Comunidade</a>
                        </center>
                    </div>
                    <div style="background-color: #080628; padding: 20px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid rgba(255, 255, 255, 0.05);">
                        Este é um e-mail automático enviado pela plataforma Juninhos.<br>
                        © 2026 Juninhos. Todos os direitos reservados.
                    </div>
                </div>
            </body>
            </html>
        `;

        resend.emails.send({
            from: 'Juninhos <contato@juninhos.com>',
            to: [leader.email],
            subject: `Inscrição Confirmada - ${teamName} | Juninhos Hackathon`,
            html: leaderHtml
        }).catch(err => console.error('Erro Resend (Leader confirmation):', err.message));

        res.status(201).json({ message: 'Inscrição realizada com sucesso! O líder receberá um e-mail de confirmação.' });

    } catch (error) {
        console.error('Erro crítico na inscrição de projeto:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Erro ao processar a inscrição do projeto.' });
        }
    }
});

const PORT = process.env.PORT || 5000; // Inicia o servidor na porta definida nas variáveis de ambiente ou na porta 5000 por padrão
app.listen(PORT, () => {
});
