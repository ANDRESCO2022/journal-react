export const initialState = {
  sSaving: false,
  messageSaved: '',
  notes: [],
  active: null
}
export const savingNewNoteState = {
  isSaving: true
}
export const addNewEmptyNoteState = {
  notes: [],
  isSaving: false
}
export const setAciveNoteState = {
  active: null,
  messageSaved: 'note active'
}
export const setNotesState = {
  notes: []
}
export const setSavingState = {
  isSaving: true,
  messageSaved: 'note saved'
}
export const updateState = {
  isSaving: false,
  messageSaved: 'Note Updated',
  notes: []
}
