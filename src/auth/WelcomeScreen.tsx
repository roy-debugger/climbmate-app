import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { FONTS } from '../constants/typography';
import { showSuccess, showError } from '../utils';
import KakaoLoginButton from './KakaoLoginButton';
import useAuthStore from '../store/authStore';
import { mockKakaoService } from '../services/kakaoService';

const WelcomeScreen: React.FC = () => {
  const { kakaoLogin, setLoading } = useAuthStore();

  const handleKakaoLogin = async () => {
    try {
      console.log('🔐 카카오 로그인 시작');
      setLoading(true);
      
      // Mock 카카오 서비스로 로그인
      const kakaoUser = await mockKakaoService.login();
      
      // 인증 스토어에 사용자 정보 저장
      kakaoLogin(kakaoUser);
      
      showSuccess('🎉 로그인 성공! 프로필을 완성해주세요.');
      
    } catch (error) {
      console.error('❌ 카카오 로그인 실패:', error);
      showError('❌ 로그인 실패 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 로고 및 슬로건 */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="fitness" size={80} color={COLORS.PRIMARY} />
          </View>
          <Text style={styles.title}>ClimbMate</Text>
          <Text style={styles.subtitle}>클라이밍 기록을 쉽게</Text>
        </View>

        {/* 중앙 이미지/일러스트 */}
        <View style={styles.illustration}>
          <Ionicons name="trending-up" size={120} color={COLORS.SECONDARY} />
          <Text style={styles.illustrationText}>
            🧗‍♀️ 클라이밍의 즐거움을\n📱 앱으로 기록하세요
          </Text>
        </View>

        {/* 카카오 로그인 버튼 */}
        <View style={styles.loginSection}>
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
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.LG,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: SPACING['2XL'],
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${COLORS.PRIMARY}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.LG,
  },
  title: {
    fontSize: FONTS.SIZES['3XL'],
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  subtitle: {
    fontSize: FONTS.SIZES.LG,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  illustration: {
    alignItems: 'center',
    marginVertical: SPACING['2XL'],
  },
  illustrationText: {
    fontSize: FONTS.SIZES.LG,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: SPACING.LG,
    lineHeight: FONTS.SIZES.LG * 1.5,
  },
  loginSection: {
    marginBottom: SPACING['2XL'],
  },
  termsText: {
    fontSize: FONTS.SIZES.XS,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: SPACING.LG,
    lineHeight: FONTS.SIZES.XS * 1.4,
  },
});

export default WelcomeScreen;
