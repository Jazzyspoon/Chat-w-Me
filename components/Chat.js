import React from "react";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import firebase from "firebase";
import "firebase/firestore";
import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";

const firebase = require("firebase");
require("firebase/firestore");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTHEJbw3-OSBAHpLauLX-30tdQulx4HwM",
  authDomain: "chat-w-me-e1812.firebaseapp.com",
  projectId: "chat-w-me-e1812",
  storageBucket: "chat-w-me-e1812.appspot.com",
  messagingSenderId: "81969105946",
  appId: "1:81969105946:web:368a72d5967139441755a3",
  measurementId: "G-1GLSYV8Z75",
};


  export default class Chat extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        messages: [],
        uid: 0,
        user: {
          _id: "",
          name: "",
          avatar: "",
        },
        isConnected: false,
      };

      // Initialize and connects Firebase
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

     // create a reference to your Firestore collection
    //This stores and retrieves the chat messages users send.
      this.referenceChatMessages = firebase.firestore().collection("messages");
    }

    //added componentdidmount
    componentDidMount() {
      const { name } = this.props.route.params;
      this.props.navigation.setOptions({ title: name });
      firebase.auth().onAuthStateChanged();
      NetInfo.fetch().then((connection) => {
        if (connection.isConnected) {
          this.setState({ isConnected: true });
          console.log("online");
          // Authenticates user 
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
              this.unsubscribe = this.referenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
            });
        } else {
          console.log("offline");
          this.setState({ isConnected: false });
          this.getMessages();
        }
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    // function that loads the messages from asyncStorage
    async getMessages() {
      let messages = "";
      try {
        messages = (await AsyncStorage.getItem("messages")) || [];
        this.setState({
          messages: JSON.parse(messages),
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    //function add message
    addMessage() {
      const message = this.state.messages[0];
      console.log(message);
      this.referenceChatMessages.add({
        _id: message._id,
        uid: this.state.uid,
        createdAt: message.createdAt,
        text: message.text || null,
        user: message.user,
      });
    }

    //retrieve the current data in  collection and store it in your state messages
    onCollectionUpdate = (querySnapshot) => {
      const messages = [];
      // go through each document
      querySnapshot.forEach((doc) => {
        // get the QueryDocumentSnapshot's data
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
        });
        console.log(data.text);
      });
      this.setState({
        messages,
      });
    };

    // saves new message to client-side
    async saveMessages() {
      try {
        await AsyncStorage.setItem(
          "messages",
          JSON.stringify(this.state.messages)
        );
      } catch (error) {
        console.log(error.message);
      }
    }

    // adds new message to  array
    onSend(messages = []) {
      console.log("kj");
      console.log(messages);
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

    // deletes messages from client-side storage
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
    //notifies if offline
    renderInputToolbar = (props) => {
      if (this.state.isConnected === false) {
      } else {
        return <InputToolbar {...props} />;
      }
    };
    render() {
      //to load color choice from previous screen
      let backgroundColor = this.props.route.params.backgroundColor;

      return (
        <View style={[styles.mainview, { backgroundColor: backgroundColor }]}>
          <GiftedChat
            accessible={true}
            accessibilityLabel="Start Chat"
            accessibilityHint="start chatting"
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={this.state.user}
          ></GiftedChat>

          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null}
        </View>
      );
    }
  }
};
const styles = StyleSheet.create({
  mainview: {
    flex: 1,
  },
});
