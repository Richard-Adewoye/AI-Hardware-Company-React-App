import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Menu,
  Monitor,
  Smartphone,
  Sparkles,
  Sun,
  Moon,
  Zap,
  Activity,
  Terminal,
  Radio,
  BarChart3,
  Code2,
  Users,
  LayoutGrid,
  Search,
  X,
  ArrowUpRight,
  Copy,
  Check,
} from 'lucide-react';
import { Project, PromptTemplate } from '../types';

interface HeaderNavProps {
  onJoinUsClick: () => void;
  onEcosystemClick: () => void;
  viewMode: 'desktop' | 'mobile-device' | 'stacked';
  setViewMode: (mode: 'desktop' | 'mobile-device' | 'stacked') => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  projects?: Project[];
  prompts?: PromptTemplate[];
  onOpenProjectDetail?: (project: Project) => void;
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
  searchQuery = '',
  setSearchQuery,
  projects = [],
  prompts = [],
  onOpenProjectDetail,
}) => {
  const [activeSection, setActiveSection] = useState<string>('workspace');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

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

  // Global Keyboard shortcut listener for Cmd+K / Ctrl+K / '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  // Filter projects and prompts for real-time live search dropdown
  const queryLower = searchQuery.toLowerCase().trim();

  const matchingProjects = queryLower
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(queryLower) ||
          p.category.toLowerCase().includes(queryLower) ||
          p.description.toLowerCase().includes(queryLower) ||
          p.techStack.some((t) => t.toLowerCase().includes(queryLower))
      )
    : [];

  const matchingPrompts = queryLower
    ? prompts.filter(
        (p) =>
          p.title.toLowerCase().includes(queryLower) ||
          p.category.toLowerCase().includes(queryLower) ||
          p.promptText.toLowerCase().includes(queryLower)
      )
    : [];

  const totalMatches = matchingProjects.length + matchingPrompts.length;

  const handleCopyPromptText = (e: React.MouseEvent, prompt: PromptTemplate) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.promptText);
    setCopiedPromptId(prompt.id);
    setTimeout(() => setCopiedPromptId(null), 2000);
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
        <div className="flex items-center justify-between gap-2.5 w-full pb-2.5 border-b border-neutral-200/60 dark:border-slate-800/80">
          {/* Left indicator tag or View Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm transition-colors ${
                isDarkMode
                  ? 'bg-slate-900/90 border border-cyan-500/30 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                  : 'bg-white/80 border border-neutral-200/80 text-neutral-700 shadow-2xs'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 animate-pulse ${isDarkMode ? 'text-cyan-400' : 'text-amber-500'}`} />
              Aempore Studio
            </span>

            {/* Desktop vs Mobile Device Toggle */}
            <div
              className={`hidden xl:flex items-center p-0.5 rounded-full text-xs transition-colors ${
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
                With Frame
              </button>
            </div>
          </div>

          {/* Middle: Real-time Global Search Bar */}
          <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-1 sm:mx-2">
            <div
              className={`relative flex items-center rounded-full px-3 py-1.5 border transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-900/90 border-slate-700/80 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 text-slate-100 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]'
                  : 'bg-neutral-100/90 border-neutral-300/80 focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-400/20 text-neutral-900 shadow-2xs'
              }`}
            >
              <Search className={`w-3.5 h-3.5 shrink-0 mr-2 ${isDarkMode ? 'text-cyan-400' : 'text-neutral-500'}`} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  if (setSearchQuery) setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Search projects & prompts..."
                className="w-full bg-transparent text-xs outline-none placeholder:text-neutral-400 dark:placeholder:text-slate-500 font-medium"
              />
              {searchQuery ? (
                <button
                  onClick={() => {
                    if (setSearchQuery) setSearchQuery('');
                    setIsDropdownOpen(false);
                  }}
                  className="p-0.5 rounded-full hover:bg-neutral-200 dark:hover:bg-slate-800 text-neutral-400 hover:text-neutral-600 dark:hover:text-slate-200 transition-colors"
                  title="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-400 dark:text-slate-500 bg-neutral-200/60 dark:bg-slate-800/80 border border-neutral-300/50 dark:border-slate-700/70 shrink-0">
                  ⌘K
                </kbd>
              )}
            </div>

            {/* Real-time Live Dropdown Results Popup */}
            {isDropdownOpen && queryLower && (
              <div
                className={`absolute left-0 right-0 top-full mt-2 rounded-2xl border p-3 shadow-2xl backdrop-blur-2xl z-50 max-h-[380px] overflow-y-auto ${
                  isDarkMode
                    ? 'bg-slate-950/95 border-cyan-500/30 text-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.8)]'
                    : 'bg-white/95 border-neutral-200 text-neutral-900 shadow-xl'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200/60 dark:border-slate-800 text-[11px] font-bold text-neutral-400 dark:text-slate-400 uppercase tracking-wider">
                  <span>Results ({totalMatches})</span>
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="text-xs hover:text-neutral-700 dark:hover:text-slate-200"
                  >
                    Close [Esc]
                  </button>
                </div>

                {totalMatches === 0 ? (
                  <div className="py-6 text-center text-xs text-neutral-500 dark:text-slate-400">
                    No projects or prompts found matching &ldquo;<span className="font-semibold text-neutral-800 dark:text-slate-200">{searchQuery}</span>&rdquo;
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    {/* Projects Section */}
                    {matchingProjects.length > 0 && (
                      <div>
                        <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1.5 px-1">
                          Project Showcases ({matchingProjects.length})
                        </div>
                        <div className="space-y-1">
                          {matchingProjects.map((project) => (
                            <div
                              key={project.id}
                              onClick={() => {
                                setIsDropdownOpen(false);
                                if (onOpenProjectDetail) onOpenProjectDetail(project);
                              }}
                              className={`p-2 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                                isDarkMode ? 'hover:bg-slate-900/80' : 'hover:bg-neutral-100'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                {project.imageUrl && (
                                  <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-8 h-8 rounded-lg object-cover shrink-0"
                                  />
                                )}
                                <div className="truncate">
                                  <div className="text-xs font-semibold truncate flex items-center gap-1.5">
                                    <span>{project.title}</span>
                                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 shrink-0">
                                      #{project.number}
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-neutral-500 dark:text-slate-400 truncate">
                                    {project.category} • {project.tagline}
                                  </div>
                                </div>
                              </div>
                              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 dark:text-slate-500 shrink-0 ml-1" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Prompts Section */}
                    {matchingPrompts.length > 0 && (
                      <div>
                        <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1.5 px-1">
                          Prompt Library ({matchingPrompts.length})
                        </div>
                        <div className="space-y-1">
                          {matchingPrompts.map((prompt) => (
                            <div
                              key={prompt.id}
                              onClick={() => {
                                setIsDropdownOpen(false);
                                scrollToSection('workbench');
                              }}
                              className={`p-2 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                                isDarkMode ? 'hover:bg-slate-900/80' : 'hover:bg-neutral-100'
                              }`}
                            >
                              <div className="truncate pr-2">
                                <div className="text-xs font-semibold truncate text-neutral-800 dark:text-slate-200">
                                  {prompt.title}
                                </div>
                                <div className="text-[10px] text-neutral-500 dark:text-slate-400 font-mono truncate">
                                  {prompt.promptText}
                                </div>
                              </div>
                              <button
                                onClick={(e) => handleCopyPromptText(e, prompt)}
                                className={`p-1.5 rounded-lg border text-[10px] font-semibold flex items-center gap-1 shrink-0 transition-all ${
                                  copiedPromptId === prompt.id
                                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                                    : isDarkMode
                                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-cyan-300'
                                    : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:bg-neutral-200'
                                }`}
                                title="Copy prompt text"
                              >
                                {copiedPromptId === prompt.id ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    Copy
                                  </>
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
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

