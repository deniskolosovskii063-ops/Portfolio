/*
 * NovebaContent — responsive layout for the Noveba fintech case
 * Follows the same design patterns as GazpromID (Frame56) and GIDContent:
 *   • fadeUp / fadeScale whileInView variants
 *   • animate (immediate) for hero
 *   • mx-auto sm:w-[1444px] container
 *   • Phone pairs adaptive: 2-col on mobile, row with 100px gap on desktop
 */

import { motion } from 'motion/react';
import { fixText } from '../utils/fixText';

// ── Images ────────────────────────────────────────────────────────────────────
import imgVector            from 'figma:asset/aaa676d0d52401bf37814cf59bcb8e640162fb92.png';
import imgNovebaIcon        from 'figma:asset/fc25e4f5f7605daab8e01e3bdb49ef2c6a1d7cf8.png';
import imgGroup794          from 'figma:asset/f0a5a169b3b6645ad2104b1123241b145dd4a1ff.png';
import imgFrame013          from 'figma:asset/46d8cf6e29c4638044d3589a65b77155e536c559.png';
import imgPhone31           from 'figma:asset/a3967af86e6aebbb30bf3d1eb415f3eb822aed75.png';
import imgPhone11           from 'figma:asset/ea4ca41b5b6f96553b1e8fe4cee1a3febb7336e1.png';
import imgGroup793          from 'figma:asset/83fa246ecf6ba4e0a16e69dd93edd72d9bac84ea.png';
import imgPhone1            from 'figma:asset/72d065f8848495759ea8824b2d89d8c8f0704b66.png';
import imgPhone21           from 'figma:asset/9c653bf665fa196c05ac7760918e48222065bdae.png';
import imgGroup798bg        from 'figma:asset/bd0e56bf6e9d68376cc46189a29fc1da338d15a3.png';
import imgPhone42           from 'figma:asset/709559c3867f64ae97fdca04adceaa5db15ebf11.png';
import imgPhone14           from 'figma:asset/3fd12a56b4a3168f2bd65408167228bafc426a7c.png';
import imgPhone33           from 'figma:asset/85239427b6dbe969f2e520a588f438385dcd1708.png';
import imgPhone4            from 'figma:asset/cd508c92d100afca7d7e6acb61413601dadc5f94.png';
import imgPhone23           from 'figma:asset/22bd0fa3c73d90e3686510bfb4cd9eae020e6296.png';
import imgFrame998          from 'figma:asset/1b475722cf5220d3b3c6e2fe10085721b214a367.png';
import imgFrame929          from 'figma:asset/1e26318f2ca2d72f9419d1c7b7419c2e0079564e.png';
import imgFrame007          from 'figma:asset/40889ef8e7d9cd74cd2b43bad08a1316d2619bfc.png';
import imgPhone5            from 'figma:asset/a89b705fc7b1c295c6ff04db6638fdfef9952ca7.png';
import imgPhone15           from 'figma:asset/1faff870058740fa63e3182b40630b6db606b13c.png';
import imgFrame008          from 'figma:asset/8f0db03076a75a2e05b34e9e310bd536412b82f2.png';
import imgGroup801bg        from 'figma:asset/4ec7aba99419cd6d448575a03ec3e5f365155f8b.png';
import imgFrame507          from 'figma:asset/381e36a352a3b545560b15e68554b8c011d6a07b.png';
import imgFrame474          from 'figma:asset/789772cfea8b75250178b6a652557fd98d894a29.png';

// ── Shared animation presets ──────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 48,  filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0,   filter: 'blur(0px)'  },
} as const;

const fadeScale = {
  hidden:  { opacity: 0, y: 56, scale: 0.965 },
  visible: { opacity: 1, y: 0,  scale: 1     },
} as const;

const smoothEase = [0.25, 0.46, 0.45, 0.94] as const;
const springEase = [0.22, 1,    0.36, 1    ] as const;

