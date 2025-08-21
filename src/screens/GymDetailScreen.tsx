import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, FONTS, TEXT_STYLES } from '@/constants';

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
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.PRIMARY,
    padding: SIZES.padding,
    alignItems: 'center',
  },
  gymName: {
    ...TEXT_STYLES.H1,
    color: COLORS.WHITE,
    marginBottom: SIZES.margin,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...TEXT_STYLES.H3,
    color: COLORS.WHITE,
    fontWeight: 'bold',
    marginRight: SIZES.base,
  },
  ratingText: {
    fontSize: 20,
    marginRight: SIZES.base,
  },
  totalRatings: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.WHITE,
    opacity: 0.9,
  },
  section: {
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_200,
  },
  sectionTitle: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SIZES.margin,
  },
  address: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 24,
  },
  hoursContainer: {
    backgroundColor: COLORS.SURFACE,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.base,
  },
  day: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  time: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.base,
  },
  facilityTag: {
    backgroundColor: COLORS.SECONDARY,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius,
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.WHITE,
  },
  contact: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SIZES.base,
  },
  actionButton: {
    backgroundColor: COLORS.PRIMARY,
    margin: SIZES.margin,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  actionButtonText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.WHITE,
    fontWeight: '600',
  },
});

export default GymDetailScreen;
