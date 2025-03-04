import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, useWindowDimensions } from "react-native";
import { View } from "react-native";
import ActivityChart from "./ActivityChart";
import ActivitySummaryDetails from "./ActivitySummaryDetails";
// import { activities } from "../activities.data";
import { formatNumberWithCommas } from "@/helpers/formatNumbers";
import { Activity } from "@/components/interface/Activity.interface";
import { areSameDay } from "@/helpers/areSameDay";
import { getDays } from "@/helpers/getDays";

export default function ActivitySummary({
  activities,
}: {
  activities: Activity[];
}) {
  const { today } = getDays();
  const todayActivity = activities
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  .filter((_item) =>
    areSameDay(new Date(_item.date), today)
  )?.[0];

  return (
    <View style={[styles.container]}>
      <ActivityChart
        duration={1000}
        rotation={360}
        delay={1500}
        fill={
          todayActivity && todayActivity.steps > 0
            ? (todayActivity?.steps / 10000) * 100
            : 0
        } // target 10K steps here per day
        children={(fill) => (
          <View>
            <Text style={styles.text}>
              {formatNumberWithCommas(todayActivity?.steps ?? 0)}
            </Text>
            <Text style={styles.text}>Steps</Text>
          </View>
        )}
      />
      <ActivitySummaryDetails activity={todayActivity || null} />
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
