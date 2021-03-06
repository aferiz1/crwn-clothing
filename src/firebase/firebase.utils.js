import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config =  {
    apiKey: "AIzaSyBuEW9KsY7Ig-cQct8Tt1k5zUEDSPFuTIk",
    authDomain: "crwn-db-7053f.firebaseapp.com",
    databaseURL: "https://crwn-db-7053f.firebaseio.com",
    projectId: "crwn-db-7053f",
    storageBucket: "crwn-db-7053f.appspot.com",
    messagingSenderId: "869325009900",
    appId: "1:869325009900:web:53a235a1649909dbe606c9",
    measurementId: "G-2RKJVSSKST"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exits){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      }catch(error){
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };
  
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
