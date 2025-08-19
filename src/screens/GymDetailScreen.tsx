import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, FONTS } from '@/constants';

const GymDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.gymName}>클라이밍 암장 이름</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>4.5</Text>
            <Text style={styles.ratingText}>⭐</Text>
            <Text style={styles.totalRatings}>(128개 평가)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주소</Text>
          <Text style={styles.address}>서울시 강남구 테헤란로 123, 4층</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>운영시간</Text>
          <View style={styles.hoursContainer}>
            <View style={styles.hourRow}>
              <Text style={styles.day}>월-금</Text>
              <Text style={styles.time}>06:00 - 24:00</Text>
            </View>
            <View style={styles.hourRow}>
              <Text style={styles.day}>토-일</Text>
              <Text style={styles.time}>08:00 - 22:00</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>시설</Text>
          <View style={styles.facilitiesContainer}>
            <Text style={styles.facilityTag}>보울더링</Text>
            <Text style={styles.facilityTag}>스포츠 클라이밍</Text>
            <Text style={styles.facilityTag}>트레이닝 구역</Text>
            <Text style={styles.facilityTag}>샤워 시설</Text>
            <Text style={styles.facilityTag}>주차</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>연락처</Text>
          <Text style={styles.contact}>전화: 02-1234-5678</Text>
          <Text style={styles.contact}>웹사이트: www.climbinggym.com</Text>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>이 암장에서 세션 시작하기</Text>
        </TouchableOpacity>
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
  gymName: {
    ...FONTS.h1,
    color: COLORS.white,
    marginBottom: SIZES.margin,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...FONTS.h3,
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight: SIZES.base,
  },
  ratingText: {
    fontSize: 20,
    marginRight: SIZES.base,
  },
  totalRatings: {
    ...FONTS.body4,
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
  address: {
    ...FONTS.body3,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  hoursContainer: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.base,
  },
  day: {
    ...FONTS.body3,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  time: {
    ...FONTS.body3,
    color: COLORS.textSecondary,
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.base,
  },
  facilityTag: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius,
    ...FONTS.body4,
    color: COLORS.white,
  },
  contact: {
    ...FONTS.body3,
    color: COLORS.textSecondary,
    marginBottom: SIZES.base,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    margin: SIZES.margin,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  actionButtonText: {
    ...FONTS.body2,
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default GymDetailScreen;
