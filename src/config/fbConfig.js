import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDSN8I_XgBrIEpoVuma32TDXztHYm74DiY",
  authDomain: "positivedisciplineschweiz.firebaseapp.com",
  databaseURL: "https://positivedisciplineschweiz.firebaseio.com",
  projectId: "positivedisciplineschweiz",
  storageBucket: "positivedisciplineschweiz.appspot.com",
  messagingSenderId: "602613327366"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;