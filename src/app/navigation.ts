import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WebShell from "../screens/WebShell/WebShell";
import ScanScreen from "../screens/Scan/ScanScreen";
import UploadScreen from "../screens/Upload/UploadScreen";

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WebShell" component={WebShell} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="Upload" component={UploadScreen} />
    </Stack.Navigator>
  );
}
