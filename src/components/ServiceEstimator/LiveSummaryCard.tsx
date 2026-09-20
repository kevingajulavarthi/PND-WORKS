import React, { useState } from 'react';
import { Car, Wrench, Truck, User, FileText, MessageCircle, Copy, Check, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { ServiceRequestState, WorkshopConfig } from '../../types';
import { DAMAGE_PARTS, SERVICE_OPTIONS } from '../../data/carData';
import { formatWhatsAppMessage, openWhatsApp } from '../../utils/whatsapp';

interface LiveSummaryCardProps {
  request: ServiceRequestState;
  workshopConfig: WorkshopConfig;
  onGoToStep: (stepNumber: number) => void;
  onOpenSimulator: () => void;
  isFinalStep?: boolean;
}

export const LiveSummaryCard: React.FC<LiveSummaryCardProps> = ({
  request,
  workshopConfig,
  onGoToStep,
  onOpenSimulator,
  isFinalStep = false
}) => {
  const [copied, setCopied] = useState(false);

  const brandName = request.brand === 'other' ? (request.customBrand || 'Other Brand') : request.brand;
  const modelName = request.model === 'Other' ? (request.customModel || 'Other Model') : request.model;
  const yearText = request.year ? ` (${request.year})` : '';
  const carText = brandName && modelName ? `${brandName} ${modelName}${yearText}` : (brandName ? `${brandName}${yearText}` : 'Select your car');

  // Part names
  const partNames = request.damagedParts.map(id => {
    if (id === 'other-part') return request.customPart ? `Other (${request.customPart})` : 'Other Part';
    const found = DAMAGE_PARTS.find(p => p.id === id);
    return found ? found.name : id;
  });

  // Services
  const serviceLabels = request.services.map(s => {
    const found = SERVICE_OPTIONS.find(opt => opt.id === s);
    return found ? found.title : s;
  });

  const formattedMsg = formatWhatsAppMessage(request, workshopConfig);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedMsg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendToWhatsApp = () => {
    openWhatsApp(workshopConfig.whatsappNumber, formattedMsg);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-5 sm:p-6 space-y-5 sticky top-24">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1E56A0] bg-blue-50 px-2 py-0.5 rounded-md">
            Live Overview
          </span>
          <h3 className="text-lg font-bold text-[#0B1320] mt-1">Your Service Request</h3>
        </div>
        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <MessageCircle className="w-4 h-4 fill-emerald-500 text-emerald-600" />
        </div>
      </div>

      {/* Itemized Rows */}
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Car */}
        <div className="flex items-start justify-between gap-3 group">
          <div className="flex items-start gap-2.5">
            <Car className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-slate-500 text-xs">Vehicle</p>
              <p className="font-bold text-slate-900">
                {carText || <span className="text-slate-400 italic">Not chosen yet</span>}
              </p>
            </div>
          </div>
          <button
            onClick={() => onGoToStep(1)}
            className="text-xs text-[#1E56A0] hover:underline font-semibold cursor-pointer shrink-0"
          >
            Edit
          </button>
        </div>

        {/* Damaged Parts */}
        <div className="flex items-start justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-start gap-2.5">
            <Wrench className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-slate-500 text-xs">
                Damaged Panels ({partNames.length})
              </p>
              {partNames.length > 0 ? (
                <div className="flex flex-wrap gap-1 mt-1">
                  {partNames.map((part) => (
                    <span
                      key={part}
                      className="inline-block bg-slate-100 text-slate-800 text-[11px] font-semibold px-2 py-0.5 rounded-md"
                    >
                      {part}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic text-xs mt-0.5">No panels selected</p>
              )}
            </div>
          </div>
          <button
            onClick={() => onGoToStep(2)}
            className="text-xs text-[#1E56A0] hover:underline font-semibold cursor-pointer shrink-0"
          >
            Edit
          </button>
        </div>

        {/* Services */}
        <div className="flex items-start justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-slate-500 text-xs">Requested Services</p>
              {serviceLabels.length > 0 ? (
                <p className="font-bold text-slate-900 mt-0.5">
                  {serviceLabels.join(' • ')}
                </p>
              ) : (
                <p className="text-slate-400 italic text-xs mt-0.5">No service chosen</p>
              )}
            </div>
          </div>
          <button
            onClick={() => onGoToStep(3)}
            className="text-xs text-[#1E56A0] hover:underline font-semibold cursor-pointer shrink-0"
          >
            Edit
          </button>
        </div>

        {/* Pickup & Drop */}
        <div className="flex items-start justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-start gap-2.5">
            <Truck className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-slate-500 text-xs">Pickup & Drop</p>
              <p className="font-bold text-slate-900 mt-0.5">
                {request.pickupDrop.needed ? (
                  <span className="text-emerald-700 font-semibold">
                    Required {request.pickupDrop.preferredDate ? `(${request.pickupDrop.preferredDate})` : ''}
                  </span>
                ) : (
                  <span>No (Self visit to workshop)</span>
                )}
              </p>
              {request.pickupDrop.needed && request.pickupDrop.address && (
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  📍 {request.pickupDrop.address}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => onGoToStep(4)}
            className="text-xs text-[#1E56A0] hover:underline font-semibold cursor-pointer shrink-0"
          >
            Edit
          </button>
        </div>

        {/* Customer Contact */}
        <div className="flex items-start justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-start gap-2.5">
            <User className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-slate-500 text-xs">Customer</p>
              <p className="font-bold text-slate-900 mt-0.5">
                {request.customer.fullName || <span className="text-slate-400 italic font-normal">Pending name</span>}
              </p>
              {request.customer.mobileNumber && (
                <p className="text-xs text-slate-500 font-medium">
                  {request.customer.mobileNumber}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => onGoToStep(5)}
            className="text-xs text-[#1E56A0] hover:underline font-semibold cursor-pointer shrink-0"
          >
            Edit
          </button>
        </div>

        {/* Additional notes if present */}
        {request.customer.additionalNotes && (
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-start gap-2">
              <FileText className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] text-slate-500">Notes:</p>
                <p className="text-xs text-slate-700 italic">"{request.customer.additionalNotes}"</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* No Fixed Pricing Notice Banner */}
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600 text-xs flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong className="text-slate-900">Zero Blind Pricing:</strong> Exact estimate is provided on WhatsApp after our workshop technicians review your damage photographs.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 space-y-2.5">
        <button
          type="button"
          onClick={handleSendToWhatsApp}
          className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#25D366] hover:bg-[#1ebd5a] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-white text-white" />
          <span>Continue on WhatsApp</span>
          <ExternalLink className="w-4 h-4 opacity-70" />
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            title="Copy formatted message to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenSimulator}
            className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/70 border border-blue-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            title="Preview how the WhatsApp AI Agent will respond"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI Bot Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
