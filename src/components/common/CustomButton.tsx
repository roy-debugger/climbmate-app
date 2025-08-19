import React, { memo } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { TEXT_STYLES } from '@/constants/typography';
import { ButtonProps } from '@/types/common';

/**
 * CustomButton 컴포넌트
 * 
 * 3가지 variant를 지원하는 재사용 가능한 버튼 컴포넌트
 * Instagram/카카오톡 스타일의 모던한 디자인
 * 
 * 사용 예시:
 * <CustomButton 
 *   title="로그인" 
 *   variant="primary" 
 *   onPress={handleLogin}
 *   loading={isLoading}
 * />
 * 
 * @param title - 버튼 텍스트
 * @param onPress - 버튼 클릭 핸들러
 * @param variant - 버튼 스타일 (primary/secondary/outline)
 * @param size - 버튼 크기 (small/medium/large)
 * @param disabled - 비활성화 여부
 * @param loading - 로딩 상태 여부
 * @param fullWidth - 전체 너비 사용 여부
 * @param leftIcon - 왼쪽 아이콘
 * @param rightIcon - 오른쪽 아이콘
 * @param style - 추가 스타일
 * @param testID - 테스트 ID
 */
const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  testID,
}) => {
  // 버튼 상태에 따른 스타일 결정
  const isDisabled = disabled || loading;
  
  // variant별 스타일
  const getVariantStyle = (): ViewStyle => {
    if (isDisabled) {
      return styles.disabled;
    }
    
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      default:
        return styles.primary;
    }
  };
  
  // variant별 텍스트 스타일
  const getTextStyle = (): TextStyle => {
    if (isDisabled) {
      return styles.textDisabled;
    }
    
    switch (variant) {
      case 'primary':
      case 'secondary':
        return styles.textLight;
      case 'outline':
        return styles.textPrimary;
      default:
        return styles.textLight;
    }
  };
  
  // size별 스타일
  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'large':
        return styles.large;
      default:
        return styles.medium;
    }
  };
  
  // size별 텍스트 스타일
  const getTextSizeStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return TEXT_STYLES.BUTTON_SMALL;
      case 'large':
        return TEXT_STYLES.BUTTON_LARGE;
      default:
        return TEXT_STYLES.BUTTON_MEDIUM;
    }
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.base,
        getVariantStyle(),
        getSizeStyle(),
        fullWidth && styles.fullWidth,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? COLORS.PRIMARY : COLORS.WHITE}
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={[getTextStyle(), getTextSizeStyle(), styles.text]}>
            {title}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: SPACING.BORDER.NORMAL,
    borderColor: COLORS.TRANSPARENT,
  },
  
  // Variant styles
  primary: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  
  secondary: {
    backgroundColor: COLORS.SECONDARY,
    borderColor: COLORS.SECONDARY,
  },
  
  outline: {
    backgroundColor: COLORS.TRANSPARENT,
    borderColor: COLORS.PRIMARY,
  },
  
  disabled: {
    backgroundColor: COLORS.GRAY_300,
    borderColor: COLORS.GRAY_300,
  },
  
  // Size styles
  small: {
    paddingVertical: SPACING.COMPONENT.PADDING.XS,
    paddingHorizontal: SPACING.COMPONENT.PADDING.SM,
    minHeight: 36,
  },
  
  medium: {
    paddingVertical: SPACING.COMPONENT.PADDING.SM,
    paddingHorizontal: SPACING.COMPONENT.PADDING.MD,
    minHeight: 44,
  },
  
  large: {
    paddingVertical: SPACING.COMPONENT.PADDING.MD,
    paddingHorizontal: SPACING.COMPONENT.PADDING.LG,
    minHeight: 52,
  },
  
  // Width styles
  fullWidth: {
    width: '100%',
  },
  
  // Text styles
  text: {
    textAlign: 'center',
    marginHorizontal: SPACING.XS,
  },
  
  textLight: {
    color: COLORS.WHITE,
  },
  
  textPrimary: {
    color: COLORS.PRIMARY,
  },
  
  textDisabled: {
    color: COLORS.GRAY_500,
  },
});

export default memo(CustomButton);
