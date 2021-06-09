import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Enter Your Screen Name</Text>
        <TextInput
          style={{
            height: 50,
            width: 170,
            borderColor: "blue",
            borderWidth: 2,
          }}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
          placeholder="Type here..."
        ></TextInput>
        <Button
          color="#007AFF"
          title="Go to Chat Screen"
          onPress={() =>
            this.props.navigation.navigate("Chat", { name: this.state.name })
          }
        />
      </View>
    );
  }
}
