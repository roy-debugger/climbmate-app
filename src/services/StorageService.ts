import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import {
  ClimbingSession,
  UserProfile,
  SessionStats,
  StorageCache,
  SessionUpdate,
  ProfileUpdate,
  MigrationResult,
  BackupData,
} from '@/types/storage';
import {
  STORAGE_KEYS,
  STORAGE_CONFIG,
  STORAGE_ERRORS,
  MIGRATION_VERSIONS,
} from '@/constants/storage';

/**
 * AsyncStorage 기반 로컬 데이터 저장 서비스
 * 
 * 완전한 CRUD 작업, 통계 조회, 데이터 마이그레이션, 백업/복원 기능 제공
 * 오프라인 환경에서도 안정적으로 동작
 */
class StorageService {
  private cache: StorageCache = {
    sessions: { data: [], timestamp: 0, expiresAt: 0 },
    userProfile: { data: null, timestamp: 0, expiresAt: 0 },
    stats: { data: null, timestamp: 0, expiresAt: 0 },
  };

  private isInitialized = false;

  constructor() {
    this.initializeService();
  }

  /**
   * 서비스 초기화
   */
  private async initializeService(): Promise<void> {
    try {
      await this.checkMigration();
      await this.loadCache();
      this.isInitialized = true;
    } catch (error) {
      console.error('StorageService 초기화 실패:', error);
      throw new Error('스토리지 서비스를 초기화할 수 없습니다.');
    }
  }

  /**
   * 데이터 마이그레이션 체크 및 실행
   */
  private async checkMigration(): Promise<void> {
    try {
      const currentVersion = await this.getMigrationVersion();
      if (currentVersion !== MIGRATION_VERSIONS.CURRENT) {
        await this.migrateData(currentVersion);
      }
    } catch (error) {
      console.error('마이그레이션 체크 실패:', error);
    }
  }

  /**
   * 마이그레이션 버전 가져오기
   */
  private async getMigrationVersion(): Promise<string> {
    try {
      const version = await AsyncStorage.getItem(STORAGE_KEYS.MIGRATION_VERSION);
      return version || MIGRATION_VERSIONS.LEGACY;
    } catch {
      return MIGRATION_VERSIONS.LEGACY;
    }
  }

  /**
   * 데이터 마이그레이션 실행
   */
  private async migrateData(fromVersion: string): Promise<MigrationResult> {
    try {
      console.log(`데이터 마이그레이션 시작: ${fromVersion} → ${MIGRATION_VERSIONS.CURRENT}`);
      
      // 여기에 실제 마이그레이션 로직 구현
      // 현재는 버전만 업데이트
      
      await AsyncStorage.setItem(STORAGE_KEYS.MIGRATION_VERSION, MIGRATION_VERSIONS.CURRENT);
      
      return {
        success: true,
        migratedRecords: 0,
        errors: [],
        version: MIGRATION_VERSIONS.CURRENT,
      };
    } catch (error) {
      console.error('마이그레이션 실패:', error);
      return {
        success: false,
        migratedRecords: 0,
        errors: [error instanceof Error ? error.message : '알 수 없는 오류'],
        version: fromVersion,
      };
    }
  }

  /**
   * 캐시 로드
   */
  private async loadCache(): Promise<void> {
    try {
      const cacheData = await AsyncStorage.getItem(STORAGE_KEYS.CACHE);
      if (cacheData) {
        this.cache = JSON.parse(cacheData);
      }
    } catch (error) {
      console.error('캐시 로드 실패:', error);
    }
  }

