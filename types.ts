
export enum Category {
  TECH = 'Technology',
  BUSINESS = 'Business',
  HEALTH = 'Health',
  LAW = 'Law',
  DESIGN = 'Design',
  SCIENCE = 'Science',
  OTHER = 'Other'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  expertise: Category[];
  bio: string;
  location: string;
}

export interface Solution {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: number;
  upvotes: number;
  isExpertSolution: boolean;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  category: Category;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  timestamp: number;
  solutions: Solution[];
  location?: {
    lat: number;
    lng: number;
    city?: string;
  };
  genuinenessScore: number; // 0-100 provided by AI
  tags: string[];
}

export interface AppState {
  currentUser: User | null;
  problems: Problem[];
  isPostModalOpen: boolean;
}
