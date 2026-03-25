import type { ChangeEvent } from 'react';
import type { Flashcard } from '../../types/flashcard'

interface modalProps {
    isVisible: boolean;
    data: Flashcard | null | undefined;
    setModalData: (event: ChangeEvent) => void
}

export function Modal({isVisible, data, setModalData}:modalProps) {
    if (!isVisible || !data) return null
    return (
        <>
        <div className='modal-div'>
            <label>
                <input value={data.title} onChange={setModalData}/>
            </label>
        </div>
        
        </>
    )
}