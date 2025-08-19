import React, { memo, useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { TEXT_STYLES } from '@/constants/typography';
import { InputProps } from '@/types/common';

/**
 * CustomInput 컴포넌트
 * 
 * 에러 상태, 아이콘, 포커스 애니메이션을 지원하는 입력 필드
 * Instagram/카카오톡 스타일의 모던한 디자인
 * 
 * 사용 예시:
 * <CustomInput
 *   placeholder="이메일을 입력하세요"
 *   value={email}
 *   onChangeText={setEmail}
 *   error="올바른 이메일 형식이 아닙니다"
 *   leftIcon={<Icon name="mail" />}
 * />
 * 
 * @param placeholder - 플레이스홀더 텍스트
 * @param value - 입력 값
 * @param onChangeText - 텍스트 변경 핸들러
 * @param type - 입력 타입 (text/email/password/number/phone)
 * @param size - 입력 필드 크기 (small/medium/large)
 * @param secureTextEntry - 비밀번호 입력 여부
 * @param error - 에러 메시지
 * @param leftIcon - 왼쪽 아이콘
 * @param rightIcon - 오른쪽 아이콘
 * @param onFocus - 포커스 핸들러
 * @param onBlur - 블러 핸들러
 * @param multiline - 여러 줄 입력 여부
 * @param numberOfLines - 여러 줄 입력 시 줄 수
 * @param maxLength - 최대 입력 길이
 * @param editable - 편집 가능 여부
 * @param style - 추가 스타일
 * @param testID - 테스트 ID
 */
const CustomInput: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  type = 'text',
  size = 'medium',
  secureTextEntry = false,
  error,
  leftIcon,
  rightIcon,
  onFocus,
  onBlur,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  editable = true,
  autoCapitalize = 'none',
  autoCorrect = false,
  keyboardType = 'default',
  returnKeyType = 'done',
  onSubmitEditing,
  style,
  testID,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [borderColor] = useState(new Animated.Value(0));
  
  // 포커스 애니메이션
  const animateBorder = useCallback((focused: boolean) => {
    Animated.timing(borderColor, {
      toValue: focused ? 1 : 0,
      duration: SPACING.ANIMATION.NORMAL,
      useNativeDriver: false,
    }).start();
  }, [borderColor]);
  
  // 포커스 핸들러
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    animateBorder(true);
    onFocus?.();
  }, [animateBorder, onFocus]);
  
  // 블러 핸들러
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    animateBorder(false);
    onBlur?.();
  }, [animateBorder, onBlur]);
  
  // 키보드 타입 결정
  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'password':
        return 'default';
      case 'number':
        return 'numeric';
      case 'phone':
        return 'phone-pad';
      default:
        return keyboardType;
    }
  };
  
  // 보안 텍스트 결정
  const getSecureTextEntry = () => {
    if (type === 'password') return true;
    return secureTextEntry;
  };
  
  // 에러 상태 스타일
  const hasError = !!error;
  const isDisabled = !editable;
  
  // 애니메이션된 테두리 색상
  const animatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: [
      hasError ? COLORS.ERROR : COLORS.GRAY_300,
      hasError ? COLORS.ERROR : COLORS.PRIMARY,
    ],
  });
  
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
        return TEXT_STYLES.BODY_SMALL;
      case 'large':
        return TEXT_STYLES.BODY_LARGE;
      default:
        return TEXT_STYLES.BODY_MEDIUM;
    }
  };
  
  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.inputContainer,
          getSizeStyle(),
          {
            borderColor: animatedBorderColor,
            backgroundColor: isDisabled ? COLORS.GRAY_100 : COLORS.WHITE,
          },
          isFocused && styles.focused,
          hasError && styles.error,
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={[
            styles.input,
            getTextSizeStyle(),
            {
              paddingLeft: leftIcon ? SPACING.SM : SPACING.COMPONENT.PADDING.MD,
              paddingRight: rightIcon ? SPACING.SM : SPACING.COMPONENT.PADDING.MD,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.GRAY_400}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={getSecureTextEntry()}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          editable={editable}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          keyboardType={getKeyboardType()}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onFocus={handleFocus}
          onBlur={handleBlur}
          testID={testID}
        />
        
        {rightIcon && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </Animated.View>
      
      {hasError && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: SPACING.BORDER.NORMAL,
    borderRadius: SPACING.RADIUS.MD,
    backgroundColor: COLORS.WHITE,
  },
  
  // Size styles
  small: {
    minHeight: 40,
  },
  
  medium: {
    minHeight: 48,
  },
  
  large: {
    minHeight: 56,
  },
  
  // State styles
  focused: {
    ...SPACING.SHADOW.SM,
  },
  
  error: {
    borderColor: COLORS.ERROR,
  },
  
  // Icon styles
  leftIcon: {
    paddingLeft: SPACING.COMPONENT.PADDING.MD,
    paddingRight: SPACING.XS,
  },
  
  rightIcon: {
    paddingLeft: SPACING.XS,
    paddingRight: SPACING.COMPONENT.PADDING.MD,
  },
  
  // Input styles
  input: {
    flex: 1,
    color: COLORS.TEXT_PRIMARY,
  },
  
  // Error text styles
  errorText: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.ERROR,
    marginTop: SPACING.XS,
    marginLeft: SPACING.SM,
  },
});

export default memo(CustomInput);
