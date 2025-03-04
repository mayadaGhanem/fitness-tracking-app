import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export const useNotification = () => {
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.DEFAULT,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Platform.OS === "ios") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.DEFAULT,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "purple",
      });
    }
    return token;
  }
  async function scheduleDailyNotification(title: string, body: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: {
        minute: 4,
        hour: 0,
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
      },
    });
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notification received:", notification);
    });
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification response:", response);
    });
  }, []);

  const scheduleReminder = async () => {
    await scheduleDailyNotification(
      "Daily Activity",
      "This is a daily reminder activity."
    );
    console.log("Notification scheduled.");
  };

  return { scheduleReminder };
};
