const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nome é obrigatório'],
            trim: true,
            minlength: [2, 'Mínimo 2 caracteres']
        },
        email: {
            type: String,
            required: [true, 'E-mail é obrigatório'],
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
        cpf: {
            type: String,
            required: [true, 'CPF é obrigatório'],
            unique: true,
            match: [
                /^\d{11}$/,
                'O CPF deve conter exatamente 11 números, sem pontos ou traços'
            ]
        },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'user'],
            default: 'user'
        },
        passwordResetToken: { type: String, select: false },
        passwordResetExpires: { type: Date, select: false }
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Token criptograficamente seguro + hash SHA-256 do mesmo armazenado no banco.
// Retorna o token RAW (vai no e-mail). Apenas o hash fica persistido se vazar
// o DB, ninguém consegue resetar senha sem o token original.
UserSchema.methods.createPasswordResetToken = function () {
    const rawToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(rawToken)
        .digest('hex');
    this.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1h
    return rawToken;
};

module.exports = mongoose.model('User', UserSchema);
