import React from 'react';
import { Truck, Wrench, Home, ChevronRight, CheckCircle, ShieldCheck, MapPin } from 'lucide-react';

interface PickupDropBannerProps {
  onStartEstimate: () => void;
}

export const PickupDropBanner: React.FC<PickupDropBannerProps> = ({ onStartEstimate }) => {
  return (
    <section id="pickup-drop" className="py-16 md:py-24 bg-[#F7F8FA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-[#1E56A0] text-xs font-bold uppercase tracking-wider mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>Doorstep Convenience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1320] tracking-tight">
            We Pick Up. We Repair. <br className="hidden sm:inline" />We Drop It Back.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            No need to worry about bringing your car to the workshop. Our team can arrange pickup and drop-off for your vehicle.
          </p>
        </div>

        {/* 3-Step Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1E56A0] flex items-center justify-center mb-6">
              <Truck className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-extrabold text-[#1E56A0] bg-blue-100/80 px-2 py-0.5 rounded-md">
                STEP 01
              </span>
              <h3 className="text-xl font-bold text-[#0B1320]">We Pick Up</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mt-2">
              Our team coordinates with you to collect your vehicle directly from your home, office, or designated location.
            </p>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Inspection sheet & digital receipt issued on spot</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-[#0B1320] flex items-center justify-center mb-6">
              <Wrench className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-extrabold text-[#0B1320] bg-slate-200 px-2 py-0.5 rounded-md">
                STEP 02
              </span>
              <h3 className="text-xl font-bold text-[#0B1320]">We Repair</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mt-2">
              Our technicians handle the denting, painting, panel alignment and selected car washing services inside our climate-controlled booth.
            </p>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Progress photos sent directly to your WhatsApp</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6">
              <Home className="w-7 h-7 text-emerald-600" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                STEP 03
              </span>
              <h3 className="text-xl font-bold text-[#0B1320]">We Drop It Back</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mt-2">
              Once the work is completed and quality-tested, we coordinate the vehicle’s return safely back to your doorstep.
            </p>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Customer walkthrough & satisfaction verification</span>
            </div>
          </div>
        </div>

        {/* Premium Banner Highlight */}
        <div className="rounded-3xl bg-[#0B1320] text-white p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-900/30 to-transparent pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold tracking-wide border border-blue-400/30">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Doorstep Pickup Available</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              "Your Car Doesn't Need to Come to Us. We'll Come to You."
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Choose pickup & drop during your service request and our team will coordinate the vehicle collection and return.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onStartEstimate}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-[#0B1320] bg-white hover:bg-slate-100 transition-all shadow-md cursor-pointer text-sm"
              >
                <span>Get an Estimate with Pickup</span>
                <ChevronRight className="w-4 h-4 text-[#1E56A0]" />
              </button>

              <span className="text-xs text-slate-400 italic">
                * Pickup & drop available — subject to service area and confirmation.
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
