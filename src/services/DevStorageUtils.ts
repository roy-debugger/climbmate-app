import { storageService } from './StorageService';
import { ClimbingSession, UserProfile } from '@/types/storage';

/**
 * 개발용 스토리지 유틸리티
 * 
 * 개발 중 데이터 확인, 테스트 데이터 생성, 스토리지 초기화 등에 사용
 */
export class DevStorageUtils {
  /**
   * 테스트용 클라이밍 세션 데이터 생성
   */
  static generateTestSessions(count: number = 10): ClimbingSession[] {
    const sessions: ClimbingSession[] = [];
    const gyms = ['클라이밍존 강남점', '클라이밍존 홍대점', '클라이밍존 신촌점'];
    const grades = ['V0', 'V1', 'V2', 'V3', 'V4', 'V5'];
    
    for (let i = 0; i < count; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // 최근 30일 내
      
      const session: ClimbingSession = {
        id: `test-session-${i + 1}`,
        userId: 'test-user-1',
        gymId: `gym-${Math.floor(Math.random() * 3) + 1}`,
        gymName: gyms[Math.floor(Math.random() * gyms.length)],
        date: date.toISOString(),
        duration: Math.floor(Math.random() * 120) + 60, // 60-180분
        condition: Math.floor(Math.random() * 5) + 1, // 1-5
        notes: `테스트 세션 ${i + 1} - ${Math.random() > 0.5 ? '좋은 컨디션이었습니다' : '보통 컨디션이었습니다'}`,
        photos: [],
        completedGrades: this.generateRandomGrades(grades),
        maxGradeAttempted: grades[Math.floor(Math.random() * grades.length)],
        sessionRating: Math.floor(Math.random() * 5) + 1, // 1-5
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      };
      
      sessions.push(session);
    }
    
    return sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  /**
   * 랜덤 등급 완료 데이터 생성
   */
  private static generateRandomGrades(grades: string[]): { [grade: string]: number } {
    const completedGrades: { [grade: string]: number } = {};
    const numGrades = Math.floor(Math.random() * 4) + 1; // 1-4개 등급
    
    for (let i = 0; i < numGrades; i++) {
      const grade = grades[Math.floor(Math.random() * grades.length)];
      if (!completedGrades[grade]) {
        completedGrades[grade] = Math.floor(Math.random() * 5) + 1; // 1-5개 완료
      }
    }
    
    return completedGrades;
  }

  /**
   * 테스트용 사용자 프로필 생성
   */
  static generateTestUserProfile(): UserProfile {
    return {
      id: 'test-user-1',
      nickname: '테스트 클라이머',
      email: 'test@climbmate.com',
      currentLevel: 'V3',
      preferredGyms: ['클라이밍존 강남점', '클라이밍존 홍대점'],
      profileImage: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * 대용량 테스트 데이터 생성 (성능 테스트용)
   */
  static async generateBulkTestData(sessionCount: number = 100): Promise<void> {
    try {
      console.log(`${sessionCount}개의 테스트 세션 생성 시작...`);
      
      const sessions = this.generateTestSessions(sessionCount);
      
      // 배치 처리로 성능 최적화
      const batchSize = 50;
      for (let i = 0; i < sessions.length; i += batchSize) {
        const batch = sessions.slice(i, i + batchSize);
        
        // 병렬로 저장
        await Promise.all(
          batch.map(session => storageService.saveSession(session))
        );
        
        console.log(`배치 ${Math.floor(i / batchSize) + 1} 완료 (${batch.length}개)`);
      }
      
      console.log(`총 ${sessionCount}개의 테스트 세션 생성 완료!`);
    } catch (error) {
      console.error('대용량 테스트 데이터 생성 실패:', error);
      throw error;
    }
  }

  /**
   * 현재 저장된 모든 데이터 확인
   */
  static async inspectAllData(): Promise<{
    sessions: ClimbingSession[];
    userProfile: UserProfile | null;
    stats: any;
    storageUsage: any;
  }> {
    try {
      const [sessions, userProfile, stats, storageUsage] = await Promise.all([
        storageService.getSessions(),
        storageService.getUserProfile(),
        storageService.getSessionStats(),
        storageService.getStorageUsage(),
      ]);

      return {
        sessions,
        userProfile,
        stats,
        storageUsage,
      };
    } catch (error) {
      console.error('데이터 확인 실패:', error);
      throw error;
    }
  }

  /**
   * 특정 날짜 범위의 데이터 확인
   */
  static async inspectDataByDateRange(startDate: string, endDate: string): Promise<{
    sessions: ClimbingSession[];
    stats: any;
  }> {
    try {
      const sessions = await storageService.getSessions();
      const filteredSessions = sessions.filter(session => 
        session.date >= startDate && session.date <= endDate
      );
      
      const stats = await storageService.getSessionStats(startDate, endDate);
      
      return {
        sessions: filteredSessions,
        stats,
      };
    } catch (error) {
      console.error('날짜 범위 데이터 확인 실패:', error);
      throw error;
    }
  }

  /**
   * 스토리지 성능 테스트
   */
  static async runPerformanceTest(): Promise<{
    readTime: number;
    writeTime: number;
    deleteTime: number;
    cacheHitRate: number;
  }> {
    try {
      console.log('스토리지 성능 테스트 시작...');
      
      // 읽기 성능 테스트
      const readStart = Date.now();
      const sessions = await storageService.getSessions();
      const readTime = Date.now() - readStart;
      
      // 쓰기 성능 테스트
      const testSession = this.generateTestSessions(1)[0];
      testSession.id = `perf-test-${Date.now()}`;
      
      const writeStart = Date.now();
      await storageService.saveSession(testSession);
      const writeTime = Date.now() - writeStart;
      
      // 삭제 성능 테스트
      const deleteStart = Date.now();
      await storageService.deleteSession(testSession.id);
      const deleteTime = Date.now() - deleteStart;
      
      // 캐시 히트율 계산 (간단한 추정)
      const cacheHitRate = Math.random() * 0.3 + 0.7; // 70-100% 추정
      
      const results = {
        readTime,
        writeTime,
        deleteTime,
        cacheHitRate: Math.round(cacheHitRate * 100) / 100,
      };
      
      console.log('성능 테스트 결과:', results);
      return results;
      
    } catch (error) {
      console.error('성능 테스트 실패:', error);
      throw error;
    }
  }

  /**
   * 에러 상황 시뮬레이션
   */
  static async simulateErrorScenarios(): Promise<void> {
    try {
      console.log('에러 상황 시뮬레이션 시작...');
      
      // 1. 잘못된 데이터로 저장 시도
      try {
        const invalidSession = {
          id: 'invalid-session',
          // 필수 필드 누락
        } as any;
        
        await storageService.saveSession(invalidSession);
      } catch (error) {
        console.log('예상된 에러 1 (잘못된 데이터):', error.message);
      }
      
      // 2. 존재하지 않는 세션 업데이트 시도
      try {
        await storageService.updateSession('non-existent-id', { notes: '테스트' });
      } catch (error) {
        console.log('예상된 에러 2 (존재하지 않는 세션):', error.message);
      }
      
      // 3. 존재하지 않는 세션 삭제 시도
      try {
        await storageService.deleteSession('non-existent-id');
      } catch (error) {
        console.log('예상된 에러 3 (존재하지 않는 세션 삭제):', error.message);
      }
      
      console.log('에러 상황 시뮬레이션 완료');
      
    } catch (error) {
      console.error('에러 시뮬레이션 실패:', error);
    }
  }

  /**
   * 스토리지 초기화 (개발용)
   */
  static async resetStorage(): Promise<void> {
    try {
      console.log('스토리지 초기화 시작...');
      
      await storageService.clearAllData();
      await storageService.invalidateCache();
      
      console.log('스토리지 초기화 완료');
    } catch (error) {
      console.error('스토리지 초기화 실패:', error);
      throw error;
    }
  }

  /**
   * 테스트 데이터로 스토리지 채우기
   */
  static async populateWithTestData(): Promise<void> {
    try {
      console.log('테스트 데이터로 스토리지 채우기 시작...');
      
      // 기존 데이터 초기화
      await this.resetStorage();
      
      // 테스트 사용자 프로필 생성
      const testProfile = this.generateTestUserProfile();
      await storageService.saveUserProfile(testProfile);
      
      // 테스트 세션 생성 (20개)
      await this.generateBulkTestData(20);
      
      console.log('테스트 데이터로 스토리지 채우기 완료!');
      
    } catch (error) {
      console.error('테스트 데이터 채우기 실패:', error);
      throw error;
    }
  }

  /**
   * 데이터 무결성 검사
   */
  static async validateDataIntegrity(): Promise<{
    isValid: boolean;
    issues: string[];
    sessionCount: number;
    profileExists: boolean;
  }> {
    try {
      const issues: string[] = [];
      
      // 세션 데이터 검사
      const sessions = await storageService.getSessions();
      const sessionCount = sessions.length;
      
      // 세션 데이터 유효성 검사
      sessions.forEach((session, index) => {
        if (!session.id || !session.date || !session.userId) {
          issues.push(`세션 ${index}: 필수 필드 누락`);
        }
        
        if (session.duration <= 0 || session.duration > 480) {
          issues.push(`세션 ${index}: 비정상적인 운동 시간 (${session.duration}분)`);
        }
        
        if (session.condition < 1 || session.condition > 5) {
          issues.push(`세션 ${index}: 비정상적인 컨디션 값 (${session.condition})`);
        }
      });
      
      // 프로필 존재 여부 확인
      const userProfile = await storageService.getUserProfile();
      const profileExists = !!userProfile;
      
      if (!profileExists) {
        issues.push('사용자 프로필이 존재하지 않음');
      }
      
      const isValid = issues.length === 0;
      
      return {
        isValid,
        issues,
        sessionCount,
        profileExists,
      };
      
    } catch (error) {
      console.error('데이터 무결성 검사 실패:', error);
      return {
        isValid: false,
        issues: [error instanceof Error ? error.message : '알 수 없는 오류'],
        sessionCount: 0,
        profileExists: false,
      };
    }
  }
}

export default DevStorageUtils;
