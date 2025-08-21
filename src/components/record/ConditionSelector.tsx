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

interface Condition {
  level: number;
  emoji: string;
  label: string;
  description: string;
  color: string;
}

const CONDITIONS: Condition[] = [
  {
    level: 1,
    emoji: '😵',
    label: '매우 나쁨',
    description: '컨디션이 매우 좋지 않음',
    color: COLORS.ERROR,
  },
  {
    level: 2,
    emoji: '😞',
    label: '나쁨',
    description: '컨디션이 좋지 않음',
    color: COLORS.WARNING,
  },
  {
    level: 3,
    emoji: '😐',
    label: '보통',
    description: '평범한 컨디션',
    color: COLORS.TEXT_SECONDARY,
  },
  {
    level: 4,
    emoji: '😊',
    label: '좋음',
    description: '컨디션이 좋음',
    color: COLORS.SUCCESS,
  },
  {
    level: 5,
    emoji: '🤩',
    label: '매우 좋음',
    description: '컨디션이 매우 좋음',
    color: COLORS.PRIMARY,
  },
];

interface ConditionSelectorProps {
  selectedCondition: number | null;
  onConditionSelect: (level: number) => void;
}

export const ConditionSelector: React.FC<ConditionSelectorProps> = ({
  selectedCondition,
  onConditionSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 컨디션</Text>
      <Text style={styles.subtitle}>운동할 때 컨디션을 선택해주세요</Text>
      
      <View style={styles.conditionGrid}>
        {CONDITIONS.map((condition) => (
          <TouchableOpacity
            key={condition.level}
            style={[
              styles.conditionItem,
              selectedCondition === condition.level && styles.selectedConditionItem,
            ]}
            onPress={() => onConditionSelect(condition.level)}
            activeOpacity={0.7}
          >
            <View style={styles.conditionContent}>
              <Text style={styles.conditionEmoji}>{condition.emoji}</Text>
              <Text style={[
                styles.conditionLabel,
                selectedCondition === condition.level && styles.selectedConditionText,
              ]}>
                {condition.label}
              </Text>
              <Text style={[
                styles.conditionDescription,
                selectedCondition === condition.level && styles.selectedConditionText,
              ]}>
                {condition.description}
              </Text>
            </View>
            
            {selectedCondition === condition.level && (
              <View style={[
                styles.checkmark,
                { backgroundColor: condition.color }
              ]}>
                <Ionicons name="checkmark" size={16} color={COLORS.WHITE} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      {selectedCondition && (
        <View style={styles.selectedConditionInfo}>
          <Text style={styles.selectedConditionTitle}>
            선택된 컨디션: {CONDITIONS[selectedCondition - 1]?.label}
          </Text>
          <Text style={styles.selectedConditionDescription}>
            {CONDITIONS[selectedCondition - 1]?.description}
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
  conditionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.SM,
    marginBottom: SPACING.LG,
  },
  conditionItem: {
    width: '48%',
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    padding: SPACING.MD,
    borderWidth: SPACING.BORDER.THIN,
    borderColor: COLORS.GRAY_200,
    ...SPACING.SHADOW.SM,
    position: 'relative',
    minHeight: 100,
  },
  selectedConditionItem: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.PRIMARY_LIGHT + '10',
    ...SPACING.SHADOW.MD,
  },
  conditionContent: {
    alignItems: 'center',
    flex: 1,
  },
  conditionEmoji: {
    fontSize: 32,
    marginBottom: SPACING.SM,
  },
  conditionLabel: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SPACING.XS,
  },
  conditionDescription: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 16,
  },
  selectedConditionText: {
    color: COLORS.PRIMARY,
  },
  checkmark: {
    position: 'absolute',
    top: SPACING.SM,
    right: SPACING.SM,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...SPACING.SHADOW.SM,
  },
  selectedConditionInfo: {
    backgroundColor: COLORS.PRIMARY_LIGHT + '10',
    padding: SPACING.MD,
    borderRadius: SPACING.RADIUS.MD,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.PRIMARY,
  },
  selectedConditionTitle: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.PRIMARY,
    fontWeight: '600',
    marginBottom: SPACING.XS,
  },
  selectedConditionDescription: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
});

