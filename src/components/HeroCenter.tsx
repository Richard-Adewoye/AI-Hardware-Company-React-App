import React from 'react';
import { ArrowRight, QrCode, ArrowUpRight, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface HeroCenterProps {
  currentProject: Project;
  onDownloadApp: () => void;
  onSeeReviews: () => void;
  onVisitWebsite: () => void;
}

export const HeroCenter: React.FC<HeroCenterProps> = ({
  currentProject,
  onDownloadApp,
  onSeeReviews,
  onVisitWebsite,
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-md border border-neutral-200/90 rounded-[28px] p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 w-full min-h-[640px]">
      {/* Hero Image Block Container */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-100 aspect-[4/3] sm:aspect-[16/11] border border-neutral-200/60 group">
        <img
          src={currentProject.imageUrl}
          alt={currentProject.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        />

        {/* Top-Left Overlay Tag: "03" + "Recent Project" */}
        <div className="absolute top-4 left-4 flex flex-col gap-0.5 pointer-events-none">
          <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            {currentProject.number}
          </span>
          <span className="text-[11px] font-medium text-white/90 bg-black/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 w-max shadow-2xs">
            Recent Project
          </span>
        </div>

        {/* Top-Right Overlay Widget: "Download App" + QR Code Icon */}
        <button
          onClick={onDownloadApp}
          className="absolute top-4 right-4 flex items-center gap-2 bg-white/80 hover:bg-white text-neutral-800 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/60 shadow-sm transition-all hover:scale-105 active:scale-95 group/qr"
        >
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-bold tracking-tight text-neutral-900 leading-none">
              Download
            </span>
            <span className="text-[10px] font-semibold text-neutral-600 leading-none mt-0.5">
              App
            </span>
          </div>
          <div className="p-1 rounded-md bg-neutral-900 text-white group-hover/qr:bg-black transition-colors">
            <QrCode className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Main Headline & Details Below Image */}
      <div className="mt-6 flex flex-col justify-between flex-1 gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-[1.08] font-sans">
            Futuristic <br />
            Machineries
          </h1>
        </div>

        {/* Middle Row: Left Tagline + Right User Avatars Review Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-[180px]">
            <p className="text-xs text-neutral-500 font-medium leading-tight">
              Let's Bright the future by learning
            </p>
          </div>

          {/* Member Avatars + See Reviews Button */}
          <button
            onClick={onSeeReviews}
            className="flex items-center gap-2.5 bg-neutral-100/80 hover:bg-neutral-200/80 border border-neutral-200/80 px-3 py-1.5 rounded-full transition-all group shadow-2xs w-max"
          >
            {/* Avatar Stack */}
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Reviewer 1"
                referrerPolicy="no-referrer"
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Reviewer 2"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xs font-semibold text-neutral-800 flex items-center gap-1">
              See Reviews
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Bottom Website Button */}
        <div className="pt-2">
          <button
            onClick={onVisitWebsite}
            className="group flex items-center justify-between px-4 py-2.5 rounded-full bg-white border border-neutral-300 hover:border-neutral-900 text-neutral-900 text-xs font-semibold shadow-2xs transition-all hover:shadow-xs active:scale-[0.99] w-max sm:w-auto"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
              <span>Visit website</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 ml-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
