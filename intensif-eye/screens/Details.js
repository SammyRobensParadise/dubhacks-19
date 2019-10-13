import React, { Component } from "react";
import { StyleSheet, Image, View, Alert } from "react-native";
import { Button } from "react-native-elements";

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.navigation.getParam("image"),
      data: props.navigation.getParam("jsonData")
    };
  }
  navigateToRawText = () => {
    console.log("Navigating.......");
    const { navigate, getParam } = this.props.navigation;
    const data = getParam("jsonData");
    if (data.responses[0]){
      Alert.alert(
        'No text was found!',
        'Please try another image',
        [
          {text: 'Okay', onPress: () => {}}
        ],
        {cancelable: true},
      );
      return
    }
    navigate("Text", {
      jsonData: data
    });
  };
  goBack(){
    console.log("Navigating.......");
    const { navigate } = this.props.navigation;
    navigate("Main");
  }
  render() {
    return (
      <View style={styles.imageContainer}>

        <Image
          source={{ uri: this.props.navigation.getParam("image") }}
          style={styles.image}
        ></Image>
        <Button title="Show Text" onPress={this.navigateToRawText}></Button>
        <Button title="Back" onPress={() => this.goBack()}></Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "stretch"
  },
  image: {
    flex: 1
  }
});
