// app/_layout.js
import React from "react";
import { Slot } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index", // Set the initial route
};

export default function Layout() {
  return (
    <Slot /> // The Slot is used to render the current route's screen
  );
}
