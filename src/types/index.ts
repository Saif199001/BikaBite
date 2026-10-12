export type Vertical = 'kitchen' | 'namkeen' | 'mithai';

export interface Product {
  id: string;
  name: string;
  vertical: Vertical;
  category: string; // e.g. "Meals", "Snacks", "Bhujia & Sev", "Laddus & Peda", etc.
  shortDescription: string;
  description: string;
  image: string;
  gallery?: string[];
  packSizes: string[]; // e.g. ["200g", "400g", "1kg"] or ["Single Portion", "Family Box"]
  servingInfo?: string;
  price?: number; // Optional/when confirmed
  priceUnit?: string; // e.g. "per box", "per pack", "per plate"
  isAvailable: boolean;
  isFeatured?: boolean;
  
  // Packaged food compliance & specifications
  ingredients?: string[];
  allergens?: string;
  storageInstructions?: string;
  shelfLife?: string;
  nutritionInfo?: {
    energy?: string;
    protein?: string;
    carbohydrates?: string;
    fat?: string;
  };
}

export interface BusinessSettings {
  brandName: string;
  brandLine: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  businessHours: string;
  kitchenServiceArea: string;
  deliveryTimelines: string;
  heroHeadline: string;
  heroSubheadline: string;
}

export interface LeadSubmission {
  id: string;
  type: 'contact' | 'bulk_order' | 'partnership' | 'kitchen_order' | 'mithai_gifting';
  timestamp: string;
  name: string;
  phone: string;
  email?: string;
  businessName?: string;
  businessType?: string;
  city?: string;
  pincode?: string;
  orderType?: string;
  productPreference?: string;
  quantity?: string;
  requiredDate?: string;
  budget?: string;
  reason?: string;
  message?: string;
  status: 'new' | 'contacted' | 'fulfilled';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
