import React, { useState, useMemo } from 'react';
import { Search, Car, Check, Calendar } from 'lucide-react';
import { CAR_BRANDS, CAR_YEARS } from '../../data/carData';

interface Step1CarProps {
  selectedBrand: string;
  customBrand?: string;
  selectedModel: string;
  customModel?: string;
  selectedYear?: string;
  onSelectBrand: (brandName: string) => void;
  onChangeCustomBrand: (val: string) => void;
  onSelectModel: (modelName: string) => void;
  onChangeCustomModel: (val: string) => void;
  onSelectYear: (year: string) => void;
}

export const Step1Car: React.FC<Step1CarProps> = ({
  selectedBrand,
  customBrand,
  selectedModel,
  customModel,
  selectedYear,
  onSelectBrand,
  onChangeCustomBrand,
  onSelectModel,
  onChangeCustomModel,
  onSelectYear
}) => {
  const [brandSearch, setBrandSearch] = useState('');
  const [modelSearch, setModelSearch] = useState('');

  // Current brand object
  const currentBrandObj = useMemo(() => {
    return CAR_BRANDS.find(b => b.name.toLowerCase() === selectedBrand.toLowerCase());
  }, [selectedBrand]);

  // Filtered brands
  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return CAR_BRANDS;
    return CAR_BRANDS.filter(b =>
      b.name.toLowerCase().includes(brandSearch.toLowerCase())
    );
  }, [brandSearch]);

  // Available models for selected brand
  const availableModels = useMemo(() => {
    if (!currentBrandObj) return [];
    if (!modelSearch.trim()) return currentBrandObj.models;
    return currentBrandObj.models.filter(m =>
      m.toLowerCase().includes(modelSearch.toLowerCase())
    );
  }, [currentBrandObj, modelSearch]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E56A0] bg-blue-50 px-2.5 py-0.5 rounded-md">
            Step 01
          </span>
          <span className="text-xs text-slate-500">Vehicle Identification</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1320] tracking-tight">
          Tell us about your car
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600">
          Select your car brand and model so our paint technicians can look up exact OEM color codes and panel specifications.
        </p>
      </div>

      {/* 1. SELECT CAR BRAND */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>1. Select Car Brand</span>
            {selectedBrand && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3" />
                {selectedBrand}
              </span>
            )}
          </label>

          {/* Quick search input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search brand (e.g. Hyundai, Tata)..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Popular Quick Brand Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Toyota', 'Honda', 'Kia', 'Volkswagen'].map(brandName => {
            const isPicked = selectedBrand.toLowerCase() === brandName.toLowerCase();
            return (
              <button
                key={brandName}
                type="button"
                onClick={() => onSelectBrand(brandName)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isPicked
                    ? 'bg-[#0B1320] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {brandName}
              </button>
            );
          })}
        </div>

        {/* Full Brand Select Grid / List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1 custom-scroll p-1 border border-slate-200 rounded-xl bg-slate-50/50">
          {filteredBrands.map((brand) => {
            const isPicked = selectedBrand.toLowerCase() === brand.name.toLowerCase();
            return (
              <button
                key={brand.id}
                type="button"
                onClick={() => onSelectBrand(brand.name)}
                className={`p-3 rounded-lg text-left transition-all flex items-center justify-between border cursor-pointer ${
                  isPicked
                    ? 'bg-white border-[#1E56A0] ring-2 ring-[#1E56A0]/20 shadow-xs'
                    : 'bg-white hover:bg-slate-100/80 border-slate-200 text-slate-800'
                }`}
              >
                <span className={`text-xs font-bold ${isPicked ? 'text-[#1E56A0]' : 'text-slate-800'}`}>
                  {brand.name}
                </span>
                {isPicked && <Check className="w-3.5 h-3.5 text-[#1E56A0] shrink-0" />}
              </button>
            );
          })}

          {filteredBrands.length === 0 && (
            <div className="col-span-full py-6 text-center text-xs text-slate-500">
              No matching brands found. Try selecting "Other Brand" below.
            </div>
          )}
        </div>

        {/* If 'Other Brand' selected, show custom text input */}
        {selectedBrand.toLowerCase() === 'other brand' && (
          <div className="mt-3 p-3 bg-blue-50/50 border border-blue-200 rounded-xl">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Enter Your Car Brand Name:
            </label>
            <input
              type="text"
              placeholder="e.g. Fiat, Chevrolet, Lexus..."
              value={customBrand || ''}
              onChange={(e) => onChangeCustomBrand(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* 2. SELECT CAR MODEL (DYNAMIC) */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>2. Select Car Model</span>
            {selectedModel && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3" />
                {selectedModel}
              </span>
            )}
          </label>

          {/* Model Search filter */}
          {selectedBrand && (
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${selectedBrand} models...`}
                value={modelSearch}
                onChange={(e) => setModelSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              />
            </div>
          )}
        </div>

        {!selectedBrand ? (
          <div className="p-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center">
            <Car className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">Please select a car brand first</p>
            <p className="text-xs text-slate-500 mt-1">
              Available models will appear dynamically based on your chosen make.
            </p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-52 overflow-y-auto pr-1 p-1 border border-slate-200 rounded-xl bg-slate-50/50">
              {availableModels.map((model) => {
                const isPicked = selectedModel === model;
                return (
                  <button
                    key={model}
                    type="button"
                    onClick={() => onSelectModel(model)}
                    className={`p-3 rounded-lg text-left transition-all flex items-center justify-between border cursor-pointer ${
                      isPicked
                        ? 'bg-white border-[#1E56A0] ring-2 ring-[#1E56A0]/20 shadow-xs'
                        : 'bg-white hover:bg-slate-100/80 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span className={`text-xs font-bold ${isPicked ? 'text-[#1E56A0]' : 'text-slate-800'}`}>
                      {model}
                    </span>
                    {isPicked && <Check className="w-3.5 h-3.5 text-[#1E56A0] shrink-0" />}
                  </button>
                );
              })}

              {availableModels.length === 0 && (
                <div className="col-span-full py-6 text-center text-xs text-slate-500">
                  No model found matching "{modelSearch}". Select "Other" to enter manually.
                </div>
              )}
            </div>

            {/* If 'Other' model selected */}
            {(selectedModel === 'Other' || selectedModel === 'Other Model') && (
              <div className="mt-3 p-3 bg-blue-50/50 border border-blue-200 rounded-xl">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specify Your Model / Variant:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Verna Turbo SX, Safari Gold Edition..."
                  value={customModel || ''}
                  onChange={(e) => onChangeCustomModel(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. SELECT CAR YEAR */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#1E56A0]" />
            <span>3. Select Manufacturing Year</span>
            {selectedYear && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3" />
                {selectedYear}
              </span>
            )}
          </label>

          <span className="text-xs text-slate-500">Helps match OEM paint code & clear-coat aging</span>
        </div>

        {/* Quick Year Selection Pills */}
        <div className="flex flex-wrap gap-2">
          {CAR_YEARS.slice(0, 11).map((yr) => {
            const isPicked = selectedYear === yr;
            return (
              <button
                key={yr}
                type="button"
                onClick={() => onSelectYear(yr)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isPicked
                    ? 'bg-[#0B1320] text-white shadow-xs ring-2 ring-[#0B1320]/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {yr}
              </button>
            );
          })}
        </div>

        {/* Dropdown for any year */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1">
          <div className="relative w-full sm:w-64">
            <select
              value={selectedYear || ''}
              onChange={(e) => onSelectYear(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            >
              <option value="">-- Choose from all years --</option>
              {CAR_YEARS.map((yr) => (
                <option key={yr} value={yr}>
                  Year {yr}
                </option>
              ))}
            </select>
          </div>

          <p className="text-[11px] text-slate-500">
            Paint formulations and clear coat layers vary by production year.
          </p>
        </div>
      </div>
    </div>
  );
};
