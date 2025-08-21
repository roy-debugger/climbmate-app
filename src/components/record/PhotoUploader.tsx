import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { TEXT_STYLES } from '../../constants/typography';

interface PhotoUploaderProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photos,
  onPhotosChange,
  maxPhotos = 3,
}) => {
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        '권한 필요',
        '사진을 선택하려면 갤러리 접근 권한이 필요합니다.',
        [{ text: '설정으로 이동', onPress: () => {} }, { text: '취소', style: 'cancel' }]
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    if (photos.length >= maxPhotos) {
      Alert.alert('알림', `최대 ${maxPhotos}장까지 업로드할 수 있습니다.`);
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
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
      Alert.alert('오류', '사진을 선택하는 중 오류가 발생했습니다.');
    }
  };

  const takePhoto = async () => {
    if (photos.length >= maxPhotos) {
      Alert.alert('알림', `최대 ${maxPhotos}장까지 업로드할 수 있습니다.`);
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        '권한 필요',
        '사진을 촬영하려면 카메라 접근 권한이 필요합니다.',
        [{ text: '설정으로 이동', onPress: () => {} }, { text: '취소', style: 'cancel' }]
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newPhoto = result.assets[0].uri;
        onPhotosChange([...photos, newPhoto]);
      }
    } catch (error) {
      Alert.alert('오류', '사진을 촬영하는 중 오류가 발생했습니다.');
    }
  };

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

  const showImageOptions = () => {
    Alert.alert(
      '사진 추가',
      '사진을 추가하는 방법을 선택하세요',
      [
        { text: '갤러리에서 선택', onPress: pickImage },
        { text: '카메라로 촬영', onPress: takePhoto },
        { text: '취소', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사진 추가</Text>
      <Text style={styles.subtitle}>
        운동 기록에 사진을 추가해보세요 (최대 {maxPhotos}장)
      </Text>

      {/* 사진 그리드 */}
      <View style={styles.photoGrid}>
        {photos.map((photo, index) => (
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
        ))}

        {/* 사진 추가 버튼 */}
        {photos.length < maxPhotos && (
          <TouchableOpacity style={styles.addPhotoButton} onPress={showImageOptions}>
            <Ionicons name="add" size={32} color={COLORS.PRIMARY} />
            <Text style={styles.addPhotoText}>사진 추가</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 사진 개수 표시 */}
      <View style={styles.photoCountContainer}>
        <Text style={styles.photoCountText}>
          {photos.length} / {maxPhotos} 장
        </Text>
        {photos.length > 0 && (
          <TouchableOpacity
            style={styles.clearAllButton}
            onPress={() => {
              Alert.alert(
                '모든 사진 삭제',
                '업로드된 모든 사진을 삭제하시겠습니까?',
                [
                  { text: '취소', style: 'cancel' },
                  {
                    text: '삭제',
                    style: 'destructive',
                    onPress: () => onPhotosChange([]),
                  },
                ]
              );
            }}
          >
            <Text style={styles.clearAllText}>모두 삭제</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 사진 미리보기 (가로 스크롤) */}
      {photos.length > 0 && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>사진 미리보기</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.previewScrollContent}
          >
            {photos.map((photo, index) => (
              <View key={index} style={styles.previewPhotoContainer}>
                <Image source={{ uri: photo }} style={styles.previewPhoto} />
                <Text style={styles.previewPhotoNumber}>{index + 1}</Text>
              </View>
            ))}
          </ScrollView>
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
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.SM,
    marginBottom: SPACING.LG,
  },
  photoContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: SPACING.RADIUS.MD,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    ...SPACING.SHADOW.SM,
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    borderWidth: SPACING.BORDER.THICK,
    borderColor: COLORS.PRIMARY,
    borderStyle: 'dashed',
    borderRadius: SPACING.RADIUS.MD,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_LIGHT + '10',
  },
  addPhotoText: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.PRIMARY,
    marginTop: SPACING.XS,
    textAlign: 'center',
  },
  photoCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  photoCountText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
  },
  clearAllButton: {
    padding: SPACING.XS,
  },
  clearAllText: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.ERROR,
    textDecorationLine: 'underline',
  },
  previewContainer: {
    marginTop: SPACING.MD,
  },
  previewTitle: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  previewScrollContent: {
    paddingRight: SPACING.LAYOUT.SCREEN_PADDING,
  },
  previewPhotoContainer: {
    position: 'relative',
    marginRight: SPACING.SM,
  },
  previewPhoto: {
    width: 120,
    height: 90,
    borderRadius: SPACING.RADIUS.SM,
  },
  previewPhotoNumber: {
    position: 'absolute',
    top: SPACING.XS,
    left: SPACING.XS,
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
