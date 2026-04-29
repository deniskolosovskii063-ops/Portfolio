import React from 'react';
import { motion } from 'motion/react';
import svgPaths from '../../imports/svg-gbstqrgrbv';
import { fixText } from '../utils/fixText';

// ── Images ─────────────────────────────────────────────────────────────────────
import imgPhone8301 from 'figma:asset/655ac4029fdc11d7a941b930baefbf140d6fb707.png';
import imgPhone8302 from 'figma:asset/8ae5c8981592f1f670e1b51ad5c2aa9f16621d13.png';
import imgPhone681  from 'figma:asset/0213f12b4617f53c17bc08ef67124214911bbf1c.png';
import imgPhone701  from 'figma:asset/8eabc817700ee43aac676179ed9e2a9848a62df1.png';
import imgPhone691  from 'figma:asset/2e77c5b04337768d03cd35a0d2ee149a49ceb51d.png';
import imgPhone711  from 'figma:asset/840caeb2ffb2b638b556796c36893087076abb16.png';
import imgPhone741  from 'figma:asset/699029bc8a219d4ba46968910fa6d0d0e1534f0f.png';
import imgPhone731  from 'figma:asset/af778204e6a7cc1b1bcfcae004c1f46e345362b9.png';
import imgPhone721  from 'figma:asset/231b6eae338caf5768008a7cf4e5554f8eb3cd10.png';
import imgPhone761  from 'figma:asset/20cdd3ae2afb89c113c77f03c667b23a5c84a421.png';
import imgPhone751  from 'figma:asset/d235eac6f61e4c1f966837870748509c29f9e852.png';
import imgPhone781  from 'figma:asset/cd9c95aff32db56a36975fb1d717167d5c711dea.png';
import imgPhone771  from 'figma:asset/8fca6e7b103c444a45d928e145fe04b996f425d8.png';
import imgPhone791  from 'figma:asset/2865f9ccbac1b64ce34bdc206a3010caa6b3e10b.png';
import imgPhone811  from 'figma:asset/5dcb798cac9ca4beecaf9c6da84b7fd988fc1e5d.png';
import imgPhone801  from 'figma:asset/cd5c1f84d6e539b6bee121b8d54ab1568011d344.png';
import imgPhone921  from 'figma:asset/217a6c2cc8c1ca33ce74c6906703d1fc8ae95228.png';
import imgPhone911  from 'figma:asset/9ec02cc86230e25fa78d3c47e38987d05b042c74.png';
import imgPhone901  from 'figma:asset/e63b11cb451488e485cf884882de2bd7af1ece7d.png';
import imgPhone951  from 'figma:asset/479aa9bac67cf71c2b79a7aec5be086705052273.png';
import imgPhone941  from 'figma:asset/8cd4ded4449978fe794cf04562235c89bec78b28.png';
import imgPhone931  from 'figma:asset/634c54a329f85340cb379da8ca6d57fb40af3b45.png';
import imgPhone971  from 'figma:asset/054d473edeb3dbbc2365255720593fa887a690fb.png';
import imgPhone981  from 'figma:asset/daf24e5d3cc6231165c79ad96f2d1e1d59aa0561.png';
import imgPhone961  from 'figma:asset/2aef5c6f431603bd265ab7e510c14121178fd618.png';
import imgPhone641  from 'figma:asset/8f8cc89d8d9b954e29b97af7cac24f81521f79e8.png';
import imgPhone631  from 'figma:asset/413ed18d0ae95659d6c66722882fe12b7b1112cc.png';
import imgPhone661  from 'figma:asset/841edacf9990dcd139fb87201d6807fe954cd8f6.png';
import imgPhone651  from 'figma:asset/39ee3297bcfacc4481271b96f761771a6b116133.png';
import imgPhone671  from 'figma:asset/e9c3fa703018586787bd90976410abe558722efd.png';
import imgPhone861  from 'figma:asset/6cbf34866a9e5d9b56f9a1f0e25edfce06320d57.png';
import imgPhone851  from 'figma:asset/e1665213e77ab6f2a929bfcb36e3b0a8f0058305.png';
import imgPhone841  from 'figma:asset/3182b654bec731ac3124445e978365f54e840847.png';
import imgPhone891  from 'figma:asset/7108c1cf0acb939b8e6090bbe87185a1b31f6858.png';
import imgPhone881  from 'figma:asset/66a06f125681119e08505e59eea09ddfcbdb728c.png';
import imgPhone871  from 'figma:asset/9a12df434db7c919d80149c62a4d467fe885385a.png';
import imgPhone1001 from 'figma:asset/3759d80adced0f78111de928027a0dd2bf628147.png';
import imgPhone991  from 'figma:asset/cbdfd9bd535731b8730d09734fc90b045c7fe620.png';
import imgPhone1021 from 'figma:asset/07f1eaa030c95a7ee4ffc09348df54f2ec762693.png';
import imgPhone1031 from 'figma:asset/db095ddf9a3246a662f52a275ab05925470ab4d2.png';
import imgPhone1011 from 'figma:asset/7658e12427f4aa10ea0c29786a718ce3b4bdd89f.png';

