import React, { useState, useEffect } from 'react';
import { MessageCircle, ExternalLink, Copy, Check, Sparkles, Camera, ShieldCheck, Truck, Car, Wrench } from 'lucide-react';
import { ServiceRequestState, WorkshopConfig } from '../../types';
import { DAMAGE_PARTS, SERVICE_OPTIONS } from '../../data/carData';
import { formatWhatsAppMessage, openWhatsApp } from '../../utils/whatsapp';

interface Step6WhatsAppConfirmProps {
  request: ServiceRequestState;
  workshopConfig: WorkshopConfig;
  onOpenSimulator: () => void;
  onGoBack: () => void;
}

export const Step6WhatsAppConfirm: React.FC<Step6WhatsAppConfirmProps> = ({
  request,
  workshopConfig,
  onOpenSimulator,
  onGoBack
}) => {
  const [copied, setCopied] = useState(false);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);

  const brandName = request.brand === 'other' ? (request.customBrand || 'Other Brand') : request.brand;
  const modelName = request.model === 'Other' ? (request.customModel || 'Other Model') : request.model;
  const yearText = request.year ? ` (${request.year})` : '';
  const carText = `${brandName} ${modelName}${yearText}`.trim() || 'Vehicle';

  const partNames = request.damagedParts.map(id => {
    if (id === 'other-part') return request.customPart ? `Other (${request.customPart})` : 'Other Part';
    const found = DAMAGE_PARTS.find(p => p.id === id);
    return found ? found.name : id;
  });

  const serviceLabels = request.services.map(s => {
    const found = SERVICE_OPTIONS.find(opt => opt.id === s);
    return found ? found.title : s;
  });

  // Keep a local reference for the WhatsApp handoff; no server is required.
  useEffect(() => {
    const localReference = `PD-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setReferenceCode(localReference);
  }, []);

  // Format message, appending the official Reference Code if available
  const baseFormattedMsg = formatWhatsAppMessage(request, workshopConfig);
  const formattedMsg = referenceCode
    ? `${baseFormattedMsg}\n\n*Reference ID:* ${referenceCode}`
    : baseFormattedMsg;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedMsg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendToWhatsApp = () => {
    openWhatsApp(workshopConfig.whatsappNumber, formattedMsg);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
            Final Step
          </span>
          <span className="text-xs text-slate-500">Ready to Send</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320] tracking-tight">
          Your Service Request is Ready
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600">
          Click below to continue to WhatsApp. Our WhatsApp AI assistant will acknowledge your request and guide you to send 3 clear damage photos for accurate estimation.
        </p>
      </div>

      {/* Structured Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E56A0] flex items-center justify-center font-black">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Vehicle Selected</p>
              <h3 className="text-lg font-bold text-slate-900">{carText}</h3>
            </div>
          </div>
          <span className="text-xs text-emerald-800 font-bold bg-emerald-100/70 px-3 py-1 rounded-full flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Complete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Damage & Services */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5" />
                <span>Damaged Parts ({partNames.length})</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {partNames.length > 0 ? (
                  partNames.map(p => (
                    <span key={p} className="text-xs font-medium bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md">
                      ✓ {p}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">None selected</span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Services Requested</span>
              </p>
              <p className="text-sm font-bold text-slate-900">
                {serviceLabels.length > 0 ? serviceLabels.join(', ') : 'None selected'}
              </p>
            </div>
          </div>

          {/* Column 2: Logistics & Contact */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                <span>Pickup & Drop</span>
              </p>
              <p className="text-sm font-bold text-slate-900">
                {request.pickupDrop.needed ? (
                  <span className="text-emerald-700">Yes, Doorstep Pickup Required</span>
                ) : (
                  'No (Self-drop at workshop)'
                )}
              </p>
              {request.pickupDrop.needed && request.pickupDrop.address && (
                <p className="text-xs text-slate-600 mt-0.5">
                  📍 {request.pickupDrop.address}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Customer Details
              </p>
              <p className="text-sm font-bold text-slate-900">
                {request.customer.fullName || 'Valued Customer'} • {request.customer.mobileNumber || 'Phone pending'}
              </p>
              {request.customer.preferredVisit && (
                <p className="text-xs text-slate-500 mt-0.5">
                  Visit preference: {request.customer.preferredVisit}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* WhatsApp Message Preview Bubble */}
        <div className="rounded-xl bg-[#EFEAE2] p-4 border border-[#DAD3C8] shadow-inner text-slate-800 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              Automated WhatsApp Message Preview
            </span>
            <span className="text-[11px] text-slate-500">Auto-sent on click</span>
          </div>

          <pre className="text-xs font-mono whitespace-pre-wrap bg-white p-3.5 rounded-lg border border-slate-200 text-slate-800 leading-relaxed max-h-48 overflow-y-auto">
            {formattedMsg}
          </pre>
        </div>

        {/* Secure Request Reference Badge */}
        {referenceCode && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                Secure Workshop Ticket Assigned: <strong className="font-mono text-emerald-950">{referenceCode}</strong>
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-200/60 text-emerald-800 px-2 py-0.5 rounded">
              Verified
            </span>
          </div>
        )}

        {/* Next Step Instruction: Send Photos */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
          <Camera className="w-5 h-5 text-[#1E56A0] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-slate-900">What happens next on WhatsApp?</p>
            <p className="text-slate-600 leading-relaxed">
              Once you tap Continue, WhatsApp will open with your workshop details pre-filled. Our WhatsApp AI will ask you to send 3 clear photos of the damage (overview, close-up, and alternate angle) so our team can review and provide the exact quote.
            </p>
          </div>
        </div>

        {/* Main CTA */}
        <div className="pt-2 space-y-3">
          <button
            type="button"
            onClick={handleSendToWhatsApp}
            className="w-full py-4 px-6 rounded-xl text-base font-bold text-white bg-[#25D366] hover:bg-[#1ebd5a] shadow-lg shadow-emerald-950/15 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 fill-white text-white" />
            <span>Continue on WhatsApp</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Message Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy Message Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenSimulator}
              className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl text-xs font-bold text-[#1E56A0] bg-blue-50 hover:bg-blue-100/70 border border-blue-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Test in WhatsApp AI Simulator</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
