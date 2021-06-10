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
          <View style={styles.boxSpace1}></View>

          <View style={styles.box2}>
            <View>
              <TextInput
                style={{
                  height: 50,
                  width: "100%",
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
              />
            </View>
            <View>
              <Text style={styles.choose}>Choose background Color:</Text>
            </View>
            <View style={styles.rowofbuttons}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Background color"
                accessibilityHint="change the background color of chat message"
                onPress={() => this.setState({ backgroundColor: "#090C08" })}
                style={styles.blackbutton}
              >
                <Text></Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Background color"
                accessibilityHint="Let’s you choose to change the background color of chat message"
                onPress={() => this.setState({ backgroundColor: "#474056" })}
                style={styles.brownbutton}
              >
                <Text></Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Background color"
                accessibilityHint="Let’s you choose to change the background color of chat message"
                onPress={() => this.setState({ backgroundColor: "#8A95A5" })}
                style={styles.greybutton}
              >
                <Text></Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Backgorund color"
                accessibilityHint="Let’s you choose to change the background color of chat message"
                onPress={() => this.setState({ backgroundColor: "#B9C6AE" })}
                style={styles.greenbutton}
              >
                <Text></Text>
              </TouchableOpacity>
            </View>

            {/* Button to navigate to chat screen and load name state to chat screen*/}
            <View>
            <AwesomeButton
              accessible={true}
              accessibilityLabel="Start Chat"
              accessibilityHint="start chatting"
              textSize={16}
              justifyContent="center"
              width="100%"
              fontWeight={600}
              marginLeft={5}
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

          <View style={styles.boxspace2}></View>
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
    color: "#FFFFFF",
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
    height: "44%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    padding: 20,
  },
  boxSpace1: {
    flex: 20,
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
    padding: 10,
    width: "100%"
  },
  blackbutton: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 12,
    borderRadius: 100,
    backgroundColor: "#090C08",
  },
  brownbutton: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 12,
    borderRadius: 100,
    backgroundColor: "#474056",
  },
  greybutton: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 15,
    borderRadius: 100,
    backgroundColor: "#8A95A5",
  },
  greenbutton: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 12,
    borderRadius: 100,
    backgroundColor: "#B9C6AE",
  },
  logo: {
    marginTop: 20,
    marginBottom: 20,
  },
});
