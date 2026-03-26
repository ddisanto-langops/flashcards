import type { Flashcard } from '../../types/flashcard'
//import { useState, useEffect } from "react"

interface ModalProps {
    isVisible: boolean;
    closeModal: () => void;
    data: Flashcard | undefined;
    setModalData: React.Dispatch<React.SetStateAction<Flashcard | undefined>>;
};

export function Modal({isVisible, data, setModalData, closeModal}:ModalProps) {
    if (!isVisible || !data) return null;

    //const [formData, setFormData] = useState(data);

    /*
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFormData({...data}, )
    }
    */

    return (
        <>
        <div className="modal-background-div">
            <div className='modal-content-div'>
                <div className='modal-field'>
                    <label htmlFor='title'>Title:</label>
                    <input id='title' value={data.title} />
                </div>
                <div className='modal-field'>
                    <label htmlFor='front-text'>Front Text</label>
                    <textarea id='front-text' value={data.frontText}></textarea>
                </div>
                <div className='modal-buttons-div'>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
        </>
    );
};