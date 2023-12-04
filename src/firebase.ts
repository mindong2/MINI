// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgspe77QB9Hvm7pEFk0Ty0V4tB6mQytGE",
  authDomain: "mini-mindong2.firebaseapp.com",
  projectId: "mini-mindong2",
  storageBucket: "mini-mindong2.appspot.com",
  messagingSenderId: "398841420489",
  appId: "1:398841420489:web:58a107d888b2ea367a4b18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
