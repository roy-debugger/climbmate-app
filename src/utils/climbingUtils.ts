import { COLORS } from '../constants';

// 등반 난이도 정보
export interface ClimbingLevel {
  color: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  gradient: string[];
}

// ProfileCompleteScreen과 동일한 CLIMBING_LEVELS 사용
export const CLIMBING_LEVELS: ClimbingLevel[] = [
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

// 등급별 색상 반환
export const getGradeColor = (grade: string): string => {
  const gradeColors: { [key: string]: string } = {
    '흰색': '#FFFFFF',
    '노랑': '#FFD700',
    '주황': '#FF8C00',
    '초록': '#32CD32',
    '파랑': '#4169E1',
    '빨강': '#DC143C',
    '보라': '#8A2BE2',
    '회색': '#808080',
    '갈색': '#8B4513',
    '검정': '#000000',
  };
  return gradeColors[grade] || COLORS.GRAY_300;
};

// 등급별 난이도 레벨 반환
export const getGradeLevel = (grade: string): 'beginner' | 'intermediate' | 'advanced' => {
  const level = CLIMBING_LEVELS.find(level => level.name === grade);
  return level?.level || 'beginner';
};

// 난이도별 색상 반환 (UI 표시용)
export const getDifficultyColor = (level: string): string => {
  switch (level) {
    case 'beginner': return COLORS.SUCCESS;
    case 'intermediate': return COLORS.INFO;
    case 'advanced': return COLORS.WARNING;
    default: return COLORS.TEXT_SECONDARY;
  }
};

// 난이도별 라벨 반환
export const DIFFICULTY_LABELS = {
  beginner: '초급',
  intermediate: '중급',
  advanced: '고급',
} as const;
