export const logger = {
  info: (msg: string, data?: unknown) => console.log(`[INFO] ${msg}`, data ?? ""),
  warn: (msg: string, data?: unknown) => console.warn(`[WARN] ${msg}`, data ?? ""),
  error: (msg: string, data?: unknown) => console.error(`[ERROR] ${msg}`, data ?? ""),
};
