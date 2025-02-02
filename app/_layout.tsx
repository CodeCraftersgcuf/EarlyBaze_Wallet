import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { ThemeProvider } from "@/contexts/themeContext";
import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent splash screen auto-hide before loading
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="Buy" options={{ headerShown: false }} />
        <Stack.Screen name="SendReceive" options={{ headerShown: false }} />
        <Stack.Screen name="Swap" options={{ headerShown: false }} />
        <Stack.Screen name='PaymentSummary' options={{ headerShown: false }} />
        <Stack.Screen name="PaymentProof" options={{ headerShown: false }} />
        <Stack.Screen name="TransactionPage" options={{ headerShown: false }} />
        <Stack.Screen name="Withdraw" options={{ headerShown: false }} />
        <Stack.Screen name="SwapSummary" options={{ headerShown: false }} />
        <Stack.Screen name='TransactionSummary' options={{ headerShown: false }} />

        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="forgetpassword" options={{ headerShown: false }} />
        <Stack.Screen name="resetpassword" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
