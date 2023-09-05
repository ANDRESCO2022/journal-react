import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  singInWithGoogle
} from '../../../firebase/providers'
import { checingCredentials, login, logout } from '../../../store/auth'
import {
  checkingAuthentication,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout
} from '../../../store/auth/thunks'
import { clearNotesLogout } from '../../../store/journal'
import { demoUser } from '../../fixtures/authFixtures'
jest.mock('../../../firebase/providers')
describe('pruebas en authThunks', () => {
  const dispatch = jest.fn()
  beforeEach(() => jest.clearAllMocks)
  test('debe de  invocar el checkingCredentials ', async () => {
    await checkingAuthentication()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checingCredentials())
  })
  test('startGoogleSingIn debe de llamar ckeckingCredentials y login', async () => {
    const loginData = { ok: true, ...demoUser }
    await singInWithGoogle.mockResolvedValue(loginData)
    await startGoogleSignIn()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })
  test('startGoogleSingIn debe de llamar ckeckingCredentials y logout error', async () => {
    const loginData = { ok: false, errorMessage: 'errorconexion a google' }

    await singInWithGoogle.mockResolvedValue(loginData)
    await startGoogleSignIn()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })
  test('startLoginWithEmailPassword debe de llamar ckeckingCredentials y login -exito ', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: '123456' }
    await loginWithEmailPassword.mockResolvedValue(loginData)
    await startLoginWithEmailPassword(formData)(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })
  test('startLoginWithEmailPassword debe de llamar ckeckingCredentials y login -error', async () => {
    const loginData = { ok: false, errorMessage: 'errorconexion a google' }
    const formData = { email: demoUser.email, password: '123456' }
    await loginWithEmailPassword.mockResolvedValue(loginData)
    await startLoginWithEmailPassword(formData)(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })

  test('startCreatingUserWithEmailPassword debe de llamar a ckeckingCredentials y login  -exito', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = {
      email: demoUser.email,
      password: '123456',
      displayName: demoUser.displayName
    }
    await registerUserWithEmailPassword.mockResolvedValue(loginData)
    await startCreatingUserWithEmailPassword(formData)(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })
  test('startCreatingUserWithEmailPassword debe de llamar ckeckingCredentials y login  -error', async () => {
    const loginData = { ok: false, errorMessage: 'errorconexion a google' }
    const formData = {
      email: demoUser.email,
      password: '123456',
      displayName: demoUser.displayName
    }
    await registerUserWithEmailPassword.mockResolvedValue(loginData)
    await startCreatingUserWithEmailPassword(formData)(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checingCredentials())

    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })

  test('startLogout debe de llamar loagoutFirebase, clearNotes y LOGOUT ', async () => {
    await startLogout()(dispatch)
    expect(logoutFirebase).toHaveBeenCalledWith()
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
    expect(dispatch).toHaveBeenCalledWith(logout())
  })
})
