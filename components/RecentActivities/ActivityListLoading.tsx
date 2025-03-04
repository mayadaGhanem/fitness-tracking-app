import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";
import ActivityCardLoading from "./ActivityCardLoading";
export default function ActivityListLoading() {
  const items = new Array(3); // create an empty array with length 45
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  return (
    <FlatList
      data={items}
      renderItem={() => (
        <View style={styles.itemContainer}>
          <ActivityCardLoading />
        </View>
      )}
      ListHeaderComponent={<Text style={styles.header}>Recent Activities</Text>}
      keyExtractor={(item, index) => index.toString()}
      scrollEnabled={!isLandscape}
    />
  );
}
const styles = StyleSheet.create({
  header: {
    color: Colors.dark.text.primary,
    fontWeight: "bold",
    fontSize: 24,
    paddingBottom: 8,
  },
  itemContainer: {
    paddingVertical: 10, // Add padding to the list itself
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});
