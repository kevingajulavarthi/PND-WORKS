                                                                                                  import React from 'react';
import { Hammer, Paintbrush, Wrench, Sparkles, Palette, ChevronRight, Check } from 'lucide-react';
import { SERVICE_OPTIONS } from '../data/carData';
import { ServiceType } from '../types';

interface ServiceCardsProps {
  onSelectService: (serviceId: ServiceType) => void;
  selectedServices?: ServiceType[];
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({ onSelectService, selectedServices = [] }) => {
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
    <section id="services" className="py-16 md:py-24 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1E56A0] mb-2">
            Workshop Capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1320] tracking-tight">
            Precision Craftsmanship for Every Panel
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            From minor parking dings and bumper scuffs to full body respray and premium foam washes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {SERVICE_OPTIONS.map((service) => {
            const isSelected = selectedServices.includes(service.id);

            return (
              <div
                key={service.id}
                className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'border-[#1E56A0] ring-2 ring-[#1E56A0]/20 bg-blue-50/20 shadow-md'
                    : 'border-slate-200/90 hover:border-slate-300 bg-white hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                {service.badge && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-[#1E56A0] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      {service.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    {getIcon(service.icon)}
                  </div>

                  <h3 className="text-xl font-bold text-[#0B1320] mb-1">
                    {service.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#1E56A0] mb-3">
                    {service.tagline}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1E56A0] text-white hover:bg-blue-700 shadow-xs'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Selected for Estimate</span>
                      </>
                    ) : (
                      <>
                        <span>Select Service</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
