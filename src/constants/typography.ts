/**
 * 타이포그래피 상수 정의
 * 일관된 폰트 크기, 굵기, 라인 높이 관리
 */

export const FONTS = {
  // Font Sizes
  SIZES: {
    XS: 10,
    SM: 12,
    BASE: 14,
    LG: 16,
    XL: 18,
    '2XL': 20,
    '3XL': 24,
    '4XL': 28,
    '5XL': 32,
    '6XL': 36,
    '7XL': 40,
    '8XL': 48,
    '9XL': 56,
  } as const,
  
  // Font Weights
  WEIGHTS: {
    THIN: '100',
    EXTRA_LIGHT: '200',
    LIGHT: '300',
    NORMAL: '400',
    MEDIUM: '500',
    SEMI_BOLD: '600',
    BOLD: '700',
    EXTRA_BOLD: '800',
    BLACK: '900',
  } as const,
  
  // Line Heights
  LINE_HEIGHTS: {
    TIGHT: 1.2,
    NORMAL: 1.4,
    RELAXED: 1.6,
    LOOSE: 1.8,
  } as const,
  
  // Letter Spacing
  LETTER_SPACING: {
    TIGHT: -0.5,
    NORMAL: 0,
    WIDE: 0.5,
    WIDER: 1,
  } as const,
} as const;

