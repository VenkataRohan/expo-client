import  firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrKBt0b8_oi3R3E-qLdvpHKCxqcgrVl-Y",
  authDomain: "fir-auth-f53f4.firebaseapp.com",
  projectId: "fir-auth-f53f4",
  storageBucket: "fir-auth-f53f4.appspot.com",
  messagingSenderId: "613735947416",
  appId: "1:613735947416:web:4232a4aa466870190544ed"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
const storage=firebase.storage(app)
const auth = firebase.auth()
const db = firebase.firestore(app);
var msgRef = db.collection("msg");
var userRef= db.collection("user");
var postRef= db.collection("posts");
var groupRef= db.collection("group");
var groupmsgRef= db.collection("group");

var ref1 = storage.ref();

var s=firebase.firestore.FieldValue

export { auth,msgRef,userRef,ref1,postRef ,groupRef,groupmsgRef,s};






// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore,doc, setDoc, collection, getDocs,addDoc} from "firebase/firestore"; 
// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://firebase.google.com/docs/web/learn-more#config-object


// const firebaseConfig = {
//   // ...
// apiKey: "AIzaSyDrKBt0b8_oi3R3E-qLdvpHKCxqcgrVl-Y",
//   authDomain: "fir-auth-f53f4.firebaseapp.com",
//   projectId: "fir-auth-f53f4",
//   storageBucket: "fir-auth-f53f4.appspot.com",
//   messagingSenderId: "613735947416",
//   appId: "1:613735947416:web:4232a4aa466870190544ed"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const msgRef = collection(db, 'msg')
// const usrRef=collection(db,'user')
// getDocs(msgRef)
//   .then(snapshot => {
//     //console.log(snapshot.docs)
//     //let books = []
//     snapshot.docs.forEach(doc => {
//       console.log(doc.data().text)

//     })
//     // console.log(books)
//   })
//   .catch(err => {
//     console.log(err.message)
//   })

//   getDocs(usrRef)
//   .then(snapshot => {
//     //console.log(snapshot.docs)
//     //let books = []
//     snapshot.docs.forEach(doc => {
//       console.log(doc.data())

//     })
//     // console.log(books)
//   })
//   .catch(err => {
//     console.log(err.message)
//   })
// const storeMsg=async(from,to,text)=>{
//  await addDoc(msgRef, {
//     from,
//     to,
//     text,
//     createdAt:new Date()
//   });
// }

// //storeMsg("1","2","123456")

// // Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);



// export { auth ,storeMsg};









