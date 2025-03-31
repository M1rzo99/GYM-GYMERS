import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAmT6zQfOLZOCTLpzg37iyEAqQGXsDSELE",
  authDomain: "gym-gymers.firebaseapp.com",
  projectId: "gym-gymers",
  storageBucket: "gym-gymers.firebasestorage.app",
  messagingSenderId: "922305578886",
  appId: "1:922305578886:web:1f45cf439a99c01dc14e07",
  measurementId: "G-3DM2V1W873"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db};