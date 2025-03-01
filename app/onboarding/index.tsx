// app/onboarding.js
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Step from "@/components/OnBoarding/Step";
import Button from "@/components/ui/Button";
import { useOnboardingSteps } from "@/hooks/useOnboardingSteps";

export const unstable_settings = {
  headerShown: false,
};
export default function Onboarding() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const route = useRouter();
  const { saveStepsOnStorage, step, isLoading } = useOnboardingSteps();
  const baseAssetsPath = "@/assets/images/onboarding/";
  const steps = [
    {
      path: require(`${baseAssetsPath}/step-1.png`),
      text: "Start your journey towards a more active lifestyle",
      icon: "running",
    },
    {
      path: require(`${baseAssetsPath}/step-2.png`),
      text: "Find nutrition tips that fit your lifestyle",
      icon: "nutritionix",
    },
    {
      path: require(`${baseAssetsPath}/step-3.png`),
      text: "A community for you, challenge yourself",
      icon: "users",
    },
  ];
  function handleSkip() {
    saveStepsOnStorage(true);

    route.replace("/(tabs)");
  }
  function handleNext() {
    saveStepsOnStorage(false);
  }

  useEffect(() => {
    if (!isLoading) {
      step === 3 && route.replace("/(tabs)");
    }
  }, [isLoading, step]);
  return step === 3 ? null : (
    <ImageBackground
      source={steps[step]?.path}
      style={styles.background}
      resizeMode="cover"
    >
      <Button
        title={"Skip"}
        onPress={handleSkip}
        style={[
          styles.skipButtonContainer,
          isLandscape && styles.skipButtonContainerLandscape,
        ]}
        textStyle={styles.buttonTextSkip}
        iconData={{
          name: "angle-double-right",
          color: Colors.dark.primary,
          size: 24,
          style: styles.skipIcon,
        }}
      />
      <View style={styles.container}>
        <Step
          stepNumber={step}
          text={steps[step].text}
          iconName={steps[step].icon}
        />
        <Button
          title={step === 2 ? "Get Started" : "Next"}
          onPress={handleNext}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    width: "100%",
  },
  button: {
    backgroundColor: Colors.dark.buttonTransparentBg,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 30, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  buttonText: {
    color: Colors.dark.secondary,
    fontWeight: "bold",
    fontSize: 24,
  },
  skipButtonContainer: {
    flexDirection: "row",
    columnGap: 4,
    alignSelf: "flex-end",
    marginVertical: 64,
    marginHorizontal: 16,
    alignItems: "center",
    height: 40,
  },
  skipButtonContainerLandscape: {
    marginVertical: 10,
    marginHorizontal: 16,
  },
  buttonTextSkip: {
    color: Colors.dark.primary,
    fontWeight: "bold",
    fontSize: 24,
  },
  skipIcon: {
    marginTop: 4,
  },
});
