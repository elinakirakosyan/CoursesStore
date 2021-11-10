import { initializeApp } from "firebase/app";
//import { getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBjhJzI2SVNjqWJX8WkeDWqn_0JSKYJHso",
  authDomain: "course-project-d4fa3.firebaseapp.com",
  projectId: "course-project-d4fa3",
  storageBucket: "course-project-d4fa3.appspot.com",
  messagingSenderId: "560436797154",
  appId: "1:560436797154:web:65dfb593fe316566ee48bb",
};

// const firebaseConfig = {
//     apiKey: "AIzaSyBDNCc03H6rZh3P34c5E98pR0hG3UBmN0E",
//     authDomain: "courses-bd136.firebaseapp.com",
//     projectId: "courses-bd136",
//     storageBucket: "courses-bd136.appspot.com",
//     messagingSenderId: "403989243114",
//     appId: "1:403989243114:web:44a956368fa26591f76393"
//   };

initializeApp(firebaseConfig);

const auth = getAuth();

//const db = getDatabase();
const db = getFirestore();

export { auth, db };
