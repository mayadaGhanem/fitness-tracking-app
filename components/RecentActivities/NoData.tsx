import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
export default function NoData() {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="frown-open" size={100} color={Colors.dark.primary} />
      <Text style={styles.header}>There is no activity added !</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    color: Colors.dark.text.primary,
    fontWeight: "bold",
    fontSize: 24,
    paddingBottom: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});
