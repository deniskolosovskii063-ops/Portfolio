import { useRef, useEffect, useState } from 'react';
import svgPaths from "./svg-249sjx1fyz";
import imgMacBookPro1472 from "figma:asset/6efd99ee8ab026ae08302bdeea53f81901ab767e.png";
import imgMacBookPro1441 from "figma:asset/150583aa5d12631e55d93562e8abf6e4a748cf63.png";
import img4 from "figma:asset/d346d3d9ff41a3ad45bfd42554fe7265dda59669.png";
import imgBrowserNew from "figma:asset/5c15c3920a4c837d564a161d61fbe67157453f13.png";
// FloatingScreens images (from Frame2147222942)
import imgFloatAccounts from "figma:asset/4261cf215c9935fd758e9e68b9e472cd4ee3d654.png";
import imgFloatBackForm from "figma:asset/233227cc8e8b58b027db75344510d29a99ffecba.png";
import imgFloatAddService from "figma:asset/e7f84f1ec8a1a192a1c11a4e2941cd34a06388f2.png";
import imgFloatCoffee from "figma:asset/8b738d624565c9bbff2c5a587d126f24acacb03e.png";
import imgFloatGazprom from "figma:asset/62c7ecd9c19aa5788edde4529af61a66a4909753.png";
import imgGroup21361407651 from "figma:asset/750fe3e5f4083500a9e9adb6746a4ee7e48a1c5f.png";
import imgGroup21361407621 from "figma:asset/d28d300c2bcff3ca4dee25c7f5de71eaaf162adf.png";
import imgGroup21361407631 from "figma:asset/a8666f2c014bfe0966003867272ae36af6cf961b.png";
import imgFrame21472229361 from "figma:asset/34899eebd9eae4ae1c862563a825f7ffccf72bd4.png";
import imgGroup21361407681 from "figma:asset/86b8acdd7b5a392a6a07587e70621afa68c6da0e.png";
import imgFrame214722292911 from "figma:asset/090ab85d8d8748595cf53100e1e9e404fdabb356.png";
import imgFrame21472229311 from "figma:asset/9d6d89d3bf3b053501d673ca5609c96a6cf7b7de.png";
import imgImage1 from "figma:asset/a1f519233988bc6a6d158bc0b2d7af02025cb644.png";
import imgFrame21472229301 from "figma:asset/ec232279b1ec17899000f3e17ad7131b8b337c63.png";
import imgImage10917321 from "figma:asset/1d598f48d7e9dd66201b8008a2a67c828fe7acb7.png";

import {
  motion,
  useMotionValue,
  useVelocity,
  useTransform,
  useSpring,
} from 'motion/react';
import { BlurReveal } from '../app/components/blur-reveal';
import { fixText } from '../app/utils/fixText';

function ButtonSymbol() {
  return (
    <div className="relative shrink-0 size-[44px]" data-name="Button - Symbol">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
        <g id="Button - Symbol">
          <rect fill="var(--fill-0, white)" fillOpacity="0.12" height="44" rx="22" style={{ mixBlendMode: "lighten" }} width="44" />
          <rect fill="var(--fill-1, #5E5E5E)" fillOpacity="0.18" height="44" rx="22" style={{ mixBlendMode: "color-dodge" }} width="44" />
          <path d={svgPaths.p3613a380} fill="var(--fill-0, #C6C6C8)" id="Previous" />
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Logo">
      <div className="absolute inset-[-71.7%_-167.52%_-263.53%_-167.04%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 173.826 174.091">
          <g id="Logo">
            <g id="Group 2136140760">
              <g filter="url(#filter0_d_1_11503)" id="Vector">
                <path d={svgPaths.p7ab6900} fill="url(#paint0_linear_1_11503)" />
                <path d={svgPaths.p677cc00} stroke="var(--stroke-0, white)" strokeOpacity="0.15" strokeWidth="0.666667" />
              </g>
              <path clipRule="evenodd" d={svgPaths.p14da5f00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="174.091" id="filter0_d_1_11503" width="173.826" x="3.05474e-06" y="-8.90344e-07">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="38" />
              <feGaussianBlur stdDeviation="33.3333" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.0195658 0 0 0 0 0.0507708 0 0 0 0 0.287037 0 0 0 0.3 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_11503" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_11503" mode="normal" result="shape" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_11503" x1="95.1491" x2="71.1491" y1="28.6784" y2="69.3451">
              <stop stopColor="#5E93FA" />
              <stop offset="1" stopColor="#3174F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Logo />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, x: 18, filter: 'blur(8px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.75, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[24px] sm:text-[32px] text-white tracking-[-0.96px] whitespace-nowrap"
      >
        {fixText('Газпром ID')}
      </motion.p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] sm:gap-[60px] items-start relative w-full">
      <Frame42 />
      <motion.div
        initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.0, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full whitespace-pre-wrap"
      >
        <p className="mb-0">
          {fixText('Газпром ID — инфраструктурная SSO-платформа, обеспечивающая единый вход в сервисы экосистемы')}
          <br aria-hidden="true" />
          {fixText('и партнёрские проду��ты. ')}
        </p>
        <p>
          <br aria-hidden="true" />
          {fixText('Авторизация — критическая точка пользовательского пути: от её стабильности и понятности напрямую зависят конверсия, нагрузка на поддержку и скорость масштабирования новых сервисов.')}
          <br aria-hidden="true" />
          <br aria-hidden="true" />
          {fixText('Задача состояла не просто в редизайне экранов входа, а в создании масштабируемой системы авторизации.')}
        </p>
      </motion.div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="bg-gradient-to-b content-stretch flex from-[#c8ffab] from-[20%] items-center justify-center p-[6px] relative rounded-[24px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.16)] shrink-0 to-[#2e8600]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic relative shrink-0 text-[#13461e] text-[18px] tracking-[-0.72px] whitespace-nowrap">+117%</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_4px_0px_white]" />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">50+ млн</p>
      <Frame43 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex w-full flex-col gap-[8px] items-start relative" data-name="Frame">
      <Frame36 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full">{fixText('Пользователей в месяц')}</p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="bg-gradient-to-b content-stretch flex from-[#c8ffab] from-[20%] items-center justify-center p-[6px] relative rounded-[24px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.16)] shrink-0 to-[#2e8600]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic relative shrink-0 text-[#13461e] text-[18px] tracking-[-0.72px] whitespace-nowrap">+700%</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_4px_0px_white]" />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">4 млн</p>
      <Frame44 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex w-full flex-col gap-[8px] items-start relative" data-name="Frame">
      <Frame37 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full">{fixText('авторизаций в день')}</p>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-col sm:flex-row gap-[24px] sm:gap-[32px] items-start relative w-full">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="bg-gradient-to-b content-stretch flex from-[#c8ffab] from-[20%] items-center justify-center p-[6px] relative rounded-[24px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.16)] shrink-0 to-[#2e8600]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic relative shrink-0 text-[#13461e] text-[18px] tracking-[-0.72px] whitespace-nowrap">+567%</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_4px_0px_white]" />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">150+</p>
      <Frame45 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex w-full flex-col gap-[8px] items-start relative" data-name="Frame">
      <Frame38 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full">{fixText('Подключенных партнеров')}</p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="bg-gradient-to-b content-stretch flex from-[#c8ffab] from-[20%] items-center justify-center p-[6px] relative rounded-[24px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.16)] shrink-0 to-[#2e8600]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic relative shrink-0 text-[#13461e] text-[18px] tracking-[-0.72px] whitespace-nowrap">+45%</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_4px_0px_white]" />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic relative shrink-0 text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">89%</p>
      <Frame46 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex w-full flex-col gap-[8px] items-start relative" data-name="Frame">
      <Frame39 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full">{fixText('Конверсия в авторизацию')}</p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex flex-col sm:flex-row gap-[24px] sm:gap-[32px] items-start relative w-full">
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="flex flex-col gap-[24px] sm:gap-[32px] relative w-full">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Frame47 />
      </motion.div>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Frame48 />
      </motion.div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative w-full">
      <motion.p
        initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.85, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full"
      >
        {fixText('Результат работы над продуктом за 3 года:')}
      </motion.p>
      <Frame35 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] sm:gap-[60px] items-start relative w-full sm:w-[568px] mx-auto">
      <Frame40 />
      <Frame41 />
    </div>
  );
}

function RightLockedIcons() {
  return (
    <div className="-translate-y-1/2 absolute h-[19.541px] right-[12.44px] top-[calc(50%-0.58px)] w-[45.3px]" data-name="Right Locked Icons">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+15.05px)] size-[14.212px] top-[calc(50%-0.08px)]" data-name="Icon - More">
        <div className="absolute inset-[12.5%_39.58%_12.5%_41.67%]" data-name="Container">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66473 10.6589">
            <path clipRule="evenodd" d={svgPaths.p22249f00} fill="var(--fill-0, #5F6368)" fillRule="evenodd" id="Container" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-13.37px)] size-[19.541px] top-[calc(50%-0.08px)]" data-name="Image - User Profile">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5413 19.5413">
          <circle cx="9.77066" cy="9.77066" fill="var(--fill-0, #D9D9D9)" id="Image - User Profile" r="9.77066" />
        </svg>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12.435px] text-white tracking-[0.2221px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">auth.gid.ru/auth/account?authLogId=1214saseb14a56b792te23218c6a</p>
      </div>
    </div>
  );
}

function UrlText() {
  return (
    <div className="-translate-y-1/2 absolute h-[14.212px] left-[29.31px] top-[calc(50%+0.48px)] w-[146.56px]" data-name="URL Text">
      <Frame6 />
    </div>
  );
}

