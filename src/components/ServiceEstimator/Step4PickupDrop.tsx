import React from 'react';
import { Truck, Home, MapPin, Calendar, Clock, Phone, AlertCircle, Check } from 'lucide-react';
import { PickupDropDetails } from '../../types';
import { PICKUP_TIME_SLOTS, WORKSHOP_CONFIG } from '../../data/carData';

interface Step4PickupDropProps {
  pickupDrop: PickupDropDetails;
  onChangePickupDrop: (details: Partial<PickupDropDetails>) => void;
  customerPhone?: string;
}

export const Step4PickupDrop: React.FC<Step4PickupDropProps> = ({
  pickupDrop,
  onChangePickupDrop,
  customerPhone = ''
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E56A0] bg-blue-50 px-2.5 py-0.5 rounded-md">
            Step 04
          </span>
          <span className="text-xs text-slate-500">Logistics & Convenience</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320] tracking-tight">
          Do you need pickup & drop?
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600">
          Save time. Our insured drivers can collect your car from your doorstep and deliver it back once the denting & painting is complete.
        </p>
      </div>

      {/* Two Choice Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Yes Choice */}
        <div
          onClick={() => onChangePickupDrop({ needed: true })}
          className={`p-6 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
            pickupDrop.needed
              ? 'bg-blue-50/40 border-[#1E56A0] ring-2 ring-[#1E56A0]/20 shadow-md'
              : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1E56A0] flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  pickupDrop.needed
                    ? 'bg-[#1E56A0] text-white'
                    : 'border border-slate-300 bg-white'
                }`}
              >
                {pickupDrop.needed && <Check className="w-4 h-4 stroke-[2.5]" />}
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#0B1320] mb-1">
              Yes, Pickup & Drop
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Let our team arrange vehicle pickup and delivery directly to your home or office.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#1E56A0]">
            Recommended for busy car owners
          </div>
        </div>

        {/* No Choice */}
        <div
          onClick={() => onChangePickupDrop({ needed: false })}
          className={`p-6 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
            !pickupDrop.needed
              ? 'bg-blue-50/40 border-[#1E56A0] ring-2 ring-[#1E56A0]/20 shadow-md'
              : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  !pickupDrop.needed
                    ? 'bg-[#1E56A0] text-white'
                    : 'border border-slate-300 bg-white'
                }`}
              >
                {!pickupDrop.needed && <Check className="w-4 h-4 stroke-[2.5]" />}
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#0B1320] mb-1">
              I'll bring the car myself
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              I will visit the workshop directly for inspection and drop-off.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-500">
            {WORKSHOP_CONFIG.address}, {WORKSHOP_CONFIG.landmark}
          </div>
        </div>
      </div>

      {/* If Pickup & Drop is requested: Detailed Form */}
      {pickupDrop.needed && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#1E56A0]" />
              <span>Doorstep Pickup Details</span>
            </h4>
            <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
              Free Coordination
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pickup Address */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Pickup Address <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                placeholder="House / Flat / Building No., Street, Sector, City..."
                value={pickupDrop.address}
                onChange={(e) => onChangePickupDrop({ address: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Landmark */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Landmark (Optional)
              </label>
              <input
                type="text"
                placeholder="Near Metro, Society Gate, Mall..."
                value={pickupDrop.landmark}
                onChange={(e) => onChangePickupDrop({ landmark: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Contact Number for Driver */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Pickup Contact Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder={customerPhone || '10-digit mobile number'}
                  value={pickupDrop.contactNumber}
                  onChange={(e) => onChangePickupDrop({ contactNumber: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Preferred Pickup Date */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Preferred Pickup Date
              </label>
              <div className="flex gap-2">
                {['Today', 'Tomorrow', 'This Weekend'].map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => onChangePickupDrop({ preferredDate: day })}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      pickupDrop.preferredDate === day
                        ? 'bg-[#0B1320] text-white border-[#0B1320]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Pickup Time */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Preferred Pickup Time Slot
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={pickupDrop.preferredTime || PICKUP_TIME_SLOTS[0]}
                  onChange={(e) => onChangePickupDrop({ preferredTime: e.target.value })}
                  className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                >
                  {PICKUP_TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Important Terms Clarification Note */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Please Note:</strong> Pickup & drop is available across Madhapur, Hitec City, Jubilee Hills, Gachibowli, and surrounding Hyderabad service areas. The workshop coordinator will confirm driver dispatch via WhatsApp after inspecting your damage photos.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
