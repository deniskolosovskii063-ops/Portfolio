import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useInView } from 'motion/react';
import { useNavigate } from 'react-router';
import svgPaths from '../../imports/svg-eldpgys5y2';
import zenitPaths from '../../imports/svg-gbstqrgrbv';
import mtsSvgPaths from '../../imports/svg-4hd525fgng';
import gidHubSvg from '../../imports/svg-ubd4ba3lte';
import { fixText } from '../utils/fixText';

// ── Dropbox direct video URLs (dl=1 — прямая отдача, st-токен убран) ──────────
const GAZPROM_VIDEO_SRC = "https://www.dropbox.com/scl/fi/6msfngpelt75pqllwmw0j/gazprom_id.mp4?rlkey=d35ci80zhqgbldgc0txnp6q81&dl=1";
const ZENIT_VIDEO_SRC   = "https://www.dropbox.com/scl/fi/a2kliogzdrywvjt9bblsm/Zenit.mp4?rlkey=quj0pfsjmxv1wdcmr3067sb7l&dl=1";
const NOVEBA_VIDEO_SRC  = "https://www.dropbox.com/scl/fi/z8q8slg8i0tp9xmjy4wek/Noveba.mp4?rlkey=orfe7umoay60zkf8x1t3ekmmi&dl=1";
const MTS_VIDEO_SRC     = "https://www.dropbox.com/scl/fi/22qxdoik6xggtmelt42zl/MTS.mp4?rlkey=e2eyc3ttr9tt9kz2znaofy35s&dl=1";
const GID_VIDEO_SRC     = "https://www.dropbox.com/scl/fi/8x9o2ypvw3sgo7gdh5ocq/6582428af2e2e3dcffe3cfaaee40eed8_10b7857c-3527-4fdf-832a-48abdf756739-1.mp4?rlkey=aciaz24y4u7nsdfb2et8uxypc&dl=1";
const GIDHUB_VIDEO_SRC: string | null = "https://www.dropbox.com/scl/fi/1o6kg2085a25hf69w2fin/dd9e7bd630d53d0622c9eac7ddf42d69_210a135f-b26f-4fb0-a65c-6e41506e9a9e-1.mp4?rlkey=kr25frb9tmx4pzqymz1tf0xqs&st=7tx9gl6s&dl=1";

// ── Images ────────────────────────────────────────────────────────────────────
import imgAvatar      from 'figma:asset/29117de79a1c89ab4964cad7c1cde1f057c58851.png';
import imgGIDBg       from 'figma:asset/d7d4dcbdc8666c8ccdc838ba7d98c0a20a302c38.png';
import imgGIDPhone    from 'figma:asset/bad2c28f2d9889ae722bf4a7a81f17de992bfe28.png';
import imgNovebaBg    from "figma:asset/12b4d4575123aa4f8cdffebbf7a4d19b2199e31d.png";
import imgNovebaPhone from "figma:asset/20c4772bb34ccd16bae8384c3e65c598cc330f1e.png";
import imgNovebaIcon  from 'figma:asset/fc25e4f5f7605daab8e01e3bdb49ef2c6a1d7cf8.png';
import imgGazpromBg    from 'figma:asset/d346d3d9ff41a3ad45bfd42554fe7265dda59669.png';
import imgGazpromPhone from 'figma:asset/001d10671b8709574c548455c832716daba56f5c.png';
import imgZenitBg     from 'figma:asset/30009fa3b20fa672955ba9f55ca66aee57bcaa5a.png';
import imgZenitPhone  from 'figma:asset/8f8cc89d8d9b954e29b97af7cac24f81521f79e8.png';
import imgMTSTablet   from 'figma:asset/48d36a8ee3e4cc52bd163a992c47b1fd3a826acf.png';
import imgMTSMobileBg from 'figma:asset/f5f60b93af9977b89f8fbde56fc5705d0c16fc59.png';
import imgGIDHubBg     from 'figma:asset/432003c659d71f49ca9b902ae734e4f8640fe8ea.png';
import imgGIDHubTablet from 'figma:asset/67021368ca94ceaaf393ddf959c47ca678b4b487.png';

