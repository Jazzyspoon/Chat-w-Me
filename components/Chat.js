import React from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
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
          text: "This conversation is saved in logs",

          createdAt: new Date(),
          system: true,
          user: {
            _id: 1,
            name: name,
            avatar: "https://placeimg.com/140/140/any",
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "white",
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
        {/* Button to navigate back to start screen - tab is mad eavailable */}
        {/* <AwesomeButton
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
        </AwesomeButton> */}

        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
