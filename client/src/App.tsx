import './index.css'
import { Route, Routes } from 'react-router-dom'
import { CreateCardPage } from './pages/createCard'
import { Dashboard } from './pages/dashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/create" element={<CreateCardPage />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  )
};


