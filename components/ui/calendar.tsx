import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarComponent({
  selectedDate,
  handleDateChange,
}: {
  selectedDate?: string | null;
  handleDateChange: (date: string) => void;
}) {
  return (
    <Calendar
      markedDates={{
        [selectedDate!]: {
          selected: true,
        },
      }}
      onDayPress={(day) => handleDateChange(day.dateString)}
      monthFormat={"yyyy MM"}
      style={styles.calendar}
      theme={{ ...Colors.dark.calendar }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  calendar: {
    borderWidth: 2,
    borderColor: Colors.dark.primary,
    borderRadius: 10,
  },
  selectedDate: {
    fontSize: 16,
    marginTop: 20,
  },
});