// ── Animation constants ───────────────────────────────────────────────────────
const ease = [0.25, 0.46, 0.45, 0.94] as const;
const spring = [0.22, 1, 0.36, 1] as const;

// ── Counter animation helpers ─────────────────────────────────────────────────

/**
 * Parses a stat string like "420 000", "68%", "€320 млн", "1.8 млн", "30+"
 * into a numeric component and before/after strings.
 */
function parseStatNum(val: string) {
  // Match optional non-digit prefix, then a number (digits with optional spaces/dots), then suffix
  const m = val.match(/^([^0-9]*)([\d]+(?:[. ][\d]+)*)(.*)$/);
  if (!m) return { before: '', num: 0, after: val, isDecimal: false, thousandSpace: false };
  const before      = m[1];
  const numRaw      = m[2];
  const after       = m[3];
  const isDecimal   = numRaw.includes('.');
  const thousandSpace = /\d \d/.test(numRaw); // e.g. "420 000"
  const num         = parseFloat(numRaw.replace(/ /g, ''));
  return { before, num, after, isDecimal, thousandSpace };
}

function fmtAnimated(n: number, isDecimal: boolean, thousandSpace: boolean): string {
  if (isDecimal)      return n.toFixed(1);
  if (thousandSpace)  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
  return Math.round(n).toString();
}

