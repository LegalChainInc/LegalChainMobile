import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { scanDocument } from "../../services/scanning/scanner";
import { logger } from "../../utils/logger";

interface Props {
  navigation: any;
}

export default function ScanScreen({ navigation }: Props) {
  const [scanning, setScanning] = useState(false);

  async function handleScan() {
    setScanning(true);
    try {
      const result = await scanDocument();
      if (!result || result.scannedImages.length === 0) {
        Alert.alert("Scan cancelled", "No pages were scanned.");
        return;
      }
      logger.info(`[ScanScreen] Scanned ${result.scannedImages.length} page(s)`);
      navigation.navigate("Upload", {
        scannedImages: result.scannedImages,
        source: "scan",
      });
    } catch (error) {
      Alert.alert("Scan Error", "Something went wrong. Please try again.");
      logger.error("[ScanScreen] Scan failed", error);
    } finally {
      setScanning(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Document</Text>
      <Text style={styles.subtitle}>
        Position your document in the frame and tap the button below.
      </Text>
      {scanning ? (
        <ActivityIndicator size="large" color="#B8962E" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleScan}>
          <Text style={styles.buttonText}>Start Scan</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#B8962E",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#B8962E",
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
