import firebase from "firebase";
fetch('/__/firebase/init.json').then(async response => {
  firebase.initializeApp(await response.json());
});
export default firebase
