export interface Flashcard {
    id: string;
    title: string;
    frontText: string;
    backText: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}

export type CreateFlashcardInput = Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>

