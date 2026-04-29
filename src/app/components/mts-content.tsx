/*
 * MTSContent — responsive layout for the MTS Web Services [Cloud] case
 * Follows the same design patterns as other cases:
 *   • fadeUp / fadeScale whileInView variants
 *   • animate (immediate) for hero
 *   • mx-auto sm:w-[1444px] container
 */

import { motion } from 'motion/react';
import { fixText } from '../utils/fixText';
import svgPaths from '../../imports/svg-4hd525fgng';
import { CaseStatsGrid } from './case-stats';

// ── Images ────────────────────────────────────────────────────────────────────
import imgScreen01 from 'figma:asset/4becd37c4877176b60ae671d73659d94e2a7f992.png';
import imgScreen02 from 'figma:asset/10ad1fa710b29b909003a179fc901d9225805cfe.png';
import imgScreen03 from 'figma:asset/4aad801d92ec48b131f2c0db1785e02086f28e1a.png';
import imgScreen04 from 'figma:asset/927a5ee7fc629b27635663f81bc409ccce095282.png';
import imgScreen05 from 'figma:asset/d89a24611e944dc38e15bda908644bbe3c0ae23e.png';
import imgScreen06 from 'figma:asset/60d8e7f9fa583d7f04d95d53fa9d0d9206549fcf.png';
import imgScreen07 from 'figma:asset/abfc3367ded30ff27b8e46c5a8d546afc3b02915.png';
import imgScreen08 from 'figma:asset/adb8df09a88a0387767bf7b6588b3ad11c9808ac.png';
import imgScreen09 from 'figma:asset/0206981a6c7d2b153216ce739293c0bfabbc3010.png';
import imgScreen10 from 'figma:asset/975737d90ac4661b00303d490b231b2574fba9ef.png';
import imgScreen11 from 'figma:asset/e9a09f99ab883613db202a8ea3c34164a2da17e6.png';
import imgScreen12 from 'figma:asset/de6f5923b705ef8f4857a29c21a5c6e5c133dc43.png';
import imgScreen13 from 'figma:asset/a65d5b58447e9baa03d9f034cf3c7ae727f2734e.png';
import imgScreen14 from 'figma:asset/db7045b90c70549f530113a4626665819615bc57.png';
import imgScreen15 from 'figma:asset/bdfc6ee7291b266a5d19aa77b1eab2a25e7cb14f.png';
import imgScreen16 from 'figma:asset/cf615c68ae73016da41278b8bd8eb5ed94b2b4d3.png';
import imgScreen17 from 'figma:asset/9930516db6d32c8f4b24274ffb0f17910d90bcfe.png';

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

// ── MTS Logo (red square + MTS lettering) ─────────────────────────────────────
function MTSLogo() {
  return (
    <div className="flex gap-[12px] items-center shrink-0">
      {/* MTS brand mark — red rounded square with T M S letters */}
      <div className="relative shrink-0 size-[40px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <g>
            <path d={svgPaths.p25c71680} fill="#FF0032" />
            <path d={svgPaths.p269bdf00} stroke="white" strokeOpacity="0.2" strokeWidth="0.909091" />
            <path d={svgPaths.p2389c480} fill="white" />
            <path d={svgPaths.p32d41bc0} fill="white" />
            <path d={svgPaths.p1e1c7800} fill="white" />
          </g>
        </svg>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic text-[24px] sm:text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">
        MTS Cloud
      </p>
    </div>
  );
}

// ── Reusable fade-scale image block ───────────────────────────────────────────
function FadeImage({
  src,
  alt = '',
  delay = 0,
  rounded = false,
}: {
  src: string;
  alt?: string;
  delay?: number;
  rounded?: boolean;
}) {
  return (
    <div className="w-full px-4 sm:px-8">
      <motion.div
        className={`relative w-full overflow-hidden ${rounded ? 'rounded-[28px] sm:rounded-[56px]' : ''}`}
        style={{ aspectRatio: '1313/828' }}
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 1.05, delay, ease: springEase }}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {rounded && (
          <div
            aria-hidden="true"
            className="absolute inset-[-1px] rounded-[29px] sm:rounded-[57px]"
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
          />
        )}
      </motion.div>
    </div>
  );
}

