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
        frontText: '',
        backText: ''
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
            frontText: "",
            backText: ""
        });
    };

    if (!isVisible) return null;
    return (
        <>
        <div className="modal-background-div">
            <form className='modal-content-div' onSubmit={handleSubmit}>
                <h1 className="modal-title">Create a Flashcard</h1>
                <div className='modal-field'>
                    <label htmlFor='create-title'>Title:</label>
                    <input id='create-title' name="title" value={cardData.title} onChange={handleInputChange}></input>
                </div>
                <div className='modal-field'>
                    <label htmlFor='create-front-text'>Front Text:</label>
                    <textarea id='create-front-text' name="frontText" value={cardData.frontText} onChange={handleInputChange}></textarea>
                </div>
                <div className='modal-field'>
                    <label htmlFor='create-back-text'>Back Text:</label>
                    <textarea id='create-back-text' name="backText" value={cardData.backText} onChange={handleInputChange}></textarea>
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