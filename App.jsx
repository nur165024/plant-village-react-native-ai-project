import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
// internal imports
import CMButton from "./src/components/CMButton";
import Uploader from "./src/components/Uploader";

const App = () => {
  // react form hook
  const { handleSubmit } = useForm();

  // react hook
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // handle image upload
  const onSubmit = async () => {
    if (!image) {
      console.log("image is required!");
      return;
    }

    setIsLoading(true);

    let formData = new FormData();

    formData.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    });

    try {
      const res = await axios({
        method: "post",
        url: "http://192.168.0.127:8000/predict",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
      setData(res?.data);
    } catch (err) {
      setIsLoading(false);
      console.log("err", err);
    }
  };

  return (
    <View className="bg-white">
      <StatusBar style="auto" />

      <View className="flex items-center mt-10">
        <View>
          <Text className="text-base font-semibold mb-3">Category Images</Text>

          <Uploader imageUrl={image} setImageUrl={setImage} setData={setData} />
        </View>

        {/* save button  */}
        <View className="">
          <CMButton
            loading={isLoading}
            disabled={image === "" || image === null ? true : false}
            disabledBg={image === "" || image === null ? "bg-gray-400" : ""}
            title="predict"
            height="h-12"
            color="#a8a29e"
            fontWeight="font-base"
            bgColor="bg-gray-800"
            textColor="text-gray-100"
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        {data && image && (
          <View className="mt-8">
            <Text>class : {data.class}</Text>
            <Text>confidence : {data.confidence}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default App;
