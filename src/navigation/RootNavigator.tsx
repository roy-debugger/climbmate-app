import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import BottomTabNavigator from './BottomTabNavigator';
import { WelcomeScreen } from '@/screens/auth/WelcomeScreen';
import { ProfileCompleteScreen } from '@/screens/auth/ProfileCompleteScreen';
import ComponentTestScreen from '@/screens/ComponentTestScreen';
import StorageTestScreen from '@/screens/StorageTestScreen';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * 루트 스택 네비게이터
 * 
 * 인증 화면들과 메인 앱 화면들을 관리
 */
const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* 인증 화면들 */}
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
      
      {/* 메인 앱 */}
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{
          title: 'ClimbMate',
        }}
      />
      
      {/* 테스트 화면들 */}
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
  );
};

export default RootNavigator;
