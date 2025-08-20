import React, { memo } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { LoadingSpinnerProps } from '../../types/common';

/**
 * LoadingSpinner 컴포넌트
 * 
 * 다양한 크기와 색상을 지원하는 로딩 스피너
 * 오버레이 모드로 전체 화면을 덮을 수 있음
 * Instagram/카카오톡 스타일의 모던한 디자인
 * 
 * 사용 예시:
 * <LoadingSpinner 
 *   size="large" 
 *   color="primary" 
 *   overlay={true}
 *   text="로딩 중..."
 * />
 * 
 * @param size - 스피너 크기 (small/medium/large/xlarge)
 * @param color - 스피너 색상 (primary/secondary/white/gray)
 * @param overlay - 전체 화면 오버레이 여부
 * @param text - 로딩 텍스트
 * @param style - 추가 스타일
 * @param testID - 테스트 ID
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'primary',
  overlay = false,
  text,
  style,
  testID,
}) => {
  // 색상 결정
  const getSpinnerColor = (): string => {
    switch (color) {
      case 'primary':
        return COLORS.PRIMARY;
      case 'secondary':
        return COLORS.SECONDARY;
      case 'white':
        return COLORS.WHITE;
      case 'gray':
        return COLORS.GRAY_500;
      default:
        return COLORS.PRIMARY;
    }
  };
  
  // 크기 결정
  const getSpinnerSize = (): 'small' | 'large' => {
    switch (size) {
      case 'small':
        return 'small';
      case 'xlarge':
        return 'large';
      default:
        return 'large';
    }
  };
  
  // 스피너 컴포넌트
  const SpinnerContent = () => (
    <View style={[styles.container, style]} testID={testID}>
      <ActivityIndicator
        size={getSpinnerSize()}
        color={getSpinnerColor()}
        style={styles.spinner}
      />
      {text && (
        <Text style={[styles.text, { color: getSpinnerColor() }]}>
          {text}
        </Text>
      )}
    </View>
  );
  
  // 오버레이 모드일 때 Modal로 감싸기
  if (overlay) {
    return (
      <Modal
        transparent
        visible={true}
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <SpinnerContent />
          </View>
        </View>
      </Modal>
    );
  }
  
  // 일반 모드
  return <SpinnerContent />;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.COMPONENT.PADDING.MD,
  },
  
  spinner: {
    marginBottom: SPACING.SM,
  },
  
  text: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: SPACING.SM,
  },
  
  // Overlay styles
  overlay: {
    flex: 1,
    backgroundColor: COLORS.OVERLAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  overlayContent: {
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.RADIUS.LG,
    padding: SPACING.COMPONENT.PADDING.XL,
    ...SPACING.SHADOW.LG,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    minHeight: 120,
  },
});

export default memo(LoadingSpinner);
