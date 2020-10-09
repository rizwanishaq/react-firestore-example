import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzcFy286wZkQ4hH0u-0qt_jGvQJq5Yy6E",
  authDomain: "devistry-challenge.firebaseapp.com",
  databaseURL: "https://devistry-challenge.firebaseio.com",
  projectId: "devistry-challenge",
  storageBucket: "devistry-challenge.appspot.com",
  messagingSenderId: "578965841932",
  appId: "1:578965841932:web:930919b3360b315f03e629",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = async () => {
  await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};
