import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export type ClimbingLevel = 'beginner' | 'intermediate' | 'advanced';

interface SimpleLevelSelectorProps {
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
    color: '#4CAF50',
  },
  {
    value: 'intermediate',
    title: '중급',
    description: '기본기를 갖춘\n클라이머',
    color: '#FF9800',
  },
  {
    value: 'advanced',
    title: '고급',
    description: '고난도 루트\n도전하는 클라이머',
    color: '#F44336',
  },
];

export const SimpleLevelSelector: React.FC<SimpleLevelSelectorProps> = ({
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
              styles.optionCard,
              selectedLevel === option.value && styles.selectedCard,
              { borderColor: option.color },
            ]}
            onPress={() => onLevelSelect(option.value)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.levelIndicator,
                { backgroundColor: option.color },
              ]}
            />
            <Text style={styles.optionTitle}>{option.title}</Text>
            <Text style={styles.optionDescription}>{option.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  optionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 3,
    backgroundColor: '#F8F9FA',
    shadowOpacity: 0.2,
    elevation: 4,
  },
  levelIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
});
