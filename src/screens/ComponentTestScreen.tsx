import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { TEXT_STYLES } from '@/constants/typography';
import {
  CustomButton,
  CustomInput,
  LoadingSpinner,
  Card,
  Header,
} from '@/components/common';

/**
 * 컴포넌트 테스트 화면
 * 
 * 모든 공통 컴포넌트를 테스트하고 예시를 확인할 수 있는 화면
 * Storybook 스타일의 컴포넌트 갤러리
 */
const ComponentTestScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  // 이메일 유효성 검사
  const validateEmail = (text: string) => {
    setEmail(text);
    if (text && !/\S+@\S+\.\S+/.test(text)) {
      setEmailError('올바른 이메일 형식이 아닙니다');
    } else {
      setEmailError('');
    }
  };

  // 로딩 테스트
  const handleLoadingTest = () => {
    setShowLoading(true);
    setTimeout(() => setShowLoading(false), 3000);
  };

  // 버튼 클릭 핸들러
  const handleButtonPress = (title: string) => {
    Alert.alert('버튼 클릭', `${title} 버튼이 클릭되었습니다!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="컴포넌트 테스트"
        showBackButton={true}
        onBackPress={() => Alert.alert('뒤로가기', '뒤로가기 버튼이 클릭되었습니다!')}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* CustomButton 테스트 */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>🎯 CustomButton</Text>
          <Text style={styles.sectionDescription}>
            3가지 variant와 다양한 크기를 지원하는 버튼 컴포넌트
          </Text>
          
          <View style={styles.buttonGrid}>
            <CustomButton
              title="Primary"
              variant="primary"
              onPress={() => handleButtonPress('Primary')}
              style={styles.button}
            />
            <CustomButton
              title="Secondary"
              variant="secondary"
              onPress={() => handleButtonPress('Secondary')}
              style={styles.button}
            />
            <CustomButton
              title="Outline"
              variant="outline"
              onPress={() => handleButtonPress('Outline')}
              style={styles.button}
            />
          </View>
          
          <View style={styles.buttonGrid}>
            <CustomButton
              title="Small"
              size="small"
              variant="primary"
              onPress={() => handleButtonPress('Small')}
              style={styles.button}
            />
            <CustomButton
              title="Medium"
              size="medium"
              variant="primary"
              onPress={() => handleButtonPress('Medium')}
              style={styles.button}
            />
            <CustomButton
              title="Large"
              size="large"
              variant="primary"
              onPress={() => handleButtonPress('Large')}
              style={styles.button}
            />
          </View>
          
          <View style={styles.buttonGrid}>
            <CustomButton
              title="Loading"
              variant="primary"
              loading={true}
              style={styles.button}
            />
            <CustomButton
              title="Disabled"
              variant="primary"
              disabled={true}
              style={styles.button}
            />
            <CustomButton
              title="Full Width"
              variant="primary"
              fullWidth={true}
              onPress={() => handleButtonPress('Full Width')}
              style={styles.button}
            />
          </View>
        </Card>

        {/* CustomInput 테스트 */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>📝 CustomInput</Text>
          <Text style={styles.sectionDescription}>
            에러 상태, 아이콘, 포커스 애니메이션을 지원하는 입력 필드
          </Text>
          
          <CustomInput
            placeholder="이름을 입력하세요"
            value={name}
            onChangeText={setName}
            leftIcon={<Text style={styles.icon}>👤</Text>}
            style={styles.input}
          />
          
          <CustomInput
            placeholder="이메일을 입력하세요"
            value={email}
            onChangeText={validateEmail}
            type="email"
            leftIcon={<Text style={styles.icon}>📧</Text>}
            error={emailError}
            style={styles.input}
          />
          
          <CustomInput
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChangeText={setPassword}
            type="password"
            leftIcon={<Text style={styles.icon}>🔒</Text>}
            style={styles.input}
          />
          
          <CustomInput
            placeholder="전화번호를 입력하세요"
            value=""
            onChangeText={() => {}}
            type="phone"
            leftIcon={<Text style={styles.icon}>📱</Text>}
            style={styles.input}
          />
        </Card>

        {/* LoadingSpinner 테스트 */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>⏳ LoadingSpinner</Text>
          <Text style={styles.sectionDescription}>
            다양한 크기와 색상을 지원하는 로딩 스피너
          </Text>
          
          <View style={styles.spinnerGrid}>
            <View style={styles.spinnerItem}>
              <LoadingSpinner size="small" color="primary" />
              <Text style={styles.spinnerLabel}>Small</Text>
            </View>
            
            <View style={styles.spinnerItem}>
              <LoadingSpinner size="medium" color="secondary" />
              <Text style={styles.spinnerLabel}>Medium</Text>
            </View>
            
            <View style={styles.spinnerItem}>
              <LoadingSpinner size="large" color="primary" />
              <Text style={styles.spinnerLabel}>Large</Text>
            </View>
            
            <View style={styles.spinnerItem}>
              <LoadingSpinner size="xlarge" color="secondary" />
              <Text style={styles.spinnerLabel}>XLarge</Text>
            </View>
          </View>
          
          <CustomButton
            title="오버레이 로딩 테스트 (3초)"
            variant="primary"
            onPress={handleLoadingTest}
            style={styles.button}
          />
        </Card>

        {/* Card 테스트 */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>🃏 Card</Text>
          <Text style={styles.sectionDescription}>
            유연한 패딩, 마진, 그림자, 테두리를 지원하는 카드 컨테이너
          </Text>
          
          <View style={styles.cardGrid}>
            <Card padding="small" shadow="small" style={styles.demoCard}>
              <Text style={styles.demoCardText}>Small Padding</Text>
            </Card>
            
            <Card padding="medium" shadow="medium" style={styles.demoCard}>
              <Text style={styles.demoCardText}>Medium Padding</Text>
            </Card>
            
            <Card padding="large" shadow="large" style={styles.demoCard}>
              <Text style={styles.demoCardText}>Large Padding</Text>
            </Card>
          </View>
          
          <View style={styles.cardGrid}>
            <Card 
              padding="medium" 
              shadow="none" 
              borderColor={COLORS.PRIMARY}
              borderWidth={2}
              style={styles.demoCard}
            >
              <Text style={styles.demoCardText}>테두리만</Text>
            </Card>
            
            <Card 
              padding="medium" 
              shadow="xl" 
              borderRadius="round"
              backgroundColor={COLORS.PRIMARY}
              style={styles.demoCard}
            >
              <Text style={[styles.demoCardText, { color: COLORS.WHITE }]}>
                둥근 모서리
              </Text>
            </Card>
          </View>
        </Card>

        {/* Header 테스트 */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>📱 Header</Text>
          <Text style={styles.sectionDescription}>
            Safe Area 처리, 뒤로가기 버튼, 커스텀 오른쪽 컴포넌트를 지원하는 헤더
          </Text>
          
          <View style={styles.headerDemo}>
            <Header
              title="커스텀 헤더"
              showBackButton={true}
              onBackPress={() => Alert.alert('뒤로가기', '뒤로가기 버튼이 클릭되었습니다!')}
              rightComponent={
                <CustomButton
                  title="편집"
                  variant="outline"
                  size="small"
                  onPress={() => Alert.alert('편집', '편집 버튼이 클릭되었습니다!')}
                />
              }
              backgroundColor={COLORS.PRIMARY}
              titleColor={COLORS.WHITE}
            />
          </View>
        </Card>
      </ScrollView>

      {/* 오버레이 로딩 */}
      {showLoading && (
        <LoadingSpinner
          size="large"
          color="primary"
          overlay={true}
          text="로딩 중..."
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  
  scrollView: {
    flex: 1,
  },
  
  sectionTitle: {
    ...TEXT_STYLES.H3,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  
  sectionDescription: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.LG,
    lineHeight: 20,
  },
  
  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.MD,
    gap: SPACING.SM,
  },
  
  button: {
    flex: 1,
  },
  
  input: {
    marginBottom: SPACING.MD,
  },
  
  icon: {
    fontSize: 20,
  },
  
  spinnerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.LG,
  },
  
  spinnerItem: {
    alignItems: 'center',
  },
  
  spinnerLabel: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.SM,
  },
  
  cardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.MD,
    gap: SPACING.SM,
  },
  
  demoCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  
  demoCardText: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  
  headerDemo: {
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    borderRadius: SPACING.RADIUS.MD,
    overflow: 'hidden',
  },
});

export default ComponentTestScreen;
