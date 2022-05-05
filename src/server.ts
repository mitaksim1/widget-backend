import express from 'express';
import { prisma } from './prisma';

// Appel à Express
const app = express();

// Permet la récupération de la requête en format JSON
app.use(express.json());

// Création route
app.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const feedback = await prisma.feedback.create({
        data: {
           type,
           comment,
           screenshot,
        }
    })

    return res.status(201).json({ data : feedback });
});

// Lance le serveur
app.listen(3333, () => {
    console.log('HTTP server running!');
});