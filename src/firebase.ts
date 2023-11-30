import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArINwZpCsYnIWz5NdCzWuDzb9Z6y6IaBs",
  authDomain: "simple-chatting-cbb8b.firebaseapp.com",
  projectId: "simple-chatting-cbb8b",
  storageBucket: "simple-chatting-cbb8b.appspot.com",
  messagingSenderId: "745511722964",
  appId: "1:745511722964:web:0934650f542f37160c0041",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
