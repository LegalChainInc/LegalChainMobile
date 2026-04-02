import { EXPO_PUBLIC_API_BASE_URL } from "../../config/env";
import { ANALYSIS_POLL_INTERVAL_MS } from "../../config/constants";
import { sleep } from "../../utils/sleep";
import { logger } from "../../utils/logger";

export type AnalysisStatus =
  | "NOT_STARTED"
  | "QUEUED"
  | "RUNNING"
  | "COMPLETE"
  | "FAILED";

export type PollStatusResult = {
  status: AnalysisStatus;
  documentId: string;
  jobId: string;
};

export async function pollAnalysisStatus(
  jobId: string,
  token: string,
  onStatusUpdate?: (status: AnalysisStatus) => void,
  maxAttempts = 30
): Promise<PollStatusResult> {
  logger.info(`[Analysis] Polling status for job: ${jobId}`);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await fetch(
      `${EXPO_PUBLIC_API_BASE_URL}/api/ai/status/${jobId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      throw new Error(`Status check failed: ${response.status}`);
    }

    const result: PollStatusResult = await response.json();
    logger.info(`[Analysis] Attempt ${attempt + 1}: ${result.status}`);

    if (onStatusUpdate) {
      onStatusUpdate(result.status);
    }

    if (result.status === "COMPLETE" || result.status === "FAILED") {
      return result;
    }

    await sleep(ANALYSIS_POLL_INTERVAL_MS);
  }

  throw new Error("Analysis timed out after maximum poll attempts");
}
