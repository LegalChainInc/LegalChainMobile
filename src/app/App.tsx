import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./navigation";
import { linking } from "./linking";

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <RootNavigator />
    </NavigationContainer>
  );
}
