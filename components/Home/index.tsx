// Home Component
import ActivityList from "@/components/RecentActivities/ActivityList";
import ActivitySummary from "@/components/Home/ActivityStatistics/ActivitySummary";
import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { useRecentActivitiesComponent } from "@/hooks/useRecentActivitiesComponent";
export default function Home() {
  const { filteredActivities } = useRecentActivitiesComponent();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const renderItems = (
    <View style={styles.activityContainer}>
      <ActivitySummary activities={filteredActivities} />

      <ActivityList activities={filteredActivities} />
    </View>
  );

  return isLandscape ? (
    <ScrollView showsVerticalScrollIndicator={true} style={styles.scrollView}>
      {renderItems}
    </ScrollView>
  ) : (
    <View style={[styles.container]}>{renderItems}</View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 24,
  },
  scrollView: {
    flex: 1,
    flexGrow: 1,
  },
  activityContainer: {
    flex: 1,
    minWidth: "100%",
    height: "100%",
  },
  a: {
    flex: 1,
  },
});
