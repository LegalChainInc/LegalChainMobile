import * as Crypto from "expo-crypto";
import * as FileSystem from "expo-file-system";

export async function computeFileHash(fileUri: string): Promise<string> {
  try {
    const fileContent = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      fileContent
    );
    return hash;
  } catch (error) {
    console.error("[Hashing] Error computing hash:", error);
    throw error;
  }
}
