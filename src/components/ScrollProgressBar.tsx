import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

interface ScrollProgressBarProps {
  isDarkMode?: boolean;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ isDarkMode = false }) => {
  const { scrollYProgress } = useScroll();

  // Smooth spring for fluid scrolling visual feedback
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1.5 pointer-events-none bg-neutral-200/30 dark:bg-slate-900/40 backdrop-blur-xs">
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className={`h-full w-full rounded-r-full transition-colors ${
          isDarkMode
            ? 'bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
            : 'bg-gradient-to-r from-neutral-900 via-cyan-600 to-emerald-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
        }`}
      />
    </div>
  );
};
