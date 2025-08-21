import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, FONTS, TEXT_STYLES } from '@/constants';

const AddSessionScreen = () => {
  const [gymName, setGymName] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Save session:', { gymName, duration, notes });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>새 세션 추가</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>암장 이름</Text>
              <TextInput
                style={styles.input}
                placeholder="클라이밍 암장 이름을 입력하세요"
                value={gymName}
                onChangeText={setGymName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>운동 시간</Text>
              <TextInput
                style={styles.input}
                placeholder="예: 2시간 30분"
                value={duration}
                onChangeText={setDuration}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>메모</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="오늘의 클라이밍에 대한 메모를 남겨보세요"
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>세션 저장하기</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.PRIMARY,
    padding: SIZES.padding,
    alignItems: 'center',
  },
  title: {
    ...TEXT_STYLES.H2,
    color: COLORS.WHITE,
  },
  form: {
    padding: SIZES.padding,
  },
  inputGroup: {
    marginBottom: SIZES.margin,
  },
  label: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SIZES.base,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.SURFACE,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    ...TEXT_STYLES.BODY_MEDIUM,
  },
  textArea: {
    height: 100,
    paddingTop: SIZES.padding,
  },
  saveButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginTop: SIZES.margin * 2,
  },
  saveButtonText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.WHITE,
    fontWeight: '600',
  },
});

export default AddSessionScreen;
