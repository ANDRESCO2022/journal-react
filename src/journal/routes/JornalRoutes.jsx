import { Navigate, Route, Routes } from 'react-router-dom'
import { JornalPages } from '../pages/JornalPages'

export const JornalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<JornalPages />} />
      <Route path="/*" element={<Navigate to={'/'} />} />
    </Routes>
  )
}
