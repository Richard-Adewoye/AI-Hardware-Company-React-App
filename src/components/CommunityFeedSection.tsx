import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Heart, MessageSquare, Plus, ExternalLink, Sparkles, Search, Check, Send } from 'lucide-react';

interface CommunityProject {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  category: string;
  likes: number;
  comments: number;
  description: string;
  tags: string[];
  userLiked?: boolean;
}

interface CommunityFeedSectionProps {
  isDarkMode?: boolean;
}

const INITIAL_COMMUNITY_PROJECTS: CommunityProject[] = [
  {
    id: 'c1',
    title: 'Holographic Bionic Prosthetic Arm 3D Model',
    author: 'Dr. Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'Kinetic Robotics',
    likes: 342,
    comments: 28,
    description: 'An AI-optimized lightweight carbon-titanium lattice structure synthesized via Aempore Machineries prompt engine.',
    tags: ['Bionics', '3D Mesh', 'Titanium'],
  },
  {
    id: 'c2',
    title: 'Quantum Neural Soundscape Synthesizer',
    author: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'Neural Audio',
    likes: 219,
    comments: 15,
    description: 'Generates 432Hz spatial acoustic waveforms synchronized with biometric heart rate telemetry.',
    tags: ['Acoustics', 'DSP', 'Bio-feedback'],
  },
  {
    id: 'c3',
    title: 'Autonomous Agricultural Drone Fleet Shader',
    author: 'Aisha Patel',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    category: 'Computer Vision',
    likes: 488,
    comments: 42,
    description: 'Real-time crop disease detection algorithms utilizing sub-millimeter multispectral cameras.',
    tags: ['Agriculture', 'LiDAR', 'CV'],
  },
];

export const CommunityFeedSection: React.FC<CommunityFeedSectionProps> = ({
  isDarkMode = false,
}) => {
  const [projects, setProjects] = useState<CommunityProject[]>(INITIAL_COMMUNITY_PROJECTS);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDesc, setNewDesc] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('Kinetic Robotics');
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const categories = ['All', 'Kinetic Robotics', 'Neural Audio', 'Computer Vision'];

  const handleLike = (id: string) => {
    setProjects((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isLiked = item.userLiked;
          return {
            ...item,
            likes: isLiked ? item.likes - 1 : item.likes + 1,
            userLiked: !isLiked,
          };
        }
        return item;
      })
    );
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const created: CommunityProject = {
      id: `c-${Date.now()}`,
      title: newTitle,
      author: 'You (Creator)',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      category: newCategory,
      likes: 1,
      comments: 0,
      description: newDesc,
      tags: ['Community', 'AI Studio'],
      userLiked: true,
    };

    setProjects([created, ...projects]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowSubmitModal(false);
      setNewTitle('');
      setNewDesc('');
    }, 1500);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-[28px] p-6 sm:p-8 backdrop-blur-md transition-colors duration-300 border mb-8 ${
        isDarkMode
          ? 'bg-slate-900/90 border-cyan-500/30 text-slate-100 shadow-[0_0_25px_rgba(6,182,212,0.12)]'
          : 'bg-white/90 border-neutral-200/90 text-neutral-900 shadow-sm'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isDarkMode
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  : 'bg-neutral-100 text-neutral-800 border border-neutral-200'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              Creator Community Feed
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
            Community AI Projects Spotlight
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
            Discover, showcase, and collaborate on cutting-edge 3D machineries and neural algorithms created by global builders.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
            isDarkMode
              ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:brightness-110'
              : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Submit Project</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                filterCategory === cat
                  ? isDarkMode
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'bg-neutral-900 text-white font-semibold'
                  : isDarkMode
                  ? 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:text-cyan-300'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className={`w-full pl-8 pr-3 py-1.5 rounded-full text-xs border outline-none transition-all ${
              isDarkMode
                ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-cyan-500'
                : 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-neutral-900'
            }`}
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`p-5 rounded-2xl border flex flex-col justify-between transition-all group ${
              isDarkMode
                ? 'bg-slate-950/60 border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                : 'bg-neutral-50/80 border-neutral-200/80 hover:border-neutral-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src={project.authorAvatar}
                    alt={project.author}
                    className="w-7 h-7 rounded-full object-cover border border-cyan-500/30"
                  />
                  <div>
                    <span className="text-xs font-bold block leading-tight">{project.author}</span>
                    <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
                      {project.category}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    isDarkMode
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                      : 'bg-neutral-200 text-neutral-800'
                  }`}
                >
                  Spotlight
                </span>
              </div>

              <h3 className="text-sm font-bold mb-1.5 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className={`text-xs leading-relaxed line-clamp-3 ${isDarkMode ? 'text-slate-400' : 'text-neutral-600'}`}>
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${
                      isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-white border border-neutral-200 text-neutral-600'
                    }`}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Like and Comment Footer */}
            <div className="pt-4 mt-4 border-t border-neutral-200/60 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <button
                onClick={() => handleLike(project.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition-all active:scale-95 ${
                  project.userLiked
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : isDarkMode
                    ? 'bg-slate-800 text-slate-300 hover:text-rose-400'
                    : 'bg-neutral-200 text-neutral-700 hover:text-rose-600'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${project.userLiked ? 'fill-current text-rose-400' : ''}`} />
                <span>{project.likes}</span>
              </button>

              <div className={`flex items-center gap-1 text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{project.comments} comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div
            className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl ${
              isDarkMode ? 'bg-slate-900 border-cyan-500/40 text-slate-100' : 'bg-white border-neutral-200 text-neutral-900'
            }`}
          >
            <h3 className="text-lg font-bold mb-1">Submit Your AI Project</h3>
            <p className={`text-xs mb-4 ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
              Share your 3D machineries, custom prompts, or neural models with the Aempore community.
            </p>

            <form onSubmit={handleCreateProject} className="space-y-3">
              <div>
                <label className="text-xs font-bold block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Autonomous Quantum Drone"
                  className={`w-full p-2.5 rounded-xl text-xs border outline-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-neutral-50 border-neutral-200'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className={`w-full p-2.5 rounded-xl text-xs border outline-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-neutral-50 border-neutral-200'
                  }`}
                >
                  <option value="Kinetic Robotics">Kinetic Robotics</option>
                  <option value="Neural Audio">Neural Audio</option>
                  <option value="Computer Vision">Computer Vision</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe your AI architecture and results..."
                  className={`w-full p-2.5 rounded-xl text-xs border outline-none resize-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-neutral-50 border-neutral-200'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className={`px-4 py-2 rounded-full text-xs font-bold ${
                    isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-neutral-200 text-neutral-800'
                  }`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={`px-5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    submitSuccess
                      ? 'bg-emerald-500 text-white'
                      : isDarkMode
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                      : 'bg-neutral-900 text-white'
                  }`}
                >
                  {submitSuccess ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{submitSuccess ? 'Submitted!' : 'Publish Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.section>
  );
};
