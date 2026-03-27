import type { Flashcard } from '../../types/flashcard'
import { editCard, deleteCard } from '../../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type React from 'react';

interface ModalProps {
	isVisible: boolean;
	closeModal: () => void;
	data: Flashcard | undefined;
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

	const deleteMutation = useMutation({
		mutationFn: (id: string) => deleteCard(id),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['flashcards']});
			closeModal();
		}
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

	if (!isVisible || !data) return null;

	const handleSave = async (e: React.SubmitEvent) => {
		e.preventDefault();
		saveMutation.mutate(data);
	};

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (data?.id) {
			deleteMutation.mutate(data.id)
		}
	}

	return (
		<>
		<div className="modal-background-div">
			<form className='modal-content-div' onSubmit={handleSave}>
				<h1 className="modal-title">Edit Flashcard</h1>
				<div className='modal-field'>
					<label htmlFor='title'>Title:</label>
					<input id='title' name='title' value={data.title} onChange={handleChange}/>
				</div>
				<div className='modal-field'>
					<label htmlFor='front-text'>Front Text:</label>
					<textarea id='front-text' name='frontText' value={data.frontText} onChange={handleChange}></textarea>
				</div>
				<div className='modal-field'>
					<label htmlFor='back-text'>Back Text:</label>
					<textarea id='back-text' name='back-Text' value={data.backText ?? ''} onChange={handleChange}></textarea>
				</div>
				<div className='modal-buttons-div'>
					<button type='submit'>Save</button>
					<button type='button' onClick={handleDelete} >Delete</button>
					<button onClick={closeModal}>Close</button>
				</div>
			</form>
		</div>
		</>
	);
};