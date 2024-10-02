// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsztSOEvQF7lWFa1h0gohWwSzMH1sCOcg",
  authDomain: "http://arina-151102.firebaseapp.com",
  projectId: "arina-151102",
  storageBucket: "http://arina-151102.appspot.com",
  messagingSenderId: "431314267144",
  appId: "1:431314267144:web:159f8cb8c67c4a1cfef5bd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };