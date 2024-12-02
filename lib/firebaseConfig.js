// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAsztSOEvQF7lWFa1h0gohWwSzMH1sCOcg",
  authDomain: "arina-151102.firebaseapp.com",
  databaseURL: "https://arina-151102-default-rtdb.firebaseio.com",
  projectId: "arina-151102",
  storageBucket: "arina-151102.firebasestorage.app",
  messagingSenderId: "431314267144",
  appId: "1:431314267144:web:159f8cb8c67c4a1cfef5bd",
  measurementId: "G-KP8L0NDBP0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app)


export { auth, db , database};