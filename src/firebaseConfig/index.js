import { initializeApp } from "firebase/app";
import {get, getDatabase} from 'firebase/database'
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoIpsZS2yf8qdHpGj2ApyMgRK5wm8Pm5w",
  authDomain: "controlestefanini.firebaseapp.com",
  databaseURL: "https://controlestefanini-default-rtdb.firebaseio.com",
  projectId: "controlestefanini",
  storageBucket: "controlestefanini.appspot.com",
  messagingSenderId: "700107143823",
  appId: "1:700107143823:web:9e7d4680cb0183c9f1cefa",
  measurementId: "G-BBD1TEWWVJ"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const firestoreDb = getFirestore(app);
  const auth = getAuth(app);
  export default db;
  export  {auth, firestoreDb};