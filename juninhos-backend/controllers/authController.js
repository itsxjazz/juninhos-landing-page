const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Chave secreta para assinatura dos tokens JWT, armazenada em variável de ambiente para segurança
const JWT_SECRET = process.env.JWT_SECRET;

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

            // Remove a senha do objeto de resposta para segurança
            newUser.password = undefined;
            return res
                .status(201)
                .json({
                    message: 'Usuário registrado com sucesso.',
                    user: newUser
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

            // Verifica se o usuário existe no banco de dados
            const user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(401)
                    .json({ error: 'E-mail ou senha inválidos.' });
            }

            // Verifica se a senha fornecida é válida
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res
                    .status(401)
                    .json({ error: 'E-mail ou senha inválidos.' });
            }

            // Gera um token JWT para o usuário autenticado
            const token = jwt.sign({ id: user._id }, JWT_SECRET, {
                expiresIn: '1d'
            });

            return res.json({ message: 'Login bem-sucedido.', token });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao fazer login.' });
        }
    }
};

module.exports = authController;