function UrlBar() {
  return (
    <div className="-translate-y-1/2 absolute h-[24.871px] left-[119.02px] overflow-clip right-[71.95px] top-[calc(50%-0.58px)]" data-name="URL Bar">
      <div className="-translate-y-1/2 absolute bg-[#202124] h-[24.871px] left-0 right-0 rounded-[12.435px] top-[calc(50%+0.48px)]" data-name="URL Fill BG" />
      <div className="-translate-y-1/2 absolute right-[8.41px] size-[14.212px] top-[calc(50%+0.48px)]" data-name="Icon - Favorite">
        <div className="absolute inset-[12.5%_12.5%_15.79%_12.5%]" data-name="Container">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6589 10.1912">
            <path clipRule="evenodd" d={svgPaths.p2f689600} fill="var(--fill-0, #5F6368)" fillRule="evenodd" id="Container" />
          </svg>
        </div>
      </div>
      <UrlText />
      <div className="-translate-y-1/2 absolute left-[9.77px] size-[10.659px] top-[calc(50%+0.48px)]" data-name="Icon - Secure">
        <div className="absolute inset-[4.17%_16.67%_8.33%_16.67%]" data-name="Container">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.10593 9.32654">
            <path clipRule="evenodd" d={svgPaths.p9229280} fill="var(--fill-0, #EAEAEA)" fillRule="evenodd" id="Container" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LeftLockedIcons() {
  return (
    <div className="-translate-y-1/2 absolute h-[14.212px] left-[10.66px] overflow-clip top-[calc(50%-0.58px)] w-[96.818px]" data-name="Left Locked Icons">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+40.88px)] size-[14.212px] top-[calc(50%+0.43px)]" data-name="Icon - Home">
        <div className="absolute inset-[12.51%_12.49%_12.5%_12.49%]" data-name="Container">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6618 10.6551">
            <path d={svgPaths.p3a802900} fill="var(--fill-0, white)" id="Container" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+13.35px)] size-[14.212px] top-[calc(50%+0.43px)]" data-name="Icon - Refresh">
        <div className="absolute inset-[12.5%_12.51%_12.51%_12.5%]" data-name="Container">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.657 10.657">
            <path clipRule="evenodd" d={svgPaths.p18dfef80} fill="var(--fill-0, white)" fillRule="evenodd" id="Container" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-14.19px)] size-[14.212px] top-[calc(50%+0.43px)]" data-name="Icon - Forward">
        <div className="absolute inset-[12.5%_12.5%_14.41%_12.5%]" data-name="Container">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6589 10.387">
            <path clipRule="evenodd" d={svgPaths.p32f3e900} fill="var(--fill-0, #86888A)" fillRule="evenodd" id="Container" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-41.73px)] size-[14.212px] top-[calc(50%+0.43px)]" data-name="Icon - Back">
        <div className="absolute inset-[12.5%_12.5%_14.46%_12.5%]" data-name="Container">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6589 10.3802">
            <path clipRule="evenodd" d={svgPaths.p3e6e6e80} fill="var(--fill-0, white)" fillRule="evenodd" id="Container" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ToolbarUrlControls1() {
  return (
    <div className="absolute h-[35.517px] left-0 right-0 top-0" data-name="Toolbar - URL Controls">
      <div className="absolute bg-[#35363a] inset-0" data-name="URL Controls BG" />
      <RightLockedIcons />
      <UrlBar />
      <LeftLockedIcons />
    </div>
  );
}

function ToolbarUrlControls() {
  return (
    <div className="absolute h-[35.517px] left-0 right-[-0.63px] top-[36.49px]" data-name="Toolbar - URL Controls">
      <ToolbarUrlControls1 />
    </div>
  );
}

