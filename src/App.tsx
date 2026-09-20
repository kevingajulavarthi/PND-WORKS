/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCards } from './components/ServiceCards';
import { PickupDropBanner } from './components/PickupDropBanner';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServiceEstimator } from './components/ServiceEstimator/ServiceEstimator';
import { WhatsAppAISimulator } from './components/WhatsAppAISimulator';
import { Footer } from './components/Footer';
import { WORKSHOP_CONFIG } from './data/carData';
import { ServiceRequestState, ServiceType } from './types';
import { MessageCircle, ChevronRight } from 'lucide-react';
import { openWhatsApp } from './utils/whatsapp';

export default function App() {
  const [simulatorOpen, setSimulatorOpen] = useState(false);

  // Core service request state
  const [request, setRequest] = useState<ServiceRequestState>({
    brand: 'Hyundai',
    model: 'Creta',
    year: '2023',
    damagedParts: ['front-bumper', 'left-fender'],
    services: ['denting_painting', 'car_washing'],
    pickupDrop: {
      needed: false,
      address: '',
      landmark: '',
      preferredDate: '',
      preferredTime: '',
      contactNumber: ''
    },
    customer: {
      fullName: '',
      mobileNumber: '',
      whatsappNumber: '',
      sameAsMobile: true,
      locationArea: '',
      additionalNotes: '',
      preferredVisit: "I'll decide later"
    }
  });

  const scrollToEstimator = () => {
    const el = document.getElementById('estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromCard = (serviceId: ServiceType) => {
    setRequest(prev => {
      const exists = prev.services.includes(serviceId);
      return {
        ...prev,
        services: exists ? prev.services : [...prev.services, serviceId]
      };
    });
    scrollToEstimator();
  };

  const handleQuickWhatsApp = () => {
    openWhatsApp(WORKSHOP_CONFIG.whatsappNumber, `Hello ${WORKSHOP_CONFIG.name}, I would like to get an estimate for my car.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#1E293B] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. Navbar */}
      <Navbar
        onStartEstimate={scrollToEstimator}
        onOpenSimulator={() => setSimulatorOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-20">
        {/* 2. Hero */}
        <Hero onStartEstimate={scrollToEstimator} />

        {/* 3. Multi-Step Service Selection Flow (The core interactive estimate engine) */}
        <ServiceEstimator
          request={request}
          setRequest={setRequest}
          workshopConfig={WORKSHOP_CONFIG}
          onOpenSimulator={() => setSimulatorOpen(true)}
        />

        {/* 4. Homepage Service Cards */}
        <ServiceCards
          onSelectService={handleSelectServiceFromCard}
          selectedServices={request.services}
        />

        {/* 5. Pickup & Drop Service Feature Highlight */}
        <PickupDropBanner onStartEstimate={scrollToEstimator} />

        {/* 6. How It Works (4-Step Timeline) */}
        <HowItWorks onStartEstimate={scrollToEstimator} />

        {/* 7. Why Choose Us */}
        <WhyChooseUs />
      </main>

      {/* 8. Footer */}
      <Footer
        onStartEstimate={scrollToEstimator}
        onOpenSimulator={() => setSimulatorOpen(true)}
      />

      {/* Sticky Mobile CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-2.5 shadow-lg flex items-center gap-3">
        <button
          onClick={handleQuickWhatsApp}
          className="p-2.5 rounded-xl bg-emerald-50 text-[#128C7E] border border-emerald-200 shrink-0 flex items-center justify-center"
          aria-label="Direct WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
        </button>

        <button
          onClick={scrollToEstimator}
          className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#0B1320] shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Get Quick Estimate</span>
          <ChevronRight className="w-4 h-4 text-blue-400" />
        </button>
      </div>

      {/* 11. WhatsApp AI Chat Agent Simulator Modal */}
      <WhatsAppAISimulator
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
        request={request}
        workshopConfig={WORKSHOP_CONFIG}
      />

    </div>
  );
}
