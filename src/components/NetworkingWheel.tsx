import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Building2, Globe, Cpu, Zap, Radio, ExternalLink, Activity, Sparkles, RefreshCw, ShieldCheck, Search } from 'lucide-react';
import { Company } from '../types';

interface MemberNode {
  id: string;
  name: string;
  category: 'AI & ML' | 'Robotics' | 'Quantum' | 'Computer Vision' | 'Bionics';
  location: string;
  avatar: string;
  latency: string;
  bandwidth: string;
  projectsCount: number;
  status: 'Online' | 'Synchronizing' | 'High Traffic';
  description: string;
  tags: string[];
  partnerIds: string[];
}

const NETWORK_MEMBERS: MemberNode[] = [
  {
    id: 'n1',
    name: 'Aempore Machineries',
    category: 'Quantum',
    location: 'Munich, Germany',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    latency: '4.2ms',
    bandwidth: '10 Gbps',
    projectsCount: 42,
    status: 'Online',
    description: 'Lead research node specializing in sub-nanometer silicon photonic glass and 3D kinetic mesh shaders.',
    tags: ['Photonic Glass', 'Tensor Mesh', 'WebGL'],
    partnerIds: ['n2', 'n3', 'n5'],
  },
  {
    id: 'n2',
    name: 'Neural Matrix Dynamics',
    category: 'AI & ML',
    location: 'Zurich, Switzerland',
    avatar: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=150&auto=format&fit=crop&q=80',
    latency: '8.1ms',
    bandwidth: '8.5 Gbps',
    projectsCount: 28,
    status: 'Online',
    description: 'Deep neural sound synthesis and audio waveform processing engine running on quantum tensors.',
    tags: ['Neural Audio', 'DSP', 'TensorFlow'],
    partnerIds: ['n1', 'n4'],
  },
  {
    id: 'n3',
    name: 'Bionic Edge Robotics',
    category: 'Robotics',
    location: 'Tokyo, Japan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    latency: '12.4ms',
    bandwidth: '5.2 Gbps',
    projectsCount: 19,
    status: 'Synchronizing',
    description: 'Autonomous kinetic prosthetic arm development with neural tactile feedback sensors.',
    tags: ['Kinetic Prosthetics', 'Tactile AI', 'Robotics'],
    partnerIds: ['n1', 'n6'],
  },
  {
    id: 'n4',
    name: 'OpticWave Labs',
    category: 'Computer Vision',
    location: 'San Francisco, USA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    latency: '6.5ms',
    bandwidth: '12 Gbps',
    projectsCount: 35,
    status: 'Online',
    description: 'Sub-millimeter multispectral LiDAR cameras for autonomous agricultural drone fleets.',
    tags: ['LiDAR', 'Multispectral', 'Computer Vision'],
    partnerIds: ['n2', 'n5'],
  },
  {
    id: 'n5',
    name: 'Quantum Cybernetics',
    category: 'Quantum',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=150&auto=format&fit=crop&q=80',
    latency: '9.3ms',
    bandwidth: '7.8 Gbps',
    projectsCount: 24,
    status: 'High Traffic',
    description: 'Zero-latency cryptographic communication channels backed by entangled photon pairs.',
    tags: ['QKD Cryptography', 'Entanglement', 'TLS 1.3'],
    partnerIds: ['n1', 'n4', 'n6'],
  },
  {
    id: 'n6',
    name: 'BioSynthetix Systems',
    category: 'Bionics',
    location: 'Stockholm, Sweden',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    latency: '11.0ms',
    bandwidth: '6.0 Gbps',
    projectsCount: 16,
    status: 'Online',
    description: 'Synthetic biological interfaces for micro-actuator telemetry and metabolic biometric tracking.',
    tags: ['Bio-Sensors', 'Metabolic AI', 'Telemetry'],
    partnerIds: ['n3', 'n5'],
  },
];

interface NetworkingWheelProps {
  isDarkMode?: boolean;
}

