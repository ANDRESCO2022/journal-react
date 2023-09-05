import {
  authSlice,
  checingCredentials,
  login,
  logout
} from '../../../store/auth/authSlice'
import {
  initialState,
  demoUser,
  authenticateState
} from '../../fixtures/authFixtures'

describe('Pruebas en authSlice', () => {
  test('sebe de regresar el estado inicial  y llamarse "AUTH" ', () => {
    const state = authSlice.reducer(initialState, {})
    expect(authSlice.name).toBe('auth')
    expect(state).toEqual(initialState)
  })
  test('debe de  realizar la autenticación ', () => {
    const state = authSlice.reducer(initialState, login(demoUser))
    expect(state).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null
    })
  })
  test('debe de realizar el logout sin argunmentos ', () => {
    const state = authSlice.reducer(authenticateState, logout())

    expect(state).toEqual({
      status: 'not authenticated',
      uid: null,
      email: null,
      displayName: 'demo User',
      photoURL: null,
      errorMessage: undefined
    })
  })
  test('debe de realizar el logout y mostrar un mensaje de error  ', () => {
    const errorMessage = 'credenciales no son correctas'
    const state = authSlice.reducer(authenticateState, logout({ errorMessage }))

    console.log(state)
    expect(state).toEqual({
      status: 'not authenticated',
      uid: null,
      email: null,
      displayName: 'demo User',
      photoURL: null,
      errorMessage: errorMessage
    })
  })
  test('debe de cambiar  el estado a cheking', () => {
    const state = authSlice.reducer(authenticateState, checingCredentials())
    expect(state.status).toBe('checking')
  })
})
