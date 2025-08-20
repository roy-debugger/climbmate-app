import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

/**
 * 온보딩 관련 서비스
 * AsyncStorage를 사용하여 온보딩 완료 상태를 관리
 */
export class OnboardingService {
  private static readonly ONBOARDING_KEY = STORAGE_KEYS.ONBOARDING_COMPLETED;
  private static readonly ONBOARDING_VERSION = '1.0.0';

  /**
   * 온보딩 완료 여부 확인
   */
  static async isOnboardingCompleted(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(this.ONBOARDING_KEY);
      if (value) {
        const data = JSON.parse(value);
        // 버전 체크 (향후 온보딩 업데이트 시 사용)
        return data.version === this.ONBOARDING_VERSION && data.completed === true;
      }
      return false;
    } catch (error) {
      console.error('온보딩 상태 확인 실패:', error);
      return false;
    }
  }

  /**
   * 온보딩 완료로 표시
   */
  static async markOnboardingCompleted(): Promise<void> {
    try {
      const data = {
        completed: true,
        completedAt: new Date().toISOString(),
        version: this.ONBOARDING_VERSION,
      };
      await AsyncStorage.setItem(this.ONBOARDING_KEY, JSON.stringify(data));
      console.log('온보딩 완료 상태 저장됨');
    } catch (error) {
      console.error('온보딩 완료 상태 저장 실패:', error);
      throw error;
    }
  }

  /**
   * 온보딩 상태 초기화 (테스트용)
   */
  static async resetOnboarding(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.ONBOARDING_KEY);
      console.log('온보딩 상태 초기화됨');
    } catch (error) {
      console.error('온보딩 상태 초기화 실패:', error);
      throw error;
    }
  }

  /**
   * 온보딩 데이터 가져오기
   */
  static async getOnboardingData(): Promise<{
    completed: boolean;
    completedAt?: string;
    version: string;
  } | null> {
    try {
      const value = await AsyncStorage.getItem(this.ONBOARDING_KEY);
      if (value) {
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      console.error('온보딩 데이터 조회 실패:', error);
      return null;
    }
  }

  /**
   * 앱 최초 실행 여부 확인
   */
  static async isFirstLaunch(): Promise<boolean> {
    try {
      const onboardingData = await this.getOnboardingData();
      const appVersion = await AsyncStorage.getItem(STORAGE_KEYS.APP_VERSION);
      
      // 온보딩을 완료했거나 앱 버전이 저장되어 있으면 최초 실행이 아님
      if (onboardingData?.completed || appVersion) {
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('최초 실행 여부 확인 실패:', error);
      return true; // 에러 시 최초 실행으로 간주
    }
  }
}

export default OnboardingService;
