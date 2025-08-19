import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { TEXT_STYLES } from '@/constants/typography';
import { HeaderProps } from '@/types/common';

/**
 * Header 컴포넌트
 * 
 * Safe Area 처리, 뒤로가기 버튼, 커스텀 오른쪽 컴포넌트를 지원하는 헤더
 * Instagram/카카오톡 스타일의 모던한 디자인
 * 
 * 사용 예시:
 * <Header
 *   title="프로필"
 *   showBackButton={true}
 *   onBackPress={handleBack}
 *   rightComponent={<CustomButton title="편집" />}
 * />
 * 
 * @param title - 헤더 제목
 * @param showBackButton - 뒤로가기 버튼 표시 여부
 * @param rightComponent - 오른쪽 커스텀 컴포넌트
 * @param onBackPress - 뒤로가기 버튼 클릭 핸들러
 * @param backgroundColor - 배경 색상
 * @param titleColor - 제목 색상
 * @param showBorder - 하단 테두리 표시 여부
 * @param transparent - 투명 배경 여부
 * @param style - 추가 스타일
 * @param testID - 테스트 ID
 */
const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  rightComponent,
  onBackPress,
  backgroundColor = COLORS.WHITE,
  titleColor = COLORS.TEXT_PRIMARY,
  showBorder = true,
  transparent = false,
  style,
  testID,
}) => {
  // 뒤로가기 버튼
  const BackButton = () => (
    <TouchableOpacity
      style={styles.backButton}
      onPress={onBackPress}
      activeOpacity={0.7}
      testID="header-back-button"
    >
      <Text style={[styles.backButtonText, { color: titleColor }]}>
        ←
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: transparent ? COLORS.TRANSPARENT : backgroundColor,
        },
      ]}
      edges={['top']}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: transparent ? COLORS.TRANSPARENT : backgroundColor,
            borderBottomWidth: showBorder && !transparent ? SPACING.BORDER.NORMAL : 0,
            borderBottomColor: showBorder && !transparent ? COLORS.GRAY_200 : COLORS.TRANSPARENT,
          },
          style,
        ]}
        testID={testID}
      >
        {/* 왼쪽 영역 */}
        <View style={styles.leftSection}>
          {showBackButton && <BackButton />}
        </View>
        
        {/* 중앙 제목 */}
        <View style={styles.centerSection}>
          <Text
            style={[
              styles.title,
              { color: titleColor },
            ]}
            numberOfLines={1}
            testID="header-title"
          >
            {title}
          </Text>
        </View>
        
        {/* 오른쪽 영역 */}
        <View style={styles.rightSection}>
          {rightComponent}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.WHITE,
  },
  
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: SPACING.LAYOUT.HEADER_HEIGHT,
    paddingHorizontal: SPACING.LAYOUT.SCREEN_PADDING,
  },
  
  // 섹션별 스타일
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  
  centerSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  
  // 뒤로가기 버튼
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SPACING.RADIUS.ROUND,
  },
  
  backButtonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  
  // 제목
  title: {
    ...TEXT_STYLES.H4,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default memo(Header);