export const NetworkingWheel: React.FC<NetworkingWheelProps> = ({ isDarkMode = false }) => {
  const [selectedNode, setSelectedNode] = useState<MemberNode>(NETWORK_MEMBERS[0]);
  const [hoveredNode, setHoveredNode] = useState<MemberNode | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Quantum', 'AI & ML', 'Robotics', 'Computer Vision', 'Bionics'];

  // Smooth Orbit Rotation effect
  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.3) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isRotating]);

  const activeDisplayNode = hoveredNode || selectedNode;

  const filteredMembers = NETWORK_MEMBERS.filter((m) => {
    const matchesCat = activeCategory === 'All' || m.category === activeCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div
      className={`rounded-3xl p-5 sm:p-7 border transition-all duration-300 ${
        isDarkMode
          ? 'bg-slate-950/80 border-cyan-500/30 text-slate-100 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]'
          : 'bg-neutral-50/90 border-neutral-200 text-neutral-900 shadow-sm'
      }`}
    >
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isDarkMode
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-neutral-200 text-neutral-800'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              Connected Ecosystem Network
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black">Interactive Member Networking Wheel</h3>
          <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
            Hover over nodes in the orbital visualization to view telemetry, bandwidth, and connected AI partners.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all ${
              isRotating
                ? isDarkMode
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'bg-neutral-900 text-white'
                : isDarkMode
                ? 'bg-slate-900 text-slate-300 border-slate-700'
                : 'bg-white text-neutral-700 border-neutral-200'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span>{isRotating ? 'Orbit Active' : 'Orbit Paused'}</span>
          </button>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? isDarkMode
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.4)] font-bold'
                    : 'bg-neutral-900 text-white font-bold'
                  : isDarkMode
                  ? 'bg-slate-900 text-slate-400 hover:text-cyan-300 border border-slate-800'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search member node..."
            className={`w-full pl-8 pr-3 py-1.5 rounded-full text-xs border outline-none ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-cyan-500'
                : 'bg-white border-neutral-200 text-neutral-900 focus:border-neutral-900'
            }`}
          />
        </div>
      </div>

      {/* Main Grid: Wheel Visualization (Left 7 cols) + Selected Node Telemetry Card (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Circular Wheel Canvas / SVG Container (7 Cols) */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px] p-4 rounded-3xl border overflow-hidden bg-radial from-cyan-950/20 via-transparent to-transparent border-neutral-200/60 dark:border-slate-800/80">
          {/* Concentric Orbital Rings */}
          <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-dashed border-cyan-500/20 animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] rounded-full border border-cyan-500/15" />

          {/* SVG Connection Lines from Center Hub to Member Nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="cyanLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Hub Connections */}
            {filteredMembers.map((member, idx) => {
              const total = filteredMembers.length;
              const angleDeg = (idx * (360 / total) + rotationAngle) % 360;
              const angleRad = (angleDeg * Math.PI) / 180;
              const radius = 135; // orbit radius in px

              // Center is at 50%, 50%
              const isSelected = activeDisplayNode.id === member.id;

              return (
                <g key={member.id}>
                  {/* Ray line from central hub */}
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${Math.cos(angleRad) * radius}px)`}
                    y2={`calc(50% + ${Math.sin(angleRad) * radius}px)`}
                    stroke={isSelected ? '#06b6d4' : isDarkMode ? 'rgba(6, 182, 212, 0.25)' : 'rgba(0, 0, 0, 0.15)'}
                    strokeWidth={isSelected ? '2.5' : '1.2'}
                    strokeDasharray={isSelected ? 'none' : '4,4'}
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Quantum Node Hub */}
          <div className="absolute z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-cyan-500 to-emerald-400 shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center p-2 text-center text-white">
              <Zap className="w-5 h-5 text-cyan-400 animate-bounce" />
              <span className="text-[9px] font-black uppercase tracking-wider text-cyan-300 mt-0.5">
                Quantum Hub
              </span>
            </div>
          </div>

          {/* Orbit Nodes */}
          {filteredMembers.map((member, idx) => {
            const total = filteredMembers.length;
            const angleDeg = (idx * (360 / total) + rotationAngle) % 360;
            const angleRad = (angleDeg * Math.PI) / 180;
            const radius = 135; // orbit radius px

            const isSelected = activeDisplayNode.id === member.id;

            return (
              <motion.div
                key={member.id}
                onMouseEnter={() => setHoveredNode(member)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(member)}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${Math.cos(angleRad) * radius}px - 24px)`,
                  top: `calc(50% + ${Math.sin(angleRad) * radius}px - 24px)`,
                }}
                className={`w-12 h-12 rounded-full cursor-pointer z-20 transition-all duration-300 flex items-center justify-center border ${
                  isSelected
                    ? 'scale-125 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.8)] ring-4 ring-cyan-500/30'
                    : isDarkMode
                    ? 'border-slate-700 bg-slate-900 hover:scale-110 hover:border-cyan-400'
                    : 'border-neutral-300 bg-white hover:scale-110 hover:border-neutral-900'
                }`}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                {/* Status Dot */}
                <span
                  className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-950 ${
                    member.status === 'Online'
                      ? 'bg-emerald-400'
                      : member.status === 'Synchronizing'
                      ? 'bg-amber-400'
                      : 'bg-cyan-400'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Right Active Node Telemetry Card (5 Cols) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDisplayNode.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`lg:col-span-5 p-5 sm:p-6 rounded-3xl border flex flex-col justify-between ${
              isDarkMode
                ? 'bg-slate-900/90 border-cyan-500/40 text-slate-100 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                : 'bg-white border-neutral-200 text-neutral-900 shadow-md'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={activeDisplayNode.avatar}
                    alt={activeDisplayNode.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-cyan-500/40 shadow-sm"
                  />
                  <div>
                    <h4 className="text-base sm:text-lg font-black leading-tight">
                      {activeDisplayNode.name}
                    </h4>
                    <span className={`text-xs flex items-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
                      <Globe className="w-3 h-3 text-cyan-400" />
                      {activeDisplayNode.location}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    activeDisplayNode.status === 'Online'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {activeDisplayNode.status}
                </span>
              </div>

              {/* Description */}
              <p className={`text-xs leading-relaxed mb-4 ${isDarkMode ? 'text-slate-300' : 'text-neutral-600'}`}>
                {activeDisplayNode.description}
              </p>

              {/* Telemetry Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-200/60 dark:border-slate-800 text-center font-mono">
                <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">Latency</span>
                  <span className="text-xs font-bold text-cyan-400">{activeDisplayNode.latency}</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">Bandwidth</span>
                  <span className="text-xs font-bold text-emerald-400">{activeDisplayNode.bandwidth}</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">AI Models</span>
                  <span className="text-xs font-bold text-cyan-300">{activeDisplayNode.projectsCount}</span>
                </div>
              </div>

              {/* Tag Chips */}
              <div className="mt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Core Technologies
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeDisplayNode.tags.map((t) => (
                    <span
                      key={t}
                      className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${
                        isDarkMode
                          ? 'bg-slate-800 text-cyan-300 border border-cyan-500/20'
                          : 'bg-neutral-100 text-neutral-800 border border-neutral-200'
                      }`}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Connect / Partner Action */}
            <div className="pt-5 mt-5 border-t border-neutral-200/60 dark:border-slate-800 flex items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Peer Verified Node
              </span>

              <button
                onClick={() => alert(`Initiating direct peer-to-peer AI pipeline with ${activeDisplayNode.name}...`)}
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                  isDarkMode
                    ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
              >
                <span>Connect Pipeline</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
