import React from 'react';
import { Grid2X2, Menu, ArrowRight, QrCode, ArrowUpRight, Sparkles, Heart, MessageSquare } from 'lucide-react';
import { Company, Project } from '../types';

interface MobileFrameProps {
  company: Company;
  project: Project;
  onJoinUsClick: () => void;
  onSeeAllCompanies: () => void;
  onSeeReviews: () => void;
  onDownloadApp: () => void;
  onOpenProjectDetail: (p: Project) => void;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  company,
  project,
  onJoinUsClick,
  onSeeAllCompanies,
  onSeeReviews,
  onDownloadApp,
  onOpenProjectDetail,
}) => {
  return (
    <div className="w-[340px] sm:w-[375px] shrink-0 bg-neutral-900 rounded-[44px] p-3.5 shadow-2xl border-4 border-neutral-800 relative mx-auto my-auto">
      {/* Phone Notch / Dynamic Island */}
      <div className="w-28 h-4 bg-black rounded-full mx-auto mb-2 flex items-center justify-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-neutral-800" />
        <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700" />
      </div>

      {/* Screen Content Canvas */}
      <div className="bg-neutral-100 rounded-[36px] overflow-y-auto max-h-[720px] p-4 text-neutral-900 space-y-4 no-scrollbar">
        {/* Mobile Header */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-neutral-200">
              <Grid2X2 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-bold text-sm tracking-tight">{company.name}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onJoinUsClick}
              className="px-3 py-1 rounded-full text-[10px] font-bold bg-neutral-900 text-white"
            >
              • Join us
            </button>
            <button className="p-1 rounded-full border border-neutral-300">
              <Menu className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {['Neural Intellect', 'Data Wizards', 'Brain Trust', 'AI Pioneers', 'Aempore AI'].map(
            (tag) => (
              <span
                key={tag}
                className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                  tag === company.name
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'bg-white text-neutral-600 border border-neutral-200'
                }`}
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* Sublink */}
        <button
          onClick={onSeeAllCompanies}
          className="flex items-center gap-1 text-[11px] font-bold text-neutral-800"
        >
          <span>• See all AI Companies</span>
        </button>

        {/* Description */}
        <p className="text-[11px] leading-relaxed text-neutral-500 font-normal">
          {company.description}
        </p>

        {/* Mobile Project Card 03 */}
        <div className="bg-white rounded-2xl p-3 border border-neutral-200 shadow-2xs space-y-3">
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-neutral-100">
            <img
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 flex flex-col">
              <span className="text-3xl font-extrabold text-white drop-shadow-md">
                {project.number}
              </span>
              <span className="text-[9px] font-medium text-white/90 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-full">
                Recent Project
              </span>
            </div>
            <button
              onClick={onDownloadApp}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/80 backdrop-blur-md"
            >
              <QrCode className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight leading-tight">
              Futuristic <br />
              Machineries
            </h2>
            <p className="text-[10px] text-neutral-500 font-medium">
              Let's Bright the future by learning
            </p>
          </div>

          {/* Review badge */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={onSeeReviews}
              className="flex items-center gap-1.5 bg-neutral-100 px-2.5 py-1 rounded-full text-[10px] font-semibold text-neutral-800"
            >
              <div className="flex -space-x-1.5">
                <img
                  className="w-4 h-4 rounded-full ring-1 ring-white"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50"
                  alt=""
                  referrerPolicy="no-referrer"
                />
                <img
                  className="w-4 h-4 rounded-full ring-1 ring-white"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50"
                  alt=""
                  referrerPolicy="no-referrer"
                />
              </div>
              <span>See Reviews →</span>
            </button>

            <span className="text-[10px] text-neutral-400 font-semibold">2022-2023</span>
          </div>
        </div>

        {/* Feature Banners */}
        <div className="space-y-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 text-white flex items-center justify-between text-xs font-semibold">
            <span>Machine Learning</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
          <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-200 to-yellow-600 text-amber-950 flex items-center justify-between text-xs font-semibold">
            <span>Computer Vision</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
