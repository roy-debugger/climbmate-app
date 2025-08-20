# ClimbMate 디자인 시스템

ClimbMate 앱의 일관된 디자인을 위한 상수 및 스타일 가이드입니다.

## 📁 파일 구조

```
src/
├── constants/
│   ├── colors.ts          # 색상 정의
│   ├── typography.ts      # 폰트 크기/굵기 정의
│   ├── spacing.ts         # 간격 정의
│   ├── layout.ts          # 레이아웃 상수 정의
│   ├── theme.ts           # 테마 관련 상수
│   ├── storage.ts         # 스토리지 관련 상수
│   └── index.ts           # 모든 상수 export
├── styles/
│   └── globalStyles.ts    # 공통 스타일 정의
```

## 🎨 색상 시스템

### 기본 색상
```typescript
import { COLORS } from '@/constants';

// Primary Colors
COLORS.PRIMARY        // #FF6B35 - 메인 주황색
COLORS.PRIMARY_LIGHT  // #FF8A65 - 밝은 주황색
COLORS.PRIMARY_DARK   // #E55A2B - 어두운 주황색

// Secondary Colors
COLORS.SECONDARY      // #2E86AB - 보조 파란색
COLORS.SECONDARY_LIGHT // #4A9BC8 - 밝은 파란색

// Background Colors
COLORS.BACKGROUND     // #F8F9FA - 메인 배경색
COLORS.SURFACE        // #FFFFFF - 카드/컴포넌트 배경

// Text Colors
COLORS.TEXT_PRIMARY   // #1F2937 - 주요 텍스트
COLORS.TEXT_SECONDARY // #6B7280 - 보조 텍스트
COLORS.TEXT_DISABLED  // #9CA3AF - 비활성화 텍스트

// Status Colors
COLORS.SUCCESS        // #16A34A - 성공/완료
COLORS.WARNING        // #D97706 - 경고
COLORS.ERROR          // #DC2626 - 에러/실패
COLORS.INFO           // #2563EB - 정보
```

## 📝 타이포그래피

### 폰트 크기
```typescript
import { FONTS } from '@/constants';

FONTS.SIZES.XS        // 12px
FONTS.SIZES.SM        // 14px
FONTS.SIZES.MD        // 16px
FONTS.SIZES.LG        // 18px
FONTS.SIZES.XL        // 20px
FONTS.SIZES['2XL']    // 24px
FONTS.SIZES['3XL']    // 32px
```

### 폰트 굵기
```typescript
FONTS.WEIGHTS.LIGHT      // 300
FONTS.WEIGHTS.NORMAL     // 400
FONTS.WEIGHTS.MEDIUM     // 500
FONTS.WEIGHTS.SEMIBOLD   // 600
FONTS.WEIGHTS.BOLD       // 700
FONTS.WEIGHTS.EXTRABOLD  // 800
```

## 📏 간격 시스템

### 기본 간격 (8px 그리드)
```typescript
import { SPACING } from '@/constants';

SPACING.XS        // 4px
SPACING.SM        // 8px
SPACING.MD        // 16px
SPACING.LG        // 24px
SPACING.XL        // 32px
SPACING['2XL']    // 40px
```

### 컴포넌트별 간격
```typescript
SPACING.COMPONENT.PADDING.SM    // 8px
SPACING.COMPONENT.PADDING.MD    // 16px
SPACING.COMPONENT.PADDING.LG    // 20px

SPACING.COMPONENT.MARGIN.SM     // 8px
SPACING.COMPONENT.MARGIN.MD     // 16px
SPACING.COMPONENT.MARGIN.LG     // 24px
```

### 테두리 반경
```typescript
SPACING.RADIUS.XS    // 4px
SPACING.RADIUS.SM    // 8px
SPACING.RADIUS.MD    // 12px
SPACING.RADIUS.LG    // 16px
SPACING.RADIUS.XL    // 20px
SPACING.RADIUS.ROUND // 50px
```

## 🏗️ 레이아웃 시스템

### 버튼 관련
```typescript
import { LAYOUT } from '@/constants';

// 높이
LAYOUT.BUTTON.HEIGHT.SMALL    // 36px
LAYOUT.BUTTON.HEIGHT.MEDIUM   // 44px
LAYOUT.BUTTON.HEIGHT.LARGE    // 52px
LAYOUT.BUTTON.HEIGHT.XLARGE   // 60px

// 패딩
LAYOUT.BUTTON.PADDING.MEDIUM.vertical    // 12px
LAYOUT.BUTTON.PADDING.MEDIUM.horizontal  // 20px

// 테두리 반경
LAYOUT.BUTTON.BORDER_RADIUS.SMALL  // 6px
LAYOUT.BUTTON.BORDER_RADIUS.MEDIUM // 8px
LAYOUT.BUTTON.BORDER_RADIUS.LARGE  // 12px
```

