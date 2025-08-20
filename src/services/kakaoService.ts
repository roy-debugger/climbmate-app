import { Alert } from 'react-native';

// Mock 카카오 사용자 데이터
const mockKakaoUser = {
  id: 'kakao_12345',
  kakaoId: 'kakao_12345',
  nickname: '클라이머',
  profileImage: 'https://via.placeholder.com/150',
  email: 'climber@kakao.com'
};

export const mockKakaoService = {
  // 카카오 로그인 시뮬레이션
  login: async (): Promise<typeof mockKakaoUser> => {
    return new Promise((resolve) => {
      // 2초 로딩 시뮬레이션
      setTimeout(() => {
        console.log('🔐 Mock 카카오 로그인 성공:', mockKakaoUser);
        resolve(mockKakaoUser);
      }, 2000);
    });
  },

  // 카카오 로그아웃 시뮬레이션
  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('🚪 Mock 카카오 로그아웃 성공');
        resolve();
      }, 500);
    });
  },

  // 카카오 사용자 정보 가져오기
  getUserInfo: async (): Promise<typeof mockKakaoUser> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('👤 Mock 카카오 사용자 정보 조회:', mockKakaoUser);
        resolve(mockKakaoUser);
      }, 500);
    });
  }
};

export default mockKakaoService;
