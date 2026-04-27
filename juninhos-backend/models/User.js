const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    // Define o esquema para a coleção de usuários, que é usada para armazenar informações sobre os usuários do sistema
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    },
    createdAt: { type: Date, required: true, default: Date.now }
});

UserSchema.pre('save', async function (next) {
    // Middleware para hash da senha antes de salvar o usuário no banco de dados, garantindo segurança das senhas armazenadas

    if (!this.isModified('password')) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    // Método para comparar a senha fornecida pelo usuário com a senha armazenada no banco de dados, usado para autenticação
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
