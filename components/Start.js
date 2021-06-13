import React from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import image from "../assets/backgroundimage.png";

export default class Start extends React.Component {
  constructor(props) {
    super(props),
      (this.state = {
        backgroundColor: "",
        name: "",
      });
  }
  // set the color and user name when chat button is pressed.
  onPressChat = (name, backgroundColor) => {
    if (name == "") {
      return Alert.alert("Please Enter a Name .");
    }
    this.props.navigation.navigate("Chat", {
      name: `${name}`,
      backgroundColor: `${backgroundColor}`,
    });
  };

  //start screen with username creation
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.boxSpace1}></View>
          <View style={styles.boxspace2}>
            <Text style={styles.texttitle}>Chat w/Me</Text>
          </View>
          {/* added views for spacing */}
          <View style={styles.boxSpace1}></View>
          {/* main box holding inputs and buttons */}
          <View style={styles.box2}>
            <View>
              <TextInput
                style={{
                  height: 50,
                  width: "95%",
                  margin: 5,
                  borderColor: "blue",
                  borderRadius: 10,
                  borderWidth: 3,
                  textAlign: "center",
                  color: "black",
                  fontWeight: "300",
                  fontSize: 16,
                }}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Enter Your Name..."
                accessible={true}
                accessibilityLabel="Input Name"
                accessibilityHint="Input Name"
              />
            </View>
            <View>
              <Text style={styles.choose}>Choose background Color:</Text>
            </View>
            {/* row of buttons for screen color choices */}
            <View style={styles.rowofbuttons}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Background color"
                accessibilityHint="change the background color of chat message to black"
                onPress={() =>
                  this.setState({ backgroundColor: "#090C08", color: "white" })
                }
                style={styles.blackbutton}
              >
                <Text></Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Background color"
                accessibilityHint="change the background color of chat message to brown"
                onPress={() =>
                  this.setState({ backgroundColor: "#474056", color: "white" })
                }
                style={styles.brownbutton}
              >
                <Text></Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Background color"
                accessibilityHint="change the background color of chat message to grey"
                onPress={() =>
                  this.setState({ backgroundColor: "#8A95A5", color: "black" })
                }
                style={styles.greybutton}
              >
                <Text></Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Background color"
                accessibilityHint="change the background color of chat message to green"
                onPress={() =>
                  this.setState({ backgroundColor: "#B9C6AE", color: "black" })
                }
                style={styles.greenbutton}
              >
                <Text></Text>
              </TouchableOpacity>
            </View>

            {/* Button to navigate to chat screen and load name state to chat screen*/}
            <View
              style={{
                padding: 20,
              }}
            >
              <AwesomeButton
                accessible={true}
                accessibilityLabel="Start Chat"
                accessibilityHint="start chatting"
                textSize={16}
                justifyContent="center"
                width={242}
                fontWeight={600}
                marginTop={50}
                backgroundColor="#757083"
                height={50}
                onPress={() =>
                  this.onPressChat(this.state.name, this.state.backgroundColor)
                }
                style={[styles.button]}
              >
                Start Chatting
              </AwesomeButton>
            </View>
          </View>
          <View
            style={{
              padding: 10,
            }}
          ></View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#090C08",
    justifyContent: "center",
    alignItems: "center",
  },
  texttitle: {
    color: "white",
    fontSize: 45,
    fontWeight: "600",
    textAlign: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
  },
  boxspace2: {
    flex: 10,
  },
  box2: {
    flex: 25,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "white",
    width: "88%",
    height: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    padding: 20,
  },
  boxSpace1: {
    flex: 12,
  },
  boxSpace4: {
    justifyContent: "center",
    textAlign: "center",
  },
  button1: {
    color: "#841584",
  },
  choose: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    width: "100%",
    padding: 10,

    justifyContent: "center",
  },
  rowofbuttons: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 15,
    justifyContent: "space-evenly",
  },
  blackbutton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 12,
    borderRadius: 100,
    backgroundColor: "#090C08",
  },
  brownbutton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 12,
    borderRadius: 100,
    backgroundColor: "#474056",
  },
  greybutton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 12,
    borderRadius: 100,
    backgroundColor: "#8A95A5",
  },
  greenbutton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 12,
    borderRadius: 100,
    backgroundColor: "#B9C6AE",
  },
});
