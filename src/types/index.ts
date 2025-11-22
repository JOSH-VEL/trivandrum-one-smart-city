export interface User {
  id: string;
  phone: string;
  name: string;
  preferredArea?: string;
  totalCoins: number;
  dailyCoins?: number;
  lastRewardDate?: string;
  createdAt: string;
  role: 'user' | 'admin';
}

export interface Campaign {
  id: string;
  title: string;
  brandId: string;
  description: string;
  active: boolean;
  extraRewardEnabled: boolean;
  instagramShareBonus?: number;
  maxDailyReward?: number;
  createdAt: string;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  images: string[];
  phone?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
}

export interface QREvent {
  id: string;
  campaignId: string;
  userId: string;
  ip?: string;
  deviceId?: string;
  scannedAt: string;
}

export interface RewardTransaction {
  id: string;
  userId: string;
  campaignId?: string;
  type: 'QR' | 'INSTAGRAM' | 'ADMIN';
  coins: number;
  createdAt: string;
  note?: string;
}

export interface Place {
  id: string;
  name: string;
  category: 'food' | 'emergency' | 'tourist' | 'medicine' | 'shopping' | 'transport' | 'hotel';
  area: string;
  description: string;
  latitude: number;
  longitude: number;
  timing?: string;
  phone?: string;
  address?: string;
  images?: string[];
}

export type CategoryType = Place['category'];
