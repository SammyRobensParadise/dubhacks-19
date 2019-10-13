import React, { Component } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
  } from "react-native";

export default class DetailsScreen extends Component {
    constructor(props) {
        super(props)
        console.log("Detailed props")
        console.log(props.navigation.getParam('image'))
        console.log(props.navigation.getParam('jsonData'))
    }
    componentDidMount() {
        console.log(this.props.image)
        console.log(this.props.jsonData)
    }
    render() {
        return (
            <View style={styles.imageContainer}>
                <Image 
                source={{uri: this.props.navigation.getParam('image')}}
                style={styles.image}></Image>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        alignItems: 'stretch'
      },
    image: {
        flex: 1
      }
})