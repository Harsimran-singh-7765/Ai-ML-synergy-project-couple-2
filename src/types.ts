export interface Game {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  instructions: string;
  thumbnailUrl: string;
  projectId: string;
  featured: boolean;
  type: 'scratch' | 'embed' | 'gameflare';
}

export interface Theme {
  isDark: boolean;
  toggle: () => void;
}

export interface CoupleNames {
  partner1: string;
  partner2: string;
}