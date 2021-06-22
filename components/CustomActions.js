import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import firebase from "firebase";
import "firebase/firestore";

export default class CustomFunctions extends React.Component {
  // Creating Functions for users like Location, Img share

  onActionPress = () => {
    const options = ["Send Image", "Take Photo", "Send Location", "Cancel"];

    const cancelButtonIndex = options.length - 1;

    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return this.pickImage();
          case 1:
            return this.takePhoto();
          case 2:
            return this.getLocation();
          default:
        }
      }
    );
  };

  // Permission request before use any of Phone function

  pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status === "granted") {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));

        // save image to DB if process not cancelled
        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Permission for camera

  takePhoto = async () => {
    try {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.MEDIA_LIBRARY
      );

      if (status === "granted") {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));

        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // uploads images to Firebase in blob format
  uploadImageFetch = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      // creates new XMLHttpRequest
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (error) {
        console.log(error);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      // opens connection to retrieve image data
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    // creates unique filenames for Firebase storage
    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    // creates reference to Firebase storage
    const ref = firebase.storage().ref().child(`${imageName}`);
    const snapshot = await ref.put(blob);
    // closes connection
    blob.close();

    // gets image URL from Firebase storage
    return await snapshot.ref.getDownloadURL();
  };
  // Permission for location

  getLocation = async () => {
    // requests permission to access user location
    const { status } = await Location.requestForegroundPermissionsAsync();

    try {
      if (status === "granted") {
        const result = await Location.getCurrentPositionAsync({}).catch(
          (error) => console.log(error)
        );

        const latitude = JSON.stringify(result.coords.latitude);
        const longitude = JSON.stringify(result.coords.longitude);

        if (result) {
          this.props.onSend({
            location: {
              latitude,
              longitude,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={this.onActionPress}
        accessible={true}
        accessibilityLabel="More options"
        accessibilityHint="Choose to send an image from your media library, a photo taken with your camera or your geolocation"
        accessibilityRole="Button"
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },

  wrapper: {
    borderRadius: 15,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },

  iconText: {
    color: "#2b2b2b",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

CustomFunctions.contextTypes = {
  actionSheet: PropTypes.func,
};
