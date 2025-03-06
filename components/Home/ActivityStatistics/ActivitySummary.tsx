import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import ActivityChart from "./ActivityChart";
import ActivitySummaryDetails from "./ActivitySummaryDetails";
import { formatNumberWithCommas } from "@/helpers/formatNumbers";
import { Activity } from "@/components/interface/Activity.interface";
import {
  getTotalSteps,
  getTotalCalories,
  getTotalDistance,
  getTotalDuration,
} from "@/helpers/getTotalActivityCalc";

export default function ActivitySummary({
  activities,
}: {
  activities: Activity[];
}) {
  const todayActivity = activities[activities.length - 1];
  const totalSteps = getTotalSteps(activities);
  const totalCalories = getTotalCalories(activities);
  const totalDuration = getTotalDuration(activities);
  const totalDistance = getTotalDistance(activities);

  return (
    <View style={[styles.container]}>
      <ActivityChart
        duration={1000}
        rotation={360}
        delay={1500}
        fill={
          todayActivity && todayActivity.steps > 0
            ? (totalSteps / 10000) * 100
            : 0
        } // target 10K steps here per day
        children={(fill) => (
          <View>
            <Text style={styles.text}>
              {formatNumberWithCommas(totalSteps ?? 0)}
            </Text>
            <Text style={styles.text}>Steps</Text>
          </View>
        )}
      />
      <ActivitySummaryDetails
        totalCalories={totalCalories}
        totalDuration={totalDuration}
        totalDistance={totalDistance}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderColor: Colors.dark.secondary,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    gap: 32,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  text: {
    color: Colors.dark.primary,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
