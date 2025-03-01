import React from "react";
import { Colors } from "@/constants/Colors";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import Toolbar from "../Toolbar/Toolbar";
import { FontAwesome5 } from "@expo/vector-icons";

export default function DynamicHeader({
  text,
  style,
  extraText,
  iconData,
  extraTextStyle,
}: {
  text: string;
  style?: StyleProp<TextStyle>;
  extraText?: string;
  iconData?: {
    name: string;
    size: number;
    color: string;
  };
  extraTextStyle?: StyleProp<TextStyle>;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {iconData && (
          <FontAwesome5
            name={iconData.name}
            size={iconData.size}
            color={iconData.size}
          />
        )}
        <Text style={[styles.text, style]}>{text}</Text>
        <Toolbar />
      </View>
      {extraText && (
        <Text style={[styles.text, styles.extraText, extraTextStyle]}>
          {extraText}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: Colors.dark.secondary,
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: Colors.dark.background,
    paddingTop: 72,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  extraText: {
    fontWeight: "normal",
    fontSize: 12,
  },
});
