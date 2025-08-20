import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WelcomeScreen } from './src/auth/WelcomeScreen';
import { ProfileCompleteScreen } from './src/auth/ProfileCompleteScreen';
import { KakaoUser, UserProfile } from './src/auth/types';
import { Alert } from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'profile'>('welcome');
  const [kakaoUser, setKakaoUser] = useState<KakaoUser | null>(null);

  const handleKakaoLogin = (user: KakaoUser) => {
    setKakaoUser(user);
    setCurrentScreen('profile');
  };

  const handleProfileComplete = (profile: UserProfile) => {
    console.log('프로필 완성:', profile);
    Alert.alert('완료!', '프로필이 완성되었습니다. 메인 앱으로 이동합니다.');
    // 여기서 메인 앱으로 이동
    setCurrentScreen('welcome');
  };

  const handleBack = () => {
    setCurrentScreen('welcome');
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      {currentScreen === 'welcome' ? (
        <WelcomeScreen onKakaoLogin={handleKakaoLogin} />
      ) : (
        <ProfileCompleteScreen
          kakaoUser={kakaoUser!}
          onComplete={handleProfileComplete}
          onBack={handleBack}
        />
      )}
    </SafeAreaProvider>
  );
}
