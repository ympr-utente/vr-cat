// src/stores/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCdLIM9hiWWP_D_PAlCAiwI35JcJXqKv3s",
  authDomain: "vr-cat-a8b3a.firebaseapp.com",
  projectId: "vr-cat-a8b3a",
  storageBucket: "vr-cat-a8b3a.appspot.com",
  messagingSenderId: "16540522175",
  appId: "1:16540522175:web:5615aa1564ca725a73180a"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app); 

export { auth, database, db };

