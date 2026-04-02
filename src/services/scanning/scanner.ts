import DocumentScanner from "react-native-document-scanner-plugin";

export type ScanResult = {
  scannedImages: string[];
};

export async function scanDocument(): Promise<ScanResult | null> {
  try {
    const { scannedImages } = await DocumentScanner.scanDocument({
      maxNumDocuments: 10,
    });

    if (!scannedImages || scannedImages.length === 0) {
      return null;
    }

    return { scannedImages };
  } catch (error) {
    console.error("[Scanner] Error scanning document:", error);
    return null;
  }
}
