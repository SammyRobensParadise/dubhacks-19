import firebase from 'firebase'
import uuid from 'react-native-uuid';
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDV0-438GM9g_aYHf08qv3ldwj8JRmiv14",
    authDomain: "intensif-eye.firebaseapp.com",
    databaseURL: "https://intensif-eye.firebaseio.com",
    projectId: "intensif-eye",
    storageBucket: "intensif-eye.appspot.com",
    messagingSenderId: "319266289099",
    appId: "1:319266289099:web:904cf07b00537185c8b24e",
    measurementId: "G-17XWTQRNXQ"
  }
  
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
const mime = 'image/jpg'


export const uploadImage = async (imageURI) => {
    try {
        const response = await fetch(imageURI);
        const blob = await response.blob();
        const imageRef = firebaseApp.storage().ref(`${uuid.v1()}.jpg`)
        await imageRef.put(blob, { contentType: mime })
        const uri = await imageRef.getDownloadURL()
        console.log(uri)
    }catch(e) {
        console.log(e)
        throw(e)
    }
}