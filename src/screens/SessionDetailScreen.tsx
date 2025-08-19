import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, FONTS } from '@/constants';

const SessionDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.date}>2024년 1월 15일</Text>
          <Text style={styles.duration}>2시간 30분</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>암장 정보</Text>
          <View style={styles.gymInfo}>
            <Text style={styles.gymName}>클라이밍 암장 이름</Text>
            <Text style={styles.gymAddress}>서울시 강남구 테헤란로 123</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>클라이밍 루트</Text>
          <View style={styles.routeItem}>
            <Text style={styles.routeName}>V4 보울더링</Text>
            <Text style={styles.routeGrade}>V4</Text>
            <Text style={styles.routeStatus}>완등</Text>
          </View>
          <View style={styles.routeItem}>
            <Text style={styles.routeName}>5.10a 스포츠</Text>
            <Text style={styles.routeGrade}>5.10a</Text>
            <Text style={styles.routeStatus}>완등</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>메모</Text>
          <Text style={styles.notes}>오늘은 컨디션이 좋았습니다. V4를 처음으로 완등했어요!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
    alignItems: 'center',
  },
  date: {
    ...FONTS.h2,
    color: COLORS.white,
    marginBottom: SIZES.base,
  },
  duration: {
    ...FONTS.body2,
    color: COLORS.white,
    opacity: 0.9,
  },
  section: {
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    marginBottom: SIZES.margin,
  },
  gymInfo: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  gymName: {
    ...FONTS.body2,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: SIZES.base,
  },
  gymAddress: {
    ...FONTS.body4,
    color: COLORS.textSecondary,
  },
  routeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
  },
  routeName: {
    ...FONTS.body3,
    color: COLORS.textPrimary,
    flex: 1,
  },
  routeGrade: {
    ...FONTS.body3,
    color: COLORS.secondary,
    fontWeight: '600',
    marginRight: SIZES.margin,
  },
  routeStatus: {
    ...FONTS.body4,
    color: COLORS.success,
    fontWeight: '600',
  },
  notes: {
    ...FONTS.body3,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
});

export default SessionDetailScreen;
