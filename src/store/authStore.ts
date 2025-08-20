import { create } from 'zustand';

interface User {
  id: string;
  kakaoId: string;
  nickname: string;
  profileImage: string;
  climbingLevel: 'beginner' | 'intermediate' | 'advanced';
  email: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other';
  height?: string;
}

interface AuthState {
  // 상태
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  isProfileComplete: boolean;
  
  // 액션
  login: (userData: User) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setProfileComplete: (complete: boolean) => void;
  kakaoLogin: (userData: Partial<User>) => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  isProfileComplete: false,
  
  login: (userData: User) => {
    console.log('🔐 로그인 실행:', userData);
    set({ 
      isAuthenticated: true, 
      user: userData,
      isProfileComplete: true
    });
    console.log('✅ 로그인 완료, 인증 상태:', get());
  },
  
  logout: () => {
    console.log('🚪 로그아웃 실행');
    set({ 
      isAuthenticated: false, 
      user: null,
      isProfileComplete: false
    });
    console.log('✅ 로그아웃 완료, 인증 상태:', get());
  },
  
  updateProfile: (updates: Partial<User>) => {
    console.log('📝 프로필 업데이트 시작:', updates);
    
    try {
      set((state) => {
        // user가 null인 경우 기본 사용자 객체 생성
        const currentUser = state.user || {
          id: 'temp_id',
          kakaoId: 'temp_kakao_id',
          nickname: '클라이머',
          profileImage: '',
          climbingLevel: 'beginner' as const,
          email: 'temp@example.com'
        };
        
        const updatedUser = { ...currentUser, ...updates };
        
        console.log('📝 기존 사용자:', currentUser);
        console.log('📝 업데이트된 사용자:', updatedUser);
        
        return {
          user: updatedUser,
          isProfileComplete: true
        };
      });
      
      console.log('✅ 프로필 업데이트 완료, 사용자 정보:', get().user);
      console.log('✅ 프로필 완성 상태:', get().isProfileComplete);
    } catch (error) {
      console.error('❌ 프로필 업데이트 중 오류 발생:', error);
      throw error; // 오류를 다시 던져서 호출자에서 처리할 수 있도록 함
    }
  },
  
  setLoading: (loading: boolean) => {
    console.log('⏳ 로딩 상태 변경:', loading);
    set({ isLoading: loading });
  },
  
  setProfileComplete: (complete: boolean) => {
    console.log('✅ 프로필 완성 상태 변경:', complete);
    set({ isProfileComplete: complete });
  },
  
  kakaoLogin: (userData: Partial<User>) => {
    console.log('🔐 카카오 로그인 시작:', userData);
    set({ 
      isAuthenticated: true,
      user: {
        id: userData.id || 'temp_id',
        kakaoId: userData.kakaoId || 'temp_kakao_id',
        nickname: userData.nickname || '클라이머',
        profileImage: userData.profileImage || '',
        climbingLevel: userData.climbingLevel || 'beginner',
        email: userData.email || 'temp@example.com'
      },
      isProfileComplete: false // 프로필 완성 필요
    });
    console.log('✅ 카카오 로그인 완료, 인증 상태:', get());
  },
}));

export default useAuthStore;
