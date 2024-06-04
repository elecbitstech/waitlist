import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCO1ioXQGrre0wi_NmoWl-zXpNUGEqCEPk",
    authDomain: "eb-waitlist-form.firebaseapp.com",
    projectId: "eb-waitlist-form",
    storageBucket: "eb-waitlist-form.appspot.com",
    messagingSenderId: "830586011492",
    appId: "1:830586011492:web:e58cee2845bfdca819c471",
    measurementId: "G-RV55FWJGV1"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
