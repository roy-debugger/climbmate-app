// 하단 탭 네비게이션 타입 정의
export type BottomTabParamList = {
  Home: undefined;
  Map: undefined;
  Record: undefined;
  Social: undefined;
  Profile: undefined;
};

// 스택 네비게이션을 위한 루트 타입 (향후 확장용)
export type RootStackParamList = {
  MainTabs: undefined;
  ComponentTest: undefined; // 컴포넌트 테스트 화면
  StorageTest: undefined; // 스토리지 테스트 화면
  // 인증 관련 화면들
  Welcome: undefined;
  Login: undefined;
  Main: undefined;
  // 향후 추가될 스크린들
  // SessionDetail: { sessionId: string };
  // GymDetail: { gymId: string };
  // AddSession: undefined;
  // Settings: undefined;
};

// 탭 아이콘 이름 타입
export type TabIconName = 'home' | 'map' | 'calendar' | 'users' | 'user';

// 탭 설정 타입
export interface TabConfig {
  name: keyof BottomTabParamList;
  label: string;
  icon: TabIconName;
  description: string;
}
