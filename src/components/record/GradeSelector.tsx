import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { TEXT_STYLES } from '../../constants/typography';

interface Grade {
  value: string;
  label: string;
  color: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

const GRADES: Grade[] = [
  { value: 'V0', label: 'V0', color: COLORS.SUCCESS, difficulty: 'beginner' },
  { value: 'V1', label: 'V1', color: COLORS.SUCCESS, difficulty: 'beginner' },
  { value: 'V2', label: 'V2', color: COLORS.SUCCESS, difficulty: 'beginner' },
  { value: 'V3', label: 'V3', color: COLORS.INFO, difficulty: 'intermediate' },
  { value: 'V4', label: 'V4', color: COLORS.INFO, difficulty: 'intermediate' },
  { value: 'V5', label: 'V5', color: COLORS.INFO, difficulty: 'intermediate' },
  { value: 'V6', label: 'V6', color: COLORS.WARNING, difficulty: 'advanced' },
  { value: 'V7', label: 'V7', color: COLORS.WARNING, difficulty: 'advanced' },
  { value: 'V8', label: 'V8', color: COLORS.ERROR, difficulty: 'expert' },
  { value: 'V9', label: 'V9', color: COLORS.ERROR, difficulty: 'expert' },
  { value: 'V10', label: 'V10', color: COLORS.ERROR, difficulty: 'expert' },
];

const DIFFICULTY_LABELS = {
  beginner: '초급',
  intermediate: '중급',
  advanced: '고급',
  expert: '전문가',
};

interface GradeSelectorProps {
  selectedGrade: string | null;
  onGradeSelect: (grade: string) => void;
}

export const GradeSelector: React.FC<GradeSelectorProps> = ({
  selectedGrade,
  onGradeSelect,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return COLORS.SUCCESS;
      case 'intermediate': return COLORS.INFO;
      case 'advanced': return COLORS.WARNING;
      case 'expert': return COLORS.ERROR;
      default: return COLORS.TEXT_SECONDARY;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 최고 등급</Text>
      <Text style={styles.subtitle}>클라이밍한 등급 중 가장 높은 등급을 선택해주세요</Text>
      
      {/* 등급 그리드 */}
      <View style={styles.gradeGrid}>
        {GRADES.map((grade) => (
          <TouchableOpacity
            key={grade.value}
            style={[
              styles.gradeButton,
              { borderColor: grade.color },
              selectedGrade === grade.value && styles.selectedGradeButton,
            ]}
            onPress={() => onGradeSelect(grade.value)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.gradeLabel,
              { color: grade.color },
              selectedGrade === grade.value && styles.selectedGradeText,
            ]}>
              {grade.label}
            </Text>
            
            {selectedGrade === grade.value && (
              <View style={[styles.checkmark, { backgroundColor: grade.color }]}>
                <Ionicons name="checkmark" size={16} color={COLORS.WHITE} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      {/* 난이도별 구분 */}
      <View style={styles.difficultyLegend}>
        <Text style={styles.legendTitle}>난이도 구분</Text>
        <View style={styles.legendItems}>
          {Object.entries(DIFFICULTY_LABELS).map(([key, label]) => {
            const grade = GRADES.find(g => g.difficulty === key);
            return (
              <View key={key} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: grade?.color }]} />
                <Text style={styles.legendText}>{label}</Text>
              </View>
            );
          })}
        </View>
      </View>
      
      {/* 선택된 등급 정보 */}
      {selectedGrade && (
        <View style={styles.selectedGradeInfo}>
          <Text style={styles.selectedGradeTitle}>
            선택된 등급: {selectedGrade}
          </Text>
          <Text style={styles.selectedGradeDescription}>
            {GRADES.find(g => g.value === selectedGrade)?.difficulty === 'beginner' && '초급자도 도전할 수 있는 등급입니다!'}
            {GRADES.find(g => g.value === selectedGrade)?.difficulty === 'intermediate' && '중급자 수준의 등급입니다.'}
            {GRADES.find(g => g.value === selectedGrade)?.difficulty === 'advanced' && '고급자 수준의 등급입니다.'}
            {GRADES.find(g => g.value === selectedGrade)?.difficulty === 'expert' && '전문가 수준의 등급입니다!'}
          </Text>
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
    ...TEXT_STYLES.H4,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  subtitle: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.LG,
  },
  gradeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.SM,
    marginBottom: SPACING.LG,
  },
  gradeButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: SPACING.BORDER.THICK,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...SPACING.SHADOW.SM,
  },
  selectedGradeButton: {
    backgroundColor: COLORS.PRIMARY_LIGHT + '10',
    ...SPACING.SHADOW.MD,
  },
  gradeLabel: {
    ...TEXT_STYLES.H3,
    fontWeight: '700',
  },
  selectedGradeText: {
    color: COLORS.PRIMARY,
  },
  checkmark: {
    position: 'absolute',
    top: SPACING.XS,
    right: SPACING.XS,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...SPACING.SHADOW.SM,
  },
  difficultyLegend: {
    backgroundColor: COLORS.GRAY_100,
    padding: SPACING.MD,
    borderRadius: SPACING.RADIUS.MD,
    marginBottom: SPACING.LG,
  },
  legendTitle: {
    ...TEXT_STYLES.LABEL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SM,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.MD,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  selectedGradeInfo: {
    backgroundColor: COLORS.PRIMARY_LIGHT + '10',
    padding: SPACING.MD,
    borderRadius: SPACING.RADIUS.MD,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.PRIMARY,
  },
  selectedGradeTitle: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.PRIMARY,
    fontWeight: '600',
    marginBottom: SPACING.XS,
  },
  selectedGradeDescription: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
});
