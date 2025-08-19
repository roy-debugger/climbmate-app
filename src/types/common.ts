/**
 * 공통 컴포넌트 타입 정의
 * 재사용 가능한 공통 타입들
 */

import { ReactNode } from 'react';
import { ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';

// 기본 컴포넌트 Props
export interface BaseComponentProps {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  testID?: string;
}

// 버튼 관련 타입
export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends BaseComponentProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// 입력 필드 관련 타입
export type InputType = 'text' | 'email' | 'password' | 'number' | 'phone';
export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps extends BaseComponentProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: InputType;
  size?: InputSize;
  secureTextEntry?: boolean;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  editable?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onSubmitEditing?: () => void;
}

// 로딩 스피너 관련 타입
export type SpinnerSize = 'small' | 'medium' | 'large' | 'xlarge';
export type SpinnerColor = 'primary' | 'secondary' | 'white' | 'gray';

export interface LoadingSpinnerProps extends BaseComponentProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  overlay?: boolean;
  text?: string;
}

// 카드 관련 타입
export type CardShadow = 'none' | 'small' | 'medium' | 'large' | 'xlarge';
export type CardPadding = 'none' | 'small' | 'medium' | 'large' | 'xlarge';

export interface CardProps extends BaseComponentProps {
  padding?: CardPadding;
  margin?: CardPadding;
  shadow?: CardShadow;
  borderRadius?: 'none' | 'small' | 'medium' | 'large' | 'round';
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  elevation?: number;
}

// 헤더 관련 타입
export interface HeaderProps extends BaseComponentProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: ReactNode;
  onBackPress?: () => void;
  backgroundColor?: string;
  titleColor?: string;
  showBorder?: boolean;
  transparent?: boolean;
}

// 아이콘 관련 타입
export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
}

// 이미지 관련 타입
export interface ImageProps {
  source: ImageSourcePropType;
  width?: number | string;
  height?: number | string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  borderRadius?: number;
  style?: ViewStyle;
}

// 모달 관련 타입
export interface ModalProps extends BaseComponentProps {
  visible: boolean;
  onClose: () => void;
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
  presentationStyle?: 'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen';
  closeOnBackdropPress?: boolean;
  closeOnBackButtonPress?: boolean;
}

// 토스트 관련 타입
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom' | 'center';

export interface ToastProps {
  message: string;
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
  onClose?: () => void;
}

// 애니메이션 관련 타입
export interface AnimationConfig {
  duration: number;
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
  delay?: number;
  useNativeDriver?: boolean;
}

// 테마 관련 타입
export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
}

// 유틸리티 타입
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 이벤트 핸들러 타입
export type PressHandler = () => void;
export type ChangeHandler<T> = (value: T) => void;
export type FocusHandler = () => void;
export type BlurHandler = () => void;
export type SubmitHandler = () => void;

// 스타일 관련 타입
export type StyleProp<T> = T | T[] | undefined;
export type ViewStyleProp = StyleProp<ViewStyle>;
export type TextStyleProp = StyleProp<TextStyle>;

// 크기 관련 타입
export type Dimension = number | string;
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type AlignSelf = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
