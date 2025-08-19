import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
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

  // 웹용 스크롤 컨테이너 - 간단하고 부드러운 스크롤
  const WebScrollContainer = ({ children }: { children: React.ReactNode }) => (
    <div
      style={{
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingBottom: SPACING.XL,
        // 부드러운 스크롤
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        // 스크롤바 스타일링
        scrollbarWidth: 'thin',
      } as any}
    >
      {children}
    </div>
  );

  // 모바일용 스크롤 컨테이너
  const MobileScrollContainer = ({ children }: { children: React.ReactNode }) => (
    <ScrollView 
      style={styles.scrollView} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      {children}
    </ScrollView>
  );

  // 플랫폼별 스크롤 컨테이너 선택
  const ScrollContainer = Platform.OS === 'web' ? WebScrollContainer : MobileScrollContainer;

  return (
    <View style={styles.container}>
      <ScrollContainer>
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
              onPress={() => {}}
              style={styles.button}
            />
            <CustomButton
              title="Disabled"
              variant="primary"
              disabled={true}
              onPress={() => {}}
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
              shadow="large" 
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
            네비게이션 헤더를 사용하여 뒤로가기 기능을 제공합니다.
            현재 화면 상단의 주황색 헤더가 네비게이션 헤더입니다.
          </Text>
          
          <View style={styles.headerDemo}>
            <View style={styles.headerInfo}>
              <Text style={styles.headerInfoTitle}>네비게이션 헤더 특징</Text>
              <Text style={styles.headerInfoText}>
                • 자동 뒤로가기 버튼 제공{'\n'}
                • Safe Area 자동 처리{'\n'}
                • 플랫폼별 최적화{'\n'}
                • 뒤로가기 제스처 지원
              </Text>
            </View>
          </View>
        </Card>

        {/* 추가 테스트 섹션 - 스크롤 확인용 */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>📱 추가 테스트</Text>
          <Text style={styles.sectionDescription}>
            스크롤이 제대로 작동하는지 확인하기 위한 추가 섹션입니다.
          </Text>
          
          <View style={styles.testGrid}>
            <CustomButton
              title="테스트 버튼 1"
              variant="primary"
              onPress={() => handleButtonPress('테스트 1')}
              style={styles.testButton}
            />
            <CustomButton
              title="테스트 버튼 2"
              variant="secondary"
              onPress={() => handleButtonPress('테스트 2')}
              style={styles.testButton}
            />
          </View>
          
          <Text style={styles.testText}>
            이 텍스트가 보인다면 스크롤이 정상적으로 작동하고 있습니다! 🎉
          </Text>
        </Card>

        {/* 웹 스크롤 테스트용 추가 콘텐츠 */}
        <Card padding="large" margin="medium" shadow="medium">
          <Text style={styles.sectionTitle}>🌐 웹 스크롤 테스트</Text>
          <Text style={styles.sectionDescription}>
            웹에서 마우스 휠 스크롤이 제대로 작동하는지 확인하기 위한 추가 콘텐츠입니다.
            아래로 스크롤해서 모든 카드를 확인해보세요!
          </Text>
          
          <View style={styles.webTestGrid}>
            {Array.from({ length: 8 }, (_, i) => (
              <Card key={i} padding="medium" shadow="small" style={styles.webTestCard}>
                <Text style={styles.webTestText}>웹 테스트 카드 {i + 1}</Text>
                <Text style={styles.webTestSubtext}>
                  이 카드들이 모두 보인다면 웹 스크롤이 정상 작동합니다!
                </Text>
              </Card>
            ))}
          </View>
          
          {/* 마우스 휠 테스트 안내 */}
          <Card padding="medium" margin="medium" shadow="small" style={styles.wheelTestCard}>
            <Text style={styles.wheelTestTitle}>🖱️ 마우스 휠 테스트</Text>
            <Text style={styles.wheelTestText}>
              이 섹션까지 마우스 휠로 스크롤할 수 있다면 성공입니다!
            </Text>
            <Text style={styles.wheelTestSubtext}>
              • 마우스 휠 위/아래로 스크롤
              • 터치패드 2손가락 스크롤
              • 키보드 방향키로도 테스트 가능
            </Text>
            
            {/* 스크롤 테스트 버튼들 */}
            <View style={styles.scrollTestButtons}>
              <CustomButton
                title="맨 위로"
                variant="primary"
                size="small"
                onPress={() => {
                  if (Platform.OS === 'web') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                style={styles.scrollButton}
              />
              <CustomButton
                title="맨 아래로"
                variant="secondary"
                size="small"
                onPress={() => {
                  if (Platform.OS === 'web') {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }
                }}
                style={styles.scrollButton}
              />
            </View>
          </Card>
        </Card>
      </ScrollContainer>

      {/* 오버레이 로딩 */}
      {showLoading && (
        <LoadingSpinner
          size="large"
          color="primary"
          overlay={true}
          text="로딩 중..."
        />
      )}
    </View>
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
  
  scrollContent: {
    paddingBottom: SPACING.XL, // 하단 여백 추가
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
  
  headerInfo: {
    padding: SPACING.MD,
  },
  headerInfoTitle: {
    ...TEXT_STYLES.H5,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  headerInfoText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 20,
  },
  
  // 추가 테스트용 스타일
  testGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.MD,
    gap: SPACING.SM,
  },
  
  testButton: {
    flex: 1,
  },
  
  testText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.SUCCESS,
    textAlign: 'center',
    marginTop: SPACING.MD,
    fontWeight: '600',
  },

  // 웹 스크롤 테스트용 스타일
  webTestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.MD,
    gap: SPACING.SM,
  },
  webTestCard: {
    flex: 1,
    minWidth: '48%', // 두 개씩 배치
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
    marginBottom: SPACING.SM,
  },
  webTestText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  webTestSubtext: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  wheelTestCard: {
    alignItems: 'center',
  },
  wheelTestTitle: {
    ...TEXT_STYLES.H4,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SM,
  },
  wheelTestText: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  wheelTestSubtext: {
    ...TEXT_STYLES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'left',
    lineHeight: 18,
  },
  scrollTestButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.MD,
    width: '100%',
    gap: SPACING.SM,
  },
  scrollButton: {
    flex: 1,
  },
});

export default ComponentTestScreen;
