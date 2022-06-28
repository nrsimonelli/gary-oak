import {
  collection,
  getDocs,
  doc,
  setDoc,
  Timestamp,
  getDoc,
} from 'firebase/firestore'
import { z } from 'zod'
import { db } from './firestore'

// To create or overwrite a new document `setDoc()`
// This will overwirte preexisting data so pass { merge: true } as a third arg if you desire other behavior

// example data...

// const trainerRedData = {
//   id: 'red',
//   name: 'red',
//   path: 'src/assets/rivals/red.png',
//   pokemon: [
//     { id: 3, name: 'venusaur', isStarter: true },
//     { id: 6, name: 'charizard', isStarter: true },
//     { id: 9, name: 'blastoise', isStarter: false },
//     { id: 25, name: 'pikachu', isStarter: true },
//     { id: 143, name: 'snorlax', isStarter: false },
//     { id: 196, name: 'espeon', isStarter: false },
//   ],
//   dateCreated: Timestamp.now(),
//   lastUpdated: Timestamp.now(),
// }

// await setDoc(doc(db, 'trainers', 'red'), trainerRedData);

const Trainer = z.object({
  id: z.string(),
  name: z.string().optional(),
  path: z.string().optional(),
  pokemon: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        isStarter: z.boolean().optional(),
      })
    )
    .optional(),
  dateCreated: z
    .object({
      seconds: z.number(),
      nanoseconds: z.number(),
    })
    .optional(),
  lastUpdated: z
    .object({
      seconds: z.number(),
      nanoseconds: z.number(),
    })
    .optional(),
})

export type Trainer = z.infer<typeof Trainer>

export const updatePlayerData = async (uid: string, data: Trainer) => {
  const trainerRef = doc(db, 'players', uid)
  if (!uid) {
    return
  }
  await setDoc(trainerRef, data, { merge: true })
}

export const getAllData = async () => {
  const querySnapshot = await getDocs(collection(db, 'trainers'))
  const rivalArray: Trainer[] = []
  querySnapshot.forEach((doc) => {
    rivalArray.push(Trainer.parse(doc.data()))
  })
  return rivalArray
}

export const fetchPlayerData = async (uid: string) => {
  const docRef = doc(db, 'players', uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return Trainer.parse(docSnap.data())
  } else {
    return null
  }
}
