import { createCard } from "../../services/api.ts";
import { useState } from "react";
import { NavBar } from "../components/navbar.tsx";

export function CreateCardPage() {
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
        try {
            createCard(cardData)
            
            // cleanup
            setcardData({
                title: "",
                frontText: "",
                backText: ""
            });

        } catch (error) {
            console.error('Error:', error);
        }

    };
   
  return (
    <>
        <NavBar />
        <h1>Create a Flashcard</h1>
        <form onSubmit={handleSubmit}>
            <div className="input-div">
                <label htmlFor='create-title'>Title:
                    <input id='create-title' name="title" value={cardData.title} onChange={handleInputChange}></input>
                </label>
            </div>
            <div className="input-div">
            <label htmlFor='create-front-text'>Front Text:
                <textarea id='create-front-text' name="frontText" value={cardData.frontText} onChange={handleInputChange}></textarea>
            </label>
            </div>
            <div className="input-div">
            <label htmlFor='create-back-text'>Back Text:
                <input id='create-back-text' name="backText" value={cardData.backText} onChange={handleInputChange}></input>
            </label>
            </div>
            <button>Create</button>
        </form>
    </>
  )
};