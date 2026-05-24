const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Resend } = require('resend');
const User = require('../models/User');

const generateToken = (userId) =>
    jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });

const RESET_BASE_URL =
    process.env.RESET_PASSWORD_URL || 'http://localhost:5173/reset-password';

const authController = {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res
                    .status(400)
                    .json({ error: 'Todos os campos são obrigatórios.' });
            }

            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ error: 'E-mail já cadastrado.' });
            }

            const newUser = await User.create({ name, email, password });
            return res.status(201).json({
                message: 'Usuário registrado com sucesso.',
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            });
        } catch (error) {
            console.error('Erro register:', error.message);
            return res
                .status(500)
                .json({ error: 'Erro ao registrar usuário.' });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ error: 'E-mail e senha são obrigatórios.' });
            }

            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                return res
                    .status(401)
                    .json({ error: 'E-mail ou senha inválidos.' });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res
                    .status(401)
                    .json({ error: 'E-mail ou senha inválidos.' });
            }

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
            console.error('Erro login:', error.message);
            return res.status(500).json({ error: 'Erro ao fazer login.' });
        }
    },

    async forgotPassword(req, res) {
        let userRef = null;
        try {
            const user = await User.findOne({ email: req.body.email });
            // Não revela existência do email.
            if (!user) {
                return res.status(200).json({
                    message:
                        'Se o e-mail estiver cadastrado, um link de redefinição foi enviado.'
                });
            }
            userRef = user;

            const rawToken = user.createPasswordResetToken();
            await user.save({ validateBeforeSave: false });

            const resetURL = `${RESET_BASE_URL}?token=${rawToken}`;

            if (process.env.RESEND_API_KEY) {
                const resend = new Resend(process.env.RESEND_API_KEY);
                await resend.emails.send({
                    from: 'Juninhos <contato@juninhos.com>',
                    to: [user.email],
                    subject: 'Redefinição de Senha - Portal Juninhos',
                    text:
                        `Olá, ${user.name}!\n\n` +
                        `Você solicitou a redefinição da sua senha.\n` +
                        `Clique no link abaixo para criar uma nova senha (este link expira em 1 hora):\n\n` +
                        `${resetURL}\n\n` +
                        `Se você não solicitou isso, ignore este e-mail.`
                });
            }

            return res.status(200).json({
                message:
                    'Se o e-mail estiver cadastrado, um link de redefinição foi enviado.'
            });
        } catch (error) {
            console.error('Erro forgotPassword:', error.message);
            if (userRef) {
                userRef.passwordResetToken = undefined;
                userRef.passwordResetExpires = undefined;
                try {
                    await userRef.save({ validateBeforeSave: false });
                } catch (_) {
                    /* ignore */
                }
            }
            return res
                .status(500)
                .json({
                    error: 'Erro ao enviar o e-mail. Tente novamente mais tarde.'
                });
        }
    },

    async resetPassword(req, res) {
        try {
            const { password } = req.body;
            if (!password || password.length < 6) {
                return res
                    .status(400)
                    .json({ error: 'Senha deve ter no mínimo 6 caracteres.' });
            }

            const hashedToken = crypto
                .createHash('sha256')
                .update(req.params.token)
                .digest('hex');
            const user = await User.findOne({
                passwordResetToken: hashedToken,
                passwordResetExpires: { $gt: Date.now() }
            }).select('+passwordResetToken +passwordResetExpires');

            if (!user) {
                return res
                    .status(400)
                    .json({ error: 'Token inválido ou expirado.' });
            }

            user.password = password;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save();

            const token = generateToken(user._id);
            return res.json({
                message: 'Senha redefinida com sucesso.',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            console.error('Erro resetPassword:', error.message);
            return res.status(500).json({ error: 'Erro ao redefinir senha.' });
        }
    }
};

module.exports = authController;
