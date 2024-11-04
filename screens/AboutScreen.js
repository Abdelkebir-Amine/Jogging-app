import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Jogging App</Text>
      <Text style={styles.description}>
        The Jogging App is designed to help you manage your jogging intervals
        with alternating periods of jogging and fast running. It vibrates at the
        end of each cycle and counts the loops completed.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});

export default AboutScreen;
