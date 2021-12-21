import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDW5dgG0rlAjI5Z1m8Uonwe0CMg7Ry3iEM",
  authDomain: "oktas-web.firebaseapp.com",
  projectId: "oktas-web",
  storageBucket: "oktas-web.appspot.com",
  messagingSenderId: "872137674944",
  appId: "1:872137674944:web:ef8504e26a3a44b4229d25"
};

// init firabase
initializeApp(firebaseConfig);

// init services
const auth = getAuth()
const storage = firebase.storage();
export { auth, storage, firebase as default};
