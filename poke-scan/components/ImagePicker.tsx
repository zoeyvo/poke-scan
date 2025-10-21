import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Button, Image, Text, View } from "react-native";

type Props = {
  onSubmit: (base64Image: string) => Promise<void>;
};

export function ImagePickerComponent({ onSubmit }: Props) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [statusText, setStatusText] = useState<string>("Please add an image");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      setStatusText("Opening image library...");
      const result: any = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        base64: true,
        allowsEditing: true,
      });

      // Handle both new (assets) and legacy API shapes
      const cancelled = result.canceled ?? result.cancelled ?? false;
      if (cancelled) {
        setStatusText("Cancelled");
        return;
      }

      const asset = result.assets ? result.assets[0] : result;
      const uri = asset?.uri;
      const base64 = asset?.base64 ?? result?.base64;

      if (!uri) {
        setStatusText("No image selected");
        return;
      }

      setImageUri(uri);
      if (!base64) {
        setStatusText("Selected image has no base64 data");
        return;
      }

      setLoading(true);
      setStatusText("Processing...");
      await onSubmit(base64);
      setStatusText("Submitted");
    } catch (err) {
      console.error("Image pick error", err);
      setStatusText("Error picking image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Button
        title="Pick an image from camera roll"
        onPress={pickImage}
        disabled={loading}
      />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 400, height: 300, resizeMode: "contain" }}
        />
      )}
      <Text>{statusText}</Text>
    </View>
  );
}
