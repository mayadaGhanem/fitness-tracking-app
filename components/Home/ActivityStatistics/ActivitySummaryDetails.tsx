import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { convertSecondsToHoursMinutes } from "@/helpers/formatDuration";

function Differentiation({ text }: { text: string }) {
  return <Text style={styles.differentiationText}>{text}</Text>;
}
function Value({
  text,
  differentiation,
}: {
  text: string;
  differentiation: string;
}) {
  return (
    <Text style={styles.valueText}>
      {text} {differentiation}
    </Text>
  );
}

function Container({
  value,
  differentiationHeader,
  differentiation,
}: {
  value: string;
  differentiationHeader: string;
  differentiation: string;
}) {
  return (
    <View style={styles.itemContainer}>
      <Value text={value} differentiation={differentiation} />
      <Differentiation text={differentiationHeader} />
    </View>
  );
}

export default function ActivitySummaryDetails({
  totalCalories,
  totalDistance,
  totalDuration,
}: {
  totalCalories: number;
  totalDistance: number;
  totalDuration: number;
}) {
  return (
    <View style={styles.container}>
      <Container
        value={totalDistance.toString()}
        differentiationHeader={"Distance"}
        differentiation="km"
      />
      <Container
        value={totalCalories.toString()}
        differentiationHeader={"Calories"}
        differentiation="Col"
      />
      <Container
        value={convertSecondsToHoursMinutes(totalDuration)}
        differentiationHeader={"Active Time"}
        differentiation=""
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  itemContainer: {
    gap: 10,
    alignItems: "center",
  },
  differentiationText: {
    color: Colors.dark.tint,
    fontSize: 14,
  },
  valueText: {
    color: Colors.dark.tertiary,
    fontSize: 18,
    fontWeight: "bold",
  },
});
