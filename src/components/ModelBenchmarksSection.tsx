import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, Cpu, Zap, Activity, ShieldCheck, Layers, Gauge } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface ModelBenchmarksSectionProps {
  isDarkMode?: boolean;
}

interface AIModelBenchmark {
  id: string;
  name: string;
  version: string;
  provider: string;
  latencyMs: number;
  tokensPerSec: number;
  accuracyScore: number;
  gpuMemoryGb: number;
  specialty: string;
}

const MODELS: AIModelBenchmark[] = [
  {
    id: 'm-aempore',
    name: 'Aempore Neural-v2.4',
    version: '2.4.1',
    provider: 'Aempore Studio',
    latencyMs: 18,
    tokensPerSec: 142,
    accuracyScore: 98.6,
    gpuMemoryGb: 8.2,
    specialty: '3D Mesh Generation & Kinetic Spatial Shader Synthesis',
  },
  {
    id: 'm-gemini',
    name: 'Gemini 1.5 Pro',
    version: '1.5.0',
    provider: 'Google AI',
    latencyMs: 32,
    tokensPerSec: 115,
    accuracyScore: 97.8,
    gpuMemoryGb: 12.0,
    specialty: 'Multimodal Reasoning & Long Context Analysis',
  },
  {
    id: 'm-vision',
    name: 'Aempore Vision-X',
    version: '3.0.2',
    provider: 'Aempore Studio',
    latencyMs: 14,
    tokensPerSec: 180,
    accuracyScore: 99.1,
    gpuMemoryGb: 6.4,
    specialty: 'Real-time Sub-millimeter Optical Inspection',
  },
  {
    id: 'm-quantum',
    name: 'Quantum-Tensor-3D',
    version: '1.0.0',
    provider: 'Experimental Lab',
    latencyMs: 8,
    tokensPerSec: 240,
    accuracyScore: 99.5,
    gpuMemoryGb: 16.0,
    specialty: 'Photonic Quantum Matrix Computations',
  },
];

export const ModelBenchmarksSection: React.FC<ModelBenchmarksSectionProps> = ({
  isDarkMode = false,
}) => {
  const [concurrentUsers, setConcurrentUsers] = useState<number>(100);
  const [activeMetric, setActiveMetric] = useState<'latency' | 'throughput' | 'accuracy'>('throughput');

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
                  : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              Hardware & AI Model Matrix
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
            AI Model Performance Benchmarks
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
            Real-time latency, throughput (Tokens/sec), and accuracy comparisons across Aempore Neural models and industry benchmarks.
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-slate-800 p-1 rounded-full border border-neutral-200/80 dark:border-slate-700">
          <button
            onClick={() => setActiveMetric('throughput')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeMetric === 'throughput'
                ? isDarkMode
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-600 dark:text-slate-300 hover:text-cyan-400'
            }`}
          >
            Throughput (t/s)
          </button>
          <button
            onClick={() => setActiveMetric('latency')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeMetric === 'latency'
                ? isDarkMode
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-600 dark:text-slate-300 hover:text-cyan-400'
            }`}
          >
            Latency (ms)
          </button>
          <button
            onClick={() => setActiveMetric('accuracy')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeMetric === 'accuracy'
                ? isDarkMode
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-600 dark:text-slate-300 hover:text-cyan-400'
            }`}
          >
            Precision (%)
          </button>
        </div>
      </div>

      {/* Concurrent Traffic Simulator Control */}
      <div className="mt-6 p-4 rounded-2xl bg-neutral-50 dark:bg-slate-950/60 border border-neutral-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider">Simulated Traffic Load</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
              Adjust concurrent API threads to observe dynamic cluster load scaling.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-72">
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={concurrentUsers}
            onChange={(e) => setConcurrentUsers(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <span className="text-xs font-bold text-cyan-400 w-16 text-right shrink-0">
            {concurrentUsers} req/s
          </span>
        </div>
      </div>

      {/* Benchmark Bars Grid */}
      <div className="space-y-4 mt-6">
        {MODELS.map((model) => {
          // Calculate dynamic metric scaling based on load
          const scaledLatency = Math.round(model.latencyMs + (concurrentUsers / 1000) * 12);
          const scaledTokens = Math.round(model.tokensPerSec * (1 - (concurrentUsers / 2000) * 0.1));
          
          let barValue = 0;
          let maxVal = 100;
          let displayLabel = '';

          if (activeMetric === 'throughput') {
            barValue = scaledTokens;
            maxVal = 300;
            displayLabel = `${scaledTokens} t/s`;
          } else if (activeMetric === 'latency') {
            barValue = scaledLatency;
            maxVal = 60; // lower latency is better
            displayLabel = `${scaledLatency} ms`;
          } else {
            barValue = model.accuracyScore;
            maxVal = 100;
            displayLabel = `${model.accuracyScore}%`;
          }

          const fillPercentage = Math.min(100, Math.max(10, (barValue / maxVal) * 100));

          return (
            <TiltCard
              key={model.id}
              className={`p-4 rounded-2xl border transition-all ${
                model.id === 'm-aempore'
                  ? isDarkMode
                    ? 'bg-slate-950 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : 'bg-white border-neutral-900 shadow-sm'
                  : isDarkMode
                  ? 'bg-slate-950/50 border-slate-800'
                  : 'bg-neutral-50/80 border-neutral-200/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm font-sans">{model.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      isDarkMode
                        ? 'bg-slate-800 text-slate-300 border border-slate-700'
                        : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    v{model.version} • {model.provider}
                  </span>
                  {model.id === 'm-aempore' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-slate-950 shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                      Primary Engine
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
                    {model.specialty}
                  </span>
                  <span className="text-cyan-400 font-bold font-mono text-sm">{displayLabel}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    activeMetric === 'latency'
                      ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]'
                      : activeMetric === 'accuracy'
                      ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                      : 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                  }`}
                  style={{ width: `${fillPercentage}%` }}
                />
              </div>
            </TiltCard>
          );
        })}
      </div>
    </motion.section>
  );
};
