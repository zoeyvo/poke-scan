import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ImagePickerComponent } from "@/components/ImagePicker";

export default function PickerPage() {
  const [detectedText, setDetectedText] = useState<string | null>(null);

  const handleImageSubmit = async (base64: string) => {
    setDetectedText("Sample picked image text");
  };

  return (
    <View style={styles.container}>
      <ImagePickerComponent onSubmit={handleImageSubmit} />
      {detectedText && (
        <View style={styles.textContainer}>
          <Text style={styles.label}>Detected Text:</Text>
          <Text style={styles.text}>{detectedText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  textContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  label: { fontWeight: "bold" },
  text: { marginTop: 4 },
});
