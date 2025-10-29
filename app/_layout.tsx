import { Stack } from 'expo-router';
import '../src/utils/webPolyfills';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          title: 'Главная'
        }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ 
          headerShown: false,
          title: 'Настройки'
        }} 
      />
    </Stack>
  );
}