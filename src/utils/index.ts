import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/constants';

// Storage utilities
export const storage = {
  async get(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error getting data from storage:', error);
      return null;
    }
  },

  async set(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting data to storage:', error);
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data from storage:', error);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

// Date utilities
export const formatDate = (date: Date, format: string = 'YYYY-MM-DD'): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes);
};

export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return '방금 전';
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  if (diffInDays < 7) return `${diffInDays}일 전`;
  
  return formatDate(date, 'MM월 DD일');
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

// String utilities
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

// Number utilities
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10,11}$/;
  return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
};

// Platform utilities
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Color utilities
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Array utilities
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

// Object utilities
export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Alert 유틸리티 함수들
export const showAlert = (title: string, message: string, onConfirm?: () => void) => {
  if (typeof window !== 'undefined') {
    // 웹 환경
    if (onConfirm) {
      const confirmed = window.confirm(`${title}\n${message}`);
      if (confirmed) {
        onConfirm();
      }
    } else {
      window.alert(`${title}\n${message}`);
    }
  } else {
    // 모바일 환경
    const { Alert } = require('react-native');
    if (onConfirm) {
      Alert.alert(title, message, [
        { text: '취소', style: 'cancel' },
        { text: '확인', onPress: onConfirm }
      ]);
    } else {
      Alert.alert(title, message, [{ text: '확인' }]);
    }
  }
};

export const showConfirm = (title: string, message: string, onConfirm: () => void, onCancel?: () => void) => {
  if (typeof window !== 'undefined') {
    // 웹 환경
    const confirmed = window.confirm(`${title}\n${message}`);
    if (confirmed) {
      onConfirm();
    } else if (onCancel) {
      onCancel();
    }
  } else {
    // 모바일 환경
    const { Alert } = require('react-native');
    Alert.alert(title, message, [
      { text: '취소', style: 'cancel', onPress: onCancel },
      { text: '확인', onPress: onConfirm }
    ]);
  }
};

// 간단한 확인 다이얼로그 (확인만 있는 경우)
export const showSimpleConfirm = (message: string, onConfirm: () => void) => {
  if (typeof window !== 'undefined') {
    // 웹 환경
    const confirmed = window.confirm(message);
    if (confirmed) {
      onConfirm();
    }
  } else {
    // 모바일 환경
    const { Alert } = require('react-native');
    Alert.alert('확인', message, [
      { text: '확인', onPress: onConfirm }
    ]);
  }
};

export const showError = (message: string) => {
  showAlert('오류', message);
};

export const showSuccess = (message: string, onConfirm?: () => void) => {
  showAlert('성공', message, onConfirm);
};

export const showWarning = (message: string, onConfirm?: () => void) => {
  showAlert('경고', message, onConfirm);
};
