import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS } from './constants';

interface KakaoLoginButtonProps {
  onPress?: () => void;
}

export const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({
  onPress,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // 임시로 알럿 표시 (실제 SDK 연동 전까지)
      Alert.alert(
        '카카오 로그인',
        '카카오 로그인 기능이 준비 중입니다.\n2-2 단계에서 실제 연동을 진행합니다.',
        [{ text: '확인' }]
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Ionicons name="chatbubble" size={20} color={COLORS.KAKAO_BROWN} />
        <Text style={styles.text}>카카오로 3초만에 시작하기</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.KAKAO_YELLOW,
    borderRadius: SPACING.MD,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.XL,
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
    color: COLORS.KAKAO_BROWN,
    fontSize: FONTS.LG,
    fontWeight: '600',
  },
});
