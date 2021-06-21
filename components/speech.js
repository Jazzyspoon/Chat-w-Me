import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import * as Speech from "expo-speech";

export function SpeechButton() {
  const speak = () => {
    const thingToSay = "1";
    Speech.speak(thingToSay);
  };

  return (
    <View style={styles.container}>
      <Button title="Press to hear some words" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
