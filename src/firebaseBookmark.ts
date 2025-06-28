// firebaseBookmark.ts
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { app } from './firebase';



export const db = getFirestore(app);
