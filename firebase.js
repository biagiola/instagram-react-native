import firebase from 'firebase'
import 'firebase/firestore'
//import { firebase } from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCt7H4WUDBAHbRWOy7dAbH-FVzZ9AWtCdM",
  authDomain: "instagram-clone-cf324.firebaseapp.com",
  databaseURL: "https://instagram-clone-cf324.firebaseio.com",
  projectId: "instagram-clone-cf324",
  storageBucket: "instagram-clone-cf324.appspot.com",
  messagingSenderId: "5413006022",
  appId: "1:5413006022:web:139c80bde7dc5944bc45c7"
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export default { firebase, db, auth, storage }