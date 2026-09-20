import React, { useState } from 'react';
import { Check, Info, Plus, Palette } from 'lucide-react';
import { DAMAGE_PARTS } from '../../data/carData';
import { CarSchematic } from './CarSchematic';

interface Step2DamageProps {
  selectedParts: string[];
  customPart?: string;
  onTogglePart: (partId: string) => void;
  onSelectAllParts?: () => void;
  onClearParts?: () => void;
  onChangeCustomPart: (val: string) => void;
}

export const Step2Damage: React.FC<Step2DamageProps> = ({
  selectedParts,
  customPart,
  onTogglePart,
  onChangeCustomPart
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Front' | 'Sides' | 'Rear' | 'Top / Other'>('All');

  const categories: ('All' | 'Front' | 'Sides' | 'Rear' | 'Top / Other')[] = [
    'All',
    'Front',
    'Sides',
    'Rear',
    'Top / Other'
  ];

  const displayedParts = DAMAGE_PARTS.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E56A0] bg-blue-50 px-2.5 py-0.5 rounded-md">
            Step 02
          </span>
          <span className="text-xs text-slate-500">Damage Mapping</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320] tracking-tight">
          Which part needs attention?
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600">
          Select one or multiple panels that have scratches, dents, or paint damage. You can click directly on the vehicle map or the cards below.
        </p>
      </div>

      {/* Interactive Vehicle Diagram */}
      <CarSchematic selectedParts={selectedParts} onTogglePart={onTogglePart} />

      {/* Selected Parts summary chips */}
      {selectedParts.length > 0 && (
        <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Selected Panels ({selectedParts.length})
            </span>
            <span className="text-xs text-slate-500">Click any badge to remove</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedParts.map((partId) => {
              const part = DAMAGE_PARTS.find(p => p.id === partId);
              const label = part ? part.name : partId;
              return (
                <button
                  key={partId}
                  type="button"
                  onClick={() => onTogglePart(partId)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1E56A0] text-white hover:bg-red-600 transition-colors cursor-pointer group shadow-xs"
                  title="Click to remove"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{label}</span>
                  <span className="opacity-60 group-hover:opacity-100 text-[10px] ml-0.5">✕</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Full Body Paint Quick Shortcut Banner */}
      <div
        onClick={() => onTogglePart('full-body')}
        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          selectedParts.includes('full-body')
            ? 'bg-blue-50/90 border-[#1E56A0] ring-2 ring-[#1E56A0]/20 shadow-xs'
            : 'bg-gradient-to-r from-[#0B1320] to-[#1E3A8A] text-white border-transparent hover:shadow-md'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              selectedParts.includes('full-body')
                ? 'bg-blue-100 text-[#1E56A0]'
                : 'bg-white/10 text-white'
            }`}
          >
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4
                className={`text-sm font-bold ${
                  selectedParts.includes('full-body') ? 'text-slate-900' : 'text-white'
                }`}
              >
                Full Body Paint / Complete Car Respray
              </h4>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  selectedParts.includes('full-body')
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-400/20 text-blue-200 border border-blue-300/30'
                }`}
              >
                {selectedParts.includes('full-body') ? '✓ Selected' : 'Complete Overhaul'}
              </span>
            </div>
            <p
              className={`text-xs mt-0.5 ${
                selectedParts.includes('full-body') ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              Full exterior respray across all panels, doors, bumpers, bonnet, boot and roof.
            </p>
          </div>
        </div>

        <button
          type="button"
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer ${
            selectedParts.includes('full-body')
              ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
              : 'bg-white text-slate-900 hover:bg-blue-50 shadow-xs'
          }`}
        >
          {selectedParts.includes('full-body') ? 'Remove' : 'Select Full Body'}
        </button>
      </div>

      {/* Category filter pills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-900">
            Select Car Panels (Multi-Select)
          </label>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Info className="w-3.5 h-3.5" />
            <span>Multiple selections allowed</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0B1320] text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {displayedParts.map((part) => {
            const isSelected = selectedParts.includes(part.id);

            return (
              <div
                key={part.id}
                onClick={() => onTogglePart(part.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                  isSelected
                    ? 'bg-blue-50/50 border-[#1E56A0] ring-2 ring-[#1E56A0]/20 shadow-xs'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200/90 text-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {part.category}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#1E56A0] text-white'
                          : 'border border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </div>
                  </div>

                  <h3 className={`text-sm font-bold ${isSelected ? 'text-[#1E56A0]' : 'text-slate-900'}`}>
                    {part.name}
                  </h3>

                  {part.description && (
                    <p className="text-xs text-slate-500 mt-1 leading-snug">
                      {part.description}
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-medium flex items-center gap-1 text-slate-500">
                  {isSelected ? (
                    <span className="text-blue-700 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Selected for inspection
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Tap to add
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* If 'Other Part' is selected */}
        {selectedParts.includes('other-part') && (
          <div className="mt-4 p-4 bg-blue-50/40 border border-blue-200 rounded-xl">
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Specify Other Damaged Area / Trim / Panel:
            </label>
            <input
              type="text"
              placeholder="e.g. Rear spoiler, alloy rim scratches, side running board..."
              value={customPart || ''}
              onChange={(e) => onChangeCustomPart(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};
