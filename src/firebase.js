import * as firebase from "firebase";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxc3iuMrcALlahOjN2RRPAO9mby5m8ciY",
  authDomain: "eshop-d1739.firebaseapp.com",
  databaseURL: "https://eshop-d1739.firebaseio.com",
  projectId: "eshop-d1739",
  storageBucket: "eshop-d1739.appspot.com",
  messagingSenderId: "576771719144",
  appId: "1:576771719144:web:0476a2fa737af5c055ae5d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export

// Used for loggin in the registrated user
// and Google log in
export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