function FaviconTextIcons() {
  return (
    <div className="bg-[#35363a] content-stretch flex gap-[7.994px] items-center overflow-clip p-[7.106px] relative rounded-tl-[7.106px] rounded-tr-[7.106px] shrink-0" data-name="Favicon, Text, & Icons">
      <div className="bg-[#0079c2] overflow-clip relative rounded-[3.553px] shrink-0 size-[14.212px]" data-name="Icon-gid">
        <div className="absolute inset-[17.86%_42.84%_45.23%_45.4%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.67091 5.24661">
            <path clipRule="evenodd" d={svgPaths.p9937280} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[35.86%_41.18%_23.73%_23.22%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.06065 5.74311">
            <path clipRule="evenodd" d={svgPaths.p105f5e80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[56.12%_22.83%_23.45%_61.52%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.22464 2.90335">
            <path d={svgPaths.p1f024d00} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] overflow-hidden relative shrink-0 text-[10.659px] text-ellipsis text-white tracking-[0.1776px] w-[110.142px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] overflow-hidden">Газпром ID – Ваш ключ к вселенной возможностей</p>
      </div>
      <div className="relative shrink-0 size-[15.988px]" data-name="Icon - Close">
        <div className="absolute inset-[29.17%]" data-name="Container">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66181 6.66181">
            <path clipRule="evenodd" d={svgPaths.p2f718200} fill="var(--fill-0, white)" fillRule="evenodd" id="Container" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="h-[7.106px] relative shrink-0 w-[5.329px]" data-name="Curve L">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.32945 7.10593">
          <path clipRule="evenodd" d={svgPaths.pb168400} fill="var(--fill-0, #35363A)" fillRule="evenodd" id="Curve L" />
        </svg>
      </div>
      <FaviconTextIcons />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[7.106px] relative w-[5.329px]" data-name="Curve R">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.32945 7.10593">
              <path clipRule="evenodd" d={svgPaths.pb168400} fill="var(--fill-0, #35363A)" fillRule="evenodd" id="Curve R" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex gap-[7.106px] items-center left-[6.67px] top-0">
      <Frame4 />
      <div className="relative shrink-0 size-[17.765px]" data-name="Icon - Plus">
        <div className="absolute inset-[16.67%]" data-name="Icon - New Tab">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8432 11.8432">
            <path clipRule="evenodd" d={svgPaths.p38421f0} fill="var(--fill-0, #BDC1C6)" fillRule="evenodd" id="Icon - New Tab" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BrowserTabWithPlus() {
  return (
    <div className="-translate-y-1/2 absolute h-[30.2px] left-[7.11px] top-1/2 w-[116.36px]" data-name="Browser Tab / With Plus">
      <Frame5 />
    </div>
  );
}

function TabPlus() {
  return (
    <div className="-translate-y-1/2 absolute h-[30.2px] left-[63.95px] top-[calc(50%+4.48px)] w-[148.336px]" data-name="Tab & Plus">
      <BrowserTabWithPlus />
    </div>
  );
}

function BrowserControls() {
  return (
    <div className="-translate-y-1/2 absolute h-[10.659px] left-[19.55px] top-[calc(50%+1.37px)] w-[46.189px]" data-name="Browser Controls">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46.1886 10.6589">
        <g clipPath="url(#clip0_1_11238)" id="Browser Controls">
          <circle cx="40.8587" cy="5.33043" fill="var(--fill-0, #27CA40)" id="Option - Expand" r="5.10739" stroke="var(--stroke-0, #3EAF3F)" strokeWidth="0.444121" />
          <circle cx="23.0941" cy="5.33043" fill="var(--fill-0, #FFC130)" id="Option - Minimize" r="5.10739" stroke="var(--stroke-0, #E1A325)" strokeWidth="0.444121" />
          <circle cx="5.32945" cy="5.33043" fill="var(--fill-0, #FF6058)" id="Option - Close" r="5.10739" stroke="var(--stroke-0, #E14942)" strokeWidth="0.444121" />
        </g>
        <defs>
          <clipPath id="clip0_1_11238">
            <rect fill="white" height="10.6589" width="46.1886" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BroswerControlBar() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="Broswer Control Bar">
      <div className="absolute bg-[#202124] inset-[0.15%_-0.02%_-1.18%_0.02%] shadow-[0px_3.553px_3.553px_0px_rgba(0,0,0,0.25)]" data-name="Broswer Control Bar BG" />
      <TabPlus />
      <BrowserControls />
    </div>
  );
}

function ToolbarBrowserControls() {
  return (
    <div className="absolute inset-[-1.64%_0_49.4%_0]" data-name="Toolbar - Browser Controls">
      <BroswerControlBar />
    </div>
  );
}

function BrowserUrlControls() {
  return (
    <div className="h-[72px] overflow-clip relative shrink-0 w-[1100px]" data-name="Browser & URL Controls">
      <ToolbarUrlControls />
      <ToolbarBrowserControls />
    </div>
  );
}

function Logo1() {
  return (
    <div className="relative shrink-0 size-[39.712px]" data-name="Logo">
      <div className="absolute inset-[-71.7%_-167.52%_-263.53%_-167.04%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 172.573 172.836">
          <g id="Logo">
            <g id="Group 2136140760">
              <g filter="url(#filter0_d_1_10758)" id="Vector">
                <path d={svgPaths.p11830410} fill="url(#paint0_linear_1_10758)" />
                <path d={svgPaths.ped8b800} stroke="var(--stroke-0, white)" strokeOpacity="0.15" strokeWidth="0.66186" />
              </g>
              <path clipRule="evenodd" d={svgPaths.p2f82b800} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="172.836" id="filter0_d_1_10758" width="172.573" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="37.726" />
              <feGaussianBlur stdDeviation="33.093" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.0195658 0 0 0 0 0.0507708 0 0 0 0 0.287037 0 0 0 0.3 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_10758" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_10758" mode="normal" result="shape" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_10758" x1="94.463" x2="70.6361" y1="28.4716" y2="68.845">
              <stop stopColor="#5E93FA" />
              <stop offset="1" stopColor="#3174F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[6.109px] items-center justify-center relative shrink-0 w-full" data-name="text">
      <p className="font-['TT_Interphases_Pro:DemiBold',sans-serif] leading-[18.328px] not-italic relative shrink-0 text-[#1c1c1e] text-[15.274px] text-center w-full">Вход или регистрация</p>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[24.438px] items-center justify-center min-h-px min-w-px relative" data-name="Button 1">
      <div className="absolute bg-white inset-[0_0.38px_0_0] rounded-[763.684px] shadow-[0px_2.291px_6.109px_0px_rgba(0,0,0,0.12),0px_2.291px_0.764px_0px_rgba(0,0,0,0.04)]" data-name="Button" />
      <p className="font-['TT_Interphases_Pro:DemiBold',sans-serif] leading-[15.274px] not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[12.22px] text-center text-ellipsis whitespace-nowrap">Телефон</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" data-name="Button 2">
      <p className="font-['TT_Interphases_Pro:Medium',sans-serif] leading-[13.746px] not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[10.69px] text-center text-ellipsis whitespace-nowrap">Почта</p>
    </div>
  );
}

function Wrapper3() {
  return (
    <div className="content-stretch flex flex-col gap-[18.328px] items-center justify-center pt-[12.219px] relative shrink-0 w-full" data-name="wrapper">
      <Text />
      <div className="bg-[rgba(0,0,50,0.04)] content-stretch flex items-center justify-center overflow-clip p-[3.055px] relative rounded-[763.684px] shrink-0 w-[244.379px]" data-name="segmented-control [1.0.0]">
        <Button />
        <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Header">
      <Logo1 />
      <Wrapper3 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute inset-[3.05px_0_3.06px_0] rounded-[2px]" data-name="Frame">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="h-[4.073px] relative shrink-0 w-[18.328px]" data-name="shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3284 4.07273">
            <path clipRule="evenodd" d={svgPaths.pa0e1180} fill="var(--fill-0, white)" fillRule="evenodd" id="shape" />
          </svg>
        </div>
        <div className="h-[4.073px] relative shrink-0 w-[18.328px]" data-name="shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3284 4.07273">
            <path clipRule="evenodd" d={svgPaths.pa0e1180} fill="var(--fill-0, #0036A7)" fillRule="evenodd" id="shape" />
          </svg>
        </div>
        <div className="h-[4.073px] relative shrink-0 w-[18.328px]" data-name="shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3284 4.07273">
            <path clipRule="evenodd" d={svgPaths.pa0e1180} fill="var(--fill-0, #D62718)" fillRule="evenodd" id="shape" />
          </svg>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.764px] border-[rgba(0,0,50,0.08)] border-solid inset-[-0.764px] pointer-events-none rounded-[2.7640000000000002px]" />
    </div>
  );
}

function Group() {
  return (
    <div className="content-stretch flex gap-[4.582px] items-center pl-[3.055px] relative shrink-0" data-name="Group">
      <div className="relative shrink-0 size-[18.328px]" data-name="rus">
        <Frame7 />
      </div>
      <div className="overflow-clip relative shrink-0 size-[9.164px]" data-name="Arrow">
        <div className="absolute inset-[32.47%_13.72%_27.08%_13.72%]" data-name="Union">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.64941 3.70703">
            <path d={svgPaths.pdc2c380} fill="var(--fill-0, #1C1C1E)" id="Union" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-col font-['TT_Interphases_Pro:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[12.22px] text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[18.328px] overflow-hidden">+7 999 205 92 57</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[42.766px] relative rounded-[9.164px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.527px] border-[rgba(0,0,50,0.08)] border-solid inset-0 pointer-events-none rounded-[9.164px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9.164px] items-center pl-[9.164px] pr-[12.219px] relative size-full">
          <Group />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Inputs() {
  return (
    <div className="content-stretch flex flex-col gap-[6.109px] items-start relative shrink-0 w-[244.379px]" data-name="inputs">
      <div className="content-stretch flex flex-col gap-[6.109px] items-start relative shrink-0 w-[244.379px]" data-name="input-phone [1.1.2]">
        <Container1 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center max-w-[140.51787328720093px] min-w-[24.437891006469727px] pb-[2.291px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['TT_Interphases_Pro:DemiBold',sans-serif] justify-center leading-[0] mb-[-1.527px] min-w-full not-italic overflow-hidden relative shrink-0 text-[13.75px] text-center text-ellipsis text-white w-[min-content] whitespace-nowrap">
        <p className="leading-[16.801px] overflow-hidden">Далее</p>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="data">
      <p className="flex-[1_0_0] font-['TT_Interphases_Pro:Medium',sans-serif] leading-[0] min-h-px min-w-px not-italic relative text-[0px] text-[9.164px] text-[rgba(0,0,8,0.44)] text-center">
        <span className="leading-[12.219px]">{`Вы принимаете `}</span>
        <span className="leading-[12.219px] text-[#1c1c1e]">условия</span>
        <span className="leading-[12.219px]">
          {` использования сервиса.`}
          <br aria-hidden="true" />
          {`С условиями обработки ваших данных можно ознакомиться `}
        </span>
        <span className="leading-[12.219px] text-[#1c1c1e]">тут</span>
      </p>
    </div>
  );
}

function Concents1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="concents">
      <Data />
    </div>
  );
}

function Concents() {
  return (
    <div className="content-stretch flex flex-col gap-[6.109px] items-center relative shrink-0 w-full" data-name="concents">
      <Concents1 />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[18.328px] items-center justify-center min-h-px min-w-px relative" data-name="form">
      <Header />
      <Inputs />
      <div className="bg-[#3174f6] content-stretch flex gap-[6.109px] h-[42.766px] items-center justify-center max-w-[366.5683650970459px] min-w-[73.31367301940918px] px-[24.438px] relative rounded-[9.164px] shrink-0 w-[244.379px]" data-name="button [1.0.0]">
        <Container3 />
      </div>
      <Concents />
    </div>
  );
}

function Wrapper2() {
  return (
    <div className="content-stretch flex items-center justify-center pt-[9.164px] relative rounded-br-[18.328px] rounded-tr-[18.328px] shrink-0 w-[244.379px]" data-name="wrapper">
      <Form />
    </div>
  );
}

function Wrapper1() {
  return (
    <div className="bg-white content-stretch flex gap-[30.547px] items-center justify-center p-[18.328px] relative rounded-[24.438px] shrink-0" data-name="wrapper">
      <Wrapper2 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-[4.582px] items-center leading-[13.746px] not-italic relative shrink-0 text-[10.692px] text-center text-white w-full">
      <p className="font-['TT_Interphases_Pro:Medium',sans-serif] relative shrink-0 w-full">Ваш ID — доступ к сервисам Газпрома</p>
      <p className="font-['TT_Interphases_Pro:DemiBold',sans-serif] relative shrink-0 w-full">Узнать больше</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[15.274px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Wrapper1 />
      <Frame27 />
    </div>
  );
}

function Wrapper() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[281.036px]" data-name="wrapper">
      <Container />
    </div>
  );
}

function Footer() {
  return (
    <div className="-translate-x-1/2 absolute bottom-[-0.32px] content-stretch flex items-center justify-center left-[calc(50%-0.15px)] pb-[15.274px] px-[24.438px] w-[1099.705px]" data-name="footer">
      <div className="flex flex-col font-['TT_Interphases_Pro:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.164px] text-[rgba(249,249,255,0.57)] whitespace-nowrap">
        <p className="leading-[12.219px]">© 2022 — 2025 ООО «Оператор Газпром ИД»</p>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex flex-col gap-[129.063px] h-[616px] items-center justify-center overflow-clip relative shrink-0 w-[1100px]" data-name="Вариант 4">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img4} />
      <Wrapper />
      <Footer />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col h-[688px] items-start overflow-clip relative rounded-[30px] shrink-0 w-full">
      <BrowserUrlControls />
      <Component />
    </div>
  );
}

function Frame49() {
  return (
    <div className="absolute content-stretch flex flex-col h-[682px] items-start left-0 rounded-[30px] top-0 w-[1115px]">
      <Frame34 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-0">
      <Frame49 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="absolute h-[684px] left-[16px] overflow-clip rounded-[36px] top-[14px] w-[1100px]">
      <Group2 />
    </div>
  );
}

function Window() {
  return (
    <div className="absolute content-stretch flex h-[712px] items-start left-[7.29px] rounded-[46px] top-[-0.12px] w-[1131px]" data-name="Window">
      <div aria-hidden="true" className="absolute backdrop-blur-[50px] bg-[rgba(128,128,128,0.3)] inset-0 mix-blend-luminosity pointer-events-none rounded-[46px]" />
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[46px]" />
      <Frame51 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="h-[720px] relative shrink-0 w-[1138px]">
      <Window />
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex flex-col sm:flex-row gap-[25px] items-center relative w-full">
      <div className="relative w-full sm:w-[466.873px] shrink-0" style={{ aspectRatio: '466.873 / 893.114' }} data-name="Group 2136140762 1">
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgGroup21361407621} />
      </div>
      <div className="relative w-full sm:w-[466.873px] shrink-0" style={{ aspectRatio: '466.873 / 893.114' }} data-name="Group 2136140763 1">
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgGroup21361407631} />
      </div>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex flex-col sm:flex-row gap-[18px] items-end relative w-full">
      <div className="relative w-full sm:w-[1092px] shrink-0" style={{ aspectRatio: '1132 / 887' }} data-name="Frame 2147222936 1">
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgFrame21472229361} />
      </div>
      <div className="relative w-full sm:w-[334px] shrink-0" style={{ aspectRatio: '436 / 890' }} data-name="Group 2136140768 1">
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgGroup21361407681} />
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['TT_Interphases_Pro:DemiBold',sans-serif] leading-[21.906px] not-italic relative shrink-0 text-[#1c1c1e] text-[19.168px] text-center w-full">Расскажите о своей компании</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="text">
      <Frame16 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start p-[16.43px] relative w-full">
        <Text1 />
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name=".Label">
      <p className="flex-[1_0_0] font-['TT_Interphases_Pro:Medium',sans-serif] leading-[10.953px] min-h-px min-w-px not-italic overflow-hidden relative text-[8.21px] text-[rgba(0,0,8,0.44)] text-ellipsis whitespace-nowrap">Название компании</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Container">
      <Label />
      <div className="flex flex-col font-['TT_Interphases_Pro:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[10.95px] text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[16.43px] overflow-hidden">ООО «Ромашка»</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[38.336px] relative rounded-[8.215px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.369px] border-[rgba(0,0,50,0.08)] border-solid inset-0 pointer-events-none rounded-[8.215px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[5.477px] items-center px-[10.953px] relative size-full">
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name=".Label">
      <p className="flex-[1_0_0] font-['TT_Interphases_Pro:Medium',sans-serif] leading-[10.953px] min-h-px min-w-px not-italic overflow-hidden relative text-[8.21px] text-[rgba(0,0,8,0.44)] text-ellipsis whitespace-nowrap">ИНН</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Container">
      <Label1 />
      <div className="flex flex-col font-['TT_Interphases_Pro:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[10.95px] text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[16.43px] overflow-hidden">7743228142</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[38.336px] relative rounded-[8.215px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.369px] border-[rgba(0,0,50,0.08)] border-solid inset-0 pointer-events-none rounded-[8.215px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[5.477px] items-center px-[10.953px] relative size-full">
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name=".Label">
      <p className="flex-[1_0_0] font-['TT_Interphases_Pro:Medium',sans-serif] leading-[10.953px] min-h-px min-w-px not-italic overflow-hidden relative text-[8.21px] text-[rgba(0,0,8,0.44)] text-ellipsis whitespace-nowrap">Фактический адрес</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Container">
      <Label2 />
      <div className="flex flex-col font-['TT_Interphases_Pro:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[10.95px] text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[16.43px] overflow-hidden">191028, Санкт-Петербург, пр-кт Литейный, д. 51</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[38.336px] relative rounded-[8.215px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.369px] border-[rgba(0,0,50,0.08)] border-solid inset-0 pointer-events-none rounded-[8.215px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[5.477px] items-center px-[10.953px] relative size-full">
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Inputs1() {
  return (
    <div className="content-stretch flex flex-col gap-[5.477px] items-start relative shrink-0 w-full" data-name="inputs">
      <div className="content-stretch flex flex-col gap-[5.477px] h-[38.336px] items-start relative shrink-0 w-[355.977px]" data-name="input-text [1.1.4]">
        <Container4 />
      </div>
      <div className="content-stretch flex flex-col gap-[5.477px] items-start relative shrink-0 w-[355.977px]" data-name="input-text [1.1.4]">
        <Container6 />
      </div>
      <div className="content-stretch flex flex-col gap-[5.477px] items-start relative shrink-0 w-[355.977px]" data-name="input-text [1.1.4]">
        <Container8 />
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name=".Label">
      <p className="flex-[1_0_0] font-['TT_Interphases_Pro:Medium',sans-serif] leading-[10.953px] min-h-px min-w-px not-italic overflow-hidden relative text-[8.21px] text-[rgba(0,0,8,0.44)] text-ellipsis whitespace-nowrap">Номер телефона</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Container">
      <Label3 />
      <div className="flex flex-col font-['TT_Interphases_Pro:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[10.95px] text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[16.43px] overflow-hidden">+7 999 123-45-67</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[38.336px] relative rounded-[8.215px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.369px] border-[rgba(0,0,50,0.08)] border-solid inset-0 pointer-events-none rounded-[8.215px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[5.477px] items-center px-[10.953px] relative size-full">
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name=".Label">
      <p className="flex-[1_0_0] font-['TT_Interphases_Pro:Medium',sans-serif] leading-[10.953px] min-h-px min-w-px not-italic overflow-hidden relative text-[8.21px] text-[rgba(0,0,8,0.44)] text-ellipsis whitespace-nowrap">Email</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Container">
      <Label4 />
      <div className="flex flex-col font-['TT_Interphases_Pro:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[10.95px] text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[16.43px] overflow-hidden">andrej.test@test.ru</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[38.336px] relative rounded-[8.215px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.369px] border-[rgba(0,0,50,0.08)] border-solid inset-0 pointer-events-none rounded-[8.215px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[5.477px] items-center px-[10.953px] relative size-full">
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[5.477px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[5.477px] h-[38.336px] items-start relative shrink-0 w-[175.25px]" data-name="input-text [1.1.4]">
        <Container10 />
      </div>
      <div className="content-stretch flex flex-col gap-[5.477px] h-[38.336px] items-start relative shrink-0 w-[175.25px]" data-name="input-text [1.1.4]">
        <Container12 />
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[16.43px] items-start p-[16.43px] relative w-full">
        <Inputs1 />
        <Frame29 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center max-w-[125.96120071411133px] min-w-[21.906295776367188px] pb-[2.054px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['TT_Interphases_Pro:DemiBold',sans-serif] justify-center leading-[0] mb-[-1.369px] min-w-full not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[10.95px] text-center text-ellipsis w-[min-content] whitespace-nowrap">
        <p className="leading-[13.691px] overflow-hidden">Назад</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center max-w-[125.96120071411133px] min-w-[21.906295776367188px] pb-[2.054px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['TT_Interphases_Pro:DemiBold',sans-serif] justify-center leading-[0] mb-[-1.369px] min-w-full not-italic overflow-hidden relative shrink-0 text-[10.95px] text-center text-ellipsis text-white w-[min-content] whitespace-nowrap">
        <p className="leading-[13.691px] overflow-hidden">Далее</p>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[5.477px] items-start relative shrink-0 w-full">
      <div className="bg-[rgba(0,0,50,0.04)] content-stretch flex gap-[5.477px] h-[38.336px] items-center justify-center min-w-[65.71888732910156px] px-[16.43px] relative rounded-[8.215px] shrink-0 w-[175.25px]" data-name="button [1.0.0]">
        <Container14 />
      </div>
      <div className="bg-[#3174f6] content-stretch flex gap-[5.477px] h-[38.336px] items-center justify-center min-w-[65.71888732910156px] px-[21.906px] relative rounded-[8.215px] shrink-0 w-[175.25px]" data-name="button [1.0.0]">
        <Container15 />
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[16.43px] items-start p-[16.43px] relative shrink-0 w-[388.837px]">
      <Frame30 />
      <p className="font-['TT_Interphases_Pro:Medium',sans-serif] leading-[0] not-italic relative shrink-0 text-[9.584px] text-[rgba(0,0,8,0.44)] text-center w-full whitespace-pre-wrap">
        <span className="leading-[12.322px]">{`Продолжая, вы принимаете `}</span>
        <span className="leading-[12.322px] text-[#1c1c1e]">Пользовательское соглашение</span>
        <span className="leading-[12.322px]">
          {` `}
          <br aria-hidden="true" />
          {`и `}
        </span>
        <span className="leading-[12.322px] text-[#1c1c1e]">условия политики конфиденциальности</span>
      </p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[381.48px] items-start left-[175.18px] top-[270.57px] rounded-[19.188px] shadow-[0px_45.571px_79.95px_0px_rgba(5,13,73,0.3)] w-[388.837px]">
      <Frame10 />
      <Frame20 />
      <Frame14 />
    </div>
  );
}

function LeadingRow() {
  return <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px" data-name=".leading-row" />;
}

function TrailingRow() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name=".trailing-row">
      <div className="bg-[rgba(0,0,50,0.05)] overflow-clip relative rounded-[153.905px] shrink-0 size-[24.625px]" data-name=".TrailingAction">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[15.39px] top-1/2" data-name="Delete, Disabled">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[9.885px] top-1/2" data-name="Union">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.88466 9.88466">
              <path clipRule="evenodd" d={svgPaths.p3ba49580} fill="var(--fill-0, #1C1C1E)" fillRule="evenodd" id="Union" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute content-stretch flex items-center left-[18.47px] right-[18.47px] top-[18.47px]">
      <LeadingRow />
      <TrailingRow />
    </div>
  );
}

function Logo2() {
  return (
    <div className="relative shrink-0 size-[36.937px]" data-name="Logo">
      <div className="absolute inset-[0_-0.86%_-1.86%_-0.38%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.3921 37.6369">
          <g id="Logo">
            <g id="Group 2136140760">
              <path d={svgPaths.p15aae100} fill="var(--fill-0, #3174F6)" id="Vector" />
              <path clipRule="evenodd" d={svgPaths.p3db0f400} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pt-[12.312px] relative shrink-0 w-full" data-name="text">
      <p className="font-['TT_Interphases_Pro:DemiBold',sans-serif] leading-[19.005px] not-italic relative shrink-0 text-[#1c1c1e] text-[16.629px] text-center w-full">Войти с Газпром ID</p>
    </div>
  );
}

function Wrapper5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="wrapper">
      <Logo2 />
      <Text2 />
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pt-[24.625px] relative shrink-0 w-full" data-name="Header">
      <Wrapper5 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center leading-[0] max-w-[141.59218168258667px] min-h-px min-w-[24.624727249145508px] not-italic pb-[2.309px] relative text-center whitespace-nowrap" data-name="Container">
      <div className="flex flex-col font-['TT_Interphases_Pro:DemiBold',sans-serif] justify-center mb-[-1.539px] min-w-full overflow-hidden relative shrink-0 text-[12.31px] text-ellipsis text-white w-[min-content]">
        <p className="leading-[15.39px] overflow-hidden">Продолжить</p>
      </div>
      <div className="flex flex-col font-['TT_Interphases_Pro:Medium',sans-serif] justify-center mb-[-1.539px] relative shrink-0 text-[9.23px] text-[rgba(249,249,255,0.86)]">
        <p className="leading-[12.312px]">+7 *** *** ** 21</p>
      </div>
    </div>
  );
}

function Btns() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="btns">
      <div className="bg-[#3174f6] content-stretch flex gap-[9.234px] h-[36.937px] items-center justify-center max-w-[369.3709087371826px] min-w-[73.87418174743652px] px-[12.312px] relative rounded-[9.234px] shrink-0 w-[246.247px]" data-name="button-auth-gid [1.0]">
        <Container16 />
        <div className="-translate-y-1/2 absolute bg-[rgba(0,0,50,0.04)] left-[9.23px] rounded-[769.523px] size-[21.547px] top-1/2" data-name="avatar [1.1.1]">
          <div className="overflow-clip relative rounded-[inherit] size-full">
            <div className="absolute inset-0" data-name="Image 1">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[0.637px] border-[rgba(255,255,255,0.2)] border-solid inset-[-0.637px] pointer-events-none rounded-[770.16px]" />
        </div>
      </div>
    </div>
  );
}

function Concents3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="concents1">
      <div className="flex flex-col font-['TT_Interphases_Pro:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.234px] text-[rgba(0,0,8,0.44)] text-center w-full whitespace-pre-wrap">
        <p className="mb-0">
          <span className="leading-[12.312px]">{`Продолжая, вы принимаете `}</span>
          <span className="leading-[12.312px] text-[#1c1c1e]">Пользовательское соглашение</span>
          <span className="leading-[12.312px]">{` и `}</span>
          <span className="leading-[12.312px] text-[#1c1c1e]">условия политики конфиденциальности</span>
          <span className="leading-[12.312px]">{` `}</span>
        </p>
        <p className="leading-[12.312px]">ООО «Оператор Газпром ИД»</p>
      </div>
    </div>
  );
}

function Concents2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="concents">
      <Concents3 />
    </div>
  );
}

function Form1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="form">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[18.469px] items-center p-[18.469px] relative w-full">
          <Header1 />
          <Btns />
          <Concents2 />
        </div>
      </div>
    </div>
  );
}

