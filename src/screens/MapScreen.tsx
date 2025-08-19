import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MapScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🗺️ 지도</Text>
          <Text style={styles.subtitle}>근처 클라이밍 암장을 찾아보세요</Text>
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <Text style={styles.mapTitle}>지도</Text>
            <Text style={styles.mapSubtitle}>구현 예정: Google Maps 연동</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.section}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchText}>암장명, 지역으로 검색</Text>
          </View>
        </View>

        {/* Nearby Gyms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>근처 암장</Text>
          <View style={styles.gymsList}>
            <View style={styles.gymItem}>
              <View style={styles.gymIcon}>🏔️</View>
              <View style={styles.gymInfo}>
                <Text style={styles.gymName}>클라이밍존 강남점</Text>
                <Text style={styles.gymDistance}>0.5km • 4.8★</Text>
              </View>
              <TouchableOpacity style={styles.gymButton}>
                <Text style={styles.gymButtonText}>상세보기</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.gymItem}>
              <View style={styles.gymIcon}>🧗‍♀️</View>
              <View style={styles.gymInfo}>
                <Text style={styles.gymName}>클라이밍파크 홍대점</Text>
                <Text style={styles.gymDistance}>1.2km • 4.6★</Text>
              </View>
              <TouchableOpacity style={styles.gymButton}>
                <Text style={styles.gymButtonText}>상세보기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>필터</Text>
          <View style={styles.filtersContainer}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>거리순</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>평점순</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>가격순</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Implementation Notice */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>구현 예정: 실시간 지도, 암장 상세정보, 리뷰 시스템</Text>
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
    backgroundColor: '#3b82f6',
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
  mapContainer: {
    margin: 20,
    marginBottom: 20,
  },
  mapPlaceholder: {
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
  mapIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  mapTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  mapSubtitle: {
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
  searchContainer: {
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
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  gymsList: {
    gap: 12,
  },
  gymItem: {
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
  gymIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  gymInfo: {
    flex: 1,
  },
  gymName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  gymDistance: {
    fontSize: 14,
    color: '#6b7280',
  },
  gymButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  gymButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6b7280',
  },
  noticeContainer: {
    padding: 20,
    backgroundColor: '#dbeafe',
    margin: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  noticeText: {
    fontSize: 14,
    color: '#1e40af',
    textAlign: 'center',
  },
});

export default MapScreen;
