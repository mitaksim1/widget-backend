import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

// describe nous permet de créer une liste de tests
// on nomme cette liste avec le nom que l'on veut
describe('Submit feedback', () => {
    // Pour commencer à écrire un test, on peut utiliser le mot test ou it
    it('should be able to submit a feedback', async () => {
        // On veut juste tester la fonction et son cas d'usage
        // Alors, on ne va pas passer l'instanciation de Prisma et Nodemailer à cette fonction là ce serait un test d'intégration
        const submitFeedback = new SubmitFeedbackUseCase(
            // On dit que les dépendances sont mocking (on crée des objets qui simule le comportement des objets réels)
            { create: async () => { } },
            { sendMail: async () => { } }
        )
        
        // Quand on va tester on s'attend à avoir le résultat contenu dans execute
        // et que le test résout ça et ne lance pas une erreur
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,8522366552hsys',
        })).resolves.not.toThrow();
    });
});