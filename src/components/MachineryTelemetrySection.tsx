import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gauge, Activity, Cpu, Sliders, Play, RotateCcw, ShieldCheck, AlertCircle, Zap } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface MachineryTelemetrySectionProps {
  isDarkMode?: boolean;
}

export const MachineryTelemetrySection: React.FC<MachineryTelemetrySectionProps> = ({
  isDarkMode = false,
}) => {
  const [motorSpeed, setMotorSpeed] = useState<number>(78);
  const [opticalCalibration, setOpticalCalibration] = useState<number>(94);
  const [acousticDampening, setAcousticDampening] = useState<number>(62);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simLog, setSimLog] = useState<string>('Telemetry standing by. Systems nominal.');

  const handleRunDiagnostics = () => {
    setIsSimulating(true);
    setSimLog('Initializing full kinematic frequency sweep...');
    setTimeout(() => {
      setSimLog('Calibrating optical laser array & resonance dampers...');
    }, 1200);
    setTimeout(() => {
      setSimLog('Diagnostic complete: All 12 precision actuators aligned at 99.8% stability.');
      setIsSimulating(false);
    }, 2500);
  };

  const handleReset = () => {
    setMotorSpeed(78);
    setOpticalCalibration(94);
    setAcousticDampening(62);
    setSimLog('Parameters reset to factory factory default presets.');
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
      {/* Section Header */}
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
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              Kinetic Telemetry Section
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
            Machinery Telemetry & Control Suite
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
            Real-time sensory feedback, active resonance damper controls, and optical actuator telemetry for Aempore Machineries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunDiagnostics}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
              isDarkMode
                ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50'
                : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm disabled:opacity-50'
            }`}
          >
            {isSimulating ? (
              <Zap className="w-4 h-4 animate-spin text-amber-300" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
            <span>{isSimulating ? 'Running Diagnostics...' : 'Run Diagnostics'}</span>
          </button>

          <button
            onClick={handleReset}
            className={`p-2.5 rounded-full border transition-all active:scale-95 ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40'
                : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200'
            }`}
            title="Reset to Defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Metric 1: Vibration Frequency */}
        <TiltCard
          className={`p-4 rounded-2xl border transition-colors ${
            isDarkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-neutral-50/80 border-neutral-200/80'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
              Kinetic Frequency
            </span>
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black font-sans">{Math.round((motorSpeed * 14.2))}</span>
            <span className="text-xs font-semibold text-cyan-400">Hz</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-cyan-500 h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
              style={{ width: `${(motorSpeed / 100) * 100}%` }}
            />
          </div>
          <span className="text-[11px] font-medium text-emerald-500 mt-2 block">✓ Harmonics Stabilized</span>
        </TiltCard>

        {/* Metric 2: Optical Laser Alignment */}
        <TiltCard
          className={`p-4 rounded-2xl border transition-colors ${
            isDarkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-neutral-50/80 border-neutral-200/80'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
              Optical Focus
            </span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black font-sans">{opticalCalibration}%</span>
            <span className="text-xs font-semibold text-emerald-400">Purity</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              style={{ width: `${opticalCalibration}%` }}
            />
          </div>
          <span className="text-[11px] font-medium text-emerald-500 mt-2 block">✓ Beam Focal Point Target: 0.02nm</span>
        </TiltCard>

        {/* Metric 3: Acoustic Dampening */}
        <TiltCard
          className={`p-4 rounded-2xl border transition-colors ${
            isDarkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-neutral-50/80 border-neutral-200/80'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
              Resonance Dampening
            </span>
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black font-sans">-{acousticDampening}</span>
            <span className="text-xs font-semibold text-indigo-400">dB</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${acousticDampening}%` }}
            />
          </div>
          <span className="text-[11px] font-medium text-indigo-400 mt-2 block">Active Wave Suppression</span>
        </TiltCard>

        {/* Metric 4: System Thermal Load */}
        <TiltCard
          className={`p-4 rounded-2xl border transition-colors ${
            isDarkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-neutral-50/80 border-neutral-200/80'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
              Thermal Dissipation
            </span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black font-sans">{Math.round(38.4 + motorSpeed * 0.12)}°C</span>
            <span className="text-xs font-semibold text-amber-400">Optimal</span>
          </div>
          <div className="w-full bg-neutral-200 dark:bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${38 + motorSpeed * 0.2}%` }}
            />
          </div>
          <span className="text-[11px] font-medium text-amber-400 mt-2 block">Cryo-Cooling Pump Active</span>
        </TiltCard>
      </div>

      {/* Sliders & Diagnostic Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 pt-6 border-t border-neutral-200/60 dark:border-slate-800">
        {/* Sliders Control Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Actuator Parameter Adjustments</h3>
          </div>

          <div className="space-y-3">
            {/* Slider 1 */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Torque & Motor Velocity Output</span>
                <span className="text-cyan-400">{motorSpeed}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={motorSpeed}
                onChange={(e) => setMotorSpeed(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Slider 2 */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Optical Lens Alignment & Calibration</span>
                <span className="text-emerald-400">{opticalCalibration}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={opticalCalibration}
                onChange={(e) => setOpticalCalibration(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Slider 3 */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Active Acoustic Noise Suppression</span>
                <span className="text-indigo-400">{acousticDampening}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={acousticDampening}
                onChange={(e) => setAcousticDampening(Number(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Live Terminal Log */}
        <div
          className={`p-4 rounded-2xl border font-mono text-xs flex flex-col justify-between ${
            isDarkMode
              ? 'bg-slate-950 border-cyan-500/30 text-cyan-300 shadow-[inset_0_0_15px_rgba(6,182,212,0.1)]'
              : 'bg-neutral-900 border-neutral-800 text-emerald-400'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 dark:border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Live Telemetry Terminal</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="leading-relaxed font-mono">{simLog}</p>
          </div>
          <div className="pt-3 text-[10px] text-slate-500 flex justify-between">
            <span>PORT: 3000 // AES-256</span>
            <span>STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
