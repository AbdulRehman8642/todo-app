import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuIvrgZhPRT2cIf_Apr16gIJN4dB80WRA",
  authDomain: "markh-todo.firebaseapp.com",
  projectId: "markh-todo",
  storageBucket: "markh-todo.firebasestorage.app",
  messagingSenderId: "364400551078",
  appId: "1:364400551078:web:605d8c538f657ceac48067",
  measurementId: "G-JYP0QVFTXC",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export {
  createUserWithEmailAndPassword,
  db,
  setDoc,
  doc,
  auth,
  getDoc,
  getDocs,
  collection,
  onAuthStateChanged,
  updateDoc,
  deleteDoc,
  signInWithPopup,
  GoogleAuthProvider,
  provider,
  signOut,
  signInWithEmailAndPassword,
};
