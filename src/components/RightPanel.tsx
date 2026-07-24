import React, { useState } from 'react';
import { ArrowUpRight, Heart, MessageSquare, Plus, UserPlus, Sparkles, HelpCircle } from 'lucide-react';
import { Project } from '../types';

interface RightPanelProps {
  featuredProject: Project;
  onInviteFriends: () => void;
  onListOfPrompts: () => void;
  onEcosystemSupport: () => void;
  onOpenProjectDetail: (project: Project) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  featuredProject,
  onInviteFriends,
  onListOfPrompts,
  onEcosystemSupport,
  onOpenProjectDetail,
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
    <div className="bg-white/90 backdrop-blur-md border border-neutral-200/90 rounded-[28px] p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 w-full min-h-[640px]">
      {/* Top Section: Interactive Circle Member Networking Wheel Widget */}
      <div className="space-y-4">
        <div className="relative flex items-center justify-between p-3 rounded-2xl bg-neutral-50/80 border border-neutral-100">
          {/* Left Side: Avatar Radial Circle */}
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            {/* Outer dotted ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-neutral-300 animate-spin-slow" />

            {/* Center + button */}
            <button
              onClick={onInviteFriends}
              className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-xs hover:scale-110 transition-transform z-10"
              title="Invite Members"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Orbiting member avatars around circle */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Member 1"
              referrerPolicy="no-referrer"
              className="absolute top-1 left-3 w-7 h-7 rounded-full ring-2 ring-white object-cover shadow-2xs hover:scale-110 transition-transform cursor-pointer"
              onClick={onInviteFriends}
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              alt="Member 2"
              referrerPolicy="no-referrer"
              className="absolute top-3 right-2 w-7 h-7 rounded-full ring-2 ring-white object-cover shadow-2xs hover:scale-110 transition-transform cursor-pointer"
              onClick={onInviteFriends}
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
              alt="Member 3"
              referrerPolicy="no-referrer"
              className="absolute bottom-2 left-2 w-7 h-7 rounded-full ring-2 ring-white object-cover shadow-2xs hover:scale-110 transition-transform cursor-pointer"
              onClick={onInviteFriends}
            />
            <img
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80"
              alt="Member 4"
              referrerPolicy="no-referrer"
              className="absolute bottom-1 right-4 w-7 h-7 rounded-full ring-2 ring-white object-cover shadow-2xs hover:scale-110 transition-transform cursor-pointer"
              onClick={onInviteFriends}
            />
          </div>

          {/* Right Side: Action Link List */}
          <div className="flex flex-col gap-2.5 pl-2 text-right">
            <button
              onClick={onInviteFriends}
              className="group text-xs font-bold text-neutral-800 hover:text-neutral-900 flex items-center justify-end gap-1 transition-colors"
            >
              <span>Invite your friends</span>
              <UserPlus className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={onListOfPrompts}
              className="group text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center justify-end gap-1 transition-colors"
            >
              <span>List of prompts</span>
              <Sparkles className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={onEcosystemSupport}
              className="group text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center justify-end gap-1 transition-colors"
            >
              <span>Ecosystem & support</span>
              <HelpCircle className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>

        {/* Metrics Block: Completed projects 237 in 2022-2023 */}
        <div className="pt-2">
          <span className="text-xs font-bold text-neutral-400 tracking-wider uppercase block">
            Completed projects
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl sm:text-5xl font-black text-neutral-900 tracking-tight font-sans">
              237
            </span>
            <span className="text-xs font-semibold text-neutral-500">
              in 2022-2023
            </span>
          </div>
        </div>
      </div>

      {/* Featured Card Block: Customer Segmentation for Ecommerce Platform */}
      <div
        onClick={() => onOpenProjectDetail(featuredProject)}
        className="group relative cursor-pointer bg-neutral-100/90 hover:bg-neutral-100 border border-neutral-200/80 rounded-2xl p-4 flex flex-col justify-between overflow-hidden transition-all duration-300 shadow-2xs hover:shadow-xs mt-6"
      >
        {/* Top Header + Diagonal Arrow */}
        <div className="flex items-start justify-between gap-2 z-10">
          <h3 className="text-xs font-bold text-neutral-900 leading-snug max-w-[200px]">
            {featuredProject.title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenProjectDetail(featuredProject);
            }}
            className="p-1.5 rounded-full bg-white hover:bg-neutral-900 text-neutral-800 hover:text-white transition-colors shadow-2xs"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3D Coral Glass Knot Image Container */}
        <div className="relative w-full h-32 my-3 rounded-xl overflow-hidden bg-white/60 flex items-center justify-center">
          <img
            src={featuredProject.imageUrl}
            alt={featuredProject.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Bottom Bar: Progress Badge + Comments/Likes */}
        <div className="flex items-center justify-between text-xs pt-1 z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-white text-neutral-700 font-medium border border-neutral-200/80 text-[11px]">
            Progress
          </span>

          <div className="flex items-center gap-3 text-neutral-600 font-medium">
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
              <span>{featuredProject.comments}</span>
            </div>

            <button
              onClick={handleLike}
              className={`flex items-center gap-1 transition-colors ${
                hasLiked ? 'text-rose-600 font-semibold' : 'hover:text-rose-600'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  hasLiked ? 'fill-rose-600 text-rose-600' : 'text-neutral-400'
                }`}
              />
              <span>{likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
