import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, ClimbingSession, ClimbingGym } from '@/types';

// 웹 호환성을 위한 storage 설정
const getStorage = () => {
  if (typeof window !== 'undefined') {
    // 웹 환경
    return {
      getItem: (name: string) => {
        try {
          const item = window.localStorage.getItem(name);
          return item ? Promise.resolve(item) : Promise.resolve(null);
        } catch (error) {
          return Promise.resolve(null);
        }
      },
      setItem: (name: string, value: string) => {
        try {
          window.localStorage.setItem(name, value);
          return Promise.resolve();
        } catch (error) {
          return Promise.resolve();
        }
      },
      removeItem: (name: string) => {
        try {
          window.localStorage.removeItem(name);
          return Promise.resolve();
        } catch (error) {
          return Promise.resolve();
        }
      },
    };
  }
  // React Native 환경
  return AsyncStorage;
};

// Auth Store
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      login: (user: User, token: string) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      updateUser: (userData: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => getStorage()),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Sessions Store
interface SessionsState {
  sessions: ClimbingSession[];
  currentSession: ClimbingSession | null;
  isLoading: boolean;
  error: string | null;
  fetchSessions: () => Promise<void>;
  addSession: (session: ClimbingSession) => void;
  updateSession: (id: string, updates: Partial<ClimbingSession>) => void;
  deleteSession: (id: string) => void;
  setCurrentSession: (session: ClimbingSession | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSessionsStore = create<SessionsState>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSession: null,
      isLoading: false,
      error: null,
      fetchSessions: async () => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement API call
          // const response = await api.getSessions();
          // set({ sessions: response.data, isLoading: false });
          set({ isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch sessions', isLoading: false });
        }
      },
      addSession: (session: ClimbingSession) =>
        set((state) => ({
          sessions: [session, ...state.sessions],
        })),
      updateSession: (id: string, updates: Partial<ClimbingSession>) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === id ? { ...session, ...updates } : session
          ),
        })),
      deleteSession: (id: string) =>
        set((state) => ({
          sessions: state.sessions.filter((session) => session.id !== id),
        })),
      setCurrentSession: (session: ClimbingSession | null) =>
        set({ currentSession: session }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
    }),
    {
      name: 'sessions-storage',
      storage: createJSONStorage(() => getStorage()),
      partialize: (state) => ({
        sessions: state.sessions,
        currentSession: state.currentSession,
      }),
    }
  )
);

// Gyms Store
interface GymsState {
  gyms: ClimbingGym[];
  nearbyGyms: ClimbingGym[];
  selectedGym: ClimbingGym | null;
  isLoading: boolean;
  error: string | null;
  fetchGyms: () => Promise<void>;
  fetchNearbyGyms: (latitude: number, longitude: number) => Promise<void>;
  setSelectedGym: (gym: ClimbingGym | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useGymsStore = create<GymsState>()(
  persist(
    (set, get) => ({
      gyms: [],
      nearbyGyms: [],
      selectedGym: null,
      isLoading: false,
      error: null,
      fetchGyms: async () => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement API call
          // const response = await api.getGyms();
          // set({ gyms: response.data, isLoading: false });
          set({ isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch gyms', isLoading: false });
        }
      },
      fetchNearbyGyms: async (latitude: number, longitude: number) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement API call
          // const response = await api.getNearbyGyms(latitude, longitude);
          // set({ nearbyGyms: response.data, isLoading: false });
          set({ isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch nearby gyms', isLoading: false });
        }
      },
      setSelectedGym: (gym: ClimbingGym | null) => set({ selectedGym: gym }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
    }),
    {
      name: 'gyms-storage',
      storage: createJSONStorage(() => getStorage()),
      partialize: (state) => ({
        gyms: state.gyms,
        nearbyGyms: state.nearbyGyms,
        selectedGym: state.selectedGym,
      }),
    }
  )
);

// UI Store
interface UIState {
  theme: 'light' | 'dark';
  language: 'ko' | 'en';
  isLoading: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'ko' | 'en') => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'ko',
      isLoading: false,
      setTheme: (theme: 'light' | 'dark') => set({ theme }),
      setLanguage: (language: 'ko' | 'en') => set({ language }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => getStorage()),
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);

// Root Store (combines all stores)
export const useRootStore = () => ({
  auth: useAuthStore(),
  sessions: useSessionsStore(),
  gyms: useGymsStore(),
  ui: useUIStore(),
});