// ── Logo mark ─────────────────────────────────────────────────────────────────
function NovebaLogo() {
  return (
    <div className="flex gap-[12px] items-center shrink-0">
      {/* Brand mark: new icon from attached image */}
      <img
        src={imgNovebaIcon}
        alt=""
        className="shrink-0 pointer-events-none"
        style={{ width: 40, height: 40, borderRadius: '10.714px' }}
      />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic text-[24px] sm:text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">
        Noveba
      </p>
    </div>
  );
}

// ── Reusable image block (whileInView fade-scale) ─────────────────────────────
function FadeImage({
  src,
  ar,
  alt = '',
  maxW,
  className = '',
  delay = 0,
  natural = false,
}: {
  src: string;
  ar: string;
  alt?: string;
  maxW?: number;
  className?: string;
  delay?: number;
  natural?: boolean;
}) {
  return (
    <motion.div
      className={`relative w-full overflow-hidden ${className}`}
      style={maxW ? { maxWidth: maxW } : undefined}
      variants={fadeScale}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 1.05, delay, ease: springEase }}
    >
      {natural ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-auto block pointer-events-none"
        />
      ) : (
        <div style={{ aspectRatio: ar, position: 'relative', width: '100%' }}>
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        </div>
      )}
    </motion.div>
  );
}

// ── Phone pair (2 phones side by side) ────────────────────────────────────────
// Mobile: 2-col grid (phones side by side, smaller).
// Desktop: flex row with 100px gap, each phone capped at 550px.
function PhonePair({
  src1,
  src2,
  alignItems = 'items-start',
}: {
  src1: string;
  src2: string;
  alignItems?: string;
}) {
  return (
    <div className={`flex gap-3 sm:gap-[100px] justify-center ${alignItems} w-full`}>
      <motion.div
        className="relative min-w-0"
        style={{ flex: '1 1 0', maxWidth: 'clamp(140px, 38.09%, 550px)', aspectRatio: '550/1124' }}
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 1.0, delay: 0, ease: springEase }}
      >
        <img src={src1} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      </motion.div>
      <motion.div
        className="relative min-w-0"
        style={{ flex: '1 1 0', maxWidth: 'clamp(140px, 38.09%, 550px)', aspectRatio: '550/1124' }}
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 1.0, delay: 0.14, ease: springEase }}
      >
        <img src={src2} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      </motion.div>
    </div>
  );
}

