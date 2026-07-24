import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Copy, Check, Terminal, Play, Wand2, SlidersHorizontal } from 'lucide-react';
import { PromptTemplate } from '../types';

interface PromptWorkbenchSectionProps {
  promptTemplates: PromptTemplate[];
  isDarkMode?: boolean;
}

export const PromptWorkbenchSection: React.FC<PromptWorkbenchSectionProps> = ({
  promptTemplates,
  isDarkMode = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customPrompt, setCustomPrompt] = useState<string>(
    'Synthesize a 3D kinetic glass structure with dynamic lighting reflections, quantum refraction indices, and zero-gravity float behavior.'
  );
  const [temperature, setTemperature] = useState<number>(0.7);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [outputResult, setOutputResult] = useState<string | null>(
    '// Synthesized 3D Neural Shader Output\nconst kineticMaterial = new THREE.MeshPhysicalMaterial({\n  transmission: 0.95,\n  opacity: 1.0,\n  roughness: 0.08,\n  ior: 1.52,\n  thickness: 2.4,\n  dispersion: 0.04,\n});'
  );

  const categories = ['All', 'Machine Learning', 'Computer Vision', 'Neural Synthesis', 'Data Analytics'];

  const filteredPrompts =
    selectedCategory === 'All'
      ? promptTemplates
      : promptTemplates.filter((p) => p.category === selectedCategory);

  const handleCopyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSynthesizePrompt = () => {
    setIsGenerating(true);
    setOutputResult('Synthesizing neural geometry vectors & material shaders...');
    setTimeout(() => {
      setOutputResult(
        `// Generated Shader for: "${customPrompt.slice(0, 40)}..."\nconst quantumNode = {\n  seed: Math.random(),\n  temp: ${temperature},\n  vector: [0.94, -0.12, 1.84],\n  subsurfaceColor: '#06b6d4',\n  densityRatio: 0.982\n};`
      );
      setIsGenerating(false);
    }, 1500);
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
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-400" />
              Prompt Studio Workbench
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
            AI Prompt & Synthesis Studio
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
            Explore curated prompts or execute live neural synthesis for 3D kinetic assets, computer vision filters, and ML algorithms.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
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
      </div>

      {/* Grid Layout: Left Live Interactive Generator, Right Prompt Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Interactive Input & Simulator (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                Live Prompt Synthesizer
              </span>
              <span className="text-[11px] font-medium text-cyan-400">Temp: {temperature}</span>
            </div>

            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={4}
              className={`w-full p-3.5 rounded-2xl text-xs font-sans border transition-all resize-none outline-none ${
                isDarkMode
                  ? 'bg-slate-950/80 border-slate-800 text-slate-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-neutral-900'
              }`}
              placeholder="Enter custom prompt instructions for 3D or ML synthesis..."
            />

            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[10px] text-slate-400">Creativity:</span>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <button
                onClick={handleSynthesizePrompt}
                disabled={isGenerating}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 shrink-0 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.3)] hover:brightness-110'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm'
                }`}
              >
                {isGenerating ? <Sparkles className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>Synthesize</span>
              </button>
            </div>
          </div>

          {/* Generated Code Output Box */}
          <div
            className={`p-4 rounded-2xl border font-mono text-xs mt-4 ${
              isDarkMode
                ? 'bg-slate-950 border-cyan-500/30 text-cyan-300 shadow-[inset_0_0_15px_rgba(6,182,212,0.1)]'
                : 'bg-neutral-900 border-neutral-800 text-emerald-400'
            }`}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 dark:border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Terminal className="w-3 h-3" /> Synthesis Output
              </span>
              <span className="text-[10px] text-cyan-400 font-sans">Aempore-v2.4-LLM</span>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed overflow-x-auto text-[11px]">
              {outputResult}
            </pre>
          </div>
        </div>

        {/* Right Preset Prompt Cards Grid (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredPrompts.map((item, idx) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border flex flex-col justify-between transition-all group ${
                isDarkMode
                  ? 'bg-slate-950/60 border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'bg-neutral-50/80 border-neutral-200/80 hover:border-neutral-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isDarkMode
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                        : 'bg-white text-neutral-800 border border-neutral-200'
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{item.copiesCount} uses</span>
                </div>

                <h3 className="text-xs font-bold mb-1.5 line-clamp-1">{item.title}</h3>
                <p className={`text-[11px] leading-relaxed line-clamp-3 ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
                  "{item.promptText}"
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-neutral-200/50 dark:border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setCustomPrompt(item.promptText)}
                  className={`text-[11px] font-bold transition-colors ${
                    isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-neutral-900 hover:text-neutral-700'
                  }`}
                >
                  Use in Studio →
                </button>

                <button
                  onClick={() => handleCopyPrompt(item.promptText, idx)}
                  className={`p-1.5 rounded-lg border transition-all ${
                    copiedIndex === idx
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40'
                      : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                  title="Copy Prompt Text"
                >
                  {copiedIndex === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
