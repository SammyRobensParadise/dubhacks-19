import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { throwStatement } from "@babel/types";

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        image: this.props.navigation.getParam("image"),
        data: props.navigation.getParam("jsonData")
    }
  }
  componentDidMount() {
  }

  navigateToRawText = () => {
    console.log("Navigating.......")
    const { navigate, getParam } = this.props.navigation
    const data = getParam('jsonData')
    navigate('Text', {
      jsonData: data
    })
  }
  render() {
    return (
        <View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: this.props.navigation.getParam("image") }}
          style={styles.image}
        ></Image>
      </View>
      <View>
          <Button title='Show Text' onPress={this.navigateToRawText}></Button>
      </View>
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