function AnimatedStatValue({ value }: { value: string }) {
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

// ── Social icon components (with hover scale) ─────────────────────────────────
function XIcon() {
  return (
    <motion.a
      href="https://www.xdatagroup.io/"
      target="_blank"
      rel="noopener noreferrer"
      onClick={e => e.stopPropagation()}
      whileHover={{ scale: 1.12 }}
      transition={{ duration: 0.22, ease }}
      style={{ display: 'block' }}
    >
      <div className="relative shrink-0 size-[56px]">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 56 56">
          <path d={svgPaths.pe17df40} fill="black" />
          <path d={svgPaths.p3cdd5980} stroke="white" strokeOpacity="0.2" strokeWidth="1.27273" />
          <path d={svgPaths.p21ded700} fill="white" />
          <path d={svgPaths.p2449f100} fill="white" />
        </svg>
      </div>
    </motion.a>
  );
}

function MTSIcon() {
  return (
    <motion.a
      href="https://mws.ru/"
      target="_blank"
      rel="noopener noreferrer"
      onClick={e => e.stopPropagation()}
      whileHover={{ scale: 1.12 }}
      transition={{ duration: 0.22, ease }}
      style={{ display: 'block' }}
    >
      <div className="relative shrink-0 size-[56px]">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 56 56">
          <path d={svgPaths.pe17df40} fill="#FF0032" />
          <path d={svgPaths.p3cdd5980} stroke="white" strokeOpacity="0.2" strokeWidth="1.27273" />
          <path d={svgPaths.p2be22d00} fill="white" />
          <path d={svgPaths.p3bfa6e00} fill="white" />
          <path d={svgPaths.p24f90a80} fill="white" />
        </svg>
      </div>
    </motion.a>
  );
}

function GazpromSmallIcon() {
  return (
    <motion.a
      href="https://gid.ru/"
      target="_blank"
      rel="noopener noreferrer"
      onClick={e => e.stopPropagation()}
      whileHover={{ scale: 1.12 }}
      transition={{ duration: 0.22, ease }}
      style={{ display: 'block' }}
    >
      <div className="relative shrink-0 size-[56px]">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 56 56">
          <path d={svgPaths.pe17df40} fill="#3174F6" />
          <path d={svgPaths.p3cdd5980} stroke="white" strokeOpacity="0.2" strokeWidth="1.27273" />
          <path d={svgPaths.p24d1700} fill="white" fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </div>
    </motion.a>
  );
}

// ── Case logo components ──────────────────────────────────────────────────────

function GIDLogo() {
  return (
    <div className="h-[40px] overflow-clip relative shrink-0 w-[115px]">
      <div className="absolute inset-[0_65.71%_0.65%_0]">
        <div className="absolute inset-[-72.14%_-168.86%_-263.39%_-168.86%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 172.814 173.072">
            <g filter="url(#gid_home_f)">
              <path d={svgPaths.p1ed4c300} fill="url(#gid_home_g)" />
              <path d={svgPaths.p337f4200} stroke="white" strokeOpacity="0.15" strokeWidth="0.666667" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"
                height="173.072" id="gid_home_f" width="172.814" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="38" />
                <feGaussianBlur stdDeviation="33.3333" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix"
                  values="0 0 0 0 0.0196 0 0 0 0 0.0508 0 0 0 0 0.287 0 0 0 0.3 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="gid_shadow" />
                <feBlend in="SourceGraphic" in2="gid_shadow" mode="normal" result="shape" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="gid_home_g"
                x1="94.437" x2="71.037" y1="28.678" y2="68.328">
                <stop stopColor="#5E93FA" />
                <stop offset="1" stopColor="#3174F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute inset-[7.24%_75.82%_14.68%_8.04%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none"
          viewBox="0 0 18.5862 31.2299">
          <path clipRule="evenodd" d={svgPaths.p20fe1700} fill="white" fillRule="evenodd" />
        </svg>
      </div>
      <div className="absolute inset-[11.38%_0.24%_3.69%_43.21%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none"
          viewBox="0 0 65.11 33.9688">
          <path clipRule="evenodd" d={svgPaths.p15f0a980} fill="white" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

function NovebaLogo() {
  return (
    <div className="flex gap-[12px] items-center shrink-0">
      <div className="h-[40px] w-[40px] relative shrink-0">
        <img alt="" className="absolute inset-0 size-full object-cover pointer-events-none" src={imgNovebaIcon} />
      </div>
      <div className="h-[26px] w-[119px] relative shrink-0">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 119 25.7833">
          <path d={svgPaths.pd140fc0}   fill="white" />
          <path d={svgPaths.p21a29c00}  fill="white" />
          <path d={svgPaths.pbf59fc0}   fill="white" />
          <path d={svgPaths.p3ea7b3c0}  fill="white" />
          <path d={svgPaths.p212257f0}  fill="white" />
          <path d={svgPaths.pa865580}   fill="white" />
        </svg>
      </div>
    </div>
  );
}

function GazpromIDLogo() {
  return (
    <div className="flex gap-[12px] items-center shrink-0">
      <div className="relative shrink-0 size-[40px] overflow-hidden">
        <div className="absolute inset-[-71.7%_-167.52%_-263.53%_-167.04%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none"
            viewBox="0 0 173.826 174.091">
            <g filter="url(#gpid_home_f)">
              <path d={svgPaths.p7ab6900} fill="url(#gpid_home_g)" />
              <path d={svgPaths.p677cc00} stroke="white" strokeOpacity="0.15" strokeWidth="0.666667" />
            </g>
            <path clipRule="evenodd" d={svgPaths.p14da5f00} fill="white" fillRule="evenodd" />
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"
                height="174.091" id="gpid_home_f" width="173.826" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="38" />
                <feGaussianBlur stdDeviation="33.3333" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix"
                  values="0 0 0 0 0.0196 0 0 0 0 0.0508 0 0 0 0 0.287 0 0 0 0.3 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="gpid_shadow" />
                <feBlend in="SourceGraphic" in2="gpid_shadow" mode="normal" result="shape" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="gpid_home_g"
                x1="95.149" x2="71.149" y1="28.678" y2="69.345">
                <stop stopColor="#5E93FA" />
                <stop offset="1" stopColor="#3174F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">
        {'Газпром'} ID
      </p>
    </div>
  );
}

function ZenitHomeLogo() {
  return (
    <div className="flex gap-[12px] items-center shrink-0">
      <div className="bg-[#0090ee] rounded-[10.667px] shadow-[0px_5px_1.4px_rgba(0,0,0,0),0px_3.2px_1.3px_rgba(0,0,0,0.01),0px_1.8px_1.1px_rgba(0,0,0,0.03),0px_0.8px_0.8px_rgba(0,0,0,0.05),0px_0.2px_0.4px_rgba(0,0,0,0.06)] shrink-0 size-[40px] relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip size-[29.333px]">
          <div className="absolute inset-[15.63%_0_18.75%_0]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.3333 19.25">
              <g clipPath="url(#zenit_home_clip)">
                <path d={zenitPaths.p17abfc00} fill="white" />
                <path d={zenitPaths.p1f644800} fill="white" />
                <path d={zenitPaths.p3fbdca00} fill="white" />
                <path d={zenitPaths.p4d0b780}  fill="white" />
                <path d={zenitPaths.p33911680} fill="white" />
                <path d={zenitPaths.p2ba05d80} fill="#FFCC00" />
                <path d={zenitPaths.pddc8e00}  fill="#FFCC00" />
              </g>
              <defs>
                <clipPath id="zenit_home_clip">
                  <rect fill="white" height="19.25" width="29.3333" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">
        Зенит
      </p>
    </div>
  );
}

// ── MTS Cloud home logo ────────────────────────────────────────────────────────
function MTSCloudLogo() {
  return (
    <div className="flex gap-[12px] items-center shrink-0">
      <div className="relative shrink-0 size-[40px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <g>
            <path d={mtsSvgPaths.p25c71680} fill="#FF0032" />
            <path d={mtsSvgPaths.p269bdf00} stroke="white" strokeOpacity="0.2" strokeWidth="0.909091" />
            <path d={mtsSvgPaths.p2389c480} fill="white" />
            <path d={mtsSvgPaths.p32d41bc0} fill="white" />
            <path d={mtsSvgPaths.p1e1c7800} fill="white" />
          </g>
        </svg>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">
        MTS Cloud
      </p>
    </div>
  );
}

// ── GID Hub home logo ─────────────────────────────────────────────────────────
function GIDHubLogo() {
  return (
    <div className="flex gap-[12px] items-center shrink-0">
      <div className="bg-white relative rounded-[10.667px] shrink-0 size-[40px]">
        <div className="absolute left-[6.34px] top-[6.34px] size-[27.317px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.3171 27.3171">
            <g clipPath="url(#gidhub_home_clip)">
              <path clipRule="evenodd" d={gidHubSvg.p3349e600} fill="#1C1C1E" fillRule="evenodd" />
            </g>
            <defs>
              <clipPath id="gidhub_home_clip">
                <rect fill="white" height="27.3171" width="27.3171" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic text-[24px] sm:text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">
        ГИД Hub
      </p>
    </div>
  );
}

// ── GID Hub Case Card — desktop platform (no phone, floating screen) ──────────
function GIDHubCard() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const imageBoxRef = useRef<HTMLDivElement>(null);
  const imageInView = useInView(imageBoxRef, { amount: 0.55, once: false });
  const active = hovered || (isTouch && imageInView);
  const trans = { duration: 0.55, ease };

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.85, ease: spring }}
      className="bg-[#0b0b0a] relative rounded-[24px] w-full cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigate('/gidhub')}
      style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#242423' }}
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-[60px] items-start p-5 sm:p-6 lg:p-[24px]">

        {/* ── Left side ── */}
        <div className="flex flex-col gap-6 lg:gap-0 lg:justify-between flex-1 w-full lg:self-stretch">
          <GIDHubLogo />

          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic text-[16px] sm:text-[18px] lg:text-[20px] text-white tracking-[-0.2px] max-w-[560px]">
            {fixText('ГИД Hub — маркетплейс API и виджетов для цифровых сервисов Газпрома, позволяющий подключать готовые сервисы, управлять интеграциями и создавать собственные решения через единый интерфейс.')}
          </p>

          <StatsGrid stats={[
            ['320+',  'уникальных экранов'],
            ['40+',   'API и сервисов в каталоге'],
            ['100+',  'UI компонентов'],
            ['50+',   'интеграционных сценариев'],
          ]} />

          <motion.div
            className="bg-[#181716] flex h-[52px] sm:h-[60px] items-center justify-center px-6 rounded-[1000px] shrink-0 self-start mt-2 lg:mt-0"
            animate={{ backgroundColor: active ? '#222120' : '#181716' }}
            transition={trans}
            style={{ border: '1px solid #2e2d2d' }}
          >
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] whitespace-nowrap">
              Смотреть кейс
            </p>
          </motion.div>
        </div>

        {/* ── Right side: desktop screenshot floating over gradient ── */}
        <div
          ref={imageBoxRef}
          className="relative w-full lg:flex-1 rounded-[8px] overflow-hidden shrink-0"
          style={{ aspectRatio: '584 / 498' }}
        >
          {/* Background: static image fallback + video on desktop */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: active ? 1.05 : 1 }}
            transition={trans}
            style={{ transformOrigin: 'center center' }}
          >
            <img
              alt=""
              src={imgGIDHubBg}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            {GIDHUB_VIDEO_SRC && !isTouch && (
              <video
                src={GIDHUB_VIDEO_SRC}
                autoPlay muted loop playsInline preload="auto"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            )}
          </motion.div>

          {/* Tablet mockup — protrudes from bottom, same pattern as MTS */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '40.7%',
              width: '90.4%',
              height: '81.3%',
              transform: 'translateX(-50%)',
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ scale: active ? 1.04 : 1, y: active ? -20 : 0 }}
              transition={trans}
              style={{ transformOrigin: 'center bottom' }}
            >
              <img
                alt=""
                src={imgGIDHubTablet}
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              />
            </motion.div>
          </div>

          {/* Border overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-[8px]"
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ── MTS Case Card — custom right side (hardware + tablet) ──────────────────────
function MTSCaseCard() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const imageBoxRef = useRef<HTMLDivElement>(null);
  const imageInView = useInView(imageBoxRef, { amount: 0.55, once: false });
  const active = hovered || (isTouch && imageInView);
  const trans = { duration: 0.55, ease };

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.85, ease: spring }}
      className="bg-[#0b0b0a] relative rounded-[24px] w-full cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigate('/MTS')}
      style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#242423' }}
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-[60px] items-start p-5 sm:p-6 lg:p-[24px]">

        {/* ── Left side ── */}
        <div className="flex flex-col gap-6 lg:gap-0 lg:justify-between flex-1 w-full lg:self-stretch">

          <MTSCloudLogo />

          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic text-[16px] sm:text-[18px] lg:text-[20px] text-white tracking-[-0.2px] max-w-[560px]">
            {fixText('MTS Cloud — облачная платформа MTS Web Services. Проектирование уравления облачной инфраструктурой: вычислительные ресурсы, хранилище, базы данных и AI-сервисы для бизнеса.')}
          </p>

          <StatsGrid stats={[
            ['63,8 млрд',  'выручка MTS Web Services'],
            ['40%',        'рост выручки MWS за год'],
            ['20+',        'облачных сервисов'],
            ['99,99%',     'SLA'],
          ]} />

          <motion.div
            className="bg-[#181716] flex h-[52px] sm:h-[60px] items-center justify-center px-6 rounded-[1000px] shrink-0 self-start mt-2 lg:mt-0"
            animate={{ backgroundColor: active ? '#222120' : '#181716' }}
            transition={trans}
            style={{ border: '1px solid #2e2d2d' }}
          >
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] whitespace-nowrap">
              Смотреть кейс
            </p>
          </motion.div>
        </div>

        {/* ── Right side: MTS hardware + tablet ── */}
        <div
          ref={imageBoxRef}
          className="relative w-full lg:flex-1 rounded-[8px] overflow-hidden shrink-0"
          style={{ aspectRatio: '584 / 498' }}
        >
          {/* Background: video (desktop) / gradient (mobile) */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: active ? 1.05 : 1 }}
            transition={trans}
            style={{ transformOrigin: 'center center' }}
          >
            {/* imgMTSMobileBg — always shown as fallback */}
            <img
              alt=""
              src={imgMTSMobileBg}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            {/* Video on top — desktop only, covers image once playing */}
            {!isTouch && (
              <video
                src={MTS_VIDEO_SRC}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            )}
          </motion.div>

          {/* Tablet image — centered over video, matching Figma layout */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '38.91%',
              width: '95.63%',
              height: '85.91%',
              transform: 'translateX(-50%)',
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ scale: active ? 1.04 : 1, y: active ? -20 : 0 }}
              transition={trans}
              style={{ transformOrigin: 'center bottom' }}
            >
              <img
                alt=""
                src={imgMTSTablet}
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              />
            </motion.div>
          </div>

          {/* Border overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-[8px]"
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ── Stat item ────────────────────────────────────────────────────────────────
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-[8px] flex-1 min-w-0">
      {/* Animated number */}
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic text-[24px] sm:text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">
        <AnimatedStatValue value={value} />
      </p>
      {/* Grey label — half line-height on mobile */}
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic text-[#868585] text-[14px] sm:text-[16px] tracking-[-0.16px] leading-[14px] sm:leading-[28px]">
        {fixText(label)}
      </p>
    </div>
  );
}

