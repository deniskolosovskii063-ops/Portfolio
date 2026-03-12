import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

type BlurRevealTag = 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div';

interface BlurRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  wordDelay?: number;
  as?: BlurRevealTag;
  once?: boolean;
  triggerOnLoad?: boolean;
}

/**
 * Animates text content word-by-word with a blur + fade + Y-shift effect.
 * Uses useInView by default; pass triggerOnLoad=true for hero elements visible on first paint.
 */
export function BlurReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.68,
  wordDelay = 0.05,
  as: Tag = 'span',
  once = true,
  triggerOnLoad = false,
}: BlurRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    amount: 0.25,
  });

  const shouldAnimate = triggerOnLoad || isInView;
  const words = children.split(' ').filter(Boolean);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(10px)', y: 12 }}
          animate={shouldAnimate ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{
            duration,
            delay: delay + i * wordDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {word}{i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </Tag>
  );
}