import React from "react";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

export default function InfoCard({
  data,
  differentiationText,
}: {
  data: number;
  differentiationText: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{data}</Text>
      <Text style={styles.differentiationText}>{differentiationText}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.card.transparent,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    width: "45%",
  },
  text: {
    color: Colors.dark.text.primary,
    fontSize: 16,
  },
  differentiationText: {
    color: Colors.dark.text.primary,
    fontWeight: 500,
    fontSize: 18,
  },
});