  /**
   * 캐시 저장
   */
  private async saveCache(): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CACHE, JSON.stringify(this.cache));
    } catch (error) {
      console.error('캐시 저장 실패:', error);
    }
  }

  /**
   * 캐시 유효성 검사
   */
  private isCacheValid(cacheKey: keyof StorageCache): boolean {
    const cache = this.cache[cacheKey];
    return cache && Date.now() < cache.expiresAt;
  }

  /**
   * 캐시 업데이트
   */
  private updateCache<T>(cacheKey: keyof StorageCache, data: T): void {
    this.cache[cacheKey] = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + STORAGE_CONFIG.CACHE_DURATION,
    };
    this.saveCache();
  }

  // ==================== 세션 관리 ====================

  /**
   * 세션 저장
   */
  async saveSession(session: ClimbingSession): Promise<void> {
    try {
      if (!this.isInitialized) {
        await this.initializeService();
      }

      const sessions = await this.getSessions();
      
      // 중복 체크
      const existingIndex = sessions.findIndex(s => s.id === session.id);
      if (existingIndex >= 0) {
        sessions[existingIndex] = { ...session, updatedAt: new Date().toISOString() };
      } else {
        sessions.push({ ...session, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      }

      // 최대 세션 수 제한
      if (sessions.length > STORAGE_CONFIG.MAX_SESSIONS) {
        sessions.splice(0, sessions.length - STORAGE_CONFIG.MAX_SESSIONS);
      }

      await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
      this.updateCache('sessions', sessions);
      
      // 통계 캐시 무효화
      this.cache.stats.expiresAt = 0;
    } catch (error) {
      console.error('세션 저장 실패:', error);
      throw new Error('세션을 저장할 수 없습니다.');
    }
  }

  /**
   * 모든 세션 조회
   */
  async getSessions(): Promise<ClimbingSession[]> {
    try {
      if (!this.isInitialized) {
        await this.initializeService();
      }

      // 캐시 확인
      if (this.isCacheValid('sessions')) {
        return this.cache.sessions.data;
      }

      const sessionsData = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
      const sessions = sessionsData ? JSON.parse(sessionsData) : [];
      
      this.updateCache('sessions', sessions);
      return sessions;
    } catch (error) {
      console.error('세션 조회 실패:', error);
      return [];
    }
  }

  /**
   * 월별 세션 조회
   */
  async getSessionsByMonth(year: number, month: number): Promise<ClimbingSession[]> {
    try {
      const sessions = await this.getSessions();
      const startDate = new Date(year, month - 1, 1).toISOString();
      const endDate = new Date(year, month, 0).toISOString();
      
      return sessions.filter(session => 
        session.date >= startDate && session.date <= endDate
      );
    } catch (error) {
      console.error('월별 세션 조회 실패:', error);
      return [];
    }
  }

  /**
   * 날짜별 세션 조회
   */
  async getSessionByDate(date: string): Promise<ClimbingSession | null> {
    try {
      const sessions = await this.getSessions();
      const targetDate = new Date(date).toISOString().split('T')[0];
      
      return sessions.find(session => 
        session.date.startsWith(targetDate)
      ) || null;
    } catch (error) {
      console.error('날짜별 세션 조회 실패:', error);
      return null;
    }
  }

  /**
   * 세션 업데이트
   */
  async updateSession(sessionId: string, updates: SessionUpdate): Promise<void> {
    try {
      const sessions = await this.getSessions();
      const sessionIndex = sessions.findIndex(s => s.id === sessionId);
      
      if (sessionIndex === -1) {
        throw new Error('세션을 찾을 수 없습니다.');
      }

      sessions[sessionIndex] = {
        ...sessions[sessionIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
      this.updateCache('sessions', sessions);
      this.cache.stats.expiresAt = 0; // 통계 캐시 무효화
    } catch (error) {
      console.error('세션 업데이트 실패:', error);
      throw new Error('세션을 업데이트할 수 없습니다.');
    }
  }

  /**
   * 세션 삭제
   */
  async deleteSession(sessionId: string): Promise<void> {
    try {
      const sessions = await this.getSessions();
      const filteredSessions = sessions.filter(s => s.id !== sessionId);
      
      await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(filteredSessions));
      this.updateCache('sessions', filteredSessions);
      this.cache.stats.expiresAt = 0; // 통계 캐시 무효화
    } catch (error) {
      console.error('세션 삭제 실패:', error);
      throw new Error('세션을 삭제할 수 없습니다.');
    }
  }

  // ==================== 통계 조회 ====================

  /**
   * 세션 통계 조회
   */
  async getSessionStats(startDate?: string, endDate?: string): Promise<SessionStats> {
    try {
      // 캐시 확인
      if (this.isCacheValid('stats')) {
        return this.cache.stats.data!;
      }

      const sessions = await this.getSessions();
      let filteredSessions = sessions;

      // 날짜 필터링
      if (startDate && endDate) {
        filteredSessions = sessions.filter(session => 
          session.date >= startDate && session.date <= endDate
        );
      }

      const stats = this.calculateSessionStats(filteredSessions);
      this.updateCache('stats', stats);
      
      return stats;
    } catch (error) {
      console.error('통계 조회 실패:', error);
      return this.getEmptyStats();
    }
  }

  /**
   * 통계 계산
   */
  private calculateSessionStats(sessions: ClimbingSession[]): SessionStats {
    if (sessions.length === 0) {
      return this.getEmptyStats();
    }

    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    const averageDuration = totalDuration / totalSessions;
    
    const totalWorkoutDays = new Set(sessions.map(s => s.date.split('T')[0])).size;
    const currentStreak = this.calculateCurrentStreak(sessions);
    const longestStreak = this.calculateLongestStreak(sessions);
    
    const averageCondition = sessions.reduce((sum, s) => sum + s.condition, 0) / totalSessions;
    const averageRating = sessions.reduce((sum, s) => sum + s.sessionRating, 0) / totalSessions;

    // 등급 분포 계산
    const gradeDistribution: { [grade: string]: number } = {};
    sessions.forEach(session => {
      Object.entries(session.completedGrades).forEach(([grade, count]) => {
        gradeDistribution[grade] = (gradeDistribution[grade] || 0) + count;
      });
    });

    // 월별 진행상황 계산
    const monthlyProgress: { [month: string]: any } = {};
    sessions.forEach(session => {
      const month = session.date.substring(0, 7); // YYYY-MM
      if (!monthlyProgress[month]) {
        monthlyProgress[month] = { sessions: 0, duration: 0, condition: 0 };
      }
      monthlyProgress[month].sessions++;
      monthlyProgress[month].duration += session.duration;
      monthlyProgress[month].condition += session.condition;
    });

    // 월별 평균 계산
    Object.keys(monthlyProgress).forEach(month => {
      monthlyProgress[month].condition /= monthlyProgress[month].sessions;
    });

    return {
      totalSessions,
      totalDuration,
      averageDuration: Math.round(averageDuration * 100) / 100,
      totalWorkoutDays,
      currentStreak,
      longestStreak,
      averageCondition: Math.round(averageCondition * 100) / 100,
      averageRating: Math.round(averageRating * 100) / 100,
      gradeDistribution,
      monthlyProgress,
    };
  }

  /**
   * 빈 통계 반환
   */
  private getEmptyStats(): SessionStats {
    return {
      totalSessions: 0,
      totalDuration: 0,
      averageDuration: 0,
      totalWorkoutDays: 0,
      currentStreak: 0,
      longestStreak: 0,
      averageCondition: 0,
      averageRating: 0,
      gradeDistribution: {},
      monthlyProgress: {},
    };
  }

  /**
   * 현재 연속 운동 일수 계산
   */
  private calculateCurrentStreak(sessions: ClimbingSession[]): number {
    if (sessions.length === 0) return 0;

    const sortedSessions = sessions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(s => s.date.split('T')[0]);

    const today = new Date().toISOString().split('T')[0];
    let streak = 0;
    let currentDate = new Date(today);

    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (sortedSessions.includes(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  /**
   * 최장 연속 운동 일수 계산
   */
  private calculateLongestStreak(sessions: ClimbingSession[]): number {
    if (sessions.length === 0) return 0;

    const sortedSessions = sessions
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(s => s.date.split('T')[0]);

    let maxStreak = 0;
    let currentStreak = 0;
    let lastDate: string | null = null;

    for (const dateStr of sortedSessions) {
      if (lastDate) {
        const last = new Date(lastDate);
        const current = new Date(dateStr);
        const diffDays = Math.floor((current.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak++;
        } else {
          maxStreak = Math.max(maxStreak, currentStreak);
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }
      lastDate = dateStr;
    }

    return Math.max(maxStreak, currentStreak);
  }

  /**
   * 총 운동 일수 조회
   */
  async getTotalWorkoutDays(): Promise<number> {
    try {
      const stats = await this.getSessionStats();
      return stats.totalWorkoutDays;
    } catch (error) {
      console.error('총 운동 일수 조회 실패:', error);
      return 0;
    }
  }

  /**
   * 현재 연속 운동 일수 조회
   */
  async getCurrentStreak(): Promise<number> {
    try {
      const stats = await this.getSessionStats();
      return stats.currentStreak;
    } catch (error) {
      console.error('현재 연속 운동 일수 조회 실패:', error);
      return 0;
    }
  }

  // ==================== 사용자 프로필 ====================

  /**
   * 사용자 프로필 저장
   */
  async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      if (!this.isInitialized) {
        await this.initializeService();
      }

      const updatedProfile = {
        ...profile,
        createdAt: profile.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedProfile));
      this.updateCache('userProfile', updatedProfile);
    } catch (error) {
      console.error('사용자 프로필 저장 실패:', error);
      throw new Error('사용자 프로필을 저장할 수 없습니다.');
    }
  }

  /**
   * 사용자 프로필 조회
   */
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      if (!this.isInitialized) {
        await this.initializeService();
      }

      // 캐시 확인
      if (this.isCacheValid('userProfile')) {
        return this.cache.userProfile.data;
      }

      const profileData = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      const profile = profileData ? JSON.parse(profileData) : null;
      
      this.updateCache('userProfile', profile);
      return profile;
    } catch (error) {
      console.error('사용자 프로필 조회 실패:', error);
      return null;
    }
  }

  /**
   * 사용자 프로필 업데이트
   */
  async updateUserProfile(updates: ProfileUpdate): Promise<void> {
    try {
      const currentProfile = await this.getUserProfile();
      if (!currentProfile) {
        throw new Error('사용자 프로필이 존재하지 않습니다.');
      }

      const updatedProfile = {
        ...currentProfile,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedProfile));
      this.updateCache('userProfile', updatedProfile);
    } catch (error) {
      console.error('사용자 프로필 업데이트 실패:', error);
      throw new Error('사용자 프로필을 업데이트할 수 없습니다.');
    }
  }

  // ==================== 데이터 백업/복원 ====================

  /**
   * 데이터 내보내기 (JSON)
   */
  async exportData(): Promise<string> {
    try {
      const sessions = await this.getSessions();
      const userProfile = await this.getUserProfile();
      
      const backupData: BackupData = {
        version: MIGRATION_VERSIONS.CURRENT,
        timestamp: new Date().toISOString(),
        sessions,
        userProfile,
        metadata: {
          totalSessions: sessions.length,
          totalSize: JSON.stringify(sessions).length,
          checksum: this.generateChecksum(sessions),
        },
      };

      return JSON.stringify(backupData, null, 2);
    } catch (error) {
      console.error('데이터 내보내기 실패:', error);
      throw new Error('데이터를 내보낼 수 없습니다.');
    }
  }

  /**
   * 데이터 가져오기 (JSON)
   */
  async importData(jsonData: string): Promise<void> {
    try {
      const backupData: BackupData = JSON.parse(jsonData);
      
      // 데이터 유효성 검사
      if (!this.validateBackupData(backupData)) {
        throw new Error('잘못된 백업 데이터 형식입니다.');
      }

      // 기존 데이터 백업
      const existingBackup = await this.exportData();
      await AsyncStorage.setItem(`${STORAGE_KEYS.LAST_BACKUP}_${Date.now()}`, existingBackup);

      // 새 데이터로 교체
      if (backupData.sessions) {
        await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(backupData.sessions));
        this.updateCache('sessions', backupData.sessions);
      }

      if (backupData.userProfile) {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(backupData.userProfile));
        this.updateCache('userProfile', backupData.userProfile);
      }

      // 캐시 무효화
      this.cache.stats.expiresAt = 0;
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
      throw new Error('데이터를 가져올 수 없습니다.');
    }
  }

  /**
   * 모든 데이터 삭제
   */
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.SESSIONS,
        STORAGE_KEYS.USER_PROFILE,
        STORAGE_KEYS.CACHE,
      ]);

      // 캐시 초기화
      this.cache = {
        sessions: { data: [], timestamp: 0, expiresAt: 0 },
        userProfile: { data: null, timestamp: 0, expiresAt: 0 },
        stats: { data: null, timestamp: 0, expiresAt: 0 },
      };

      await this.saveCache();
    } catch (error) {
      console.error('데이터 삭제 실패:', error);
      throw new Error('데이터를 삭제할 수 없습니다.');
    }
  }

  /**
   * 백업 데이터 유효성 검사
   */
  private validateBackupData(data: any): data is BackupData {
    return (
      data &&
      typeof data.version === 'string' &&
      typeof data.timestamp === 'string' &&
      Array.isArray(data.sessions) &&
      (data.userProfile === null || typeof data.userProfile === 'object')
    );
  }

  /**
   * 체크섬 생성
   */
  private generateChecksum(data: any[]): string {
    const dataStr = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < dataStr.length; i++) {
      const char = dataStr.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32bit 정수로 변환
    }
    return hash.toString();
  }

  // ==================== 유틸리티 메서드 ====================

  /**
   * 스토리지 사용량 확인
   */
  async getStorageUsage(): Promise<{ used: number; available: number }> {
    try {
      if (Platform.OS === 'web') {
        // 웹에서는 localStorage 사용량을 정확히 측정할 수 없음
        return { used: 0, available: 0 };
      }

      // React Native에서는 AsyncStorage.getAllKeys()로 키 개수 확인
      const keys = await AsyncStorage.getAllKeys();
      const keyCount = keys.length;
      
      // 대략적인 사용량 추정 (키당 평균 1KB 가정)
      const estimatedUsed = keyCount * 1024;
      
      return {
        used: estimatedUsed,
        available: 50 * 1024 * 1024, // 50MB 가정
      };
    } catch (error) {
      console.error('스토리지 사용량 확인 실패:', error);
      return { used: 0, available: 0 };
    }
  }

  /**
   * 캐시 무효화
   */
  async invalidateCache(): Promise<void> {
    this.cache.sessions.expiresAt = 0;
    this.cache.userProfile.expiresAt = 0;
    this.cache.stats.expiresAt = 0;
    await this.saveCache();
  }

  /**
   * 서비스 상태 확인
   */
  isReady(): boolean {
    return this.isInitialized;
  }
}

// 싱글톤 인스턴스 생성
export const storageService = new StorageService();
export default storageService;
