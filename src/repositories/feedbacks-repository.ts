// On précise le type de données attendues par la méthode create
export interface FeedbackCreateData {
    type: string;
    comment: string;
    screenshot?: string;
}

// Pour découpler la méthode create de notre app, on crée cette interface
export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<void>;
}