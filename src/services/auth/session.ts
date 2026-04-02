import * as SecureStore from "expo-secure-store";
import { logger } from "../../utils/logger";

const TOKEN_KEY = "legalchain_auth_token";

export async function saveToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  logger.info("[Session] Token saved");
}

export async function getToken(): Promise<string | null> {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  return token;
}

export async function clearToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  logger.info("[Session] Token cleared");
}
