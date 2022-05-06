import { MailAdapter } from './../adapters/mail-adapter';
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

// Cette interface appartient à la couche application, tandis que l'autre appartient à la couche des données 
interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {

    constructor(
        // Cette syntaxe nous permet de raccourcir le constructor
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        // Le type ne peut pas être null
        if (!type) {
            throw new Error('Type is required');
        }

        // Le comment ne peut pas être null
        if (!comment) {
            throw new Error('Comment is required');
        }

        // Format d'image attendu
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.');
        }

         // Envoi des données vers la bdd
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,            
        })

        // Après l'envoi des données, on envoit un email
        await this.mailAdapter.sendMail({
            subject: 'Nouveau feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Type du feedback: ${type}</p>`,
                `<p>Commentaire: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}">` : ``,
                `</div>`
            ].join('\n')
        })
    }
}