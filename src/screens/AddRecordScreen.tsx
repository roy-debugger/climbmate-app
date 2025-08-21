import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, SPACING, FONTS, SIZES, TEXT_STYLES } from '@/constants';
import CustomButton from '@/components/common/CustomButton';
import GymSelector from '@/components/record/GymSelector';
import ConditionSelector from '@/components/record/ConditionSelector';
import GradeSelector from '@/components/record/GradeSelector';
import PhotoUploader from '@/components/record/PhotoUploader';

interface Gym {
  id: string;
  name: string;
  address: string;
  favorite: boolean;
}

interface ClimbingRecord {
  date: Date;
  gym: Gym | null;
  startTime: Date | null;
  endTime: Date | null;
  totalTime: string;
  condition: number | null;
  grade: string | null;
  memo: string;
  photos: string[];
}

interface AddRecordScreenProps {
  navigation: any;
  route: any;
}

const AddRecordScreen: React.FC<AddRecordScreenProps> = ({ navigation, route }) => {
  const [record, setRecord] = useState<ClimbingRecord>({
    date: new Date(),
    gym: null,
    startTime: null,
    endTime: null,
    totalTime: '',
    condition: null,
    grade: null,
    memo: '',
    photos: [],
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showGymSelector, setShowGymSelector] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 날짜 변경
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setRecord(prev => ({ ...prev, date: selectedDate }));
    }
  };

  // 시작 시간 변경
  const handleStartTimeChange = (event: any, selectedTime?: Date) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setRecord(prev => ({ ...prev, startTime: selectedTime }));
      calculateTotalTime(selectedTime, prev.endTime);
    }
  };

  // 종료 시간 변경
  const handleEndTimeChange = (event: any, selectedTime?: Date) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setRecord(prev => ({ ...prev, endTime: selectedTime }));
      calculateTotalTime(prev.startTime, selectedTime);
    }
  };

  // 총 운동 시간 계산
  const calculateTotalTime = (start: Date | null, end: Date | null) => {
    if (start && end) {
      const diffMs = end.getTime() - start.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      let timeString = '';
      if (diffHours > 0) {
        timeString += `${diffHours}시간 `;
      }
      if (diffMinutes > 0 || diffHours === 0) {
        timeString += `${diffMinutes}분`;
      }
      
      setRecord(prev => ({ ...prev, totalTime: timeString.trim() }));
    }
  };

  // 암장 선택
  const handleGymSelect = (gym: Gym) => {
    setRecord(prev => ({ ...prev, gym }));
  };

  // 컨디션 선택
  const handleConditionSelect = (condition: number) => {
    setRecord(prev => ({ ...prev, condition }));
  };

  // 등급 선택
  const handleGradeSelect = (grade: string) => {
    setRecord(prev => ({ ...prev, grade }));
  };

  // 사진 변경
  const handlePhotosChange = (photos: string[]) => {
    setRecord(prev => ({ ...prev, photos }));
  };

  // 폼 유효성 검사
  const validateForm = (): boolean => {
    if (!record.gym) {
      Alert.alert('암장 선택 필요', '암장을 선택해주세요.');
      return false;
    }
    if (!record.startTime || !record.endTime) {
      Alert.alert('운동 시간 입력 필요', '시작 시간과 종료 시간을 입력해주세요.');
      return false;
    }
    if (record.startTime >= record.endTime) {
      Alert.alert('시간 입력 오류', '시작 시간은 종료 시간보다 빨라야 합니다.');
      return false;
    }
    return true;
  };

  // 저장
  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // TODO: 실제 저장 로직 구현 (3-4에서 구현 예정)
      console.log('저장할 기록:', record);
      
      Alert.alert(
        '저장 완료',
        '운동 기록이 성공적으로 저장되었습니다.',
        [
          {
            text: '확인',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('저장 오류:', error);
      Alert.alert('저장 실패', '운동 기록 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 취소
  const handleCancel = () => {
    Alert.alert(
      '작성 취소',
      '작성 중인 내용이 모두 사라집니다. 정말 취소하시겠습니까?',
      [
        { text: '계속 작성', style: 'cancel' },
        {
          text: '취소',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  // 날짜 포맷팅
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  // 시간 포맷팅
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
          <Ionicons name="close" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>운동 기록 추가</Text>
        <TouchableOpacity
          onPress={handleSave}
          disabled={isSubmitting}
          style={styles.headerButton}
        >
          <Text style={[
            styles.saveButtonText,
            isSubmitting && styles.saveButtonTextDisabled,
          ]}>
            {isSubmitting ? '저장 중...' : '저장'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 날짜 선택 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>날짜</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar" size={20} color={COLORS.PRIMARY} />
            <Text style={styles.dateButtonText}>{formatDate(record.date)}</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.GRAY_400} />
          </TouchableOpacity>
        </View>

        {/* 암장 선택 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>암장</Text>
          <TouchableOpacity
            style={styles.gymButton}
            onPress={() => setShowGymSelector(true)}
          >
            {record.gym ? (
              <View style={styles.selectedGymInfo}>
                <Text style={styles.selectedGymName}>{record.gym.name}</Text>
                <Text style={styles.selectedGymAddress}>{record.gym.address}</Text>
              </View>
            ) : (
              <Text style={styles.placeholderText}>암장을 선택해주세요</Text>
            )}
            <Ionicons name="chevron-forward" size={20} color={COLORS.GRAY_400} />
          </TouchableOpacity>
        </View>

        {/* 운동 시간 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>운동 시간</Text>
          
          <View style={styles.timeContainer}>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setShowStartTimePicker(true)}
            >
              <Text style={styles.timeLabel}>시작 시간</Text>
              <Text style={styles.timeValue}>
                {record.startTime ? formatTime(record.startTime) : '선택'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setShowEndTimePicker(true)}
            >
              <Text style={styles.timeLabel}>종료 시간</Text>
              <Text style={styles.timeValue}>
                {record.endTime ? formatTime(record.endTime) : '선택'}
              </Text>
            </TouchableOpacity>
          </View>

          {record.totalTime && (
            <View style={styles.totalTimeContainer}>
              <Text style={styles.totalTimeLabel}>총 운동 시간:</Text>
              <Text style={styles.totalTimeValue}>{record.totalTime}</Text>
            </View>
          )}
        </View>

        {/* 컨디션 선택 */}
        <ConditionSelector
          selectedCondition={record.condition}
          onConditionSelect={handleConditionSelect}
        />

        {/* 등급 선택 */}
        <GradeSelector
          selectedGrade={record.grade}
          onGradeSelect={handleGradeSelect}
        />

        {/* 메모 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>메모 (선택사항)</Text>
          <TextInput
            style={styles.memoInput}
            placeholder="오늘의 운동에 대한 메모를 작성해보세요..."
            placeholderTextColor={COLORS.GRAY_400}
            value={record.memo}
            onChangeText={(text) => setRecord(prev => ({ ...prev, memo: text }))}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* 사진 업로드 */}
        <PhotoUploader
          photos={record.photos}
          onPhotosChange={handlePhotosChange}
          maxPhotos={3}
        />

        {/* 저장 버튼 */}
        <View style={styles.saveButtonContainer}>
          <CustomButton
            title="운동 기록 저장"
            onPress={handleSave}
            variant="primary"
            size="large"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        </View>
      </ScrollView>

      {/* 날짜 선택 모달 */}
      {showDatePicker && (
        <DateTimePicker
          value={record.date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      {/* 시작 시간 선택 모달 */}
      {showStartTimePicker && (
        <DateTimePicker
          value={record.startTime || new Date()}
          mode="time"
          display="default"
          onChange={handleStartTimeChange}
        />
      )}

      {/* 종료 시간 선택 모달 */}
      {showEndTimePicker && (
        <DateTimePicker
          value={record.endTime || new Date()}
          mode="time"
          display="default"
          onChange={handleEndTimeChange}
        />
      )}

      {/* 암장 선택 모달 */}
      <Modal
        visible={showGymSelector}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <GymSelector
          selectedGym={record.gym}
          onGymSelect={handleGymSelect}
          onClose={() => setShowGymSelector(false)}
        />
      </Modal>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.LAYOUT.SCREEN_PADDING,
    paddingVertical: SPACING.MD,
    backgroundColor: COLORS.SURFACE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_200,
  },
  
  headerTitle: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
  },
  
  headerButton: {
    padding: SPACING.XS,
  },
  
  saveButtonText: {
    ...TEXT_STYLES.BUTTON_MEDIUM,
    color: COLORS.PRIMARY,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
  },
  
  saveButtonTextDisabled: {
    color: COLORS.TEXT_DISABLED,
  },
  
  content: {
    flex: 1,
  },
  
  section: {
    padding: SPACING.LAYOUT.SCREEN_PADDING,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_100,
  },
  
  sectionTitle: {
    ...TEXT_STYLES.H4,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.MD,
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  
  dateButtonText: {
    flex: 1,
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    marginLeft: SPACING.SM,
  },
  
  gymButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.MD,
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  
  selectedGymInfo: {
    flex: 1,
  },
  
  selectedGymName: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  
  selectedGymAddress: {
    ...FONTS.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  
  placeholderText: {
    flex: 1,
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.GRAY_400,
  },
  
  timeContainer: {
    flexDirection: 'row',
    gap: SPACING.MD,
  },
  
  timeButton: {
    flex: 1,
    padding: SPACING.MD,
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    alignItems: 'center',
  },
  
  timeLabel: {
    ...FONTS.LABEL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XS,
  },
  
  timeValue: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
  },
  
  totalTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.MD,
    padding: SPACING.MD,
    backgroundColor: COLORS.PRIMARY + '10',
    borderRadius: SPACING.RADIUS.MD,
  },
  
  totalTimeLabel: {
    ...FONTS.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginRight: SPACING.SM,
  },
  
  totalTimeValue: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.PRIMARY,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
  },
  
  memoInput: {
    padding: SPACING.MD,
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    minHeight: 100,
    ...FONTS.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
  },
  
  saveButtonContainer: {
    padding: SPACING.LAYOUT.SCREEN_PADDING,
    marginBottom: SPACING.LG,
  },
});

export default AddRecordScreen;
