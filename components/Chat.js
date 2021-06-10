import React, { useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  //added componentdidmount to prevent warning
  componentDidMount() {
    const { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
  }
  render() {
    //to load color choice from previous screen
    let backgroundColor = this.props.route.params.backgroundColor;

    return (
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: backgroundColor,
        }}
      >
        {/* Button to navigate back to start screen - tab is mad eavailable */}
        <AwesomeButton
          marginLeft="auto"
          marginRight="auto"
          textSize={20}
          justifyContent="center"
          width={190}
          backgroundColor="green"
          hieght={40}
          onPress={() => this.props.navigation.navigate("Start")}
        >
          Go To Start Screen
        </AwesomeButton>
      </View>
    );
  }
}
