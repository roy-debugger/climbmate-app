import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, FONTS } from './constants';
import { KakaoLoginButton } from './KakaoLoginButton';

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleKakaoLogin = () => {
    // 로그인 화면으로 이동
    // @ts-ignore - 네비게이션 타입 문제 임시 해결
    navigation.navigate('Login');
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
    fontSize: FONTS['3XL'],
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  subtitle: {
    fontSize: FONTS.LG,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  illustration: {
    alignItems: 'center',
    marginVertical: SPACING['2XL'],
  },
  illustrationText: {
    fontSize: FONTS.LG,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: SPACING.LG,
    lineHeight: FONTS.LG * 1.5,
  },
  loginSection: {
    marginBottom: SPACING['2XL'],
  },
  termsText: {
    fontSize: FONTS.XS,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: SPACING.LG,
    lineHeight: FONTS.XS * 1.4,
  },
});
