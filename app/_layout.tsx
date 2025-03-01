import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <ThemeProvider value={DarkTheme}>
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar
            style="light" // Use 'light' to make the icons white for a dark background
            backgroundColor={Colors.dark.background} // Dark background to match with white icons
            translucent={false} // Set to false to make the status bar fully opaque
          />
          <Stack
            initialRouteName="onboarding" // Set onboarding as the initial route
            screenOptions={{
              contentStyle: {
                backgroundColor: Colors.dark.background,
              }, // Apply background for all screens
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                // header: () => (
                //   <DynamicHeader
                //     text={"Hi , Mayada"}
                //     extraText="It's time to challenge your limits."
                //     style={{ color: Colors.dark.tertiary }}
                //   />
                // ),
                headerShown: false,
              }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="onboarding"
              options={{ headerShown: false, title: "" }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </View>
      </Provider>
    </ThemeProvider>
  );
}
