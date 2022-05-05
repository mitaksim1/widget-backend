import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

// Appel à Express
const app = express();

// Permet la récupération de la requête en format JSON
app.use(express.json());

// Config de mailtrap avec Nodemailer
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "2f0e8f30b51356",
        pass: "0119613be39a04"
    }
});

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
    // Après l'envoi des données, on envoi un email 
    await transport.sendMail({
        from: 'Equipe Feedget <hello@feedget.com>',
        to: 'Miriam Simonnet <miriamt.simonnet@gmail.com>',
        subject: 'Feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Type du feedback: ${type}</p>`,
            `<p>Commentaire: ${comment}</p>`,
            `</div>`
        ].join('\n')
    })

    return res.status(201).json({ data : feedback });
});

// Lance le serveur
app.listen(3333, () => {
    console.log('HTTP server running!');
});