// 미리 정의된 텍스트 스타일
export const TEXT_STYLES = {
  // Display Styles
  DISPLAY_LARGE: {
    fontSize: FONTS.SIZES['8XL'],
    fontWeight: FONTS.WEIGHTS.BOLD,
    lineHeight: FONTS.SIZES['8XL'] * FONTS.LINE_HEIGHTS.TIGHT,
    letterSpacing: FONTS.LETTER_SPACING.TIGHT,
  },
  
  DISPLAY_MEDIUM: {
    fontSize: FONTS.SIZES['6XL'],
    fontWeight: FONTS.WEIGHTS.BOLD,
    lineHeight: FONTS.SIZES['6XL'] * FONTS.LINE_HEIGHTS.TIGHT,
    letterSpacing: FONTS.LETTER_SPACING.TIGHT,
  },
  
  DISPLAY_SMALL: {
    fontSize: FONTS.SIZES['5XL'],
    fontWeight: FONTS.WEIGHTS.BOLD,
    lineHeight: FONTS.SIZES['5XL'] * FONTS.LINE_HEIGHTS.TIGHT,
    letterSpacing: FONTS.LETTER_SPACING.TIGHT,
  },
  
  // Heading Styles
  H1: {
    fontSize: FONTS.SIZES['4XL'],
    fontWeight: FONTS.WEIGHTS.BOLD,
    lineHeight: FONTS.SIZES['4XL'] * FONTS.LINE_HEIGHTS.TIGHT,
    letterSpacing: FONTS.LETTER_SPACING.TIGHT,
  },
  
  H2: {
    fontSize: FONTS.SIZES['3XL'],
    fontWeight: FONTS.WEIGHTS.BOLD,
    lineHeight: FONTS.SIZES['3XL'] * FONTS.LINE_HEIGHTS.TIGHT,
    letterSpacing: FONTS.LETTER_SPACING.TIGHT,
  },
  
  H3: {
    fontSize: FONTS.SIZES['2XL'],
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
    lineHeight: FONTS.SIZES['2XL'] * FONTS.LINE_HEIGHTS.TIGHT,
    letterSpacing: FONTS.LETTER_SPACING.TIGHT,
  },
  
  H4: {
    fontSize: FONTS.SIZES.XL,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
    lineHeight: FONTS.SIZES.XL * FONTS.LINE_HEIGHTS.TIGHT,
    letterSpacing: FONTS.LETTER_SPACING.TIGHT,
  },
  
  H5: {
    fontSize: FONTS.SIZES.LG,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
    lineHeight: FONTS.SIZES.LG * FONTS.LINE_HEIGHTS.TIGHT,
    letterSpacing: FONTS.LETTER_SPACING.TIGHT,
  },
  
  H6: {
    fontSize: FONTS.SIZES.BASE,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
    lineHeight: FONTS.SIZES.BASE * FONTS.LINE_HEIGHTS.TIGHT,
    letterSpacing: FONTS.LETTER_SPACING.TIGHT,
  },
  
  // Body Styles
  BODY_LARGE: {
    fontSize: FONTS.SIZES.LG,
    fontWeight: FONTS.WEIGHTS.NORMAL,
    lineHeight: FONTS.SIZES.LG * FONTS.LINE_HEIGHTS.NORMAL,
    letterSpacing: FONTS.LETTER_SPACING.NORMAL,
  },
  
  BODY_MEDIUM: {
    fontSize: FONTS.SIZES.BASE,
    fontWeight: FONTS.WEIGHTS.NORMAL,
    lineHeight: FONTS.SIZES.BASE * FONTS.LINE_HEIGHTS.NORMAL,
    letterSpacing: FONTS.LETTER_SPACING.NORMAL,
  },
  
  BODY_SMALL: {
    fontSize: FONTS.SIZES.SM,
    fontWeight: FONTS.WEIGHTS.NORMAL,
    lineHeight: FONTS.SIZES.SM * FONTS.LINE_HEIGHTS.NORMAL,
    letterSpacing: FONTS.LETTER_SPACING.NORMAL,
  },
  
  // Caption Styles
  CAPTION: {
    fontSize: FONTS.SIZES.XS,
    fontWeight: FONTS.WEIGHTS.NORMAL,
    lineHeight: FONTS.SIZES.XS * FONTS.LINE_HEIGHTS.NORMAL,
    letterSpacing: FONTS.LETTER_SPACING.NORMAL,
  },
  
  // Button Styles
  BUTTON_LARGE: {
    fontSize: FONTS.SIZES.LG,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
    lineHeight: FONTS.SIZES.LG * FONTS.LINE_HEIGHTS.TIGHT,
    letterSpacing: FONTS.LETTER_SPACING.WIDE,
  },
  
  BUTTON_MEDIUM: {
    fontSize: FONTS.SIZES.BASE,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
    lineHeight: FONTS.SIZES.BASE * FONTS.LINE_HEIGHTS.TIGHT,
    letterSpacing: FONTS.LETTER_SPACING.WIDE,
  },
  
  BUTTON_SMALL: {
    fontSize: FONTS.SIZES.SM,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
    lineHeight: FONTS.SIZES.SM * FONTS.LINE_HEIGHTS.TIGHT,
    letterSpacing: FONTS.LETTER_SPACING.WIDE,
  },
  
  // Label Styles
  LABEL: {
    fontSize: FONTS.SIZES.SM,
    fontWeight: FONTS.WEIGHTS.MEDIUM,
    lineHeight: FONTS.SIZES.SM * FONTS.LINE_HEIGHTS.TIGHT,
    letterSpacing: FONTS.LETTER_SPACING.WIDE,
  },
} as const;

// 타입 정의
export type FontSize = typeof FONTS.SIZES[keyof typeof FONTS.SIZES];
export type FontWeight = typeof FONTS.WEIGHTS[keyof typeof FONTS.WEIGHTS];
export type LineHeight = typeof FONTS.LINE_HEIGHTS[keyof typeof FONTS.LINE_HEIGHTS];
export type LetterSpacing = typeof FONTS.LETTER_SPACING[keyof typeof FONTS.LETTER_SPACING];

// 유틸리티 함수
export const getFontSize = (size: keyof typeof FONTS.SIZES): number => FONTS.SIZES[size];
export const getFontWeight = (weight: keyof typeof FONTS.WEIGHTS): string => FONTS.WEIGHTS[weight];
export const getLineHeight = (height: keyof typeof FONTS.LINE_HEIGHTS): number => FONTS.LINE_HEIGHTS[height];
export const getLetterSpacing = (spacing: keyof typeof FONTS.LETTER_SPACING): number => FONTS.LETTER_SPACING[spacing];
