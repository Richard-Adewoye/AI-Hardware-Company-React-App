import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Calendar, ArrowUpRight, FileText, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';

interface Milestone {
  id: string;
  year: string;
  quarter: string;
  title: string;
  category: string;
  status: 'Deployed' | 'Active Testing' | 'In Development';
  summary: string;
  techSpecs: string[];
  imageUrl: string;
}

interface ResearchRadarSectionProps {
  isDarkMode?: boolean;
}

const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    year: '2024',
    quarter: 'Q3',
    title: 'Quantum Tensor Processor v1',
    category: 'Hardware & Architecture',
    status: 'Deployed',
    summary: 'Sub-nanometer silicon photonic glass chips executing tensor field matrix multiplications at 4.2 TeraFlops/watt.',
    techSpecs: ['4.2 TFlops/W Energy Efficiency', 'Optoelectronic Waveguide Mesh', '0.04ms Latency Buffer'],
    imageUrl: '/src/assets/images/quantum_tensor_chip_1784931220536.jpg',
  },
  {
    id: 'm2',
    year: '2025',
    quarter: 'Q1',
    title: 'Kinetic Drone Swarm Protocol',
    category: 'Robotics & Computer Vision',
    status: 'Active Testing',
    summary: 'Decentralized spatial navigation algorithm enabling 500+ micro drone units to synchronize in real-time without centralized servers.',
    techSpecs: ['Ultra-wide LiDAR Array', 'Peer-to-Peer Mesh Telemetry', 'Millisecond Collision Avoidance'],
    imageUrl: '/src/assets/images/kinetic_drone_swarm_1784931206310.jpg',
  },
  {
    id: 'm3',
    year: '2025',
    quarter: 'Q4',
    title: 'Coral Kinetic Glass Shaders',
    category: '3D & Generative AI',
    status: 'Active Testing',
    summary: 'Real-time ray-traced refractive glass shader engine optimized for web browsers and spatial headsets.',
    techSpecs: ['Subsurface Dispersion', 'Real-time WebGL/WebGPU', 'Adaptive Polygon Tessellation'],
    imageUrl: '/src/assets/images/hero_futuristic_sphere_1784930005400.jpg',
  },
];

export const ResearchRadarSection: React.FC<ResearchRadarSectionProps> = ({
  isDarkMode = false,
}) => {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>('m1');
  const [downloadedPaper, setDownloadedPaper] = useState<string | null>(null);

  const activeMilestone = MILESTONES.find((m) => m.id === activeMilestoneId) || MILESTONES[0];

  const handleDownloadPaper = (title: string) => {
    setDownloadedPaper(title);
    setTimeout(() => setDownloadedPaper(null), 3000);
  };

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
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              Global Research Radar
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
            AI Breakthroughs Roadmap (2024–2026)
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
            Track upcoming milestones, quantum hardware architectures, and autonomous swarm robotics research papers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {MILESTONES.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMilestoneId(m.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeMilestoneId === m.id
                  ? isDarkMode
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'bg-neutral-900 text-white shadow-sm'
                  : isDarkMode
                  ? 'bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {m.year} {m.quarter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Feature Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
        {/* Left Aspect-ratio Image Display (5 Cols) */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] border border-neutral-200/80 dark:border-cyan-500/30 group shadow-md">
          <img
            src={activeMilestone.imageUrl}
            alt={activeMilestone.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md border border-white/20">
              {activeMilestone.category}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md ${
                activeMilestone.status === 'Deployed'
                  ? 'bg-emerald-500/80 text-white'
                  : 'bg-amber-500/80 text-white'
              }`}
            >
              • {activeMilestone.status}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-3xl font-black text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] font-sans">
              {activeMilestone.year}
            </span>
            <h3 className="text-lg font-bold text-white drop-shadow-md">{activeMilestone.title}</h3>
          </div>
        </div>

        {/* Right Info & Specifications (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Target Release: {activeMilestone.year} {activeMilestone.quarter}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black">{activeMilestone.title}</h3>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-neutral-600'}`}>
            {activeMilestone.summary}
          </p>

          {/* Technical Specifications */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Core Technical Specifications
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeMilestone.techSpecs.map((spec, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 ${
                    isDarkMode
                      ? 'bg-slate-950/70 border-slate-800 text-slate-200'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Whitepaper CTA */}
          <div className="pt-4 flex items-center gap-3">
            <button
              onClick={() => handleDownloadPaper(activeMilestone.title)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:brightness-110'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm'
              }`}
            >
              {downloadedPaper === activeMilestone.title ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>Paper Downloaded!</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Download Whitepaper (PDF)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
