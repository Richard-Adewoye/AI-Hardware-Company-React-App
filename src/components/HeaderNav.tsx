import React from 'react';
import { Globe, Menu, Monitor, Smartphone, Sparkles } from 'lucide-react';

interface HeaderNavProps {
  onJoinUsClick: () => void;
  onEcosystemClick: () => void;
  viewMode: 'desktop' | 'mobile-device' | 'stacked';
  setViewMode: (mode: 'desktop' | 'mobile-device' | 'stacked') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onJoinUsClick,
  onEcosystemClick,
  viewMode,
  setViewMode,
}) => {
  return (
    <div className="flex items-center justify-between w-full mb-4 px-2 sm:px-4 py-2">
      {/* Left indicator tag or View Switcher */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 border border-neutral-200/80 text-neutral-700 shadow-2xs backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          Aempore Studio v2.4
        </span>

        {/* Desktop vs Mobile Device Toggle (for previewing the exact right side frame from screenshot) */}
        <div className="hidden md:flex items-center p-0.5 rounded-full bg-neutral-200/60 border border-neutral-300/50 text-xs text-neutral-600">
          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
              viewMode === 'desktop'
                ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                : 'hover:text-neutral-900'
            }`}
            title="Full Workspace Layout"
          >
            <Monitor className="w-3.5 h-3.5" />
            Workspace
          </button>
          <button
            onClick={() => setViewMode('mobile-device')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
              viewMode === 'mobile-device'
                ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                : 'hover:text-neutral-900'
            }`}
            title="Desktop + Mobile Device Frame View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            With Mobile Frame
          </button>
        </div>
      </div>

      {/* Right Navigation Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onJoinUsClick}
          className="group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-sm active:scale-95"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          • Join us
        </button>

        <button
          onClick={onEcosystemClick}
          className="p-2 rounded-full bg-white/80 hover:bg-white border border-neutral-200/80 text-neutral-700 hover:text-neutral-900 transition-all shadow-2xs active:scale-95"
          title="Language & Region"
        >
          <Globe className="w-4 h-4" />
        </button>

        <button
          onClick={onEcosystemClick}
          className="p-2 rounded-full bg-white/80 hover:bg-white border border-neutral-200/80 text-neutral-700 hover:text-neutral-900 transition-all shadow-2xs active:scale-95"
          title="Menu Options"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
