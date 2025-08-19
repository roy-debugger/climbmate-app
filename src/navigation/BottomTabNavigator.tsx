import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList, TabIconName } from '@/types/navigation';

// 스크린들 import
import HomeScreen from '@/screens/HomeScreen';
import MapScreen from '@/screens/MapScreen';
import RecordScreen from '@/screens/RecordScreen';
import SocialScreen from '@/screens/SocialScreen';
import ProfileScreen from '@/screens/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

// 탭 아이콘 컴포넌트 (웹과 React Native 호환)
const TabIcon = ({ name, color, size }: { name: TabIconName; color: string; size: number }) => {
  const getIcon = () => {
    switch (name) {
      case 'home':
        return '🏠';
      case 'map':
        return '🗺️';
      case 'calendar':
        return '📅';
      case 'users':
        return '👥';
      case 'user':
        return '👤';
      default:
        return '📱';
    }
  };

  // 웹 환경에서는 div, React Native에서는 Text를 사용
  if (typeof document !== 'undefined') {
    return (
      <div style={{ 
        color, 
        fontSize: size, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: size,
        height: size
      }}>
        {getIcon()}
      </div>
    );
  }

  // React Native 환경
  const { Text } = require('react-native');
  return (
    <Text style={{ color, fontSize: size }}>
      {getIcon()}
    </Text>
  );
};

// 하단 탭 네비게이터
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF6B35', // 선택된 탭: 주황색
        tabBarInactiveTintColor: '#9CA3AF', // 비선택 탭: 회색
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // 흰색 배경
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60, // 탭바 높이: 60px
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarIcon: ({ color, size }) => (
          <TabIcon 
            name={route.name === 'Record' ? 'calendar' : route.name === 'Social' ? 'users' : route.name.toLowerCase() as TabIconName} 
            color={color} 
            size={24} // 아이콘 크기: 24px
          />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: '지도',
        }}
      />
      <Tab.Screen
        name="Record"
        component={RecordScreen}
        options={{
          tabBarLabel: '기록',
        }}
      />
      <Tab.Screen
        name="Social"
        component={SocialScreen}
        options={{
          tabBarLabel: '소셜',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '프로필',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
