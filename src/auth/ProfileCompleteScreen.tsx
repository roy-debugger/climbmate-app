import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { FONTS } from '../constants/typography';
import useAuthStore from '../store/authStore';

const ProfileCompleteScreen: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const handleProfileComplete = () => {
    if (!user) {
      Alert.alert('❌ 오류', '사용자 정보를 찾을 수 없습니다.');
      return;
    }

    console.log('📝 프로필 완성 시작:', { selectedLevel });
    
    // 프로필 업데이트
    updateProfile({
      climbingLevel: selectedLevel
    });

    Alert.alert('🎉 프로필 완성!', '메인 화면으로 이동합니다.');
  };

  const climbingLevels = [
    { key: 'beginner', label: '초급자', description: '클라이밍을 처음 시작하는 분' },
    { key: 'intermediate', label: '중급자', description: '기본기를 갖춘 분' },
    { key: 'advanced', label: '고급자', description: '고난도 루트를 오르는 분' }
  ] as const;

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorText}>사용자 정보를 찾을 수 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Ionicons name="person-circle" size={80} color={COLORS.PRIMARY} />
          <Text style={styles.title}>프로필 완성</Text>
          <Text style={styles.subtitle}>안녕하세요, {user.nickname}님!</Text>
        </View>

        {/* 클라이밍 레벨 선택 */}
        <View style={styles.levelSection}>
          <Text style={styles.sectionTitle}>클라이밍 레벨을 선택해주세요</Text>
          
          {climbingLevels.map((level) => (
            <TouchableOpacity
              key={level.key}
              style={[
                styles.levelOption,
                selectedLevel === level.key && styles.selectedLevel
              ]}
              onPress={() => setSelectedLevel(level.key)}
            >
              <View style={styles.levelContent}>
                <Text style={[
                  styles.levelLabel,
                  selectedLevel === level.key && styles.selectedLevelText
                ]}>
                  {level.label}
                </Text>
                <Text style={[
                  styles.levelDescription,
                  selectedLevel === level.key && styles.selectedLevelText
                ]}>
                  {level.description}
                </Text>
              </View>
              {selectedLevel === level.key && (
                <Ionicons name="checkmark-circle" size={24} color={COLORS.WHITE} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* 완료 버튼 */}
        <TouchableOpacity style={styles.completeButton} onPress={handleProfileComplete}>
          <Text style={styles.completeButtonText}>프로필 완성하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.XL,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING['2XL'],
  },
  title: {
    fontSize: FONTS.SIZES['2XL'],
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.LG,
    marginBottom: SPACING.SM,
  },
  subtitle: {
    fontSize: FONTS.SIZES.LG,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  levelSection: {
    marginBottom: SPACING['2XL'],
  },
  sectionTitle: {
    fontSize: FONTS.SIZES.LG,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.LG,
    textAlign: 'center',
  },
  levelOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.SURFACE,
    padding: SPACING.LG,
    borderRadius: SPACING.RADIUS.MD,
    marginBottom: SPACING.MD,
    borderWidth: 2,
    borderColor: COLORS.GRAY_200,
  },
  selectedLevel: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  levelContent: {
    flex: 1,
  },
  levelLabel: {
    fontSize: FONTS.SIZES.LG,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  levelDescription: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
  },
  selectedLevelText: {
    color: COLORS.WHITE,
  },
  completeButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.XL,
    borderRadius: SPACING.RADIUS.MD,
    alignItems: 'center',
    marginTop: 'auto',
  },
  completeButtonText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.LG,
    fontWeight: '600',
  },
  errorText: {
    fontSize: FONTS.SIZES.LG,
    color: COLORS.ERROR,
    textAlign: 'center',
  },
});

export default ProfileCompleteScreen;
