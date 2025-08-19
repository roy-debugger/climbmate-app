import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { TEXT_STYLES } from '@/constants/typography';
import {
  CustomButton,
  Card,
  LoadingSpinner,
} from '@/components/common';
import { storageService } from '@/services/StorageService';
import { DevStorageUtils } from '@/services/DevStorageUtils';
import { ClimbingSession, UserProfile, SessionStats } from '@/types/storage';

/**
 * 스토리지 테스트 화면
 * 
 * 모든 storage 함수들을 테스트하고 예시를 확인할 수 있는 화면
 * 데이터 추가/수정/삭제/조회, 통계, 백업/복원 등 모든 기능 테스트
 */
const StorageTestScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<ClimbingSession[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<SessionStats | null>(null);
  const [storageUsage, setStorageUsage] = useState<{ used: number; available: number } | null>(null);
  const [exportedData, setExportedData] = useState<string>('');

  useEffect(() => {
    loadAllData();
  }, []);

  /**
   * 모든 데이터 로드
   */
  const loadAllData = async () => {
    try {
      setIsLoading(true);
      const [sessionsData, profileData, statsData, usageData] = await Promise.all([
        storageService.getSessions(),
        storageService.getUserProfile(),
        storageService.getSessionStats(),
        storageService.getStorageUsage(),
      ]);

      setSessions(sessionsData);
      setUserProfile(profileData);
      setStats(statsData);
      setStorageUsage(usageData);
    } catch (error) {
      Alert.alert('데이터 로드 실패', error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 테스트 세션 생성
   */
  const handleCreateTestSession = async () => {
    try {
      setIsLoading(true);
      const testSession = DevStorageUtils.generateTestSessions(1)[0];
      testSession.id = `test-${Date.now()}`;
      
      await storageService.saveSession(testSession);
      await loadAllData();
      Alert.alert('성공', '테스트 세션이 생성되었습니다!');
    } catch (error) {
      Alert.alert('실패', error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 테스트 사용자 프로필 생성
   */
  const handleCreateTestProfile = async () => {
    try {
      setIsLoading(true);
      const testProfile = DevStorageUtils.generateTestUserProfile();
      await storageService.saveUserProfile(testProfile);
      await loadAllData();
      Alert.alert('성공', '테스트 사용자 프로필이 생성되었습니다!');
    } catch (error) {
      Alert.alert('실패', error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 대용량 테스트 데이터 생성
   */
  const handleGenerateBulkData = async () => {
    try {
      setIsLoading(true);
      await DevStorageUtils.generateBulkTestData(50);
      await loadAllData();
      Alert.alert('성공', '50개의 테스트 세션이 생성되었습니다!');
    } catch (error) {
      Alert.alert('실패', error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 데이터 내보내기
   */
  const handleExportData = async () => {
    try {
      setIsLoading(true);
      const data = await storageService.exportData();
      setExportedData(data);
      Alert.alert('성공', '데이터가 내보내기되었습니다!');
    } catch (error) {
      Alert.alert('실패', error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 데이터 가져오기
   */
  const handleImportData = async () => {
    if (!exportedData) {
      Alert.alert('알림', '먼저 데이터를 내보내기해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      await storageService.importData(exportedData);
      await loadAllData();
      Alert.alert('성공', '데이터가 가져와졌습니다!');
    } catch (error) {
      Alert.alert('실패', error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 모든 데이터 삭제
   */
  const handleClearAllData = async () => {
    Alert.alert(
      '경고',
      '모든 데이터가 삭제됩니다. 계속하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              await storageService.clearAllData();
              await loadAllData();
              Alert.alert('성공', '모든 데이터가 삭제되었습니다!');
            } catch (error) {
              Alert.alert('실패', error instanceof Error ? error.message : '알 수 없는 오류');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  /**
   * 성능 테스트 실행
   */
  const handlePerformanceTest = async () => {
    try {
      setIsLoading(true);
      const results = await DevStorageUtils.runPerformanceTest();
      Alert.alert(
        '성능 테스트 결과',
        `읽기: ${results.readTime}ms\n쓰기: ${results.writeTime}ms\n삭제: ${results.deleteTime}ms\n캐시 히트율: ${results.cacheHitRate * 100}%`
      );
    } catch (error) {
      Alert.alert('실패', error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 에러 시뮬레이션
   */
  const handleSimulateErrors = async () => {
    try {
      await DevStorageUtils.simulateErrorScenarios();
      Alert.alert('완료', '에러 상황 시뮬레이션이 완료되었습니다. 콘솔을 확인해주세요.');
    } catch (error) {
      Alert.alert('실패', error instanceof Error ? error.message : '알 수 없는 오류');
    }
  };

  /**
   * 데이터 무결성 검사
   */
  const handleValidateData = async () => {
    try {
      setIsLoading(true);
      const result = await DevStorageUtils.validateDataIntegrity();
      
      if (result.isValid) {
        Alert.alert('검사 완료', '모든 데이터가 정상입니다!');
      } else {
        Alert.alert(
          '문제 발견',
          `데이터에 문제가 있습니다:\n\n${result.issues.join('\n')}`
        );
      }
    } catch (error) {
      Alert.alert('실패', error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 테스트 데이터로 채우기
   */
  const handlePopulateWithTestData = async () => {
    try {
      setIsLoading(true);
      await DevStorageUtils.populateWithTestData();
      await loadAllData();
      Alert.alert('성공', '테스트 데이터로 스토리지가 채워졌습니다!');
    } catch (error) {
      Alert.alert('실패', error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 세션 삭제
   */
  const handleDeleteSession = async (sessionId: string) => {
    try {
      await storageService.deleteSession(sessionId);
      await loadAllData();
      Alert.alert('성공', '세션이 삭제되었습니다!');
    } catch (error) {
      Alert.alert('실패', error instanceof Error ? error.message : '알 수 없는 오류');
    }
  };

  /**
   * 바이트를 읽기 쉬운 형태로 변환
   */
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* 제목 */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.title}>💾 스토리지 테스트</Text>
          <Text style={styles.subtitle}>
            AsyncStorage 기반 로컬 데이터 저장 시스템을 테스트할 수 있습니다.
          </Text>
        </Card>

        {/* 기본 CRUD 테스트 */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>🔧 기본 CRUD 테스트</Text>
          
          <View style={styles.buttonGrid}>
            <CustomButton
              title="테스트 세션 생성"
              variant="primary"
              onPress={handleCreateTestSession}
              style={styles.button}
            />
            <CustomButton
              title="테스트 프로필 생성"
              variant="primary"
              onPress={handleCreateTestProfile}
              style={styles.button}
            />
          </View>
          
          <View style={styles.buttonGrid}>
            <CustomButton
              title="데이터 새로고침"
              variant="secondary"
              onPress={loadAllData}
              style={styles.button}
            />
            <CustomButton
              title="모든 데이터 삭제"
              variant="outline"
              onPress={handleClearAllData}
              style={styles.button}
            />
          </View>
        </Card>

        {/* 고급 기능 테스트 */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>🚀 고급 기능 테스트</Text>
          
          <View style={styles.buttonGrid}>
            <CustomButton
              title="대용량 데이터 생성 (50개)"
              variant="primary"
              onPress={handleGenerateBulkData}
              style={styles.button}
            />
            <CustomButton
              title="성능 테스트"
              variant="secondary"
              onPress={handlePerformanceTest}
              style={styles.button}
            />
          </View>
          
          <View style={styles.buttonGrid}>
            <CustomButton
              title="에러 시뮬레이션"
              variant="outline"
              onPress={handleSimulateErrors}
              style={styles.button}
            />
            <CustomButton
              title="데이터 무결성 검사"
              variant="outline"
              onPress={handleValidateData}
              style={styles.button}
            />
          </View>
        </Card>

        {/* 백업/복원 테스트 */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>💿 백업/복원 테스트</Text>
          
          <View style={styles.buttonGrid}>
            <CustomButton
              title="데이터 내보내기"
              variant="primary"
              onPress={handleExportData}
              style={styles.button}
            />
            <CustomButton
              title="데이터 가져오기"
              variant="secondary"
              onPress={handleImportData}
              style={styles.button}
            />
          </View>
          
          <CustomButton
            title="테스트 데이터로 채우기"
            variant="outline"
            onPress={handlePopulateWithTestData}
            style={styles.button}
            fullWidth={true}
          />
        </Card>

        {/* 현재 데이터 상태 */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>📊 현재 데이터 상태</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>총 세션 수</Text>
              <Text style={styles.statValue}>{sessions.length}개</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>사용자 프로필</Text>
              <Text style={styles.statValue}>{userProfile ? '있음' : '없음'}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>총 운동 일수</Text>
              <Text style={styles.statValue}>{stats?.totalWorkoutDays || 0}일</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>현재 연속</Text>
              <Text style={styles.statValue}>{stats?.currentStreak || 0}일</Text>
            </View>
          </View>
          
          {storageUsage && (
            <View style={styles.storageInfo}>
              <Text style={styles.storageLabel}>스토리지 사용량:</Text>
              <Text style={styles.storageValue}>
                {formatBytes(storageUsage.used)} / {formatBytes(storageUsage.available)}
              </Text>
            </View>
          )}
        </Card>

        {/* 세션 목록 */}
        {sessions.length > 0 && (
          <Card padding="large" margin="medium" shadow="medium">
            <Text style={styles.sectionTitle}>📝 저장된 세션 목록</Text>
            
            {sessions.slice(0, 10).map((session, index) => (
              <View key={session.id} style={styles.sessionItem}>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionTitle}>
                    {session.gymName} - {new Date(session.date).toLocaleDateString()}
                  </Text>
                  <Text style={styles.sessionDetails}>
                    {session.duration}분 | 컨디션: {session.condition}/5 | 등급: {session.maxGradeAttempted}
                  </Text>
                  {session.notes && (
                    <Text style={styles.sessionNotes}>{session.notes}</Text>
                  )}
                </View>
                
                <CustomButton
                  title="삭제"
                  variant="outline"
                  size="small"
                  onPress={() => handleDeleteSession(session.id)}
                  style={styles.deleteButton}
                />
              </View>
            ))}
            
            {sessions.length > 10 && (
              <Text style={styles.moreSessions}>
                ... 외 {sessions.length - 10}개 더
              </Text>
            )}
          </Card>
        )}

        {/* 내보낸 데이터 표시 */}
        {exportedData && (
          <Card padding="large" margin="medium" shadow="medium">
            <Text style={styles.sectionTitle}>📤 내보낸 데이터</Text>
            <Text style={styles.exportedData}>{exportedData}</Text>
          </Card>
        )}
      </ScrollView>

      {/* 로딩 오버레이 */}
      {isLoading && (
        <LoadingSpinner
          size="large"
          color="primary"
          overlay={true}
          text="처리 중..."
        />
      )}
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
  title: {
    ...TEXT_STYLES.H1,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  subtitle: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionTitle: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.MD,
    gap: SPACING.SM,
  },
  button: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.MD,
    gap: SPACING.SM,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: SPACING.MD,
    backgroundColor: COLORS.GRAY_100,
    borderRadius: SPACING.RADIUS.MD,
  },
  statLabel: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XS,
  },
  statValue: {
    ...TEXT_STYLES.H4,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  storageInfo: {
    alignItems: 'center',
    padding: SPACING.MD,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: SPACING.RADIUS.MD,
  },
  storageLabel: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  storageValue: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_200,
  },
  sessionInfo: {
    flex: 1,
    marginRight: SPACING.MD,
  },
  sessionTitle: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
    marginBottom: SPACING.XS,
  },
  sessionDetails: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XS,
  },
  sessionNotes: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    fontStyle: 'italic',
  },
  deleteButton: {
    minWidth: 60,
  },
  moreSessions: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: SPACING.MD,
    fontStyle: 'italic',
  },
  exportedData: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    backgroundColor: COLORS.GRAY_100,
    padding: SPACING.MD,
    borderRadius: SPACING.RADIUS.SM,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});

export default StorageTestScreen;
