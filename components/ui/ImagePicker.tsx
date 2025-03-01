import {
  Image,
  View,
  StyleSheet,
  GestureResponderEvent,
  ImageSourcePropType,
} from "react-native";
import { Colors } from "@/constants/Colors";
import IconButton from "./IconButton";

export default function ImagePickerProfile({
  changeImage,
  image,
}: {
  image?: ImageSourcePropType;
  changeImage: (event: GestureResponderEvent) => void;
}) {
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={image ?? require("@/assets/images/profile.png")}
          style={styles.image}
        />
      </View>
      <IconButton
        style={styles.iconButton}
        name="edit"
        size={20}
        color={Colors.dark.secondary}
        onPress={changeImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  iconButton: {
    position: "absolute",
    backgroundColor: Colors.dark.buttonTransparentBg,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    right: 10,
  },
});
