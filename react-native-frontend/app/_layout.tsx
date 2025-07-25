import { useColorScheme } from '@/hooks/useColorScheme';
import { getToken, } from "@/utils/storage";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, } from "react";
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
    const navigation = useRouter();
  
  useEffect(() => {
    const checkProfile = async () => {
      const token = await getToken();
      if (!token) {
        navigation.replace("/login");
        return;
      }
    };
  
    checkProfile();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ?   DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
