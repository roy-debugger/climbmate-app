import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { TEXT_STYLES } from '@/constants/typography';
import CustomButton from './CustomButton';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary 컴포넌트
 * 
 * Storage 에러 발생 시 앱 크래시 방지
 * 사용자 친화적 에러 메시지 표시
 * 자동 복구 메커니즘 제공
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // 에러 로깅
    console.error('ErrorBoundary에서 에러 발생:', error, errorInfo);

    // 부모 컴포넌트에 에러 전달
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // 개발 환경에서 Alert 표시
    if (__DEV__) {
      Alert.alert(
        '에러 발생',
        `ErrorBoundary에서 에러가 발생했습니다:\n${error.message}`,
        [{ text: '확인' }]
      );
    }
  }

  /**
   * 에러 복구 시도
   */
  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  /**
   * 앱 재시작 시뮬레이션
   */
  private handleRestart = () => {
    // 실제로는 앱 재시작 로직 구현
    // 현재는 상태만 초기화
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  /**
   * 에러 상세 정보 표시
   */
  private handleShowDetails = () => {
    if (this.state.error && this.state.errorInfo) {
      Alert.alert(
        '에러 상세 정보',
        `에러: ${this.state.error.message}\n\n스택: ${this.state.errorInfo.componentStack}`,
        [{ text: '확인' }]
      );
    }
  };

  /**
   * 기본 에러 UI 렌더링
   */
  private renderDefaultErrorUI() {
    const { error } = this.state;
    
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorContent}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>문제가 발생했습니다</Text>
          <Text style={styles.errorMessage}>
            {error?.message || '알 수 없는 오류가 발생했습니다.'}
          </Text>
          
          <View style={styles.errorActions}>
            <CustomButton
              title="다시 시도"
              variant="primary"
              onPress={this.handleRetry}
              style={styles.errorButton}
            />
            
            <CustomButton
              title="앱 재시작"
              variant="secondary"
              onPress={this.handleRestart}
              style={styles.errorButton}
            />
          </View>
          
          {__DEV__ && (
            <CustomButton
              title="에러 상세 정보"
              variant="outline"
              onPress={this.handleShowDetails}
              style={styles.detailsButton}
            />
          )}
        </View>
      </View>
    );
  }

  render() {
    if (this.state.hasError) {
      // 커스텀 fallback UI가 있으면 사용
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // 기본 에러 UI 렌더링
      return this.renderDefaultErrorUI();
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.XL,
  },
  errorContent: {
    alignItems: 'center',
    maxWidth: 300,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: SPACING.LG,
  },
  errorTitle: {
    ...TEXT_STYLES.H2,
    color: COLORS.ERROR,
    textAlign: 'center',
    marginBottom: SPACING.MD,
  },
  errorMessage: {
    ...TEXT_STYLES.BODY_MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.XL,
    lineHeight: 22,
  },
  errorActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: SPACING.LG,
    gap: SPACING.MD,
  },
  errorButton: {
    flex: 1,
  },
  detailsButton: {
    width: '100%',
  },
});

export default ErrorBoundary;
