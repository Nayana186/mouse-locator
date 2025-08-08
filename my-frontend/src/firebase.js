import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, get } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCuZxLg2kXnfed4XbWSyOBPJIpan0UjNXs",
  authDomain: "useless-46a51.firebaseapp.com",
  projectId: "useless-46a51",
  storageBucket: "useless-46a51.firebasestorage.app",
  messagingSenderId: "468727716191",
  appId: "1:468727716191:web:54099f07e0507c0280beea",
  measurementId: "G-2YXV70R6GS"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);