import { ServiceRequestState, WorkshopConfig } from '../types';
import { DAMAGE_PARTS, SERVICE_OPTIONS, WORKSHOP_CONFIG } from '../data/carData';

export function formatWhatsAppMessage(request: ServiceRequestState, workshopConfig: WorkshopConfig): string {
  const brandName = request.brand === 'other' ? (request.customBrand || 'Other Brand') : request.brand;
  const modelName = request.model === 'Other' ? (request.customModel || 'Other Model') : request.model;
  const yearText = request.year ? ` (Year: ${request.year})` : '';
  const carText = `${brandName} ${modelName}${yearText}`.trim() || 'Not specified';

  // Damaged parts
  const partNames = request.damagedParts.map(id => {
    if (id === 'other-part') return request.customPart ? `Other (${request.customPart})` : 'Other Part';
    const found = DAMAGE_PARTS.find(p => p.id === id);
    return found ? found.name : id;
  });
  const partsText = partNames.length > 0 ? partNames.map(p => `• ${p}`).join('\n') : '• Not specified';

  // Services
  const serviceLabels = request.services.map(s => {
    const found = SERVICE_OPTIONS.find(opt => opt.id === s);
    return found ? found.title : s;
  });
  const hasWashing = request.services.includes('car_washing');
  const mainServices = serviceLabels.filter(s => s !== 'Car Washing');

  let servicesText = mainServices.length > 0 ? mainServices.join(', ') : 'To be inspected';

  // Lines builder
  const lines: string[] = [
    `Hello ${workshopConfig.name}, I would like to get an estimate for my car.`,
    '',
    `🚗 *Car:*`,
    carText,
    '',
    `🔧 *Damaged Parts:*`,
    partsText,
    '',
    `🛠 *Services Required:*`,
    servicesText,
    '',
    `🧼 *Car Washing:*`,
    hasWashing ? 'Yes, Included' : 'No'
  ];

  // Pickup and drop details
  if (request.pickupDrop.needed) {
    lines.push('');
    lines.push(`🚚 *Pickup & Drop:* Required`);
    if (request.pickupDrop.address) {
      lines.push(`📍 *Pickup Address:* ${request.pickupDrop.address.trim()}`);
    }
    if (request.pickupDrop.landmark) {
      lines.push(`🏢 *Landmark:* ${request.pickupDrop.landmark.trim()}`);
    }
    const timingParts: string[] = [];
    if (request.pickupDrop.preferredDate) timingParts.push(request.pickupDrop.preferredDate);
    if (request.pickupDrop.preferredTime) timingParts.push(request.pickupDrop.preferredTime);
    if (timingParts.length > 0) {
      lines.push(`🕐 *Preferred Pickup:* ${timingParts.join(', ')}`);
    }
  } else {
    lines.push('');
    lines.push(`🚚 *Pickup & Drop:* No (I'll bring the car to workshop)`);
  }

  // Customer contact
  lines.push('');
  lines.push(`👤 *Name:* ${request.customer.fullName.trim() || 'Valued Customer'}`);
  lines.push(`📱 *Phone:* ${request.customer.mobileNumber.trim() || 'Not provided'}`);
  
  if (request.customer.whatsappNumber && request.customer.whatsappNumber !== request.customer.mobileNumber) {
    lines.push(`💬 *WhatsApp:* ${request.customer.whatsappNumber.trim()}`);
  }

  if (request.customer.preferredVisit) {
    lines.push(`🗓 *Visit / Start Preference:* ${request.customer.preferredVisit}`);
  }

  if (request.customer.additionalNotes && request.customer.additionalNotes.trim()) {
    lines.push('');
    lines.push(`📝 *Additional Notes:*`);
    lines.push(request.customer.additionalNotes.trim());
  }

  lines.push('');
  lines.push(`📸 *I will send photos of the damaged areas now.*`);

  return lines.join('\n');
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

export function openWhatsApp(phoneNumber: string, message: string): void {
  const url = buildWhatsAppUrl(phoneNumber, message);
  window.location.assign(url);
}
