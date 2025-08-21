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
import { COLORS, SPACING, FONTS, LAYOUT } from '../constants';
import { globalStyles } from '../styles/globalStyles';
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
  grade: string[]; // 배열로 변경하여 중복 선택 가능
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
  // route.params에서 선택된 날짜를 받아와서 초기 날짜로 설정
  const selectedDate = route.params?.selectedDate ? new Date(route.params.selectedDate) : new Date();
  
  const [record, setRecord] = useState<ClimbingRecord>({
    date: selectedDate,
    gym: null,
    startTime: null,
    endTime: null,
    totalTime: null,
    condition: null,
    grade: [], // 빈 배열로 초기화
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

  // 등급 선택 (중복 선택 가능)
  const handleGradeSelect = (grade: string) => {
    setRecord(prev => {
      const currentGrades = prev.grade;
      if (currentGrades.includes(grade)) {
        // 이미 선택된 경우 제거
        return { ...prev, grade: currentGrades.filter(g => g !== grade) };
      } else {
        // 새로운 선택 추가
        return { ...prev, grade: [...currentGrades, grade] };
      }
    });
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
      if (typeof window !== 'undefined') {
        // 웹 환경
        window.alert('암장을 선택해주세요.');
      } else {
        // 모바일 환경
        Alert.alert('알림', '암장을 선택해주세요.');
      }
      return;
    }

    if (!record.condition) {
      if (typeof window !== 'undefined') {
        // 웹 환경
        window.alert('컨디션을 선택해주세요.');
      } else {
        // 모바일 환경
        Alert.alert('알림', '컨디션을 선택해주세요.');
      }
      return;
    }

    if (record.grade.length === 0) {
      if (typeof window !== 'undefined') {
        // 웹 환경
        window.alert('등반 문제를 선택해주세요.');
      } else {
        // 모바일 환경
        Alert.alert('알림', '등반 문제를 선택해주세요.');
      }
      return;
    }

    // 여기에 실제 데이터 저장 로직을 추가할 수 있습니다
    // 예: API 호출, 로컬 스토리지 저장 등
    
    // 임시로 console.log 출력
    console.log('저장된 기록:', record);
    
    if (typeof window !== 'undefined') {
      // 웹 환경
      const confirmed = window.confirm('운동 기록이 저장되었습니다. 이전 화면으로 돌아가시겠습니까?');
      if (confirmed) {
        navigation.goBack();
      }
    } else {
      // 모바일 환경
      Alert.alert(
        '저장 완료',
        '운동 기록이 저장되었습니다.',
        [
          {
            text: '확인',
            onPress: () => {
              // 이전 화면으로 돌아가기
              navigation.goBack();
            },
          },
        ]
      );
    }
  };

  // 취소
  const handleCancel = () => {
    if (typeof window !== 'undefined') {
      // 웹 환경
      const confirmed = window.confirm('작성 중인 내용이 사라집니다. 정말 취소하시겠습니까?');
      if (confirmed) {
        navigation.goBack();
      }
    } else {
      // 모바일 환경
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
    }
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
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* 헤더 */}
      <View style={globalStyles.header}>
        <TouchableOpacity onPress={handleCancel} style={globalStyles.headerButton}>
          <Ionicons name="close" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>운동 기록 추가</Text>
        <TouchableOpacity onPress={handleSave} style={globalStyles.headerButton}>
          <Ionicons name="checkmark" size={24} color={COLORS.PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView style={globalStyles.content} showsVerticalScrollIndicator={false}>
        {/* 날짜 선택 */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>날짜</Text>
          <TouchableOpacity
            style={globalStyles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar" size={20} color={COLORS.PRIMARY} />
            <Text style={globalStyles.dateText}>{formatDate(record.date)}</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.TEXT_SECONDARY} />
          </TouchableOpacity>
        </View>

        {/* 암장 선택 */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>암장</Text>
          <TouchableOpacity
            style={globalStyles.gymButton}
            onPress={() => setShowGymSelector(true)}
          >
            {record.gym ? (
              <View style={globalStyles.selectedGymInfo}>
                <Text style={globalStyles.selectedGymName}>{record.gym.name}</Text>
                <Text style={globalStyles.selectedGymAddress}>{record.gym.address}</Text>
              </View>
            ) : (
              <Text style={globalStyles.placeholderText}>암장을 선택해주세요</Text>
            )}
            <Ionicons name="chevron-forward" size={20} color={COLORS.TEXT_SECONDARY} />
          </TouchableOpacity>
        </View>

        {/* 운동 시간 */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>운동 시간</Text>
          
          {/* 시간 입력 모드 선택 */}
          <View style={globalStyles.timeModeSelector}>
            <TouchableOpacity
              style={[
                globalStyles.timeModeButton,
                timeInputMode === 'duration' && globalStyles.selectedTimeModeButton,
              ]}
              onPress={() => setTimeInputMode('duration')}
            >
              <Text style={[
                globalStyles.timeModeText,
                timeInputMode === 'duration' && globalStyles.selectedTimeModeText,
              ]}>
                총 시간
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globalStyles.timeModeButton,
                timeInputMode === 'startEnd' && globalStyles.selectedTimeModeButton,
              ]}
              onPress={() => setTimeInputMode('startEnd')}
            >
              <Text style={[
                globalStyles.timeModeText,
                timeInputMode === 'startEnd' && globalStyles.selectedTimeModeText,
              ]}>
                시작-종료
              </Text>
            </TouchableOpacity>
          </View>

          {timeInputMode === 'duration' ? (
            <View style={globalStyles.durationInput}>
              <TextInput
                style={globalStyles.timeInput}
                placeholder="운동 시간 (분)"
                placeholderTextColor={COLORS.TEXT_DISABLED}
                value={record.totalTime?.toString() || ''}
                onChangeText={handleTotalTimeChange}
                keyboardType="numeric"
              />
              <Text style={globalStyles.timeUnit}>분</Text>
            </View>
          ) : (
            <View style={globalStyles.startEndInput}>
              <TouchableOpacity
                style={globalStyles.timeButton}
                onPress={() => setShowStartTimePicker(true)}
              >
                <Text style={globalStyles.timeButtonLabel}>시작 시간</Text>
                <Text style={globalStyles.timeButtonValue}>
                  {record.startTime ? formatTime(record.startTime) : '선택'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={globalStyles.timeButton}
                onPress={() => setShowEndTimePicker(true)}
              >
                <Text style={globalStyles.timeButtonLabel}>종료 시간</Text>
                <Text style={globalStyles.timeButtonValue}>
                  {record.endTime ? formatTime(record.endTime) : '선택'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* 총 시간 표시 */}
          {record.totalTime && (
            <View style={globalStyles.totalTimeDisplay}>
              <Text style={globalStyles.totalTimeText}>
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
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>메모 (선택사항)</Text>
          <TextInput
            style={globalStyles.memoInput}
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
          is24Hour={true}
        />
      )}

      {/* 종료 시간 선택 모달 */}
      {showEndTimePicker && (
        <DateTimePicker
          value={record.endTime || new Date()}
          mode="time"
          display="default"
          onChange={handleEndTimeChange}
          is24Hour={true}
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

