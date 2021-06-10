import React from "react";
import {
  ImageBackground,
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import Logo from "../assets/person-outline.svg";
import image from "../assets/backgroundimage.png";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

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
                  width: 260,
                  margin: 5,
                  borderColor: "blue",
                  borderRadius: 10,
                  borderWidth: 3,
                  textAlign: "center",
                  color: "black",
                  fontWeight: "300",
                  fontSize: 16,
                  opacity: "50%",
                }}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Enter Your Name..."
              >
                <Logo />
              </TextInput>
            </View>
            <View>
              <Text style={styles.choose}>Choose background Color:</Text>
            </View>
            <View style={styles.rowofbuttons}>
              <TouchableOpacity title="dark" style={styles.blackbutton}>
                <Text></Text>
              </TouchableOpacity>
              <TouchableOpacity title="br" style={styles.brownbutton}>
                <Text></Text>
              </TouchableOpacity>
              <TouchableOpacity title="gr" style={styles.greybutton}>
                <Text></Text>
              </TouchableOpacity>
              <TouchableOpacity title="gr" style={styles.greenbutton}>
                <Text></Text>
              </TouchableOpacity>
            </View>

            {/* Button to navigate to chat screen and load name state to chat screen*/}

            <AwesomeButton
              textSize={16}
              justifyContent="center"
              width={265}
              fontWeight={600}
              marginLeft={5}
              backgroundColor="#757083"
              hieght={40}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                })
              }
            >
              Start Chatting
            </AwesomeButton>
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
    flex: 40,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "white",
    width: "88%",
    height: "44%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    padding: 30,
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
    // opacity: 100,
    marginLeft: 10,
    justifyContent: "center",
  },
  rowofbuttons: {
    flex: 1,
    flexDirection: "row",
    padding: 1,
  },
  blackbutton: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 100,
    backgroundColor: "#090C08",
  },
  brownbutton: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 100,
    backgroundColor: "#474056",
  },
  greybutton: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 100,
    backgroundColor: "#8A95A5",
  },
  greenbutton: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 100,
    backgroundColor: "#B9C6AE",
  },
});
