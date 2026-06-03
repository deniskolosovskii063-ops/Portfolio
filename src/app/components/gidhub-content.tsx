import React from 'react';
import { motion } from 'motion/react';
import { fixText } from '../utils/fixText';
import svgPaths from '../../imports/svg-ubd4ba3lte';

// ── Images (all from Frame2147222944-157-408) ────────────────────────────────
import imgF27  from 'figma:asset/caab6aafb235ada65bc1241ef00f897e6e348892.png';
import imgF24  from 'figma:asset/2df0891ec058c27c0e54e4a6f53865471f8ffe50.png';
import imgF19  from 'figma:asset/b3a88e0e2e236f7d05dad51f8ae167e43504cca6.png';
import imgF18  from 'figma:asset/2c4764a11e89e180cf9434518f0bbe6776dc2853.png';
import imgF30  from 'figma:asset/21c70193e7830536fbdf25c92b6779f19577f1ec.png';
import imgF29  from 'figma:asset/d8b8423d048f34ab733cca2d0acab5f08c303139.png';
import imgF31  from 'figma:asset/acc2db208484f74a7b627817ba04b9a4076ca968.png';
import imgF87  from 'figma:asset/da4db3a8bedcd65032ab6368dad6145b80240a7a.png';
import imgF22  from 'figma:asset/6868ce49a85d8081b9ce1ca85c583c1162798f79.png';
import imgF20  from 'figma:asset/17c3a4ffac1b493bd667947b61da760538ac4b90.png';
import imgF28  from 'figma:asset/48d9902acca5e21990e274d6b1e07792f766e1a6.png';
import imgF25  from 'figma:asset/369e627f9de06951e1776bedb39e6b928ea31824.png';
import imgF26  from 'figma:asset/66a9dfae2361457443436ad231292e51424077cd.png';
import imgF32  from 'figma:asset/01024713894e2fbdb057ec21ea58ab4c5f3deba6.png';
import imgF33  from 'figma:asset/b746da9489025ebcd3bc353f0932fa475c9cf9f1.png';

// ── Animation presets ─────────────────────────────────────────────────────────
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

// ── Logo ─────────────────────────────────────────────────────────────────────
function GIDHubLogo() {
  return (
    <div className="flex gap-[12px] items-center shrink-0">
      <div className="bg-white relative rounded-[10.667px] shrink-0 size-[40px]">
        <div className="absolute left-[6.34px] top-[6.34px] size-[27.317px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.3171 27.3171">
            <g clipPath="url(#gidhub_logo_clip)">
              <path clipRule="evenodd" d={svgPaths.p3349e600} fill="#1C1C1E" fillRule="evenodd" />
            </g>
            <defs>
              <clipPath id="gidhub_logo_clip">
                <rect fill="white" height="27.3171" width="27.3171" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <p className="font-['Lebowski',sans-serif] font-normal leading-[27px] not-italic text-[24px] sm:text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">
        ГИД Hub
      </p>
    </div>
  );
}

// ── Full-width desktop screenshot ─────────────────────────────────────────────
function DesktopImage({
  src,
  ar = '1130 / 711.494',
  delay = 0,
}: {
  src: string;
  ar?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-[12px] sm:rounded-[16px]"
      style={{ aspectRatio: ar }}
      variants={fadeScale}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 1.05, delay, ease: springEase }}
    >
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
    </motion.div>
  );
}

