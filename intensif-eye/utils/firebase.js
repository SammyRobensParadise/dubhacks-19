import firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import uuid from 'react-native-uuid';

// Initialize blob
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


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
const mime = 'application/octet-stream'


export const uploadImage = async ((uri) => {
    try {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    let uploadBlob = null

    const imageRef = firebaseApp.storage().ref('images').child(uuid.v1())

    const base64Data = await fs.readFile(uploadUri, 'base64')
    const builtBlob = await Blob.build(base64Data, { type: `${mime};BASE64` })
    const uploadBlob = builtBlob
    await imageRef.put(blob, { contentType: mime })
    uploadBlob.close()
    return imageRef.getDownloadURL()
    }catch(e) {
        console.log(e)
        throw(e)
    }
})