import React from "react";
import { View, Platform, KeyboardAvoidingView, StyleSheet } from "react-native";
import { CameraPhotoButton } from "./cameraphotobutton";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import firebase from "firebase";
import "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import MapView from "react-native-maps";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

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
    // create a reference to your Firestore collection
    //This stores and retrieves the chat messages users send.
    this.referenceChatMessages = firebase.firestore().collection("messages");

    this.state = {
      messages: [],
      user: {},
      uid: 0,
      isConnected: false,
      image: null,
      location: null,
    };
  }
  //added componentdidmount
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

  async componentDidMount() {
    // Check onlime status
    NetInfo.fetch().then((state) => {
      var isConnected = state.isConnected;
      this.setState({
        isConnected,
      });
      this.getMessages();
      if (isConnected) {
        // firebase call
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              user = await firebase.auth().signInAnonymously();
            }
            // Update user
            this.setState({
              uid: user.uid,
            });
          });
        // update collection
        this.unsubscribe = this.referenceMessages
          .orderBy("createdAt", "desc")
          .onSnapshot(this.onCollectionUpdate);
      }
    });

    this.setState({
      messages: [
        {
          _id: 1,
          text: `${this.props.route.params.name} + ' is here!'`,
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }
  //query for stored msgs
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Map throug documents
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image,
        location: data.location,
      });
    });
    this.setState({
      messages,
    });
  };

  // Disconnect when close app

  componentWillUnmount() {
    this.authUnsubscribe();
    //this.unsubscribe();
  }

  //store sent msgs
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.saveMessages();
      }
    );
    this.addMessage(messages);
  }

  // Add new msg to database
  addMessage(message) {
    const { _id, createdAt, text, user, image, location } = message[0];
    this.referenceMessages.add({
      _id: _id,
      createdAt: createdAt,
      text: text || null,
      user: {
        _id: user._id,
        name: user.name,
      },
      image: image || null,
      location: location || null,
    });
  }
  // save msg for ofline access

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

  // Allow to delete msgs

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
    } catch (error) {
      console.log(error.message);
    }
  }

  // customize text bubbles
  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#99F99F",
            color: "#ffffff",
          },
          left: {
            backgroundColor: "#99FFFf",
            color: "#ffffff",
          },
        }}
      />
    );
  };

  renderInputToolbar = (props) => {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  };

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      const longitude = parseInt(currentMessage.location.longitude);
      const latitude = parseInt(currentMessage.location.latitude);
      return (
        <MapView
          style={{
            width: 250,
            height: 150,
            borderRadiuse: 15,
            margin: 5,
          }}
          region={{
            longitude,
            latitude,
            longitudeDelta: 0.0421,
            latitudeDelta: 0.0922,
          }}
        />
      );
    }
    return null;
  }

  renderActions = (props) => {
    return <CameraPhotoButton {...props} />;
  };

  render() {
    //to load color choice from previous screen
    let backgroundColor = this.props.route.params.backgroundColor;
    const { name } = this.props.route.params;
    const { messages, uid } = this.state;
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={[styles.mainview, { backgroundColor: backgroundColor }]}>
        <GiftedChat
          accessible={true}
          accessibilityLabel="Start Chat"
          accessibilityHint="start chatting"
          renderInputToolbar={this.renderInputToolbar}
          renderBubble={this.renderBubble.bind(this)}
          renderCustomView={this.renderCustomView}
          renderActions={this.renderActions}
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

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
  },
});
