import { motion } from 'motion/react';

// Deterministic rays configuration — symmetric, subtle, beautiful
const RAYS = [
  { angle: -82, opacity: 0.035, width: 0.8 },
  { angle: -70, opacity: 0.055, width: 1.3 },
  { angle: -58, opacity: 0.045, width: 1.0 },
  { angle: -46, opacity: 0.075, width: 1.8 },
  { angle: -34, opacity: 0.065, width: 1.5 },
  { angle: -22, opacity: 0.095, width: 2.2 },
  { angle: -12, opacity: 0.085, width: 1.9 },
  { angle: -4,  opacity: 0.13,  width: 3.0 },
  { angle:  0,  opacity: 0.15,  width: 3.5 },
  { angle:  4,  opacity: 0.13,  width: 3.0 },
  { angle:  12, opacity: 0.085, width: 1.9 },
  { angle:  22, opacity: 0.095, width: 2.2 },
  { angle:  34, opacity: 0.065, width: 1.5 },
  { angle:  46, opacity: 0.075, width: 1.8 },
  { angle:  58, opacity: 0.045, width: 1.0 },
  { angle:  70, opacity: 0.055, width: 1.3 },
  { angle:  82, opacity: 0.035, width: 0.8 },
];

interface LightRaysProps {
  className?: string;
}

export function LightRays({ className = '' }: LightRaysProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Wide atmospheric blue glow radiating from above */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 140% 65% at 50% -8%, rgba(37,99,235,0.42) 0%, rgba(29,78,216,0.22) 28%, rgba(10,20,80,0.06) 58%, transparent 75%)',
        }}
      />

      {/* Medium focused glow — center of light source */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: [0, 1, 0.88], scale: [0.75, 1.08, 1] }}
        transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          top: -120,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 520,
          height: 340,
          background:
            'radial-gradient(ellipse at 50% 38%, rgba(108,130,255,0.52) 0%, rgba(79,108,255,0.28) 38%, transparent 68%)',
          filter: 'blur(40px)',
          borderRadius: '50%',
        }}
      />

      {/* Tiny intense bright point at the very top center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.65] }}
        transition={{ duration: 2.2, ease: 'easeOut', delay: 0.4 }}
        style={{
          position: 'absolute',
          top: -8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 90,
          height: 65,
          background:
            'radial-gradient(ellipse at center, rgba(200,218,255,0.95) 0%, rgba(160,185,255,0.55) 40%, transparent 72%)',
          filter: 'blur(14px)',
        }}
      />

      {/* Rays SVG */}
      <motion.svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, delay: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {RAYS.map((ray, i) => {
          const rad = (ray.angle * Math.PI) / 180;
          const len = 1600;
          const x2 = 720 + Math.sin(rad) * len;
          const y2 = Math.cos(rad) * len;
          return (
            <line
              key={i}
              x1="720"
              y1="-5"
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth={ray.width}
              strokeOpacity={ray.opacity}
            />
          );
        })}
      </motion.svg>

      {/* Slow breathing overlay — subtle pulsation of the light */}
      <motion.div
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 35% at 50% -2%, rgba(59,96,255,0.09) 0%, transparent 65%)',
        }}
      />

      {/* Gradient fade — rays dissolve before reaching the content below */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, black 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
