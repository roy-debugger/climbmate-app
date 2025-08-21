import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, FONTS, TEXT_STYLES } from '@/constants';

const SessionsScreen = () => {
  const sessions: any[] = []; // Will be populated from store

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>아직 세션이 없습니다</Text>
      <Text style={styles.emptySubtitle}>첫 번째 클라이밍 세션을 기록해보세요!</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>세션 추가하기</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSessionItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.sessionItem}>
      <View style={styles.sessionHeader}>
        <Text style={styles.sessionDate}>2024년 1월 15일</Text>
        <Text style={styles.sessionDuration}>2시간 30분</Text>
      </View>
      <Text style={styles.gymName}>클라이밍 암장 이름</Text>
      <View style={styles.sessionStats}>
        <Text style={styles.statText}>완등: 5개</Text>
        <Text style={styles.statText}>시도: 8개</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>클라이밍 세션</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      {sessions.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={sessions}
          renderItem={renderSessionItem}
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
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_200,
  },
  title: {
    ...TEXT_STYLES.H2,
    color: COLORS.TEXT_PRIMARY,
  },
  addButton: {
    backgroundColor: COLORS.PRIMARY,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  emptyTitle: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SIZES.base,
  },
  emptySubtitle: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  listContainer: {
    padding: SIZES.padding,
  },
  sessionItem: {
    backgroundColor: COLORS.SURFACE,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.PRIMARY,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.base,
  },
  sessionDate: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  sessionDuration: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  gymName: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.PRIMARY,
    marginBottom: SIZES.base,
  },
  sessionStats: {
    flexDirection: 'row',
    gap: SIZES.margin,
  },
  statText: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
});

export default SessionsScreen;
