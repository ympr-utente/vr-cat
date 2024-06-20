import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Your new Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHNdHZvJGUIdK90cqp1tsEvoWJGb0WkZ0",
  authDomain: "meowvradventures.firebaseapp.com",
  databaseURL: "https://meowvradventures-default-rtdb.firebaseio.com",
  projectId: "meowvradventures",
  storageBucket: "meowvradventures.appspot.com",
  messagingSenderId: "1064223602185",
  appId: "1:1064223602185:web:63842d4c9a9b5c7474aad8",
  measurementId: "G-N4ZJ5RCF4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { analytics, auth, database, db };

