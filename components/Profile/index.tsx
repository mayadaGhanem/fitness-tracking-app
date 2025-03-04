import React from "react";
import { Colors } from "@/constants/Colors";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import ImagePickerProfile from "../ui/ImagePicker";
import { useSavePhoto } from "@/hooks/useSavePhoto";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Profile() {
  const { takePhoto, myPic } = useSavePhoto();
  const { weight } = useSelector((state: RootState) => state.stopwatch);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const renderItem = (
    <View style={styles.container}>
      <ImagePickerProfile
        changeImage={takePhoto}
        image={myPic ? { uri: `${myPic}` } : undefined}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>mayada.gh@gmail.com</Text>
        <Text style={styles.text}>{weight} kilo</Text>
      </View>
    </View>
  );
  return isLandscape ? (
    <ScrollView showsVerticalScrollIndicator={true} style={styles.scrollView}>
      {renderItem}
    </ScrollView>
  ) : (
    renderItem
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.tint,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 300,
    gap: 16,
  },

  textContainer: {
    alignItems: "center",
    gap: 6,
  },
  text: {
    color: Colors.dark.secondary,
    fontWeight: "bold",
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
    flexGrow: 1,
  },
});
