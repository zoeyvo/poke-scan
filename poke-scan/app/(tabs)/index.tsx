import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { color: "#fff", fontSize: 18 },
  camera: { flex: 1 },
});
