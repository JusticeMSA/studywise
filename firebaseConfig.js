import * as firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD2gxMHCTPzWbeeGuKqF9_vGXwPRmC5Jjc",
    authDomain: "studywise-5acd5.firebaseapp.com",
    projectId: "studywise-5acd5",
    storageBucket: "studywise-5acd5.appspot.com",
    messagingSenderId: "847287070850",
    appId: "1:847287070850:web:17e2aecb0b5936d11cc49b"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };