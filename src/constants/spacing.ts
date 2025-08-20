/**
 * 스페이싱 상수 정의
 * 일관된 여백, 패딩, 마진 관리
 * 8px 기반 그리드 시스템
 */

export const SPACING = {
  // Base spacing unit (8px grid system)
  BASE: 8,
  
  // Small spacing
  XS: 4,    // 4px
  SM: 8,    // 8px
  MD: 16,   // 16px
  LG: 24,   // 24px
  XL: 32,   // 32px
  '2XL': 40, // 40px
  '3XL': 48, // 48px
  '4XL': 56, // 56px
  '5XL': 64, // 64px
  
  // Component specific spacing
  COMPONENT: {
    PADDING: {
      XS: 8,    // 작은 컴포넌트
      SM: 12,   // 작은 컴포넌트
      MD: 16,   // 기본 컴포넌트
      LG: 20,   // 큰 컴포넌트
      XL: 24,   // 매우 큰 컴포넌트
    },
    
    MARGIN: {
      XS: 4,    // 매우 가까운 요소
      SM: 8,    // 가까운 요소
      MD: 16,   // 기본 간격
      LG: 24,   // 먼 요소
      XL: 32,   // 매우 먼 요소
    },
    
    GAP: {
      XS: 4,    // 매우 가까운 요소들
      SM: 8,    // 가까운 요소들
      MD: 12,   // 기본 간격
      LG: 16,   // 먼 요소들
      XL: 24,   // 매우 먼 요소들
    },
  },
  
  // Layout spacing
  LAYOUT: {
    SCREEN_PADDING: 20,    // 화면 전체 패딩
    SECTION_MARGIN: 24,    // 섹션 간 마진
    CARD_PADDING: 16,      // 카드 내부 패딩
    CARD_MARGIN: 16,       // 카드 간 마진
    HEADER_HEIGHT: 56,     // 헤더 높이
    TAB_BAR_HEIGHT: 60,    // 탭바 높이
    BOTTOM_SAFE_AREA: 34,  // 하단 안전 영역 (iPhone)
  },
  
  // Border radius
  RADIUS: {
    XS: 4,     // 작은 컴포넌트
    SM: 8,     // 작은 컴포넌트
    MD: 12,    // 기본 컴포넌트
    LG: 16,    // 큰 컴포넌트
    XL: 20,    // 매우 큰 컴포넌트
    ROUND: 50, // 원형
  },
  
  // Border width
  BORDER: {
    THIN: 0.5,
    NORMAL: 1,
    THICK: 2,
    THICKER: 3,
  },
  
  // Shadow
  SHADOW: {
    SM: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    MD: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    LG: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    XL: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 12,
    },
  },
  
  // Animation duration
  ANIMATION: {
    FAST: 150,    // 빠른 애니메이션
    NORMAL: 200,  // 기본 애니메이션
    SLOW: 300,    // 느린 애니메이션
    SLOWER: 500,  // 매우 느린 애니메이션
  },
  
  // Z-index
  Z_INDEX: {
    BASE: 0,
    CARD: 1,
    MODAL: 100,
    TOOLTIP: 200,
    OVERLAY: 300,
    DROPDOWN: 400,
    TOAST: 500,
    MODAL_OVERLAY: 1000,
  },
} as const;

// 타입 정의
export type SpacingSize = keyof typeof SPACING;
export type ComponentPadding = keyof typeof SPACING.COMPONENT.PADDING;
export type ComponentMargin = keyof typeof SPACING.COMPONENT.MARGIN;
export type ComponentGap = keyof typeof SPACING.COMPONENT.GAP;
export type RadiusSize = keyof typeof SPACING.RADIUS;
export type BorderWidth = keyof typeof SPACING.BORDER;
export type ShadowSize = keyof typeof SPACING.SHADOW;
export type AnimationDuration = keyof typeof SPACING.ANIMATION;
export type ZIndex = keyof typeof SPACING.Z_INDEX;

// 유틸리티 함수
export const getSpacing = (size: SpacingSize): number => {
  const value = SPACING[size];
  return typeof value === 'number' ? value : 0;
};
export const getComponentPadding = (size: ComponentPadding): number => SPACING.COMPONENT.PADDING[size];
export const getComponentMargin = (size: ComponentMargin): number => SPACING.COMPONENT.MARGIN[size];
export const getComponentGap = (size: ComponentGap): number => SPACING.COMPONENT.GAP[size];
export const getRadius = (size: RadiusSize): number => SPACING.RADIUS[size];
export const getBorderWidth = (size: BorderWidth): number => SPACING.BORDER[size];
export const getShadow = (size: ShadowSize) => SPACING.SHADOW[size];
export const getAnimationDuration = (size: AnimationDuration): number => SPACING.ANIMATION[size];
export const getZIndex = (size: ZIndex): number => SPACING.Z_INDEX[size];

// 계산 함수
export const multiplySpacing = (base: number, multiplier: number): number => base * multiplier;
export const divideSpacing = (base: number, divisor: number): number => base / divisor;

// Legacy support for existing code
export const SIZES = SPACING;
