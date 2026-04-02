import { EXPO_PUBLIC_API_BASE_URL } from "../../config/env";
import { logger } from "../../utils/logger";

export type AnalysisResult = {
  documentId: string;
  summary: string;
  riskScore: number;
  issues: {
    id: string;
    clauseText: string;
    issueCode: string;
    issueText: string;
    severity: "low" | "med" | "high";
  }[];
  references?: {
    citation: string;
    caseName?: string;
    court?: string;
    url?: string;
  }[];
};

export async function fetchAnalysisResults(
  documentId: string,
  token: string
): Promise<AnalysisResult> {
  logger.info(`[Analysis] Fetching results for document: ${documentId}`);

  const response = await fetch(
    `${EXPO_PUBLIC_API_BASE_URL}/api/ai/results/${documentId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    logger.error(`[Analysis] Fetch results failed: ${error}`);
    throw new Error(`Failed to fetch results: ${response.status}`);
  }

  const result: AnalysisResult = await response.json();
  logger.info(`[Analysis] Results fetched, risk score: ${result.riskScore}`);
  return result;
}
