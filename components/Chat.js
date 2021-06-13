import React from "react";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      messages: [],
    };
  }

  //added componentdidmount to prevent warning
  componentDidMount() {
    const { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: `Hi, ${name}, You are now chatting.`,
          createdAt: new Date(),
          system: true,
          user: {
            _id: 1,
            name: `${name}`,
            avatar: "https://placeimg.com/140/140/any",
          },
        },
      ],
    });
  }

  // send button functionality

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  // Stylized bubbles for chat
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "white",
            color: "black",
          },
          right: {
            backgroundColor: "blue",
            color: "white",
          },
        }}
      />
    );
  }

  render() {
    //to load color choice from previous screen
    let backgroundColor = this.props.route.params.backgroundColor;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: backgroundColor,
        }}
      >
        <View style={[styles.rowofchatinput]}>
          <GiftedChat
            accessible={true}
            accessibilityLabel="Start Chat"
            accessibilityHint="start chatting"
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          ></GiftedChat>
          {/* Hiding button for future use or placeholder */}
          {/* <TouchableOpacity
            accessible={true}
            accessibilityLabel="More options"
            accessibilityHint="Lets you choose to send an image or your geolocation."
            accessibilityRole="button"
            onPress={this._onPress}
            style={styles.button}
          >
            <Text></Text>
          </TouchableOpacity> */}

          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "green",
  },
  rowofchatinput: {
    flex: 1,
    flexDirection: "row",
  },
});
