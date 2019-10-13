import React, { Component, Fragment } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";

export default class TextScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonResults: this.props.navigation.getParam("jsonData")
    };
  }
  componentDidMount() {}
  renderText = () => {
    return (
      <Text style={styles.text}>
        {this.state.jsonResults.responses[0].textAnnotations[0].description}
      </Text>
    );
  };
  render() {
    return (
      <Fragment>
        <SafeAreaView style={styles.safeArea}></SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View>{this.renderText()}</View>
            <View></View>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    marginLeft: 20,
    textAlign: "left",
    marginStart: 20
  },
  image: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#070F3B"
  },
  text: {
    color: "#fff",
    fontSize: 48,
    backgroundColor: "#070F3B"
  },
  safeArea: {
    backgroundColor: "#070F3B",
    flex: 0
  },
  scrollView: {
      backgroundColor: "#070F3B"
  }
});
