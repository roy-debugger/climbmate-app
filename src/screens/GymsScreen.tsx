import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, FONTS } from '@/constants';

const GymsScreen = () => {
  const gyms: any[] = []; // Will be populated from store

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>근처 암장을 찾을 수 없습니다</Text>
      <Text style={styles.emptySubtitle}>위치 권한을 허용해주세요</Text>
    </View>
  );

  const renderGymItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.gymItem}>
      <View style={styles.gymHeader}>
        <Text style={styles.gymName}>클라이밍 암장 이름</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>4.5</Text>
          <Text style={styles.ratingText}>⭐</Text>
        </View>
      </View>
      <Text style={styles.gymAddress}>서울시 강남구 테헤란로 123</Text>
      <View style={styles.gymFacilities}>
        <Text style={styles.facilityTag}>보울더링</Text>
        <Text style={styles.facilityTag}>스포츠 클라이밍</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>클라이밍 암장</Text>
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationButtonText}>📍</Text>
        </TouchableOpacity>
      </View>
      
      {gyms.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={gyms}
          renderItem={renderGymItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.textPrimary,
  },
  locationButton: {
    backgroundColor: COLORS.secondary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButtonText: {
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  emptyTitle: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    marginBottom: SIZES.base,
  },
  emptySubtitle: {
    ...FONTS.body3,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  listContainer: {
    padding: SIZES.padding,
  },
  gymItem: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin,
  },
  gymHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  gymName: {
    ...FONTS.h4,
    color: COLORS.textPrimary,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: SIZES.base,
  },
  ratingText: {
    fontSize: 16,
  },
  gymAddress: {
    ...FONTS.body4,
    color: COLORS.textSecondary,
    marginBottom: SIZES.base,
  },
  gymFacilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.base,
  },
  facilityTag: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: SIZES.base,
    paddingVertical: 4,
    borderRadius: SIZES.radius / 2,
    ...FONTS.body5,
    color: COLORS.textSecondary,
  },
});

export default GymsScreen;
