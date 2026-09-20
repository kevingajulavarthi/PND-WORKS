import React from 'react';

interface CarSchematicProps {
  selectedParts: string[];
  onTogglePart: (partId: string) => void;
}

export const CarSchematic: React.FC<CarSchematicProps> = ({ selectedParts, onTogglePart }) => {
  // Check if a part is selected
  const isSel = (id: string) => selectedParts.includes(id);

  return (
    <div className="bg-slate-900 rounded-2xl p-5 text-white border border-slate-800 shadow-inner">
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Interactive Vehicle Body Map
        </span>
        <span className="text-slate-400">Click highlighted zones to select/deselect</span>
      </div>

      <div className="relative w-full max-w-lg mx-auto py-2 flex items-center justify-center">
        {/* SVG stylized top-down & side perspective vehicle blueprint */}
        <svg
          viewBox="0 0 500 220"
          className="w-full h-auto max-h-[220px] select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background grid subtle lines */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
          <rect width="500" height="220" fill="url(#grid)" rx="10" />

          {/* Wheels / Tires */}
          <rect x="70" y="24" width="36" height="14" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <rect x="70" y="182" width="36" height="14" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <rect x="380" y="24" width="36" height="14" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <rect x="380" y="182" width="36" height="14" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

          {/* FRONT BUMPER (x: 20 to 55) */}
          <g
            onClick={() => onTogglePart('front-bumper')}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <path
              d="M 20 70 Q 15 110 20 150 L 50 145 L 50 75 Z"
              fill={isSel('front-bumper') ? '#2563EB' : '#1e293b'}
              stroke={isSel('front-bumper') ? '#60A5FA' : '#475569'}
              strokeWidth="2"
            />
            <text x="32" y="114" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
              FRONT BUMPER
            </text>
          </g>

          {/* BONNET (x: 52 to 140) */}
          <g
            onClick={() => onTogglePart('bonnet')}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <polygon
              points="55,68 140,58 140,162 55,152"
              fill={isSel('bonnet') ? '#2563EB' : '#1e293b'}
              stroke={isSel('bonnet') ? '#60A5FA' : '#475569'}
              strokeWidth="2"
            />
            <text x="96" y="114" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
              BONNET (HOOD)
            </text>
          </g>

          {/* LEFT FENDER (top of car in top-down view) */}
          <g
            onClick={() => onTogglePart('left-front-fender')}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <path
              d="M 55 42 L 140 38 L 140 56 L 55 66 Z"
              fill={isSel('left-front-fender') ? '#2563EB' : '#1e293b'}
              stroke={isSel('left-front-fender') ? '#60A5FA' : '#475569'}
              strokeWidth="1.5"
            />
            <text x="98" y="52" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              LEFT FENDER
            </text>
          </g>

          {/* RIGHT FENDER (bottom of car in top-down view) */}
          <g
            onClick={() => onTogglePart('right-front-fender')}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <path
              d="M 55 154 L 140 164 L 140 182 L 55 178 Z"
              fill={isSel('right-front-fender') ? '#2563EB' : '#1e293b'}
              stroke={isSel('right-front-fender') ? '#60A5FA' : '#475569'}
              strokeWidth="1.5"
            />
            <text x="98" y="173" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              RIGHT FENDER
            </text>
          </g>

          {/* ORVM Mirrors */}
          <g
            onClick={() => onTogglePart('left-orvm')}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <rect
              x="142"
              y="26"
              width="14"
              height="8"
              rx="2"
              fill={isSel('left-orvm') ? '#2563EB' : '#334155'}
              stroke={isSel('left-orvm') ? '#60A5FA' : '#64748B'}
            />
            <rect
              x="142"
              y="186"
              width="14"
              height="8"
              rx="2"
              fill={isSel('right-orvm') ? '#2563EB' : '#334155'}
              stroke={isSel('right-orvm') ? '#60A5FA' : '#64748B'}
              onClick={(event) => {
                event.stopPropagation();
                onTogglePart('right-orvm');
              }}
            />
          </g>

          {/* FRONT LEFT DOOR */}
          <g
            onClick={() => onTogglePart('left-front-door')}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <polygon
              points="144,38 230,36 230,56 144,56"
              fill={isSel('left-front-door') ? '#2563EB' : '#1e293b'}
              stroke={isSel('left-front-door') ? '#60A5FA' : '#475569'}
              strokeWidth="1.5"
            />
            <text x="187" y="50" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              FR LEFT DOOR
            </text>
          </g>

          {/* REAR LEFT DOOR */}
          <g
            onClick={() => onTogglePart('left-rear-door')}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <polygon
              points="234,36 320,38 320,56 234,56"
              fill={isSel('left-rear-door') ? '#2563EB' : '#1e293b'}
              stroke={isSel('left-rear-door') ? '#60A5FA' : '#475569'}
              strokeWidth="1.5"
            />
            <text x="277" y="50" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              RR LEFT DOOR
            </text>
          </g>

          {/* FRONT RIGHT DOOR */}
          <g
            onClick={() => onTogglePart('right-front-door')}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <polygon
              points="144,164 230,164 230,184 144,182"
              fill={isSel('right-front-door') ? '#2563EB' : '#1e293b'}
              stroke={isSel('right-front-door') ? '#60A5FA' : '#475569'}
              strokeWidth="1.5"
            />
            <text x="187" y="177" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              FR RIGHT DOOR
            </text>
          </g>

          {/* REAR RIGHT DOOR */}
          <g
            onClick={() => onTogglePart('right-rear-door')}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <polygon
              points="234,164 320,164 320,184 234,184"
              fill={isSel('right-rear-door') ? '#2563EB' : '#1e293b'}
              stroke={isSel('right-rear-door') ? '#60A5FA' : '#475569'}
              strokeWidth="1.5"
            />
            <text x="277" y="177" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              RR RIGHT DOOR
            </text>
          </g>

          {/* ROOF (center passenger cabin) */}
          <g
            onClick={() => onTogglePart('roof')}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            {/* Windshield front glass */}
            <polygon points="144,60 170,68 170,152 144,160" fill="#0f172a" stroke="#334155" />
            {/* Main metal roof */}
            <rect
              x="172"
              y="68"
              width="130"
              height="84"
              rx="4"
              fill={isSel('roof') ? '#2563EB' : '#1e293b'}
              stroke={isSel('roof') ? '#60A5FA' : '#475569'}
              strokeWidth="2"
            />
            <text x="237" y="114" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
              ROOF PANEL
            </text>
            {/* Rear windshield glass */}
            <polygon points="304,68 330,62 330,158 304,152" fill="#0f172a" stroke="#334155" />
          </g>

          {/* LEFT QUARTER PANEL */}
          <g
            onClick={() => onTogglePart('left-quarter-panel')}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <path
              d="M 324 38 L 410 44 L 410 68 L 324 58 Z"
              fill={isSel('left-quarter-panel') ? '#2563EB' : '#1e293b'}
              stroke={isSel('left-quarter-panel') ? '#60A5FA' : '#475569'}
              strokeWidth="1.5"
            />
            <text x="367" y="55" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              LT QUARTER
            </text>
          </g>

          {/* RIGHT QUARTER PANEL */}
          <g
            onClick={() => onTogglePart('right-quarter-panel')}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <path
              d="M 324 162 L 410 152 L 410 176 L 324 182 Z"
              fill={isSel('right-quarter-panel') ? '#2563EB' : '#1e293b'}
              stroke={isSel('right-quarter-panel') ? '#60A5FA' : '#475569'}
              strokeWidth="1.5"
            />
            <text x="367" y="171" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              RT QUARTER
            </text>
          </g>

          {/* BOOT / TRUNK */}
          <g
            onClick={() => onTogglePart('boot-lid')}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <polygon
              points="334,64 425,72 425,148 334,156"
              fill={isSel('boot-lid') ? '#2563EB' : '#1e293b'}
              stroke={isSel('boot-lid') ? '#60A5FA' : '#475569'}
              strokeWidth="2"
            />
            <text x="380" y="114" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
              BOOT / TRUNK
            </text>
          </g>

          {/* REAR BUMPER */}
          <g
            onClick={() => onTogglePart('rear-bumper')}
            className="cursor-pointer transition-all hover:opacity-80"
          >
            <path
              d="M 428 72 L 460 76 Q 475 110 460 144 L 428 148 Z"
              fill={isSel('rear-bumper') ? '#2563EB' : '#1e293b'}
              stroke={isSel('rear-bumper') ? '#60A5FA' : '#475569'}
              strokeWidth="2"
            />
            <text x="445" y="114" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              REAR BUMPER
            </text>
          </g>
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 mt-2">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-[#2563EB] border border-blue-300"></span>
          Selected Part
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-xs bg-[#1e293b] border border-slate-600"></span>
          Normal Part
        </span>
        <span className="text-slate-500">• You can also pick from the checklist cards below</span>
      </div>
    </div>
  );
};
