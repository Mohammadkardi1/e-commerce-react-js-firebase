import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDnxKdlaUyKRp3c_PnhGEXSfRK7ojO20bE",
    authDomain: "e-commerce-react-js-fire-fd3c7.firebaseapp.com",
    projectId: "e-commerce-react-js-fire-fd3c7",
    storageBucket: "e-commerce-react-js-fire-fd3c7.appspot.com",
    messagingSenderId: "426883091922",
    appId: "1:426883091922:web:ded52ee80f8548feedcc0b"
};


// initializeApp: initializes a connection between your application and the Firebase backend.
// This method takes a configuration object as its parameter, which contains the configuration
// details for your Firebase project.
const app = initializeApp(firebaseConfig);


// You can use firebase.storage() to create an instance of the Firebase Storage object, 
// which allows you to upload, download, and manage files in your Firebase Storage buckets.
const storage = getStorage(app);


// 1. firestore() is a method that gives you access to the Firestore database service.
// 2. You can use firestore() to create an instance of the Firestore object, which allows you 
// to read and write data to Firestore collections and documents in your application.
const db = getFirestore(app);



// 1. firebase.auth() is a method gives you access to the Firebase Authentication service.
// 2. You can use firebase.auth() to create an instance of the Firebase Auth object, 
// which allows you to authenticate users in your application using various authentication 
// providers such as email and password, Google, Facebook, Twitter, and more.
const auth = getAuth(app);



// export { auth, db, storage }
export {auth, storage, db }