function StatsGrid({ stats }: { stats: [string, string][] }) {
  const rows: [string, string][][] = [];
  for (let i = 0; i < stats.length; i += 2) {
    rows.push(stats.slice(i, i + 2) as [string, string][]);
  }
  return (
    <div className="flex flex-col gap-[24px] w-full">
      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-[32px]">
          {row.map(([value, label], ci) => (
            <StatItem key={ci} value={value} label={label} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Individual Case Card ───────────────────────────────────────────────────────
interface CaseCardProps {
  logo: React.ReactNode;
  description: string;
  stats: [string, string][];
  route: string;
  bgImage: string;
  bgVideo?: string | null;
  phoneImage: string;
  phoneLeftPct: number;
  phoneTopPct: number;
  phoneDeltaY: number;
  badge?: React.ReactNode;
}

function CaseCard({
  logo, description, stats, route,
  bgImage, bgVideo,
  phoneImage,
  phoneLeftPct, phoneTopPct, phoneDeltaY,
  badge,
}: CaseCardProps) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force play when the video URL is set (React autoPlay isn't always reliable
  // when src changes dynamically or browser blocks autoplay on mount)
  useEffect(() => {
    if (!bgVideo || !videoRef.current) return;
    const vid = videoRef.current;
    vid.muted = true;
    const p = vid.play();
    if (p) p.catch(() => { /* autoplay blocked — ignore */ });
  }, [bgVideo]);

  // ── Mobile scroll-triggered animation ─────────────────────────────────────
  // On touch devices (no hover), fire the same animation when the image
  // scrolls to ~center of the viewport instead.
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const imageBoxRef = useRef<HTMLDivElement>(null);
  const imageInView = useInView(imageBoxRef, {
    amount: 0.55, // fires when >55% of the image box is visible ≈ centered
    once: false,
  });

  // On desktop: hover drives the animation.
  // On mobile: scroll-into-view drives the animation (stays "on" while centered).
  const active = hovered || (isTouch && imageInView);

  const trans = { duration: 0.55, ease };

  // Background expands in the SAME direction as the phone travels
  const bgOrigin = phoneDeltaY < 0 ? 'center bottom' : phoneDeltaY > 0 ? 'center top' : 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.85, ease: spring }}
      className="bg-[#0b0b0a] relative rounded-[24px] w-full cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigate(route)}
      style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#242423' }}
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-[60px] items-start p-5 sm:p-6 lg:p-[24px]">

        {/* ── Left side ── */}
        <div className="flex flex-col gap-6 lg:gap-0 lg:justify-between flex-1 w-full lg:self-stretch">

          {/* Logo + badge */}
          <div className="flex items-center justify-between w-full">
            <div>{logo}</div>
            {badge && <div>{badge}</div>}
          </div>

          {/* Description */}
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] max-w-[560px]">
            {fixText(description)}
          </p>

          {/* Stats */}
          <StatsGrid stats={stats} />

          {/* Button — always at bottom */}
          <motion.div
            className="bg-[#181716] flex h-[52px] sm:h-[60px] items-center justify-center px-6 rounded-[1000px] shrink-0 self-start mt-2 lg:mt-0"
            animate={{ backgroundColor: active ? '#222120' : '#181716' }}
            transition={trans}
            style={{ border: '1px solid #2e2d2d' }}
          >
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] whitespace-nowrap">
              Смотреть кейс
            </p>
          </motion.div>
        </div>

        {/* ── Right side: image box ── */}
        <div
          ref={imageBoxRef}
          className="relative w-full lg:flex-1 rounded-[8px] overflow-hidden shrink-0"
          style={{ aspectRatio: '584 / 498' }}
        >
          {/* Background */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: active ? 1.05 : 1 }}
            transition={trans}
            style={{ transformOrigin: bgOrigin }}
          >
            {/* bgImage — always shown as fallback (no black screen while video loads) */}
            <img
              alt=""
              src={bgImage}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            {/* Video on top — desktop only, covers image once playing */}
            {bgVideo && !isTouch && (
              <video
                ref={videoRef}
                src={bgVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onError={(e) => console.log('CaseCard video error:', (e.target as HTMLVideoElement).error)}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            )}
          </motion.div>

          {/* Phone */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: active ? 1.05 : 1,
                y: active ? phoneDeltaY : 0,
              }}
              transition={trans}
              style={{
                position: 'absolute',
                left: `${phoneLeftPct}%`,
                top: `${phoneTopPct}%`,
                width: '51.37%',
                aspectRatio: '300 / 613',
                transformOrigin: 'top center',
              }}
            >
              <img
                alt=""
                src={phoneImage}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              />
            </motion.div>
          </div>

          {/* Border overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-[8px]"
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ── In-progress badge ────────────────────────────────────────────────────────
function InProgressBadge() {
  return (
    <div className="bg-[#181716] flex h-[36px] sm:h-[40px] items-center justify-center px-[14px] rounded-[1000px] shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[#868585] text-[14px] sm:text-[16px] tracking-[-0.16px] whitespace-nowrap">
        В разработке
      </p>
    </div>
  );
}

// ── GazpromID Case Card (с видео-фоном) ──────────────────────────────────────
function GazpromIDCard() {
  return (
    <CaseCard
      logo={<GazpromIDLogo />}
      description="Газпром ID — инфраструктурная SSO-платформа, обеспечивающая единый вход в сервисы экосистемы и партнёрские продукты."
      stats={[
        ['50+ млн',  'пользователей в месяц'],
        ['4 млн',    'авторизаций в день'],
        ['150+',     'Подключенных партнеров'],
        ['89%',      'Конверсия в авторизацию'],
      ]}
      route="/GazpromID"
      bgImage={imgGazpromBg}
      bgVideo={GAZPROM_VIDEO_SRC}
      phoneImage={imgGazpromPhone}
      phoneLeftPct={24.14}
      phoneTopPct={23.68}
      phoneDeltaY={-50}
    />
  );
}

// ── Telegram icon ─────────────────────────────────────────────────────────────
function TelegramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M9.78 18.65L10.06 14.42L17.74 7.5C18.08 7.19 17.67 7.04 17.22 7.31L7.74 13.3L3.64 12C2.76 11.75 2.75 11.14 3.84 10.7L19.81 4.54C20.54 4.21 21.24 4.72 20.96 5.84L18.24 18.65C18.05 19.56 17.5 19.78 16.74 19.36L12.6 16.3L10.61 18.23C10.38 18.46 10.19 18.65 9.78 18.65Z" />
    </svg>
  );
}

// ── Main export ────────────────────────────────────────────────────────────
export function HomeContent() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">

      {/* ── Fixed Telegram button — top right, always visible ── */}
      <motion.a
        href="https://t.me/deniskolosov"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 no-underline"
        style={{ top: 30, right: 'max(16px, calc(50% - 637px))' }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease }}
      >
        <motion.div
          className="flex items-center justify-center size-[48px] sm:size-[52px] rounded-full cursor-pointer"
          style={{
            backgroundColor: 'rgba(18, 17, 16, 0.55)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
          whileHover={{ backgroundColor: 'rgba(38, 37, 36, 0.72)', scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.22 }}
        >
          <TelegramIcon />
        </motion.div>
      </motion.a>

      <div className="mx-auto w-full max-w-[1275px] px-4 sm:px-8 xl:px-0 flex flex-col gap-[60px] sm:gap-[78px] pt-[34px] pb-[80px]">

        {/* ═══════════════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-[48px] sm:gap-[76px] w-full max-w-[649px]">

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0, ease }}
            className="relative shrink-0 size-[56px]"
          >
            <img
              alt="Денис"
              src={imgAvatar}
              className="absolute inset-0 size-full object-cover pointer-events-none"
              style={{ borderRadius: '50%' }}
            />
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.1, ease }}
            className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] whitespace-pre-wrap"
          >
            <p className="mb-[28px]">
              {fixText('Привет, я Денис — продуктовый дизайнер.')}
            </p>
            <p>
              {fixText('За последние 7 лет я работал арт-директором в студии KDM, проектировал сложные интерфейсы в MTS Cloud, участвовал в разработке финтех-продуктов для международных рынков, а сейчас руковожу направлением продуктового дизайна и развитием цифровых сервисов в Газпроме, помогая строить новую цифровую экосистему.')}
            </p>
          </motion.div>

          {/* Social icons — 3 icons only (telegram moved to fixed top-right) */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.22, ease }}
            className="flex gap-[24px] items-center"
          >
            <XIcon />
            <MTSIcon />
            <GazpromSmallIcon />
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            CASES
        ════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-[40px] sm:gap-[60px] w-full">

          {/* ── Зенит ── */}
          <CaseCard
            logo={<ZenitHomeLogo />}
            description="Мобильное приложение футбольного клуба «Зенит» — цифровая платформа для болельщиков, объединяющая новости клуба, матчи, статистику и медиаконтент в одном месте."
            stats={[
              ['320+',      'Уникальных экранов'],
              ['120+',      'UI-компонентов дизайн-системы'],
              ['20+',       'Сервисов для болельщиков'],
              ['80 часов',  'Интервью с респондентами'],
            ]}
            route="/zenit"
            bgImage={imgZenitBg}
            bgVideo={ZENIT_VIDEO_SRC}
            phoneImage={imgZenitPhone}
            phoneLeftPct={24.32}
            phoneTopPct={18.45}
            phoneDeltaY={-50}
            badge={<InProgressBadge />}
          />

          {/* ── Noveba ── */}
          <CaseCard
            logo={<NovebaLogo />}
            description="Noveba — британский финтех-стартап, предоставляет e-money счета, платежные карты, SEPA-переводы и Banking-as-a-Service инфраструктуру для частных пользователей и бизнеса."
            stats={[
              ['85%',          'конверсия в открытие счета'],
              ['65 000',  'активных пользователей в месяц'],
              ['€320 млн',     'объём транзакций в год'],
              ['1.8 млн',      'транзакций в месяц'],
            ]}
            route="/noveba"
            bgImage={imgNovebaBg}
            bgVideo={NOVEBA_VIDEO_SRC}
            phoneImage={imgNovebaPhone}
            phoneLeftPct={25.89}
            phoneTopPct={25.91}
            phoneDeltaY={-50}
          />

          {/* ── MTS Cloud ── */}
          <MTSCaseCard />

          {/* ── Газпром ID ── */}
          <GazpromIDCard />

          {/* ── ГИД ── */}
          <CaseCard
            logo={<GIDLogo />}
            description="Цифровая платформа ГИД — единое пространство взаимодействи сотрудников ГК Газпром, объединяюще 30+ сервисов, коммуникации, обучение и партнёрские предложения для работы и повседневных задач."
            stats={[
              ['420 000', 'сотрудников подключено'],
              ['53 000',  'пользователей в месяц'],
              ['30+',          'Сервисов'],
              ['68%',          'NPS приложения'],
            ]}
            route="/GID"
            bgImage={imgGIDBg}
            bgVideo={GID_VIDEO_SRC}
            phoneImage={imgGIDPhone}
            phoneLeftPct={24.23}
            phoneTopPct={23.69}
            phoneDeltaY={-50}
          />

          {/* ── GID Hub ── */}
          <GIDHubCard />

        </div>
      </div>
    </div>
  );
}