import React from "react";
import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import StopWatch from "./Stopwatch/StopWatch";
import ActivityOptions from "./OptionPicker/ActivityOptions";
import { ScrollView } from "react-native";

export default function ActivityTracking() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <StopWatch />
        </View>
        <ActivityOptions />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 24,
  },
  card: {
    borderColor: Colors.dark.secondary,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});
