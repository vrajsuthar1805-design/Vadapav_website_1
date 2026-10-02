export interface StallInfo {
  name: string;
  tagline: string;
  edition: string;
  datesText: string;
  timingsText: string;
  announcement: string;
  heroImage: string;
  phone: string;
  whatsappNumber: string;
  locationAddress: string;
  googleMapsUrl: string;
  instagramUrl: string;
  googleReviewUrl: string;
  story: string;
}

export interface ComboItem {
  id: string;
  name: string;
  price: number;
  items: string[];
  savingsText: string;
  tag?: string; // e.g. "BEST SELLER", "Sabse Zyada Pasand"
  category: "CHEEZY DELIGHTS" | "SAVER PACKS";
  order: number;
  visible: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  alacartePrice: number;
  inComboPrice: number;
  category: "vadapav" | "drinks";
  description?: string;
  isVeg?: boolean;
  order: number;
  visible: boolean;
}

export interface OfferItem {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  actionText?: string;
  actionUrl?: string;
  actionType: "instagram" | "google_review" | "whatsapp" | "tel" | "info";
  order: number;
  visible: boolean;
}

export interface StampCardConfig {
  title: string;
  subtitle: string;
  ruleBillThreshold: number; // e.g. 100
  milestones: {
    stamp5Reward: string;
    stamp9Reward: string;
  };
  rulesText: string[];
  visible: boolean;
}

export interface SectionVisibility {
  hero: boolean;
  combos: boolean;
  menu: boolean;
  rewards: boolean;
  offers: boolean;
  about: boolean;
  floatingActions: boolean;
}

export interface MenuNotes {
  parcelChargesStandard: number;
  parcelChargesSpecial: number;
  parcelChargesSpecialItems: string;
  drinkChangePolicy: string;
}

export interface SiteData {
  stall: StallInfo;
  combos: ComboItem[];
  menuItems: MenuItem[];
  offers: OfferItem[];
  stampCard: StampCardConfig;
  menuNotes: MenuNotes;
  sections: SectionVisibility;
  lastUpdated?: string;
}
