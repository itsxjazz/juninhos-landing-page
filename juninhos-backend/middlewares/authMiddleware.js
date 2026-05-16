const jwt = require('jsonwebtoken');

// Middleware de autenticação para proteger rotas que exigem autenticação, verificando a presença e validade do token JWT
const authMiddleware = {
    protect: async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            // Verifica se o token de autenticação está presente no cabeçalho da requisição
            // e se começa com 'Bearer '
            if (authHeader && authHeader.startsWith('Bearer ')) {
                // Extrai o token do cabeçalho (formato "Bearer <token>")
                const token = authHeader.split(' ')[1];
            }

            // Valida se o token foi extraído corretamente
            if (!token) {
                return res.status(401).json({
                    message: 'Acesso NEGADO. Token não fornecido.'
                });
            }

            // Verifica se é válido ou não expirado e decodifica o token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Busca usuário no banco
            // Verificando para caso tenha sido deletado ou desativado
            const user = await User.findById(decoded.sub).select('-password');

            // Valida se encontrou o usuário
            if (!user) {
                return res.status(401).json({
                    message: 'Usuário não encontrado.'
                });
            }

            // Se o token for válido, adiciona as informações do usuário à requisição e chama o próximo middleware ou rota
            req.user = verified;
            next();
        } catch (error) {
            if (err.name == 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado' });
            }

            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Token inválido' });
            }
            res.status(500).json({ message: 'Erro interno' });
        }
    },

    authorize: (...roles) => {
        return (req, res, next) => {
            //Como o protect rodou antes, req.user existe aqui
            //O roles.includes verifica se o cargo do usuário está na lista
            // de cargos permitidos
            if (!roles.includes(req.user.role)) {
                return res
                    .status(403)
                    .json({ error: 'Permissão negada. Acesso restrito.' });
            }
            next();
        };
    }
};

module.exports = authMiddleware;
