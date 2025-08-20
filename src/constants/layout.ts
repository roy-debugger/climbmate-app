/**
 * 레이아웃 상수 정의
 * 버튼, 카드, 모달 등의 크기와 스타일을 일관되게 관리
 */

export const LAYOUT = {
  // 버튼 관련
  BUTTON: {
    HEIGHT: {
      SMALL: 36,    // 작은 버튼
      MEDIUM: 44,   // 기본 버튼
      LARGE: 52,    // 큰 버튼
      XLARGE: 60,   // 매우 큰 버튼
    },
    PADDING: {
      SMALL: { vertical: 8, horizontal: 16 },
      MEDIUM: { vertical: 12, horizontal: 20 },
      LARGE: { vertical: 16, horizontal: 24 },
      XLARGE: { vertical: 20, horizontal: 32 },
    },
    BORDER_RADIUS: {
      SMALL: 6,
      MEDIUM: 8,
      LARGE: 12,
      ROUND: 50,
    },
  },

  // 카드 관련
  CARD: {
    BORDER_RADIUS: {
      SMALL: 8,
      MEDIUM: 12,
      LARGE: 16,
      XLARGE: 20,
    },
    PADDING: {
      SMALL: 12,
      MEDIUM: 16,
      LARGE: 20,
      XLARGE: 24,
    },
    MARGIN: {
      SMALL: 8,
      MEDIUM: 12,
      LARGE: 16,
      XLARGE: 20,
    },
  },

  // 입력 필드 관련
  INPUT: {
    HEIGHT: {
      SMALL: 36,
      MEDIUM: 44,
      LARGE: 52,
    },
    PADDING: {
      SMALL: { vertical: 8, horizontal: 12 },
      MEDIUM: { vertical: 12, horizontal: 16 },
      LARGE: { vertical: 16, horizontal: 20 },
    },
    BORDER_RADIUS: {
      SMALL: 6,
      MEDIUM: 8,
      LARGE: 12,
    },
  },

  // 모달 관련
  MODAL: {
    BORDER_RADIUS: {
      SMALL: 12,
      MEDIUM: 16,
      LARGE: 20,
    },
    PADDING: {
      SMALL: 16,
      MEDIUM: 20,
      LARGE: 24,
    },
  },

  // 헤더 관련
  HEADER: {
    HEIGHT: {
      SMALL: 44,
      MEDIUM: 56,
      LARGE: 64,
    },
    PADDING: {
      SMALL: { vertical: 8, horizontal: 16 },
      MEDIUM: { vertical: 12, horizontal: 20 },
      LARGE: { vertical: 16, horizontal: 24 },
    },
  },

  // 탭바 관련
  TAB_BAR: {
    HEIGHT: 60,
    PADDING: { vertical: 8, horizontal: 16 },
    ICON_SIZE: 24,
    LABEL_SIZE: 12,
  },

  // 그림자 관련
  SHADOW: {
    SMALL: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    MEDIUM: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    LARGE: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    XLARGE: {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 12,
    },
  },

  // 애니메이션 관련
  ANIMATION: {
    DURATION: {
      FAST: 150,
      NORMAL: 200,
      SLOW: 300,
      SLOWER: 500,
    },
    EASING: {
      EASE_IN: 'ease-in',
      EASE_OUT: 'ease-out',
      EASE_IN_OUT: 'ease-in-out',
    },
  },

  // Z-Index 관련
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
export type ButtonHeight = keyof typeof LAYOUT.BUTTON.HEIGHT;
export type ButtonPadding = keyof typeof LAYOUT.BUTTON.PADDING;
export type ButtonBorderRadius = keyof typeof LAYOUT.BUTTON.BORDER_RADIUS;
export type CardBorderRadius = keyof typeof LAYOUT.CARD.BORDER_RADIUS;
export type CardPadding = keyof typeof LAYOUT.CARD.PADDING;
export type CardMargin = keyof typeof LAYOUT.CARD.MARGIN;
export type InputHeight = keyof typeof LAYOUT.INPUT.HEIGHT;
export type InputPadding = keyof typeof LAYOUT.INPUT.PADDING;
export type InputBorderRadius = keyof typeof LAYOUT.INPUT.BORDER_RADIUS;
export type ModalBorderRadius = keyof typeof LAYOUT.MODAL.BORDER_RADIUS;
export type ModalPadding = keyof typeof LAYOUT.MODAL.PADDING;
export type HeaderHeight = keyof typeof LAYOUT.HEADER.HEIGHT;
export type HeaderPadding = keyof typeof LAYOUT.HEADER.PADDING;
export type ShadowSize = keyof typeof LAYOUT.SHADOW;
export type AnimationDuration = keyof typeof LAYOUT.ANIMATION.DURATION;
export type AnimationEasing = keyof typeof LAYOUT.ANIMATION.EASING;
export type ZIndex = keyof typeof LAYOUT.Z_INDEX;

// 유틸리티 함수
export const getButtonHeight = (size: ButtonHeight): number => LAYOUT.BUTTON.HEIGHT[size];
export const getButtonPadding = (size: ButtonPadding) => LAYOUT.BUTTON.PADDING[size];
export const getButtonBorderRadius = (size: ButtonBorderRadius): number => LAYOUT.BUTTON.BORDER_RADIUS[size];
export const getCardBorderRadius = (size: CardBorderRadius): number => LAYOUT.CARD.BORDER_RADIUS[size];
export const getCardPadding = (size: CardPadding): number => LAYOUT.CARD.PADDING[size];
export const getCardMargin = (size: CardMargin): number => LAYOUT.CARD.MARGIN[size];
export const getInputHeight = (size: InputHeight): number => LAYOUT.INPUT.HEIGHT[size];
export const getInputPadding = (size: InputPadding) => LAYOUT.INPUT.PADDING[size];
export const getInputBorderRadius = (size: InputBorderRadius): number => LAYOUT.INPUT.BORDER_RADIUS[size];
export const getModalBorderRadius = (size: ModalBorderRadius): number => LAYOUT.MODAL.BORDER_RADIUS[size];
export const getModalPadding = (size: ModalPadding): number => LAYOUT.MODAL.PADDING[size];
export const getHeaderHeight = (size: HeaderHeight): number => LAYOUT.HEADER.HEIGHT[size];
export const getHeaderPadding = (size: HeaderPadding) => LAYOUT.HEADER.PADDING[size];
export const getShadow = (size: ShadowSize) => LAYOUT.SHADOW[size];
export const getAnimationDuration = (size: AnimationDuration): number => LAYOUT.ANIMATION.DURATION[size];
export const getAnimationEasing = (size: AnimationEasing): string => LAYOUT.ANIMATION.EASING[size];
export const getZIndex = (size: ZIndex): number => LAYOUT.Z_INDEX[size];
