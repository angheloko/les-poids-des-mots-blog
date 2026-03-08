import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useSpring } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

export default function Layout() {
  const location = useLocation();
  const year = new Date().getFullYear();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Scroll velocity for "motion blur/ghosting" during scroll
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // Map velocity to a blur amount (0 at rest, up to 2px at high speed)
  const blurAmount = useTransform(smoothVelocity, [-1000, 0, 1000], [2, 0, 2]);
  // Map velocity to a slight opacity drop (1 at rest, 0.6 at high speed)
  const opacityAmount = useTransform(smoothVelocity, [-1000, 0, 1000], [0.6, 1, 0.6]);
  // Map velocity to a slight skew for "drag" effect
  const skewAmount = useTransform(smoothVelocity, [-1000, 0, 1000], [-2, 0, 2]);

  // Simulate E-Ink refresh on route change
  useEffect(() => {
    setIsRefreshing(true);
    const timer = setTimeout(() => setIsRefreshing(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col relative bg-solarized-base3 text-solarized-base00 font-mono overflow-hidden selection:bg-solarized-base01 selection:text-solarized-base3">
      {/* Dithering Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-dither z-50 mix-blend-multiply"></div>
      
      {/* E-Ink Refresh Flash Overlay */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0] }} // Flash black/white/black
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, times: [0, 0.2, 0.4, 0.6, 1] }}
            className="fixed inset-0 z-[100] bg-solarized-base03 pointer-events-none mix-blend-difference"
          />
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto px-6 py-12 w-full flex-grow flex flex-col relative z-10">
        <header className="flex justify-between items-baseline mb-16 border-b-2 border-solarized-base01 pb-4 border-dashed">
          <Link to="/" className="text-3xl font-serif font-bold text-solarized-base01 hover:text-solarized-orange transition-colors tracking-tight">
            Ink & Light
          </Link>
          <nav className="flex gap-6 text-sm font-mono uppercase tracking-widest text-solarized-base01">
            <Link to="/" className="hover:underline decoration-1 underline-offset-4">
              Journal
            </Link>
            <Link to="/about" className="hover:underline decoration-1 underline-offset-4">
              About
            </Link>
          </nav>
        </header>

        <main className="flex-grow relative">
          {/* 
            AnimatePresence with mode="sync" (default) allows both components to exist simultaneously.
            The exiting component becomes the "Ghost".
          */}
          <AnimatePresence>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, filter: 'blur(2px)' }}
              animate={{ 
                opacity: 1, 
                filter: 'blur(0px)',
                transition: { duration: 1.2, ease: "easeOut" } 
              }}
              exit={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: 0.08, // Very faint ghost
                filter: 'blur(1px) grayscale(100%)', // Blurry and gray
                zIndex: 0, // Behind the new content
                transition: { duration: 4, ease: "linear" } // Linger for 4 seconds
              }}
              style={{
                filter: `blur(${blurAmount}px)`,
                opacity: opacityAmount,
                skewY: skewAmount,
              }}
              className="origin-top"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="mt-24 pt-8 border-t-2 border-solarized-base2 border-dotted text-center text-xs font-mono text-solarized-base1">
          <p>&copy; {year} Ink & Light. System Status: ONLINE.</p>
          <p className="mt-2 opacity-70">
            Rendering: E-Ink Simulation Mode
          </p>
        </footer>
      </div>
    </div>
  );
}
