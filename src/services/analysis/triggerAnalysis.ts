import { EXPO_PUBLIC_API_BASE_URL } from "../../config/env";
import { logger } from "../../utils/logger";

export type TriggerAnalysisResult = {
  jobId: string;
  documentId: string;
};

export async function triggerAnalysis(
  documentId: string,
  token: string
): Promise<TriggerAnalysisResult> {
  logger.info(`[Analysis] Triggering analysis for document: ${documentId}`);

  const response = await fetch(
    `${EXPO_PUBLIC_API_BASE_URL}/api/ai/analyze`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ documentId }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    logger.error(`[Analysis] Trigger failed: ${error}`);
    throw new Error(`Failed to trigger analysis: ${response.status}`);
  }

  const result = await response.json();
  logger.info(`[Analysis] Job created: ${result.jobId}`);
  return result;
}
