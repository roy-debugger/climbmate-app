import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '@/store';

// Import screens (will be created later)
import HomeScreen from '@/screens/HomeScreen';
import SessionsScreen from '@/screens/SessionsScreen';
import GymsScreen from '@/screens/GymsScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import LoginScreen from '@/screens/LoginScreen';
import RegisterScreen from '@/screens/RegisterScreen';
import SessionDetailScreen from '@/screens/SessionDetailScreen';
import GymDetailScreen from '@/screens/GymDetailScreen';
import AddSessionScreen from '@/screens/AddSessionScreen';
import SettingsScreen from '@/screens/SettingsScreen';

// Import types
import { RootStackParamList, MainTabParamList } from '@/types';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Main Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Sessions"
        component={SessionsScreen}
        options={{
          tabBarLabel: '세션',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Gyms"
        component={GymsScreen}
        options={{
          tabBarLabel: '암장',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="map-pin" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '프로필',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Tab Icon Component
const TabIcon = ({ name, color, size }: { name: string; color: string; size: number }) => {
  // 웹과 React Native 모두에서 작동하는 아이콘
  const getIcon = () => {
    switch (name) {
      case 'home':
        return '🏠';
      case 'calendar':
        return '📅';
      case 'map-pin':
        return '📍';
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

// Root Stack Navigator
const RootNavigator = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        // Auth Stack
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        // Main App Stack
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />
          <Stack.Screen name="GymDetail" component={GymDetailScreen} />
          <Stack.Screen name="AddSession" component={AddSessionScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

// Main Navigation Container
const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
