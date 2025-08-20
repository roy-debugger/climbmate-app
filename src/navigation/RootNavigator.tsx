import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import BottomTabNavigator from './BottomTabNavigator';
import ComponentTestScreen from '../screens/ComponentTestScreen';
import StorageTestScreen from '../screens/StorageTestScreen';
import WelcomeScreen from '../auth/WelcomeScreen';
import ProfileCompleteScreen from '../auth/ProfileCompleteScreen';
import useAuthStore from '../store/authStore';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { DEV_CONFIG } from '../constants';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * 루트 스택 네비게이터
 * 
 * 🚧 개발 편의를 위한 임시 설정
 * - DEV_MODE = true: 인증 체크 없이 바로 홈 화면
 * - DEV_MODE = false: 원래 인증 플로우
 */
const RootNavigator: React.FC = () => {
  // 🚧 개발 편의를 위한 임시 설정
  const DEV_MODE = DEV_CONFIG.DEV_MODE; // 개발 완료 후 false로 변경
  
  const { isAuthenticated, isLoading, isProfileComplete } = useAuthStore();
  
  console.log('🧭 RootNavigator 상태:', { isAuthenticated, isLoading, isProfileComplete });
  
  // 🚧 개발 모드일 때는 바로 홈 화면 표시
  if (DEV_MODE) {
    console.log('🚧 개발 모드: 인증 체크 없이 홈 화면으로 이동');
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="MainTabs"
            component={BottomTabNavigator}
            options={{
              title: 'ClimbMate',
            }}
          />
          <Stack.Screen
            name="ComponentTest"
            component={ComponentTestScreen}
            options={{
              title: '컴포넌트 테스트',
              headerShown: true,
              headerBackTitle: '뒤로',
              headerStyle: {
                backgroundColor: '#FF6B35',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: '600',
              },
            }}
          />
          <Stack.Screen
            name="StorageTest"
            component={StorageTestScreen}
            options={{
              title: '스토리지 테스트',
              headerShown: true,
              headerBackTitle: '뒤로',
              headerStyle: {
                backgroundColor: '#2E86AB',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: '600',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  // 📱 원래 인증 플로우 (개발 완료 후 사용)
  if (isLoading) {
    return <LoadingSpinner overlay text="로그인 중..." />;
  }
  
  // 프로필 완성 상태에 따른 화면 결정
  if (isAuthenticated && isProfileComplete) {
    console.log('🏠 메인 탭 네비게이션으로 이동');
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="MainTabs"
            component={BottomTabNavigator}
            options={{
              title: 'ClimbMate',
            }}
          />
          <Stack.Screen
            name="ComponentTest"
            component={ComponentTestScreen}
            options={{
              title: '컴포넌트 테스트',
              headerShown: true,
              headerBackTitle: '뒤로',
              headerStyle: {
                backgroundColor: '#FF6B35',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: '600',
              },
            }}
          />
          <Stack.Screen
            name="StorageTest"
            component={StorageTestScreen}
            options={{
              title: '스토리지 테스트',
              headerShown: true,
              headerBackTitle: '뒤로',
              headerStyle: {
                backgroundColor: '#2E86AB',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: '600',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  if (isAuthenticated && !isProfileComplete) {
    console.log('📝 프로필 완성 화면으로 이동');
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name="ProfileComplete" 
            component={ProfileCompleteScreen}
            options={{
              title: '프로필 완성',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  console.log('👋 웰컴 화면으로 이동');
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{
            title: '환영',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
