import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { flatListItem } from "@/components/History";

export const exportData = async (data: flatListItem[]) => {
  const filteredData = data.filter((_item) => _item?.type !== "header");
  const jsonString = JSON.stringify(filteredData, null, 2);
  const tempFilePath = FileSystem.cacheDirectory + "activities.json";

  try {
    await FileSystem.writeAsStringAsync(tempFilePath, jsonString);

    await Sharing.shareAsync(tempFilePath, {
      mimeType: "application/json",
      dialogTitle: "Download JSON",
    });
  } catch (error) {
    console.error("Error sharing JSON:", error);
    alert("Error downloading JSON.");
  } finally {
    await FileSystem.deleteAsync(tempFilePath, { idempotent: true });
  }
};
