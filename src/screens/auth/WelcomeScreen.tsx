import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { KakaoLoginButton } from '../../components/auth/KakaoLoginButton';
import { RootStackParamList } from '../../types';

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleKakaoLogin = () => {
    // 임시로 가상의 카카오 사용자 정보를 생성
    const mockKakaoUser = {
      id: 'kakao_12345',
      nickname: '클라이머',
      profileImage: 'https://via.placeholder.com/100',
      email: 'climber@example.com',
    };

    // 프로필 완성 화면으로 이동
    navigation.navigate('ProfileComplete', { kakaoUser: mockKakaoUser });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 상단: 로고 및 슬로건 */}
        <View style={styles.header}>
          <Text style={styles.logo}>ClimbMate</Text>
          <Text style={styles.slogan}>클라이밍 기록을 쉽게</Text>
        </View>

        {/* 중앙: 클라이밍 이미지 */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>🧗‍♀️</Text>
            <Text style={styles.imageSubtext}>클라이밍의 즐거움</Text>
          </View>
        </View>

        {/* 하단: 로그인 버튼 및 약관 */}
        <View style={styles.bottomSection}>
          <KakaoLoginButton onPress={handleKakaoLogin} />
          
          <Text style={styles.termsText}>
            서비스 이용약관 및 개인정보처리방침에 동의
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#333',
    marginBottom: 8,
  },
  slogan: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  imageText: {
    fontSize: 80,
    marginBottom: 16,
  },
  imageSubtext: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  bottomSection: {
    marginBottom: 40,
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 16,
  },
});

