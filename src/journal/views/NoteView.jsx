import {
  DeleteOutline,
  SaveOutlined,
  UploadFileOutlined
} from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { ImageGallery } from '../Components'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { useEffect, useMemo, useRef } from 'react'
import {
  setAciveNote,
  starDeleteingNote,
  startSaveNote,
  startUploadFiles
} from '../../store/journal'

export const NoteView = () => {
  const dispatch = useDispatch()
  const {
    active: note,
    messageSaved,
    isSaving
  } = useSelector(state => state.journal)
  const { body, title, date, onInputChange, formState } = useForm(note)
  const dateString = useMemo(() => {
    const newDate = new Date(date)
    return newDate.toUTCString()
  }, [date])
  const fileInputRef = useRef()
  useEffect(() => {
    dispatch(setAciveNote(formState))
  }, [formState])
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startSaveNote())
  }
  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return
    dispatch(startUploadFiles(target.files))
  }
  const onDelete = () => {
    dispatch(starDeleteingNote())
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="ligth">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />
        <IconButton
          color="prymary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadFileOutlined />
        </IconButton>
        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Gruardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Que  se realiza  hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
        </Button>
      </Grid>
      <ImageGallery images={note.imageUrls} />
    </Grid>
  )
}
