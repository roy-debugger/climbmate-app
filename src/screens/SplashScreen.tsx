import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 페이드인 애니메이션
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // 로딩 아이콘 회전 애니메이션
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // 2초 후 다음 화면으로 이동
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, rotateAnim, onFinish]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY} />
      
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* ClimbMate 로고 */}
        <View style={styles.logo}>
          <Text style={styles.logoText}>ClimbMate</Text>
          <Text style={styles.logoSubtext}>클라이밍의 동반자</Text>
        </View>

        {/* 로딩 애니메이션 */}
        <View style={styles.loadingContainer}>
          <Animated.View
            style={[
              styles.loadingIcon,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <Text style={styles.loadingIconText}>🧗‍♀️</Text>
          </Animated.View>
          
          {/* 점 3개 애니메이션 */}
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        scale: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.5, 1],
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    marginBottom: SPACING['4XL'],
  },
  logoText: {
    fontSize: FONTS.SIZES['7XL'],
    fontWeight: FONTS.WEIGHTS.BOLD,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: SPACING.SM,
    letterSpacing: FONTS.LETTER_SPACING.WIDE,
  },
  logoSubtext: {
    fontSize: FONTS.SIZES.LG,
    fontWeight: FONTS.WEIGHTS.MEDIUM,
    color: COLORS.PRIMARY_LIGHT,
    textAlign: 'center',
    opacity: 0.9,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: SPACING['3XL'],
  },
  loadingIcon: {
    marginBottom: SPACING.LG,
  },
  loadingIconText: {
    fontSize: FONTS.SIZES['5XL'],
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  dot: {
    width: SPACING.SM,
    height: SPACING.SM,
    borderRadius: SPACING.SM / 2,
    backgroundColor: COLORS.WHITE,
    opacity: 0.8,
  },
});

export default SplashScreen;
