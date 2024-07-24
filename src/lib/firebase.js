import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-ece2a.firebaseapp.com",
  projectId: "reactchat-ece2a",
  storageBucket: "reactchat-ece2a.appspot.com",
  messagingSenderId: "787171171885",
  appId: "1:787171171885:web:184eabf0041f4bfe5022a4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();