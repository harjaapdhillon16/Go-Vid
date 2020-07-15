import * as firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRUQipG8s_MuIND2kVEgmgodWqlG3uR7E",
  authDomain: "govid-faa37.firebaseapp.com",
  databaseURL: "https://govid-faa37.firebaseio.com",
  projectId: "govid-faa37",
  storageBucket: "govid-faa37.appspot.com",
  messagingSenderId: "810540696712",
  appId: "1:810540696712:web:815cf19ee9955668350b3d",
  measurementId: "G-D2XW0EZXSC",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
