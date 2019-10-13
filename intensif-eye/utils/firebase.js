import firebase from 'firebase'
import uuid from 'react-native-uuid';
import GOOGLE_CLOUD_VISION_API_KEY from '../config/environment'
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
        return uri
    }catch(e) {
        console.log(e)
        throw(e)
    }
}
export const sendImagetoGoogleVision = async (imageURL) => {
    try {
        let image = imageURL;
        let body = JSON.stringify({
          requests: [
            {
              features: [
                { type: "TEXT_DETECTION", maxResults: 150 },
              ],
              image: {
                source: {
                  imageUri: image
                }
              }
            }
          ]
        });
        let response = await fetch(
          "https://vision.googleapis.com/v1/images:annotate?key=" +
            GOOGLE_CLOUD_VISION_API_KEY,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: body
          }
        );
        let responseJson = await response.json();
         return responseJson

      } catch (error) {
        console.log(error);
      }
    }