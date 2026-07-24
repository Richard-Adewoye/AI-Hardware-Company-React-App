import React from 'react';
import { ArrowUpRight, ChevronLeft, Grid2X2, Phone, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { Company } from '../types';

interface LeftPanelProps {
  companies: Company[];
  selectedCompany: Company;
  onSelectCompany: (company: Company) => void;
  onSeeAllCompanies: () => void;
  onVisitPortfolio: () => void;
  onOpenPromptCategory: (category: string) => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  companies,
  selectedCompany,
  onSelectCompany,
  onSeeAllCompanies,
  onVisitPortfolio,
  onOpenPromptCategory,
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-md border border-neutral-200/90 rounded-[28px] p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 w-full min-h-[640px]">
      {/* Top Header Row */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-neutral-100 text-neutral-800">
              <Grid2X2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-bold text-lg text-neutral-900 tracking-tight">
              {selectedCompany.name}
            </span>
          </div>

          <button
            onClick={onSeeAllCompanies}
            className="p-1.5 rounded-full border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition-colors"
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
                    ? 'bg-neutral-900 text-white shadow-xs font-semibold scale-[1.02]'
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
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800 hover:text-neutral-900 tracking-wide transition-colors"
          >
            <span className="text-neutral-900">•</span> See all AI Companies
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Company Description Bio */}
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-500 font-normal">
          {selectedCompany.description}
        </p>

        {/* Media / Feature Banner Pills (Machine Learning & Computer Vision) */}
        <div className="space-y-2.5 pt-1">
          {/* Machine Learning Banner */}
          <div
            onClick={() => onOpenPromptCategory('Machine Learning')}
            className="group relative cursor-pointer overflow-hidden rounded-2xl h-12 p-3 flex items-center justify-between text-white shadow-xs transition-transform hover:scale-[1.01]"
            style={{
              background: 'linear-gradient(135deg, #4fa3d1 0%, #177196 100%)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/30 backdrop-blur-3xs" />
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
            className="group relative cursor-pointer overflow-hidden rounded-2xl h-12 p-3 flex items-center justify-between text-neutral-900 shadow-xs transition-transform hover:scale-[1.01]"
            style={{
              background: 'linear-gradient(135deg, #d8bc88 0%, #a88a53 100%)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-yellow-600/20 backdrop-blur-3xs" />
            <div className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-900/60" />
              <span className="text-xs font-semibold tracking-wide text-amber-950">
                Computer Vision
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-amber-950/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Bottom Section: Connect Info + Footer + CTA */}
      <div className="space-y-4 pt-6 mt-4 border-t border-neutral-100">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Connect with us
          </span>
          <div className="space-y-1.5 text-xs text-neutral-700">
            <a
              href={`tel:${selectedCompany.phone}`}
              className="flex items-center gap-2 hover:text-neutral-900 transition-colors font-medium group"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
              <span>{selectedCompany.phone}</span>
            </a>
            <a
              href={`mailto:${selectedCompany.email}`}
              className="flex items-center gap-2 hover:text-neutral-900 transition-colors font-medium group"
            >
              <Mail className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
              <span>{selectedCompany.email}</span>
            </a>
          </div>
        </div>

        {/* Partnership copyright statement */}
        <p className="text-[11px] leading-tight text-neutral-400 font-normal">
          In partnership with Qclay Agency ©2023, All Rights Reserved
        </p>

        {/* Visit Portfolio Button */}
        <button
          onClick={onVisitPortfolio}
          className="w-full py-2.5 px-4 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
        >
          <span className="text-emerald-400 text-base leading-none">•</span>
          <span>Visit portfolio</span>
        </button>
      </div>
    </div>
  );
};
