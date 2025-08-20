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

const Stack = createStackNavigator<RootStackParamList>();

/**
 * 루트 스택 네비게이터
 * 
 * 인증 상태에 따라 다른 화면을 보여줌
 * - 로딩 중: 로딩 스피너
 * - 인증됨 + 프로필 완성: 메인 탭 네비게이션
 * - 인증됨 + 프로필 미완성: 프로필 완성 화면
 * - 인증 안됨: 웰컴 화면
 */
const RootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading, isProfileComplete } = useAuthStore();
  
  console.log('🧭 RootNavigator 상태:', { isAuthenticated, isLoading, isProfileComplete });
  
  if (isLoading) {
    return <LoadingSpinner overlay text="로그인 중..." />;
  }
  
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        isProfileComplete ? (
          // 인증됨 + 프로필 완성: 메인 화면
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
        ) : (
          // 인증됨 + 프로필 미완성: 프로필 완성 화면
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
        )
      ) : (
        // 인증 안됨: 웰컴 화면
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
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
