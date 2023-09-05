import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

export const themePurple = createTheme({
  palette: {
    primary: {
      main: '#171066'
    },
    secondary: {
      main: '#543884'
    },
    error: {
      main: red.A400
    }
  }
})
