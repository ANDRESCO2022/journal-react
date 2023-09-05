import { Box } from '@mui/system'
import { NavBar, SideBar } from '../Components'
import { Toolbar } from '@mui/material'

const drawerWidth = 280
export const JournalLayout = ({ children }) => {
  return (
    <Box
      sx={{ display: 'flex' }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, P: 2, m: '.2rem' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
