import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { FONTS } from '../constants/typography';
import useAuthStore from '../store/authStore';
import { mockKakaoService } from '../services/kakaoService';

interface KakaoLoginButtonProps {
  onPress?: () => void;
}

const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({
  onPress,
}) => {
  const { kakaoLogin, setLoading } = useAuthStore();

  const handlePress = async () => {
    if (onPress) {
      onPress();
    } else {
      try {
        console.log('🔐 카카오 로그인 시작 (버튼)');
        setLoading(true);
        
        // Mock 카카오 서비스로 로그인
        const kakaoUser = await mockKakaoService.login();
        
        // 인증 스토어에 사용자 정보 저장
        kakaoLogin(kakaoUser);
        
        Alert.alert('🎉 로그인 성공!', '프로필을 완성해주세요.');
        
      } catch (error) {
        console.error('❌ 카카오 로그인 실패:', error);
        Alert.alert('❌ 로그인 실패', '다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Ionicons name="chatbubble" size={20} color={COLORS.BLACK} />
        <Text style={styles.text}>카카오로 3초만에 시작하기</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FEE500', // 카카오 노란색
    borderRadius: SPACING.RADIUS.MD,
    paddingVertical: SPACING.COMPONENT.PADDING.LG,
    paddingHorizontal: SPACING.COMPONENT.PADDING.XL,
    marginHorizontal: SPACING.LG,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.SM,
  },
  text: {
    color: COLORS.BLACK,
    fontSize: FONTS.SIZES.LG,
    fontWeight: '600',
  },
});

export default KakaoLoginButton;
