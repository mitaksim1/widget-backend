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
    ) {}
    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,            
        })
    }
}