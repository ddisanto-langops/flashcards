import './index.css'
import { Route, Routes } from 'react-router-dom'
import { CreateCardPage } from './pages/createCard'
import { DashboardPage } from './pages/dashboardPage'

export default function App() {
  return (
    <Routes>
      <Route path="/create" element={<CreateCardPage />} />
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  )
};


