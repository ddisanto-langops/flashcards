export interface Flashcard {
    id: string,
    title: string,
    frontText: string,
    backText?: string,
    createdAt: Date,
    updatedAt?: Date
}

export type CreateFlashcardInput = Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>

