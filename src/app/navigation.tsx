import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WebShell from "../screens/WebShell/WebShell";
import ScanScreen from "../screens/Scan/ScanScreen";
import UploadScreen from "../screens/Upload/UploadScreen";
import AnalysisStatusScreen from "../screens/Analysis/AnalysisStatusScreen";
import { ROUTES } from "./routes";

export type RootStackParamList = {
  WebShell: { url?: string } | undefined;
  Scan: undefined;
  Upload: { scannedImages?: string[]; source?: string } | undefined;
  AnalysisStatus: { jobId: string; documentId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.WEB_SHELL} component={WebShell} />
      <Stack.Screen name={ROUTES.SCAN} component={ScanScreen} />
      <Stack.Screen name={ROUTES.UPLOAD} component={UploadScreen} />
      <Stack.Screen
        name="AnalysisStatus"
        component={AnalysisStatusScreen}
      />
    </Stack.Navigator>
  );
}
