import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { pollAnalysisStatus, AnalysisStatus } from "../../services/analysis/pollStatus";
import { getToken } from "../../services/auth/session";
import { logger } from "../../utils/logger";
import { ROUTES, analysisUrl } from "../app/routes";

interface Props {
  navigation: any;
  route: {
    params: {
      jobId: string;
      documentId: string;
    };
  };
}

const STATUS_LABELS: Record<AnalysisStatus, string> = {
  NOT_STARTED: "Preparing analysis...",
  QUEUED: "Queued for analysis...",
  RUNNING: "Analysing document...",
  COMPLETE: "Analysis complete!",
  FAILED: "Analysis failed.",
};

export default function AnalysisStatusScreen({ navigation, route }: Props) {
  const { jobId, documentId } = route.params;
  const [status, setStatus] = useState<AnalysisStatus>("QUEUED");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    runPolling();
  }, []);

  async function runPolling() {
    try {
      const token = (await getToken()) ?? "";
      const result = await pollAnalysisStatus(
        jobId,
        token,
        (s) => setStatus(s)
      );

      if (result.status === "COMPLETE") {
        navigation.navigate(ROUTES.WEB_SHELL, {
          url: analysisUrl(documentId),
        });
      } else {
        setError("Analysis failed. Please try again.");
      }
    } catch (err) {
      logger.error("[AnalysisStatusScreen] Polling error", err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <View style={styles.container}>
      {!error ? (
        <>
          <ActivityIndicator size="large" color="#B8962E" />
          <Text style={styles.status}>{STATUS_LABELS[status]}</Text>
          <Text style={styles.subtext}>
            This may take a few moments.
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </>
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
  status: {
    color: "#B8962E",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
  },
  subtext: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 8,
  },
  error: {
    color: "#ff4444",
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#B8962E",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
