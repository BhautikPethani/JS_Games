  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
  import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
  import {alertBox} from "/components/components.js";
  import {createToLocal, deleteFromLocal} from "/network-services/cookies.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAvfoIN1MtlMDenzuEe80NipObw9Vc_Hb8",
    authDomain: "taskmanagementsystem-e3f57.firebaseapp.com",
    databaseURL: "https://taskmanagementsystem-e3f57-default-rtdb.firebaseio.com",
    projectId: "taskmanagementsystem-e3f57",
    storageBucket: "taskmanagementsystem-e3f57.appspot.com",
    messagingSenderId: "452911175903",
    appId: "1:452911175903:web:dc40992d777547b8f7716a",
    measurementId: "G-N4MBHPYWHY"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize variables
  const auth = getAuth(app)
  export const database = getDatabase(app)
  export var currentUser = "";

  export async function registerNewUser(email, password, userName, firstName, lastName){
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        var user = userCredential.user;

        set(ref(database, 'users/' + userName), {
            email: email,
            firstName: firstName,
            lastName: lastName
        }).then(()=>{
            alertPlaceHolder.innerHTML = alertBox("success", "You're successfully registered");
        }).catch((error)=>{
          console.log(error.code);
          alertPlaceHolder.innerHTML = alertBox("danger", "Something went wrong !!");
        });
        
    }).catch((error) => {
      console.log(error.code);
      alertPlaceHolder.innerHTML = alertBox("danger", "Email is already registered !!");
    });
}

export function login(email, password){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        currentUser = user;
        createToLocal("user", user);
        window.location.replace("/AdminPanel/adminDashboard.html");
    }).catch((error) => {
      console.log(error);
      alertPlaceHolder.innerHTML = alertBox("danger", "Invalid Credentials !!");
    });
}

export async function checkUserIsSignedInOrNot(){
   onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
      createToLocal("user", user);
      // console.log(currentUser);
      // console.log("User signed in");
      // console.log(user);
      // ...
    } else {
      deleteFromLocal("user");
      window.location.replace("/index.html");
    }
  });
}

export function signOutCurrentUser(){
  signOut(auth).then(()=>{
    deleteFromLocal("user");
    window.location.replace("/index.html");
  }).catch((error)=>{
    deleteFromLocal("user");
    window.location.replace("/index.html");
  });
}