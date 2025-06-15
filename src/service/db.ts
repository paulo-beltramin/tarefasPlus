
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyCW-LW9Kq3KXfDoaIWFxXeybbGainXy2jg",
  authDomain: "tarefasplus-c67b9.firebaseapp.com",
  projectId: "tarefasplus-c67b9",
  storageBucket: "tarefasplus-c67b9.firebasestorage.app",
  messagingSenderId: "976386826928",
  appId: "1:976386826928:web:7c580b7ba02f34c5255175"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}