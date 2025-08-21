/**
 * 상수 모음 인덱스 파일
 * 모든 상수를 한 곳에서 import할 수 있도록 함
 */

// 색상 관련
export { COLORS } from './colors';

// 타이포그래피 관련
export { FONTS, TEXT_STYLES } from './typography';

// 간격 관련
export { SPACING } from './spacing';

// 크기 관련
export const SIZES = {
  // 기본 크기
  base: 16,
  padding: 16,
  margin: 16,
  radius: 8,
  
  // 버튼 크기
  buttonHeight: 44,
  buttonPadding: 16,
  buttonRadius: 8,
  
  // 입력 필드 크기
  inputHeight: 44,
  inputPadding: 16,
  inputRadius: 8,
  
  // 카드 크기
  cardPadding: 16,
  cardMargin: 16,
  cardRadius: 12,
  
  // 헤더 크기
  headerHeight: 56,
  headerPadding: 16,
  
  // 아이콘 크기
  iconSmall: 16,
  iconMedium: 24,
  iconLarge: 32,
  
  // 아바타 크기
  avatarSmall: 32,
  avatarMedium: 48,
  avatarLarge: 64,
} as const;

// 레이아웃 관련 상수들
export const LAYOUT = {
  BUTTON: {
    HEIGHT: {
      SMALL: 36,
      MEDIUM: 44,
      LARGE: 52,
    },
    PADDING: 16,
    BORDER_RADIUS: {
      SMALL: 6,
      MEDIUM: 8,
      LARGE: 12,
    },
  },
  CARD: {
    PADDING: {
      SMALL: 12,
      MEDIUM: 16,
      LARGE: 20,
    },
    MARGIN: {
      SMALL: 8,
      MEDIUM: 12,
      LARGE: 16,
    },
    BORDER_RADIUS: {
      SMALL: 8,
      MEDIUM: 12,
      LARGE: 16,
    },
  },
  INPUT: {
    HEIGHT: 44,
    PADDING: 16,
    BORDER_RADIUS: 8,
  },
  MODAL: {
    BORDER_RADIUS: 16,
    PADDING: 20,
  },
  HEADER: {
    HEIGHT: 56,
    PADDING: 16,
  },
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
  },
  ANIMATION: {
    DURATION: {
      FAST: 200,
      NORMAL: 300,
      SLOW: 500,
    },
    EASING: {
      LINEAR: 'linear',
      EASE_IN: 'ease-in',
      EASE_OUT: 'ease-out',
      EASE_IN_OUT: 'ease-in-out',
    },
  },
  Z_INDEX: {
    BASE: 0,
    CARD: 1,
    MODAL: 1000,
    TOOLTIP: 1100,
    TOAST: 1200,
  },
} as const;

// 테마 관련
export { FONTS as THEME_FONTS } from './typography';

// 스토리지 관련
export { STORAGE_KEYS, STORAGE_CONFIG, STORAGE_ERRORS, MIGRATION_VERSIONS } from './storage';

// 개발 모드 관련
export { DEV_CONFIG, isDevMode, setDevMode, enableProductionMode } from './dev';

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.climbmate.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'ClimbMate',
  VERSION: '1.0.0',
  BUILD_NUMBER: '1',
};

// Climbing Grades
export const CLIMBING_GRADES = {
  BOULDER: [
    'VB', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17'
  ],
  SPORT: [
    '5.5', '5.6', '5.7', '5.8', '5.9', '5.10a', '5.10b', '5.10c', '5.10d',
    '5.11a', '5.11b', '5.11c', '5.11d', '5.12a', '5.12b', '5.12c', '5.12d',
    '5.13a', '5.13b', '5.13c', '5.13d', '5.14a', '5.14b', '5.14c', '5.14d',
    '5.15a', '5.15b', '5.15c', '5.15d'
  ],
  TRAD: [
    '5.0', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9',
    '5.10a', '5.10b', '5.10c', '5.10d', '5.11a', '5.11b', '5.11c', '5.11d',
    '5.12a', '5.12b', '5.12c', '5.12d', '5.13a', '5.13b', '5.13c', '5.13d'
  ]
};

// Route Types
export const ROUTE_TYPES = [
  { label: 'Boulder', value: 'boulder' },
  { label: 'Sport', value: 'sport' },
  { label: 'Trad', value: 'trad' },
  { label: 'Top Rope', value: 'toprope' },
];

// Climbing Levels
export const CLIMBING_LEVELS = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Expert', value: 'expert' },
];

// Session Duration Options (in minutes)
export const SESSION_DURATIONS = [
  { label: '30 min', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '1.5 hours', value: 90 },
  { label: '2 hours', value: 120 },
  { label: '2.5 hours', value: 150 },
  { label: '3 hours', value: 180 },
  { label: '3.5 hours', value: 210 },
  { label: '4 hours', value: 240 },
];

// Gym Facilities
export const GYM_FACILITIES = [
  'Bouldering',
  'Sport Climbing',
  'Trad Climbing',
  'Top Rope',
  'Auto Belay',
  'Training Area',
  'Fitness Equipment',
  'Yoga Studio',
  'Café',
  'Pro Shop',
  'Locker Rooms',
  'Showers',
  'Parking',
  'WiFi',
  'Child Care',
];

// Notification Types
export const NOTIFICATION_TYPES = {
  SESSION_REMINDER: 'session_reminder',
  ACHIEVEMENT: 'achievement',
  GYM_UPDATE: 'gym_update',
  FRIEND_ACTIVITY: 'friend_activity',
  SYSTEM: 'system',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청한 정보를 찾을 수 없습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  VALIDATION_ERROR: '입력 정보를 확인해주세요.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  SESSION_SAVED: '클라이밍 세션이 저장되었습니다.',
  PROFILE_UPDATED: '프로필이 업데이트되었습니다.',
  SETTINGS_SAVED: '설정이 저장되었습니다.',
  LOGIN_SUCCESS: '로그인되었습니다.',
  LOGOUT_SUCCESS: '로그아웃되었습니다.',
  REGISTER_SUCCESS: '회원가입이 완료되었습니다.',
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'YYYY년 MM월 DD일',
  INPUT: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  DATETIME: 'YYYY-MM-DD HH:mm',
  RELATIVE: 'relative',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

// Image Configuration
export const IMAGE_CONFIG = {
  MAX_WIDTH: 1920,
  MAX_HEIGHT: 1080,
  QUALITY: 0.8,
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
};

// Location Configuration
export const LOCATION_CONFIG = {
  DEFAULT_RADIUS: 5000, // 5km
  MAX_RADIUS: 50000, // 50km
  UPDATE_INTERVAL: 30000, // 30 seconds
  ACCURACY: 10, // 10 meters
};
