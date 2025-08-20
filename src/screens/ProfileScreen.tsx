import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuthStore from '../store/authStore';

const ProfileScreen = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    console.log('🚀 === handleLogout 함수 시작 ===');
    console.log('🔍 현재 user 상태:', user);
    console.log('🔍 logout 함수 존재 여부:', typeof logout);
    
    // 웹에서도 동작하는 로그아웃 로직
    if (typeof window !== 'undefined') {
      // 웹 환경
      console.log('🌐 웹 환경에서 로그아웃 실행');
      const confirmed = window.confirm('정말 로그아웃하시겠습니까?');
      if (confirmed) {
        console.log('✅ 웹 confirm 확인됨, 로그아웃 실행');
        logout();
      } else {
        console.log('❌ 웹 confirm 취소됨');
      }
    } else {
      // 모바일 환경
      console.log('📱 모바일 환경에서 로그아웃 실행');
      Alert.alert(
        '로그아웃',
        '정말 로그아웃하시겠습니까?',
        [
          {
            text: '취소',
            style: 'cancel',
            onPress: () => console.log('❌ 로그아웃 취소됨'),
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
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>🧗‍♀️</Text>
          </View>
          <Text style={styles.userName}>{user?.nickname || '클라이밍러'}</Text>
          <Text style={styles.userLevel}>
            {user?.climbingLevel === 'beginner' && '초급자'}
            {user?.climbingLevel === 'intermediate' && '중급자'}
            {user?.climbingLevel === 'advanced' && '고급자'}
            {' • 클라이밍러'}
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>세션</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>89</Text>
              <Text style={styles.statLabel}>완등</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5.11a</Text>
              <Text style={styles.statLabel}>최고급수</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>✏️</Text>
              <Text style={styles.actionText}>프로필 편집</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>⚙️</Text>
              <Text style={styles.actionText}>설정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionText}>통계</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 업적</Text>
          <View style={styles.achievementsList}>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>🥇</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>첫 완등</Text>
                <Text style={styles.achievementDesc}>첫 번째 루트를 완등했습니다</Text>
              </View>
            </View>
            
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>🔥</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>연속 클라이밍</Text>
                <Text style={styles.achievementDesc}>7일 연속으로 클라이밍했습니다</Text>
              </View>
            </View>
            
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>⭐</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>급수 상승</Text>
                <Text style={styles.achievementDesc}>5.10급을 완등했습니다</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 목표</Text>
          <View style={styles.goalsList}>
            <View style={styles.goalItem}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>월간 세션 목표</Text>
                <Text style={styles.goalProgress}>12/15 세션</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '80%' }]} />
              </View>
            </View>
            
            <View style={styles.goalItem}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>5.11b 완등</Text>
                <Text style={styles.goalProgress}>진행 중</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '60%' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>설정</Text>
          <View style={styles.settingsList}>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🔔</Text>
              <Text style={styles.settingText}>알림 설정</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🌙</Text>
              <Text style={styles.settingText}>다크 모드</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🌍</Text>
              <Text style={styles.settingText}>언어 설정</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>📱</Text>
              <Text style={styles.settingText}>앱 정보</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
              <Text style={styles.settingIcon}>🚪</Text>
              <Text style={styles.settingText}>로그아웃</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Implementation Notice */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>구현 예정: 프로필 편집, 상세 통계, 업적 시스템, 목표 관리</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    padding: 20,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    fontSize: 40,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  userLevel: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
  },
  section: {
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
    color: '#6b7280',
  },
  goalsList: {
    gap: 12,
  },
  goalItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  goalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  goalProgress: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f59e0b',
    borderRadius: 4,
  },
  settingsList: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  settingArrow: {
    fontSize: 18,
    color: '#9ca3af',
  },
  noticeContainer: {
    padding: 20,
    backgroundColor: '#fef3c7',
    margin: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  noticeText: {
    fontSize: 14,
    color: '#92400e',
    textAlign: 'center',
  },
});

export default ProfileScreen;
