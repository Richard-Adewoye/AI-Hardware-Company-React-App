import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, QrCode, ArrowUpRight, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface HeroCenterProps {
  currentProject: Project;
  onDownloadApp: () => void;
  onSeeReviews: () => void;
  onVisitWebsite: () => void;
  isDarkMode?: boolean;
}

export const HeroCenter: React.FC<HeroCenterProps> = ({
  currentProject,
  onDownloadApp,
  onSeeReviews,
  onVisitWebsite,
  isDarkMode = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`backdrop-blur-md rounded-[28px] p-5 sm:p-6 flex flex-col justify-between transition-colors duration-300 w-full min-h-[640px] border ${
        isDarkMode
          ? 'bg-slate-900/90 border-cyan-500/30 text-slate-100 shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]'
          : 'bg-white/90 border-neutral-200/90 text-neutral-900 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Hero Image Block Container */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] border group ${
          isDarkMode ? 'bg-slate-950 border-cyan-500/30' : 'bg-neutral-100 border-neutral-200/60'
        }`}
      >
        <img
          src={currentProject.imageUrl}
          alt={currentProject.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        />

        {/* Top-Left Overlay Tag: "03" + "Recent Project" */}
        <div className="absolute top-4 left-4 flex flex-col gap-0.5 pointer-events-none">
          <span
            className={`text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-md ${
              isDarkMode ? 'text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]' : 'text-white'
            }`}
          >
            {currentProject.number}
          </span>
          <span
            className={`text-[11px] font-medium backdrop-blur-md px-2.5 py-0.5 rounded-full border w-max shadow-2xs ${
              isDarkMode
                ? 'text-cyan-200 bg-slate-950/70 border-cyan-500/40'
                : 'text-white/90 bg-black/20 border-white/20'
            }`}
          >
            Recent Project
          </span>
        </div>

        {/* Top-Right Overlay Widget: "Download App" + QR Code Icon */}
        <button
          onClick={onDownloadApp}
          className={`absolute top-4 right-4 flex items-center gap-2 backdrop-blur-md px-3 py-1.5 rounded-xl border shadow-sm transition-all hover:scale-105 active:scale-95 group/qr ${
            isDarkMode
              ? 'bg-slate-900/90 border-cyan-500/40 text-slate-100 hover:bg-slate-900'
              : 'bg-white/80 hover:bg-white border-white/60 text-neutral-800'
          }`}
        >
          <div className="flex flex-col text-right">
            <span
              className={`text-[10px] font-bold tracking-tight leading-none ${
                isDarkMode ? 'text-cyan-300' : 'text-neutral-900'
              }`}
            >
              Download
            </span>
            <span
              className={`text-[10px] font-semibold leading-none mt-0.5 ${
                isDarkMode ? 'text-slate-400' : 'text-neutral-600'
              }`}
            >
              App
            </span>
          </div>
          <div
            className={`p-1 rounded-md transition-colors ${
              isDarkMode
                ? 'bg-cyan-500 text-slate-950 group-hover/qr:bg-cyan-400'
                : 'bg-neutral-900 text-white group-hover/qr:bg-black'
            }`}
          >
            <QrCode className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Main Headline & Details Below Image */}
      <div className="mt-6 flex flex-col justify-between flex-1 gap-6">
        <div>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.08] font-sans ${
              isDarkMode
                ? 'bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                : 'text-neutral-900'
            }`}
          >
            Futuristic <br />
            Machineries
          </h1>
        </div>

        {/* Middle Row: Left Tagline + Right User Avatars Review Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-[180px]">
            <p className={`text-xs font-medium leading-tight ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
              Let's Bright the future by learning
            </p>
          </div>

          {/* Member Avatars + See Reviews Button */}
          <button
            onClick={onSeeReviews}
            className={`flex items-center gap-2.5 border px-3 py-1.5 rounded-full transition-all group shadow-2xs w-max ${
              isDarkMode
                ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-cyan-500/40'
                : 'bg-neutral-100/80 hover:bg-neutral-200/80 border-neutral-200/80 text-neutral-800'
            }`}
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
            <span
              className={`text-xs font-semibold flex items-center gap-1 ${
                isDarkMode ? 'text-cyan-300' : 'text-neutral-800'
              }`}
            >
              See Reviews
              <ArrowRight
                className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ${
                  isDarkMode ? 'text-cyan-400' : 'text-neutral-600'
                }`}
              />
            </span>
          </button>
        </div>

        {/* Bottom Website Button */}
        <div className="pt-2">
          <button
            onClick={onVisitWebsite}
            className={`group flex items-center justify-between px-4 py-2.5 rounded-full border text-xs font-semibold transition-all hover:shadow-xs active:scale-[0.99] w-max sm:w-auto ${
              isDarkMode
                ? 'bg-slate-900 border-cyan-500/50 hover:border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)] hover:shadow-[0_0_18px_rgba(6,182,212,0.4)]'
                : 'bg-white border-neutral-300 hover:border-neutral-900 text-neutral-900 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isDarkMode ? 'bg-cyan-400 animate-ping' : 'bg-neutral-900'
                }`}
              />
              <span>Visit website</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 ml-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
