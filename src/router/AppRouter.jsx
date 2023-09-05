/* eslint-disable multiline-ternary */
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JornalRoutes } from '../journal/routes/JornalRoutes'
import { Checking } from '../ui'
import { useCheckAuth } from '../hooks'

export const AppRouter = () => {
  const { status } = useCheckAuth()
  if (status === 'checking') {
    return <Checking />
  }
  return (
    <Routes>
      {status === 'authenticated' ? (
        <Route path="/*" element={<JornalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
