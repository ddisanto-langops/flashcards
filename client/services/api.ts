import type { CreateFlashcardInput } from "../types/flashcard";

export async function createCard(flashcard: CreateFlashcardInput) {
    const params = new URLSearchParams();
    if (flashcard.title) params.append('title', flashcard.title);
    if (flashcard.frontText) params.append('fronText', flashcard.frontText);
    if (flashcard.backText) params.append('backText', flashcard.backText);

    const url = "/api/data/add/";

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flashcard),
            
    });
    if (!response.ok) throw new Error("Failed to create card.");
    return response.json();
};