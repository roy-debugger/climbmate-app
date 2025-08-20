import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COLORS, SPACING, FONTS } from './constants';
import { ClimbingLevel } from './types';

export type { ClimbingLevel };

interface LevelSelectorProps {
  selectedLevel: ClimbingLevel | null;
  onLevelSelect: (level: ClimbingLevel) => void;
}

interface LevelOption {
  value: ClimbingLevel;
  title: string;
  description: string;
  color: string;
}

const LEVEL_OPTIONS: LevelOption[] = [
  {
    value: 'beginner',
    title: '초급',
    description: '처음 시작하는\n클라이머',
    color: COLORS.SUCCESS,
  },
  {
    value: 'intermediate',
    title: '중급',
    description: '기본기를 갖춘\n클라이머',
    color: COLORS.WARNING,
  },
  {
    value: 'advanced',
    title: '고급',
    description: '고난도 루트\n도전하는 클라이머',
    color: COLORS.ERROR,
  },
];

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  selectedLevel,
  onLevelSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>클라이밍 레벨을 선택해주세요</Text>
      <View style={styles.optionsContainer}>
        {LEVEL_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              {
                borderColor: option.color,
                backgroundColor: selectedLevel === option.value 
                  ? `${option.color}20` 
                  : COLORS.SURFACE,
              },
            ]}
            onPress={() => onLevelSelect(option.value)}
          >
            <View style={[styles.colorIndicator, { backgroundColor: option.color }]} />
            <Text style={[styles.optionTitle, { color: option.color }]}>
              {option.title}
            </Text>
            <Text style={styles.optionDescription}>
              {option.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.LG,
  },
  label: {
    fontSize: FONTS.LG,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.LG,
  },
  optionsContainer: {
    gap: SPACING.MD,
  },
  option: {
    borderWidth: 2,
    borderRadius: SPACING.MD,
    padding: SPACING.LG,
    alignItems: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: SPACING.SM,
  },
  optionTitle: {
    fontSize: FONTS.LG,
    fontWeight: '700',
    marginBottom: SPACING.XS,
  },
  optionDescription: {
    fontSize: FONTS.SM,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: FONTS.SM * 1.4,
  },
});
