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
                require("../assets/images/small-eye.png")
              }
              style={styles.welcomeImage}
            />
          </View>
          <View style={styles.tabBarInfoContainer}>
            <TouchableOpacity onPress = {() => this.initiatePhotoQuery(CAMERA)}>
              <Image
                  source={
                    require("../assets/images/camera.png")
                  }
                  style={styles.buttonImageLeft}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => this.initiatePhotoQuery(GALLERY)}>
            <Image
                source={
                  require("../assets/images/upload.png")
                }
                style={styles.buttonImageRight}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.tabBarInfoContainer}>
            <TouchableOpacity onPress = {() => {/* todo */}}>
              <Image
                  source={
                    require("../assets/images/saved.png")
                  }
                  style={styles.buttonImageLeft}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => {/* todo */}}>
            <Image
                source={
                  require("../assets/images/setup.png")
                }
                style={styles.buttonImageRight}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    backgroundColor: "#070F3B"
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
    width: 150,
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
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonImageLeft: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    margin: 10,
    marginLeft: 50
  },
  buttonImageRight: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    margin: 10,
    marginRight: 50
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
});
