export interface CarBrand {
  id: string;
  name: string;
  country?: string;
  popular?: boolean;
  models: string[];
}

export interface DamagePart {
  id: string;
  name: string;
  category: 'Front' | 'Sides' | 'Rear' | 'Top / Other';
  description?: string;
  iconName?: string;
}

export type ServiceType = 'denting' | 'painting' | 'denting_painting' | 'full_body_paint' | 'car_washing';

export interface ServiceOption {
  id: ServiceType;
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  icon: string;
}

export interface PickupDropDetails {
  needed: boolean;
  address: string;
  landmark: string;
  preferredDate: string;
  preferredTime: string;
  contactNumber: string;
}

export type VisitTimePreference = 'Today' | 'Tomorrow' | 'This Week' | "I'll decide later";

export interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
  whatsappNumber: string;
  sameAsMobile: boolean;
  locationArea: string;
  additionalNotes: string;
  preferredVisit: VisitTimePreference;
}

export interface ServiceRequestState {
  brand: string;
  customBrand?: string;
  model: string;
  customModel?: string;
  year?: string;
  damagedParts: string[];
  customPart?: string;
  services: ServiceType[];
  pickupDrop: PickupDropDetails;
  customer: CustomerDetails;
}

export interface WorkshopConfig {
  name: string;
  tagline: string;
  whatsappNumber: string;
  displayPhone: string;
  address: string;
  landmark: string;
  workingHours: string;
  email: string;
}
