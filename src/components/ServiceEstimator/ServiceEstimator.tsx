import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Car, Wrench, Sparkles, Truck, User, MessageCircle, AlertCircle } from 'lucide-react';
import { ServiceRequestState, WorkshopConfig, ServiceType } from '../../types';
import { Step1Car } from './Step1Car';
import { Step2Damage } from './Step2Damage';
import { Step3Services } from './Step3Services';
import { Step4PickupDrop } from './Step4PickupDrop';
import { Step5Details } from './Step5Details';
import { Step6WhatsAppConfirm } from './Step6WhatsAppConfirm';
import { LiveSummaryCard } from './LiveSummaryCard';
import { validateRequestStep } from '../../utils/validation';

interface ServiceEstimatorProps {
  request: ServiceRequestState;
  setRequest: React.Dispatch<React.SetStateAction<ServiceRequestState>>;
  workshopConfig: WorkshopConfig;
  onOpenSimulator: () => void;
  initialStep?: number;
}

export const ServiceEstimator: React.FC<ServiceEstimatorProps> = ({
  request,
  setRequest,
  workshopConfig,
  onOpenSimulator,
  initialStep = 1
}) => {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [validationError, setValidationError] = useState<string | null>(null);

  const stepsList = [
    { num: 1, label: 'Car', icon: Car },
    { num: 2, label: 'Damage', icon: Wrench },
    { num: 3, label: 'Services', icon: Sparkles },
    { num: 4, label: 'Pickup & Drop', icon: Truck },
    { num: 5, label: 'Details', icon: User },
    { num: 6, label: 'WhatsApp', icon: MessageCircle }
  ];

  const handleNext = () => {
    const validationMessage = validateRequestStep(request, currentStep);
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }
    setValidationError(null);
    setCurrentStep(prev => Math.min(prev + 1, 6));
    window.scrollTo({ top: document.getElementById('estimator')?.offsetTop ? (document.getElementById('estimator')!.offsetTop - 80) : 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setValidationError(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleGoToStep = (stepNumber: number) => {
    if (stepNumber > currentStep) {
      for (let step = currentStep; step < stepNumber; step += 1) {
        const validationMessage = validateRequestStep(request, step);
        if (validationMessage) {
          setValidationError(validationMessage);
          return;
        }
      }
    }
    setValidationError(null);
    setCurrentStep(stepNumber);
  };

  // State mutations
  const handleSelectBrand = (brandName: string) => {
    setRequest(prev => ({
      ...prev,
      brand: brandName,
      model: '' // Reset model when brand changes
    }));
    setValidationError(null);
  };

  const handleTogglePart = (partId: string) => {
    setRequest(prev => {
      const exists = prev.damagedParts.includes(partId);
      return {
        ...prev,
        damagedParts: exists
          ? prev.damagedParts.filter(id => id !== partId)
          : [...prev.damagedParts, partId]
      };
    });
    setValidationError(null);
  };

  const handleToggleService = (serviceId: ServiceType) => {
    setRequest(prev => {
      const exists = prev.services.includes(serviceId);
      return {
        ...prev,
        services: exists
          ? prev.services.filter(s => s !== serviceId)
          : [...prev.services, serviceId]
      };
    });
    setValidationError(null);
  };

  return (
    <section id="estimator" className="py-16 md:py-24 bg-[#F7F8FA] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#1E56A0] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Instant Photo Estimate Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1320] tracking-tight">
            Configure Your Service Request
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Follow the 5 simple steps below to generate your WhatsApp message. No upfront payment or surprise charges.
          </p>
        </div>

        {/* Progress Stepper Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs mb-8 overflow-x-auto custom-scroll">
          <div className="flex items-center justify-between min-w-[560px] relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-slate-200 -translate-y-2.5 z-0"></div>

            {stepsList.map((step) => {
              const isCompleted = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => handleGoToStep(step.num)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-hidden"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-[#0B1320] text-white ring-4 ring-blue-100 shadow-md scale-105'
                        : 'bg-white border-2 border-slate-300 text-slate-400 group-hover:border-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <StepIcon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-bold mt-2 whitespace-nowrap ${
                      isCurrent
                        ? 'text-[#0B1320]'
                        : isCompleted
                        ? 'text-emerald-700'
                        : 'text-slate-500'
                    }`}
                  >
                    {step.num}. {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Validation error notification alert if triggered */}
        {validationError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <p className="font-semibold">{validationError}</p>
          </div>
        )}

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Active Step Form (7 or 8 columns on desktop) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm">
            {currentStep === 1 && (
              <Step1Car
                selectedBrand={request.brand}
                customBrand={request.customBrand}
                selectedModel={request.model}
                customModel={request.customModel}
                selectedYear={request.year}
                onSelectBrand={handleSelectBrand}
                onChangeCustomBrand={(val) => setRequest(p => ({ ...p, customBrand: val }))}
                onSelectModel={(val) => {
                  setRequest(p => ({ ...p, model: val }));
                  setValidationError(null);
                }}
                onChangeCustomModel={(val) => setRequest(p => ({ ...p, customModel: val }))}
                onSelectYear={(yr) => setRequest(p => ({ ...p, year: yr }))}
              />
            )}

            {currentStep === 2 && (
              <Step2Damage
                selectedParts={request.damagedParts}
                customPart={request.customPart}
                onTogglePart={handleTogglePart}
                onChangeCustomPart={(val) => setRequest(p => ({ ...p, customPart: val }))}
              />
            )}

            {currentStep === 3 && (
              <Step3Services
                selectedServices={request.services}
                onToggleService={handleToggleService}
              />
            )}

            {currentStep === 4 && (
              <Step4PickupDrop
                pickupDrop={request.pickupDrop}
                customerPhone={request.customer.mobileNumber}
                onChangePickupDrop={(updates) => {
                  setRequest(p => ({
                    ...p,
                    pickupDrop: { ...p.pickupDrop, ...updates }
                  }));
                }}
              />
            )}

            {currentStep === 5 && (
              <Step5Details
                customer={request.customer}
                onChangeCustomer={(updates) => {
                  setRequest(p => ({
                    ...p,
                    customer: { ...p.customer, ...updates }
                  }));
                }}
              />
            )}

            {currentStep === 6 && (
              <Step6WhatsAppConfirm
                request={request}
                workshopConfig={workshopConfig}
                onOpenSimulator={onOpenSimulator}
                onGoBack={handleBack}
              />
            )}

            {/* Stepper Navigation Buttons Footer */}
            <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 6 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-white bg-[#0B1320] hover:bg-[#1E293B] shadow-md transition-all cursor-pointer ml-auto"
                >
                  <span>{currentStep === 5 ? 'Review & WhatsApp' : 'Continue to Next Step'}</span>
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                </button>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Live Request Summary (4 columns on desktop) */}
          <div className="lg:col-span-4">
            <LiveSummaryCard
              request={request}
              workshopConfig={workshopConfig}
              onGoToStep={handleGoToStep}
              onOpenSimulator={onOpenSimulator}
              isFinalStep={currentStep === 6}
            />
          </div>

        </div>

      </div>
    </section>
  );
};
