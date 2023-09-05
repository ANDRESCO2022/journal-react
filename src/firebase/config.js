// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getEnviroments } from '../helpers/getEnviroments'
// TODO: Add SDKs for Firebase products that you want to use
const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID
} = getEnviroments()
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration production
// const firebaseConfig = {
//   apiKey: 'AIzaSyCDwIdGcCP_p2EolLMMnCwg2CAyd7lKxkw',
//   authDomain: 'react-practice-81f3f.firebaseapp.com',
//   projectId: 'react-practice-81f3f',
//   storageBucket: 'react-practice-81f3f.appspot.com',
//   messagingSenderId: '1062173367677',
//   appId: '1:1062173367677:web:04a273e7eb15fb4722c014'
// }

// Your web app's Firebase configuration testing
// const firebaseConfig = {
//   apiKey: 'AIzaSyDWiZOT4Ep_Jf2PbFtku_mNH0lYMQFkGwE',
//   authDomain: 'pruebas--proyectos.firebaseapp.com',
//   projectId: 'pruebas--proyectos',
//   storageBucket: 'pruebas--proyectos.appspot.com',
//   messagingSenderId: '254094294164',
//   appId: '1:254094294164:web:ffff9ec7e9b7313abf4881'
// }
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseBD = getFirestore(FirebaseApp)
