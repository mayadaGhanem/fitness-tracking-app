import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

export default function IconButton({
  onPress,
  style,
  size,
  name,
  color,
}: {
  onPress: (event: GestureResponderEvent) => void;
  name: string;
  size: number;
  color: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.pressedButton,
      ]}
    >
      <FontAwesome5 name={name} size={size} color={color} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    paddingHorizontal: 16,
  },
  pressedButton: {
    opacity: 0.4,
  },
});
