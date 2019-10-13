import React, { Component } from "react";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
  } from "react-native";

export default class DetailsScreen extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log(this.props.data)
    }
    render() {
        return (
            <View>
                <ScrollView>
                    <Image source={{uri: this.props.uri}}></Image>
                </ScrollView>
            </View>
        )
    }
}