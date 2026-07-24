import React from 'react';
import { Globe, Menu, Monitor, Smartphone, Sparkles, Sun, Moon, Zap } from 'lucide-react';

interface HeaderNavProps {
  onJoinUsClick: () => void;
  onEcosystemClick: () => void;
  viewMode: 'desktop' | 'mobile-device' | 'stacked';
  setViewMode: (mode: 'desktop' | 'mobile-device' | 'stacked') => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onJoinUsClick,
  onEcosystemClick,
  viewMode,
  setViewMode,
  isDarkMode,
  onToggleTheme,
}) => {
  return (
    <div className="flex items-center justify-between w-full mb-4 px-2 sm:px-4 py-2">
      {/* Left indicator tag or View Switcher */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm transition-colors ${
            isDarkMode
              ? 'bg-slate-900/90 border border-cyan-500/30 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
              : 'bg-white/80 border border-neutral-200/80 text-neutral-700 shadow-2xs'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 animate-pulse ${isDarkMode ? 'text-cyan-400' : 'text-amber-500'}`} />
          Aempore Studio v2.4
        </span>

        {/* Desktop vs Mobile Device Toggle */}
        <div
          className={`hidden md:flex items-center p-0.5 rounded-full text-xs transition-colors ${
            isDarkMode
              ? 'bg-slate-800/80 border border-slate-700/80 text-slate-300'
              : 'bg-neutral-200/60 border border-neutral-300/50 text-neutral-600'
          }`}
        >
          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
              viewMode === 'desktop'
                ? isDarkMode
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'bg-white text-neutral-900 shadow-2xs font-semibold'
                : 'hover:text-cyan-400'
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
                ? isDarkMode
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'bg-white text-neutral-900 shadow-2xs font-semibold'
                : 'hover:text-cyan-400'
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
        {/* Futuristic Theme Switcher Toggle */}
        <button
          onClick={onToggleTheme}
          className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 border ${
            isDarkMode
              ? 'bg-slate-900 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.35)] hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]'
              : 'bg-white border-neutral-300 text-neutral-800 shadow-2xs hover:border-neutral-400 hover:bg-neutral-50'
          }`}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Futuristic Dark Mode'}
        >
          {isDarkMode ? (
            <>
              <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse fill-cyan-400/20" />
              <span className="hidden sm:inline bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
                Futuristic Dark
              </span>
              <Sun className="w-3.5 h-3.5 text-amber-300 ml-0.5 group-hover:rotate-45 transition-transform" />
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-600 group-hover:-rotate-12 transition-transform" />
              <span className="hidden sm:inline text-neutral-700">Light Studio</span>
              <Zap className="w-3.5 h-3.5 text-amber-500 opacity-60" />
            </>
          )}
        </button>

        <button
          onClick={onJoinUsClick}
          className={`group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
            isDarkMode
              ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:brightness-110'
              : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isDarkMode ? 'bg-slate-950' : 'bg-emerald-400'}`} />
          • Join us
        </button>

        <button
          onClick={onEcosystemClick}
          className={`p-2 rounded-full transition-all active:scale-95 border ${
            isDarkMode
              ? 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40'
              : 'bg-white/80 hover:bg-white border-neutral-200/80 text-neutral-700 hover:text-neutral-900 shadow-2xs'
          }`}
          title="Language & Region"
        >
          <Globe className="w-4 h-4" />
        </button>

        <button
          onClick={onEcosystemClick}
          className={`p-2 rounded-full transition-all active:scale-95 border ${
            isDarkMode
              ? 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40'
              : 'bg-white/80 hover:bg-white border-neutral-200/80 text-neutral-700 hover:text-neutral-900 shadow-2xs'
          }`}
          title="Menu Options"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
