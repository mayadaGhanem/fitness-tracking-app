import React from "react";
import { Colors } from "@/constants/Colors";
import {
  AnimatedCircularProgress,
  AnimatedCircularProgressProps,
} from "react-native-circular-progress";

export default function ActivityChart(props: Partial<AnimatedCircularProgressProps>) {
  const { children, ...progressProps } = props;
  const { size = 250, width = 15, fill = 0, ...otherProps } = progressProps;
  const progressData = {
    size: size,
    width: width,
    fill: fill,
    ...otherProps,
  };

  return (
    <AnimatedCircularProgress
      tintColor={Colors.dark.primary}
      backgroundColor={Colors.dark.accent}
      {...progressData}
    >
      {children}
    </AnimatedCircularProgress>
  );
}
