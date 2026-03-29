import type { CreateFlashcardInput } from "../../types/flashcard.ts";
import { createCard } from "../../services/api.ts";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from "react";

interface CreateCardModalProps {
    isVisible: boolean;
    closeModal: () => void;
}

export function CreateCardModal({isVisible, closeModal}: CreateCardModalProps) {

    const queryClient = useQueryClient();

    const createMutation = useMutation({
            mutationFn: (card: CreateFlashcardInput) => createCard(card),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['flashcards']});
                closeModal();
            },
        });

    

    const [cardData, setcardData] = useState({
        title: '',
        text: ''
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setcardData({...cardData, [name]: value})
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        createMutation.mutate(cardData)
            
            // cleanup
        setcardData({
            title: "",
            text: ""
        });
    };

    if (!isVisible) return null;
    return (
        <>
        <div className="modal-background-div">
            <form className='modal-content-div' onSubmit={handleSubmit}>
                <h1 className="modal-title">Create a Card</h1>
                <div className='modal-field'>
                    <label htmlFor='create-title'>Title:</label>
                    <input id='create-title' name="title" value={cardData.title} onChange={handleInputChange}></input>
                </div>
                <div className='modal-field'>
                    <label htmlFor='create-text'>Text:</label>
                    <textarea id='create-text' name="text" value={cardData.text} onChange={handleInputChange}></textarea>
                </div>
                <div className='modal-buttons-div'>
                    <button type="submit">Create</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </form>
        </div>
        </>
    )
};