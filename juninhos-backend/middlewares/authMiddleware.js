const jwt = require('jsonwebtoken');

// Middleware de autenticação para proteger rotas que exigem autenticação, verificando a presença e validade do token JWT
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verifica se o token de autenticação está presente no cabeçalho da requisição
    if (!authHeader) {
        return res
            .status(401)
            .json({
                error: 'ACESSO NEGADO. Token de autenticação não fornecido.'
            });
    }

    // Extrai o token do cabeçalho (formato "Bearer <token>")
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res
            .status(401)
            .json({ error: 'ACESSO NEGADO. Token mal formado.' });
    }

    try {
        // Verifica a validade do token usando a chave secreta definida nas variáveis de ambiente
        const JWT_SECRET = process.env.JWT_SECRET;
        const verified = jwt.verify(token, JWT_SECRET);

        // Se o token for válido, adiciona as informações do usuário à requisição e chama o próximo middleware ou rota
        req.user = verified;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({
                error: 'ACESSO NEGADO. Token de autenticação inválido ou expirado.'
            });
    }
};

module.exports = authMiddleware;
