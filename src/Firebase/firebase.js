import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYyBhapRIGg3U8CQal-CMpz-J4LSNnpZY",
  authDomain: "notesapp-151c5.firebaseapp.com",
  projectId: "notesapp-151c5",
  storageBucket: "notesapp-151c5.appspot.com",
  messagingSenderId: "1047614604993",
  appId: "1:1047614604993:web:e401d926c2e024ba74b640",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "users");
export const auth = getAuth(app);
