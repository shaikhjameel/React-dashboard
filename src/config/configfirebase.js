// firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBjGOP8TnUpYhGC1ihZCjuh04M5bBFBpUk",
    authDomain: "react-dashboard-fb.firebaseapp.com",
    projectId: "react-dashboard-fb",
    storageBucket: "react-dashboard-fb.firebasestorage.app",
    messagingSenderId: "717497887239",
    appId: "1:717497887239:web:554426d2553944c36698a2",
    measurementId: "G-SF6Z70SWSX"
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Export Firebase services for use in other files
export { db, auth, storage };
