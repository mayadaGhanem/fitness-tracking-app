// app/splash 1
import { Colors } from "@/constants/Colors";
import { useOnboardingSteps } from "@/hooks/useOnboardingSteps";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { LocalSvg } from "react-native-svg/css";

export const unstable_settings = {
  headerShown: false,
};
export default function Splash() {
  const router = useRouter();
  const { step, isLoading } = useOnboardingSteps();

  const logoUri = require("@/assets/images/onboarding/logo.svg");
  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => {
        step === 3 ? router.replace("/(tabs)") : router.replace("/onboarding");
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [router, step, isLoading]);
  return (
    <ImageBackground
      source={require("@/assets/images/onboarding/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.text}>Welcome To</Text>
        <View style={styles.logoContainer}>
          <LocalSvg asset={logoUri} />
          <View style={styles.logoTextContainer}>
            <Text style={[styles.logoText, styles.logoTextBold]}>Fit</Text>
            <Text style={styles.logoText}>Body</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  text: {
    color: Colors.dark.primary,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoTextContainer: {
    flexDirection: "row",
  },
  logoTextBold: {
    fontWeight: "bold",
  },
  logoText: {
    color: Colors.dark.primary,
    fontSize: 64,
    textAlign: "center",
    fontWeight: 300,
    fontStyle: "italic",
  },
});
