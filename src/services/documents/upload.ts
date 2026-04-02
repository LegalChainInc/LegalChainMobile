import * as FileSystem from "expo-file-system";
import { computeFileHash } from "./hashing";
import { EXPO_PUBLIC_API_BASE_URL } from "../../config/env";
import { logger } from "../../utils/logger";

export type LocalDocument = {
  uri: string;
  name: string;
  mime: string;
  source: "scan" | "picker" | "share";
  pages?: number;
};

export type UploadResult = {
  documentId: string;
  hash: string;
};

export async function uploadDocument(
  doc: LocalDocument,
  token: string
): Promise<UploadResult> {
  logger.info(`[Upload] Starting upload for ${doc.name} from ${doc.source}`);

  const hash = await computeFileHash(doc.uri);
  logger.info(`[Upload] Computed hash: ${hash}`);

  const formData = new FormData();
  formData.append("file", {
    uri: doc.uri,
    name: doc.name,
    type: doc.mime,
  } as unknown as Blob);
  formData.append("hash", hash);
  formData.append("source", doc.source);

  const response = await fetch(`${EXPO_PUBLIC_API_BASE_URL}/api/docs/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error(`[Upload] Failed: ${error}`);
    throw new Error(`Upload failed: ${response.status}`);
  }

  const result = await response.json();
  logger.info(`[Upload] Success, documentId: ${result.documentId}`);

  return {
    documentId: result.documentId,
    hash,
  };
}