### 카드 관련
```typescript
LAYOUT.CARD.BORDER_RADIUS.MEDIUM  // 12px
LAYOUT.CARD.PADDING.MEDIUM        // 16px
LAYOUT.CARD.MARGIN.MEDIUM         // 16px
```

### 그림자
```typescript
LAYOUT.SHADOW.SMALL   // 작은 그림자
LAYOUT.SHADOW.MEDIUM  // 기본 그림자
LAYOUT.SHADOW.LARGE   // 큰 그림자
LAYOUT.SHADOW.XLARGE  // 매우 큰 그림자
```

## 🎭 전역 스타일

### 기본 스타일
```typescript
import { globalStyles } from '@/styles/globalStyles';

// 레이아웃
globalStyles.container      // 기본 컨테이너
globalStyles.row           // 가로 배치
globalStyles.center        // 중앙 정렬
globalStyles.spaceBetween // 양쪽 정렬

// 카드
globalStyles.card          // 기본 카드 스타일
globalStyles.cardHeader    // 카드 헤더
globalStyles.cardTitle     // 카드 제목

// 버튼
globalStyles.button        // 기본 버튼
globalStyles.buttonPrimary // 주요 버튼
globalStyles.buttonOutline // 아웃라인 버튼
globalStyles.buttonText    // 버튼 텍스트

// 입력 필드
globalStyles.input         // 기본 입력 필드
globalStyles.inputFocused  // 포커스된 입력 필드
globalStyles.inputError    // 에러 상태 입력 필드
```

### 스타일 생성 함수
```typescript
import { createButtonStyle, createInputStyle, createCardStyle } from '@/styles/globalStyles';

// 버튼 스타일 생성
const buttonStyle = createButtonStyle('primary', 'medium', false);

// 입력 필드 스타일 생성
const inputStyle = createInputStyle(true, false);

// 카드 스타일 생성
const cardStyle = createCardStyle('medium', 'medium', 'small');
```

## 📱 사용 예시

### 컴포넌트에서 사용
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONTS, LAYOUT } from '@/constants';
import { globalStyles } from '@/styles/globalStyles';

const MyComponent = () => {
  return (
    <View style={[globalStyles.container, styles.customContainer]}>
      <Text style={[globalStyles.textLarge, styles.customText]}>
        안녕하세요!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  customContainer: {
    padding: SPACING.LG,
    backgroundColor: COLORS.SURFACE,
    borderRadius: LAYOUT.CARD.BORDER_RADIUS.MEDIUM,
  },
  customText: {
    color: COLORS.PRIMARY,
    fontWeight: FONTS.WEIGHTS.BOLD,
  },
});
```

### 스타일 조합
```typescript
// 여러 스타일 조합
const combinedStyle = [
  globalStyles.button,
  globalStyles.buttonPrimary,
  { marginTop: SPACING.MD }
];

// 조건부 스타일
const dynamicStyle = [
  globalStyles.input,
  isFocused && globalStyles.inputFocused,
  hasError && globalStyles.inputError,
];
```

## 🔄 마이그레이션 가이드

### 기존 코드에서 변경
```typescript
// 이전
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';

// 새로운 방식
import { COLORS, SPACING, FONTS, LAYOUT } from '@/constants';
import { globalStyles } from '@/styles/globalStyles';
```

### 하드코딩된 값 교체
```typescript
// 이전
const styles = StyleSheet.create({
  button: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 20,
  }
});

// 새로운 방식
const styles = StyleSheet.create({
  button: {
    height: LAYOUT.BUTTON.HEIGHT.MEDIUM,
    borderRadius: LAYOUT.BUTTON.BORDER_RADIUS.MEDIUM,
    paddingHorizontal: LAYOUT.BUTTON.PADDING.MEDIUM.horizontal,
  }
});
```

## 📋 체크리스트

- [ ] 모든 컴포넌트에서 하드코딩된 값 제거
- [ ] 새로운 상수들 import 및 사용
- [ ] globalStyles 활용하여 공통 스타일 적용
- [ ] 일관된 디자인 시스템 적용 확인
- [ ] 타입 안전성 확인

## 🚀 장점

1. **일관성**: 모든 컴포넌트에서 동일한 디자인 값 사용
2. **유지보수**: 디자인 변경 시 상수 파일만 수정하면 전체 앱에 적용
3. **재사용성**: 공통 스타일을 여러 컴포넌트에서 재사용
4. **타입 안전성**: TypeScript를 통한 컴파일 타임 오류 방지
5. **개발 효율성**: 자동완성과 IntelliSense 지원

## 📞 문의사항

디자인 시스템 관련 문의사항이나 개선 제안이 있으시면 개발팀에 연락해주세요.
