import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';
import { TEXT_STYLES } from '../constants/typography';
import { GymSelector } from '../components/record/GymSelector';
import { ConditionSelector } from '../components/record/ConditionSelector';
import { GradeSelector } from '../components/record/GradeSelector';
import { PhotoUploader } from '../components/record/PhotoUploader';

interface Gym {
  id: string;
  name: string;
  address: string;
  isFavorite: boolean;
}

interface ClimbingRecord {
  date: Date;
  gym: Gym | null;
  startTime: Date | null;
  endTime: Date | null;
  totalTime: number | null; // 분 단위
  condition: number | null;
  grade: string | null;
  memo: string;
  photos: string[];
}

interface AddRecordScreenProps {
  navigation: any;
  route: any;
}

export const AddRecordScreen: React.FC<AddRecordScreenProps> = ({
  navigation,
  route,
}) => {
  const [record, setRecord] = useState<ClimbingRecord>({
    date: new Date(),
    gym: null,
    startTime: null,
    endTime: null,
    totalTime: null,
    condition: null,
    grade: null,
    memo: '',
    photos: [],
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showGymSelector, setShowGymSelector] = useState(false);
  const [timeInputMode, setTimeInputMode] = useState<'duration' | 'startEnd'>('duration');

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
      // 종료 시간이 설정되어 있다면 총 시간 계산
      if (record.endTime) {
        const diffMs = record.endTime.getTime() - selectedTime.getTime();
        const diffMinutes = Math.round(diffMs / (1000 * 60));
        setRecord(prev => ({ ...prev, totalTime: diffMinutes > 0 ? diffMinutes : null }));
      }
    }
  };

  // 종료 시간 변경
  const handleEndTimeChange = (event: any, selectedTime?: Date) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setRecord(prev => ({ ...prev, endTime: selectedTime }));
      // 시작 시간이 설정되어 있다면 총 시간 계산
      if (record.startTime) {
        const diffMs = selectedTime.getTime() - record.startTime.getTime();
        const diffMinutes = Math.round(diffMs / (1000 * 60));
        setRecord(prev => ({ ...prev, totalTime: diffMinutes > 0 ? diffMinutes : null }));
      }
    }
  };

  // 총 시간 입력 변경
  const handleTotalTimeChange = (text: string) => {
    const minutes = parseInt(text) || 0;
    setRecord(prev => ({ ...prev, totalTime: minutes > 0 ? minutes : null }));
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

  // 메모 변경
  const handleMemoChange = (memo: string) => {
    setRecord(prev => ({ ...prev, memo }));
  };

  // 사진 변경
  const handlePhotosChange = (photos: string[]) => {
    setRecord(prev => ({ ...prev, photos }));
  };

  // 저장
  const handleSave = () => {
    // 유효성 검사
    if (!record.gym) {
      Alert.alert('알림', '암장을 선택해주세요.');
      return;
    }

    if (!record.condition) {
      Alert.alert('알림', '컨디션을 선택해주세요.');
      return;
    }

    if (!record.grade) {
      Alert.alert('알림', '등급을 선택해주세요.');
      return;
    }

    // 임시로 console.log 출력
    console.log('저장된 기록:', record);
    
    Alert.alert(
      '저장 완료',
      '운동 기록이 저장되었습니다.',
      [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  // 취소
  const handleCancel = () => {
    Alert.alert(
      '작성 취소',
      '작성 중인 내용이 사라집니다. 정말 취소하시겠습니까?',
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

  // 시간 포맷팅
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
          <Ionicons name="close" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>운동 기록 추가</Text>
        <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
          <Ionicons name="checkmark" size={24} color={COLORS.PRIMARY} />
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
            <Text style={styles.dateText}>{formatDate(record.date)}</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.TEXT_SECONDARY} />
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
            <Ionicons name="chevron-forward" size={20} color={COLORS.TEXT_SECONDARY} />
          </TouchableOpacity>
        </View>

        {/* 운동 시간 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>운동 시간</Text>
          
          {/* 시간 입력 모드 선택 */}
          <View style={styles.timeModeSelector}>
            <TouchableOpacity
              style={[
                styles.timeModeButton,
                timeInputMode === 'duration' && styles.selectedTimeModeButton,
              ]}
              onPress={() => setTimeInputMode('duration')}
            >
              <Text style={[
                styles.timeModeText,
                timeInputMode === 'duration' && styles.selectedTimeModeText,
              ]}>
                총 시간
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.timeModeButton,
                timeInputMode === 'startEnd' && styles.selectedTimeModeButton,
              ]}
              onPress={() => setTimeInputMode('startEnd')}
            >
              <Text style={[
                styles.timeModeText,
                timeInputMode === 'startEnd' && styles.selectedTimeModeText,
              ]}>
                시작-종료
              </Text>
            </TouchableOpacity>
          </View>

          {timeInputMode === 'duration' ? (
            <View style={styles.durationInput}>
              <TextInput
                style={styles.timeInput}
                placeholder="운동 시간 (분)"
                placeholderTextColor={COLORS.TEXT_DISABLED}
                value={record.totalTime?.toString() || ''}
                onChangeText={handleTotalTimeChange}
                keyboardType="numeric"
              />
              <Text style={styles.timeUnit}>분</Text>
            </View>
          ) : (
            <View style={styles.startEndInput}>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setShowStartTimePicker(true)}
              >
                <Text style={styles.timeButtonLabel}>시작 시간</Text>
                <Text style={styles.timeButtonValue}>
                  {record.startTime ? formatTime(record.startTime) : '선택'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setShowEndTimePicker(true)}
              >
                <Text style={styles.timeButtonLabel}>종료 시간</Text>
                <Text style={styles.timeButtonValue}>
                  {record.endTime ? formatTime(record.endTime) : '선택'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* 총 시간 표시 */}
          {record.totalTime && (
            <View style={styles.totalTimeDisplay}>
              <Text style={styles.totalTimeText}>
                총 운동 시간: {record.totalTime}분
              </Text>
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

        {/* 메모 입력 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>메모 (선택사항)</Text>
          <TextInput
            style={styles.memoInput}
            placeholder="오늘의 운동에 대한 메모를 작성해보세요..."
            placeholderTextColor={COLORS.TEXT_DISABLED}
            value={record.memo}
            onChangeText={handleMemoChange}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* 사진 추가 */}
        <PhotoUploader
          photos={record.photos}
          onPhotosChange={handlePhotosChange}
          maxPhotos={3}
        />
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
    </KeyboardAvoidingView>
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
    padding: SPACING.LAYOUT.SCREEN_PADDING,
    borderBottomWidth: SPACING.BORDER.THIN,
    borderBottomColor: COLORS.GRAY_200,
    backgroundColor: COLORS.SURFACE,
  },
  headerTitle: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
  },
  headerButton: {
    padding: SPACING.XS,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: SPACING.LAYOUT.SCREEN_PADDING,
    borderBottomWidth: SPACING.BORDER.THIN,
    borderBottomColor: COLORS.GRAY_100,
  },
  sectionTitle: {
    ...TEXT_STYLES.H5,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.MD,
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: SPACING.BORDER.THIN,
    borderColor: COLORS.GRAY_200,
    ...SPACING.SHADOW.SM,
  },
  dateText: {
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
    borderWidth: SPACING.BORDER.THIN,
    borderColor: COLORS.GRAY_200,
    ...SPACING.SHADOW.SM,
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
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  placeholderText: {
    flex: 1,
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_DISABLED,
  },
  timeModeSelector: {
    flexDirection: 'row',
    marginBottom: SPACING.MD,
    gap: SPACING.SM,
  },
  timeModeButton: {
    flex: 1,
    padding: SPACING.SM,
    backgroundColor: COLORS.GRAY_100,
    borderRadius: SPACING.RADIUS.SM,
    alignItems: 'center',
  },
  selectedTimeModeButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  timeModeText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  selectedTimeModeText: {
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  durationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  timeInput: {
    flex: 1,
    padding: SPACING.MD,
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: SPACING.BORDER.THIN,
    borderColor: COLORS.GRAY_200,
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
  },
  timeUnit: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_SECONDARY,
  },
  startEndInput: {
    gap: SPACING.SM,
  },
  timeButton: {
    padding: SPACING.MD,
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: SPACING.BORDER.THIN,
    borderColor: COLORS.GRAY_200,
    ...SPACING.SHADOW.SM,
  },
  timeButtonLabel: {
    ...TEXT_STYLES.LABEL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XS,
  },
  timeButtonValue: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  totalTimeDisplay: {
    marginTop: SPACING.MD,
    padding: SPACING.MD,
    backgroundColor: COLORS.SUCCESS_LIGHT + '10',
    borderRadius: SPACING.RADIUS.MD,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.SUCCESS,
  },
  totalTimeText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.SUCCESS,
    fontWeight: '600',
  },
  memoInput: {
    padding: SPACING.MD,
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: SPACING.BORDER.THIN,
    borderColor: COLORS.GRAY_200,
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    minHeight: 100,
    ...SPACING.SHADOW.SM,
  },
});
