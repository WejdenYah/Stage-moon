import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBjfOBVHj5ZgapiCK0OfeJKapN9XL7RCAo",
  authDomain: "todo-app-3a221.firebaseapp.com",
  projectId: "todo-app-3a221",
  storageBucket: "todo-app-3a221.appspot.com",
  messagingSenderId: "656286115263",
  appId: "1:656286115263:web:7d41f664db10e5e112ad0a"
};

const app = initializeApp(firebaseConfig)
export default firebase 