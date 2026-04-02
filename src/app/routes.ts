export const ROUTES = {
  WEB_SHELL: "WebShell",
  SCAN: "Scan",
  UPLOAD: "Upload",
  ANALYSIS_STATUS: "AnalysisStatus",
} as const;

export function vaultUrl(documentId: string): string {
  return `https://legalcha.in/beta/vault?highlight=${documentId}`;
}

export function analysisUrl(documentId: string): string {
  return `https://legalcha.in/beta/analysis/${documentId}`;
}
