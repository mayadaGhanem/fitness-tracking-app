import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import CalendarComponent from "@/components/ui/calendar";
import { Activity } from "@/components/interface/Activity.interface";
import { Colors } from "@/constants/Colors";
import DetailedActivityCard from "@/components/RecentActivities/DetailedActivityCard";
import { useHistoryActivityComponent } from "@/hooks/useHistoryActivityComponent";
import NoData from "@/components/RecentActivities/NoData";
import ActivityListLoading from "../RecentActivities/ActivityListLoading";

type flatListItemHeader = { type: string; title: string; id: string };
type flatListItem = flatListItemHeader | Activity;

const SectionHeader = (title: string) => {
  return <Text style={styles.subHeader}>{title}</Text>;
};
export default function History() {
  // split logic
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const { dataForFlatList, handleDateChange, selectedDate, isLoading } =
    useHistoryActivityComponent();

  const renderFlatListItem = ({ item }: { item: flatListItem | Activity }) => {
    if (item.type === "header") {
      return SectionHeader(item.title);
    } else {
      return (
        <View style={styles.itemContainer}>
          <DetailedActivityCard data={item as Activity} />
        </View>
      );
    }
  };
  const renderItem = (
    <View style={styles.container}>
      <CalendarComponent
        handleDateChange={handleDateChange}
        selectedDate={selectedDate}
      />
      {isLoading && <ActivityListLoading />}
      {!isLoading &&
        (dataForFlatList.length ? (
          <FlatList
            data={dataForFlatList}
            renderItem={renderFlatListItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={!isLandscape}
          />
        ) : (
          <NoData />
        ))}
    </View>
  );

  return isLandscape ? (
    <ScrollView showsVerticalScrollIndicator={true} style={styles.scrollView}>
      {renderItem}
    </ScrollView>
  ) : (
    renderItem
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 24,
  },
  activityContainer: {
    flex: 1,
  },
  subHeader: {
    color: Colors.dark.text.subTitle,
    fontWeight: 500,
    fontSize: 20,
    paddingVertical: 8,
  },
  itemContainer: {
    paddingVertical: 10,
  },
  scrollView: {
    flex: 1,
    flexGrow: 1,
  },
});
