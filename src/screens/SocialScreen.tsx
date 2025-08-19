import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SocialScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>👥 소셜</Text>
          <Text style={styles.subtitle}>클라이밍 친구들과 소통하세요</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🔍</Text>
              <Text style={styles.actionText}>친구 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📱</Text>
              <Text style={styles.actionText}>채팅</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📅</Text>
              <Text style={styles.actionText}>모임</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Friends List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>친구 목록</Text>
          <View style={styles.friendsList}>
            <View style={styles.friendItem}>
              <View style={styles.friendAvatar}>👨‍🦰</View>
              <View style={styles.friendInfo}>
                <Text style={styles.friendName}>김클라이머</Text>
                <Text style={styles.friendStatus}>최근 활동: 2시간 전</Text>
              </View>
              <TouchableOpacity style={styles.friendButton}>
                <Text style={styles.friendButtonText}>프로필</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.friendItem}>
              <View style={styles.friendAvatar}>👩‍🦰</View>
              <View style={styles.friendInfo}>
                <Text style={styles.friendName}>이등반가</Text>
                <Text style={styles.friendStatus}>최근 활동: 1일 전</Text>
              </View>
              <TouchableOpacity style={styles.friendButton}>
                <Text style={styles.friendButtonText}>프로필</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.friendItem}>
              <View style={styles.friendAvatar}>🧑‍🦱</View>
              <View style={styles.friendInfo}>
                <Text style={styles.friendName}>박암벽인</Text>
                <Text style={styles.friendStatus}>최근 활동: 3일 전</Text>
              </View>
              <TouchableOpacity style={styles.friendButton}>
                <Text style={styles.friendButtonText}>프로필</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Groups */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>클라이밍 모임</Text>
          <View style={styles.groupsList}>
            <View style={styles.groupItem}>
              <View style={styles.groupIcon}>🏔️</View>
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>서울 클라이밍 동호회</Text>
                <Text style={styles.groupMembers}>멤버 45명 • 주말 정기 모임</Text>
              </View>
              <TouchableOpacity style={styles.groupButton}>
                <Text style={styles.groupButtonText}>참여</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.groupItem}>
              <View style={styles.groupIcon}>🧗‍♀️</View>
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>초보자 클라이밍 그룹</Text>
                <Text style={styles.groupMembers}>멤버 23명 • 화요일 저녁</Text>
              </View>
              <TouchableOpacity style={styles.groupButton}>
                <Text style={styles.groupButtonText}>참여</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>최근 활동</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>
                <Text style={styles.activityUser}>김클라이머</Text>님이 새로운 루트를 완등했습니다! 🎉
              </Text>
              <Text style={styles.activityTime}>30분 전</Text>
            </View>
            
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>
                <Text style={styles.activityUser}>이등반가</Text>님이 모임에 참여했습니다 👋
              </Text>
              <Text style={styles.activityTime}>2시간 전</Text>
            </View>
          </View>
        </View>

        {/* Implementation Notice */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>구현 예정: 실시간 채팅, 친구 요청, 모임 관리, 활동 피드</Text>
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
  header: {
    padding: 20,
    backgroundColor: '#8b5cf6',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
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
  friendsList: {
    gap: 12,
  },
  friendItem: {
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
  friendAvatar: {
    fontSize: 32,
    marginRight: 16,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  friendStatus: {
    fontSize: 14,
    color: '#6b7280',
  },
  friendButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  friendButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  groupsList: {
    gap: 12,
  },
  groupItem: {
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
  groupIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  groupMembers: {
    fontSize: 14,
    color: '#6b7280',
  },
  groupButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  groupButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityText: {
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 8,
    lineHeight: 20,
  },
  activityUser: {
    fontWeight: '600',
    color: '#8b5cf6',
  },
  activityTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  noticeContainer: {
    padding: 20,
    backgroundColor: '#ede9fe',
    margin: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  noticeText: {
    fontSize: 14,
    color: '#5b21b6',
    textAlign: 'center',
  },
});

export default SocialScreen;
