import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Copy, Check, Terminal, Play, Cpu, Key, ShieldCheck, Zap } from 'lucide-react';

interface SDKHubSectionProps {
  isDarkMode?: boolean;
}

const CODE_EXAMPLES: Record<string, { lang: string; code: string }> = {
  typescript: {
    lang: 'TypeScript',
    code: `import { AemporeAI } from '@aempore/ai-sdk';

const client = new AemporeAI({ apiKey: process.env.AEMPORE_API_KEY });

// Execute live 3D kinetic shader synthesis
const response = await client.machineries.synthesize({
  prompt: '3D kinetic glass mesh with optical resonance',
  precision: 'ultra',
  temperature: 0.7,
});

console.log('Shader Vector Output:', response.meshVectors);`,
  },
  python: {
    lang: 'Python',
    code: `from aempore_ai import AemporeClient

client = AemporeClient(api_key="aempore_sk_live_99482")

# Generate 3D kinetic tensor mesh
result = client.machineries.generate(
    prompt="Quantum optical waveguide with zero-gravity float",
    resolution="4K",
    hardware_acceleration=True
)

print(f"Mesh compiled: {result.mesh_url}")`,
  },
  rust: {
    lang: 'Rust',
    code: `use aempore_sdk::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = AemporeClient::from_env()?;
    
    let shader = client.synthesize_shader("Kinetic crystal lattice")
        .with_precision(0.99)
        .send()
        .await?;
        
    println!("Shader ID: {}", shader.id);
    Ok(())
}`,
  },
  curl: {
    lang: 'cURL',
    code: `curl -X POST https://api.aempore.ai/v2/machineries/synthesize \\
  -H "Authorization: Bearer aempore_sk_live_99482" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Futuristic 3D mechanical actuator",
    "format": "glTF-2.0"
  }'`,
  },
};

export const SDKHubSection: React.FC<SDKHubSectionProps> = ({ isDarkMode = false }) => {
  const [activeTab, setActiveTab] = useState<'typescript' | 'python' | 'rust' | 'curl'>('typescript');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_EXAMPLES[activeTab].code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePingEndpoint = () => {
    setIsTesting(true);
    setPingStatus('Pinging https://api.aempore.ai/v2/health...');
    setTimeout(() => {
      setPingStatus('200 OK — Response time: 14.2ms (Region: europe-west1)');
      setIsTesting(false);
    }, 1200);
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
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              Developer SDK Hub
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
            Aempore API & SDK Integrations
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
            Embed 3D kinetic mesh synthesis, computer vision pipelines, and quantum AI models into your own applications with native SDKs.
          </p>
        </div>

        {/* API Key Status Pill */}
        <div className="flex items-center gap-2">
          <div
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border ${
              isDarkMode
                ? 'bg-slate-950 border-cyan-500/30 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'bg-neutral-100 border-neutral-200 text-neutral-800'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            <span>API Key: Active</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Code Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Language Tabs & Instructions (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Select Language SDK
          </span>

          <div className="space-y-2">
            {(['typescript', 'python', 'rust', 'curl'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full p-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all border ${
                  activeTab === key
                    ? isDarkMode
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'bg-neutral-900 text-white border-neutral-900'
                    : isDarkMode
                    ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:text-cyan-300'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <span>{CODE_EXAMPLES[key].lang}</span>
                <span className="text-[10px] opacity-80">v2.4.0</span>
              </button>
            ))}
          </div>

          {/* Quick Install Command */}
          <div
            className={`p-3.5 rounded-2xl border font-mono text-xs ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-neutral-100 border-neutral-200 text-neutral-800'
            }`}
          >
            <span className="text-[10px] text-slate-400 font-sans block mb-1">Installation Command:</span>
            <code className="text-cyan-400 font-bold">
              {activeTab === 'python'
                ? 'pip install aempore-ai'
                : activeTab === 'rust'
                ? 'cargo add aempore-sdk'
                : 'npm install @aempore/ai-sdk'}
            </code>
          </div>

          {/* Live Ping Tester */}
          <button
            onClick={handlePingEndpoint}
            disabled={isTesting}
            className={`w-full py-2.5 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border transition-all active:scale-95 ${
              isDarkMode
                ? 'bg-slate-800/80 border-cyan-500/30 text-cyan-300 hover:bg-slate-800'
                : 'bg-neutral-100 border-neutral-200 text-neutral-800 hover:bg-neutral-200'
            }`}
          >
            {isTesting ? <Zap className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>Test Endpoint Ping</span>
          </button>

          {pingStatus && (
            <p className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2.5 rounded-xl border border-emerald-500/30">
              {pingStatus}
            </p>
          )}
        </div>

        {/* Right Code Display (8 Cols) */}
        <div
          className={`lg:col-span-8 p-5 rounded-2xl border font-mono text-xs relative flex flex-col justify-between ${
            isDarkMode
              ? 'bg-slate-950 border-cyan-500/30 text-slate-100 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]'
              : 'bg-neutral-900 border-neutral-800 text-slate-100'
          }`}
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400">{CODE_EXAMPLES[activeTab].lang} Example</span>
            </div>

            <button
              onClick={handleCopyCode}
              className={`p-2 rounded-lg border text-xs font-sans flex items-center gap-1.5 transition-all ${
                isCopied
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-cyan-300'
              }`}
            >
              {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="whitespace-pre-wrap leading-relaxed overflow-x-auto text-[11px] text-cyan-100/90 py-2">
            {CODE_EXAMPLES[activeTab].code}
          </pre>

          <div className="pt-3 border-t border-neutral-800 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-sans">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> TLS 1.3 Encrypted Endpoint
            </span>
            <span>Docs: https://docs.aempore.ai</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
