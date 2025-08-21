import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, TEXT_STYLES } from '@/constants';

// 서울 주요 암장 데이터
const SEOUL_GYMS = [
  { id: '1', name: '클라이밍 파크 홍대점', address: '서울 마포구 홍대로 3길 20', favorite: false },
  { id: '2', name: '클라이밍 파크 강남점', address: '서울 강남구 테헤란로 501', favorite: false },
  { id: '3', name: '클라이밍 파크 잠실점', address: '서울 송파구 올림픽로 25', favorite: false },
  { id: '4', name: '클라이밍 파크 신촌점', address: '서울 서대문구 신촌로 129', favorite: false },
  { id: '5', name: '클라이밍 파크 건대점', address: '서울 광진구 능동로 120', favorite: false },
  { id: '6', name: '클라이밍 파크 합정점', address: '서울 마포구 합정로 35', favorite: false },
  { id: '7', name: '클라이밍 파크 성수점', address: '서울 성동구 성수동1가 685', favorite: false },
  { id: '8', name: '클라이밍 파크 연신내점', address: '서울 은평구 연서로 50', favorite: false },
  { id: '9', name: '클라이밍 파크 신림점', address: '서울 관악구 신림로 59', favorite: false },
  { id: '10', name: '클라이밍 파크 목동점', address: '서울 양천구 목동동로 167', favorite: false },
];

interface Gym {
  id: string;
  name: string;
  address: string;
  favorite: boolean;
}

interface GymSelectorProps {
  selectedGym: Gym | null;
  onGymSelect: (gym: Gym) => void;
  onClose: () => void;
}

const GymSelector: React.FC<GymSelectorProps> = ({
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
        gym.id === gymId ? { ...gym, favorite: !gym.favorite } : gym
      )
    );
  };

  // 검색 및 정렬된 암장 리스트
  const filteredGyms = useMemo(() => {
    const filtered = gyms.filter(gym =>
      gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gym.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 즐겨찾기 우선 정렬
    return filtered.sort((a, b) => {
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [gyms, searchQuery]);

  // 암장 선택
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
      
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons
          name={item.favorite ? 'heart' : 'heart-outline'}
          size={20}
          color={item.favorite ? COLORS.ERROR : COLORS.GRAY_400}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>암장 선택</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>

      {/* 검색바 */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.GRAY_400} />
        <TextInput
          style={styles.searchInput}
          placeholder="암장명 또는 주소로 검색"
          placeholderTextColor={COLORS.GRAY_400}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color={COLORS.GRAY_400} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.LAYOUT.SCREEN_PADDING,
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_200,
    backgroundColor: COLORS.SURFACE,
  },
  
  title: {
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
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  
  searchInput: {
    flex: 1,
    marginLeft: SPACING.SM,
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
  },
  
  clearButton: {
    marginLeft: SPACING.SM,
  },
  
  gymList: {
    flex: 1,
  },
  
  gymListContent: {
    paddingHorizontal: SPACING.LAYOUT.SCREEN_PADDING,
    paddingBottom: SPACING.LG,
  },
  
  gymItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.MD,
    marginBottom: SPACING.SM,
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  
  selectedGymItem: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.PRIMARY_LIGHT + '10',
  },
  
  gymInfo: {
    flex: 1,
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
  
  favoriteButton: {
    padding: SPACING.XS,
  },
  
  selectedGymContainer: {
    padding: SPACING.MD,
    backgroundColor: COLORS.PRIMARY + '10',
    borderTopWidth: 1,
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
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
  },
});

export default GymSelector;
