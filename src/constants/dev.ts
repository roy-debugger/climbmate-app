/**
 * 개발 모드 설정 상수
 * 개발 편의를 위한 임시 설정들을 관리
 */

export const DEV_CONFIG = {
  // 🚧 개발 모드 활성화/비활성화
  DEV_MODE: true, // 개발 완료 후 false로 변경
  
  // 🚧 개발 편의 기능들
  SKIP_AUTH: true,        // 인증 체크 우회
  SKIP_SPLASH: true,      // 스플래시 화면 우회
  SKIP_ONBOARDING: true,  // 온보딩 화면 우회
  
  // 🚧 개발 도구
  SHOW_DEBUG_INFO: true,  // 디버그 정보 표시
  ENABLE_TEST_SCREENS: true, // 테스트 화면 활성화
  
  // 📱 원래 플로우 복원 시 사용할 설정
  PRODUCTION_CONFIG: {
    DEV_MODE: false,
    SKIP_AUTH: false,
    SKIP_SPLASH: false,
    SKIP_ONBOARDING: false,
    SHOW_DEBUG_INFO: false,
    ENABLE_TEST_SCREENS: false,
  },
} as const;

// 개발 모드 확인 함수
export const isDevMode = (): boolean => DEV_CONFIG.DEV_MODE;

// 개발 모드 설정 변경 함수
export const setDevMode = (enabled: boolean): void => {
  // 실제로는 이 함수를 통해 동적으로 설정을 변경할 수 있음
  console.log(`🚧 개발 모드 ${enabled ? '활성화' : '비활성화'}`);
};

// 프로덕션 모드로 전환하는 함수
export const enableProductionMode = (): void => {
  console.log('🚀 프로덕션 모드로 전환');
  // 실제 구현에서는 DEV_CONFIG를 업데이트하는 로직 추가
};
