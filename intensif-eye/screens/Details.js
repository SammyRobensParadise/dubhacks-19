import React, { Component } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
  } from "react-native";
import { Button } from "react-native-elements";

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
    goBack() {
        console.log("Navigating.......")
        const { navigate } = this.props.navigation
        navigate('Main')
    }
    render() {
        return (
            <View style={styles.imageContainer}>
                <Button
                title="Back"
                onPress={() => this.goBack()}>
            </Button>
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