import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export function useOnboardingSteps() {
  const [step, setStep] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    loadSteps();
  }, []);
  const saveStepsOnStorage = async (isSkipped: boolean) => {
    try {
      setLoading(false);

      const currentStep = isSkipped ? 3 : step + 1;

      await AsyncStorage.setItem("step", JSON.stringify(currentStep));

      setStep(currentStep);
    } catch (error) {
      Alert.alert("Error", "Failed to save step.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadSteps = async () => {
    try {
      // await AsyncStorage.removeItem("step");

      const storedData = await AsyncStorage.getItem("step");

      if (!!storedData) {
        setStep(+storedData);
      }
    } catch (error) {
      console.error("Failed to load step", error);
    } finally {
      setLoading(false);
    }
  };
  return { saveStepsOnStorage, step, isLoading };
}
