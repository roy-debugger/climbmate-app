import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, DateData } from 'react-native-calendars';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { FONTS, TEXT_STYLES } from '../constants/typography';
import { ClimbingDataService } from '../services/ClimbingDataService';
import { ClimbingSession, MonthlyStats } from '../types/common';

const { width } = Dimensions.get('window');

const RecordScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 현재 월의 세션 데이터
  const currentMonthSessions = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    return ClimbingDataService.getSessionsByMonth(year, month);
  }, [currentMonth]);

  // 선택된 날짜의 세션 데이터
  const selectedDateSessions = useMemo(() => {
    return ClimbingDataService.getSessionsByDate(selectedDate);
  }, [selectedDate]);

  // 현재 월 통계
  const monthlyStats = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    return ClimbingDataService.getMonthlyStats(year, month);
  }, [currentMonth]);

  // 달력 마킹 데이터 생성
  const calendarMarkedDates = useMemo(() => {
    const marked: any = {};
    
    currentMonthSessions.forEach(session => {
      marked[session.date] = {
        marked: true,
        dotColor: COLORS.PRIMARY,
        selectedColor: COLORS.PRIMARY_LIGHT,
      };
    });

    // 선택된 날짜 마킹
    if (marked[selectedDate]) {
      marked[selectedDate].selected = true;
      marked[selectedDate].selectedColor = COLORS.PRIMARY;
    } else {
      marked[selectedDate] = {
        selected: true,
        selectedColor: COLORS.PRIMARY,
      };
    }

    return marked;
  }, [currentMonthSessions, selectedDate]);

  // 날짜 선택 핸들러
  const handleDateSelect = useCallback((day: DateData) => {
    setSelectedDate(day.dateString);
  }, []);

  // 월 변경 핸들러
  const handleMonthChange = useCallback((month: any) => {
    setCurrentMonth(new Date(month.timestamp));
  }, []);

  // 오늘 날짜로 이동
  const goToToday = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    setCurrentMonth(new Date());
  }, []);

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    return `${month}월 ${day}일 (${dayOfWeek})`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📅 기록</Text>
          <Text style={styles.subtitle}>클라이밍 세션 기록을 확인하세요</Text>
        </View>

        {/* Monthly Stats - 최상단으로 이동 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이번 달 통계</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{monthlyStats.totalSessions}</Text>
              <Text style={styles.statLabel}>세션</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {ClimbingDataService.formatDuration(monthlyStats.totalDuration)}
              </Text>
              <Text style={styles.statLabel}>총 시간</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{monthlyStats.averageCondition}</Text>
              <Text style={styles.statLabel}>평균 컨디션</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{monthlyStats.totalRoutes}</Text>
              <Text style={styles.statLabel}>루트</Text>
            </View>
          </View>
          
          {monthlyStats.totalSessions > 0 && (
            <View style={styles.mostFrequentGym}>
              <Text style={styles.mostFrequentGymLabel}>가장 많이 간 암장</Text>
              <Text style={styles.mostFrequentGymName}>{monthlyStats.mostFrequentGym}</Text>
            </View>
          )}
        </View>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </Text>
            <TouchableOpacity style={styles.todayButton} onPress={goToToday}>
              <Text style={styles.todayButtonText}>오늘</Text>
            </TouchableOpacity>
          </View>
          
          <Calendar
            current={currentMonth.toISOString()}
            onDayPress={handleDateSelect}
            onMonthChange={handleMonthChange}
            markedDates={calendarMarkedDates}
            markingType="dot"
            theme={{
              backgroundColor: COLORS.SURFACE,
              calendarBackground: COLORS.SURFACE,
              textSectionTitleColor: COLORS.TEXT_PRIMARY,
              selectedDayBackgroundColor: COLORS.PRIMARY,
              selectedDayTextColor: COLORS.TEXT_INVERSE,
              todayTextColor: COLORS.PRIMARY,
              dayTextColor: COLORS.TEXT_PRIMARY,
              textDisabledColor: COLORS.TEXT_DISABLED,
              dotColor: COLORS.PRIMARY,
              selectedDotColor: COLORS.TEXT_INVERSE,
              arrowColor: COLORS.PRIMARY,
              monthTextColor: COLORS.TEXT_PRIMARY,
              indicatorColor: COLORS.PRIMARY,
              textDayFontFamily: 'System',
              textMonthFontFamily: 'System',
              textDayHeaderFontFamily: 'System',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '600',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
            style={styles.calendar}
          />
        </View>

        {/* Selected Date Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{formatDate(selectedDate)}</Text>
          
          {selectedDateSessions.length > 0 ? (
            <View style={styles.sessionsList}>
              {selectedDateSessions.map((session) => (
                <View key={session.id} style={styles.sessionItem}>
                  <View style={styles.sessionHeader}>
                    <Text style={styles.sessionGym}>{session.gymName}</Text>
                    <View style={styles.sessionMeta}>
                      <Text style={styles.sessionDuration}>
                        {ClimbingDataService.formatDuration(session.duration)}
                      </Text>
                      <Text style={styles.sessionCondition}>
                        컨디션: {session.condition}/10 ({ClimbingDataService.getConditionText(session.condition)})
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.routesContainer}>
                    <Text style={styles.routesTitle}>클라이밍한 루트:</Text>
                    {session.routes.map((route) => (
                      <View key={route.id} style={styles.routeItem}>
                        <Text style={styles.routeGrade}>{route.grade}</Text>
                        <Text style={styles.routeStatus}>
                          {route.status === 'completed' ? '✅ 완등' : 
                           route.status === 'attempted' ? '🔄 시도' : '🎯 프로젝트'}
                        </Text>
                        <Text style={styles.routeAttempts}>({route.attempts}회)</Text>
                      </View>
                    ))}
                  </View>
                  
                  {session.notes && (
                    <Text style={styles.sessionNotes}>📝 {session.notes}</Text>
                  )}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noSessionsContainer}>
              <Text style={styles.noSessionsIcon}>📝</Text>
              <Text style={styles.noSessionsText}>이 날의 기록이 없습니다</Text>
              <Text style={styles.noSessionsSubtext}>새로운 클라이밍 세션을 기록해보세요!</Text>
            </View>
          )}
        </View>

        {/* Add Session Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonIcon}>➕</Text>
            <Text style={styles.addButtonText}>새 세션 기록하기</Text>
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
  header: {
    padding: SPACING.LAYOUT.SCREEN_PADDING,
    backgroundColor: COLORS.PRIMARY,
    marginBottom: SPACING.LAYOUT.SECTION_MARGIN,
  },
  title: {
    ...TEXT_STYLES.H1,
    color: COLORS.TEXT_INVERSE,
    marginBottom: SPACING.SM,
  },
  subtitle: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_INVERSE,
    opacity: 0.9,
  },
  calendarContainer: {
    margin: SPACING.LAYOUT.SCREEN_PADDING,
    marginBottom: SPACING.LAYOUT.SECTION_MARGIN,
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.LG,
    padding: SPACING.LAYOUT.CARD_PADDING,
    ...SPACING.SHADOW.MD,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  calendarTitle: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
  },
  todayButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    borderRadius: SPACING.RADIUS.MD,
  },
  todayButtonText: {
    ...TEXT_STYLES.BUTTON_SMALL,
    color: COLORS.TEXT_INVERSE,
  },
  calendar: {
    borderRadius: SPACING.RADIUS.MD,
    overflow: 'hidden',
  },
  section: {
    padding: SPACING.LAYOUT.SCREEN_PADDING,
    marginBottom: SPACING.LAYOUT.SECTION_MARGIN,
  },
  sectionTitle: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: SPACING.SM,
    marginBottom: SPACING.MD,
  },
  statItem: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    padding: SPACING.LAYOUT.CARD_PADDING,
    borderRadius: SPACING.RADIUS.MD,
    alignItems: 'center',
    ...SPACING.SHADOW.SM,
  },
  statNumber: {
    ...TEXT_STYLES.H2,
    color: COLORS.PRIMARY,
    marginBottom: SPACING.SM,
  },
  statLabel: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  mostFrequentGym: {
    backgroundColor: COLORS.SURFACE,
    padding: SPACING.LAYOUT.CARD_PADDING,
    borderRadius: SPACING.RADIUS.MD,
    alignItems: 'center',
    ...SPACING.SHADOW.SM,
  },
  mostFrequentGymLabel: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XS,
  },
  mostFrequentGymName: {
    ...TEXT_STYLES.H4,
    color: COLORS.PRIMARY,
  },
  sessionsList: {
    gap: SPACING.MD,
  },
  sessionItem: {
    backgroundColor: COLORS.SURFACE,
    padding: SPACING.LAYOUT.CARD_PADDING,
    borderRadius: SPACING.RADIUS.MD,
    ...SPACING.SHADOW.SM,
  },
  sessionHeader: {
    marginBottom: SPACING.MD,
  },
  sessionGym: {
    ...TEXT_STYLES.H4,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  sessionMeta: {
    gap: SPACING.XS,
  },
  sessionDuration: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  sessionCondition: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  routesContainer: {
    marginBottom: SPACING.MD,
  },
  routesTitle: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XS,
    gap: SPACING.SM,
  },
  routeGrade: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.PRIMARY,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
  },
  routeStatus: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  routeAttempts: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_DISABLED,
  },
  sessionNotes: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    fontStyle: 'italic',
  },
  noSessionsContainer: {
    backgroundColor: COLORS.SURFACE,
    padding: SPACING.LAYOUT.CARD_PADDING,
    borderRadius: SPACING.RADIUS.MD,
    alignItems: 'center',
    ...SPACING.SHADOW.SM,
  },
  noSessionsIcon: {
    fontSize: 48,
    marginBottom: SPACING.MD,
  },
  noSessionsText: {
    ...TEXT_STYLES.H4,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  noSessionsSubtext: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: COLORS.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.LAYOUT.CARD_PADDING,
    borderRadius: SPACING.RADIUS.MD,
    ...SPACING.SHADOW.MD,
  },
  addButtonIcon: {
    fontSize: 20,
    marginRight: SPACING.SM,
  },
  addButtonText: {
    ...TEXT_STYLES.BUTTON_MEDIUM,
    color: COLORS.TEXT_INVERSE,
  },
});

export default RecordScreen;
