import React, { Component } from "react";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import {uploadImage,sendImagetoGoogleVision} from '../utils/firebase'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button } from "react-native-elements";
import { thisExpression } from "@babel/types";
const CAMERA = "CAMERA";
const GALLERY = "GALLERY";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      didRender: false,
      diduploadtofb: false,
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }
  initiatePhotoQuery = imageSource => {
    imageSource === GALLERY ? this._pickImage() : this._takePhoto();
  };
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
      const { statCam } = await Permissions.askAsync(Permissions.CAMERA);
      if (statCam !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    }
  };
  handleImageSendRecieve = async (uri) => {
    const url = await uploadImage(uri)
    if(uri != (null|| undefined)){
      this.setState({
        diduploadtofb: true
      })
    }
    const results = await sendImagetoGoogleVision(url)
    console.log("Navigating.......")
    const { navigate } = this.props.navigation
    navigate('Details', {
      image: uri,
      jsonData: results
    })
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });
    await this.handleImageSendRecieve(result.uri)
  };
  _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });
    await this.handleImageSendRecieve(result.uri)
  };
  getLoadingText = () => {
    if(this.state.diduploadtofb){
      return <Text style={styles.loadingText}>Uploading...</Text>
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/robot-dev.png")
                  : require("../assets/images/robot-prod.png")
              }
              style={styles.welcomeImage}
            />
          </View >
        </ScrollView>
        <View style={styles.welcomeContainer}>
          {this.getLoadingText()}
        </View>
        <View style={styles.tabBarInfoContainer}>
          <Button
            title="Choose From Gallery"
            onPress={() => this.initiatePhotoQuery(GALLERY)}
          ></Button>
          <Button
            title="Take Photo"
            onPress={() => this.initiatePhotoQuery(CAMERA)}
          ></Button>
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000029"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#000029",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  loadingText: {
    color: '#fff',
    fontSize: 20
  }
});
