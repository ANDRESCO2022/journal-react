import { TurnedInNot } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { useMemo } from 'react'
import { setAciveNote } from '../../store/journal/journalSlice'

export const SideBarItem = ({ title, body, id, imageUrls = [], date }) => {
  const dispatch = useDispatch()
  const onClickNote = () => {
    dispatch(setAciveNote({ title, id, body, imageUrls, date }))
  }

  const newTitle = useMemo(() => {
    return title.length > 10 ? title.substring(0, 17) + '...' : title
  }, [title])

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
