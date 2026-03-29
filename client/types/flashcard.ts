export interface Flashcard {
    id: string;
    title: string;
    text: string;
    createdAt: Date;
    updatedAt: Date | null;
}

export type CreateFlashcardInput = Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>

