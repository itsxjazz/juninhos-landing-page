const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
    {
        // Define o esquema para a coleção de usuários, que é usada para armazenar informações sobre os usuários do sistema
        name: {
            type: String,
            required: [true, 'Nome é obrigatório'],
            trim: true,
            minlength: [2, 'Mínimo 2 caracteres']
        },
        email: {
            type: String,
            required: [, 'E-mail é obrigatório'],
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Email inválido']
        },
        password: {
            type: String,
            required: [true, 'Senha é obrigatória'],
            minlength: [6, 'Mínimo 6 caracteres'],
            select: false
        },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'user'],
            default: 'user'
        },
        passwordResetToken: {
            type: String,
            select: false
        },
        passwordResetExpires: {
            type: Date,
            select: false
        }
    },
    // Cria createdAt e UpdatedAt
    { timestamps: true }
);

UserSchema.pre('save', async function () {
    // Middleware para hash da senha antes de salvar o usuário no banco de dados, garantindo segurança das senhas armazenadas
    if (!this.isModified('password')) return;

    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        console.loeg(error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    // Método para comparar a senha fornecida pelo usuário com a senha armazenada no banco de dados, usado para autenticação
    return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.createPasswordResetToken = function () {
    // Token aleatório
    const rawToken = crypto.randomBytes(32).toString('hex');

    // Hash do token
    this.passwordResetToken = bcrypt.hash(this.rawToken, 10);

    //Expira em 10 minutos
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    // Retorna o token puro - que vai no email
    return rawToken;
};

// UserSchema.methods.sendEmailPasswordRest = async function ()
module.exports = mongoose.model('User', UserSchema);
