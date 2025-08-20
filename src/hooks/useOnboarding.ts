import { useState, useEffect } from 'react';
import OnboardingService from '../services/OnboardingService';

/**
 * 온보딩 상태를 관리하는 커스텀 훅
 */
export const useOnboarding = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  /**
   * 온보딩 상태 확인
   */
  const checkOnboardingStatus = async () => {
    try {
      setIsLoading(true);
      const completed = await OnboardingService.isOnboardingCompleted();
      setIsOnboardingCompleted(completed);
    } catch (error) {
      console.error('온보딩 상태 확인 실패:', error);
      setIsOnboardingCompleted(false);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 온보딩 완료 처리
   */
  const completeOnboarding = async () => {
    try {
      await OnboardingService.markOnboardingCompleted();
      setIsOnboardingCompleted(true);
      return true;
    } catch (error) {
      console.error('온보딩 완료 처리 실패:', error);
      return false;
    }
  };

  /**
   * 온보딩 상태 초기화 (테스트용)
   */
  const resetOnboarding = async () => {
    try {
      await OnboardingService.resetOnboarding();
      setIsOnboardingCompleted(false);
      return true;
    } catch (error) {
      console.error('온보딩 상태 초기화 실패:', error);
      return false;
    }
  };

  /**
   * 앱 최초 실행 여부 확인
   */
  const checkFirstLaunch = async (): Promise<boolean> => {
    try {
      return await OnboardingService.isFirstLaunch();
    } catch (error) {
      console.error('최초 실행 여부 확인 실패:', error);
      return true;
    }
  };

  return {
    isOnboardingCompleted,
    isLoading,
    completeOnboarding,
    resetOnboarding,
    checkFirstLaunch,
    checkOnboardingStatus,
  };
};
