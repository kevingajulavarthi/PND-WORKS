import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const isDark = variant === 'dark';

  const imageSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14'
  };

  const titleSizes = {
    sm: 'text-base font-extrabold',
    md: 'text-xl font-extrabold',
    lg: 'text-2xl sm:text-3xl font-black'
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-widest',
    md: 'text-[10px] tracking-widest',
    lg: 'text-xs tracking-widest'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon / Emblem */}
      <div
        className={`relative overflow-hidden rounded-xl flex items-center justify-center shrink-0 shadow-sm border transition-transform bg-white ${
          imageSizes[size]
        } ${
          isDark
            ? 'border-slate-700 shadow-slate-950/40 p-1'
            : 'border-slate-200/90 shadow-slate-900/5 p-0.5'
        }`}
      >
        <img
          src="/pd-works-logo.jpg"
          alt="P\\D WORKS Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Brand Name & Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline tracking-tight">
          <span
            id="brand-logo-pd-mark"
            className={`inline-flex items-center tracking-tight font-black ${titleSizes[size]}`}
          >
            <span className={`${isDark ? 'text-white' : 'text-[#0B1320]'} transition-colors`}>
              P
            </span>
            {/* Custom Automotive Angled Speed Slash */}
            <span className="inline-flex items-center justify-center mx-1 relative select-none">
              <span className="w-1 sm:w-1.5 h-3.5 sm:h-5 bg-gradient-to-b from-[#3B82F6] to-[#1E60D5] -skew-x-[24deg] transform rounded-[1px] shadow-sm"></span>
            </span>
            <span className="text-[#1E60D5] transition-colors">
              D
            </span>
          </span>
          <span
            id="brand-logo-works-text"
            className={`ml-1.5 font-black uppercase ${titleSizes[size]} tracking-[0.14em] ${
              isDark ? 'text-slate-100' : 'text-[#0B1320]'
            }`}
          >
            WORKS
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-[2px] bg-[#1E60D5] rounded-full hidden sm:inline-block"></span>
            <span className={`${subtitleSizes[size]} uppercase font-extrabold text-[#1E60D5] tracking-[0.2em]`}>
              PAINTING AND DENTING
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
