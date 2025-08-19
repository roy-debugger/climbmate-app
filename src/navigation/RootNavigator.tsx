import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';
import BottomTabNavigator from './BottomTabNavigator';
import ComponentTestScreen from '@/screens/ComponentTestScreen';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * 루트 스택 네비게이터
 * 
 * 하단 탭 네비게이션과 모달/스택 화면들을 관리
 * ComponentTest 화면을 포함하여 컴포넌트 테스트 가능
 */
const RootNavigator: React.FC = () => {
  return (
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
          headerShown: true, // 네비게이션 헤더 사용
          headerBackTitle: '뒤로',
          headerStyle: {
            backgroundColor: '#FF6B35', // 주황색 배경
          },
          headerTintColor: '#FFFFFF', // 흰색 텍스트
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
