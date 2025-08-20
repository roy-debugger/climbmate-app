import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, FONTS, LAYOUT } from '@/constants';
import { globalStyles } from '@/styles/globalStyles';
import { Card } from '../components/common';
import useAuthStore from '../store/authStore';

// 클라이밍 레벨 색상 정의 (요청된 순서로 변경)
const CLIMBING_LEVELS = [
  { color: '#FFFFFF', name: '흰색', level: 'beginner', gradient: ['#FFFFFF', '#F5F5F5'] },
  { color: '#FFD93D', name: '노랑', level: 'beginner', gradient: ['#FFD93D', '#FFE66D'] },
  { color: '#FFA07A', name: '주황', level: 'beginner', gradient: ['#FFA07A', '#FFB88C'] },
  { color: '#6BCF7F', name: '초록', level: 'beginner', gradient: ['#6BCF7F', '#8ED6A3'] },
  { color: '#4ECDC4', name: '파랑', level: 'intermediate', gradient: ['#4ECDC4', '#7DDCD3'] },
  { color: '#FF6B6B', name: '빨강', level: 'intermediate', gradient: ['#FF6B6B', '#FF8E8E'] },
  { color: '#A78BFA', name: '보라', level: 'intermediate', gradient: ['#A78BFA', '#C4A8FF'] },
  { color: '#9E9E9E', name: '회색', level: 'advanced', gradient: ['#9E9E9E', '#BDBDBD'] },
  { color: '#8D6E63', name: '갈색', level: 'advanced', gradient: ['#8D6E63', '#A1887F'] },
  { color: '#424242', name: '검정', level: 'advanced', gradient: ['#424242', '#616161'] },
];

