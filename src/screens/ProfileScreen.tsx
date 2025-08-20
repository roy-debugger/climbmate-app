import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert, 
  TextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { FONTS } from '../constants/typography';
import useAuthStore from '../store/authStore';

const ProfileScreen = () => {
  const { user, updateProfile, logout } = useAuthStore();
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState(user?.nickname || '');

  const handleLogout = () => {
    Alert.alert(
      '🚪 로그아웃',
      '정말 로그아웃하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: () => {
            console.log('🚪 로그아웃 실행');
            logout();
          },
        },
      ]
    );
  };

  const handleNicknameEdit = () => {
    if (isEditingNickname) {
      // 저장 모드
      if (newNickname.trim() === '') {
        Alert.alert('❌ 오류', '닉네임을 입력해주세요.');
        return;
      }
      
      if (newNickname === user?.nickname) {
        setIsEditingNickname(false);
        return;
      }

      console.log('📝 닉네임 수정:', { old: user?.nickname, new: newNickname });
      updateProfile({ nickname: newNickname.trim() });
      setIsEditingNickname(false);
      Alert.alert('✅ 성공', '닉네임이 수정되었습니다.');
    } else {
      // 편집 모드
      setNewNickname(user?.nickname || '');
      setIsEditingNickname(true);
    }
  };

  const handleCancelEdit = () => {
    setNewNickname(user?.nickname || '');
    setIsEditingNickname(false);
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return '초급자';
      case 'intermediate': return '중급자';
      case 'advanced': return '고급자';
      default: return '미정';
    }
  };

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
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color={COLORS.PRIMARY} />
          </View>
          
          {/* 닉네임 편집 */}
          <View style={styles.nicknameSection}>
            {isEditingNickname ? (
              <View style={styles.nicknameEditContainer}>
                <TextInput
                  style={styles.nicknameInput}
                  value={newNickname}
                  onChangeText={setNewNickname}
                  placeholder="닉네임을 입력하세요"
                  autoFocus
                  maxLength={20}
                />
                <View style={styles.editButtons}>
                  <TouchableOpacity style={styles.saveButton} onPress={handleNicknameEdit}>
                    <Ionicons name="checkmark" size={20} color={COLORS.WHITE} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                    <Ionicons name="close" size={20} color={COLORS.ERROR} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.nicknameDisplay}>
                <Text style={styles.userName}>{user.nickname}</Text>
                <TouchableOpacity style={styles.editIcon} onPress={handleNicknameEdit}>
                  <Ionicons name="pencil" size={20} color={COLORS.PRIMARY} />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text style={styles.userLevel}>
            {getLevelText(user.climbingLevel)} • 클라이밍러
          </Text>
          
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* User Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 클라이밍 통계</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>세션</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>완등</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>-</Text>
              <Text style={styles.statLabel}>최고급수</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ 빠른 액션</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="settings-outline" size={24} color={COLORS.PRIMARY} />
              <Text style={styles.actionText}>설정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="help-circle-outline" size={24} color={COLORS.PRIMARY} />
              <Text style={styles.actionText}>도움말</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="information-circle-outline" size={24} color={COLORS.PRIMARY} />
              <Text style={styles.actionText}>정보</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.ERROR} />
            <Text style={styles.logoutButtonText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: SPACING.XL,
    paddingHorizontal: SPACING.LG,
  },
  avatarContainer: {
    marginBottom: SPACING.LG,
  },
  nicknameSection: {
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  nicknameDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  nicknameEditContainer: {
    alignItems: 'center',
    gap: SPACING.SM,
  },
  nicknameInput: {
    backgroundColor: COLORS.SURFACE,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: SPACING.RADIUS.MD,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    fontSize: FONTS.SIZES.XL,
    fontWeight: '600',
    textAlign: 'center',
    minWidth: 150,
  },
  editButtons: {
    flexDirection: 'row',
    gap: SPACING.SM,
  },
  saveButton: {
    backgroundColor: COLORS.SUCCESS,
    padding: SPACING.SM,
    borderRadius: SPACING.RADIUS.SM,
  },
  cancelButton: {
    backgroundColor: COLORS.SURFACE,
    padding: SPACING.SM,
    borderRadius: SPACING.RADIUS.SM,
    borderWidth: 1,
    borderColor: COLORS.ERROR,
  },
  editIcon: {
    padding: SPACING.XS,
  },
  userName: {
    fontSize: FONTS.SIZES.XL,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
  },
  userLevel: {
    fontSize: FONTS.SIZES.LG,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SM,
  },
  userEmail: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
  },
  section: {
    paddingHorizontal: SPACING.LG,
    marginBottom: SPACING.XL,
  },
  sectionTitle: {
    fontSize: FONTS.SIZES.LG,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    padding: SPACING.LG,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FONTS.SIZES['2XL'],
    fontWeight: '700',
    color: COLORS.PRIMARY,
    marginBottom: SPACING.XS,
  },
  statLabel: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    padding: SPACING.LG,
  },
  actionButton: {
    alignItems: 'center',
    gap: SPACING.SM,
  },
  actionText: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.SURFACE,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.XL,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.ERROR,
    gap: SPACING.SM,
  },
  logoutButtonText: {
    fontSize: FONTS.SIZES.LG,
    color: COLORS.ERROR,
    fontWeight: '600',
  },
  errorText: {
    fontSize: FONTS.SIZES.LG,
    color: COLORS.ERROR,
    textAlign: 'center',
  },
});

export default ProfileScreen;
