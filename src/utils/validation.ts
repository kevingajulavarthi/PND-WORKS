import { CAR_BRANDS, CAR_YEARS, DAMAGE_PARTS, PICKUP_TIME_SLOTS, SERVICE_OPTIONS, VISIT_TIME_OPTIONS } from '../data/carData';
import { ServiceRequestState } from '../types';

const PHONE_PATTERN = /^\d{10}$/;
const NAME_PATTERN = /^[\p{L}][\p{L} .'-]{1,99}$/u;

const isWithinLength = (value: string, maxLength: number, minLength = 0): boolean => {
  const trimmedValue = value.trim();
  return trimmedValue.length >= minLength && trimmedValue.length <= maxLength;
};

export function validateRequestStep(request: ServiceRequestState, step: number): string | null {
  if (step === 1) {
    const brand = CAR_BRANDS.find(item => item.name === request.brand);
    if (!brand) return 'Please select a valid car brand.';
    if (brand.name === 'Other Brand' && !isWithinLength(request.customBrand || '', 60, 2)) {
      return 'Please enter a valid car brand name.';
    }
    if (!brand.models.includes(request.model)) return 'Please select a valid car model.';
    if (request.model === 'Other' && !isWithinLength(request.customModel || '', 60, 2)) {
      return 'Please enter a valid car model.';
    }
    if (request.year && !CAR_YEARS.includes(request.year)) return 'Please select a valid vehicle year.';
  }

  if (step === 2) {
    const validPartIds = new Set(DAMAGE_PARTS.map(part => part.id));
    if (request.damagedParts.length === 0 || request.damagedParts.some(part => !validPartIds.has(part))) {
      return 'Please select at least one valid damaged or repair area.';
    }
    if (request.damagedParts.includes('other-part') && !isWithinLength(request.customPart || '', 100, 2)) {
      return 'Please describe the other damaged area.';
    }
  }

  if (step === 3) {
    const validServiceIds = new Set(SERVICE_OPTIONS.map(service => service.id));
    if (request.services.length === 0 || request.services.some(service => !validServiceIds.has(service))) {
      return 'Please select at least one valid service.';
    }
  }

  if (step === 4) {
    if (request.pickupDrop.needed) {
      if (!isWithinLength(request.pickupDrop.address, 200, 5)) return 'Please enter a valid pickup address.';
      if (!isWithinLength(request.pickupDrop.landmark, 100)) return 'Please shorten the landmark to 100 characters or fewer.';
      if (request.pickupDrop.contactNumber && !PHONE_PATTERN.test(request.pickupDrop.contactNumber.replace(/\D/g, ''))) {
        return 'Please enter a valid 10-digit pickup contact number.';
      }
      if (request.pickupDrop.preferredDate && !['Today', 'Tomorrow', 'This Weekend'].includes(request.pickupDrop.preferredDate)) {
        return 'Please select a valid pickup date.';
      }
      if (request.pickupDrop.preferredTime && !PICKUP_TIME_SLOTS.includes(request.pickupDrop.preferredTime)) {
        return 'Please select a valid pickup time.';
      }
    }
  }

  if (step === 5) {
    if (!NAME_PATTERN.test(request.customer.fullName.trim())) return 'Please provide a valid name.';
    if (!PHONE_PATTERN.test(request.customer.mobileNumber.replace(/\D/g, ''))) return 'Please enter a valid 10-digit mobile phone number.';
    if (!PHONE_PATTERN.test(request.customer.whatsappNumber.replace(/\D/g, ''))) return 'Please enter a valid 10-digit WhatsApp number.';
    if (!isWithinLength(request.customer.locationArea, 100)) return 'Please shorten the city or area to 100 characters or fewer.';
    if (!isWithinLength(request.customer.additionalNotes, 1000)) return 'Please shorten the additional notes to 1000 characters or fewer.';
    if (!VISIT_TIME_OPTIONS.some(option => option.id === request.customer.preferredVisit)) {
      return 'Please select a valid visit preference.';
    }
  }

  return null;
}