const ProfileCompleteScreen: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const navigation = useNavigation<any>();
  
  // 상태 관리
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('');
  const [height, setHeight] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<typeof CLIMBING_LEVELS[0] | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // 성별 옵션
  const genderOptions = [
    { value: 'male', label: '남성', icon: '👨' },
    { value: 'female', label: '여성', icon: '👩' },
    { value: 'other', label: '기타', icon: '👤' },
  ];

  // 프로필 완성 처리
  const handleComplete = () => {
    console.log('📝 프로필 완성 버튼 클릭');
    console.log('📝 현재 상태:', { nickname, birthDate, gender, height, selectedLevel });
    
    // 입력값 검증
    if (!nickname.trim()) {
      console.log('❌ 닉네임 누락');
      // Alert 대신 console.warn 사용
      console.warn('❌ 오류: 닉네임을 입력해주세요.');
      return;
    }


    if (!selectedLevel) {
      console.log('❌ 클라이밍 레벨 누락');
      console.warn('❌ 오류: 클라이밍 레벨을 선택해주세요.');
      return;
    }

    // 프로필 업데이트
    const profileData = {
      nickname: nickname.trim(),
      birthDate,
      gender: gender || undefined,
      height: height.trim(),
      climbingLevel: selectedLevel.level as 'beginner' | 'intermediate' | 'advanced',
    };

    console.log('📝 프로필 완성 데이터:', profileData);
    
    // 프로필 업데이트 실행
    try {
      console.log('🔄 updateProfile 호출 시작');
      updateProfile(profileData);
      console.log('✅ 프로필 업데이트 성공');
      
      // 성공 메시지 표시 - Alert 대신 console.log 사용
      console.log('🎉 프로필 완성! 프로필이 성공적으로 완성되었습니다.');
      console.log('✅ 프로필 완성 확인됨, 홈으로 이동');
      
      // 성공 메시지 표시
      setShowSuccessMessage(true);
      
      // 2초 후 자동으로 홈으로 이동
      setTimeout(() => {
        setShowSuccessMessage(false);
        // RootNavigator에서 자동으로 MainTabs로 이동하도록 함
        // updateProfile에서 isProfileComplete가 true로 설정되면 자동 이동됨
      }, 2000);
      
    } catch (error) {
      console.error('❌ 프로필 업데이트 실패:', error);
      console.warn('❌ 오류: 프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 날짜 선택 모달 열기
  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  // 날짜 선택 완료
  const handleDateConfirm = () => {
    const formattedDate = tempDate.toISOString().split('T')[0];
    setBirthDate(formattedDate);
    setShowDatePicker(false);
  };

  // 날짜 선택 취소
  const handleDateCancel = () => {
    setShowDatePicker(false);
  };

  // 날짜 변경
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  // 키 입력 (숫자만)
  const handleHeightInput = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 3) {
      setHeight(cleaned);
    }
  };

  // 레벨 텍스트 가져오기
  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return '초보자';
      case 'intermediate': return '중급자';
      case 'advanced': return '고급자';
      default: return '미정';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
        scrollEnabled={true}
        nestedScrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        overScrollMode="always"
        removeClippedSubviews={false}
        directionalLockEnabled={true}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
      >
        {/* 헤더 */}
        <View style={styles.header}>
          <View style={styles.headerBackground} />
          <Text style={styles.title}>프로필 완성</Text>
          <Text style={styles.subtitle}>클라이밍을 시작하기 전에 프로필을 완성해주세요</Text>
        </View>

        {/* 닉네임 입력 */}
        <Card padding="medium" margin="none" shadow="small" style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>👤</Text>
            <Text style={styles.cardTitle}>닉네임</Text>
          </View>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder="닉네임을 입력하세요"
            maxLength={20}
            autoFocus
          />
          <Text style={styles.helperText}>카카오에서 가져온 닉네임입니다. 수정 가능합니다.</Text>
        </Card>

        {/* 생년월일 입력 */}
        <Card padding="medium" margin="none" shadow="small" style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>📅</Text>
            <Text style={styles.cardTitle}>생년월일 (선택사항)</Text>
          </View>
          <TouchableOpacity style={styles.dateButton} onPress={openDatePicker}>
            <Text style={birthDate ? styles.dateButtonText : styles.dateButtonPlaceholder}>
              {birthDate || '생년월일을 선택하세요'}
            </Text>
            <Text style={styles.dateButtonIcon}>📅</Text>
          </TouchableOpacity>
          <Text style={styles.helperText}>생년월일을 선택하면 더 정확한 추천을 받을 수 있습니다</Text>
        </Card>

        {/* 성별 선택 */}
        <Card padding="medium" margin="none" shadow="small" style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>⚧</Text>
            <Text style={styles.cardTitle}>성별 (선택사항)</Text>
          </View>
          <View style={styles.genderContainer}>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.genderButton,
                  gender === option.value && styles.genderButtonSelected,
                ]}
                onPress={() => setGender(option.value as any)}
              >
                <Text style={styles.genderIcon}>{option.icon}</Text>
                <Text
                  style={[
                    styles.genderButtonText,
                    gender === option.value && styles.genderButtonTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* 키 입력 */}
        <Card padding="medium" margin="none" shadow="small" style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>📏</Text>
            <Text style={styles.cardTitle}>키 (선택사항)</Text>
          </View>
          <View style={styles.heightContainer}>
            <TextInput
              style={[styles.input, styles.heightInput]}
              value={height}
              onChangeText={handleHeightInput}
              placeholder="170"
              maxLength={3}
              keyboardType="numeric"
            />
            <Text style={styles.heightUnit}>cm</Text>
          </View>
        </Card>

        {/* 클라이밍 레벨 선택 */}
        <Card padding="medium" margin="none" shadow="small" style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🧗‍♀️</Text>
            <Text style={styles.cardTitle}>클라이밍 레벨</Text>
          </View>
          <Text style={styles.levelDescription}>
            현재 클라이밍할 수 있는 최고 난이도를 선택해주세요
          </Text>
          
          <View style={styles.levelGrid}>
            {CLIMBING_LEVELS.map((level, index) => (
              <View key={index} style={styles.levelButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.levelButton,
                    { backgroundColor: level.color },
                    selectedLevel?.color === level.color && styles.levelButtonSelected,
                  ]}
                  onPress={() => setSelectedLevel(level)}
                />
                <Text style={styles.levelName}>{level.name}</Text>
                {selectedLevel?.color === level.color && (
                  <View style={styles.levelIndicator} />
                )}
              </View>
            ))}
          </View>
          
          {selectedLevel && (
            <View style={styles.selectedLevelInfo}>
              <View style={styles.selectedLevelBadge}>
                <Text style={styles.selectedLevelText}>
                  선택된 레벨: <Text style={styles.selectedLevelHighlight}>{selectedLevel.name}</Text>
                </Text>
                <Text style={styles.selectedLevelSubtext}>
                  {getLevelText(selectedLevel.level)} 단계
                </Text>
              </View>
            </View>
          )}
        </Card>

        {/* 완성 버튼 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.completeButton,
              (!nickname.trim() || !selectedLevel) &&
                styles.completeButtonDisabled,
            ]}
            onPress={handleComplete}
            disabled={!nickname.trim() || !selectedLevel}
          >
            <Text style={styles.completeButtonText}>프로필 완성</Text>
            <Text style={styles.completeButtonSubtext}>클라이밍을 시작하세요! 🚀</Text>
          </TouchableOpacity>
        </View>

        {/* 성공 메시지 */}
        {showSuccessMessage && (
          <View style={styles.successMessage}>
            <Text style={styles.successMessageText}>🎉 프로필 완성!</Text>
            <Text style={styles.successMessageSubtext}>프로필이 성공적으로 완성되었습니다.</Text>
            <Text style={styles.successMessageSubtext}>잠시 후 홈으로 이동합니다...</Text>
          </View>
        )}
      </ScrollView>

       {/* 날짜 선택 모달 */}
       <Modal
         visible={showDatePicker}
         transparent={true}
         animationType="slide"
       >
         <View style={styles.modalOverlay}>
           <View style={styles.modalContent}>
             <Text style={styles.modalTitle}>생년월일 선택</Text>
             
             {/* 간단한 날짜 선택 UI */}
             <View style={styles.datePickerContainer}>
               <View style={styles.dateInputRow}>
                 <Text style={styles.dateLabel}>년도:</Text>
                 <TextInput
                   style={styles.dateInput}
                   value={tempDate.getFullYear().toString()}
                   onChangeText={(text) => {
                     const year = parseInt(text) || 1990;
                     setTempDate(new Date(year, tempDate.getMonth(), tempDate.getDate()));
                   }}
                   keyboardType="numeric"
                   maxLength={4}
                 />
               </View>
               
               <View style={styles.dateInputRow}>
                 <Text style={styles.dateLabel}>월:</Text>
                 <TextInput
                   style={styles.dateInput}
                   value={(tempDate.getMonth() + 1).toString()}
                   onChangeText={(text) => {
                     const month = parseInt(text) - 1 || 0;
                     setTempDate(new Date(tempDate.getFullYear(), month, tempDate.getDate()));
                   }}
                   keyboardType="numeric"
                   maxLength={2}
                 />
               </View>
               
               <View style={styles.dateInputRow}>
                 <Text style={styles.dateLabel}>일:</Text>
                 <TextInput
                   style={styles.dateInput}
                   value={tempDate.getDate().toString()}
                   onChangeText={(text) => {
                     const day = parseInt(text) || 1;
                     setTempDate(new Date(tempDate.getFullYear(), tempDate.getMonth(), day));
                   }}
                   keyboardType="numeric"
                   maxLength={2}
                 />
               </View>
             </View>
             
             <View style={styles.modalButtons}>
               <TouchableOpacity style={styles.modalButton} onPress={handleDateCancel}>
                 <Text style={styles.modalButtonText}>취소</Text>
               </TouchableOpacity>
               <TouchableOpacity style={[styles.modalButton, styles.modalButtonConfirm]} onPress={handleDateConfirm}>
                 <Text style={[styles.modalButtonText, styles.modalButtonTextConfirm]}>확인</Text>
               </TouchableOpacity>
             </View>
           </View>
         </View>
       </Modal>
     </SafeAreaView>
   );
 };

