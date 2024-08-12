import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTogEWquT9Oa5rDDDRi0idwSyy4rctB-k",
  authDomain: "todo-tdd-28906.firebaseapp.com",
  databaseURL: "https://todo-tdd-28906-default-rtdb.firebaseio.com",
  projectId: "todo-tdd-28906",
  storageBucket: "todo-tdd-28906.appspot.com",
  messagingSenderId: "2702874319",
  appId: "1:2702874319:web:c4ac3688d0585bbb3649ba",
  measurementId: "G-1BPSWYPRXJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
