const mongoose = require('mongoose');

const WaitlistSchema = new mongoose.Schema({
    // Define o esquema para a coleção de waitlist, que é usada para armazenar informações sobre os usuários que se inscreveram na lista de espera
    name: { type: String, required: true },
    phone: { type: String, required: true },
    level: { type: String, required: true },
    areas: { type: [String], required: true },
    technologies: { type: String, required: true },
    // Cria createdAt e UpdatedAt
    timestamps: true
});

module.exports = mongoose.model('Waitlist', WaitlistSchema);
