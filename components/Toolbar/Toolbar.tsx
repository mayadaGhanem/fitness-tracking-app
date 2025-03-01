import React from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../ui/IconButton";
import { Colors } from "@/constants/Colors";
import { RelativePathString, useRouter } from "expo-router";

export default function Toolbar() {
  const router = useRouter();
  function handleNavigate(page: RelativePathString) {
    router.replace(page);
  }
  return (
    <View style={styles.container}>
      <IconButton
        name="bell"
        color={Colors.dark.tertiary}
        size={24}
        onPress={handleNavigate.bind(
          null,
          "/notification" as RelativePathString
        )}
      />
      <IconButton
        name="user-alt"
        color={Colors.dark.tertiary}
        size={24}
        onPress={handleNavigate.bind(null, "/profile" as RelativePathString)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
