import { Colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { formateDate } from "@/helpers/formatDate";
import { convertSecondsToHoursMinutes } from "@/helpers/formatDuration";
import { Activity, ActivityType } from "../interface/Activity.interface";

function WorkoutIcon({ type }: { type: ActivityType }) {
  const iconName = {
    walk: "shoe-prints",
    run: "walking",
    gym: "dumbbell",
    cycling: "bicycle",
  };
  const name: string = iconName[type];
  return (
    <View style={styles.workoutIconContainer}>
      <FontAwesome5
        name={name}
        size={24}
        color={Colors.dark.icon.color}
      />
    </View>
  );
}
function WorkoutActivityDetailed({
  type,
  distance,
  date,
}: Pick<Activity, "distance" | "date" | "type">) {
  const formattedDate = formateDate(new Date(date));
  return (
    <View style={styles.column}>
      <Text style={styles.activityText}>{type}</Text>
      <View style={styles.row}>
        <Text style={styles.activityData}>{formattedDate}</Text>
        <Text style={styles.activityData}>{distance} km</Text>
      </View>
    </View>
  );
}
function WorkoutActivityDate({ duration }: Pick<Activity, "duration">) {
  return (
    <View style={styles.column}>
      <Text style={styles.activityText}>duration</Text>
      <Text style={styles.activityData}>
        {convertSecondsToHoursMinutes(duration)}
      </Text>
    </View>
  );
}
export default function DetailedActivityCard({ data }: { data: Activity }) {
  const { date, distance, duration, type } = data;
  return (
    <View style={[styles.container, styles.row]}>
      <WorkoutIcon type={type} />
      <WorkoutActivityDetailed type={type} distance={distance} date={date} />
      <WorkoutActivityDate duration={duration} />
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
    backgroundColor: Colors.dark.icon.background,
    borderRadius: "50%",
    padding: 16,
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
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
  activityText: {
    color: Colors.dark.text.secondary,
    fontWeight: "bold",
    fontSize: 20,
  },
  activityData: {
    color: Colors.dark.text.body,
    fontSize: 16,
    fontWeight: "600",
  },
});
