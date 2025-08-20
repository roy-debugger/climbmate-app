import { ClimbingSession, MonthlyStats } from '../types/common';

/**
 * 클라이밍 세션 더미 데이터 서비스
 * 실제 데이터 연동 전까지 사용
 */

// 더미 세션 데이터
const DUMMY_SESSIONS: ClimbingSession[] = [
  {
    id: '1',
    date: '2024-01-15',
    gymName: '클라이밍존 강남점',
    duration: 150, // 2시간 30분
    condition: 8,
    routes: [
      { id: '1-1', grade: '5.10a', type: 'sport', status: 'completed', attempts: 1 },
      { id: '1-2', grade: '5.9', type: 'sport', status: 'completed', attempts: 2 },
      { id: '1-3', grade: '5.10b', type: 'sport', status: 'attempted', attempts: 3 },
    ],
    notes: '컨디션 좋았음, 5.10b 프로젝트 시작',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    date: '2024-01-18',
    gymName: '클라이밍파크 홍대점',
    duration: 120, // 2시간
    condition: 7,
    routes: [
      { id: '2-1', grade: 'V3', type: 'boulder', status: 'completed', attempts: 2 },
      { id: '2-2', grade: 'V4', type: 'boulder', status: 'completed', attempts: 4 },
      { id: '2-3', grade: 'V5', type: 'boulder', status: 'attempted', attempts: 5 },
    ],
    notes: '볼더링 집중, V5 도전',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    date: '2024-01-22',
    gymName: '클라이밍존 강남점',
    duration: 180, // 3시간
    condition: 9,
    routes: [
      { id: '3-1', grade: '5.10b', type: 'sport', status: 'completed', attempts: 2 },
      { id: '3-2', grade: '5.11a', type: 'sport', status: 'completed', attempts: 3 },
      { id: '3-3', grade: '5.11b', type: 'sport', status: 'attempted', attempts: 4 },
    ],
    notes: '최고 컨디션! 5.11a 완등',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: '4',
    date: '2024-01-25',
    gymName: '클라이밍파크 홍대점',
    duration: 90, // 1시간 30분
    condition: 6,
    routes: [
      { id: '4-1', grade: 'V3', type: 'boulder', status: 'completed', attempts: 3 },
      { id: '4-2', grade: 'V4', type: 'boulder', status: 'attempted', attempts: 6 },
    ],
    notes: '컨디션 떨어짐, 짧게 운동',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: '5',
    date: '2024-01-28',
    gymName: '클라이밍존 강남점',
    duration: 200, // 3시간 20분
    condition: 8,
    routes: [
      { id: '5-1', grade: '5.10a', type: 'sport', status: 'completed', attempts: 1 },
      { id: '5-2', grade: '5.10b', type: 'sport', status: 'completed', attempts: 2 },
      { id: '5-3', grade: '5.11a', type: 'sport', status: 'completed', attempts: 3 },
      { id: '5-4', grade: '5.11b', type: 'sport', status: 'attempted', attempts: 5 },
    ],
    notes: '5.11a 완등 성공! 5.11b 도전',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-28'),
  },
  {
    id: '6',
    date: '2024-01-30',
    gymName: '클라이밍파크 홍대점',
    duration: 150, // 2시간 30분
    condition: 7,
    routes: [
      { id: '6-1', grade: 'V4', type: 'boulder', status: 'completed', attempts: 3 },
      { id: '6-2', grade: 'V5', type: 'boulder', status: 'attempted', attempts: 8 },
    ],
    notes: 'V5 프로젝트 계속, 점진적 발전',
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30'),
  },
];

export class ClimbingDataService {
  /**
   * 특정 월의 세션 데이터 조회
   */
  static getSessionsByMonth(year: number, month: number): ClimbingSession[] {
    const monthStr = month.toString().padStart(2, '0');
    const yearMonth = `${year}-${monthStr}`;
    
    return DUMMY_SESSIONS.filter(session => 
      session.date.startsWith(yearMonth)
    );
  }

  /**
   * 특정 날짜의 세션 데이터 조회
   */
  static getSessionsByDate(date: string): ClimbingSession[] {
    return DUMMY_SESSIONS.filter(session => 
      session.date === date
    );
  }

  /**
   * 월별 통계 계산
   */
  static getMonthlyStats(year: number, month: number): MonthlyStats {
    const sessions = this.getSessionsByMonth(year, month);
    
    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        totalDuration: 0,
        averageCondition: 0,
        mostFrequentGym: '없음',
        totalRoutes: 0,
      };
    }

    const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0);
    const totalCondition = sessions.reduce((sum, session) => sum + session.condition, 0);
    const averageCondition = Math.round(totalCondition / sessions.length);
    
    // 가장 많이 간 암장 계산
    const gymCounts: { [key: string]: number } = {};
    sessions.forEach(session => {
      gymCounts[session.gymName] = (gymCounts[session.gymName] || 0) + 1;
    });
    
    const mostFrequentGym = Object.entries(gymCounts)
      .sort(([,a], [,b]) => b - a)[0][0];
    
    const totalRoutes = sessions.reduce((sum, session) => 
      sum + session.routes.length, 0
    );

    return {
      totalSessions: sessions.length,
      totalDuration,
      averageCondition,
      mostFrequentGym,
      totalRoutes,
    };
  }

  /**
   * 모든 세션 데이터 조회 (테스트용)
   */
  static getAllSessions(): ClimbingSession[] {
    return [...DUMMY_SESSIONS];
  }

  /**
   * 시간을 시:분 형식으로 변환
   */
  static formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}분`;
    } else if (mins === 0) {
      return `${hours}시간`;
    } else {
      return `${hours}시간 ${mins}분`;
    }
  }

  /**
   * 컨디션 점수를 텍스트로 변환
   */
  static getConditionText(condition: number): string {
    if (condition >= 9) return '최고';
    if (condition >= 7) return '좋음';
    if (condition >= 5) return '보통';
    if (condition >= 3) return '나쁨';
    return '매우 나쁨';
  }
}
