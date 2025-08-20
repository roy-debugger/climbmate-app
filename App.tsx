import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen } from './src/screens/auth/WelcomeScreen';
import { ProfileCompleteScreen } from './src/screens/auth/ProfileCompleteScreen';

// 간단한 타입 정의
type RootStackParamList = {
  Welcome: undefined;
  ProfileComplete: { 
    kakaoUser: {
      id: string;
      nickname: string;
      profileImage: string;
      email?: string;
    }
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              title: 'ClimbMate 시작하기',
            }}
          />
          <Stack.Screen
            name="ProfileComplete"
            component={ProfileCompleteScreen}
            options={{
              title: '프로필 완성하기',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
