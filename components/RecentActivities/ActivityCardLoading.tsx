import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
function WorkoutIconLoading() {
  return (
    <View style={styles.workoutIconContainer}/>
  );
}
function WorkoutActivityDetailedLoading() {
  return (
    <View style={styles.column}>
      <Text style={styles.placeholder} />
      <View style={styles.row}>
        <Text style={styles.placeholder} />
        <Text style={styles.placeholder} />
      </View>
    </View>
  );
}
function WorkoutActivityDateLoading() {
  return (
    <View style={styles.column}>
      <Text style={styles.placeholder} />
      <Text style={styles.placeholder} />
    </View>
  );
}
export default function ActivityCardLoading() {
  return (
    <View style={[styles.container, styles.row]}>
      <WorkoutIconLoading />
      <WorkoutActivityDetailedLoading />
      <WorkoutActivityDateLoading />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: Colors.dark.card.PrimaryBackground,
    borderRadius: 18,
    alignItems: "center",
  },
  workoutIconContainer: {
    backgroundColor: Colors.dark.placeholder,
    borderRadius: "50%",
    padding: 16,
    height:50,
    width:50
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  column: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  placeholder: {
    backgroundColor: Colors.dark.placeholder,
    height: 16,
    borderRadius: 4,
    marginBottom: 8,
    width: 40,
  },
});
