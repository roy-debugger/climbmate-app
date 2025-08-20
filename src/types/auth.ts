import { ClimbingLevel } from './index';

export interface KakaoUser {
  id: string;
  nickname: string;
  profileImage: string;
  email?: string;
}

export interface UserProfile {
  kakaoId: string;
  nickname: string;
  profileImage: string;
  climbingLevel: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
}
