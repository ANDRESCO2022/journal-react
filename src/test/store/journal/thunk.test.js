import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite'
import {
  addNewEmptyNote,
  savingNewNote,
  setAciveNote
} from '../../../store/journal'
import { startNewNote } from '../../../store/journal/thunks'
import { FirebaseBD } from '../../../firebase/config'

describe('pruebas en journal Thunks', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  beforeEach(() => jest.clearAllMocks())
  test('startNewNote debe de crear una nueva nota en blanco ', async () => {
    const uid = 'ABC123'
    getState.mockReturnValue({ auth: { uid: uid } })
    await startNewNote()(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith(savingNewNote())
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number)
      })
    )
    expect(dispatch).toHaveBeenCalledWith(
      setAciveNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number)
      })
    )
    //Borrar de firebase
    const collectionRef = collection(FirebaseBD, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef)
    const deletePromises = []
    docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)))
    await Promise.all(deletePromises)
  })
})