// ── Animation presets ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 48, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)'  },
} as const;

const fadeScale = {
  hidden:  { opacity: 0, y: 56, scale: 0.965 },
  visible: { opacity: 1, y: 0,  scale: 1     },
} as const;

const smoothEase = [0.25, 0.46, 0.45, 0.94] as const;
const springEase = [0.22, 1,    0.36, 1    ] as const;

// ── Zenit Logo ────────────────────────────────────────────────────────────────
function ZenitLogo() {
  return (
    <div className="flex gap-[12px] items-center shrink-0">
      <div className="bg-[#0090ee] rounded-[10.667px] shadow-[0px_5px_1.4px_rgba(0,0,0,0),0px_3.2px_1.3px_rgba(0,0,0,0.01),0px_1.8px_1.1px_rgba(0,0,0,0.03),0px_0.8px_0.8px_rgba(0,0,0,0.05),0px_0.2px_0.4px_rgba(0,0,0,0.06)] shrink-0 size-[40px] relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip size-[29.333px]">
          <div className="absolute inset-[15.63%_0_18.75%_0]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.3333 19.25">
              <g clipPath="url(#clip-zenit-logo)">
                <path d={svgPaths.p17abfc00} fill="white" />
                <path d={svgPaths.p1f644800} fill="white" />
                <path d={svgPaths.p3fbdca00} fill="white" />
                <path d={svgPaths.p4d0b780}  fill="white" />
                <path d={svgPaths.p33911680} fill="white" />
                <path d={svgPaths.p2ba05d80} fill="#FFCC00" />
                <path d={svgPaths.pddc8e00}  fill="#FFCC00" />
              </g>
              <defs>
                <clipPath id="clip-zenit-logo">
                  <rect fill="white" height="19.25" width="29.3333" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[27px] not-italic text-[24px] sm:text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">
        Зенит
      </p>
    </div>
  );
}

// ── Phone: single image with aspect-ratio box ─────────────────────────────────
function Phone({
  src,
  delay = 0,
  className = '',
}: {
  src: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: '538.228 / 1100' }}
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

// ── Medium phone (3-up rows) ───────────────────────────────────────────────────
function PhoneMed({
  src,
  delay = 0,
  className = '',
}: {
  src: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: '355.398 / 726.343' }}
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

// ── Section text block ────────────────────────────────────────────────────────
function SectionText({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="w-full max-w-[568px]"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: smoothEase }}
    >
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic text-[18px] sm:text-[20px] text-white tracking-[-0.2px] whitespace-pre-wrap">
        {children}
      </p>
    </motion.div>
  );
}

// ── 2-phone pair (full-height) ─────────────────────────────────────────────────
function PhonePair({
  left,
  right,
  swap = false,
}: {
  left: string;
  right: string;
  swap?: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-[100px] w-full">
      <div className="w-full sm:w-[calc((100%-100px)/2)] max-w-[538px]">
        <Phone src={swap ? right : left} delay={0} className="w-full" />
      </div>
      <div className="w-full sm:w-[calc((100%-100px)/2)] max-w-[538px]">
        <Phone src={swap ? left : right} delay={0.07} className="w-full" />
      </div>
    </div>
  );
}

// ── 3-phone row (medium height) ───────────────────────────────────────────────
function PhoneTriplet({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-[66px] w-full">
      <div className="w-full sm:w-[calc((100%-132px)/3)] max-w-[356px]">
        <PhoneMed src={a} delay={0}    className="w-full" />
      </div>
      <div className="w-full sm:w-[calc((100%-132px)/3)] max-w-[356px]">
        <PhoneMed src={b} delay={0.07} className="w-full" />
      </div>
      <div className="w-full sm:w-[calc((100%-132px)/3)] max-w-[356px]">
        <PhoneMed src={c} delay={0.14} className="w-full" />
      </div>
    </div>
  );
}

// ── Single centered phone ─────────────────────────────────────────────────────
function PhoneSingle({ src }: { src: string }) {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[538px]">
        <Phone src={src} delay={0} className="w-full" />
      </div>
    </div>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="w-full h-px bg-white/[0.06]" />
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function ZenitContent() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="mx-auto px-4 sm:px-8 xl:px-0 w-full max-w-[1176px] flex flex-col items-center gap-[80px] sm:gap-[140px] pb-[120px] pt-[40px] sm:pt-[60px]">

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col gap-[40px] sm:gap-[60px] w-full max-w-[568px]"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: smoothEase }}
        >
          <ZenitLogo />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic text-[18px] sm:text-[20px] text-white tracking-[-0.2px] whitespace-pre-wrap">
            {fixText('Мобильное приложение футбольного клуба «Зенит» — цифровая платформа для болельщиков, объединяющая новости клуба, матчи, статистику и медиаконтент в одном месте.\n\nПриложение позволяет следить за жизнью команды в еальном времени: получать новости, смотреть статистику игроков и матчей, следить за календарём игр, смотреть видео и пользоваться Матч-центр с подробной информацией о матчах и соперниках.')}
          </p>
        </motion.div>

        {/* ── Main screens ─────────────────────────────────────────────────── */}
        <PhonePair left={imgPhone8301} right={imgPhone8302} />

        <Divider />

        {/* ── Матчи: text ──────────────────────────────────────────────────── */}
        <SectionText>
          {fixText('Раздел «Матчи», объединет расписание игр, календарь и турнирные таблицы в одном интерфейсе. \n\nПользователь может быстро узнать результаты прошедших матчей, следить за будущими играми, изучать статистику турниров и покупать билеты на ближайшие матчи.')}
        </SectionText>

        {/* ── Матчи: 1 phone ───────────────────────────────────────────────── */}
        <PhoneSingle src={imgPhone681} />

        {/* ── Матчи: 2 phones ──────────────────────────────────────────────── */}
        <PhonePair left={imgPhone701} right={imgPhone691} />

        <Divider />

        {/* ── Матч-центр real-time ─────────────────────────────────────────── */}
        <SectionText>
          {fixText('Болельщик может следить за игрой в реальном времени: счёт, тайминг матча, ключевые события и составы команд. Интерфейс позволяет быстро ориентироваться в ходе игры и получать полную картину матча без необходимости переходить в сторонние сервисы.')}
        </SectionText>

        {/* ── 1 phone ──────────────────────────────────────────────────────── */}
        <PhoneSingle src={imgPhone711} />

        <Divider />

        {/* ── Детальный раздел матча ───────────────────────────────────────── */}
        <SectionText>
          {fixText('Спроектирован детальный раздел матча, объединяющий всю ключевую информацию для болельщика: данные о игре, медиаконтент и составы команд. Пользователь может быстро купить билет, посмотреть новости и видео по матчу или изучить стартовые составы и тактическую расстановку команд.')}
        </SectionText>

        {/* ── 3 phones ─────────────────────────────────────────────────────── */}
        <PhoneTriplet a={imgPhone741} b={imgPhone731} c={imgPhone721} />

        {/* ── 2 phones ─────────────────────────────────────────────────────── */}
        <PhonePair left={imgPhone761} right={imgPhone751} />

        {/* ── 2 phones ────────────────────────────────────────────────────── */}
        <PhonePair left={imgPhone781} right={imgPhone771} />

        {/* ── 1 phone ──────────────────────────────────────────────────────── */}
        <PhoneSingle src={imgPhone791} />

        {/* ── 2 phones ─────────────────────────────────────────────────────── */}
        <PhonePair left={imgPhone811} right={imgPhone801} />

        <Divider />

        {/* ── Система лояльности ───────────────────────────────────────────── */}
        <SectionText>
          {fixText('Система лояльности с клубной картой позволяет болельщикам получать уровни (серебро, золото, платина), которые открывают различные скидки и бонусы на билеты, еду и атрибутику. \n\nПользователи могут выполнять задания в приложении, зарабатывать внутреннюю валюту и повышать уровень в системе, усиливая вовлечённость и взаимодействие с клубом.')}
        </SectionText>

        {/* ── 3 phones ─────────────────────────────────────────────────────── */}
        <PhoneTriplet a={imgPhone921} b={imgPhone911} c={imgPhone901} />

        {/* ── 1 phone ──────────────────────────────────────────────────────── */}
        <PhoneSingle src={imgPhone951} />

        {/* ── 2 phones ─────────────────────────────────────────────────────── */}
        <PhonePair left={imgPhone941} right={imgPhone931} />

        <Divider />

        {/* ── Карта стадиона ───────────────────────────────────────────────── */}
        <SectionText>
          {fixText('Интерактивная карта стадиона помогает болельщикам легко ориентироваться на арене и находить нужные сервисы: еду, фан-зоны, магазины атрибутики и другие точки. \n\nПользователь может использовать поиск и фильтры, чтобы быстро найти интересующие локации и построить удобный маршрут во время матча.')}
        </SectionText>

        {/* ── 3 phones ─────────────────────────────────────────────────────── */}
        <PhoneTriplet a={imgPhone971} b={imgPhone981} c={imgPhone961} />

        <Divider />

        {/* ── Медиа ────────────────────────────────────────────────────────── */}
        <SectionText>
          {fixText('Раздел «Медиа» объединяет весь контент клуба: новости, фото, видео и материалы Zenit-TV в одной ленте. \n\nБолельщики могут следить за жизнью команды, читать интервью, смотреть медиаконтент и обсуждать публикации внутри приложения.')}
        </SectionText>

        {/* ── 2 phones ────────────────────────────────────────────────────── */}
        <PhonePair left={imgPhone641} right={imgPhone631} />

        {/* ── 2 phones ─────────────────────────────────────────────────────── */}
        <PhonePair left={imgPhone661} right={imgPhone651} />

        <Divider />

        {/* ── Тёмная тема ──────────────────────────────────────────────────── */}
        <SectionText>
          {fixText('Интерфейс приложения поддерживает тёмную тему, что делает использование более комфортным в вечернее время и во время матчей на стадионе. \n\nЦветовая система и компоненты интерфейса были адаптированы так, чтобы сохранять читаемость контента и единый визуальный стиль в обоих режимах.')}
        </SectionText>

        {/* ── 1 phone ──────────────────────────────────────────────────────── */}
        <PhoneSingle src={imgPhone671} />

        <Divider />

        {/* ── Match Day ────────────────────────────────────────────────────── */}
        <SectionText>
          {fixText('Раздел Match Day объединяет все сервисы и активности, доступные болельщику в день матча на стадионе. \n\nПользователь может узнать о развлечениях, мероприятиях, инфраструктуре арены, а также записаться на экскурсии и другие активности прямо из приложения.')}
        </SectionText>

        {/* ── 1 phone ──────────────────────────────────────────────────────── */}
        <PhoneSingle src={imgPhone861} />

        {/* ── 2 phones ─────────────────────────────────────────────────────── */}
        <PhonePair left={imgPhone851} right={imgPhone841} />

        <Divider />

        {/* ── Блоги ────────────────────────────────────────────────────────── */}
        <SectionText>
          {fixText('Раздел «Блоги» — это пространство для общения болельщиков внутри приложения. Пользователи могут публиковать посты, делиться мнениями о матчах, обсуждать новости клуба и взаимодействовать с другими фанатами через комментарии и реакции. \n\nТематические категории помогают структурировать контент и находить публикации по интересующим темам — от обсуждения команды до жизни клуба и фанатского сообщества.')}
        </SectionText>

        {/* ── 3 phones ─────────────────────────────────────────────────────── */}
        <PhoneTriplet a={imgPhone891} b={imgPhone881} c={imgPhone871} />

        <Divider />

        {/* ── Магазин ─────────────────────────────────────────────────────── */}
        <SectionText>
          {fixText('Раздел магазина позволяет болельщикам покупать официальную атрибутику клуба прямо в приложении. \n\nПользователи могут просматривать каталог товаров, находить нужные категории — форму, одежду, аксессуары и коллекции — а также отслеживать статус заказов и находить фирменные магазины клуба. \n\nПерсональные рекомендации помогают быстрее находить популярные и актуальные товары.')}
        </SectionText>

        {/* ── 2 phones ─────────────────────────────────────────────────────── */}
        <PhonePair left={imgPhone1001} right={imgPhone991} />

        <Divider />

        {/* ── Сервисы ──────────────────────────────────────────────────────── */}
        <SectionText>
          {fixText('Рздел «Сервисы» объединяет все дополнительные возможности приложения в одном месте. \n\nЗдесь собраны ключевые функции для болельщиков: покупка билетов, управление клубной картой, доступ к интернет-магазину и другим сервисам клуба. \n\nТакже в разделе представлены специальные предложения и сервисы партнёров, которые расширяют возможности приложения и дают пользователям дополнительные бонусы и активности.')}
        </SectionText>

        {/* ── 1 phone ──────────────────────────────────────────────────────── */}
        <PhoneSingle src={imgPhone1021} />

        {/* ── 2 phones ─────────────────────────────────────────────────────── */}
        <PhonePair left={imgPhone1031} right={imgPhone1011} />

      </div>
    </div>
  );
}