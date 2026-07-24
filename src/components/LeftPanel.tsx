import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ChevronLeft, Grid2X2, Phone, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { Company } from '../types';

interface LeftPanelProps {
  companies: Company[];
  selectedCompany: Company;
  onSelectCompany: (company: Company) => void;
  onSeeAllCompanies: () => void;
  onVisitPortfolio: () => void;
  onOpenPromptCategory: (category: string) => void;
  isDarkMode?: boolean;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  companies,
  selectedCompany,
  onSelectCompany,
  onSeeAllCompanies,
  onVisitPortfolio,
  onOpenPromptCategory,
  isDarkMode = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`backdrop-blur-md rounded-[28px] p-5 sm:p-6 flex flex-col justify-between transition-colors duration-300 w-full min-h-[640px] border ${
        isDarkMode
          ? 'bg-slate-900/90 border-cyan-500/30 text-slate-100 shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]'
          : 'bg-white/90 border-neutral-200/90 text-neutral-900 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Top Header Row */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-1.5 rounded-lg ${
                isDarkMode
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                  : 'bg-neutral-100 text-neutral-800'
              }`}
            >
              <Grid2X2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span
              className={`font-bold text-lg tracking-tight ${
                isDarkMode ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'text-neutral-900'
              }`}
            >
              {selectedCompany.name}
            </span>
          </div>

          <button
            onClick={onSeeAllCompanies}
            className={`p-1.5 rounded-full border transition-colors ${
              isDarkMode
                ? 'border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40'
                : 'border-neutral-200 hover:bg-neutral-100 text-neutral-600'
            }`}
            title="Go back / View Directory"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Company Pills Filter Array */}
        <div className="flex flex-wrap gap-2 pt-1">
          {companies.map((comp) => {
            const isSelected = comp.id === selectedCompany.id;
            return (
              <button
                key={comp.id}
                onClick={() => onSelectCompany(comp)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.5)] scale-[1.02]'
                      : 'bg-neutral-900 text-white shadow-xs font-semibold scale-[1.02]'
                    : isDarkMode
                    ? 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:border-cyan-500/40 hover:text-cyan-300'
                    : 'bg-neutral-100/90 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900 border border-transparent'
                }`}
              >
                {comp.name}
              </button>
            );
          })}
        </div>

        {/* Sub-link to all companies */}
        <div className="pt-0.5">
          <button
            onClick={onSeeAllCompanies}
            className={`group inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors ${
              isDarkMode
                ? 'text-cyan-300 hover:text-cyan-200'
                : 'text-neutral-800 hover:text-neutral-900'
            }`}
          >
            <span className={isDarkMode ? 'text-cyan-400' : 'text-neutral-900'}>•</span> See all AI Companies
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Company Description Bio */}
        <p
          className={`text-xs sm:text-[13px] leading-relaxed font-normal ${
            isDarkMode ? 'text-slate-400' : 'text-neutral-500'
          }`}
        >
          {selectedCompany.description}
        </p>

        {/* Media / Feature Banner Pills (Machine Learning & Computer Vision) */}
        <div className="space-y-2.5 pt-1">
          {/* Machine Learning Banner */}
          <div
            onClick={() => onOpenPromptCategory('Machine Learning')}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl h-12 p-3 flex items-center justify-between text-white shadow-xs transition-transform hover:scale-[1.01] ${
              isDarkMode ? 'ring-1 ring-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : ''
            }`}
            style={{
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 backdrop-blur-3xs" />
            <div className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span className="text-xs font-semibold tracking-wide text-white drop-shadow-2xs">
                Machine Learning
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>

          {/* Computer Vision Banner */}
          <div
            onClick={() => onOpenPromptCategory('Computer Vision')}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl h-12 p-3 flex items-center justify-between text-neutral-900 shadow-xs transition-transform hover:scale-[1.01] ${
              isDarkMode ? 'ring-1 ring-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : ''
            }`}
            style={{
              background: isDarkMode
                ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                : 'linear-gradient(135deg, #d8bc88 0%, #a88a53 100%)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-yellow-600/20 backdrop-blur-3xs" />
            <div className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-950/80" />
              <span className="text-xs font-semibold tracking-wide text-amber-950">
                Computer Vision
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-amber-950/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Bottom Section: Connect Info + Footer + CTA */}
      <div
        className={`space-y-4 pt-6 mt-4 border-t ${
          isDarkMode ? 'border-slate-800' : 'border-neutral-100'
        }`}
      >
        <div className="space-y-2">
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-cyan-400/80' : 'text-neutral-400'
            }`}
          >
            Connect with us
          </span>
          <div className="space-y-1.5 text-xs">
            <a
              href={`tel:${selectedCompany.phone}`}
              className={`flex items-center gap-2 font-medium group transition-colors ${
                isDarkMode ? 'text-slate-300 hover:text-cyan-300' : 'text-neutral-700 hover:text-neutral-900'
              }`}
            >
              <Phone className={`w-3.5 h-3.5 ${isDarkMode ? 'text-cyan-400' : 'text-neutral-400'}`} />
              <span>{selectedCompany.phone}</span>
            </a>
            <a
              href={`mailto:${selectedCompany.email}`}
              className={`flex items-center gap-2 font-medium group transition-colors ${
                isDarkMode ? 'text-slate-300 hover:text-cyan-300' : 'text-neutral-700 hover:text-neutral-900'
              }`}
            >
              <Mail className={`w-3.5 h-3.5 ${isDarkMode ? 'text-cyan-400' : 'text-neutral-400'}`} />
              <span>{selectedCompany.email}</span>
            </a>
          </div>
        </div>

        {/* Partnership copyright statement */}
        <p className={`text-[11px] leading-tight font-normal ${isDarkMode ? 'text-slate-500' : 'text-neutral-400'}`}>
          In partnership with Qclay Agency ©2023, All Rights Reserved
        </p>

        {/* Visit Portfolio Button */}
        <button
          onClick={onVisitPortfolio}
          className={`w-full py-2.5 px-4 rounded-full font-medium text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${
            isDarkMode
              ? 'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:brightness-110'
              : 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm'
          }`}
        >
          <span className={`${isDarkMode ? 'text-slate-950' : 'text-emerald-400'} text-base leading-none`}>•</span>
          <span>Visit portfolio</span>
        </button>
      </div>
    </motion.div>
  );
};
