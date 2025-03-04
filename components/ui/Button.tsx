import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

export default function Button({
  onPress,
  title,
  style,
  textStyle,
  iconData,
}: {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconData?: {
    name: typeof FontAwesome5.defaultProps;
    size: number;
    color: string;
    style?: StyleProp<TextStyle>;
  };
}) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={textStyle}>{title}</Text>
      {iconData && (
        <FontAwesome5
          style={iconData.style}
          name={iconData.name}
          size={iconData.size}
          color={iconData.color}
        />
      )}
    </TouchableOpacity>
  );
}
