import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Video, Sparkles, RefreshCw, Zap } from 'lucide-react';

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
    fallbackPoster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: 'cyber-code',
    name: 'Quantum Grid Stream',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-lines-in-motion-32864-large.mp4',
    fallbackPoster: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&auto=format&fit=crop&q=80',
  },
  {
    id: 'neural-matrix',
    name: 'Neural Matrix Pulse',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-code-41539-large.mp4',
    fallbackPoster: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&auto=format&fit=crop&q=80',
  },
];

interface HeroBackgroundVideoProps {
  isDarkMode?: boolean;
  children: React.ReactNode;
}

export const HeroBackgroundVideo: React.FC<HeroBackgroundVideoProps> = ({
  isDarkMode = false,
  children,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoOption>(HERO_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSwitchVideo = (video: VideoOption) => {
    setSelectedVideo(video);
    setVideoLoaded(false);
  };

  // Canvas particle animation overlaid over the background video
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 1000);
    let height = (canvas.height = canvas.offsetHeight || 600);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number }> = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

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

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode
              ? `rgba(6, 182, 212, ${0.2 * (1 - dist / 100)})`
              : `rgba(0, 0, 0, ${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.fillStyle = isDarkMode ? `rgba(6, 182, 212, ${p1.alpha})` : `rgba(0, 0, 0, ${p1.alpha * 0.5})`;
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-[36px] overflow-hidden p-3 sm:p-5 border transition-all duration-500 my-2"
    >
      {/* Animated Video Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          key={selectedVideo.id}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={selectedVideo.fallbackPoster}
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            videoLoaded
              ? isDarkMode
                ? 'opacity-35 scale-105'
                : 'opacity-25 scale-105'
              : 'opacity-10'
          }`}
        >
          <source src={selectedVideo.url} type="video/mp4" />
        </video>

        {/* Holographic Gradient Mask & Grid Vignette */}
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? 'bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/95'
              : 'bg-gradient-to-b from-white/85 via-white/70 to-white/90'
          }`}
        />

        {/* Canvas Particle Overlay */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" />
      </div>

      {/* Floating Control Bar for Hero Background Video */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 py-2 mb-4 rounded-2xl backdrop-blur-md border bg-black/40 border-white/20 text-white shadow-lg">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
          </span>
          <span className="text-xs font-bold font-mono tracking-wide flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-cyan-400" />
            Hero Background Video: <span className="text-cyan-300">{selectedVideo.name}</span>
          </span>
        </div>

        {/* Video Preset Switcher Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {HERO_VIDEOS.map((vid) => (
            <button
              key={vid.id}
              onClick={() => handleSwitchVideo(vid)}
              className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all shrink-0 active:scale-95 ${
                selectedVideo.id === vid.id
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              {vid.name}
            </button>
          ))}
        </div>

        {/* Play / Pause & Sound Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleTogglePlay}
            className="p-1.5 rounded-lg bg-white/15 hover:bg-white/30 transition-colors text-white"
            title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          <button
            onClick={handleToggleMute}
            className="p-1.5 rounded-lg bg-white/15 hover:bg-white/30 transition-colors text-white"
            title={isMuted ? 'Unmute Background Audio' : 'Mute Background Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Hero Section Inner Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
