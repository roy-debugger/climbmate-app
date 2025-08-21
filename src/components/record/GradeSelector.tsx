import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS } from '@/constants';

interface GradeOption {
  value: string;
  label: string;
  color: string;
  backgroundColor: string;
  description: string;
}

const GRADE_OPTIONS: GradeOption[] = [
  { value: 'V0', label: 'V0', color: COLORS.WHITE, backgroundColor: COLORS.GRAY_500, description: '초급' },
  { value: 'V1', label: 'V1', color: COLORS.WHITE, backgroundColor: COLORS.GRAY_400, description: '초급' },
  { value: 'V2', label: 'V2', color: COLORS.WHITE, backgroundColor: COLORS.GRAY_300, description: '초급' },
  { value: 'V3', label: 'V3', color: COLORS.WHITE, backgroundColor: COLORS.INFO, description: '중급' },
  { value: 'V4', label: 'V4', color: COLORS.WHITE, backgroundColor: COLORS.INFO_LIGHT, description: '중급' },
  { value: 'V5', label: 'V5', color: COLORS.WHITE, backgroundColor: COLORS.SUCCESS, description: '중급' },
  { value: 'V6', label: 'V6', color: COLORS.WHITE, backgroundColor: COLORS.SUCCESS_LIGHT, description: '고급' },
  { value: 'V7', label: 'V7', color: COLORS.WHITE, backgroundColor: COLORS.WARNING, description: '고급' },
  { value: 'V8', label: 'V8', color: COLORS.WHITE, backgroundColor: COLORS.WARNING_LIGHT, description: '고급' },
  { value: 'V9', label: 'V9', color: COLORS.WHITE, backgroundColor: COLORS.ERROR, description: '전문가' },
  { value: 'V10', label: 'V10', color: COLORS.WHITE, backgroundColor: COLORS.ERROR_LIGHT, description: '전문가' },
];

interface GradeSelectorProps {
  selectedGrade: string | null;
  onGradeSelect: (grade: string) => void;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({
  selectedGrade,
  onGradeSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 최고 등급</Text>
      <Text style={styles.subtitle}>클라이밍한 등급 중 가장 높은 등급을 선택해주세요</Text>
      
      <View style={styles.gradesGrid}>
        {GRADE_OPTIONS.map((grade) => (
          <TouchableOpacity
            key={grade.value}
            style={[
              styles.gradeButton,
              { backgroundColor: grade.backgroundColor },
              selectedGrade === grade.value && styles.selectedGrade,
            ]}
            onPress={() => onGradeSelect(grade.value)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.gradeLabel,
              { color: grade.color },
              selectedGrade === grade.value && styles.selectedGradeLabel,
            ]}>
              {grade.label}
            </Text>
            
            {selectedGrade === grade.value && (
              <View style={styles.checkIcon}>
                <Ionicons name="checkmark" size={16} color={COLORS.WHITE} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      {/* 등급별 설명 */}
      <View style={styles.gradeLegend}>
        <Text style={styles.legendTitle}>등급별 난이도:</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: COLORS.GRAY_400 }]} />
            <Text style={styles.legendText}>V0-V2: 초급</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: COLORS.INFO }]} />
            <Text style={styles.legendText}>V3-V5: 중급</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: COLORS.SUCCESS }]} />
            <Text style={styles.legendText}>V6-V8: 고급</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: COLORS.ERROR }]} />
            <Text style={styles.legendText}>V9-V10: 전문가</Text>
          </View>
        </View>
      </View>
      
      {selectedGrade && (
        <View style={styles.selectedGradeInfo}>
          <Text style={styles.selectedGradeLabel}>선택된 등급:</Text>
          <View style={styles.selectedGradeContent}>
            <View style={[
              styles.selectedGradeBadge,
              { backgroundColor: GRADE_OPTIONS.find(g => g.value === selectedGrade)?.backgroundColor }
            ]}>
              <Text style={styles.selectedGradeBadgeText}>
                {selectedGrade}
              </Text>
            </View>
            <Text style={styles.selectedGradeDescription}>
              {GRADE_OPTIONS.find(g => g.value === selectedGrade)?.description} 난이도
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.LAYOUT.SCREEN_PADDING,
  },
  
  title: {
    ...FONTS.H3,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  
  subtitle: {
    ...FONTS.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.LG,
  },
  
  gradesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.SM,
    marginBottom: SPACING.LG,
  },
  
  gradeButton: {
    width: (SPACING.LAYOUT.SCREEN_PADDING * 2 - SPACING.SM) / 3,
    height: 60,
    borderRadius: SPACING.RADIUS.MD,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  
  selectedGrade: {
    transform: [{ scale: 1.05 }],
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  
  gradeLabel: {
    ...FONTS.BUTTON_LARGE,
    fontWeight: FONTS.WEIGHTS.BOLD,
  },
  
  selectedGradeLabel: {
    transform: [{ scale: 1.1 }],
  },
  
  checkIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: SPACING.RADIUS.ROUND,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  gradeLegend: {
    marginBottom: SPACING.LG,
  },
  
  legendTitle: {
    ...FONTS.LABEL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SM,
  },
  
  legendItems: {
    gap: SPACING.XS,
  },
  
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: SPACING.RADIUS.XS,
    marginRight: SPACING.SM,
  },
  
  legendText: {
    ...FONTS.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  
  selectedGradeInfo: {
    padding: SPACING.MD,
    backgroundColor: COLORS.PRIMARY + '10',
    borderRadius: SPACING.RADIUS.MD,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.PRIMARY,
  },
  
  selectedGradeLabel: {
    ...FONTS.LABEL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SM,
  },
  
  selectedGradeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  selectedGradeBadge: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: SPACING.RADIUS.MD,
    marginRight: SPACING.SM,
  },
  
  selectedGradeBadgeText: {
    ...FONTS.BUTTON_MEDIUM,
    color: COLORS.WHITE,
    fontWeight: FONTS.WEIGHTS.BOLD,
  },
  
  selectedGradeDescription: {
    ...FONTS.BODY_MEDIUM,
    color: COLORS.PRIMARY,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
  },
});

export default GradeSelector;
