import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, TEXT_STYLES } from '@/constants';

interface ConditionOption {
  value: number;
  emoji: string;
  label: string;
  description: string;
  color: string;
}

const CONDITION_OPTIONS: ConditionOption[] = [
  {
    value: 1,
    emoji: '😵',
    label: '매우 나쁨',
    description: '컨디션이 매우 안 좋음',
    color: COLORS.ERROR,
  },
  {
    value: 2,
    emoji: '😞',
    label: '나쁨',
    description: '컨디션이 좋지 않음',
    color: COLORS.WARNING,
  },
  {
    value: 3,
    emoji: '😐',
    label: '보통',
    description: '평범한 컨디션',
    color: COLORS.GRAY_500,
  },
  {
    value: 4,
    emoji: '😊',
    label: '좋음',
    description: '컨디션이 좋음',
    color: COLORS.SUCCESS,
  },
  {
    value: 5,
    emoji: '🤩',
    label: '매우 좋음',
    description: '컨디션이 최고!',
    color: COLORS.PRIMARY,
  },
];

interface ConditionSelectorProps {
  selectedCondition: number | null;
  onConditionSelect: (condition: number) => void;
}

const ConditionSelector: React.FC<ConditionSelectorProps> = ({
  selectedCondition,
  onConditionSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 컨디션</Text>
      <Text style={styles.subtitle}>운동할 때 컨디션을 선택해주세요</Text>
      
      <View style={styles.optionsContainer}>
        {CONDITION_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              selectedCondition === option.value && styles.selectedOption,
            ]}
            onPress={() => onConditionSelect(option.value)}
            activeOpacity={0.7}
          >
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>{option.emoji}</Text>
            </View>
            
            <View style={styles.optionInfo}>
              <Text style={[
                styles.optionLabel,
                selectedCondition === option.value && styles.selectedOptionLabel,
              ]}>
                {option.label}
              </Text>
              <Text style={[
                styles.optionDescription,
                selectedCondition === option.value && styles.selectedOptionDescription,
              ]}>
                {option.description}
              </Text>
            </View>
            
            {selectedCondition === option.value && (
              <View style={[styles.checkIcon, { backgroundColor: option.color }]}>
                <Ionicons name="checkmark" size={16} color={COLORS.WHITE} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      {selectedCondition && (
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedInfoLabel}>선택된 컨디션:</Text>
          <View style={styles.selectedInfoContent}>
            <Text style={styles.selectedEmoji}>
              {CONDITION_OPTIONS.find(opt => opt.value === selectedCondition)?.emoji}
            </Text>
            <Text style={styles.selectedInfoText}>
              {CONDITION_OPTIONS.find(opt => opt.value === selectedCondition)?.label}
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
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  
  subtitle: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.LG,
  },
  
  optionsContainer: {
    gap: SPACING.MD,
  },
  
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.MD,
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    minHeight: 80,
  },
  
  selectedOption: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.PRIMARY + '10',
  },
  
  emojiContainer: {
    width: 50,
    height: 50,
    borderRadius: SPACING.RADIUS.ROUND,
    backgroundColor: COLORS.GRAY_100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.MD,
  },
  
  emoji: {
    fontSize: 24,
  },
  
  optionInfo: {
    flex: 1,
  },
  
  optionLabel: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
    marginBottom: SPACING.XS,
  },
  
  selectedOptionLabel: {
    color: COLORS.PRIMARY,
  },
  
  optionDescription: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  
  selectedOptionDescription: {
    color: COLORS.PRIMARY + '80',
  },
  
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: SPACING.RADIUS.ROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  selectedInfo: {
    marginTop: SPACING.LG,
    padding: SPACING.MD,
    backgroundColor: COLORS.PRIMARY + '10',
    borderRadius: SPACING.RADIUS.MD,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.PRIMARY,
  },
  
  selectedInfoLabel: {
    ...TEXT_STYLES.LABEL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SM,
  },
  
  selectedInfoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  selectedEmoji: {
    fontSize: 20,
    marginRight: SPACING.SM,
  },
  
  selectedInfoText: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.PRIMARY,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
  },
});

export default ConditionSelector;
