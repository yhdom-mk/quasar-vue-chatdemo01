// import { boot } from 'quasar/wrappers'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { fireConfig } from '../../firebaseconfig';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// export default boot(async (/* { app, router, ... } */) => {
//   // something to do
// })

// Your web app's Firebase configuration
const firebaseConfig = {
  // fireConfig
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "quasarchatapp-demo01.firebaseapp.com",
  databaseURL: "https://XXXXXXXXXXXXXXXXXXXXXXX.firebaseio.com",
  projectId: "quasarchatapp-demo01",
  storageBucket: "quasarchatapp-demo01.appspot.com",
  messagingSenderId: "XXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let firebaseAuth = firebase.auth();
let firebaseDb = firebase.database();
// let firebaseDb = firebase.firestore();


export { firebaseAuth, firebaseDb }