import firebase from 'firebase/app'
import 'firebase/auth';

const config={
    apiKey: "AIzaSyBLRIuw07zeT2NtIHS4YCkedooN4mCDAUs",
    authDomain: "fir-react-b8c16.firebaseapp.com",
    projectId: "fir-react-b8c16",
    storageBucket: "fir-react-b8c16.appspot.com",
    messagingSenderId: "690108622601",
    appId: "1:690108622601:web:30da54930c7b245f6d95d8"
}

 firebase.initializeApp(config)
 export default firebase