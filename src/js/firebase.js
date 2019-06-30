import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";


var firebaseApp = {
    apiKey: "AIzaSyDayAsqSl2sr-a6eHXXjAeho2ExdOi5UDQ",
    authDomain: "games-database-ba355.firebaseapp.com",
    databaseURL: "https://games-database-ba355.firebaseio.com",
    projectId: "games-database-ba355",
    storageBucket: "",
    messagingSenderId: "287502193175",
    appId: "1:287502193175:web:c7ea00375d4af3b3"
};
const fbase = firebase.initializeApp(firebaseApp);
export default fbase