// ── Text block ────────────────────────────────────────────────────────────────
function TextBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      className="w-full max-w-[568px]"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay, ease: smoothEase }}
    >
      <div className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] whitespace-pre-wrap">
        {children}
      </div>
    </motion.div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      className="font-['Inter:Regular',sans-serif] font-normal text-[13px] sm:text-[14px] text-[#868585] tracking-[0.08em] uppercase"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: smoothEase }}
    >
      {children}
    </motion.p>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function GIDHubContent() {
  return (
    <div
      className="w-full overflow-x-hidden"
      style={{ paddingTop: 'clamp(60px, 8vw, 120px)', paddingBottom: 80 }}
    >
      {/* Container */}
      <div className="mx-auto w-full max-w-[1130px] px-4 sm:px-8 xl:px-0 flex flex-col gap-[60px] sm:gap-[100px] items-center">

        {/* ── HERO ── */}
        <motion.div
          className="flex flex-col gap-[40px] sm:gap-[60px] w-full max-w-[568px]"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.85, ease: smoothEase }}>
            <GIDHubLogo />
          </motion.div>

          <motion.div
            className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] whitespace-pre-wrap max-w-[568px]"
            variants={fadeUp}
            transition={{ duration: 0.85, ease: smoothEase }}
          >
            <p className="mb-0">
              {fixText('ГИД Hub — платформа, объединяющая маркетплейс API-решений и конструктор виджетов, позволяющая компаниям быстро интегрировать цифровые сервисы в свои продукты без разработки.')}
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              {fixText('Платформа позволяет бизнесу подключать готовые сервисы через API или SDK, размещать их на своих площадках и запускать новые функции в веб-сайтах, личных кабинетах и мобильных приложениях. Благодаря единой библиотеке виджетов компании могут ускорять запуск продуктов и получать дополнительную выручку через кросс-продажи внутри экосисмы.')}
            </p>
            <p className="mb-0">&nbsp;</p>
            <p>
              {fixText('Задача проекта заключалась в проектировании масштабируемой платформы для публикации, интеграции и монетизации цифровых сервисов, включая маркетплейс API, конструктор виджетов, инструменты интеграции и систему аналитики взаимодействия между участниками платформы.')}
            </p>
          </motion.div>
        </motion.div>

        {/* ── 1: КАТАЛОГ ── */}
        <DesktopImage src={imgF27} />

        <div className="flex flex-col gap-[20px] w-full max-w-[568px]">
          <SectionLabel>Маркетплейс API</SectionLabel>
          <TextBlock>
            <p className="mb-0">
              {fixText('Центральный элемент платформы — каталог цифровых сервисов, где компании могут находить готовые API и виджеты для интеграции в свои продукты.')}
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              {fixText('Каждое решение публикуется поставщиком, проходит модерацию и становится доступным другим участникам платформы. В каталоге представлены сервисы разных категорий: платежи, подписки, медиа, безопасность, транспорт и другие цифровые продукты.')}
            </p>
            <p className="mb-0">&nbsp;</p>
            <p>
              {fixText('Компании могут быстро подключать нужные сервисы через API или SDK, сокращая время запуска новых функций и расширяя возможности своих приложений без разработки с нуля.')}
            </p>
          </TextBlock>
        </div>

        <div className="flex flex-col gap-[16px] sm:gap-[24px] w-full">
          <DesktopImage src={imgF24} />
          <DesktopImage src={imgF19} delay={0.07} />
        </div>

        {/* ── 2: КОНСТРУКТОР ВИДЖЕТОВ ── */}
        <div className="flex flex-col gap-[20px] w-full max-w-[568px]">
          <SectionLabel>Конструктор виджетов</SectionLabel>
          <TextBlock>
            <p className="mb-0">
              {fixText('В платформе реализован no-code конструктор, позволяющий компаниям создавать интерактивные виджеты без разработки.')}
            </p>
            <p className="mb-0">&nbsp;</p>
            <p>
              {fixText('Пользователь собирает интерфейс из готовых компонентов, настраивает логику и подключает API из каталога. Готовый JSON-виджет можно быстро интегрировать на сайт, в личный кабинет или мобильное приложение.')}
            </p>
          </TextBlock>
        </div>

        <div className="flex flex-col gap-[16px] sm:gap-[24px] w-full">
          <DesktopImage src={imgF18} />
          <DesktopImage src={imgF30} delay={0.07} />
          <DesktopImage src={imgF29} delay={0.1} />
          <DesktopImage src={imgF31} delay={0.13} />
        </div>

        {/* Tall image */}
        <DesktopImage src={imgF87} ar="1132 / 1628" />

        {/* ── 3: КАРТОЧКА СЕРВИСА ── */}
        <div className="flex flex-col gap-[20px] w-full max-w-[568px]">
          <SectionLabel>Карточка сервиса</SectionLabel>
          <TextBlock>
            <p className="mb-0">
              {fixText('Для каждого сервиса в каталоге была спроектирована детальная карточка, где пользователь может изучить возможности API, условия использования и подключить сервис.')}
            </p>
            <p className="mb-0">&nbsp;</p>
            <p>
              {fixText('Карточка содержит описание продукта, список доступных методов API, информацию о поставщике и интерактивный виджет предпросмотра.')}
            </p>
          </TextBlock>
        </div>

        <div className="flex flex-col gap-[16px] sm:gap-[24px] w-full">
          <DesktopImage src={imgF22} />
          <DesktopImage src={imgF20} delay={0.07} />
        </div>

        {/* ── 4: ТАРИФЫ ── */}
        <div className="flex flex-col gap-[20px] w-full max-w-[568px]">
          <SectionLabel>Система тарифов</SectionLabel>
          <TextBlock>
            <p>
              {fixText('Также реализована гибкая система тарифов, позволяющая выбирать подходящий план в зависимости от объёма запросов, количества лицензий и подключаемых модулей. Это позволяет компаниям масштабировать использование API по мере роста нагрузки.')}
            </p>
          </TextBlock>
        </div>

        <div className="flex flex-col gap-[16px] sm:gap-[24px] w-full">
          <DesktopImage src={imgF28} />
          <DesktopImage src={imgF25} delay={0.07} />
        </div>

        {/* ── 5: АНАЛИТИКА ── */}
        <div className="flex flex-col gap-[20px] w-full max-w-[568px]">
          <SectionLabel>Аналитика</SectionLabel>
          <TextBlock>
            <p className="mb-0">
              {fixText('Разработан раздел аналитики, позволяющий отслеживать использование API, количество транзакций и финансовые показатели платформы.')}
            </p>
            <p className="mb-0">&nbsp;</p>
            <p>
              {fixText('Панель показывает ключевые метрики по проектам, динамику потребления API и объём продаж с возможностью фильтрации по периодам.')}
            </p>
          </TextBlock>
        </div>

        <DesktopImage src={imgF26} />

        {/* ── 6: ЧАТ ПОДДЕРЖКИ ── */}
        <div className="flex flex-col gap-[20px] w-full max-w-[568px]">
          <SectionLabel>Чат поддержки</SectionLabel>
          <TextBlock>
            <p className="mb-0">
              {fixText('В платформу интегрирован чат поддержки, позволяющий пользователям быстро получать помощь по интеграции API и работе сервисов.')}
            </p>
            <p className="mb-0">&nbsp;</p>
            <p>
              {fixText('Чат доступен прямо внутри интерфейса платформы и поддерживает переписку, уведомления и отправку файлов.')}
            </p>
          </TextBlock>
        </div>

        <div className="flex flex-col gap-[16px] sm:gap-[24px] w-full">
          <DesktopImage src={imgF32} />
          <DesktopImage src={imgF33} delay={0.07} />
        </div>

      </div>
    </div>
  );
}