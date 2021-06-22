import React from "react";
import { View, Platform, KeyboardAvoidingView, LogBox } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import MapView from "react-native-maps";
import CustomFunctions from "./CustomActions";
const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      isConnected: false,
      image: null,
    };

    // Initialize and connects Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDTHEJbw3-OSBAHpLauLX-30tdQulx4HwM",
        authDomain: "chat-w-me-e1812.firebaseapp.com",
        projectId: "chat-w-me-e1812",
        storageBucket: "chat-w-me-e1812.appspot.com",
        messagingSenderId: "81969105946",
        appId: "1:81969105946:web:368a72d5967139441755a3",
        measurementId: "G-1GLSYV8Z75",
      });
    }

    // Retrive msg
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  async componentDidMount() {
    // Check onlime status
    const { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: `${name}` });

    //set connection to firebase
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });

        // authenticates user with firebase
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              await firebase.auth().signInAnonymously();
            }
            this.setState({
              uid: user.uid,
              user: {
                _id: user.uid,
                name: name,
                avatar: "https://placeimg.com/140/140/any",
              },
              messages: [],
            });

            // listens for changes to DB
            this.unsubscribeChatUser = this.referenceChatMessages
              .orderBy("createdAt", "desc")
              .onSnapshot(this.onCollectionUpdate);
          });
      } else {
        this.setState({ isConnected: false });
        this.getMessages();
      }
    });
    //added to remove dependency incompatibility warnings
    LogBox.ignoreLogs(["Animated.event", "expo-permissions"]);
  }

  //query for stored msgs
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      // retrieves QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || null,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  };

  // Disconnect when close app
  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribeChatUser();
  }

  //retrieve the messages
  getMessages = async () => {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // adds new message to server DB
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      uid: this.state.uid,
      createdAt: message.createdAt,
      text: message.text || null,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  }

  // saves new message to client-side storage
  saveMessages = async () => {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Allow to delete msgs
  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  //store sent msgs
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessages();
      }
    );
  }

  // customize text bubbles
  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "green",
            color: "white",
          },
          left: {
            backgroundColor: "blue",
            color: "white",
          },
        }}
      />
    );
  };

  //render toolbar if connected online, disable if disconnected
  renderInputToolbar = (props) => {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  };

  //map rendering
  renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: Number(currentMessage.location.latitude),
            longitude: Number(currentMessage.location.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  //load custom functions and actions from customactions.js
  renderActions = (props) => {
    return <CustomFunctions {...props} />;
  };

  render() {
    // props user's Name
    const { color, name } = this.props.route.params;
    const { messages, uid } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar}
          messages={this.state.messages}
          renderCustomView={this.renderCustomView}
          renderActions={this.renderActions}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
