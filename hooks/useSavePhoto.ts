import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImageManipulator from "expo-image-manipulator";

const profilePicKey = "profile-pic";
export function useSavePhoto() {
  const [myPic, setMyPic] = useState<undefined | string>();
  async function requestPermissionPickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access photos roll is required!");
      return false;
    }
    return true;
  }

  async function requestPermissionTackPhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      return false;
    }
    return true;
  }

  useEffect(() => {
    loadMyProfilePic();
  }, []);

  async function loadMyProfilePic() {
    try {
      const storedData = await AsyncStorage.getItem(profilePicKey);
      if (storedData) {
        setMyPic(storedData);
      }
    } catch (error) {
      await AsyncStorage.removeItem(profilePicKey);

      console.error("Failed to load profile pic", error);
      alert("Failed to load profile pic");
    }
  }
  async function pickImage() {
    try {
      const isRequestPermissionSuccess = await requestPermissionPickImage();
      if (isRequestPermissionSuccess) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          quality: 1,
        });

        if (!result.canceled) {
          const { uri } = result.assets[0];

          const tempUri = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
  
          await AsyncStorage.setItem(profilePicKey, tempUri);
          // setMyPic(base64);
        }
      }
    } catch (error) {
      console.error("Failed to save profile pic", error);
      alert("Failed to save profile pic");
    }
  }

  async function takePhoto() {
    try {
      const isRequestPermissionSuccess = await requestPermissionTackPhoto();
      if (isRequestPermissionSuccess) {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        });

        if (!result.canceled) {
          const { uri } = result.assets[0];


          const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 800 } }], // Resize image width to 800px, adjust this value as needed
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compress image (0-1, lower is more compressed)
          );
          await AsyncStorage.setItem(profilePicKey, manipResult.uri);
          setMyPic(manipResult.uri);

        }
      }
    } catch (error) {
      console.error("Failed to save profile pic", error);
      alert("Failed to save profile pic");
    }
  }

  return {
    takePhoto,
    pickImage,
    myPic,
  };
}