// ── Text block (whileInView fade-up, max 568px wide) ─────────────────────────
function TextBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px] whitespace-pre-wrap"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: smoothEase }}
    >
      {children}
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function NovebaContent() {
  return (
    <div className="relative mx-auto flex flex-col gap-[60px] sm:gap-[120px] items-center py-8 sm:py-[60px] w-full px-4 sm:px-0 sm:w-[1444px] overflow-x-clip">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — logo + description
      ════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-[48px] sm:gap-[60px] items-start relative z-10 w-full sm:w-[568px]">

        {/* Logo row */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.25, ease: smoothEase }}
        >
          <NovebaLogo />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.0, delay: 0.45, ease: smoothEase }}
          className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full whitespace-pre-wrap"
        >
          <p className="mb-0">
            {fixText('Noveba — финтех-платформа электронных платежей, предоставляющая e-money счета, платежные карты и инфраструктуру для управления финансовыми операциями в Европе.')}
          </p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">
            {fixText('Платформа позволяет частным пользователям и бизнесу выполнять международные переводы, управлять счетами и выпускать платежные карты через единую цифровую банковскую инфраструктуру.')}
          </p>
          <p>
            <br aria-hidden="true" />
            {fixText('Задача заключалась в проектировании удобной и масштабируемой платформы управления платежами и финансовыми операциями, включая мобильное приложение, личный кабинет пользователя и разработку айдентики продукта.')}
          </p>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          HERO WIDE IMAGE — Group 2136140794 1 (4096:2476 ≈ 1.655:1)
      ════════════════════════════════════════════════════════════════════ */}
      <FadeImage src={imgGroup794} ar="1254/660" natural />

      {/* ════════════════════════════════════════════════════════════════════
          PORTRAIT IMAGE — Frame 2147223013 1 (3562:4096 ≈ 0.870:1)
          Capped to 568px on desktop to not be too tall
      ════════════════════════════════════════════════════════════════════ */}
      <FadeImage src={imgFrame013} ar="3562/4096" natural />

      {/* ════════════════════════════════════════════════════════════════════
          TEXT — main screen
      ════════════════════════════════════════════════════════════════════ */}
      <TextBlock>
        {fixText('Главный экран спроектирован как центр управления финансами и разделён на два ключевых сценария — карты и счета. ')}
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        {fixText('Пользователь сразу видит баланс, активные карты, историю операций и быстрые действия: переводы, пополнение и международные платежи, что сокращает путь до основных операций до одного-двух кликов.')}
      </TextBlock>

      {/* ════════════════════════════════════════════════════════════════════
          PHONE PAIR 1 — iPhones 31 + 11 (Frame6)
      ════════════════════════════════════════════════════════════════════ */}
      <PhonePair src1={imgPhone31} src2={imgPhone11} alignItems="items-center" />

      {/* ════════════════════════════════════════════════════════════════════
          TEXT — identity
      ════════════════════════════════════════════════════════════════════ */}
      <TextBlock>
        {fixText('Для продукта была разработана айдентика, отражающая идею простого и прозрачного управления финансами. ')}
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        {fixText('Визуальный стиль построен на минималистичной типографике, технологичных градиентах и лаконичной графике, что формирует современный финтех.')}
      </TextBlock>

      {/* ════════════════════════════════════════════════════════════════════
          WIDE IMAGE — Group 2136140793 2 (3600:1934 ≈ 1.861:1)
      ════════════════════════════════════════════════════════════════════ */}
      <FadeImage src={imgGroup793} ar="3600/1934" />

      {/* ════════════════════════════════════════════════════════════════════
          PHONE PAIR 2 — iPhones 1 + 21 (Frame7)
      ════════════════════════════════════════════════════════════════════ */}
      <PhonePair src1={imgPhone1} src2={imgPhone21} />

      {/* ════════════════════════════════════════════════════════════════════
          TEXT — visual communication / brand photo style
      ════════════════════════════════════════════════════════════════════ */}
      <TextBlock>
        {fixText('Визуальная коммуникация бренда ориентирована на продвинутую digital-аудиторию и пользователей финтех-сервисов. ')}
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        {fixText('В фотостиле используются динамичные ракурсы, городская архитектура и нестандартные перспективы, что подчёркивает технологичность продукта и формирует ощущение современного, уверенного и прогрессивного бренда.')}
      </TextBlock>

      {/* ════════════════════════════════════════════════════════════════════
          COMPLEX GROUP 3 — Group 2136140798 1 (bg) + 2 phones overlaid
          Container proportions (1444 × 2867.846):
            bg:      top=0%,     height=74.69%
            phone42: left=8.45%, top=60.80%, w=38.09%, h=39.20%
            phone14: left=53.46%, same top/size
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative w-full overflow-visible"
        style={{ aspectRatio: '1444/2867.846' }}
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.04 }}
        transition={{ duration: 1.2, ease: springEase }}
      >
        {/* Background */}
        <img
          src={imgGroup798bg}
          alt=""
          className="absolute pointer-events-none"
          style={{ left: 0, top: 0, width: '100%', height: '74.69%', objectFit: 'cover' }}
        />
        {/* Phone 42 */}
        <div
          className="absolute"
          style={{ left: '8.45%', top: '60.80%', width: '38.09%', aspectRatio: '550/1124' }}
        >
          <img src={imgPhone42} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        </div>
        {/* Phone 14 */}
        <div
          className="absolute"
          style={{ left: '53.46%', top: '60.80%', width: '38.09%', aspectRatio: '550/1124' }}
        >
          <img src={imgPhone14} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════════
          TEXT — design system
      ════════════════════════════════════════════════════════════════════ */}
      <TextBlock>
        {fixText('Была разработана полноценная дизайн-система, внедрённая во все продукты платформы. ')}
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        {fixText('Она обеспечивает единый визуальный язык интерфейсов и поддерживает как светлую, так и тёмную темы.')}
      </TextBlock>

      {/* ════════════════════════════════════════════════════════════════════
          PHONE PAIR 3 — iPhones 33 + 4 (Frame9)
      ════════════════════════════════════════════════════════════════════ */}
      <PhonePair src1={imgPhone33} src2={imgPhone4} alignItems="items-center" />

      {/* ════════════════════════════════════════════════════════════════════
          SINGLE PHONE — iPhone 17 Pro-2 3 (centered)
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative"
        style={{ width: 'clamp(200px, 100%, 550px)', aspectRatio: '550/1124' }}
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1.0, ease: springEase }}
      >
        <img src={imgPhone23} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════════
          WIDE BANNER — Frame 2147222998 1 (1137:486 ≈ 2.339:1)
      ════════════════════════════════════════════════════════════════════ */}
      <FadeImage src={imgFrame998} ar="1137/486" className="sm:!max-w-[1138px]" />

      {/* ════════════════════════════════════════════════════════════════════
          TEXT — web personal cabinet
      ════════════════════════════════════════════════════════════════════ */}
      <TextBlock>
        {fixText('Для пользователей был разработан веб-личный кабинет, позволяющий управлять счетами, картами и финансовыми операциями через браузер. ')}
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        {fixText('Интерфейс повторяет логику мобильного приложения: на главном экране отображаются балансы, быстрые действия для платежей и история транзакций, что обеспечивает единый и удобный опыт работы с платформой на разных устройствах.')}
      </TextBlock>

      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP SCREENS — Frame 2147222929 1 (1137.834:719.895 ≈ 1.58:1)
      ════════════════════════════════════════════════════════════════════ */}
      <FadeImage src={imgFrame929} ar="1137.834/719.895" className="sm:!max-w-[1138px]" />
      <FadeImage src={imgFrame007} ar="1137.834/719.895" className="sm:!max-w-[1138px]" delay={0.08} />

      {/* ════════════════════════════════════════════════════════════════════
          PHONE PAIR 4 — iPhones 5 + 15 (Frame10)
      ════════════════════════════════════════════════════════════════════ */}
      <PhonePair src1={imgPhone5} src2={imgPhone15} alignItems="items-center" />

      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP SCREEN — Frame 2147223008 1 (same AR)
      ════════════════════════════════════════════════════════════════════ */}
      <FadeImage src={imgFrame008} ar="1137.834/719.895" className="sm:!max-w-[1138px]" />

      {/* ════════════════════════════════════════════════════════════════════
          COMPLEX GROUP 4 — Group 2136140801 1 (bg) + Frame507 + Frame474
          Container: 1444 × 2492.378
            bg:      left=0,      top=9.84%,  w=100%,    h=90.16%
            Frame474: left=9.28%, top=0,      w=45.41%,  h=18.04%
            Frame507: left=56.89%, top=0.02%, w=33.83%,  h=27.39%
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative w-full overflow-visible"
        style={{ aspectRatio: '1444/2492.378' }}
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.04 }}
        transition={{ duration: 1.2, ease: springEase }}
      >
        {/* Background (starts below the design frame cards) */}
        <div
          className="absolute"
          style={{ left: 0, top: '9.84%', width: '100%', height: '90.16%' }}
        >
          <img src={imgGroup801bg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        </div>
        {/* Frame 2087327474 — left card (dark screen) */}
        <div
          className="absolute"
          style={{ left: '9.28%', top: 0, width: '45.41%', aspectRatio: '655.65/449.76' }}
        >
          <img src={imgFrame474} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        </div>
        {/* Frame 2087325507 — right card (light screen) */}
        <div
          className="absolute"
          style={{ left: '56.89%', top: '0.02%', width: '33.83%', aspectRatio: '488.529/682.739' }}
        >
          <img src={imgFrame507} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        </div>
      </motion.div>

    </div>
  );
}