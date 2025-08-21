import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { TEXT_STYLES } from '../../constants/typography';

// 서울 주요 암장 데이터
const SEOUL_GYMS = [
  { id: '1', name: '클라이밍 파크 홍대점', address: '서울 마포구 홍대로 396', isFavorite: false },
  { id: '2', name: '클라이밍 파크 강남점', address: '서울 강남구 테헤란로 501', isFavorite: false },
  { id: '3', name: '클라이밍 파크 잠실점', address: '서울 송파구 올림픽로 240', isFavorite: false },
  { id: '4', name: '클라이밍 파크 신촌점', address: '서울 서대문구 연세로 50', isFavorite: false },
  { id: '5', name: '클라이밍 파크 건대점', address: '서울 광진구 능동로 120', isFavorite: false },
  { id: '6', name: '클라이밍 파크 목동점', address: '서울 양천구 목동로 167', isFavorite: false },
  { id: '7', name: '클라이밍 파크 분당점', address: '경기 성남시 분당구 정자로 178', isFavorite: false },
  { id: '8', name: '클라이밍 파크 일산점', address: '경기 고양시 일산동구 중앙로 1234', isFavorite: false },
  { id: '9', name: '클라이밍 파크 부천점', address: '경기 부천시 원미구 부천로 123', isFavorite: false },
  { id: '10', name: '클라이밍 파크 수원점', address: '경기 수원시 팔달구 인계로 123', isFavorite: false },
];

interface Gym {
  id: string;
  name: string;
  address: string;
  isFavorite: boolean;
}

interface GymSelectorProps {
  selectedGym: Gym | null;
  onGymSelect: (gym: Gym) => void;
  onClose: () => void;
}

export const GymSelector: React.FC<GymSelectorProps> = ({
  selectedGym,
  onGymSelect,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gyms, setGyms] = useState<Gym[]>(SEOUL_GYMS);

  // 즐겨찾기 토글
  const toggleFavorite = (gymId: string) => {
    setGyms(prevGyms =>
      prevGyms.map(gym =>
        gym.id === gymId ? { ...gym, isFavorite: !gym.isFavorite } : gym
      )
    );
  };

  // 검색 및 즐겨찾기 필터링
  const filteredGyms = useMemo(() => {
    const filtered = gyms.filter(gym =>
      gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gym.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 즐겨찾기 암장을 상단에 배치
    return filtered.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0;
    });
  }, [gyms, searchQuery]);

  const handleGymSelect = (gym: Gym) => {
    onGymSelect(gym);
    onClose();
  };

  const renderGymItem = ({ item }: { item: Gym }) => (
    <TouchableOpacity
      style={[
        styles.gymItem,
        selectedGym?.id === item.id && styles.selectedGymItem,
      ]}
      onPress={() => handleGymSelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.gymInfo}>
        <Text style={styles.gymName}>{item.name}</Text>
        <Text style={styles.gymAddress}>{item.address}</Text>
      </View>
      
      <View style={styles.gymActions}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={item.isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={item.isFavorite ? COLORS.ERROR : COLORS.TEXT_SECONDARY}
          />
        </TouchableOpacity>
        
        {selectedGym?.id === item.id && (
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={COLORS.SUCCESS}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>암장 선택</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>

      {/* 검색바 */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.TEXT_SECONDARY} />
        <TextInput
          style={styles.searchInput}
          placeholder="암장명 또는 주소로 검색"
          placeholderTextColor={COLORS.TEXT_DISABLED}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color={COLORS.TEXT_SECONDARY} />
          </TouchableOpacity>
        )}
      </View>

      {/* 암장 리스트 */}
      <FlatList
        data={filteredGyms}
        renderItem={renderGymItem}
        keyExtractor={item => item.id}
        style={styles.gymList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gymListContent}
      />

      {/* 선택된 암장 표시 */}
      {selectedGym && (
        <View style={styles.selectedGymContainer}>
          <Text style={styles.selectedGymLabel}>선택된 암장:</Text>
          <Text style={styles.selectedGymName}>{selectedGym.name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.LAYOUT.SCREEN_PADDING,
    borderBottomWidth: SPACING.BORDER.THIN,
    borderBottomColor: COLORS.GRAY_200,
    backgroundColor: COLORS.SURFACE,
  },
  headerTitle: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
  },
  closeButton: {
    padding: SPACING.XS,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SPACING.LAYOUT.SCREEN_PADDING,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    backgroundColor: COLORS.GRAY_100,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: SPACING.BORDER.THIN,
    borderColor: COLORS.GRAY_200,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.SM,
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
  },
  clearButton: {
    padding: SPACING.XS,
  },
  gymList: {
    flex: 1,
  },
  gymListContent: {
    paddingHorizontal: SPACING.LAYOUT.SCREEN_PADDING,
    paddingBottom: SPACING.LAYOUT.SCREEN_PADDING,
  },
  gymItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.MD,
    marginBottom: SPACING.SM,
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: SPACING.BORDER.THIN,
    borderColor: COLORS.GRAY_200,
    ...SPACING.SHADOW.SM,
  },
  selectedGymItem: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.PRIMARY_LIGHT + '10',
  },
  gymInfo: {
    flex: 1,
    marginRight: SPACING.MD,
  },
  gymName: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  gymAddress: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
  },
  gymActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  favoriteButton: {
    padding: SPACING.XS,
  },
  selectedGymContainer: {
    padding: SPACING.LAYOUT.SCREEN_PADDING,
    backgroundColor: COLORS.SURFACE,
    borderTopWidth: SPACING.BORDER.THIN,
    borderTopColor: COLORS.GRAY_200,
  },
  selectedGymLabel: {
    ...TEXT_STYLES.LABEL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XS,
  },
  selectedGymName: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
});
