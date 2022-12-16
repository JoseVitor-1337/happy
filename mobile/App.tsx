import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

import { useCallback, useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import AppStack from "./src/Routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoSemibold: Nunito_600SemiBold,
    NunitoBold: Nunito_700Bold,
    NunitoExtrabold: Nunito_800ExtraBold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.warn(error);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar barStyle="dark-content" />
      <AppStack />
    </SafeAreaView>
  );
}
