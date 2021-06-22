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
        colorChoice: "",
        name: "",
        colors: ["#090C08", "#474056", "#8A95A5", "#B9C6AE"],
      });
  }
  // set the color and user name when chat button is pressed.
  onPressChat = (name, colorChoice) => {
    if (name == "") {
      return Alert.alert("Please Enter a Name .");
    }
    this.props.navigation.navigate("Chat", {
      name: `${name}`,
      backgroundColor: `${colorChoice}`,
    });
  };

  //start screen with username creation
  render() {
    const { navigation } = this.props;
    const { name, colors, colorChoice } = this.state;
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
                value={name}
                placeholder="Enter Your Name..."
                accessible={true}
                accessibilityLabel="Input Name"
                accessibilityHint="Input Name"
              />
            </View>
            <View>
              <Text style={styles.choose}>Choose background Color:</Text>
            </View>

            {/* Create buttons for user to choose background color */}
            <View style={styles.rowofbuttons}>
              {colors.map((color) => (
                <View
                  style={[
                    styles.colorBorder,
                    colorChoice === color ? { borderColor: "#757083" } : null,
                  ]}
                  key={color}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ colorChoice: color })}
                    style={[styles.colorButton, { backgroundColor: color }]}
                  />
                </View>
              ))}
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
                width={250}
                fontWeight={600}
                marginTop={10}
                backgroundColor="#757083"
                height={60}
                onPress={() =>
                  navigation.navigate("Chat", {
                    name: name,
                    color: colorChoice,
                  })
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
    flex: 24,
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
    flex: 5,
    flexDirection: "row",

    justifyContent: "space-evenly",
  },
  colorBorder: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#fff",
    borderRadius: 100,
    padding: 3,
    height: 50,
    width: 50,
  },
  colorButton: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
