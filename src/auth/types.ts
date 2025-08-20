// 카카오 사용자 정보
export interface KakaoUser {
  id: string;
  nickname: string;
  profileImage: string;
  email?: string;
}

// 사용자 프로필
export interface UserProfile {
  kakaoId: string;
  nickname: string;
  profileImage: string;
  climbingLevel: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
}

// 클라이밍 레벨
export type ClimbingLevel = 'beginner' | 'intermediate' | 'advanced';

// 네비게이션 파라미터
export type AuthStackParamList = {
  Welcome: undefined;
  ProfileComplete: { kakaoUser: KakaoUser };
};
