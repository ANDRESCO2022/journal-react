import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseBD } from '../../firebase/config'
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setAciveNote,
  setNotes,
  setPhotoActiveNote,
  setSaving,
  updateNote
} from './'
import { fileUpload, loadNotes } from '../../helpers'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote())
    const { uid } = getState().auth
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }
    const newDoc = doc(collection(FirebaseBD, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)
    newNote.id = newDoc.id
    dispatch(addNewEmptyNote(newNote))
    dispatch(setAciveNote(newNote))
  }
}
export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    if (!uid) throw new Error('el UID del usuario no existe ')
    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}
export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving())
    const { uid } = getState().auth
    const { active: note } = getState().journal
    const noteToFireStore = { ...note }
    delete noteToFireStore.id
    const docRef = doc(FirebaseBD, `${uid}/journal/notes/${note.id}`)
    await setDoc(docRef, noteToFireStore, { merge: true })
    dispatch(updateNote(note))
  }
}

export const startUploadFiles = (files = []) => {
  return async dispatch => {
    dispatch(setSaving())
    // await fileUpload(files[0])
    const fileUploadPromises = []
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }
    const photoUrls = await Promise.all(fileUploadPromises)
    dispatch(setPhotoActiveNote(photoUrls))
  }
}
export const starDeleteingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const { active: note } = getState().journal
    const docRef = doc(FirebaseBD, `${uid}/journal/notes/${note.id}`)
    await deleteDoc(docRef)
    dispatch(deleteNoteById(note.id))
  }
}
