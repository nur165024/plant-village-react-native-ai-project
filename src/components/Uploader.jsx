import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Uploader = ({ imageUrl, setImageUrl, setData }) => {
  // react hook
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const handleRemoveImage = () => {
    setData(null);
    setError("");
    setLoading(true);
    setImageUrl(null);
    setLoading(false);
  };

  return (
    <>
      <View className="w-full text-center">
        <View>
          {imageUrl ? (
            <View className="relative">
              <Image
                source={{ uri: imageUrl }}
                style={{ width: 200, height: 200 }}
                className="inline-flex rounded-md p-2"
              />

              <TouchableOpacity className="absolute top-0 right-0 text-red-500 focus:outline-none cursor-pointer border border-red-400 rounded-md">
                <Feather
                  onPress={() => handleRemoveImage(imageUrl)}
                  size={30}
                  name="x"
                  color="#ff0000"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleSelectImage}
              className="flex border border-gray-300 rounded p-4"
            >
              <View style={{ alignItems: "center" }}>
                <Feather name="upload-cloud" size={30} color="#19d719" />
              </View>

              <Text
                style={{
                  fontSize: 12,
                  color: "#333",
                  marginTop: 8,
                  textAlign: "center",
                }}
              >
                Pick an image from camera roll
              </Text>
              <Text style={{ fontSize: 10, color: "#888", marginTop: 4 }}>
                (Only *.jpeg, *.webp and *.png images will be accepted)
              </Text>
            </TouchableOpacity>
          )}
          <Text className="text-green-500 my-4">{loading && err}</Text>
        </View>
      </View>
    </>
  );
};

export default Uploader;