// ── Text block ────────────────────────────────────────────────────────────────
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
export function MTSContent() {
  return (
    <div className="relative mx-auto flex flex-col gap-[60px] sm:gap-[120px] items-center py-8 sm:py-[60px] w-full px-4 sm:px-0 sm:w-[1444px] overflow-x-clip">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — logo + description + metrics
      ════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-[48px] sm:gap-[60px] items-start relative z-10 w-full sm:w-[568px]">

        {/* Logo row */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.25, ease: smoothEase }}
        >
          <MTSLogo />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.0, delay: 0.45, ease: smoothEase }}
          className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full whitespace-pre-wrap"
        >
          <p className="mb-0">
            {fixText('MTS Web Services (MWS) — технологическое подразделение МТС, создающее облачные платформы, AI-сервисы и инструменты для разработки цифровых продуктов бизнеса. Платформа объединяет инфраструктурные сервисы, работу с данными, инструменты разработки и решения для построения масштабируемых цифровых систем.')}
          </p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">
            {fixText('Задача проекта заключалась не только в проектировании интерфейсов облачной платформы, но и в создании удобной системы управления инфраструктурой для разработчиков и бизнес-команд.')}
          </p>
        </motion.div>

        {/* Metrics grid — GID / GazpromID style */}
        <motion.div
          className="flex flex-col gap-[24px] sm:gap-[32px] w-full"
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 1.0, ease: springEase }}
        >
          <CaseStatsGrid stats={[
            { num: '63,8 млрд', label: 'выручка MTS Web Services' },
            { num: '40%',       label: 'рост выручки MWS за год' },
            { num: '20+',       label: 'облачных сервисов' },
            { num: '99,99%',    label: 'SLA' },
          ]} />
        </motion.div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SCREENS — группа 1: главный дашборд и обзор платформы
      ════════════════════════════════════════════════════════════════════ */}
      <FadeImage src={imgScreen01} />
      <FadeImage src={imgScreen02} delay={0.04} />

      {/* ════════════════════════════════════════════════════════════════════
          TEXT — облачная инфраструктура
      ════════════════════════════════════════════════════════════════════ */}
      <TextBlock>
        {fixText('Главный интерфейс платформы спроектирован как единая точка управления облачной инфраструктурой. Пользователь видит сводку по всем активным ресурсам, статус сервисов и ключевые метрики прямо на стартовом экране.')}
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        {fixText('Структура навигации разбита на функциональные блоки: вычислительные ресурсы, хранилище, сеть, базы данных и AI-сервисы — это позволяет быстро находить нужный инструмент в разветвлённой экосистеме продуктов.')}
      </TextBlock>

      {/* ════════════════════════════════════════════════════════════════════
          SCREENS — группа 2: управление вычислительными ресурсами
      ════════════════════════════════════════════════════════════════════ */}
      <FadeImage src={imgScreen03} />
      <FadeImage src={imgScreen04} delay={0.04} />
      <FadeImage src={imgScreen05} />

      {/* ════════════════════════════════════════════════════════════════════
          TEXT — управление сервисами
      ════════════════════════════════════════════════════════════════════ */}
      <TextBlock>
        {fixText('Интерфейсы управления ресурсами проектировались с акцентом на эффективность: разработчик может разворачивать виртуальные машины, настраивать сети и управлять хранилищем без переключения между разными инструментами.')}
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        {fixText('Особое внимание уделялось информационной архитектуре: сложные технические конфигурации раскрываются постепенно, не перегружая интерфейс, пока пользователю это не нужно.')}
      </TextBlock>

      {/* ════════════════════════════════════════════════════════════════════
          SCREENS — группа 3: настройка и конфигурация
      ════════════════════════════════════════════════════════════════════ */}
      <FadeImage src={imgScreen06} />
      <FadeImage src={imgScreen07} delay={0.04} />
      <FadeImage src={imgScreen08} />

      {/* ════════════════════════════════════════════════════════════════════
          TEXT — формы и конфигурации
      ════════════════════════════════════════════════════════════════════ */}
      <TextBlock>
        {fixText('Формы создания и настройки ресурсов разработаны по принципу пошагового wizard-подхода — это снижает когнитивную нагрузку при первичной настройке сложной инфраструктуры и уменьшает количество ошибок при развёртывании.')}
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        {fixText('Каждый шаг содержит контекстные подсказки и валидацию в реальном времени, что делает процесс предсказуемым даже для команд, только начинающих работу с облаком.')}
      </TextBlock>

      {/* ════════════════════════════════════════════════════════════════════
          SCREENS — группа 4: мониторинг и аналитика
      ════════════════════════════════════════════════════════════════════ */}
      <FadeImage src={imgScreen09} />
      <FadeImage src={imgScreen10} delay={0.04} />
      <FadeImage src={imgScreen11} />
      <FadeImage src={imgScreen12} delay={0.04} />

      {/* ════════════════════════════════════════════════════════════════════
          TEXT — биллинг и управление доступом
      ════════════════════════════════════════════════════════════════════ */}
      <TextBlock>
        {fixText('Экраны биллинга и управления расходами дают командам полную прозрачность по затратам на инфраструктуру. Детализация по сервисам, периодам и проектам позволяет оптимизировать расходы без необходимости выгружать данные в сторонние инструменты.')}
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        {fixText('Разграничение доступа по ролям (IAM) проектировалось для крупных корпоративных структур, где разные команды управляют изолированными окружениями внутри единой платформы.')}
      </TextBlock>

      {/* ════════════════════════════════════════════════════════════════════
          SCREENS — группа 5: финальные экраны
      ════════════════════════════════════════════════════════════════════ */}
      <FadeImage src={imgScreen13} />
      <FadeImage src={imgScreen14} delay={0.04} />
      <FadeImage src={imgScreen15} rounded />
      <FadeImage src={imgScreen16} />
      <FadeImage src={imgScreen17} />

    </div>
  );
}