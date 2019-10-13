import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";


export default class TextScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        jsonResults: this.props.navigation.getParam('jsonData'),
    }
  }
  componentDidMount() {
      console.log(this.state.jsonResults.responses[0].textAnnotations[0].description)
  }

  render() {
    return (
        <ScrollView>
        <View style={styles.container}>
      <View style={styles.imageContainer}>
          <Text style={styles.text}>{this.state.jsonResults.responses[0].textAnnotations[0].description}</Text>
      </View>
      <View>
      </View>
      </View>
      </ScrollView>
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
  },
  container: {
    flex: 1,
    backgroundColor: "#000029",
  },
  text: {
      color: '#fff',
      fontSize: 48
  }
});
