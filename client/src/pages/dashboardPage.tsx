import { NavBar } from "../components/navbar"
import type { Flashcard } from "../../types/flashcard";
import { Table } from "../components/table"
import { Modal } from "../components/modal";
import { useState } from "react"


export function DashboardPage() {
    
    const [modalVisibility, setModalVisibility] = useState(false)
    const [modalData, setModalData] = useState<Flashcard>();

  const handleRowClick = (row: Flashcard) => {
    setModalVisibility(true)
    setModalData(row)
  }
    
    const closeModal: () => void = () => {
        setModalVisibility(false)
    }

    return (
        <>
        <div className="page-container">
            <Modal isVisible={modalVisibility} data={modalData} setModalData={setModalData} closeModal={closeModal}/>
            <NavBar />
            <Table handleRowClick={handleRowClick} />
        </div>
        </>
    )
}