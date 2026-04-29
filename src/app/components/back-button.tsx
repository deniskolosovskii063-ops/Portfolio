import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Telegram paper-plane icon (official logo shape)
function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M9.78 18.65L10.06 14.42L17.74 7.5C18.08 7.19 17.67 7.04 17.22 7.31L7.74 13.3L3.64 12C2.76 11.75 2.75 11.14 3.84 10.7L19.81 4.54C20.54 4.21 21.24 4.72 20.96 5.84L18.24 18.65C18.05 19.56 17.5 19.78 16.74 19.36L12.6 16.3L10.61 18.23C10.38 18.46 10.19 18.65 9.78 18.65Z" />
    </svg>
  );
}

const glassStyle: React.CSSProperties = {
  backgroundColor: 'rgba(18, 17, 16, 0.55)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
};

export function BackButton() {
  const navigate = useNavigate();

  return (
    /* Fixed bar — out of flow, always visible at top */
    <div
      className="fixed left-0 right-0 z-50 pointer-events-none"
      style={{ top: 0 }}
    >
      <div className="w-full max-w-[1275px] mx-auto px-4 sm:px-8 xl:px-0 pt-[30px] flex items-center justify-between">

        {/* ← Back arrow */}
        <motion.button
          onClick={() => navigate('/')}
          className="pointer-events-auto flex items-center justify-center size-[48px] rounded-full cursor-pointer"
          style={{ ...glassStyle, outline: 'none' }}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          whileHover={{
            backgroundColor: 'rgba(38, 37, 36, 0.72)',
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 15L7 10L12 5"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        {/* Telegram — circle with icon */}
        <motion.a
          href="https://t.me/deniskolosov"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto no-underline"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease }}
        >
          <motion.div
            className="flex items-center justify-center size-[48px] rounded-full cursor-pointer"
            style={glassStyle}
            whileHover={{ backgroundColor: 'rgba(38, 37, 36, 0.72)', scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.22 }}
          >
            <TelegramIcon />
          </motion.div>
        </motion.a>

      </div>
    </div>
  );
}
