/**
 * 공통 컴포넌트 인덱스 파일
 * 모든 공통 컴포넌트를 한 곳에서 import할 수 있도록 함
 */

export { default as CustomButton } from './CustomButton';
export { default as CustomInput } from './CustomInput';
export { default as LoadingSpinner } from './LoadingSpinner';
export { default as Card } from './Card';
export { default as Header } from './Header';

// 타입들도 함께 export
export type {
  ButtonProps,
  InputProps,
  LoadingSpinnerProps,
  CardProps,
  HeaderProps,
} from '@/types/common';
