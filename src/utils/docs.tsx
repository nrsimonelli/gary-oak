import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  DocumentSnapshot,
} from 'firebase/firestore'
import { z } from 'zod'
import { db } from './firestore'

// To create or overwrite a new document `setDoc()`
// This will overwirte preexisting data so pass { merge: true } as a third arg if you desire other behavior

const Trainer = z.object({
  id: z.string(),
  name: z.string().optional(),
  path: z.string().optional(),
  pokemon: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      isStarter: z.boolean().optional(),
    })
  ),
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

export const updatePlayerData = async (uid: string, data: Partial<Trainer>) => {
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
