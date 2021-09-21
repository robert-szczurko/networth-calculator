import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBNlCQuVuW7OPmlzYrm58F-Arr67kMF5sI",
  authDomain: "networth-calculator-3cb78.firebaseapp.com",
  projectId: "networth-calculator-3cb78",
  storageBucket: "networth-calculator-3cb78.appspot.com",
  messagingSenderId: "561739090769",
  appId: "1:561739090769:web:9ac308603fefa1f7df2170",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
