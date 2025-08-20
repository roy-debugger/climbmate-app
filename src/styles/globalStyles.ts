import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { FONTS } from '@/constants/typography';
import { LAYOUT } from '@/constants/layout';

/**
 * 전역 공통 스타일 정의
 * 자주 사용되는 스타일들을 미리 정의하여 재사용성 향상
 */

export const globalStyles = StyleSheet.create({
  // 레이아웃 관련
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  spaceAround: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  
  // 카드 관련
  card: {
    backgroundColor: COLORS.SURFACE,
    borderRadius: LAYOUT.CARD.BORDER_RADIUS.MEDIUM,
    padding: LAYOUT.CARD.PADDING.MEDIUM,
    marginBottom: LAYOUT.CARD.MARGIN.MEDIUM,
    ...LAYOUT.SHADOW.MEDIUM,
  },
  
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XS,
  },
  
  cardTitle: {
    fontSize: FONTS.SIZES.MD,
    fontWeight: FONTS.WEIGHTS.SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  
  // 버튼 관련
  button: {
    height: LAYOUT.BUTTON.HEIGHT.MEDIUM,
    borderRadius: LAYOUT.BUTTON.BORDER_RADIUS.MEDIUM,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.BUTTON.PADDING.MEDIUM.horizontal,
    paddingVertical: LAYOUT.BUTTON.PADDING.MEDIUM.vertical,
  },
  
  buttonPrimary: {
    backgroundColor: COLORS.PRIMARY,
  },
  
  buttonSecondary: {
    backgroundColor: COLORS.SECONDARY,
  },
  
  buttonOutline: {
    backgroundColor: COLORS.TRANSPARENT,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  
  buttonDisabled: {
    backgroundColor: COLORS.GRAY_300,
    opacity: 0.6,
  },
  
  buttonText: {
    fontSize: FONTS.SIZES.MD,
    fontWeight: FONTS.WEIGHTS.SEMIBOLD,
    color: COLORS.WHITE,
  },
  
  buttonTextOutline: {
    color: COLORS.PRIMARY,
  },
  
  buttonTextDisabled: {
    color: COLORS.TEXT_DISABLED,
  },
  
  // 입력 필드 관련
  input: {
    height: LAYOUT.INPUT.HEIGHT.MEDIUM,
    backgroundColor: COLORS.SURFACE,
    borderRadius: LAYOUT.INPUT.BORDER_RADIUS.MEDIUM,
    paddingHorizontal: LAYOUT.INPUT.PADDING.MEDIUM.horizontal,
    paddingVertical: LAYOUT.INPUT.PADDING.MEDIUM.vertical,
    fontSize: FONTS.SIZES.MD,
    color: COLORS.TEXT_PRIMARY,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  
  inputFocused: {
    borderColor: COLORS.PRIMARY,
  },
  
  inputError: {
    borderColor: COLORS.ERROR,
  },
  
  // 헤더 관련
  header: {
    height: LAYOUT.HEADER.HEIGHT.MEDIUM,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.HEADER.PADDING.MEDIUM.horizontal,
    paddingVertical: LAYOUT.HEADER.PADDING.MEDIUM.vertical,
  },
  
  headerTitle: {
    fontSize: FONTS.SIZES.LG,
    fontWeight: FONTS.WEIGHTS.BOLD,
    color: COLORS.WHITE,
  },
  
  // 모달 관련
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.OVERLAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderRadius: LAYOUT.MODAL.BORDER_RADIUS.MEDIUM,
    padding: LAYOUT.MODAL.PADDING.MEDIUM,
    width: '80%',
    maxWidth: 400,
    ...LAYOUT.SHADOW.LARGE,
  },
  
  modalHeader: {
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  
  modalTitle: {
    fontSize: FONTS.SIZES.LG,
    fontWeight: FONTS.WEIGHTS.SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.MD,
  },
  
  modalButton: {
    flex: 1,
    marginHorizontal: SPACING.XS,
  },
  
  // 리스트 관련
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_200,
  },
  
  listItemText: {
    flex: 1,
    fontSize: FONTS.SIZES.MD,
    color: COLORS.TEXT_PRIMARY,
  },
  
  // 상태 관련
  success: {
    backgroundColor: COLORS.SUCCESS,
    padding: SPACING.MD,
    borderRadius: SPACING.RADIUS.MD,
    alignItems: 'center',
  },
  
  error: {
    backgroundColor: COLORS.ERROR,
    padding: SPACING.MD,
    borderRadius: SPACING.RADIUS.MD,
    alignItems: 'center',
  },
  
  warning: {
    backgroundColor: COLORS.WARNING,
    padding: SPACING.MD,
    borderRadius: SPACING.RADIUS.MD,
    alignItems: 'center',
  },
  
  info: {
    backgroundColor: COLORS.INFO,
    padding: SPACING.MD,
    borderRadius: SPACING.RADIUS.MD,
    alignItems: 'center',
  },
  
  // 텍스트 관련
  textPrimary: {
    fontSize: FONTS.SIZES.MD,
    color: COLORS.TEXT_PRIMARY,
  },
  
  textSecondary: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
  },
  
  textLarge: {
    fontSize: FONTS.SIZES.LG,
    color: COLORS.TEXT_PRIMARY,
  },
  
  textSmall: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
  },
  
  textBold: {
    fontWeight: FONTS.WEIGHTS.BOLD,
  },
  
  textSemibold: {
    fontWeight: FONTS.WEIGHTS.SEMIBOLD,
  },
  
  textCenter: {
    textAlign: 'center',
  },
  
  // 유틸리티
  hidden: {
    display: 'none',
  },
  
  absolute: {
    position: 'absolute',
  },
  
  relative: {
    position: 'relative',
  },
  
  fullWidth: {
    width: '100%',
  },
  
  fullHeight: {
    height: '100%',
  },
});

// 스타일 유틸리티 함수
export const createButtonStyle = (
  variant: 'primary' | 'secondary' | 'outline' = 'primary',
  size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium',
  disabled: boolean = false
) => {
  const baseStyle = [
    globalStyles.button,
    globalStyles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
  ];
  
  if (disabled) {
    baseStyle.push(globalStyles.buttonDisabled);
  }
  
  return baseStyle;
};

export const createInputStyle = (
  focused: boolean = false,
  hasError: boolean = false
) => {
  const baseStyle = [globalStyles.input];
  
  if (focused) {
    baseStyle.push(globalStyles.inputFocused);
  }
  
  if (hasError) {
    baseStyle.push(globalStyles.inputError);
  }
  
  return baseStyle;
};

export const createCardStyle = (
  padding: 'small' | 'medium' | 'large' | 'xlarge' = 'medium',
  margin: 'small' | 'medium' | 'large' | 'xlarge' = 'medium',
  shadow: 'small' | 'medium' | 'large' | 'xlarge' = 'medium'
) => {
  return [
    globalStyles.card,
    {
      padding: LAYOUT.CARD.PADDING[padding],
      marginBottom: LAYOUT.CARD.MARGIN[margin],
      ...LAYOUT.SHADOW[shadow],
    },
  ];
};
