import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAR8FdHaYnkL6CghISqw96e0_0AM66lpI",
  authDomain: "league-names.firebaseapp.com",
  projectId: "league-names",
  storageBucket: "league-names.appspot.com",
  messagingSenderId: "1779176235",
  appId: "1:1779176235:web:9e7df7c0992a5f0ede6b6e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
