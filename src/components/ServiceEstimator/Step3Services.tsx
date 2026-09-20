import React from 'react';
import { Hammer, Paintbrush, Wrench, Sparkles, Palette, Check, Info } from 'lucide-react';
import { SERVICE_OPTIONS } from '../../data/carData';
import { ServiceType } from '../../types';

interface Step3ServicesProps {
  selectedServices: ServiceType[];
  onToggleService: (serviceId: ServiceType) => void;
}

export const Step3Services: React.FC<Step3ServicesProps> = ({
  selectedServices,
  onToggleService
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hammer':
        return <Hammer className="w-6 h-6 text-[#1E56A0]" />;
      case 'Paintbrush':
        return <Paintbrush className="w-6 h-6 text-[#1E56A0]" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-[#1E56A0]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#1E56A0]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-emerald-600" />;
      default:
        return <Wrench className="w-6 h-6 text-[#1E56A0]" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E56A0] bg-blue-50 px-2.5 py-0.5 rounded-md">
            Step 03
          </span>
          <span className="text-xs text-slate-500">Service Customization</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320] tracking-tight">
          What does your car need?
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600">
          Choose the required restoration treatments. You can select painting, denting, both combined, and add exterior car washing.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Select One or More Services
        </span>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Info className="w-3.5 h-3.5" />
          <span>Multi-selection supported</span>
        </div>
      </div>

      {/* Large Selectable Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SERVICE_OPTIONS.map((service) => {
          const isSelected = selectedServices.includes(service.id);

          return (
            <div
              key={service.id}
              onClick={() => onToggleService(service.id)}
              className={`relative rounded-2xl p-6 border transition-all cursor-pointer select-none flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/40 border-[#1E56A0] ring-2 ring-[#1E56A0]/20 shadow-md'
                  : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800 hover:shadow-sm'
              }`}
            >
              {service.badge && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-[#1E56A0] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    {service.badge}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    {getIcon(service.icon)}
                  </div>
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#1E56A0] text-white'
                        : 'border border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 stroke-[2.5]" />}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#0B1320] mb-1">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-[#1E56A0] mb-2">
                  {service.tagline}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className={isSelected ? 'text-[#1E56A0] font-bold' : 'text-slate-500'}>
                  {isSelected ? '✓ Selected for request' : 'Click to select'}
                </span>
                <span className="text-slate-400 font-medium">Verified by photo review</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reassurance Banner */}
      <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-800">No guesswork pricing:</strong> Paint requirements (solid, metallic, pearl or tri-coat) and dent severity (PDR vs metal pull) vary per vehicle. Our master painter will review your WhatsApp photos and provide an exact, itemized estimate.
        </p>
      </div>
    </div>
  );
};
