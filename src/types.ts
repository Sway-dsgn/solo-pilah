export type UserRole = 'Masyarakat' | 'Petugas' | 'BankSampah';

export type ScreenType =
  | 'onboarding'
  | 'login'
  | 'dashboard'
  | 'scan'
  | 'schedule'
  | 'map'
  | 'guide'
  | 'report'
  | 'history'
  | 'rewards'
  | 'profile';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  points: number;
  avatar: string;
  phone: string;
  address: string;
  ecoRank: string;
  totalWasteSubmitted: number; // in kg
  streak: number;
  lastActiveDate: string;
}

export interface WasteCategory {
  id: string;
  name: string;
  indonesianName: string;
  color: string;
  bgLight: string;
  icon: string;
  description: string;
  examples: string[];
  tips: string[];
}

export interface WasteReport {
  id: string;
  title: string;
  description: string;
  locationName: string;
  coordinates: { x: number; y: number }; // Relative percentage on mock map
  imageUrl: string;
  status: 'Menunggu' | 'Diverifikasi' | 'Diproses' | 'Selesai';
  date: string;
  reportedBy: string;
  wasteType: string;
  officerName?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  pointsAwarded?: number;
}

export interface BankSampahLocation {
  id: string;
  name: string;
  type: 'Bank Sampah' | 'TPS' | 'TPA';
  address: string;
  distance: string;
  hours: string;
  phone: string;
  acceptedTypes: string[];
  rates: { [key: string]: number }; // Points per kg
  coordinates: { x: number; y: number }; // percentage on the mock map
}

export interface PickupSchedule {
  id: string;
  day: string;
  kecamatan: string;
  wasteType: string;
  time: string;
  officerName: string;
  officerVehicle: string;
  status: 'Akan Datang' | 'Selesai' | 'Batal';
}

export interface RewardItem {
  id: string;
  title: string;
  pointsCost: number;
  category: 'Transportasi' | 'Voucher' | 'Voucher UMKM' | 'Kebutuhan' | 'Merchandise';
  description: string;
  imageUrl: string;
  partner: string;
}

export interface EnvironmentalFact {
  id: string;
  title: string;
  snippet: string;
  fullText: string;
  imageUrl: string;
}

export interface CityProfile {
  name: string;
  shortName: string;
  adminName: string;
  tpaName: string;
  transitName: string;
  transitAbbr: string;
  transitPartner: string;
  wasteDept: string;
  wasteDeptAbbr: string;
  ecoRankPrefix: string;
  emailDomain: string;
  description: string;
  districts: string[];
  landmarks: { name: string; x: number; y: number }[];
  streets: string[];
  sampleAddresses: string[];
  onboardingSlides: {
    title: string;
    description: string;
  }[];
  eduSlides: {
    tag: string;
    title: string;
    desc: string;
    bg: string;
  }[];
  notificationSamples: {
    title: string;
    desc: string;
    category: string;
  }[];
  defaultProfileAddresses: Record<UserRole, string>;
  defaultProfileEmails: Record<UserRole, string>;
  defaultProfileEcoRanks: Record<UserRole, string>;
  bankSampahLocations: Omit<BankSampahLocation, 'coordinates'>[];
  pickupSchedules: Omit<PickupSchedule, 'id'>[];
  initialReports: Omit<WasteReport, 'id' | 'date' | 'imageUrl'>[];
  rewardItems: Omit<RewardItem, 'id'>[];
  environmentalFacts: EnvironmentalFact[];
  reportGpsLandmarks: { name: string; x: number; y: number }[];
  mapRiverName: string;
  mapRiverFlow: string;
}
