import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SPACING, FONTS, TEXT_STYLES } from '@/constants';

interface PhotoUploaderProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photos,
  onPhotosChange,
  maxPhotos = 3,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // 사진 선택 권한 요청
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        '권한 필요',
        '사진을 선택하려면 갤러리 접근 권한이 필요합니다.',
        [{ text: '확인' }]
      );
      return false;
    }
    return true;
  };

  // 사진 선택
  const pickImage = async () => {
    if (photos.length >= maxPhotos) {
      Alert.alert(
        '사진 개수 제한',
        `최대 ${maxPhotos}장까지 선택할 수 있습니다.`,
        [{ text: '확인' }]
      );
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      setIsLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newPhoto = result.assets[0].uri;
        onPhotosChange([...photos, newPhoto]);
      }
    } catch (error) {
      console.error('사진 선택 오류:', error);
      Alert.alert('오류', '사진을 선택하는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 사진 제거
  const removePhoto = (index: number) => {
    Alert.alert(
      '사진 삭제',
      '이 사진을 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            const newPhotos = photos.filter((_, i) => i !== index);
            onPhotosChange(newPhotos);
          },
        },
      ]
    );
  };

  // 사진 미리보기
  const renderPhotoPreview = (photo: string, index: number) => (
    <View key={index} style={styles.photoContainer}>
      <Image source={{ uri: photo }} style={styles.photo} />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removePhoto(index)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close-circle" size={24} color={COLORS.ERROR} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사진 추가</Text>
      <Text style={styles.subtitle}>
        운동 기록에 사진을 추가해보세요 (선택사항, 최대 {maxPhotos}장)
      </Text>

      {/* 사진 미리보기 */}
      {photos.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.photosContainer}
          style={styles.photosScrollView}
        >
          {photos.map((photo, index) => renderPhotoPreview(photo, index))}
        </ScrollView>
      )}

      {/* 사진 추가 버튼 */}
      {photos.length < maxPhotos && (
        <TouchableOpacity
          style={styles.addPhotoButton}
          onPress={pickImage}
          disabled={isLoading}
          activeOpacity={0.7}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Ionicons name="hourglass" size={24} color={COLORS.PRIMARY} />
              <Text style={styles.loadingText}>처리 중...</Text>
            </View>
          ) : (
            <>
              <Ionicons name="camera" size={24} color={COLORS.PRIMARY} />
              <Text style={styles.addPhotoText}>사진 추가</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* 사진 개수 표시 */}
      <View style={styles.photoCountContainer}>
        <Text style={styles.photoCountText}>
          {photos.length} / {maxPhotos} 장
        </Text>
      </View>

      {/* 사진 관련 팁 */}
      {photos.length === 0 && (
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 사진 추가 팁</Text>
          <Text style={styles.tipsText}>
            • 클라이밍한 문제나 성취한 순간을 기록해보세요{'\n'}
            • 사진은 나중에 운동 기록을 돌아볼 때 도움이 됩니다{'\n'}
            • 개인정보가 포함되지 않도록 주의해주세요
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
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XS,
  },
  
  subtitle: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.LG,
  },
  
  photosScrollView: {
    marginBottom: SPACING.MD,
  },
  
  photosContainer: {
    paddingHorizontal: SPACING.LAYOUT.SCREEN_PADDING,
    gap: SPACING.SM,
  },
  
  photoContainer: {
    position: 'relative',
  },
  
  photo: {
    width: 100,
    height: 100,
    borderRadius: SPACING.RADIUS.MD,
    backgroundColor: COLORS.GRAY_100,
  },
  
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACING.RADIUS.ROUND,
  },
  
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.LG,
    backgroundColor: COLORS.SURFACE,
    borderRadius: SPACING.RADIUS.MD,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    borderStyle: 'dashed',
    marginBottom: SPACING.MD,
  },
  
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  loadingText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.PRIMARY,
    marginLeft: SPACING.SM,
  },
  
  addPhotoText: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.PRIMARY,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
    marginLeft: SPACING.SM,
  },
  
  photoCountContainer: {
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  
  photoCountText: {
    ...TEXT_STYLES.LABEL,
    color: COLORS.TEXT_SECONDARY,
  },
  
  tipsContainer: {
    padding: SPACING.MD,
    backgroundColor: COLORS.INFO + '10',
    borderRadius: SPACING.RADIUS.MD,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.INFO,
  },
  
  tipsTitle: {
    ...TEXT_STYLES.BODY_LARGE,
    color: COLORS.INFO,
    fontWeight: FONTS.WEIGHTS.SEMI_BOLD,
    marginBottom: SPACING.SM,
  },
  
  tipsText: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: FONTS.LINE_HEIGHTS.RELAXED * FONTS.SIZES.SM,
  },
});

export default PhotoUploader;
