import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLevelSelector, ClimbingLevel } from '../../components/auth/SimpleLevelSelector';
import { RootStackParamList, KakaoUser } from '../../types';

type ProfileCompleteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProfileComplete'
>;

type ProfileCompleteScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProfileComplete'
>;

export const ProfileCompleteScreen: React.FC = () => {
  const navigation = useNavigation<ProfileCompleteScreenNavigationProp>();
  const route = useRoute<ProfileCompleteScreenRouteProp>();
  const { kakaoUser } = route.params;

  const [selectedLevel, setSelectedLevel] = useState<ClimbingLevel | null>(null);

  const handleStartClimbMate = () => {
    if (!selectedLevel) {
      Alert.alert('알림', '클라이밍 레벨을 선택해주세요.');
      return;
    }

    // 프로필 저장 로직 (실제로는 API 호출)
    const userProfile = {
      kakaoId: kakaoUser.id,
      nickname: kakaoUser.nickname,
      profileImage: kakaoUser.profileImage,
      climbingLevel: selectedLevel,
      createdAt: new Date().toISOString(),
    };

    console.log('사용자 프로필 저장:', userProfile);

    // 메인 앱으로 이동
    Alert.alert(
      '환영합니다!',
      'ClimbMate가 시작됩니다.',
      [
        {
          text: '시작하기',
          onPress: () => {
            // 메인 네비게이션으로 이동
            navigation.reset({
              index: 0,
              routes: [{ name: 'Main' }],
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>프로필 완성하기</Text>
          <View style={styles.placeholder} />
        </View>

        {/* 환영 메시지 */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            반가워요, {kakaoUser.nickname}님!
          </Text>
          <Text style={styles.welcomeSubtitle}>
            ClimbMate에서 클라이밍 기록을 시작해보세요
          </Text>
        </View>

        {/* 프로필 사진 */}
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Text style={styles.profileImagePlaceholder}>📷</Text>
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileImageText}>프로필 사진 추가</Text>
        </View>

        {/* 닉네임 */}
        <View style={styles.nicknameSection}>
          <Text style={styles.sectionLabel}>닉네임</Text>
          <View style={styles.nicknameContainer}>
            <Text style={styles.nicknameText}>{kakaoUser.nickname}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 클라이밍 레벨 선택 */}
        <SimpleLevelSelector
          selectedLevel={selectedLevel}
          onLevelSelect={setSelectedLevel}
        />

        {/* 시작하기 버튼 */}
        <TouchableOpacity
          style={[
            styles.startButton,
            !selectedLevel && styles.startButtonDisabled,
          ]}
          onPress={handleStartClimbMate}
          disabled={!selectedLevel}
        >
          <Text style={[
            styles.startButtonText,
            !selectedLevel && styles.startButtonTextDisabled,
          ]}>
            ClimbMate 시작하기
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  profileImagePlaceholder: {
    fontSize: 40,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileImageText: {
    fontSize: 14,
    color: '#666',
  },
  nicknameSection: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  nicknameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  nicknameText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  editButton: {
    padding: 8,
  },
  startButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startButtonDisabled: {
    backgroundColor: '#E0E0E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  startButtonTextDisabled: {
    color: '#999',
  },
});
