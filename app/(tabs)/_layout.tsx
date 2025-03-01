import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform, useWindowDimensions } from "react-native";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useNotification } from "@/hooks/useNotifications";
import * as Notifications from "expo-notifications";

export default function TabLayout() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const { scheduleReminder } = useNotification();
  useEffect(() => {
    async function setupNotifications() {
      await Notifications.cancelAllScheduledNotificationsAsync(); // Clear old notifications
      await scheduleReminder();
    }

    setupNotifications();
  }, []);
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "left",
        tabBarActiveTintColor: Colors.dark.icon.active,
        headerShown: true,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {
            backgroundColor: Colors.dark.background,
            tabBarInactiveTintColor: Colors.dark.icon.color,
          },
        }),
        headerTransparent: true,
        headerTintColor: Colors.dark.text.primary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        sceneStyle: {
          backgroundColor: Colors.dark.background,
          paddingTop: Platform.OS === "ios" ? (isLandscape ? 64 : 100) : 64,
          paddingHorizontal: isLandscape
            ? Platform.OS === "ios"
              ? 70
              : 64
            : 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} size={20} name={"home"} />
          ),
        }}
      />

      <Tabs.Screen
        name="activityTracking"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} size={20} name={"show-chart"} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} size={20} name={"calendar-month"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} size={20} name={"person"} />
          ),
        }}
      />
    </Tabs>
  );
}
