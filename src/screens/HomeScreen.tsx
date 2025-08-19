import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { TEXT_STYLES } from '@/constants/typography';
import { Card, CustomButton } from '@/components/common';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🏠 홈</Text>
          <Text style={styles.headerSubtitle}>클라이밍 피드</Text>
        </View>

        {/* Quick Actions */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>⚡ 빠른 액션</Text>
          <View style={styles.quickActions}>
            <CustomButton
              title="새 세션 기록"
              variant="primary"
              onPress={() => {}}
              style={styles.quickActionButton}
            />
            <CustomButton
              title="암장 찾기"
              variant="secondary"
              onPress={() => {}}
              style={styles.quickActionButton}
            />
          </View>
        </Card>

        {/* Recent Activity */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>📊 최근 활동</Text>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>클라이밍존 강남점에서 V3 등급 완등!</Text>
            <Text style={styles.activityTime}>2시간 전</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>연속 운동 7일 달성 🎉</Text>
            <Text style={styles.activityTime}>1일 전</Text>
          </View>
        </Card>

        {/* Stats */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>📈 이번 주 통계</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>운동 횟수</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>완등 등급</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8.5</Text>
              <Text style={styles.statLabel}>평균 컨디션</Text>
            </View>
          </View>
        </Card>

        {/* 개발자 도구 */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>🧪 개발자 도구</Text>
          <Text style={styles.sectionDescription}>
            개발 중 테스트할 수 있는 도구들입니다.
          </Text>
          
          <View style={styles.buttonGrid}>
            <CustomButton
              title="🎯 컴포넌트 테스트"
              variant="primary"
              onPress={() => navigation.navigate('ComponentTest')}
              style={styles.button}
            />
            <CustomButton
              title="💾 스토리지 테스트"
              variant="secondary"
              onPress={() => navigation.navigate('StorageTest')}
              style={styles.button}
            />
          </View>
        </Card>

        {/* Implementation Notice */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>🚧 구현 예정</Text>
          <Text style={styles.noticeText}>
            • 실시간 피드 업데이트{'\n'}
            • 개인화된 추천 루트{'\n'}
            • 소셜 기능 (좋아요, 댓글){'\n'}
            • 실시간 알림 시스템{'\n'}
            • AI 기반 등급 추천
          </Text>
        </Card>
      </ScrollView>
    </View>
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
  scrollContent: {
    paddingBottom: SPACING.XL,
  },
  header: {
    backgroundColor: COLORS.PRIMARY,
    padding: SPACING.XL,
    paddingTop: SPACING['2XL'],
    marginBottom: SPACING.MD,
  },
  headerTitle: {
    ...TEXT_STYLES.H1,
    color: COLORS.WHITE,
    marginBottom: SPACING.SM,
  },
  headerSubtitle: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.WHITE,
    opacity: 0.9,
  },
  sectionTitle: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  sectionDescription: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.MD,
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: 'row',
    gap: SPACING.MD,
  },
  quickActionButton: {
    flex: 1,
  },
  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.MD,
    marginTop: SPACING.MD,
  },
  button: {
    flex: 1,
  },
  activityItem: {
    paddingVertical: SPACING.SM,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_200,
  },
  activityText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  activityTime: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...TEXT_STYLES.H2,
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  statLabel: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
  },
  noticeText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 22,
  },
});

export default HomeScreen;
