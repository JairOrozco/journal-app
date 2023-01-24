
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD57beN0S-3ah2zaekwH5jqCWFI6xEhzic",
    authDomain: "journalapp-ab3b2.firebaseapp.com",
    projectId: "journalapp-ab3b2",
    storageBucket: "journalapp-ab3b2.appspot.com",
    messagingSenderId: "597070763618",
    appId: "1:597070763618:web:76b8b690f29db838dbe33b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp )

export const FirebaseDB = getFirestore( FirebaseApp )