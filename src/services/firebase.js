import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

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
const contactsRef = firestore.collection("contacts");
const paysRef = firestore.collection("pays");
const campaignsRef = firestore.collection("campaigns");
const dictationsRef = firestore.collection("dictations");

const usersAvatar = firebase.storage().ref("avatars");
const contactsFolder = firebase.storage().ref("contacts");

export const firebaseRegister = (imageUrl, name, lastname, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      const id = firebase.auth().currentUser.uid;
      return usersRef
        .doc(id)
        .set({ id, imageUrl, name, lastname, email, password });
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    });
};

export const firebaseLogin = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      localStorage.setItem("user", JSON.stringify(res.user));
      return res.user;
    });
};

export const firebaseLogout = () => {
  localStorage.removeItem("user");
  return firebase.auth().signOut();
};

export const firebaseCurrentUser = () => {
  return firebase.auth().onAuthStateChanged(user => {
    if (user !== null) {
      console.log(user);
    } else {
      console.log("No hay usuario");
    }
  });
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

export function uploadUserImage(file) {
  return usersAvatar
    .child(file.name)
    .put(file)
    .then(res => {
      res.ref.getDownloadURL();
    })
    .then(link => link)
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    });
}

export function saveUserImage(item) {
  let id = usersRef.doc().id;
  item.id = id;
  return usersRef.doc.id.set(item);
}

export function getUserImages() {
  return usersRef.get().then(snap => {
    let images = [];
    snap.docs.forEach(el => {
      images.push(el.data);
    });
    return images;
  });
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

export function createCustomer(item) {
  let id = item.id;
  if (!id) {
    id = customersRef.doc().id;
    item["id"] = id;
  }
  return customersRef.doc(id).set(item);
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

export function saveContactsExcel(file) {
  return contactsFolder
    .child(file.name)
    .put(file)
    .then(snap => {
      snap.ref.getDownloadURL();
    })
    .then(link => link)
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    });
}

export function getContacts() {
  return contactsRef
    .get()
    .then(snap => {
      const contacts = [];
      snap.forEach(value => {
        contacts.push(value.data());
      });
      return contacts;
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    });
}

export function getContact(id) {
  return contactsRef
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

export function getPays() {
  return paysRef
    .get()
    .then(snap => {
      const pays = [];
      snap.forEach(value => {
        pays.push(value.data());
      });
      return pays;
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    });
}

export function createPay(item) {
  let id = item.id;
  if (!id) {
    id = paysRef.doc().id;
    item["id"] = id;
  }
  return paysRef.doc(id).set(item);
}

export function getCampaigns() {
  return campaignsRef
    .get()
    .then(snap => {
      const campaigns = [];
      snap.forEach(value => {
        campaigns.push(value.data());
      });
      return campaigns;
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    });
}

export function createCampaign(item) {
  let id = item.id;
  if (!id) {
    id = campaignsRef.doc().id;
    item["id"] = id;
  }
  return campaignsRef.doc(id).set(item);
}

export function createDictation(item) {
  let id = item.id;
  if (!id) {
    id = dictationsRef.doc().id;
    item["id"] = id;
  }
  return dictationsRef.doc(id).set(item);
}

export function getDictations() {
  return dictationsRef
    .get()
    .then(snap => {
      const dictations = [];
      snap.forEach(value => {
        dictations.push(value.data());
      });
      return dictations;
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    });
}