const styles = StyleSheet.create({
  container: globalStyles.container,
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollContent: {
    paddingBottom: SPACING.LG,
    flexGrow: 1,
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.LG,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.LG,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.PRIMARY,
    borderBottomLeftRadius: LAYOUT.CARD.BORDER_RADIUS.XLARGE,
    borderBottomRightRadius: LAYOUT.CARD.BORDER_RADIUS.XLARGE,
    zIndex: LAYOUT.Z_INDEX.BASE,
  },
  title: {
    fontSize: FONTS.SIZES['2XL'],
    fontWeight: FONTS.WEIGHTS.BOLD,
    color: COLORS.WHITE,
    marginTop: SPACING.LG,
    marginBottom: SPACING.SM,
  },
  subtitle: {
    fontSize: FONTS.SIZES.LG,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  cardContainer: {
    marginBottom: SPACING.MD,
  },
  cardHeader: globalStyles.cardHeader,
  cardIcon: {
    fontSize: FONTS.SIZES.LG,
    marginRight: SPACING.XS,
  },
  cardTitle: globalStyles.cardTitle,
  levelDescription: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
    marginBottom: SPACING.SM,
  },
  input: globalStyles.input,
  helperText: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
    marginBottom: SPACING.XS,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.XS,
  },
  genderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.XS,
    paddingHorizontal: SPACING.SM,
    borderRadius: LAYOUT.CARD.BORDER_RADIUS.SMALL,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  genderButtonSelected: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  genderButtonText: {
    fontSize: FONTS.SIZES.SM,
    fontWeight: FONTS.WEIGHTS.SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
    marginLeft: SPACING.XS,
  },
  genderButtonTextSelected: {
    color: COLORS.WHITE,
  },
  genderIcon: {
    fontSize: FONTS.SIZES.LG,
  },
  heightContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: SPACING.XS,
  },
  heightInput: {
    flex: 1,
    marginRight: SPACING.XS,
  },
  heightUnit: {
    fontSize: FONTS.SIZES.SM,
    fontWeight: FONTS.WEIGHTS.SEMIBOLD,
    color: COLORS.TEXT_PRIMARY,
  },
  levelGrid: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.XS,
    paddingHorizontal: SPACING.SM,
  },
  levelButtonContainer: {
    alignItems: 'center',
    marginVertical: SPACING.XS,
    marginHorizontal: 2,
    minWidth: 32,
  },
  levelButton: {
    width: 32,
    height: 32,
    borderRadius: LAYOUT.CARD.BORDER_RADIUS.SMALL,
    marginBottom: SPACING.XS,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  levelButtonSelected: {
    borderWidth: 3,
    borderColor: COLORS.PRIMARY,
  },
  levelName: {
    fontSize: FONTS.SIZES.XS,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.XS,
    textAlign: 'center',
    fontWeight: FONTS.WEIGHTS.MEDIUM,
  },
  levelIndicator: {
    width: 20,
    height: 3,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: LAYOUT.CARD.BORDER_RADIUS.SMALL,
    marginTop: SPACING.XS,
  },
  selectedLevelInfo: {
    marginTop: SPACING.SM,
    paddingHorizontal: SPACING.LG,
  },
  selectedLevelBadge: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: LAYOUT.CARD.BORDER_RADIUS.SMALL,
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.LG,
    alignItems: 'center',
  },
  selectedLevelText: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.WHITE,
    marginBottom: SPACING.XS,
  },
  selectedLevelHighlight: {
    fontWeight: FONTS.WEIGHTS.BOLD,
  },
  selectedLevelSubtext: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.WHITE,
  },
  buttonContainer: {
    paddingHorizontal: SPACING.SM,
    paddingBottom: SPACING.LG,
    marginTop: SPACING.SM,
  },
  completeButton: StyleSheet.flatten([
    globalStyles.button,
    globalStyles.buttonPrimary,
  ]),
  completeButtonDisabled: globalStyles.buttonDisabled,
  completeButtonText: globalStyles.buttonText,
  completeButtonSubtext: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.WHITE,
    marginTop: SPACING.XS,
  },
  errorText: {
    fontSize: FONTS.SIZES.LG,
    color: COLORS.ERROR,
    textAlign: 'center',
  },
  // 날짜 선택 버튼 스타일
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.SURFACE,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    borderRadius: LAYOUT.CARD.BORDER_RADIUS.SMALL,
    paddingVertical: SPACING.XS,
    paddingHorizontal: SPACING.SM,
    marginTop: SPACING.XS,
  },
  dateButtonText: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: FONTS.WEIGHTS.MEDIUM,
  },
  dateButtonPlaceholder: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
  },
  dateButtonIcon: {
    fontSize: FONTS.SIZES.LG,
  },
  // 모달 스타일
  modalOverlay: globalStyles.modalOverlay,
  modalContent: globalStyles.modalContent,
  modalTitle: globalStyles.modalTitle,
  datePickerContainer: {
    marginBottom: SPACING.SM,
  },
  dateInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  dateLabel: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: FONTS.WEIGHTS.MEDIUM,
    width: 50,
  },
  dateInput: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    borderRadius: LAYOUT.CARD.BORDER_RADIUS.SMALL,
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.SM,
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  modalButtons: globalStyles.modalButtons,
  modalButton: globalStyles.modalButton,
  modalButtonConfirm: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  modalButtonText: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    fontWeight: FONTS.WEIGHTS.MEDIUM,
  },
  modalButtonTextConfirm: {
    color: COLORS.WHITE,
  },
  successMessage: globalStyles.success,
  successMessageText: StyleSheet.flatten([
    globalStyles.textLarge,
    globalStyles.textBold,
    globalStyles.textCenter,
    { marginBottom: SPACING.XS },
  ]),
  successMessageSubtext: StyleSheet.flatten([
    globalStyles.textSmall,
    globalStyles.textCenter,
    { marginBottom: SPACING.XS, opacity: 0.9 },
  ]),
});

export default ProfileCompleteScreen;
