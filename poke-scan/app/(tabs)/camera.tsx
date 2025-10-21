import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>We need camera permission</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showCamera ? (
        <CameraView style={styles.camera} facing="back" />
      ) : (
        <Button title="Open Camera" onPress={() => setShowCamera(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18 },
  camera: { flex: 1 },
});
