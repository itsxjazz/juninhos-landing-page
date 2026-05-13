const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = {
    protect: async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            let token;

            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            }

            if (!token) {
                return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.sub).select('-password');
            if (!user) {
                return res.status(401).json({ error: 'Usuário não encontrado.' });
            }

            req.user = user;
            return next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expirado.' });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Token inválido.' });
            }
            console.error('Erro authMiddleware:', error.message);
            return res.status(500).json({ error: 'Erro interno na autenticação.' });
        }
    },

    authorize: (...roles) => (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Permissão negada. Acesso restrito.' });
        }
        return next();
    }
};

module.exports = authMiddleware;
