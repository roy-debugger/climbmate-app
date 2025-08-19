/**
 * 스토리지 데이터 모델 타입 정의
 */

export interface ClimbingSession {
  id: string;
  userId: string;
  gymId: string;
  gymName: string;
  date: string; // ISO string
  duration: number; // 분 단위
  condition: number; // 1-5
  notes: string;
  photos: string[]; // 로컬 파일 경로
  completedGrades: {
    [grade: string]: number; // 'V0': 3, 'V1': 2
  };
  maxGradeAttempted: string;
  sessionRating: number; // 1-5
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  nickname: string;
  email: string;
  currentLevel: string;
  preferredGyms: string[];
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionStats {
  totalSessions: number;
  totalDuration: number; // 분 단위
  averageDuration: number;
  totalWorkoutDays: number;
  currentStreak: number;
  longestStreak: number;
  averageCondition: number;
  averageRating: number;
  gradeDistribution: {
    [grade: string]: number;
  };
  monthlyProgress: {
    [month: string]: {
      sessions: number;
      duration: number;
      averageCondition: number;
    };
  };
}

export interface StorageCache {
  sessions: {
    data: ClimbingSession[];
    timestamp: number;
    expiresAt: number;
  };
  userProfile: {
    data: UserProfile | null;
    timestamp: number;
    expiresAt: number;
  };
  stats: {
    data: SessionStats | null;
    timestamp: number;
    expiresAt: number;
  };
}

export interface MigrationResult {
  success: boolean;
  migratedRecords: number;
  errors: string[];
  version: string;
}

export interface BackupData {
  version: string;
  timestamp: string;
  sessions: ClimbingSession[];
  userProfile: UserProfile | null;
  metadata: {
    totalSessions: number;
    totalSize: number;
    checksum: string;
  };
}

// 유틸리티 타입들
export type SessionUpdate = Partial<Omit<ClimbingSession, 'id' | 'createdAt'>>;
export type ProfileUpdate = Partial<Omit<UserProfile, 'id' | 'createdAt'>>;

export type StorageKey = keyof typeof import('@/constants/storage').STORAGE_KEYS;
export type StorageError = keyof typeof import('@/constants/storage').STORAGE_ERRORS;
