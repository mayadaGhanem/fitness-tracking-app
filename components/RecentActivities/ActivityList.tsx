import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import DetailedActivityCard from "./DetailedActivityCard";
import { Colors } from "@/constants/Colors";
import { Activity } from "../interface/Activity.interface";
import NoData from "./NoData";
export default function ActivityList({
  activities,
}: {
  activities: Activity[];
}) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  if (!activities.length) {
    return <NoData />;
  }
  return (
    <View style={[styles.container, styles.listContainer]}>
      <Text style={[styles.header, isLandscape && styles.landscapeHeader]}>
        Recent Activities
      </Text>
      <FlatList
        data={activities}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <DetailedActivityCard data={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={!isLandscape}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    color: Colors.dark.text.primary,
    fontWeight: "bold",
    fontSize: 24,
    paddingVertical: 8,
  },
  subHeader: {
    color: Colors.dark.text.subTitle,
    fontWeight: 400,
    fontSize: 18,
  },
  itemContainer: {
    paddingVertical: 10, 
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginBottom:72
  },
  listContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 16,
  },
  landscapeHeader: {
    paddingVertical: 8,
  },
});
