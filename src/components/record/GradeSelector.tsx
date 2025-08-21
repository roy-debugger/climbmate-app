import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, LAYOUT } from '../../constants';
import { globalStyles } from '../../styles/globalStyles';

interface ClimbingLevel {
  color: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  gradient: string[];
}

// ProfileCompleteScreen과 동일한 CLIMBING_LEVELS 사용
const CLIMBING_LEVELS: ClimbingLevel[] = [
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

const DIFFICULTY_LABELS = {
  beginner: '초급',
  intermediate: '중급',
  advanced: '고급',
};

interface GradeSelectorProps {
  selectedGrade: string[]; // 배열로 변경하여 중복 선택 가능
  onGradeSelect: (grade: string) => void;
}

export const GradeSelector: React.FC<GradeSelectorProps> = ({
  selectedGrade,
  onGradeSelect,
}) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return COLORS.SUCCESS;
      case 'intermediate': return COLORS.INFO;
      case 'advanced': return COLORS.WARNING;
      default: return COLORS.TEXT_SECONDARY;
    }
  };

  const handleGradeSelect = (gradeName: string) => {
    onGradeSelect(gradeName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>등반 문제</Text>
      <Text style={styles.subtitle}>오늘 클라이밍한 문제들을 선택해주세요 (중복 선택 가능)</Text>
      
      {/* 등급 그리드 */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gradeScrollContainer}
      >
        {CLIMBING_LEVELS.map((level) => (
          <TouchableOpacity
            key={level.name}
            style={[
              styles.gradeButton,
              { borderColor: level.color },
              selectedGrade.includes(level.name) && styles.selectedGradeButton,
            ]}
            onPress={() => handleGradeSelect(level.name)}
            activeOpacity={0.7}
          >
            <View style={[styles.gradeColorIndicator, { backgroundColor: level.color }]} />
            <Text style={[
              styles.gradeLabel,
              { color: level.color },
              selectedGrade.includes(level.name) && styles.selectedGradeText,
            ]}>
              {level.name}
            </Text>
            
            {selectedGrade.includes(level.name) && (
              <View style={[styles.checkmark, { backgroundColor: level.color }]}>
                <Ionicons name="checkmark" size={12} color={COLORS.WHITE} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* 난이도별 구분 */}
      <View style={styles.difficultyLegend}>
        <Text style={styles.legendTitle}>난이도 구분</Text>
        <View style={styles.legendItems}>
          {Object.entries(DIFFICULTY_LABELS).map(([key, label]) => {
            const level = CLIMBING_LEVELS.find(l => l.level === key);
            return (
              <View key={key} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: getDifficultyColor(key) }]} />
                <Text style={styles.legendText}>{label}</Text>
              </View>
            );
          })}
        </View>
      </View>
      
      {/* 선택된 등급 정보 */}
      {selectedGrade.length > 0 && (
        <View style={styles.selectedGradeInfo}>
          <Text style={styles.selectedGradeTitle}>
            선택된 문제: {selectedGrade.join(', ')}
          </Text>
          <Text style={styles.selectedGradeDescription}>
            총 {selectedGrade.length}개의 문제가 선택되었습니다
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
    fontSize: FONTS.SIZES.LG,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  subtitle: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.LG,
  },
  gradeScrollContainer: {
    flexDirection: 'row',
    gap: SPACING.SM,
    marginBottom: SPACING.LG,
  },
  gradeButton: {
    width: 80, // 카드 크기 줄임
    height: 80, // 정사각형으로 만들기
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: 2,
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
    fontSize: FONTS.SIZES.SM, // 폰트 크기 줄임
    fontWeight: '700',
  },
  selectedGradeText: {
    color: COLORS.PRIMARY,
  },
  checkmark: {
    position: 'absolute',
    top: SPACING.XS,
    right: SPACING.XS,
    width: 16, // 체크마크 크기 줄임
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...SPACING.SHADOW.SM,
  },
  gradeColorIndicator: {
    width: '80%',
    height: '40%',
    borderRadius: SPACING.RADIUS.SM,
    marginBottom: SPACING.XS,
  },
  difficultyLegend: {
    backgroundColor: COLORS.GRAY_100,
    padding: SPACING.MD,
    borderRadius: SPACING.RADIUS.MD,
    marginBottom: SPACING.LG,
  },
  legendTitle: {
    fontSize: FONTS.SIZES.SM,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
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
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: FONTS.SIZES.XS,
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
    fontSize: FONTS.SIZES.BASE,
    color: COLORS.PRIMARY,
    fontWeight: '600',
    marginBottom: SPACING.XS,
  },
  selectedGradeDescription: {
    fontSize: FONTS.SIZES.SM,
    color: COLORS.TEXT_SECONDARY,
  },
});