function Wrapper4() {
  return (
    <div className="absolute bg-[#f2f2f6] content-stretch flex flex-col gap-[6.156px] h-[241.371px] items-start justify-end left-[776.31px] top-[416.73px] overflow-x-clip overflow-y-auto rounded-[24.625px] shadow-[0px_43.863px_76.952px_0px_rgba(5,13,73,0.3)] w-[283.184px]" data-name="wrapper">
      <Frame24 />
      <Form1 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['TT_Interphases_Pro:DemiBold',sans-serif] leading-[21.906px] not-italic relative shrink-0 text-[#1c1c1e] text-[19.168px] text-center w-full">
        Добавьте сервис, который
        <br aria-hidden="true" />
        хотите подключить
      </p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="text">
      <Frame17 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start p-[16.43px] relative w-full">
        <Text3 />
      </div>
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name=".Label">
      <p className="flex-[1_0_0] font-['TT_Interphases_Pro:Medium',sans-serif] leading-[10.953px] min-h-px min-w-px not-italic overflow-hidden relative text-[8.21px] text-[rgba(0,0,8,0.44)] text-ellipsis whitespace-nowrap">Название сервиса</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Container">
      <Label5 />
      <div className="flex flex-col font-['TT_Interphases_Pro:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[10.95px] text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[16.43px] overflow-hidden">Кофейня Ромашка</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[38.336px] relative rounded-[8.215px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.369px] border-[rgba(0,0,50,0.08)] border-solid inset-0 pointer-events-none rounded-[8.215px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[5.477px] items-center px-[10.953px] relative size-full">
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Inputs2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="inputs">
      <div className="content-stretch flex flex-col gap-[5.477px] h-[38.336px] items-start relative shrink-0 w-[355.977px]" data-name="input-text [1.1.4]">
        <Container17 />
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start p-[16.43px] relative w-full">
        <Inputs2 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="text">
      <p className="font-['TT_Interphases_Pro:DemiBold',sans-serif] leading-[13.691px] not-italic relative shrink-0 text-[#1c1c1e] text-[10.953px] w-full">Выберите платформу</p>
    </div>
  );
}

function IconBox() {
  return (
    <div className="bg-[rgba(0,0,50,0.04)] content-stretch flex items-center justify-center relative rounded-[8.215px] shrink-0 size-[32.859px]" data-name="Icon-box">
      <div className="overflow-clip relative rounded-[6px] shrink-0 size-[16.43px]" data-name="icon-logo-list">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[13.691px] top-1/2" data-name="Union">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6914 13.6914">
            <path clipRule="evenodd" d={svgPaths.p1cac3b00} fill="var(--fill-0, #1C1C1E)" fillRule="evenodd" id="Union" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[1.369px] items-start justify-center min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-col font-['TT_Interphases_Pro:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[10.953px] text-ellipsis w-full">
        <p className="leading-[13.691px]">Сайт</p>
      </div>
    </div>
  );
}

function Track() {
  return (
    <div className="h-[21.906px] relative shrink-0 w-[35.598px]" data-name="Track">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.5977 21.9063">
        <g id="Track">
          <g clipPath="url(#clip0_1_10672)">
            <path d={svgPaths.p5d75f80} fill="var(--fill-0, #3174F6)" />
            <g filter="url(#filter0_dd_1_10672)" id="Ellipse">
              <path d={svgPaths.pc18ef00} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="19.8526" id="filter0_dd_1_10672" width="19.168" x="15.0606" y="2.05372">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="1.36914" />
            <feGaussianBlur stdDeviation="0.684572" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.266667 0 0 0 0 0.32549 0 0 0 0 0.443137 0 0 0 0.2 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_10672" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset />
            <feGaussianBlur stdDeviation="0.342286" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.266667 0 0 0 0 0.32549 0 0 0 0 0.443137 0 0 0 0.1 0" />
            <feBlend in2="effect1_dropShadow_1_10672" mode="normal" result="effect2_dropShadow_1_10672" />
            <feBlend in="SourceGraphic" in2="effect2_dropShadow_1_10672" mode="normal" result="shape" />
          </filter>
          <clipPath id="clip0_1_10672">
            <path d={svgPaths.p5d75f80} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[684.572px] shrink-0" data-name="Container">
      <Track />
    </div>
  );
}

function BtnItem() {
  return (
    <div className="content-stretch flex gap-[10.953px] items-center p-[8.215px] relative rounded-[16.43px] shrink-0 w-[372.407px]" data-name="btn-item">
      <IconBox />
      <Container19 />
      <div className="content-stretch flex gap-[8.215px] items-start relative shrink-0" data-name="switch [1.2.0]">
        <Container20 />
      </div>
    </div>
  );
}

function IconBox1() {
  return (
    <div className="bg-[rgba(0,0,50,0.04)] content-stretch flex items-center justify-center relative rounded-[8.215px] shrink-0 size-[32.859px]" data-name="Icon-box">
      <div className="overflow-clip relative rounded-[6px] shrink-0 size-[16.43px]" data-name="icon-logo-list">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[13.691px] top-1/2" data-name="Union">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6914 13.6914">
            <path clipRule="evenodd" d={svgPaths.p1cac3b00} fill="var(--fill-0, #1C1C1E)" fillRule="evenodd" id="Union" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[1.369px] items-start justify-center min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-col font-['TT_Interphases_Pro:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[10.953px] text-ellipsis w-full">
        <p className="leading-[13.691px]">iOS</p>
      </div>
    </div>
  );
}

function Track1() {
  return (
    <div className="h-[21.906px] relative shrink-0 w-[35.598px]" data-name="Track">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.5977 21.9063">
        <g id="Track">
          <g clipPath="url(#clip0_1_10669)">
            <path d={svgPaths.p5d75f80} fill="var(--fill-0, #000032)" fillOpacity="0.08" />
            <g filter="url(#filter0_dd_1_10669)" id="Ellipse">
              <path d={svgPaths.p2b647780} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="19.8526" id="filter0_dd_1_10669" width="19.168" x="1.36914" y="2.05372">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="1.36914" />
            <feGaussianBlur stdDeviation="0.684572" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.266667 0 0 0 0 0.32549 0 0 0 0 0.443137 0 0 0 0.2 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_10669" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset />
            <feGaussianBlur stdDeviation="0.342286" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.266667 0 0 0 0 0.32549 0 0 0 0 0.443137 0 0 0 0.1 0" />
            <feBlend in2="effect1_dropShadow_1_10669" mode="normal" result="effect2_dropShadow_1_10669" />
            <feBlend in="SourceGraphic" in2="effect2_dropShadow_1_10669" mode="normal" result="shape" />
          </filter>
          <clipPath id="clip0_1_10669">
            <path d={svgPaths.p5d75f80} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[684.572px] shrink-0" data-name="Container">
      <Track1 />
    </div>
  );
}

function BtnItem1() {
  return (
    <div className="content-stretch flex gap-[10.953px] items-center p-[8.215px] relative rounded-[16.43px] shrink-0 w-[372.407px]" data-name="btn-item">
      <IconBox1 />
      <Container21 />
      <div className="content-stretch flex gap-[8.215px] items-start relative shrink-0" data-name="switch [1.2.0]">
        <Container22 />
      </div>
    </div>
  );
}

function IconBox2() {
  return (
    <div className="bg-[rgba(0,0,50,0.04)] content-stretch flex items-center justify-center relative rounded-[8.215px] shrink-0 size-[32.859px]" data-name="Icon-box">
      <div className="overflow-clip relative rounded-[6px] shrink-0 size-[16.43px]" data-name="icon-logo-list">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[13.691px] top-1/2" data-name="Union">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6914 13.6914">
            <path clipRule="evenodd" d={svgPaths.p1cac3b00} fill="var(--fill-0, #1C1C1E)" fillRule="evenodd" id="Union" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[1.369px] items-start justify-center min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-col font-['TT_Interphases_Pro:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[10.953px] text-ellipsis w-full">
        <p className="leading-[13.691px]">Android</p>
      </div>
    </div>
  );
}

function Track2() {
  return (
    <div className="h-[21.906px] relative shrink-0 w-[35.598px]" data-name="Track">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.5977 21.9063">
        <g id="Track">
          <g clipPath="url(#clip0_1_10669)">
            <path d={svgPaths.p5d75f80} fill="var(--fill-0, #000032)" fillOpacity="0.08" />
            <g filter="url(#filter0_dd_1_10669)" id="Ellipse">
              <path d={svgPaths.p2b647780} fill="var(--fill-0, white)" />
            </g>
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="19.8526" id="filter0_dd_1_10669" width="19.168" x="1.36914" y="2.05372">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="1.36914" />
            <feGaussianBlur stdDeviation="0.684572" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.266667 0 0 0 0 0.32549 0 0 0 0 0.443137 0 0 0 0.2 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_10669" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset />
            <feGaussianBlur stdDeviation="0.342286" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.266667 0 0 0 0 0.32549 0 0 0 0 0.443137 0 0 0 0.1 0" />
            <feBlend in2="effect1_dropShadow_1_10669" mode="normal" result="effect2_dropShadow_1_10669" />
            <feBlend in="SourceGraphic" in2="effect2_dropShadow_1_10669" mode="normal" result="shape" />
          </filter>
          <clipPath id="clip0_1_10669">
            <path d={svgPaths.p5d75f80} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[684.572px] shrink-0" data-name="Container">
      <Track2 />
    </div>
  );
}

function BtnItem2() {
  return (
    <div className="content-stretch flex gap-[10.953px] items-center p-[8.215px] relative rounded-[16.43px] shrink-0 w-[372.407px]" data-name="btn-item">
      <IconBox2 />
      <Container23 />
      <div className="content-stretch flex gap-[8.215px] items-start relative shrink-0" data-name="switch [1.2.0]">
        <Container24 />
      </div>
    </div>
  );
}

function ListBtns() {
  return (
    <div className="content-stretch flex flex-col items-center p-[-8.215px] relative shrink-0 w-full" data-name="list-btns">
      <BtnItem />
      <BtnItem1 />
      <BtnItem2 />
    </div>
  );
}

function ImageSection() {
  return (
    <div className="bg-[rgba(0,0,50,0.04)] content-stretch flex items-center justify-center relative rounded-[8.215px] shrink-0 size-[43.813px]" data-name="Image-section">
      <div className="overflow-clip relative shrink-0 size-[16.43px]" data-name="Add, Plus">
        <div className="absolute inset-[12.5%]" data-name="Union">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.3223 12.3223">
            <path d={svgPaths.p15ee0580} fill="var(--fill-0, #1C1C1E)" id="Union" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['TT_Interphases_Pro:Medium',sans-serif] items-start justify-center min-h-px min-w-px not-italic relative" data-name="Container">
      <div className="flex flex-col justify-center leading-[0] overflow-hidden relative shrink-0 text-[#1c1c1e] text-[10.953px] text-ellipsis w-full">
        <p className="leading-[16.43px]">Добавить логотип</p>
      </div>
      <p className="h-[12.322px] leading-[12.322px] relative shrink-0 text-[9.584px] text-[rgba(0,0,8,0.44)] w-full">.png, .jpg, .svg, .webp. Не более 5 МБ и разрешением 256х256</p>
    </div>
  );
}

function BtnItem3() {
  return (
    <div className="content-stretch flex gap-[10.953px] items-center relative rounded-[16.43px] shrink-0 w-full" data-name="btn-item">
      <ImageSection />
      <Container25 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[16.43px] items-start p-[16.43px] relative w-full">
        <Text4 />
        <ListBtns />
        <BtnItem3 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center max-w-[125.96120071411133px] min-w-[21.906295776367188px] pb-[2.054px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['TT_Interphases_Pro:DemiBold',sans-serif] justify-center leading-[0] mb-[-1.369px] min-w-full not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[10.95px] text-center text-ellipsis w-[min-content] whitespace-nowrap">
        <p className="leading-[13.691px] overflow-hidden">Назад</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center max-w-[125.96120071411133px] min-w-[21.906295776367188px] pb-[2.054px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['TT_Interphases_Pro:DemiBold',sans-serif] justify-center leading-[0] mb-[-1.369px] min-w-full not-italic overflow-hidden relative shrink-0 text-[10.95px] text-center text-ellipsis text-white w-[min-content] whitespace-nowrap">
        <p className="leading-[13.691px] overflow-hidden">Далее</p>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[5.477px] items-start relative shrink-0 w-full">
      <div className="bg-[rgba(0,0,50,0.04)] content-stretch flex gap-[5.477px] h-[38.336px] items-center justify-center min-w-[65.71888732910156px] px-[16.43px] relative rounded-[8.215px] shrink-0 w-[175.25px]" data-name="button [1.0.0]">
        <Container26 />
      </div>
      <div className="bg-[#3174f6] content-stretch flex gap-[5.477px] h-[38.336px] items-center justify-center min-w-[65.71888732910156px] px-[21.906px] relative rounded-[8.215px] shrink-0 w-[175.25px]" data-name="button [1.0.0]">
        <Container27 />
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-start p-[16.43px] relative shrink-0 w-[388.837px]">
      <Frame31 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[474.966px] items-start left-[454.12px] top-0 rounded-[19.188px] shadow-[0px_45.571px_79.95px_0px_rgba(5,13,73,0.3)] w-[388.837px]">
      <Frame11 />
      <Frame21 />
      <Frame22 />
      <Frame15 />
    </div>
  );
}

function IconBox3() {
  return (
    <div className="bg-[rgba(0,0,50,0.04)] content-stretch flex items-center justify-center relative rounded-[11.07px] shrink-0 size-[44.282px]" data-name="Icon-box">
      <div aria-hidden="true" className="absolute border-[0.671px] border-solid border-white inset-0 pointer-events-none rounded-[11.07px] shadow-[0px_0px_26.857px_0px_rgba(16,7,87,0.15)]" />
      <div className="overflow-clip relative rounded-[6px] shrink-0 size-[22.141px]" data-name="icon-logo-list">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[18.451px] top-1/2" data-name="Union">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.4507 18.4507">
            <path clipRule="evenodd" d={svgPaths.pf68bb80} fill="var(--fill-0, black)" fillRule="evenodd" id="Union" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex font-['TT_Interphases_Pro:Medium',sans-serif] gap-[3.69px] items-start leading-[16.606px] relative shrink-0 text-[12.916px] text-[rgba(0,0,8,0.44)] whitespace-nowrap">
      <p className="overflow-hidden relative shrink-0 text-ellipsis">Web</p>
      <p className="relative shrink-0">•</p>
      <p className="overflow-hidden relative shrink-0 text-ellipsis">7743228142</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col gap-[3.69px] items-start justify-center not-italic relative shrink-0 w-full" data-name="Container">
      <p className="font-['TT_Interphases_Pro:DemiBold',sans-serif] leading-[18.397px] min-w-full overflow-hidden relative shrink-0 text-[#1c1c1e] text-[16.098px] text-ellipsis w-[min-content]">Кофейня Ромашка</p>
      <Frame32 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[19.236px] items-start relative shrink-0 w-full">
      <IconBox3 />
      <Container28 />
    </div>
  );
}

function CheckCircle() {
  return (
    <div className="relative shrink-0 size-[22.141px]" data-name="Check, Circle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.1409 22.1409">
        <g id="Check, Circle">
          <path clipRule="evenodd" d={svgPaths.pdf8a000} fill="var(--fill-0, #3174F6)" fillRule="evenodd" id="Union" />
          <path d={svgPaths.p92e2700} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex gap-[5.535px] items-center relative shrink-0 w-full" data-name="Item">
      <CheckCircle />
      <p className="font-['TT_Interphases_Pro:Medium',sans-serif] leading-[16.606px] not-italic relative shrink-0 text-[#1c1c1e] text-[12.916px] whitespace-nowrap">Заявка отправлена</p>
    </div>
  );
}

function CardLabel() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[22.141px] shadow-[0px_38.272px_67.143px_0px_rgba(5,13,73,0.3)]" data-name="card-label">
      <div className="content-stretch flex flex-col gap-[29.521px] items-start p-[22.141px] relative w-full">
        <Frame33 />
        <Item1 />
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="bg-white content-center flex flex-wrap gap-y-[14.760591506958008px] items-center relative shrink-0 w-full" data-name="Item">
      <CardLabel />
    </div>
  );
}

function Frame23() {
  return (
    <div className="absolute content-stretch flex flex-col h-[198.417px] items-start left-[910.06px] top-[143.5px] overflow-clip rounded-[22.141px] shadow-[0px_38.272px_67.143px_0px_rgba(5,13,73,0.3)] w-[226.944px]">
      <Item />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[7.096px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['TT_Interphases_Pro:DemiBold',sans-serif] leading-[21.906px] relative shrink-0 text-[#1c1c1e] text-[22.905px] w-full">Привязанные аккаунты</p>
      <p className="font-['TT_Interphases_Pro:Medium',sans-serif] leading-[15.966px] relative shrink-0 text-[12.418px] text-[rgba(0,0,8,0.44)] w-full">Привязанные аккаунты и согласия на получение рассылок</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="text">
      <Frame19 />
    </div>
  );
}

function IconBoxLarge() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[10.644px] shrink-0 size-[42.576px]" data-name="Icon-box-large">
      <div className="bg-[#07f] relative rounded-[10.644px] shrink-0 size-[42.576px]" data-name="icon-logo-list">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <div className="absolute left-[8.87px] size-[24.836px] top-[8.87px]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.836 24.836">
              <g id="Vector">
                <path d={svgPaths.p12589a32} fill="white" />
                <path d={svgPaths.p2cb7e400} fill="var(--fill-0, #0077FF)" />
              </g>
            </svg>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[0.887px] border-[rgba(0,0,50,0.05)] border-solid inset-0 pointer-events-none rounded-[10.644px]" />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['TT_Interphases_Pro:Medium',sans-serif] gap-[1.774px] items-start justify-center min-h-px min-w-px not-italic relative text-ellipsis" data-name="Container">
      <div className="flex flex-col justify-center leading-[0] overflow-hidden relative shrink-0 text-[#1c1c1e] text-[14.19px] w-full">
        <p className="leading-[17.74px]">Андрей Игнатов</p>
      </div>
      <p className="h-[15.966px] leading-[15.966px] overflow-hidden relative shrink-0 text-[12.42px] text-[rgba(0,0,8,0.44)] w-full whitespace-nowrap">+7 *** *** ** 86</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[21.288px]">
      <div className="overflow-clip relative shrink-0 size-[14.192px]" data-name="Type=Default, Direction=Right, Size=16, Weight=Bold">
        <div className="absolute inset-[13.72%_27.08%_13.72%_32.47%]" data-name="Union">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.74023 10.2979">
            <path d={svgPaths.p1f31d872} fill="var(--fill-0, #000008)" fillOpacity="0.445" id="Union" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconBoxLarge1() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[10.644px] shrink-0 size-[42.576px]" data-name="Icon-box-large">
      <div className="bg-[#ff0032] relative rounded-[10.644px] shrink-0 size-[42.576px]" data-name="icon-logo-list">
        <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
          <div className="h-[27.838px] relative shrink-0 w-[27.669px]" data-name="Shape">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.6687 27.8381">
              <g id="Shape">
                <path d={svgPaths.p3590f800} fill="var(--fill-0, white)" />
                <path d={svgPaths.p1db4ec80} fill="var(--fill-0, white)" />
                <path d={svgPaths.p23b75580} fill="var(--fill-0, white)" />
              </g>
            </svg>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[0.887px] border-[rgba(0,0,50,0.05)] border-solid inset-0 pointer-events-none rounded-[10.644px]" />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[1.774px] items-start justify-center min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-col font-['TT_Interphases_Pro:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c1c1e] text-[14.19px] text-ellipsis w-full">
        <p className="leading-[17.74px]">+7 *** *** ** 86</p>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[21.288px]">
      <div className="overflow-clip relative shrink-0 size-[14.192px]" data-name="Type=Default, Direction=Right, Size=16, Weight=Bold">
        <div className="absolute inset-[13.72%_27.08%_13.72%_32.47%]" data-name="Union">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.74023 10.2979">
            <path d={svgPaths.p1f31d872} fill="var(--fill-0, #000008)" fillOpacity="0.445" id="Union" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[30.66%_28.57%_26.49%_28.57%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.2468 18.2469">
        <g id="Group">
          <path d={svgPaths.p1f5cdf00} fill="var(--fill-0, white)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.pb916100} fill="var(--fill-0, #404040)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function IconBoxLarge2() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[10.644px] shrink-0 size-[42.576px]" data-name="Icon-box-large">
      <div className="bg-[#ffdd2d] relative rounded-[10.644px] shrink-0 size-[42.576px]" data-name="icon-logo-list">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <Group1 />
        </div>
        <div aria-hidden="true" className="absolute border-[0.887px] border-[rgba(0,0,50,0.05)] border-solid inset-0 pointer-events-none rounded-[10.644px]" />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['TT_Interphases_Pro:Medium',sans-serif] gap-[1.774px] items-start justify-center min-h-px min-w-px not-italic relative text-ellipsis" data-name="Container">
      <div className="flex flex-col justify-center leading-[0] overflow-hidden relative shrink-0 text-[#1c1c1e] text-[14.19px] w-full">
        <p className="leading-[17.74px]">Андрей Игнатов</p>
      </div>
      <p className="h-[15.966px] leading-[15.966px] overflow-hidden relative shrink-0 text-[12.42px] text-[rgba(0,0,8,0.44)] w-full whitespace-nowrap">+7 *** *** ** 86</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[21.288px]">
      <div className="overflow-clip relative shrink-0 size-[14.192px]" data-name="Type=Default, Direction=Right, Size=16, Weight=Bold">
        <div className="absolute inset-[13.72%_27.08%_13.72%_32.47%]" data-name="Union">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.74023 10.2979">
            <path d={svgPaths.p1f31d872} fill="var(--fill-0, #000008)" fillOpacity="0.445" id="Union" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ListBtns1() {
  return (
    <div className="content-stretch flex flex-col items-center p-[-10.644px] relative shrink-0 w-full" data-name="list-btns">
      <div className="content-stretch flex gap-[14.192px] items-center p-[10.644px] relative rounded-[21.288px] shrink-0 w-[383.183px]" data-name="btn-item">
        <IconBoxLarge />
        <Container29 />
        <Frame25 />
      </div>
      <div className="content-stretch flex gap-[14.192px] items-center p-[10.644px] relative rounded-[21.288px] shrink-0 w-[383.183px]" data-name="btn-item">
        <IconBoxLarge1 />
        <Container30 />
        <Frame26 />
      </div>
      <div className="content-stretch flex gap-[14.192px] items-center p-[10.644px] relative rounded-[21.288px] shrink-0 w-[383.183px]" data-name="btn-item">
        <IconBoxLarge2 />
        <Container31 />
        <Frame28 />
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[21.288px] items-start relative shrink-0 w-full">
      <Text5 />
      <ListBtns1 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start p-[21.288px] relative w-full">
        <Frame18 />
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[280.428px] items-start left-0 top-[47.72px] rounded-[19.188px] shadow-[0px_45.571px_79.95px_0px_rgba(5,13,73,0.3)] w-[404.471px]">
      <Frame13 />
    </div>
  );
}

function Group3() {
  return (
    <div className="relative shrink-0" style={{ width: '1137.004px', height: '658.101px' }}>
      <Frame9 />
      <Wrapper4 />
      <Frame8 />
      <Frame23 />
      <Frame12 />
    </div>
  );
}

// ── FloatingScreens — animated image cards ────────────────────────────────

interface FloatingCardProps {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  delay: number;
  floatAmp: number;
  floatDuration: number;
  zIndex: number;
}

function FloatingCard({ src, left, top, width, height, delay, floatAmp, floatDuration, zIndex }: FloatingCardProps) {
  const x  = useMotionValue(0);
  const y  = useMotionValue(0);
  const vx = useVelocity(x);
  const vy = useVelocity(y);
  const [isDragging, setIsDragging] = useState(false);

  const rotateYRaw = useTransform(vx, [-2000, 0, 2000], [-20, 0, 20]);
  const rotateXRaw = useTransform(vy, [-2000, 0, 2000], [ 14, 0,-14]);
  const rotateY    = useSpring(rotateYRaw, { stiffness: 120, damping: 24 });
  const rotateX    = useSpring(rotateXRaw, { stiffness: 120, damping: 24 });

  return (
    <motion.div
      style={{ position: 'absolute', left, top, width, height, zIndex: isDragging ? 999 : zIndex }}
      initial={{ opacity: 0, scale: 0.72, filter: 'blur(16px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Layer 2 — drag + isometric tilt */}
      <motion.div
        style={{
          x, y,
          rotateX,
          rotateY,
          transformPerspective: 1000,
          cursor:      isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          userSelect:  'none',
          width, height,
        }}
        drag
        dragMomentum={false}
        dragElastic={0.05}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={()   => setIsDragging(false)}
        whileDrag={{
          scale:  1.06,
          filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
        }}
      >
        {/* Layer 3 — idle float */}
        <motion.img
          src={src}
          alt=""
          style={{ width, height, display: 'block', objectFit: 'cover', pointerEvents: 'none' }}
          animate={!isDragging ? { y: [0, -floatAmp, 0] } : { y: 0 }}
          transition={{
            duration:   floatDuration,
            repeat:     Infinity,
            ease:       'easeInOut',
            repeatType: 'loop',
            delay:      delay * 1.5,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

interface PileCardDef {
  src: string;
  wPct: number;       // display width as % of container
  arW: number;
  arH: number;
  dx: number;         // horizontal offset from center (% of container width)
  dy: number;         // vertical offset from center (% of container width)
  rot: number;        // initial pile rotation in degrees
  z: number;          // z-index: 5=front/smallest, 1=back/largest
  delay: number;
  floatAmp: number;
  floatDuration: number;
}

// ── One draggable pile card ────────────────────────────────────────────────────
function DraggablePileCard({ card }: { card: PileCardDef }) {
  const x  = useMotionValue(0);
  const y  = useMotionValue(0);
  const vx = useVelocity(x);
  const vy = useVelocity(y);
  const [isDragging, setIsDragging] = useState(false);

  const rotateYRaw = useTransform(vx, [-1800, 0, 1800], [-22, 0, 22]);
  const rotateXRaw = useTransform(vy, [-1800, 0, 1800], [ 16, 0,-16]);
  const rotateY    = useSpring(rotateYRaw, { stiffness: 110, damping: 22 });
  const rotateX    = useSpring(rotateXRaw, { stiffness: 110, damping: 22 });

  // Centre card at (left:50%, top:50%) then shift by pile offset
  const ml = -(card.wPct / 2) + card.dx;
  const mt = -(card.arH / card.arW * card.wPct / 2) + card.dy;

  return (
    <motion.div
      style={{
        position:    'absolute',
        left:        '50%',
        top:         '50%',
        width:       `${card.wPct}%`,
        marginLeft:  `${ml}%`,
        marginTop:   `${mt}%`,
        zIndex:      isDragging ? 999 : card.z,
      }}
      initial={{ opacity: 0, scale: 0.72, filter: 'blur(18px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{ duration: 0.95, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Drag + pile rotation + isometric tilt */}
      <motion.div
        style={{
          x, y,
          rotate:   card.rot,
          rotateX,
          rotateY,
          transformPerspective: 900,
          cursor:      isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          userSelect:  'none',
        }}
        drag
        dragMomentum={false}
        dragElastic={0.06}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={()   => setIsDragging(false)}
        whileDrag={{
          scale:  1.08,
          filter: 'drop-shadow(0 32px 56px rgba(0,0,0,0.7))',
        }}
      >
        {/* Idle float */}
        <motion.img
          src={card.src}
          alt=""
          style={{
            width:         '100%',
            aspectRatio:   `${card.arW} / ${card.arH}`,
            display:       'block',
            objectFit:     'cover',
            borderRadius:  '16px',
            pointerEvents: 'none',
          }}
          animate={!isDragging ? { y: [0, -card.floatAmp, 0] } : { y: 0 }}
          transition={{
            duration:   card.floatDuration,
            repeat:     Infinity,
            ease:       'easeInOut',
            repeatType: 'loop',
            delay:      card.delay * 1.5,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function FloatingScreens() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (desktopRef.current) {
        const w = desktopRef.current.offsetWidth;
        setScale(Math.min(1, w / 1360));
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const origW = 1360;
  const origH = 850;

  // Desktop cards (unchanged)
  const cards: FloatingCardProps[] = [
    { src: imgFloatBackForm,   left: 249, top: 277, width: 551, height: 544, delay: 0.18, floatAmp: 11, floatDuration: 5.2, zIndex: 1 },
    { src: imgFloatAccounts,   left:  74, top:  55, width: 567, height: 443, delay: 0.08, floatAmp:  9, floatDuration: 4.6, zIndex: 2 },
    { src: imgFloatAddService, left: 528, top:   9, width: 551, height: 638, delay: 0.0,  floatAmp:  7, floatDuration: 4.1, zIndex: 3 },
    { src: imgFloatCoffee,     left: 843, top: 426, width: 447, height: 404, delay: 0.24, floatAmp: 13, floatDuration: 5.8, zIndex: 4 },
    { src: imgFloatGazprom,    left: 992, top: 161, width: 369, height: 340, delay: 0.14, floatAmp: 10, floatDuration: 4.9, zIndex: 5 },
  ];

  // Mobile pile: all cards centered at same spot, largest at back (z:1), smallest at front (z:5)
  // dx/dy are % of container width offsets from the pile center
  // Sorted back→front so later entries render on top by default (plus explicit z)
  const pileCards: PileCardDef[] = [
    { src: imgFloatAccounts,   wPct: 88, arW: 567, arH: 443, dx:  0, dy:  6, rot:  0,   z: 1, delay: 0.30, floatAmp:  9, floatDuration: 4.6 },
    { src: imgFloatAddService, wPct: 75, arW: 551, arH: 638, dx: -5, dy: -3, rot: -3.5, z: 2, delay: 0.22, floatAmp:  7, floatDuration: 4.1 },
    { src: imgFloatBackForm,   wPct: 70, arW: 551, arH: 544, dx:  5, dy: -2, rot:  4.5, z: 3, delay: 0.15, floatAmp: 11, floatDuration: 5.2 },
    { src: imgFloatCoffee,     wPct: 58, arW: 447, arH: 404, dx: -6, dy: -8, rot: -5.5, z: 4, delay: 0.08, floatAmp: 13, floatDuration: 5.8 },
    { src: imgFloatGazprom,    wPct: 46, arW: 369, arH: 340, dx:  8, dy:-13, rot:  5,   z: 5, delay: 0.00, floatAmp: 10, floatDuration: 4.9 },
  ];

  return (
    <>
      {/* Mobile: draggable pile — all cards stacked in one heap */}
      <div
        className="block sm:hidden relative w-full"
        style={{ paddingBottom: '90%', overflow: 'visible' }}
      >
        {pileCards.map((card, i) => (
          <DraggablePileCard key={i} card={card} />
        ))}
      </div>

      {/* Desktop: original scaled canvas (unchanged) */}
      <div
        ref={desktopRef}
        className="hidden sm:block relative w-full overflow-visible"
        style={{ height: origH * scale }}
      >
        <div style={{ width: origW, height: origH, transformOrigin: 'top left', transform: `scale(${scale})` }}>
          {cards.map((card, i) => (
            <FloatingCard key={i} {...card} />
          ))}
        </div>
      </div>
    </>
  );
}

// Shared animation presets
const fadeUp = {
  hidden: { opacity: 0, y: 48, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
} as const;

const fadeScale = {
  hidden: { opacity: 0, y: 56, scale: 0.965 },
  visible: { opacity: 1, y: 0, scale: 1 },
} as const;

const smoothEase = [0.25, 0.46, 0.45, 0.94] as const;
const springEase = [0.22, 1, 0.36, 1] as const;

function Frame56() {
  return (
    <div className="relative mx-auto flex flex-col gap-[60px] sm:gap-[120px] items-center py-8 sm:py-[24px] w-full px-4 sm:px-0 sm:w-[1444px] overflow-x-clip">

      {/* ── Background MacBook images (absolutely positioned) ────────── */}
      <div className="hidden lg:block absolute h-[1497px] left-[-302px] top-[8978px] w-[2048px]" data-name="MacBook Pro 14_ - 7 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMacBookPro1472} />
      </div>
      <div className="hidden lg:block absolute h-[1497px] left-[-302px] top-[6611px] w-[2048px]" data-name="MacBook Pro 14_ - 7 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMacBookPro1472} />
      </div>
      <div className="hidden lg:block absolute h-[1497px] left-[-302px] top-[1003.11px] w-[2048px]" data-name="MacBook Pro 14_ - 4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMacBookPro1441} />
      </div>

      {/* ── Hero section — children animate themselves (see Frame42/40/41) */}
      <div className="w-full" style={{ position: 'relative', zIndex: 1 }}>
        <Frame53 />
      </div>

      {/* ── Browser mockup ─────────────────────────────────────────────── */}
      <motion.div
        className="relative w-full sm:w-[1138px] sm:h-[720px]"
        style={{ aspectRatio: '1138 / 720' }}
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1.05, ease: springEase }}
      >
        <img
          alt=""
          src={imgBrowserNew}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </motion.div>

      {/* ── Mobile screens group ──────────────────────────────────────── */}
      <motion.div
        className="relative w-full sm:w-[467px] sm:h-[893px]"
        style={{ aspectRatio: '466.873 / 893.114' }}
        data-name="Group 2136140765 1"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgGroup21361407651} />
      </motion.div>

      {/* ── Text: design system ───────────────────────────────────────── */}
      <BlurReveal
        as="p"
        className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px]"
        delay={0}
        wordDelay={0.048}
      >
        {fixText('Дизайн система позволяет адаптировать UI SSO под фирменный стиль партнера')}
      </BlurReveal>

      {/* ── Frame55: mobile screens pair ──────────────────────────────── */}
      <motion.div
        className="w-full sm:w-[959px]"
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1.0, ease: springEase }}
      >
        <Frame55 />
      </motion.div>

      {/* ── Text: one-tap login ────────────────────────────────���─────── */}
      <motion.p
        className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        {fixText('One-tap login — виджет быстрой авторизации, который позволяет пользователю войти или зарегистрироваться в сервисе в один клик чер��з уже авторизованный ID-аккаунт без ввода логина и пароля, что снижает трение на этапе входа и повышает конверсию регистрации и авторизации.')}
      </motion.p>

      {/* ── Frame54: large screen frames ─────────────────────────────── */}
      <motion.div
        className="w-full"
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.06 }}
        transition={{ duration: 1.05, ease: springEase }}
      >
        <Frame54 />
      </motion.div>

      {/* ── Text: NDA / partner cabinet ──────────────────────────────── */}
      <motion.p
        className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        <span className="leading-[28px] text-[rgba(255,255,255,0.5)]">NDA.</span>
        <span className="leading-[28px]">
          <br aria-hidden="true" />
          {fixText('Личный кабинет партнера, в котором можно настраивать и добавлять сервисы, управлять соглашениями, смотреть аналитику и управлять пользователями ')}
        </span>
      </motion.p>

      {/* ── Image: partner dashboard ──────────────────────────────────── */}
      <motion.div
        className="relative w-full sm:w-[1148px] sm:h-[723px]"
        style={{ aspectRatio: '1147.675 / 722.622' }}
        data-name="Frame 2147222929-1 1"
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1.0, ease: springEase }}
      >
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgFrame214722292911} />
      </motion.div>

      {/* ── Text: user cabinet ───────────────────────────────────────── */}
      <motion.p
        className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        {fixText('Личный кабинет пользователя — единый центр управления аккаунтом, который позволяет пользователю управлять своими данными, безопасностью и подключенными сервисами экосистемы Газпрома.')}
      </motion.p>

      {/* ── Image: user dashboard ────────────────────────────────────── */}
      <motion.div
        className="relative w-full sm:w-[1148px] sm:h-[723px]"
        style={{ aspectRatio: '1147.586 / 722.567' }}
        data-name="Frame 2147222931 1"
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1.0, ease: springEase }}
      >
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgFrame21472229311} />
      </motion.div>

      {/* ── FloatingScreens: UI cards with floating animation ─────────── */}
      <FloatingScreens />

      {/* ── Text: dark theme ──────────────────────────────────────────── */}
      <BlurReveal
        as="p"
        className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px]"
        delay={0}
        wordDelay={0.055}
      >
        {fixText('Для всех интерфейсом реализована темная тема')}
      </BlurReveal>

      {/* ── Image: dark theme ───────────────────────────────────────���── */}
      <motion.div
        className="relative w-full sm:w-[1148px] sm:h-[723px]"
        style={{ aspectRatio: '1148.03 / 722.846' }}
        data-name="Frame 2147222930 1"
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1.0, ease: springEase }}
      >
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgFrame21472229301} />
      </motion.div>

      {/* ── Text: market leaders ──���──────────────────────────────────── */}
      <motion.p
        className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        {fixText('Газпром ID среди лидеров рынка цифровой идентификации — участие в отраслевой панели вместе с VK ID, Yandex ID и другими ключевыми игроками экосистемных платформ.')}
      </motion.p>

      {/* ── Image: industry panel ────────────────────────────────────── */}
      <motion.div
        className="relative w-full sm:w-[1154px] sm:h-[702px]"
        style={{ aspectRatio: '1153.738 / 702.187' }}
        data-name="image 1091732 1"
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1.0, ease: springEase }}
      >
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgImage10917321} />
      </motion.div>

    </div>
  );
}

export default function Frame52() {
  return (
    <div className="bg-black w-full overflow-x-clip">
      <Frame56 />
    </div>
  );
}