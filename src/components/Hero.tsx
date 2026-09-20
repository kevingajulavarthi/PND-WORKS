import React from 'react';
import { MessageCircle, ChevronRight, CheckCircle2, Truck, Sparkles } from 'lucide-react';
import { WORKSHOP_CONFIG } from '../data/carData';
import { openWhatsApp } from '../utils/whatsapp';
import heroWorkshopImg from '../assets/images/car_paint_booth_1789733212363.jpg';

interface HeroProps {
  onStartEstimate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartEstimate }) => {
  const handleWhatsAppChat = () => {
    const defaultMsg = `Hello ${WORKSHOP_CONFIG.name}, I want to get a damage repair and painting estimate for my car.`;
    openWhatsApp(WORKSHOP_CONFIG.whatsappNumber, defaultMsg);
  };

  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-white via-[#F7F8FA] to-[#F7F8FA]">
      {/* Subtle geometric light pattern for high-end automotive feel */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-3xl"></div>
        <div className="absolute bottom-0 left-[10%] w-[450px] h-[450px] rounded-full bg-slate-200/50 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Trust Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/90 text-slate-800 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Fast WhatsApp Damage Assessment • No Blind Prices</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B1320] leading-[1.12]">
              Get Your Car Looking <span className="text-[#1E56A0] inline-block">New Again.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Professional denting, painting and car washing services. Tell us what your car needs and get a personalized estimate.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartEstimate}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#0B1320] hover:bg-[#1E293B] shadow-lg shadow-slate-950/15 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <span>Get a Quick Estimate</span>
                <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleWhatsAppChat}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-semibold text-[#128C7E] bg-white hover:bg-emerald-50/50 border border-emerald-300/80 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>

            {/* Value Highlights Pill Grid */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2.5 p-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-[#1E56A0] shrink-0" />
                <span className="text-xs font-semibold text-slate-700">OEM Color Matching</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg">
                <Truck className="w-4 h-4 text-[#1E56A0] shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Pickup & Drop Available</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg col-span-2 sm:col-span-1">
                <Sparkles className="w-4 h-4 text-[#1E56A0] shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Photo-Based WhatsApp Quote</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Automotive Imagery with Live Floating Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Workshop Visual Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/15 border border-slate-200/80 bg-slate-900 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={heroWorkshopImg.src}
                  alt="Professional Car Paint Booth and Detailing Workshop"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Gradient overlay to ensure text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30"></div>

                {/* Bottom caption in image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs text-slate-300 font-medium">Bake Oven • Color Spectrophotometer</p>
                  <p className="text-sm font-bold tracking-wide">Factory Finish Guaranteed</p>
                </div>
              </div>

              {/* Floating WhatsApp Workflow Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-3.5 sm:p-4 rounded-xl shadow-xl border border-slate-200/90 max-w-[280px] hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">How You Get The Quote</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                    Send 3 damage photos on WhatsApp → Team reviews → Instant estimate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
