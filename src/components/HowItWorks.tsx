import React from 'react';
import { Car, Wrench, Camera, MessageSquareQuote, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartEstimate: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartEstimate }) => {
  const steps = [
    {
      number: '01',
      title: 'Select Your Car',
      description: 'Choose your car brand and model from our list or enter custom car details.',
      icon: Car,
      badge: '30 seconds'
    },
    {
      number: '02',
      title: 'Tell Us the Damage',
      description: 'Select the damaged parts and required services: denting, painting, or foam washing.',
      icon: Wrench,
      badge: 'Visual picker'
    },
    {
      number: '03',
      title: 'Send Photos on WhatsApp',
      description: 'Continue to WhatsApp with prefilled details and send clear photos of the damaged area.',
      icon: Camera,
      badge: 'Direct to Master Tech'
    },
    {
      number: '04',
      title: 'Get Your Estimate',
      description: 'Our workshop team inspects the photos and provides a personalized, honest estimate.',
      icon: MessageSquareQuote,
      badge: 'No surprise bills'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1E56A0] mb-2">
            Straightforward Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1320] tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            No endless dealership visits or blind overcharging. We assess damage via photos before touching your car.
          </p>
        </div>

        {/* Desktop Horizontal Layout / Mobile Vertical Timeline */}
        <div className="relative">
          {/* Subtle connecting line across cards on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 -translate-y-8 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Step Header */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-2xl font-black text-slate-300 group-hover:text-[#1E56A0] transition-colors">
                        {step.number}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {step.badge}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0B1320] flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:text-[#1E56A0] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-bold text-[#0B1320] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 lg:hidden">
                      <span>Next step</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Prompt */}
        <div className="mt-14 text-center">
          <button
            onClick={onStartEstimate}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-[#0B1320] hover:bg-[#1E293B] shadow-md transition-all cursor-pointer text-sm"
          >
            <span>Start Step 1: Select Your Car</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
