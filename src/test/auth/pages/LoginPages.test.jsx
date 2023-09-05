import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LoginPages } from '../../../auth/pages/LoginPages'
import { Provider } from 'react-redux'
import { authSlice } from '../../../store/auth'
import { startGoogleSignIn } from '../../../store/auth/thunks'
import { configureStore } from '@reduxjs/toolkit'
import { notAuthenticateState } from '../../fixtures/authFixtures'

const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()

jest.mock('../../../store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password })
  }
}))
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => fn => fn()
}))
const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticateState
  }
})

describe('pruebas el LoginPages', () => {
  beforeEach(() => jest.clearAllMocks())

  test('debe de mostrar el componente  correctamente', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPages />
        </MemoryRouter>
      </Provider>
    )
    // screen.debug()
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
  })
  test('boton de google debe de llamar el startGoogleSingIn  ', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPages />
        </MemoryRouter>
      </Provider>
    )
    const googleButton = screen.getByLabelText('google-button')
    fireEvent.click(googleButton)
    expect(mockStartGoogleSignIn).toHaveBeenCalled()
  })
  test('submit debe de  llamar sartLoginWithEmailPassword', () => {
    const email = 'andres@gmail.com'
    const password = '124563'
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPages />
        </MemoryRouter>
      </Provider>
    )
    const emailField = screen.getByRole('textbox', { name: 'correo' })
    fireEvent.change(emailField, { target: { name: 'email', value: email } })
    const passwordField = screen.getByTestId('password')
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password }
    })
    const loginForm = screen.getByLabelText('submit-form')
    fireEvent.submit(loginForm)
    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email,
      password
    })
  })
})
