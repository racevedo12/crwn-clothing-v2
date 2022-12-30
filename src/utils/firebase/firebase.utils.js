// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 
{ 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

import
{
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4nBru4IF8-kIAxG2xyD5a4z03wet8A0w",
  authDomain: "crwn-clothing-db-827aa.firebaseapp.com",
  projectId: "crwn-clothing-db-827aa",
  storageBucket: "crwn-clothing-db-827aa.appspot.com",
  messagingSenderId: "950687039499",
  appId: "1:950687039499:web:c4bffb3279ba2cb06d870e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters(
{
    prompt: "select_account"
});

// Google Auth
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>
{
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user data does not exists
  //create / set the document with the data from userAuth in my collection 
  if(!userSnapshot.exists() )
  {
    const { displayName, email } = userAuth;
    const createdAt = new Date();


    try
    {
      await setDoc(userDocRef, 
      {
        displayName,
        email,
        createdAt
      });
    }
    catch(e)
    {
      console.log("Error creating the user", e.message);
    }
  }

  // if user data exists
  // return userDocRef
  else
  {
    return userDocRef;
  }
  
};