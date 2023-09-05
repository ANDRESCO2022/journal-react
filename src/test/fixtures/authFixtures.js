export const initialState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}
export const authenticateState = {
  status: 'authenticated',
  uid: '12355',
  email: 'demo@gmail.com',
  displayName: 'demo User',
  photoURL: 'https://demo.jpg',
  errorMessage: null
}
export const notAuthenticateState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}
export const demoUser = {
  uid: '18156',
  email: 'demo@gmail.com',
  displayName: 'demo User',
  photoURL: 'https://12455.jpg'
}
