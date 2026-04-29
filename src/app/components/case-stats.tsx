/**
 * CaseStatsGrid — shared stats block for all case pages.
 * Pixel-perfect match of the StatsGrid / StatItem from home-content.tsx,
 * including the AnimatedStatValue counter animation.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useInView } from 'motion/react';
import { fixText } from '../utils/fixText';

// ── Counter animation helpers (same as home-content.tsx) ─────────────────────

function parseStatNum(val: string) {
  const m = val.match(/^([^0-9]*)([\d]+(?:[. ][\d]+)*)(.*)$/);
  if (!m) return { before: '', num: 0, after: val, isDecimal: false, thousandSpace: false };
  const before       = m[1];
  const numRaw       = m[2];
  const after        = m[3];
  const isDecimal    = numRaw.includes('.');
  const thousandSpace = /\d \d/.test(numRaw);
  const num          = parseFloat(numRaw.replace(/ /g, ''));
  return { before, num, after, isDecimal, thousandSpace };
}

function fmtAnimated(n: number, isDecimal: boolean, thousandSpace: boolean): string {
  if (isDecimal)     return n.toFixed(1);
  if (thousandSpace) return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
  return Math.round(n).toString();
}

export function AnimatedStatValue({ value }: { value: string }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const parsed = useMemo(() => parseStatNum(value), [value]);

  const [display, setDisplay] = useState(
    () => `${parsed.before}${fmtAnimated(0, parsed.isDecimal, parsed.thousandSpace)}${parsed.after}`
  );

  useEffect(() => {
    if (!inView) return;
    const { before, num, after, isDecimal, thousandSpace } = parsed;
    const duration = 1200;
    let startTime: number | null = null;
    let cancelled = false;

    function tick(ts: number) {
      if (cancelled) return;
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // ease-out expo — snappy start, smooth finish
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(`${before}${fmtAnimated(num * eased, isDecimal, thousandSpace)}${after}`);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    return () => { cancelled = true; };
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref}>{display}</span>;
}

// ── CaseStat type ─────────────────────────────────────────────────────────────

export interface CaseStat {
  num: string;
  label: string;
  /** Optional node rendered right after the animated number (e.g. a badge) */
  badge?: React.ReactNode;
}

// ── CaseStatItem — identical to StatItem on the home page ────────────────────

function CaseStatItem({ num, label, badge }: CaseStat) {
  return (
    <div className="flex flex-col gap-[8px] flex-1 min-w-0">
      {/* Animated number + optional badge */}
      <div className="flex items-center gap-[8px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic text-[24px] sm:text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">
          <AnimatedStatValue value={num} />
        </p>
        {badge}
      </div>
      {/* Grey label */}
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic text-[#868585] text-[14px] sm:text-[16px] tracking-[-0.16px] leading-[14px] sm:leading-[28px]">
        {fixText(label)}
      </p>
    </div>
  );
}

// ── CaseStatsGrid — identical layout to StatsGrid on the home page ────────────

export function CaseStatsGrid({ stats }: { stats: CaseStat[] }) {
  // Split into rows of 2
  const rows: CaseStat[][] = [];
  for (let i = 0; i < stats.length; i += 2) {
    rows.push(stats.slice(i, i + 2));
  }
  return (
    <div className="flex flex-col gap-[24px] w-full">
      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-[32px]">
          {row.map((stat, ci) => (
            <CaseStatItem key={ci} {...stat} />
          ))}
        </div>
      ))}
    </div>
  );
}