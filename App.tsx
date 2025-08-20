import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { useOnboarding } from './src/hooks/useOnboarding';
import { DEV_CONFIG } from './src/constants';

export default function App() {
  // 🚧 개발 편의를 위한 임시 설정 - 홈 화면을 첫 화면으로
  const DEV_MODE = DEV_CONFIG.DEV_MODE; // 개발 완료 후 false로 변경
  
  const [showSplash, setShowSplash] = useState(!DEV_MODE);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { isOnboardingCompleted, isLoading } = useOnboarding();

  useEffect(() => {
    // 스플래시 화면이 끝나면 온보딩 상태 확인
    if (!showSplash) {
      checkOnboardingStatus();
    }
  }, [showSplash]);

  const checkOnboardingStatus = () => {
    if (isLoading) return;
    
    if (isOnboardingCompleted === false) {
      setShowOnboarding(true);
    }
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
  };

  // 🚧 개발 모드일 때는 바로 메인 앱 표시
  if (DEV_MODE) {
    return (
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <RootNavigator />
      </SafeAreaProvider>
    );
  }

  // 📱 원래 플로우 (스플래시 → 온보딩 → 메인 앱)
  // 스플래시 화면 표시
  if (showSplash) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <SplashScreen onFinish={handleSplashFinish} />
      </SafeAreaProvider>
    );
  }

  // 온보딩 화면 표시
  if (showOnboarding) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <OnboardingScreen
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      </SafeAreaProvider>
    );
  }

  // 메인 앱 표시
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
