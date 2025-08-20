import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants';
import OnboardingService from '../services/OnboardingService';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  emoji: string;
  color: string;
}

const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: '클라이밍 기록을\n쉽게',
    description: '매번의 클라이밍 세션을 간편하게 기록하고\n나만의 클라이밍 일지를 만들어보세요',
    emoji: '📅',
    color: COLORS.PRIMARY,
  },
  {
    id: 2,
    title: '친구들과\n함께',
    description: '클라이밍 파트너를 찾고\n함께 성장하는 경험을 나누세요',
    emoji: '👥',
    color: COLORS.SECONDARY,
  },
  {
    id: 3,
    title: '목표를\n달성하세요',
    description: '개인 목표를 설정하고\n단계별로 성장하는 성취감을 느껴보세요',
    emoji: '🎯',
    color: COLORS.SUCCESS,
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
  onSkip,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  const handleNext = async () => {
    if (currentIndex < onboardingSlides.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      // 마지막 슬라이드에서 온보딩 완료 처리
      try {
        await OnboardingService.markOnboardingCompleted();
        onComplete();
      } catch (error) {
        console.error('온보딩 완료 처리 실패:', error);
        onComplete(); // 에러가 있어도 진행
      }
    }
  };

  const handleSkip = async () => {
    try {
      await OnboardingService.markOnboardingCompleted();
      onSkip();
    } catch (error) {
      console.error('온보딩 건너뛰기 처리 실패:', error);
      onSkip(); // 에러가 있어도 진행
    }
  };

  const isLastSlide = currentIndex === onboardingSlides.length - 1;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.BACKGROUND} />
      
      {/* Skip 버튼 */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>건너뛰기</Text>
      </TouchableOpacity>

      {/* 슬라이드 컨테이너 */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {onboardingSlides.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <View style={styles.slideContent}>
              {/* 이모지 */}
              <View style={[styles.emojiContainer, { backgroundColor: slide.color }]}>
                <Text style={styles.emoji}>{slide.emoji}</Text>
              </View>

              {/* 제목 */}
              <Text style={styles.title}>{slide.title}</Text>

              {/* 설명 */}
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 하단 컨트롤 */}
      <View style={styles.bottomContainer}>
        {/* 점 인디케이터 */}
        <View style={styles.indicatorContainer}>
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor: index === currentIndex ? COLORS.PRIMARY : COLORS.GRAY_300,
                  width: index === currentIndex ? SPACING.LG : SPACING.SM,
                },
              ]}
            />
          ))}
        </View>

        {/* 버튼 */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isLastSlide ? COLORS.PRIMARY : COLORS.SECONDARY,
            },
          ]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {isLastSlide ? '시작하기' : '다음'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  skipButton: {
    position: 'absolute',
    top: SPACING['2XL'] + 40, // StatusBar 높이 고려
    right: SPACING.LAYOUT.SCREEN_PADDING,
    zIndex: 10,
    padding: SPACING.SM,
  },
  skipText: {
    fontSize: FONTS.SIZES.BASE,
    fontWeight: FONTS.WEIGHTS.MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    height: height - 200, // 하단 컨트롤 영역 제외
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.LAYOUT.SCREEN_PADDING,
  },
  slideContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emojiContainer: {
    width: SPACING['5XL'] * 2,
    height: SPACING['5XL'] * 2,
    borderRadius: SPACING['5XL'],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING['3XL'],
    ...SPACING.SHADOW.LG,
  },
  emoji: {
    fontSize: FONTS.SIZES['6XL'],
  },
  title: {
    fontSize: FONTS.SIZES['5XL'],
    fontWeight: FONTS.WEIGHTS.BOLD,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    lineHeight: FONTS.SIZES['5XL'] * 1.2,
    marginBottom: SPACING.LG,
    letterSpacing: FONTS.LETTER_SPACING.TIGHT,
  },
  description: {
    fontSize: FONTS.SIZES.LG,
    fontWeight: FONTS.WEIGHTS.NORMAL,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: FONTS.SIZES.LG * 1.5,
    letterSpacing: FONTS.LETTER_SPACING.NORMAL,
  },
  bottomContainer: {
    paddingHorizontal: SPACING.LAYOUT.SCREEN_PADDING,
    paddingBottom: SPACING['2XL'] + 20, // SafeArea 고려
    gap: SPACING.XL,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  indicator: {
    height: SPACING.SM,
    borderRadius: SPACING.SM / 2,
    backgroundColor: COLORS.GRAY_300,
  },
  button: {
    height: SPACING['3XL'] + 8,
    borderRadius: SPACING.RADIUS.MD,
    justifyContent: 'center',
    alignItems: 'center',
    ...SPACING.SHADOW.MD,
  },
  buttonText: {
    fontSize: FONTS.SIZES.LG,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
    color: COLORS.WHITE,
    letterSpacing: FONTS.LETTER_SPACING.WIDE,
  },
});

export default OnboardingScreen;
