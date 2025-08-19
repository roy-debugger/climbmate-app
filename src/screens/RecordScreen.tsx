import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecordScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📅 기록</Text>
          <Text style={styles.subtitle}>클라이밍 세션 기록을 확인하세요</Text>
        </View>

        {/* Calendar Placeholder */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarPlaceholder}>
            <Text style={styles.calendarIcon}>📅</Text>
            <Text style={styles.calendarTitle}>달력</Text>
            <Text style={styles.calendarSubtitle}>구현 예정: react-native-calendars 연동</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이번 달 통계</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>세션</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>시간</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>루트</Text>
            </View>
          </View>
        </View>

        {/* Recent Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>최근 세션</Text>
          <View style={styles.sessionsList}>
            <View style={styles.sessionItem}>
              <View style={styles.sessionDate}>
                <Text style={styles.sessionDay}>15</Text>
                <Text style={styles.sessionMonth}>8월</Text>
              </View>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionGym}>클라이밍존 강남점</Text>
                <Text style={styles.sessionDuration}>2시간 30분 • 5.10a 완등</Text>
              </View>
              <TouchableOpacity style={styles.sessionButton}>
                <Text style={styles.sessionButtonText}>상세보기</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.sessionItem}>
              <View style={styles.sessionDate}>
                <Text style={styles.sessionDay}>12</Text>
                <Text style={styles.sessionMonth}>8월</Text>
              </View>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionGym}>클라이밍파크 홍대점</Text>
                <Text style={styles.sessionDuration}>1시간 45분 • 5.9 완등</Text>
              </View>
              <TouchableOpacity style={styles.sessionButton}>
                <Text style={styles.sessionButtonText}>상세보기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Add Session Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonIcon}>➕</Text>
            <Text style={styles.addButtonText}>새 세션 기록하기</Text>
          </TouchableOpacity>
        </View>

        {/* Implementation Notice */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>구현 예정: 달력 뷰, 세션 상세기록, 통계 차트, 목표 설정</Text>
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
    backgroundColor: '#10b981',
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
  calendarContainer: {
    margin: 20,
    marginBottom: 20,
  },
  calendarPlaceholder: {
    backgroundColor: 'white',
    height: 200,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calendarIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  calendarSubtitle: {
    fontSize: 14,
    color: '#6b7280',
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
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
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
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  sessionsList: {
    gap: 12,
  },
  sessionItem: {
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
  sessionDate: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 50,
  },
  sessionDay: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
  },
  sessionMonth: {
    fontSize: 12,
    color: '#6b7280',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionGym: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  sessionDuration: {
    fontSize: 14,
    color: '#6b7280',
  },
  sessionButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sessionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  addButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  noticeContainer: {
    padding: 20,
    backgroundColor: '#d1fae5',
    margin: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  noticeText: {
    fontSize: 14,
    color: '#065f46',
    textAlign: 'center',
  },
});

export default RecordScreen;
