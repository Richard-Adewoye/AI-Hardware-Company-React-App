import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, QrCode, Sparkles, Play, Pause, Volume2, VolumeX, Video, RefreshCw, Zap } from 'lucide-react';
import { Project } from '../types';

interface HeroCenterProps {
  currentProject: Project;
  onDownloadApp: () => void;
  onSeeReviews: () => void;
  onVisitWebsite: () => void;
  isDarkMode?: boolean;
}

interface VideoOption {
  id: string;
  name: string;
  url: string;
  fallbackPoster: string;
}

const HERO_VIDEOS: VideoOption[] = [
  {
    id: 'kinetic-mesh',
    name: '3D Kinetic Hologram',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-3d-complex-geometric-shapes-moving-42994-large.mp4',
    fallbackPoster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'cyber-code',
    name: 'Quantum Grid Stream',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-lines-in-motion-32864-large.mp4',
    fallbackPoster: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'neural-matrix',
    name: 'Neural Matrix Pulse',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-code-41539-large.mp4',
    fallbackPoster: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=80',
  },
];

export const HeroCenter: React.FC<HeroCenterProps> = ({
  currentProject,
  onDownloadApp,
  onSeeReviews,
  onVisitWebsite,
  isDarkMode = false,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoOption>(HERO_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Toggle Mute
  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Change video source
  const handleSwitchVideo = (video: VideoOption) => {
    setSelectedVideo(video);
    setVideoLoaded(false);
  };

  // Kinetic Particle Overlay on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 400);
    let height = (canvas.height = canvas.offsetHeight || 300);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number }> = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode
              ? `rgba(6, 182, 212, ${0.25 * (1 - dist / 80)})`
              : `rgba(255, 255, 255, ${0.3 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.fillStyle = isDarkMode ? `rgba(6, 182, 212, ${p1.alpha})` : `rgba(255, 255, 255, ${p1.alpha})`;
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkMode]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`backdrop-blur-md rounded-[28px] p-5 sm:p-6 flex flex-col justify-between transition-colors duration-300 w-full min-h-[640px] border ${
        isDarkMode
          ? 'bg-slate-900/90 border-cyan-500/30 text-slate-100 shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]'
          : 'bg-white/90 border-neutral-200/90 text-neutral-900 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Animated Video Background Media Container */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] border group ${
          isDarkMode ? 'bg-slate-950 border-cyan-500/30' : 'bg-neutral-900 border-neutral-800'
        }`}
      >
        {/* Animated Background HTML5 Video */}
        <video
          ref={videoRef}
          key={selectedVideo.id}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={selectedVideo.fallbackPoster}
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            videoLoaded ? 'opacity-90' : 'opacity-40'
          }`}
        >
          <source src={selectedVideo.url} type="video/mp4" />
          {/* Static fallback image if video is not supported */}
          <img src={currentProject.imageUrl} alt={currentProject.title} className="w-full h-full object-cover" />
        </video>

        {/* Dynamic Holographic Gradient & Grid Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            isDarkMode
              ? 'bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent'
              : 'bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent'
          }`}
        />

        {/* Canvas Kinetic Particle Overlay */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

        {/* Top-Left Overlay Tag: Number + Animated Video Badge */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 z-20 pointer-events-none">
          <div className="flex items-center gap-2">
            <span
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md ${
                isDarkMode ? 'text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]' : 'text-white'
              }`}
            >
              {currentProject.number}
            </span>

            {/* Live Animated Video Pill */}
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md px-2.5 py-1 rounded-full border shadow-sm ${
                isDarkMode
                  ? 'bg-slate-950/80 text-cyan-300 border-cyan-500/40'
                  : 'bg-black/40 text-white border-white/30'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              Live 3D Video Loop
            </span>
          </div>

          <span
            className={`text-[11px] font-semibold backdrop-blur-md px-2.5 py-0.5 rounded-full border w-max shadow-2xs ${
              isDarkMode
                ? 'text-cyan-200 bg-slate-950/70 border-cyan-500/40'
                : 'text-white/90 bg-black/30 border-white/20'
            }`}
          >
            Active Stream: {selectedVideo.name}
          </span>
        </div>

        {/* Top-Right Overlay Widget: Download App Button */}
        <button
          onClick={onDownloadApp}
          className={`absolute top-4 right-4 z-20 flex items-center gap-2 backdrop-blur-md px-3 py-1.5 rounded-xl border shadow-sm transition-all hover:scale-105 active:scale-95 group/qr ${
            isDarkMode
              ? 'bg-slate-900/90 border-cyan-500/40 text-slate-100 hover:bg-slate-900'
              : 'bg-white/85 hover:bg-white border-white/60 text-neutral-800'
          }`}
        >
          <div className="flex flex-col text-right">
            <span
              className={`text-[10px] font-bold tracking-tight leading-none ${
                isDarkMode ? 'text-cyan-300' : 'text-neutral-900'
              }`}
            >
              Download
            </span>
            <span
              className={`text-[10px] font-semibold leading-none mt-0.5 ${
                isDarkMode ? 'text-slate-400' : 'text-neutral-600'
              }`}
            >
              App
            </span>
          </div>
          <div
            className={`p-1 rounded-md transition-colors ${
              isDarkMode
                ? 'bg-cyan-500 text-slate-950 group-hover/qr:bg-cyan-400'
                : 'bg-neutral-900 text-white group-hover/qr:bg-black'
            }`}
          >
            <QrCode className="w-4 h-4" />
          </div>
        </button>

        {/* Bottom Overlay Controls: Video Selector & Playback Buttons */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 p-2 rounded-2xl backdrop-blur-xl border bg-black/40 border-white/20 text-white">
          {/* Video Switcher Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {HERO_VIDEOS.map((vid) => (
              <button
                key={vid.id}
                onClick={() => handleSwitchVideo(vid)}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all shrink-0 ${
                  selectedVideo.id === vid.id
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.6)]'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                {vid.name}
              </button>
            ))}
          </div>

          {/* Video Playback & Sound Toggles */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleTogglePlay}
              className="p-1.5 rounded-lg bg-white/15 hover:bg-white/30 transition-colors text-white"
              title={isPlaying ? 'Pause Video Loop' : 'Play Video Loop'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            <button
              onClick={handleToggleMute}
              className="p-1.5 rounded-lg bg-white/15 hover:bg-white/30 transition-colors text-white"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Headline & Details Below Image */}
      <div className="mt-6 flex flex-col justify-between flex-1 gap-6">
        <div>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.08] font-sans ${
              isDarkMode
                ? 'bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                : 'text-neutral-900'
            }`}
          >
            Futuristic <br />
            Machineries
          </h1>
        </div>

        {/* Middle Row: Left Tagline + Right User Avatars Review Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-[180px]">
            <p className={`text-xs font-medium leading-tight ${isDarkMode ? 'text-slate-400' : 'text-neutral-500'}`}>
              Let's Bright the future by learning
            </p>
          </div>

          {/* Member Avatars + See Reviews Button */}
          <button
            onClick={onSeeReviews}
            className={`flex items-center gap-2.5 border px-3 py-1.5 rounded-full transition-all group shadow-2xs w-max ${
              isDarkMode
                ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-cyan-500/40'
                : 'bg-neutral-100/80 hover:bg-neutral-200/80 border-neutral-200/80 text-neutral-800'
            }`}
          >
            {/* Avatar Stack */}
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Reviewer 1"
                referrerPolicy="no-referrer"
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Reviewer 2"
                referrerPolicy="no-referrer"
              />
            </div>
            <span
              className={`text-xs font-semibold flex items-center gap-1 ${
                isDarkMode ? 'text-cyan-300' : 'text-neutral-800'
              }`}
            >
              See Reviews
              <ArrowRight
                className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ${
                  isDarkMode ? 'text-cyan-400' : 'text-neutral-600'
                }`}
              />
            </span>
          </button>
        </div>

        {/* Bottom Website Button */}
        <div className="pt-2">
          <button
            onClick={onVisitWebsite}
            className={`group flex items-center justify-between px-4 py-2.5 rounded-full border text-xs font-semibold transition-all hover:shadow-xs active:scale-[0.99] w-max sm:w-auto ${
              isDarkMode
                ? 'bg-slate-900 border-cyan-500/50 hover:border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)] hover:shadow-[0_0_18px_rgba(6,182,212,0.4)]'
                : 'bg-white border-neutral-300 hover:border-neutral-900 text-neutral-900 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isDarkMode ? 'bg-cyan-400 animate-ping' : 'bg-neutral-900'
                }`}
              />
              <span>Visit website</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 ml-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

