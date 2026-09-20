import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Mail, ChevronRight, Shield, Lock } from 'lucide-react';
import { WORKSHOP_CONFIG } from '../data/carData';
import { openWhatsApp } from '../utils/whatsapp';
import { Logo } from './Logo';

interface FooterProps {
  onStartEstimate: () => void;
  onOpenSimulator: () => void;
  onOpenStaffPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onStartEstimate, onOpenSimulator, onOpenStaffPortal }) => {
  const handleWhatsApp = () => {
    openWhatsApp(WORKSHOP_CONFIG.whatsappNumber, `Hello ${WORKSHOP_CONFIG.name}, I would like to inquire about car services.`);
  };

  return (
    <footer id="contact" className="bg-[#0B1320] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="dark" size="md" />

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Professional car denting, precision painting, and foam washing workshop. State-of-the-art climate-controlled paint booth and photo-based WhatsApp estimates.
            </p>

            <div className="pt-2">
              <span className="inline-block text-xs font-semibold text-blue-300 bg-blue-900/30 border border-blue-800/40 px-3 py-1 rounded-full">
                {WORKSHOP_CONFIG.tagline}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#pickup-drop" className="hover:text-white transition-colors">Doorstep Pickup & Drop</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a>
              </li>
              <li>
                <button
                  onClick={onStartEstimate}
                  className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <span>Get Quick Estimate</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSimulator}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>WhatsApp AI Bot Preview</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Workshop Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Workshop Location & Hours
            </h4>

            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">{WORKSHOP_CONFIG.address}</p>
                  <p className="text-xs text-slate-400">{WORKSHOP_CONFIG.landmark}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{WORKSHOP_CONFIG.workingHours}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${WORKSHOP_CONFIG.displayPhone}`} className="hover:text-white font-medium text-slate-200">
                  {WORKSHOP_CONFIG.displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <button
                  onClick={handleWhatsApp}
                  className="hover:text-[#25D366] font-medium text-slate-200 cursor-pointer text-left"
                >
                  WhatsApp: +{WORKSHOP_CONFIG.whatsappNumber} (Quick Photos & Estimates)
                </button>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(WORKSHOP_CONFIG.email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-medium text-slate-200"
                >
                  {WORKSHOP_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Micro Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {WORKSHOP_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-slate-400">
            <span>Denting</span>
            <span>•</span>
            <span>Painting</span>
            <span>•</span>
            <span>Car Washing</span>
            <span>•</span>
            <span>Pickup & Drop</span>
          </div>
          {onOpenStaffPortal && (
            <button
              onClick={onOpenStaffPortal}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer text-xs"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Staff & Driver Portal</span>
            </button>
          )}
        </div>

      </div>
    </footer>
  );
};
