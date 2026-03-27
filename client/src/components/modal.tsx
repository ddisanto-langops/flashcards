import type { Flashcard } from '../../types/flashcard'
import { editCard } from '../../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ModalProps {
    isVisible: boolean;
    closeModal: () => void;
    data: Flashcard;
    setModalData: React.Dispatch<React.SetStateAction<Flashcard | undefined>>;
};

export function Modal({isVisible, data, setModalData, closeModal}:ModalProps) {

    const queryClient = useQueryClient();
    const saveMutation = useMutation({
        mutationFn: (updatedCard: Flashcard) => editCard(updatedCard),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['flashcards']});
            closeModal();
        },
    });
   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setModalData(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                [name]: value
            }
        });
    };

    const handleSave = async (e: React.SubmitEvent) => {
        e.preventDefault();
        saveMutation.mutate(data);
    }
    
    if (!isVisible || !data) return null;

    return (
        <>
        <div className="modal-background-div">
            <form className='modal-content-div' onSubmit={handleSave}>
                <div className='modal-field'>
                    <label htmlFor='title'>Title:</label>
                    <input id='title' name='title' value={data.title} onChange={handleChange}/>
                </div>
                <div className='modal-field'>
                    <label htmlFor='front-text'>Front Text</label>
                    <textarea id='front-text' name='frontText' value={data.frontText} onChange={handleChange}></textarea>
                </div>
                <div className='modal-buttons-div'>
                    <button onClick={closeModal}>Close</button>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
        </>
    );
};