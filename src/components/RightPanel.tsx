import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Heart, MessageSquare, Plus, UserPlus, Sparkles, HelpCircle } from 'lucide-react';
import { Project } from '../types';

interface RightPanelProps {
  featuredProject: Project;
  onInviteFriends: () => void;
  onListOfPrompts: () => void;
  onEcosystemSupport: () => void;
  onOpenProjectDetail: (project: Project) => void;
  isDarkMode?: boolean;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  featuredProject,
  onInviteFriends,
  onListOfPrompts,
  onEcosystemSupport,
  onOpenProjectDetail,
  isDarkMode = false,
}) => {
  const [likeCount, setLikeCount] = useState(featuredProject.likes);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasLiked) {
      setLikeCount((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikeCount((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className={`backdrop-blur-md rounded-[28px] p-5 sm:p-6 flex flex-col justify-between transition-colors duration-300 w-full min-h-[640px] border ${
        isDarkMode
          ? 'bg-slate-900/90 border-cyan-500/30 text-slate-100 shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]'
          : 'bg-white/90 border-neutral-200/90 text-neutral-900 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Top Section: Interactive Circle Member Networking Wheel Widget */}
      <div className="space-y-4">
        <div
          className={`relative flex items-center justify-between p-3 rounded-2xl border transition-colors ${
            isDarkMode
              ? 'bg-slate-950/70 border-slate-800/90 text-slate-200'
              : 'bg-neutral-50/80 border-neutral-100'
          }`}
        >
          {/* Left Side: Avatar Radial Circle */}
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            {/* Outer dotted ring */}
            <div
              className={`absolute inset-0 rounded-full border border-dashed animate-spin-slow ${
                isDarkMode ? 'border-cyan-500/40' : 'border-neutral-300'
              }`}
            />

            {/* Center + button */}
            <button
              onClick={onInviteFriends}
              className={`w-7 h-7 rounded-full flex items-center justify-center shadow-xs hover:scale-110 transition-transform z-10 ${
                isDarkMode
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                  : 'bg-neutral-900 text-white'
              }`}
              title="Invite Members"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Orbiting member avatars around circle */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Member 1"
              referrerPolicy="no-referrer"
              className={`absolute top-1 left-3 w-7 h-7 rounded-full ring-2 object-cover shadow-2xs hover:scale-110 transition-transform cursor-pointer ${
                isDarkMode ? 'ring-cyan-500/60' : 'ring-white'
              }`}
              onClick={onInviteFriends}
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              alt="Member 2"
              referrerPolicy="no-referrer"
              className={`absolute top-3 right-2 w-7 h-7 rounded-full ring-2 object-cover shadow-2xs hover:scale-110 transition-transform cursor-pointer ${
                isDarkMode ? 'ring-cyan-500/60' : 'ring-white'
              }`}
              onClick={onInviteFriends}
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
              alt="Member 3"
              referrerPolicy="no-referrer"
              className={`absolute bottom-2 left-2 w-7 h-7 rounded-full ring-2 object-cover shadow-2xs hover:scale-110 transition-transform cursor-pointer ${
                isDarkMode ? 'ring-cyan-500/60' : 'ring-white'
              }`}
              onClick={onInviteFriends}
            />
            <img
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80"
              alt="Member 4"
              referrerPolicy="no-referrer"
              className={`absolute bottom-1 right-4 w-7 h-7 rounded-full ring-2 object-cover shadow-2xs hover:scale-110 transition-transform cursor-pointer ${
                isDarkMode ? 'ring-cyan-500/60' : 'ring-white'
              }`}
              onClick={onInviteFriends}
            />
          </div>

          {/* Right Side: Action Link List */}
          <div className="flex flex-col gap-2.5 pl-2 text-right">
            <button
              onClick={onInviteFriends}
              className={`group text-xs font-bold flex items-center justify-end gap-1 transition-colors ${
                isDarkMode
                  ? 'text-cyan-300 hover:text-cyan-200'
                  : 'text-neutral-800 hover:text-neutral-900'
              }`}
            >
              <span>Invite your friends</span>
              <UserPlus
                className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-all ${
                  isDarkMode ? 'text-cyan-400' : 'text-neutral-400 group-hover:text-neutral-900'
                }`}
              />
            </button>

            <button
              onClick={onListOfPrompts}
              className={`group text-xs font-semibold flex items-center justify-end gap-1 transition-colors ${
                isDarkMode
                  ? 'text-slate-300 hover:text-cyan-300'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>List of prompts</span>
              <Sparkles
                className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-all ${
                  isDarkMode ? 'text-cyan-400' : 'text-neutral-400 group-hover:text-amber-500'
                }`}
              />
            </button>

            <button
              onClick={onEcosystemSupport}
              className={`group text-xs font-semibold flex items-center justify-end gap-1 transition-colors ${
                isDarkMode
                  ? 'text-slate-300 hover:text-cyan-300'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>Ecosystem & support</span>
              <HelpCircle
                className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-all ${
                  isDarkMode ? 'text-cyan-400' : 'text-neutral-400 group-hover:text-neutral-900'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Metrics Block: Completed projects 237 in 2022-2023 */}
        <div className="pt-2">
          <span
            className={`text-xs font-bold tracking-wider uppercase block ${
              isDarkMode ? 'text-cyan-400/80' : 'text-neutral-400'
            }`}
          >
            Completed projects
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span
              className={`text-4xl sm:text-5xl font-black tracking-tight font-sans ${
                isDarkMode
                  ? 'text-white drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'text-neutral-900'
              }`}
            >
              237
            </span>
            <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
              in 2022-2023
            </span>
          </div>
        </div>
      </div>

      {/* Featured Card Block: Customer Segmentation for Ecommerce Platform */}
      <div
        onClick={() => onOpenProjectDetail(featuredProject)}
        className={`group relative cursor-pointer border rounded-2xl p-4 flex flex-col justify-between overflow-hidden transition-all duration-300 mt-6 ${
          isDarkMode
            ? 'bg-slate-950/80 border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]'
            : 'bg-neutral-100/90 hover:bg-neutral-100 border-neutral-200/80 shadow-2xs hover:shadow-xs'
        }`}
      >
        {/* Top Header + Diagonal Arrow */}
        <div className="flex items-start justify-between gap-2 z-10">
          <h3
            className={`text-xs font-bold leading-snug max-w-[200px] ${
              isDarkMode ? 'text-slate-100' : 'text-neutral-900'
            }`}
          >
            {featuredProject.title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenProjectDetail(featuredProject);
            }}
            className={`p-1.5 rounded-full transition-colors shadow-2xs ${
              isDarkMode
                ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                : 'bg-white hover:bg-neutral-900 text-neutral-800 hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3D Coral Glass Knot Image Container */}
        <div
          className={`relative w-full h-32 my-3 rounded-xl overflow-hidden flex items-center justify-center border ${
            isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white/60 border-transparent'
          }`}
        >
          <img
            src={featuredProject.imageUrl}
            alt={featuredProject.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Bottom Bar: Progress Badge + Comments/Likes */}
        <div className="flex items-center justify-between text-xs pt-1 z-10">
          <span
            className={`px-2.5 py-0.5 rounded-full font-medium border text-[11px] ${
              isDarkMode
                ? 'bg-slate-900 text-cyan-300 border-cyan-500/40'
                : 'bg-white text-neutral-700 border-neutral-200/80'
            }`}
          >
            Progress
          </span>

          <div
            className={`flex items-center gap-3 font-medium ${
              isDarkMode ? 'text-slate-300' : 'text-neutral-600'
            }`}
          >
            <div className="flex items-center gap-1">
              <MessageSquare className={`w-3.5 h-3.5 ${isDarkMode ? 'text-cyan-400' : 'text-neutral-400'}`} />
              <span>{featuredProject.comments}</span>
            </div>

            <button
              onClick={handleLike}
              className={`flex items-center gap-1 transition-colors ${
                hasLiked ? 'text-rose-500 font-semibold' : 'hover:text-rose-500'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  hasLiked
                    ? 'fill-rose-500 text-rose-500'
                    : isDarkMode
                    ? 'text-slate-400'
                    : 'text-neutral-400'
                }`}
              />
              <span>{likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
