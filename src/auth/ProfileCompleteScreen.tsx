import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS } from './constants';
import { LevelSelector, ClimbingLevel } from './LevelSelector';
import { KakaoUser } from './types';

interface ProfileCompleteScreenProps {
  kakaoUser: KakaoUser;
  onComplete: (profile: any) => void;
  onBack: () => void;
}

export const ProfileCompleteScreen: React.FC<ProfileCompleteScreenProps> = ({
  kakaoUser,
  onComplete,
  onBack,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<ClimbingLevel | null>(null);
  const [nickname, setNickname] = useState(kakaoUser.nickname);

  const handleComplete = () => {
    if (!selectedLevel) {
      Alert.alert('알림', '클라이밍 레벨을 선택해주세요.');
      return;
    }

    const profile = {
      kakaoId: kakaoUser.id,
      nickname,
      profileImage: kakaoUser.profileImage,
      climbingLevel: selectedLevel,
      createdAt: new Date().toISOString(),
    };

    onComplete(profile);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={COLORS.TEXT_PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>프로필 완성하기</Text>
          <View style={styles.placeholder} />
        </View>

        {/* 환영 메시지 */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            반가워요, {kakaoUser.nickname}님!
          </Text>
          <Text style={styles.welcomeSubtitle}>
            ClimbMate에서 사용할 프로필을 완성해주세요
          </Text>
        </View>

        {/* 프로필 사진 */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Ionicons name="person" size={60} color={COLORS.TEXT_SECONDARY} />
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={20} color={COLORS.WHITE} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileImageText}>프로필 사진 추가</Text>
        </View>

        {/* 닉네임 */}
        <View style={styles.nicknameSection}>
          <Text style={styles.sectionLabel}>닉네임</Text>
          <View style={styles.nicknameInput}>
            <Text style={styles.nicknameText}>{nickname}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={16} color={COLORS.PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 레벨 선택 */}
        <LevelSelector
          selectedLevel={selectedLevel}
          onLevelSelect={setSelectedLevel}
        />

        {/* 완료 버튼 */}
        <TouchableOpacity
          style={[
            styles.completeButton,
            {
              backgroundColor: selectedLevel ? COLORS.PRIMARY : COLORS.TEXT_DISABLED,
            },
          ]}
          onPress={handleComplete}
          disabled={!selectedLevel}
        >
          <Text style={styles.completeButtonText}>ClimbMate 시작하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.LG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.LG,
  },
  backButton: {
    padding: SPACING.SM,
  },
  headerTitle: {
    fontSize: FONTS.XL,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  placeholder: {
    width: 40,
  },
  welcomeSection: {
    alignItems: 'center',
    marginVertical: SPACING.XL,
  },
  welcomeTitle: {
    fontSize: FONTS['2XL'],
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  welcomeSubtitle: {
    fontSize: FONTS.LG,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: SPACING.XL,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.SURFACE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.MD,
    position: 'relative',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImageText: {
    fontSize: FONTS.SM,
    color: COLORS.TEXT_SECONDARY,
  },
  nicknameSection: {
    marginVertical: SPACING.LG,
  },
  sectionLabel: {
    fontSize: FONTS.LG,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  nicknameInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.SURFACE,
    padding: SPACING.LG,
    borderRadius: SPACING.MD,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  nicknameText: {
    fontSize: FONTS.LG,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  editButton: {
    padding: SPACING.SM,
  },
  completeButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: SPACING.MD,
    paddingVertical: SPACING.LG,
    alignItems: 'center',
    marginVertical: SPACING.XL,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completeButtonText: {
    color: COLORS.WHITE,
    fontSize: FONTS.LG,
    fontWeight: '600',
  },
});
