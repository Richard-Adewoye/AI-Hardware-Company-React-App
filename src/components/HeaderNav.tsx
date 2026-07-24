import React, { useState, useEffect } from 'react';
import { Globe, Menu, Monitor, Smartphone, Sparkles, Sun, Moon, Zap, Activity, Terminal, Radio, BarChart3, Code2, Users, LayoutGrid } from 'lucide-react';

interface HeaderNavProps {
  onJoinUsClick: () => void;
  onEcosystemClick: () => void;
  viewMode: 'desktop' | 'mobile-device' | 'stacked';
  setViewMode: (mode: 'desktop' | 'mobile-device' | 'stacked') => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const NAV_SECTIONS = [
  { id: 'workspace', label: 'Workspace', icon: LayoutGrid },
  { id: 'telemetry', label: 'Telemetry', icon: Activity },
  { id: 'workbench', label: 'Workbench', icon: Terminal },
  { id: 'radar', label: 'Radar', icon: Radio },
  { id: 'benchmarks', label: 'Benchmarks', icon: BarChart3 },
  { id: 'sdk-hub', label: 'SDK Hub', icon: Code2 },
  { id: 'community', label: 'Community', icon: Users },
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onJoinUsClick,
  onEcosystemClick,
  viewMode,
  setViewMode,
  isDarkMode,
  onToggleTheme,
}) => {
  const [activeSection, setActiveSection] = useState<string>('workspace');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // Offset for header height

      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const sectionId = NAV_SECTIONS[i].id;
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full mb-6 pt-2 pb-1 transition-colors duration-300">
      <div
        className={`rounded-3xl p-3 sm:px-5 sm:py-3 backdrop-blur-xl border transition-all duration-300 shadow-md ${
          isDarkMode
            ? 'bg-slate-950/85 border-slate-800/90 text-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
            : 'bg-white/85 border-neutral-200/90 text-neutral-900 shadow-sm'
        }`}
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3 w-full pb-2.5 border-b border-neutral-200/60 dark:border-slate-800/80">
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
            {/* Theme Switcher Toggle */}
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

        {/* Scroll Spy Section Links Bar */}
        <div className="flex items-center gap-1.5 pt-2.5 overflow-x-auto no-scrollbar scroll-smooth">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 shrink-0 ${isDarkMode ? 'text-slate-500' : 'text-neutral-400'}`}>
            Navigate:
          </span>
          {NAV_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 active:scale-95 ${
                  isActive
                    ? isDarkMode
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.45)]'
                      : 'bg-neutral-900 text-white shadow-sm'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-cyan-300 hover:bg-slate-900/80'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? (isDarkMode ? 'text-slate-950' : 'text-white') : ''}`} />}
                <span>{section.label}</span>
                {isActive && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full animate-pulse ml-0.5 ${
                      isDarkMode ? 'bg-slate-950' : 'bg-emerald-400'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

