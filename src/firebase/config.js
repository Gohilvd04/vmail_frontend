import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBQhCOeLm9l669JeUYwdtdXpwsb12m2icM",
    authDomain: "vmail-b2bd5.firebaseapp.com",
    projectId: "vmail-b2bd5",
    storageBucket: "vmail-b2bd5.appspot.com",
    messagingSenderId: "1013922192367",
    appId: "1:1013922192367:web:6db9962268504ecabf741a"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);





