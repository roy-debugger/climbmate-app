// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  profileImage?: string;
  climbingLevel: ClimbingLevel;
  joinDate: Date;
  totalSessions: number;
  favoriteGyms: string[];
}

export type ClimbingLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// Climbing session types
export interface ClimbingSession {
  id: string;
  userId: string;
  gymId: string;
  date: Date;
  duration: number; // in minutes
  routes: ClimbingRoute[];
  notes?: string;
  photos?: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface ClimbingRoute {
  id: string;
  name: string;
  grade: string;
  type: RouteType;
  attempts: number;
  completed: boolean;
  notes?: string;
}

export type RouteType = 'boulder' | 'sport' | 'trad' | 'toprope';

// Gym related types
export interface ClimbingGym {
  id: string;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  phone?: string;
  website?: string;
  rating: number;
  totalRatings: number;
  facilities: string[];
  openingHours: OpeningHours;
  photos: string[];
}

export interface OpeningHours {
  monday: TimeRange;
  tuesday: TimeRange;
  wednesday: TimeRange;
  thursday: TimeRange;
  friday: TimeRange;
  saturday: TimeRange;
  sunday: TimeRange;
}

export interface TimeRange {
  open: string; // HH:MM format
  close: string; // HH:MM format
  closed: boolean;
}

// Navigation types
export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Profile: { userId: string };
  SessionDetail: { sessionId: string };
  GymDetail: { gymId: string };
  AddSession: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Sessions: undefined;
  Gyms: undefined;
  Profile: undefined;
};

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SessionForm {
  gymId: string;
  date: Date;
  duration: number;
  notes?: string;
  photos?: string[];
}
