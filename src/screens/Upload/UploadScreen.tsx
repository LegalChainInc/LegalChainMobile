import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { uploadDocument, LocalDocument } from "../../services/documents/upload";
import { getToken } from "../../services/auth/session";
import { logger } from "../../utils/logger";

interface Props {
  navigation: any;
  route: any;
}

export default function UploadScreen({ navigation, route }: Props) {
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [documentId, setDocumentId] = useState<string | null>(null);

  useEffect(() => {
    if (route.params?.scannedImages) {
      handleScannedUpload(route.params.scannedImages);
    } else {
      handleFilePicker();
    }
  }, []);

  async function handleScannedUpload(images: string[]) {
    setStatus("uploading");
    try {
      const token = await getToken() ?? "";
      const doc: LocalDocument = {
        uri: images[0],
        name: `scan_${Date.now()}.jpg`,
        mime: "image/jpeg",
        source: "scan",
        pages: images.length,
      };
      const result = await uploadDocument(doc, token);
      setDocumentId(result.documentId);
      setStatus("done");
      logger.info(`[UploadScreen] Upload complete: ${result.documentId}`);
    } catch (error) {
      setStatus("error");
      Alert.alert("Upload Failed", "Please try again.");
      logger.error("[UploadScreen] Upload failed", error);
    }
  }

  async function handleFilePicker() {
    try {
      const picked = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
        copyToCacheDirectory: true,
      });

      if (picked.canceled) {
        navigation.goBack();
        return;
      }

      const asset = picked.assets[0];
      setStatus("uploading");
      const token = await getToken() ?? "";
      const doc: LocalDocument = {
        uri: asset.uri,
        name: asset.name,
        mime: asset.mimeType ?? "application/pdf",
        source: "picker",
      };
      const result = await uploadDocument(doc, token);
      setDocumentId(result.documentId);
      setStatus("done");
    } catch (error) {
      setStatus("error");
      Alert.alert("Upload Failed", "Please try again.");
      logger.error("[UploadScreen] File picker upload failed", error);
    }
  }

  return (
    <View style={styles.container}>
      {status === "uploading" && (
        <>
          <ActivityIndicator size="large" color="#B8962E" />
          <Text style={styles.text}>Uploading document...</Text>
        </>
      )}
      {status === "done" && (
        <>
          <Text style={styles.success}>✓ Upload Complete</Text>
          <Text style={styles.subtext}>Document ID: {documentId}</Text>
        </>
      )}
      {status === "error" && (
        <Text style={styles.error}>Upload failed. Please try again.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 24,
  },
  text: { color: "#aaa", marginTop: 16, fontSize: 14 },
  success: { color: "#B8962E", fontSize: 22, fontWeight: "bold" },
  subtext: { color: "#aaa", marginTop: 8, fontSize: 12 },
  error: { color: "#ff4444", fontSize: 16 },
});
