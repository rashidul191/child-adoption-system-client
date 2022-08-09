// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_api_Key,
  authDomain: process.env.REACT_APP_auth_Domain,
  projectId: process.env.REACT_APP_project_Id,
  storageBucket: process.env.REACT_APP_storage_Bucket,
  messagingSenderId: process.env.REACT_APP_messaging_Sender_Id,
  appId: process.env.REACT_APP_app_Id,

  // apiKey: "AIzaSyDxbiM3UG7NrzeEor_3gXwp3PcDGW-pAsg",
  // authDomain: "child-adoption-system.firebaseapp.com",
  // projectId: "child-adoption-system",
  // storageBucket: "child-adoption-system.appspot.com",
  // messagingSenderId: "529778703643",
  // appId: "1:529778703643:web:30e8642fafb4e1f54827be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
