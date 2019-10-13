import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

export default class TextScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        jsonResults: props.navigation.getParam('jsonDate')
    }
  }
  componentDidMount() {
      console.log(this.state.jsonResults)
  }

  render() {
    return (
        <View>
      <View style={styles.imageContainer}>
          <Text>sample text</Text>
      </View>
      <View>
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
