/**
 * 앱 전체 색상 상수 정의
 * Instagram/카카오톡 스타일의 모던한 색상 팔레트
 */

export const COLORS = {
  // Primary Colors
  PRIMARY: '#FF6B35',        // 메인 주황색
  PRIMARY_LIGHT: '#FF8A65',  // 밝은 주황색
  PRIMARY_DARK: '#E55A2B',   // 어두운 주황색
  
  // Secondary Colors
  SECONDARY: '#2E86AB',      // 보조 파란색
  SECONDARY_LIGHT: '#4A9BC8', // 밝은 파란색
  SECONDARY_DARK: '#1E5A7A',  // 어두운 파란색
  
  // Background Colors
  BACKGROUND: '#F8F9FA',     // 메인 배경색
  BACKGROUND_SECONDARY: '#FFFFFF', // 보조 배경색
  SURFACE: '#FFFFFF',        // 카드/컴포넌트 배경
  
  // Text Colors
  TEXT_PRIMARY: '#1F2937',   // 주요 텍스트
  TEXT_SECONDARY: '#6B7280', // 보조 텍스트
  TEXT_DISABLED: '#9CA3AF',  // 비활성화 텍스트
  TEXT_INVERSE: '#FFFFFF',   // 반전 텍스트 (버튼 등)
  
  // Gray Scale
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_300: '#D1D5DB',
  GRAY_400: '#9CA3AF',
  GRAY_500: '#6B7280',
  GRAY_600: '#4B5563',
  GRAY_700: '#374151',
  GRAY_800: '#1F2937',
  GRAY_900: '#111827',
  
  // Status Colors
  SUCCESS: '#16A34A',        // 성공/완료
  SUCCESS_LIGHT: '#22C55E',  // 밝은 성공색
  WARNING: '#D97706',        // 경고
  WARNING_LIGHT: '#F59E0B',  // 밝은 경고색
  ERROR: '#DC2626',          // 에러/실패
  ERROR_LIGHT: '#EF4444',    // 밝은 에러색
  INFO: '#2563EB',           // 정보
  INFO_LIGHT: '#3B82F6',     // 밝은 정보색
  
  // Social Colors
  FACEBOOK: '#1877F2',
  GOOGLE: '#DB4437',
  APPLE: '#000000',
  KAKAO: '#FEE500',         // 카카오 공식 노란색
  KAKAO_TEXT: '#000000',    // 카카오 텍스트 색상
  
  // Transparent
  TRANSPARENT: 'transparent',
  OVERLAY: 'rgba(0, 0, 0, 0.5)',
  OVERLAY_LIGHT: 'rgba(0, 0, 0, 0.1)',
  
  // Legacy Support (기존 코드 호환성)
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_LIGHT: '#F1F3F4',
  GRAY_MEDIUM: '#9CA3AF',
  GRAY_DARK: '#6B7280',
  
  // 기존 코드와의 호환성을 위한 소문자 별칭
  primary: '#FF6B35',
  secondary: '#2E86AB', 
  background: '#F8F9FA',
  surface: '#FFFFFF',
  white: '#FFFFFF',
  black: '#000000',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  lightGray: '#F1F3F4',
  success: '#16A34A',
} as const;

// 색상 타입 정의
export type ColorKey = keyof typeof COLORS;
export type ColorValue = typeof COLORS[ColorKey];

// 색상 유틸리티 함수
export const getColor = (key: ColorKey): ColorValue => COLORS[key];
export const getColorWithOpacity = (key: ColorKey, opacity: number): string => {
  const color = COLORS[key];
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};
