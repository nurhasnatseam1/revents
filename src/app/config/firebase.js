import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";
import 'firebase/database';
import 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyBoTQbJ9382ZQnGUv6OEIw87Fu1MRoUroo",
    authDomain: "revents-977c1.firebaseapp.com",
    databaseURL: "https://revents-977c1.firebaseio.com",
    projectId: "revents-977c1",
    storageBucket: "revents-977c1.appspot.com",
    messagingSenderId: "682667176462",
    appId: "1:682667176462:web:55186c31c50d8f69b4825f",
    measurementId: "G-DZPTCPLFV5"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.storage();
firebase.firestore();


export default firebase;