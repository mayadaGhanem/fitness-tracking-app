import { Colors } from "@/constants/Colors";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function Step({
  text,
  stepNumber,
  iconName,
}: {
  text: string;
  stepNumber: number;
  iconName: string;
}) {
  return (
    <View style={styles.container}>
      <FontAwesome5 name={iconName} size={50} color={Colors.dark.primary} />
      <Text numberOfLines={2} style={styles.text}>
        {text}
      </Text>
      <View style={styles.stepperContainer}>
        {Array.from(Array(3), (_, i) => (
          <View
            key={i}
            style={[styles.stepper, i === stepNumber && styles.stepperActive]}
          />
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: Colors.dark.tint,
    height: 170,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: Colors.dark.secondary,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  stepperContainer: {
    flexDirection: "row",
    gap: 6,
  },
  stepper: {
    backgroundColor: Colors.dark.tertiary,
    height: 4,
    width: 32,
    borderRadius: 4,
  },
  stepperActive: {
    backgroundColor: Colors.dark.secondary,
  },
});
