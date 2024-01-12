import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const CMButton = ({
  w,
  py,
  px,
  mx,
  style,
  title,
  color,
  width,
  shadow,
  onPress,
  bgColor,
  height,
  rounded,
  loading,
  disabled,
  textSize,
  textColor,
  fontWeight,
  alignItems,
  borderColor,
  disabledBg,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      className={`align-bottom inline-flex justify-center border
      ${py ? py : "py-2"} 
      ${px ? px : "px-1"}
      ${mx ? mx : "mx-0"}
      ${w ? w : "w-full"}
      ${height ? height : "h-10"}
      ${shadow ? shadow : "shadow-none"}
      ${rounded ? rounded : "rounded-md"}
      ${bgColor ? bgColor : "bg-green-600"} 
      ${alignItems ? alignItems : "items-center"}
      ${borderColor ? borderColor : "border-transparent"} 
      ${disabled && `opacity-50 ${disabledBg}`}
      `}
      style={{
        width: width || "100%",
        opacity: loading ? 0.5 : 1,
        ...style,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {loading && (
          <ActivityIndicator
            size="small"
            color={`${color ? color : "#00ff00"}`}
          />
        )}
        <Text
          className={`${textColor ? textColor : "text-white"} ${
            fontWeight ? fontWeight : "font-bold"
          } ${textSize ? textSize : "text-sm"}`}
          style={{ ...style }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CMButton;
