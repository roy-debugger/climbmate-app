import React, { memo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { CardProps } from '@/types/common';

/**
 * Card 컴포넌트
 * 
 * 유연한 패딩, 마진, 그림자, 테두리를 지원하는 카드 컨테이너
 * Instagram/카카오톡 스타일의 모던한 디자인
 * 
 * 사용 예시:
 * <Card 
 *   padding="medium" 
 *   shadow="medium" 
 *   borderRadius="large"
 * >
 *   <Text>카드 내용</Text>
 * </Card>
 * 
 * @param children - 카드 내부 콘텐츠
 * @param padding - 내부 여백 (none/small/medium/large/xlarge)
 * @param margin - 외부 여백 (none/small/medium/large/xlarge)
 * @param shadow - 그림자 효과 (none/small/medium/large/xlarge)
 * @param borderRadius - 모서리 둥글기 (none/small/medium/large/round)
 * @param backgroundColor - 배경 색상
 * @param borderColor - 테두리 색상
 * @param borderWidth - 테두리 두께
 * @param elevation - Android 그림자 깊이
 * @param style - 추가 스타일
 * @param testID - 테스트 ID
 */
const Card: React.FC<CardProps> = ({
  children,
  padding = 'medium',
  margin = 'none',
  shadow = 'none',
  borderRadius = 'medium',
  backgroundColor = COLORS.SURFACE,
  borderColor = COLORS.TRANSPARENT,
  borderWidth = 0,
  elevation,
  style,
  testID,
}) => {
  // 패딩 스타일
  const getPaddingStyle = (): ViewStyle => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'small':
        return { padding: SPACING.COMPONENT.PADDING.SM };
      case 'large':
        return { padding: SPACING.COMPONENT.PADDING.LG };
      case 'xlarge':
        return { padding: SPACING.COMPONENT.PADDING.XL };
      default:
        return { padding: SPACING.COMPONENT.PADDING.MD };
    }
  };
  
  // 마진 스타일
  const getMarginStyle = (): ViewStyle => {
    switch (margin) {
      case 'none':
        return { margin: 0 };
      case 'small':
        return { margin: SPACING.COMPONENT.MARGIN.SM };
      case 'large':
        return { margin: SPACING.COMPONENT.MARGIN.LG };
      case 'xlarge':
        return { margin: SPACING.COMPONENT.MARGIN.XL };
      default:
        return { margin: SPACING.COMPONENT.MARGIN.MD };
    }
  };
  
  // 그림자 스타일
  const getShadowStyle = (): ViewStyle => {
    if (shadow === 'none') return {};
    
    const shadowStyle = SPACING.SHADOW[shadow.toUpperCase() as keyof typeof SPACING.SHADOW];
    if (!shadowStyle) return {};
    
    return {
      ...shadowStyle,
      elevation: elevation || shadowStyle.elevation,
    };
  };
  
  // 테두리 반경 스타일
  const getBorderRadiusStyle = (): ViewStyle => {
    switch (borderRadius) {
      case 'none':
        return { borderRadius: 0 };
      case 'small':
        return { borderRadius: SPACING.RADIUS.SM };
      case 'large':
        return { borderRadius: SPACING.RADIUS.LG };
      case 'round':
        return { borderRadius: SPACING.RADIUS.ROUND };
      default:
        return { borderRadius: SPACING.RADIUS.MD };
    }
  };
  
  return (
    <View
      style={[
        styles.base,
        getPaddingStyle(),
        getMarginStyle(),
        getShadowStyle(),
        getBorderRadiusStyle(),
        {
          backgroundColor,
          borderColor,
          borderWidth,
        },
        style,
      ]}
      testID={testID}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.SURFACE,
    borderWidth: 0,
  },
});

export default memo(Card);
