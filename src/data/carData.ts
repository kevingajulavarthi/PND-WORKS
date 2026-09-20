import { CarBrand, DamagePart, ServiceOption, WorkshopConfig } from '../types';

export const WORKSHOP_CONFIG: WorkshopConfig = {
  name: 'P\\D WORKS',
  tagline: 'Precision denting, painting and detailing for every car.',
  whatsappNumber: '919885608611',
  displayPhone: '+91 98856 08611',
  address: '100ft Road, Madhapur, Hyderabad - 500082',
  landmark: 'Near D-Mart, 100ft Road',
  workingHours: 'Mon - Sat: 09:00 AM - 07:00 PM | Sunday: By appointment',
  email: 'pndworks.in@gmail.com'
};

export const CAR_YEARS = Array.from({ length: 41 }, (_, index) => String(2030 - index));

export const CAR_BRANDS: CarBrand[] = [
  { id: 'maruti-suzuki', name: 'Maruti Suzuki', popular: true, models: ['Swift', 'Baleno', 'Brezza', 'Wagon R', 'Dzire', 'Ertiga', 'Grand Vitara'] },
  { id: 'hyundai', name: 'Hyundai', popular: true, models: ['Creta', 'i20', 'Venue', 'Verna', 'Exter', 'Alcazar', 'Grand i10 Nios'] },
  { id: 'tata', name: 'Tata', popular: true, models: ['Nexon', 'Punch', 'Harrier', 'Safari', 'Altroz', 'Tiago', 'Curvv'] },
  { id: 'mahindra', name: 'Mahindra', popular: true, models: ['Thar', 'Scorpio', 'XUV700', 'XUV 3XO', 'Bolero', 'Marazzo'] },
  { id: 'toyota', name: 'Toyota', popular: true, models: ['Innova Crysta', 'Innova Hycross', 'Fortuner', 'Glanza', 'Urban Cruiser'] },
  { id: 'honda', name: 'Honda', popular: true, models: ['City', 'Amaze', 'Elevate', 'WR-V'] },
  { id: 'kia', name: 'Kia', popular: true, models: ['Seltos', 'Sonet', 'Carens', 'EV6'] },
  { id: 'volkswagen', name: 'Volkswagen', popular: true, models: ['Taigun', 'Virtus', 'Tiguan', 'Polo'] },
  { id: 'skoda', name: 'Skoda', models: ['Slavia', 'Kushaq', 'Kodiaq', 'Superb'] },
  { id: 'mg', name: 'MG', models: ['Hector', 'Astor', 'Gloster', 'Comet EV'] },
  { id: 'renault', name: 'Renault', models: ['Kwid', 'Triber', 'Kiger', 'Duster'] },
  { id: 'other', name: 'Other Brand', models: ['Other'] }
];

export const DAMAGE_PARTS: DamagePart[] = [
  { id: 'front-bumper', name: 'Front Bumper', category: 'Front', description: 'Front bumper cover and lower lip' },
  { id: 'rear-bumper', name: 'Rear Bumper', category: 'Rear', description: 'Rear bumper cover and reflectors' },
  { id: 'bonnet', name: 'Bonnet', category: 'Front', description: 'Engine hood' },
  { id: 'roof', name: 'Roof', category: 'Top / Other', description: 'Roof panel' },
  { id: 'boot-lid', name: 'Boot Lid', category: 'Rear', description: 'Trunk lid' },
  { id: 'left-front-fender', name: 'Left Front Fender', category: 'Sides', description: 'Front left quarter panel' },
  { id: 'right-front-fender', name: 'Right Front Fender', category: 'Sides', description: 'Front right quarter panel' },
  { id: 'left-front-door', name: 'Left Front Door', category: 'Sides', description: 'Driver-side front door' },
  { id: 'right-front-door', name: 'Right Front Door', category: 'Sides', description: 'Passenger-side front door' },
  { id: 'left-rear-door', name: 'Left Rear Door', category: 'Sides', description: 'Driver-side rear door' },
  { id: 'right-rear-door', name: 'Right Rear Door', category: 'Sides', description: 'Passenger-side rear door' },
  { id: 'left-quarter-panel', name: 'Left Quarter Panel', category: 'Sides', description: 'Rear left quarter panel' },
  { id: 'right-quarter-panel', name: 'Right Quarter Panel', category: 'Sides', description: 'Rear right quarter panel' },
  { id: 'running-board', name: 'Running Board', category: 'Sides', description: 'Side sill or running board' },
  { id: 'left-orvm', name: 'Left ORVM', category: 'Sides', description: 'Left outside rear-view mirror' },
  { id: 'right-orvm', name: 'Right ORVM', category: 'Sides', description: 'Right outside rear-view mirror' },
  { id: 'full-body', name: 'Full Body', category: 'Top / Other', description: 'Multiple panels or complete exterior' },
  { id: 'other-part', name: 'Other Part', category: 'Top / Other', description: 'Any other damaged area' }
];

export const SERVICE_OPTIONS: ServiceOption[] = [
  { id: 'denting', title: 'Denting', tagline: 'Panel restoration', description: 'Repair dents and restore panel shape with precision bodywork.', icon: 'Hammer' },
  { id: 'painting', title: 'Painting', tagline: 'OEM color match', description: 'Professional paint blending and factory-finish color matching.', icon: 'Paintbrush' },
  { id: 'denting_painting', title: 'Denting + Painting', tagline: 'Complete repair', description: 'The complete panel repair and paint restoration service.', badge: 'Most Popular', icon: 'Wrench' },
  { id: 'full_body_paint', title: 'Full Body Paint', tagline: 'Total transformation', description: 'A complete exterior respray for a consistent refreshed finish.', icon: 'Palette' },
  { id: 'car_washing', title: 'Car Washing', tagline: 'Premium detailing', description: 'Deep foam wash and finishing care for a clean, glossy car.', icon: 'Sparkles' }
];

export const PICKUP_TIME_SLOTS = [
  'Morning (09:00 AM – 12:00 PM)',
  'Afternoon (12:00 PM – 04:00 PM)',
  'Evening (04:00 PM – 07:00 PM)'
];

export const VISIT_TIME_OPTIONS = [
  { id: 'Today', label: 'Today', sub: 'If your car needs urgent attention' },
  { id: 'Tomorrow', label: 'Tomorrow', sub: 'Plan a convenient start time' },
  { id: 'This Week', label: 'This Week', sub: 'Any day that works for you' },
  { id: "I'll decide later", label: "I'll decide later", sub: 'I will confirm after the estimate' }
] as const;
