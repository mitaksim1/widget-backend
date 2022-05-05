import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';

export const routes = express.Router();

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
routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository);

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    })
    
    // Après l'envoi des données, on envoi un email 
    // await transport.sendMail({
    //     from: 'Equipe Feedget <hello@feedget.com>',
    //     to: 'Miriam Simonnet <miriamt.simonnet@gmail.com>',
    //     subject: 'Feedback',
    //     html: [
    //         `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
    //         `<p>Type du feedback: ${type}</p>`,
    //         `<p>Commentaire: ${comment}</p>`,
    //         `</div>`
    //     ].join('\n')
    // })

    return res.status(201).send();
});