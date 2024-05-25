// // src/stores/firebase.config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  databaseURL: "https://meowvradventures-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { auth, database, firebaseConfig };

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// // import { getAnalytics } from "firebase/analytics";
// // import { getStorage } from "firebase/storage";
// // import { getDatabase } from "firebase/database";


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCdLIM9hiWWP_D_PAlCAiwI35JcJXqKv3s",
//   authDomain: "vr-cat-a8b3a.firebaseapp.com",
//   projectId: "vr-cat-a8b3a",
//   storageBucket: "vr-cat-a8b3a.appspot.com",
//   messagingSenderId: "16540522175",
//   appId: "1:16540522175:web:5615aa1564ca725a73180a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// const auth =getAuth(app);
// const db = getFirestore(app);

// export { auth, db};

// src/stores/firebase.config.js
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';

// const firebaseConfig = {
//   apiKey: "your-api-key",
//   authDomain: "your-auth-domain",
//   databaseURL: "https://meowvradventures-default-rtdb.firebaseio.com",
//   projectId: "your-project-id",
//   storageBucket: "your-storage-bucket",
//   messagingSenderId: "your-messaging-sender-id",
//   appId: "your-app-id",
//   measurementId: "your-measurement-id"
// };

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// const auth = getAuth(app);

// export { auth, database, firebaseConfig };
