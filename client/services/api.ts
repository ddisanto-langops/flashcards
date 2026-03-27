import type { CreateFlashcardInput, Flashcard } from "../types/flashcard";

export async function createCard(flashcard: CreateFlashcardInput) {

    const url = "/api/data/add/";

    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flashcard)
        });
        return response.json();
    } catch (error) {
        throw new Error(`Failed to create card: ${error}`);
    }
    
    
    
};

export async function deleteCard(cardId: string) {

    const url = `/api/data/delete/${cardId}`;
    
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });
        return response.json();
    } catch (error) {
        throw new Error(`Error deleting card: ${error}`);
    };
};


export async function getAllCards() {
    const url = "/api/data/all";
    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        
        return response.json()

    } catch (error) {
        throw new Error(`Failed to get all cards: ${error}`)
    }
}


export async function getCard(cardId: string) {

    const url = `/api/data/${cardId}`

    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        return response.json();

    } catch (error) {
        throw new Error(`Failed to get card ${cardId}: ${error}`)
    }
}


export async function editCard(card: Flashcard) {
    const url = `/api/data/edit/${card.id}`

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(card)
        });
        return response.json();

    } catch (error) {
        throw new Error(`Failed to edit card: ${error}`)
    }
}