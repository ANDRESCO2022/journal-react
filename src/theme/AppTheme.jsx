import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { themePurple } from './'

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={themePurple}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
