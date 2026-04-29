const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Helper - Geração do token centralizada
const generateToken = (userId) => {
    return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });
};

const authController = {
    // Cadastro de usuário
    async register(req, res) {
        try {
            const { email, password } = req.body;

            // Verifica se o usuário já existe no banco de dados
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ error: 'E-mail já cadastrado.' });
            }

            // Cria um novo usuário e salva no banco de dados
            const newUser = await User.create({ email, password });

            // Gerar jwt
            const token = generateToken(user._id);

            return res.status(201).json({
                token,
                message: 'Usuário registrado com sucesso.',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            return res
                .status(500)
                .json({ error: 'Erro ao registrar usuário.' });
        }
    },

    // Login de usuário
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validação de campos preenchidos
            if (!email || !password) {
                return res.status(400).json({
                    message: 'E-mail e senha são obrigatórios.'
                });
            }

            // Verifica se o usuário existe no banco de dados
            const user = await User.findOne({ email }.select('+password'));
            if (!user) {
                return res
                    .status(401)
                    .json({ error: 'E-mail ou senha inválidos.' });
            }

            // Verifica se a senha fornecida é válida
            const isMatch = await user.comparePassword(password);
            if (!user || !isMatch) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            // Gera um token JWT para o usuário autenticado
            const token = generateToken(user._id);

            return res.json({
                message: 'Login bem-sucedido.',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao fazer login.' });
        }
    },

    async forgotPassword(req, res) {
        // Busca usuário por email
        const user = await User.findOne({ email: req.body.email });

        // Valida se existe usuário com o email
        if (!user) {
            return res.status(401).json({
                message: 'Email não encontrado'
            });
        }

        const rawToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });

        // Envia email aqui
        res.json({ message: 'Email enviado' });
    },

    async ResetPassword(req, res) {
        // Refaz o hash do token recebido para comparar com o banco
        const hashedToken = bcrypt.hash(req.params.token, 10);

        // Busca usuario com o token hasheado
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        }).select('+passwordResetToken +passwordResetExpires');

        // Valida se encontrou usuário com o token
        if (!user) {
            return res
                .status(400)
                .json({ message: 'Token inválido ou expirado' });
        }

        // Troca a senha e limpa o token de reset
        user.password = req.body.passowrd;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // Já loga o usuário novamente com um jwt novo
        const token = generateToken(user._id);
        res.json({ token });
    }
};

module.exports = authController;
