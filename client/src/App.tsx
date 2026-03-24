import './App.css'
import { Route, Routes } from 'react-router-dom'
import { CreateCardPage } from './pages/createCard'

export default function App() {
  return (
    <Routes>
      <Route path="/create" element={<CreateCardPage />} />
    </Routes>
  )
};


