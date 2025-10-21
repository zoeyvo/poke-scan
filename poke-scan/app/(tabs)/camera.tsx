import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ImagePickerComponent } from "../../components/image-picker";

import { callGoogleVisionAsync } from "../../utils/helperFunctions";

export default function Camera() {
  const [detectedText, setDetectedText] = useState<string | null>(null);

  const handleImageSubmit = useCallback(async (base64Image: string) => {
    try {
      const text = await callGoogleVisionAsync(base64Image);
      setDetectedText(text);
    } catch (error) {
      console.error("Error processing image:", error);
      setDetectedText(null);
    }
  }, []);

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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    gap: 20,
  },
  textContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  text: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
