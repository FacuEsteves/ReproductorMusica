import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAlzFsGYvkKiYz30DoBoU5TDlQ2-8cErxc",
    authDomain: "react-native-firebase-7065d.firebaseapp.com",
    projectId: "react-native-firebase-7065d",
    storageBucket: "react-native-firebase-7065d.appspot.com",
    messagingSenderId: "485357791117",
    appId: "1:485357791117:web:2f120f11de5490423c7fc4"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
else(
    console.log("error: firebase")
)

export { firebase };