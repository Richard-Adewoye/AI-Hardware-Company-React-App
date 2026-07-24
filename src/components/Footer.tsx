import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Send, ShieldCheck, Globe, Cpu, Sparkles, Terminal } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
  onOpenModal?: (modalName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode = false, onOpenModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-[32px] p-8 sm:p-10 backdrop-blur-md transition-colors duration-300 border mt-12 mb-6 ${
        isDarkMode
          ? 'bg-slate-950/90 border-cyan-500/30 text-slate-100 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
          : 'bg-neutral-900 text-white border-neutral-800 shadow-xl'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Grid: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-neutral-800 dark:border-slate-800">
          {/* Brand Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div
                className={`p-2 rounded-xl flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-gradient-to-tr from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                    : 'bg-white text-neutral-900'
                }`}
              >
                <Cpu className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black tracking-tight font-sans">Aempore AI</span>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed max-w-md ${isDarkMode ? 'text-slate-400' : 'text-neutral-400'}`}>
              Architecting next-generation 3D machineries, spatial generative shaders, and autonomous quantum tensor AI models for forward-thinking engineering teams.
            </p>

            {/* Live Status Badge */}
            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-semibold text-emerald-400">
                ● All Systems Operational — 99.98% Uptime
              </span>
            </div>
          </div>

          {/* Newsletter Input (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Subscribe to Quantum & 3D AI Research Dispatch
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-neutral-400'}`}>
              Receive weekly whitepapers, prompt templates, and release notes directly to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your developer email..."
                className={`flex-1 px-4 py-2.5 rounded-full text-xs font-sans border outline-none transition-all ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-cyan-500'
                    : 'bg-neutral-800 border-neutral-700 text-white focus:border-white'
                }`}
              />
              <button
                type="submit"
                className={`px-6 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all shrink-0 active:scale-95 ${
                  isSubscribed
                    ? 'bg-emerald-500 text-white'
                    : isDarkMode
                    ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'bg-white text-neutral-900 hover:bg-neutral-200'
                }`}
              >
                {isSubscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                <span>{isSubscribed ? 'Subscribed!' : 'Subscribe'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Link Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-neutral-800 dark:border-slate-800 text-xs">
          {/* Column 1 */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wider text-cyan-400">Products</h4>
            <ul className="space-y-2.5 text-neutral-400 dark:text-slate-400 font-medium">
              <li>
                <button onClick={() => onOpenModal?.('portfolio')} className="hover:text-cyan-300 transition-colors">
                  Aempore Machineries
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal?.('prompts')} className="hover:text-cyan-300 transition-colors">
                  Prompt Studio Workbench
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal?.('all-companies')} className="hover:text-cyan-300 transition-colors">
                  AI Directory
                </button>
              </li>
              <li>
                <button onClick={() => onOpenModal?.('download-app')} className="hover:text-cyan-300 transition-colors">
                  Mobile App (iOS/Android)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wider text-cyan-400">Ecosystem</h4>
            <ul className="space-y-2.5 text-neutral-400 dark:text-slate-400 font-medium">
              <li>
                <button onClick={() => onOpenModal?.('ecosystem')} className="hover:text-cyan-300 transition-colors">
                  Ecosystem Grants ($250k)
                </button>
              </li>
              <li>
                <a href="#sdk-hub" className="hover:text-cyan-300 transition-colors">
                  Developer API & SDK
                </a>
              </li>
              <li>
                <button onClick={() => onOpenModal?.('reviews')} className="hover:text-cyan-300 transition-colors">
                  Community Reviews
                </button>
              </li>
              <li>
                <a href="#community" className="hover:text-cyan-300 transition-colors">
                  Creator Spotlight
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wider text-cyan-400">Research</h4>
            <ul className="space-y-2.5 text-neutral-400 dark:text-slate-400 font-medium">
              <li>
                <a href="#research" className="hover:text-cyan-300 transition-colors">
                  Quantum Tensor Processor
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-cyan-300 transition-colors">
                  Kinetic Drone Swarms
                </a>
              </li>
              <li>
                <a href="#telemetry" className="hover:text-cyan-300 transition-colors">
                  Optical Actuator Telemetry
                </a>
              </li>
              <li>
                <a href="#benchmarks" className="hover:text-cyan-300 transition-colors">
                  Model Benchmarks
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wider text-cyan-400">Company</h4>
            <ul className="space-y-2.5 text-neutral-400 dark:text-slate-400 font-medium">
              <li>
                <a href="#about" className="hover:text-cyan-300 transition-colors">
                  About Aempore AI
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-cyan-300 transition-colors">
                  Careers (Hiring AI Engineers)
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-cyan-300 transition-colors">
                  Privacy Policy & Security
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-cyan-300 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Region Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Region: Global (Europe West - Cloud Run)</span>
          </div>

          <div className="flex items-center gap-1">
            <span>© 2026 Aempore AI Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hover:text-cyan-300 transition-colors cursor-pointer">GitHub</span>
            <span>•</span>
            <span className="hover:text-cyan-300 transition-colors cursor-pointer">Discord</span>
            <span>•</span>
            <span className="hover:text-cyan-300 transition-colors cursor-pointer">X / Twitter</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
