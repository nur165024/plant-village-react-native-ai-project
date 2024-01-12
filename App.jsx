import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
// internal imports
import CMButton from "./src/components/CMButton";
import Uploader from "./src/components/Uploader";

const App = () => {
  const [imageUrl, setImageUrl] = useState("");
  // react form hook
  const { handleSubmit } = useForm();

  // form submit
  const onSubmit = async () => {
    console.log("imageUrl", imageUrl);

    axios
      .post("192.168.0.127/predict", {
        file: imageUrl,
      })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("error >><<", err);
      });
  };

  return (
    <View className="bg-white">
      <StatusBar style="auto" />

      <View className="flex items-center mt-10">
        <View>
          <Text className="text-base font-semibold mb-3">Category Images</Text>

          <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </View>

        {/* save button  */}
        <View className="">
          <CMButton
            disabled={imageUrl === "" ? true : false}
            disabledBg={imageUrl === "" ? "bg-gray-600" : ""}
            title="Save"
            height="h-12"
            color="#a8a29e"
            fontWeight="font-base"
            bgColor="bg-gray-800"
            textColor="text-gray-100"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </View>
  );
};

export default App;
