import React, { useRef } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  BackHandler,
} from "react-native";
import { WebView } from "react-native-webview";
import { useFocusEffect } from "@react-navigation/native";
import { EXPO_PUBLIC_WEB_URL } from "../../config/env";

interface Props {
  route?: {
    params?: {
      url?: string;
    };
  };
}

export default function WebShell({ route }: Props) {
  const webViewRef = useRef<WebView>(null);
  const targetUrl = route?.params?.url ?? EXPO_PUBLIC_WEB_URL;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: targetUrl }}
      startInLoadingState
      javaScriptEnabled
      domStorageEnabled
      sharedCookiesEnabled
      renderLoading={() => (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#B8962E" />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
});
