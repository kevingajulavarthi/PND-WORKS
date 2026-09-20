import React, { useState } from 'react';
import { Menu, X, MessageCircle, Phone, Clock, MapPin, ChevronRight, Shield } from 'lucide-react';
import { WORKSHOP_CONFIG } from '../data/carData';
import { openWhatsApp } from '../utils/whatsapp';
import { Logo } from './Logo';

interface NavbarProps {
  onStartEstimate: () => void;
  onOpenSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartEstimate, onOpenSimulator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppDirect = () => {
    const quickMsg = `Hello ${WORKSHOP_CONFIG.name}, I would like to enquire about car denting and painting services.`;
    openWhatsApp(WORKSHOP_CONFIG.whatsappNumber, quickMsg);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Pickup & Drop', href: '#pickup-drop' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top micro-bar for quick trust info */}
      <div className="bg-[#0B1320] text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{WORKSHOP_CONFIG.address}</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{WORKSHOP_CONFIG.workingHours.split('|')[0]}</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenSimulator}
              className="text-xs text-blue-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp AI Demo Preview</span>
            </button>
            <span className="text-slate-500">|</span>
            <a
              href={`tel:${WORKSHOP_CONFIG.displayPhone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors font-medium text-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{WORKSHOP_CONFIG.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group transition-transform hover:opacity-95">
            <Logo variant="light" size="md" />
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-[#0B1320] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[#1E56A0] after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Group */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={handleWhatsAppDirect}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#128C7E] bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition-all shadow-xs cursor-pointer"
              title="Chat directly on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
              <span>WhatsApp Us</span>
            </button>

            <button
              onClick={onStartEstimate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0B1320] hover:bg-[#1E293B] shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Get Quick Estimate</span>
              <ChevronRight className="w-4 h-4 text-blue-400" />
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={handleWhatsAppDirect}
              className="p-2.5 rounded-xl text-emerald-700 bg-emerald-50 border border-emerald-200"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartEstimate();
              }}
              className="w-full py-3 rounded-xl font-bold text-white bg-[#0B1320] text-center shadow-md flex items-center justify-center gap-2"
            >
              <span>Get Quick Estimate</span>
              <ChevronRight className="w-4 h-4 text-blue-400" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppDirect();
              }}
              className="w-full py-3 rounded-xl font-bold text-[#128C7E] bg-emerald-50 border border-emerald-200 text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSimulator();
              }}
              className="w-full py-2.5 rounded-xl font-medium text-xs text-slate-600 bg-slate-50 border border-slate-200 text-center flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-blue-500" />
              <span>Preview WhatsApp AI Chat Bot Flow</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 pt-2 text-center">
            <p>{WORKSHOP_CONFIG.address}</p>
            <p className="mt-0.5 font-medium text-slate-700">{WORKSHOP_CONFIG.displayPhone}</p>
          </div>
        </div>
      )}
    </header>
  );
};
