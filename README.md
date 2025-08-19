# ClimbMate 🧗‍♀️

클라이밍을 더 즐겁게 만들어주는 React Native Expo 앱입니다.

## 🚀 주요 기능

- **클라이밍 세션 기록**: 운동 시간, 완등한 루트, 메모 등을 기록
- **암장 정보**: 근처 클라이밍 암장 찾기 및 상세 정보
- **통계 및 분석**: 개인 클라이밍 기록 분석
- **사용자 프로필**: 개인 정보 및 클라이밍 레벨 관리

## 🛠 기술 스택

- **React Native** with **Expo SDK 53**
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Zustand** for state management
- **AsyncStorage** for local data persistence
- **Expo Location** for GPS services
- **Expo Image Picker** for photo uploads
- **React Native Charts** for data visualization

## 📱 설치 및 실행

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn
- Expo CLI
- iOS Simulator 또는 Android Emulator

### 설치
```bash
# 의존성 설치
npm install

# Expo 개발 서버 시작
npm start

# iOS 시뮬레이터에서 실행
npm run ios

# Android 에뮬레이터에서 실행
npm run android

# 웹에서 실행
npm run web
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
├── screens/            # 화면 컴포넌트
├── navigation/         # 네비게이션 설정
├── store/              # Zustand 상태 관리
├── services/           # API 서비스
├── utils/              # 유틸리티 함수
├── types/              # TypeScript 타입 정의
├── constants/          # 상수 및 설정
├── hooks/              # 커스텀 훅
└── assets/             # 이미지, 아이콘 등
```

## 🔧 설정

### 환경 변수
`.env` 파일을 생성하고 필요한 API 키를 설정하세요:

```env
API_BASE_URL=your_api_url_here
MAP_API_KEY=your_map_api_key_here
```

### 권한 설정
`app.json`에서 필요한 권한들이 이미 설정되어 있습니다:
- 위치 권한
- 카메라 권한
- 사진 라이브러리 권한

## 📱 주요 화면

1. **홈**: 대시보드 및 빠른 시작
2. **세션**: 클라이밍 세션 목록 및 추가
3. **암장**: 근처 클라이밍 암장 찾기
4. **프로필**: 사용자 정보 및 설정

## 🎨 디자인 시스템

- **색상**: 일관된 색상 팔레트 사용
- **타이포그래피**: 체계적인 폰트 크기 및 스타일
- **컴포넌트**: 재사용 가능한 UI 컴포넌트
- **반응형**: 다양한 화면 크기 지원

## 🔄 상태 관리

Zustand를 사용하여 다음과 같은 상태를 관리합니다:
- **인증**: 사용자 로그인/로그아웃
- **세션**: 클라이밍 세션 데이터
- **암장**: 암장 정보 및 위치
- **UI**: 테마, 언어 등 앱 설정

## 📊 데이터 저장

- **AsyncStorage**: 로컬 데이터 저장
- **상태 지속성**: Zustand persist 미들웨어 사용
- **오프라인 지원**: 네트워크 없이도 기본 기능 사용 가능

## 🚧 개발 중인 기능

- [ ] 실시간 알림
- [ ] 소셜 기능 (친구 추가, 공유)
- [ ] 고급 통계 및 차트
- [ ] 다국어 지원
- [ ] 다크 모드

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

프로젝트 링크: [https://github.com/yourusername/climbmate](https://github.com/yourusername/climbmate)

---

**ClimbMate**와 함께 클라이밍을 더욱 즐겁게 만들어보세요! 🧗‍♀️✨
