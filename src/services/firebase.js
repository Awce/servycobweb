import firebase from "firebase/app";
import "react/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnDMrIoOXrbyuEVePpqHVk52iecUh8IrE",
  authDomain: "servycob-app.firebaseapp.com",
  databaseURL: "https://servycob-app.firebaseio.com",
  projectId: "servycob-app",
  storageBucket: "servycob-app.appspot.com",
  messagingSenderId: "846865397214",
  appId: "1:846865397214:web:27409145980eaef94f994f",
  measurementId: "G-XYFETCL3RW"
};

firebase.initializeApp(firebaseConfig);
