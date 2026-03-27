import type { Flashcard } from "../../types/flashcard";
import { Table } from "../components/table"
import { Modal } from "../components/modal";
import { CreateCardModal } from "../components/createCard";
import { useState } from "react"


export function DashboardPage() {
    
    const [modalVisibility, setModalVisibility] = useState(false)
    const [createModalVisibility, setCreateModalVisibility] = useState(false);
    const [modalData, setModalData] = useState<Flashcard>();

    const handleRowClick = (row: Flashcard) => {
        setModalVisibility(true)
        setModalData(row)
    }
    
    const closeModal: () => void = () => {
        setModalVisibility(false)
    }

    const closeCreateModal: () => void = () => {
        setCreateModalVisibility(false);
    };

    const handleCreateButtonClick: () => void = () => {
        setCreateModalVisibility(true);
    };

    return (
        <>
        <div id="create-button-div">
            <button type="button" id="create-button" onClick={handleCreateButtonClick}>Create Card</button>
        </div>
        <div className="page-container">
            <CreateCardModal isVisible={createModalVisibility} closeModal={closeCreateModal} />
            <Modal isVisible={modalVisibility} data={modalData} setModalData={setModalData} closeModal={closeModal}/>
            <Table handleRowClick={handleRowClick} />
        </div>
        </>
    )
}