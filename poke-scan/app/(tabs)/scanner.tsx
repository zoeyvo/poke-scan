import ImageScannerComponent from "@/components/ImageScanner";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ScannerPage() {
  const [detectedText, setDetectedText] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <ImageScannerComponent  />
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
