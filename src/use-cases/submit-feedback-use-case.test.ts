import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

// Utilisation d'un spy qui va vérifier si toutes les fonctions ont été appelées
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

// On peut remplacer les appels aux méthodes de l'interface par les spies
const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,8522366552hsys',
        })).resolves.not.toThrow();
    
        // On s'attend à ce que ces fonctions aient été appelées
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,8522366552hsys',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,8522366552hsys',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback with invalid screenshot format', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'test.jpg',
        })).rejects.toThrow();
    });
});