/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const white = "#fff";
const lightGreen = "#E2F163";
const background = "#232323";
const textSecondary = "#212020";
const purple = "#896CFE";
const lightPurple = "#B3A0FF";
const accent = "#D9D9D9";
const buttonTransparentBg = "rgba(255, 255, 255, 0.5)";
const transparentCardBg = "rgba(255, 255, 255, 0.2)";
const placeholder = "#ccc";
const transparentGreen = "rgba(226, 241, 99,0.3)";
export const Colors = {
  light: {
    background,
    tint: lightPurple,
    icon: white,
    tabIconDefault: "#687076",
    tabIconSelected: lightGreen,
    primary: lightGreen,
    secondary: white,
    tertiary: purple,
    accent: lightPurple,
    text: {
      primary: white,
      secondary: textSecondary,
    },
    buttonTransparentBg,
  },
  dark: {
    placeholder,
    background,
    primary: lightGreen,
    secondary: white,
    tertiary: purple,
    accent,
    tint: lightPurple,
    tabIconSelected: lightGreen,
    text: {
      primary: lightGreen,
      secondary: textSecondary,
      subTitle: lightPurple,
      body: purple,
    },
    buttonTransparentBg,
    card: {
      PrimaryBackground: white,
      secondaryBackground: purple,
      transparent: transparentCardBg,
    },
    icon: {
      background: purple,
      color: white,
      active: lightGreen,
    },
    calendar: {
      selectedDayBackgroundColor: transparentGreen,
      backgroundColor: background,
      calendarBackground: background,
      dayTextColor: lightGreen,
      todayTextColor: purple,
      arrowColor: lightGreen,
      monthTextColor: white,
      textMonthFontSize: 20,
    },
  },
};
