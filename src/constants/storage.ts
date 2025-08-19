/**
 * 스토리지 관련 상수 정의
 */

export const STORAGE_KEYS = {
  SESSIONS: '@climbmate_sessions',
  USER_PROFILE: '@climbmate_user_profile',
  APP_VERSION: '@climbmate_app_version',
  LAST_BACKUP: '@climbmate_last_backup',
  CACHE: '@climbmate_cache',
  MIGRATION_VERSION: '@climbmate_migration_version',
};

export const STORAGE_CONFIG = {
  MAX_SESSIONS: 1000, // 최대 저장 세션 수
  BACKUP_INTERVAL: 7, // 7일마다 자동 백업
  CACHE_DURATION: 300000, // 5분 캐시
  BATCH_SIZE: 50, // 배치 처리 크기
  MAX_RETRY_ATTEMPTS: 3, // 최대 재시도 횟수
};

export const STORAGE_ERRORS = {
  QUOTA_EXCEEDED: 'STORAGE_QUOTA_EXCEEDED',
  INVALID_DATA: 'STORAGE_INVALID_DATA',
  MIGRATION_FAILED: 'STORAGE_MIGRATION_FAILED',
  BACKUP_FAILED: 'STORAGE_BACKUP_FAILED',
  NETWORK_ERROR: 'STORAGE_NETWORK_ERROR',
};

export const MIGRATION_VERSIONS = {
  CURRENT: '1.0.0',
  LEGACY: '0.9.0',
};
