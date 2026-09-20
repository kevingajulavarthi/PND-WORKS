import React from 'react';
import { Users, Layers, Scale, MessageCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const cards = [
    {
      title: 'Experienced Technicians',
      description: 'Our certified body technicians and paint masters bring 15+ years of specialized experience across Indian, Japanese, and European car models.',
      icon: Users,
    },
    {
      title: 'Quality Paint & Materials',
      description: 'We use premium automotive paints, OEM-grade primers, and UV-resistant high-solid clear coats baked in a temperature-controlled booth for lasting shine.',
      icon: Layers,
    },
    {
      title: 'Transparent Estimates',
      description: 'No inflated ballpark numbers or hidden charges. We quote precisely according to your damage photographs and explain required labor beforehand.',
      icon: Scale,
    },
    {
      title: 'WhatsApp Support',
      description: 'Direct, responsive communication from inquiry to final delivery. Receive live repair photos, schedule pickup, and ask technical questions directly.',
      icon: MessageCircle,
    }
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1E56A0] mb-2">
            Professional Standards
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1320] tracking-tight">
            Why Choose Our Workshop
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Automotive restoration executed with dedication, precision tools, and respect for your time.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1E56A0] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1320] mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E56A0]"></span>
                  <span>Workshop Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
