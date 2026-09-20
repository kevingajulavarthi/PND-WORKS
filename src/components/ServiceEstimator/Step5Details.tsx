import React from 'react';
import { User, Phone, MessageSquare, MapPin, Calendar, FileText, Check } from 'lucide-react';
import { CustomerDetails, VisitTimePreference } from '../../types';
import { VISIT_TIME_OPTIONS } from '../../data/carData';

interface Step5DetailsProps {
  customer: CustomerDetails;
  onChangeCustomer: (fields: Partial<CustomerDetails>) => void;
}

export const Step5Details: React.FC<Step5DetailsProps> = ({ customer, onChangeCustomer }) => {
  const handleToggleSameNumber = (checked: boolean) => {
    onChangeCustomer({
      sameAsMobile: checked,
      whatsappNumber: checked ? customer.mobileNumber : customer.whatsappNumber
    });
  };

  const handleMobileChange = (val: string) => {
    const updates: Partial<CustomerDetails> = { mobileNumber: val };
    if (customer.sameAsMobile) {
      updates.whatsappNumber = val;
    }
    onChangeCustomer(updates);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E56A0] bg-blue-50 px-2.5 py-0.5 rounded-md">
            Step 05
          </span>
          <span className="text-xs text-slate-500">Contact & Timeline</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320] tracking-tight">
          Almost there
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600">
          Provide your contact details so our workshop can send you the official photo-based inspection report and estimate on WhatsApp.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Your name"
                value={customer.fullName}
                onChange={(e) => onChangeCustomer({ fullName: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                placeholder="10-digit phone number"
                value={customer.mobileNumber}
                onChange={(e) => handleMobileChange(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Preferred WhatsApp Number */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800">
                Preferred WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={customer.sameAsMobile}
                  onChange={(e) => handleToggleSameNumber(e.target.checked)}
                  className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                />
                <span>Same as mobile</span>
              </label>
            </div>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                disabled={customer.sameAsMobile}
                placeholder="WhatsApp contact number"
                value={customer.whatsappNumber}
                onChange={(e) => onChangeCustomer({ whatsappNumber: e.target.value })}
                className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border ${
                  customer.sameAsMobile
                    ? 'bg-slate-100/80 text-slate-600 border-slate-200 cursor-not-allowed'
                    : 'bg-slate-50/50 focus:bg-white border-slate-300 focus:ring-2 focus:ring-blue-500'
                }`}
              />
            </div>
          </div>

          {/* Optional Location */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Your City / Area (Optional)
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Madhapur, Hitec City, Jubilee Hills, Hyderabad"
                value={customer.locationArea}
                onChange={(e) => onChangeCustomer({ locationArea: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Additional Notes (Optional)
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <textarea
                rows={3}
                placeholder="e.g. Minor scratches near right fog lamp, slight dent on lower bumper edge, paint color is Arctic White..."
                value={customer.additionalNotes}
                onChange={(e) => onChangeCustomer({ additionalNotes: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Optional Question: When would you like to visit? */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-800 mb-2.5">
            When would you like to visit or start work?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {VISIT_TIME_OPTIONS.map((opt) => {
              const isPicked = customer.preferredVisit === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeCustomer({ preferredVisit: opt.id as VisitTimePreference })}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isPicked
                      ? 'bg-blue-50/50 border-[#1E56A0] ring-1 ring-[#1E56A0]'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${isPicked ? 'text-[#1E56A0]' : 'text-slate-800'}`}>
                      {opt.label}
                    </span>
                    {isPicked && <Check className="w-3.5 h-3.5 text-[#1E56A0]" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {opt.sub}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
