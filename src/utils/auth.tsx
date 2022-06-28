import {
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInAnonymously,
  signOut,
  User,
  GoogleAuthProvider,
} from 'firebase/auth'
import { createContext, FC, useState, useEffect } from 'react'
import { auth } from './firestore'

export const logOut = () => {
  signOut(auth)
}
// Multiple provider options
export const logInWithGithub = () => {
  const provider = new GithubAuthProvider()
  return signInWithPopup(auth, provider)
}
export const logInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}
export const logInAnonymously = () => {
  signInAnonymously(auth)
    .then(() => {
      console.log('sign-in successful')
    })
    .catch((error) => {
      console.log(error)
    })
}

export const AuthContext = createContext<User | null>(null)
export const AuthProvider: FC<any> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  // Listen to onAuthStateChanged
  useEffect(() => {
    // const firebase = getFirebase();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  )
}
