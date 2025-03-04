import React from "react";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import Button from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  ActivityType,
} from "@/components/interface/Activity.interface";
import { RootState } from "@/redux/store";
import { setActivity } from "@/redux/StopWatch/stopWatchSlice";

function WorkoutOptions() {
  const dispatch = useDispatch();

  const { type } = useSelector((state: RootState) => state.stopwatch);
  const activityTypes: { [key in ActivityType]: string } = {
    walk: "shoe-prints",
    run: "walking",
    gym: "dumbbell",
    cycling: "bicycle",
  };
  function onPress(type: string) {
    dispatch(setActivity(type as ActivityType));
  }
  return Object.keys(activityTypes).map((_item: string) => (
    <View
      style={[styles.card, type === _item && styles.selectedCard]}
      key={_item}
    >
      <Button
        onPress={() => onPress(_item)}
        title={_item.toLocaleUpperCase()}
        iconData={{
          name: activityTypes[_item as ActivityType],
          size: 24,
          color: Colors.dark.text.primary,
        }}
        textStyle={styles.buttonText}
        style={styles.buttonStyle}
      />
    </View>
  ));
}
export default function ActivityOptions() {
  return (
    <View>
      <Text style={styles.header}>Choose Activity</Text>
      <View style={styles.container}>
        <WorkoutOptions />
      </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap", // Allow wrapping when screen size is small
    paddingTop: 16,
  },
  card: {
    width: "45%",
    borderRadius: 10,
    borderColor: Colors.dark.secondary,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    padding: 10,
  },
  selectedCard: {
    borderColor: Colors.dark.primary,
  },
  buttonText: {
    color: Colors.dark.text.primary,
    fontWeight: "bold",
    fontSize: 20,
    padding: 4,
  },
  buttonStyle: {
    gap: 10,
    alignItems: "center",
  },
});
