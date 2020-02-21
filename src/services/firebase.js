import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

const firestore = firebase.firestore();

const usersRef = firestore.collection("users");
const customersRef = firestore.collection("customers");
// const assignmentsRef = firestore.collection("assignments");
// const campaignsRef = firestore.collection("campaigns");
// const paysRef = firebase.collection("pays");
// const ladysRefs = firebase.collection("ladys");

export const firebaseRegister = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const firebaseLogin = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const firebaseLogout = () => {
  return firebase.auth().signOut();
};

export function getUsers() {
  return usersRef
    .get()
    .then(snap => {
      const users = [];
      snap.forEach(value => {
        users.push(value.data());
      });
      return users;
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    });
}

export function getUser(id) {
  return usersRef
    .doc(id)
    .get()
    .then(doc => {
      return doc.data();
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    });
}

export function createUser(item) {
  let id = item.id;
  if (!id) {
    id = usersRef.doc().id;
    item["id"] = id;
  }
  return usersRef.doc(id).set(item);
}

export function getCustomers() {
  return customersRef
    .get()
    .then(snap => {
      const customers = [];
      snap.forEach(value => {
        customers.push(value.data());
      });
      return customers;
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    });
}

export function getCustomer(id) {
  return customersRef
    .doc(id)
    .get()
    .then(doc => {
      return doc.data();
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    });
}
