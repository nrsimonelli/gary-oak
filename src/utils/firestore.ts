import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyC-M07o7FpxUCRfkidu3FY4ZKaV94X675A',
  authDomain: 'rival-dex.firebaseapp.com',
  projectId: 'rival-dex',
  storageBucket: 'rival-dex.appspot.com',
  messagingSenderId: '411825058924',
  appId: '1:411825058924:web:922d9227bc3f0b042dd449',
  measurementId: 'G-58GL4GNM03',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
