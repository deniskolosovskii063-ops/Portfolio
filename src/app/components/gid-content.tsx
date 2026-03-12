/**
 * GIDContent — responsive flex-column layout
 * Same patterns as GazpromID (Frame56):
 *   • fadeUp / fadeScale variants
 *   • BlurReveal for key text
 *   • mx-auto sm:w-[1444px] container
 *   • phone mockup helper
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BlurReveal } from './blur-reveal';
import { fixText } from '../utils/fixText';
import svgPaths from '../../imports/svg-0r44py53iu';

// ── Images ────────────────────────────────────────────────────────────────────
import imgIPhone17Pro             from 'figma:asset/337264847ce68dbed86bd3a70cda0b66094f870c.png';
import imgIPhoneFrame             from 'figma:asset/9e265e8f1770dccf1d30ddd1d413054684abb33d.png';
import imgDesktopGID              from 'figma:asset/92ecb3cc3a0333b9e9d7610990885bf731c3d56b.png';
// man photo behind desktop (img031 from Frame2147222998)
import imgMan031                  from 'figma:asset/843d1edf642e4bff3e5a3447258fb4d3eec568ba.png';


// Loyalty
import imgIPhone1                 from 'figma:asset/c7093ebb8625705d9daa25c3728dd45bd5cb2812.png';
// Achievements
import imgIPhone2                 from 'figma:asset/747ce2bdb22dbd906275630e664eb182ebc49f4a.png';
import imgIPhone3                 from 'figma:asset/6ae2b14611d54198188f981bbc3efd412c76f557.png';

// Full-width achievement bg
import imgImage1091525            from 'figma:asset/949bf40f1f5bc8e38082caba1f8d7b78be246e3a.png';
// Achievement icon rows (small 150×150 stickers)
import imgAch1  from 'figma:asset/15f0123727e669d6e28501c08d39a8f8aae987b8.png';
import imgAch2  from 'figma:asset/1866a4c8d47d820eea41ab7792a3c7d01fec05ac.png';
import imgAch3  from 'figma:asset/38229847dfda8b6bcb1f0af95e51a9a7fa183e5b.png';
import imgAch4  from 'figma:asset/a6c3b27366c1dd084b39ff9fb8d0a68260be52c2.png';
import imgAch5  from 'figma:asset/773f60085bb1b0c86c4b58e658374f63ef70c36d.png';
import imgAch6  from 'figma:asset/0e51b3f88236b45ea4b973a2ded4cf14f43102d8.png';
import imgAch7  from 'figma:asset/425e858add9d918622e4e272a865ce77a509f063.png';
import imgAch8  from 'figma:asset/2d63cfb7f91c48166b1a4568b964911db7dfaf73.png';
import imgAch9  from 'figma:asset/fbeed74d24c299f937f7188c100756f4362565ee.png';
import imgAch10 from 'figma:asset/da5e8e09e393302d036e725b81fe740dde1cef93.png';
import imgAch11 from 'figma:asset/224128bd54b4c10c7cf627cf20e270ad2dc424f8.png';
import imgAch12 from 'figma:asset/1cd08dbda012ed2aaf57235509c81cd0b72e5137.png';
import imgAch13 from 'figma:asset/5dd0495282b9c512dd93209527279ab993bf994b.png';
import imgAch14 from 'figma:asset/a95c4f17f92e59dd4cd207a488c0453aabec1e42.png';
import imgAch15 from 'figma:asset/111ef18d9dfe9bccec477565ec356ec167899028.png';
import imgAch16 from 'figma:asset/0dd3e0e7996fb9737b2237bd454bdd9e20a4d74c.png';
import imgAch17 from 'figma:asset/70b16c4b91362820dfd57ecf43b3b1d1fc31d4c8.png';
import imgAch18 from 'figma:asset/2733274307dd7941cff333d980035d3484964f8e.png';
import imgAch19 from 'figma:asset/58b0451e9d5186cdd63227ccfbc7454488a1437e.png';
import imgAch20 from 'figma:asset/521580a4c282d8e5facd1e648312bd7de098e13e.png';
import imgAch21 from 'figma:asset/85c9bc1b122fa1e027414c84f6072f46943a6f6c.png';
import imgAch22 from 'figma:asset/f15731d5ab1aa16c8d5113382f389157cd33d9ba.png';
import imgAch23 from 'figma:asset/601a1f0a76c13ed1cc8f4aef1ab6d3f00659f224.png';
import imgAch24 from 'figma:asset/bfff0ee3ac0e030de309529ba5c6cb0ef95c1fed.png';
import imgAch25 from 'figma:asset/71524c39ee93fe60141edff45c5297d472a0849f.png';
import imgAch26 from 'figma:asset/18ee09b125ba3a50e95ca3da7db073973636f0c0.png';
import imgAch27 from 'figma:asset/8965a7b1ace05226f9429c8b788eb69be7acd617.png';
import imgAch28 from 'figma:asset/76a7be49f216ed2f3c260dacfd2a715a8489598e.png';
import imgAch29 from 'figma:asset/63a43a1c9a81dcf7759c8b0df6ebbc218e69cbe9.png';
import imgAch30 from 'figma:asset/44d012bfdc43f4d8488da4a47c4e801388320e82.png';
import imgAch31 from 'figma:asset/9305a95552fd76d66a8d58346d2076c0b33e9e41.png';
import imgAch32 from 'figma:asset/45e3058076d46e843d78f061a221b798bb0fc0ec.png';
import imgAch33 from 'figma:asset/93ca33be4d45388eebb93d9eaaa8d49a936bfc3c.png';
// Channels iPhones (new, from Frame2147222998-50-149)
import imgChanIPhone1             from 'figma:asset/7d94d5b9ecf39904f5179e49e3d9f9f9fe1727c5.png';
import imgChanIPhone2             from 'figma:asset/3017883a6122368c771cff547f694fec29b96e0e.png';
import imgChanIPhone3             from 'figma:asset/a4ca2e944cd3523072d39b811371e831ee647c80.png';
// Comment screens
import imgAuthMobile              from 'figma:asset/a51e244d6112e3a67d86ab6d0eb54b45cbddf73f.png';
import imgAuthMobile1             from 'figma:asset/623b9f0ed273bba82496e63ff865dab2a64e1aa8.png';
import imgAuthMobile2             from 'figma:asset/080f97b97aec3d9940070787029dc53b43dae079.png';
// Blogs iPhones
import imgIPhone10                from 'figma:asset/2e8d673fc189d6a5968a3de0ee1e18fc30fe53f6.png';
import imgIPhone11                from 'figma:asset/5b8bcae31de335a7584d769ae05d380b2e1a6178.png';
// Industrial photo
import imgWorker                  from 'figma:asset/0edbfc7aa1a00a74260c5fcbfe43fbcba6a566c1.png';

// UGC/Profile iPhones
import imgIPhone12                from 'figma:asset/af214b07c002373abadf4278ab0b499bb39a6c4a.png';
import imgIPhone13                from 'figma:asset/81c552eb6b558ad5287e29eba43750183a219e31.png';
import imgIPhone14                from 'figma:asset/6cf07ea8c5f35e1e66ea38de9fc9eef0a38e5933.png';
// Learning
import imgIPhone15                from 'figma:asset/3abf300ee5de5a4d4779583f339c5bc1525cb4a8.png';
import imgIPhone16                from 'figma:asset/78488f07649d4163140a633c4547bfd2554b6903.png';
import imgIPhone17                from 'figma:asset/8e34fdecf4977ecaceac798612865960f3131061.png';
import imgIPhone18                from 'figma:asset/d5c8c1a5940b35d0f88facdfd31b9751ed969181.png';
import imgIPhone19                from 'figma:asset/9095fc162724c0ee6ae4610cce6662719d04887f.png';
// Illustrations
import illus311   from 'figma:asset/0ebbbd89c465d672ec6721fe2e6ab2c5fa74b50e.png';
import illus321   from 'figma:asset/1da6bfaeeeb0d70f92c515f9a71717a89ffba040.png';
import illus331   from 'figma:asset/5436cb8e9be77602998acc5b204a9691cb175bc4.png';
import illus341   from 'figma:asset/ed9f1f21395983fd8c3bb39dc2544f76f89bd491.png';
import illus351   from 'figma:asset/f7f809f2d44055b3a84ce20947162aaf2ccd93ce.png';
import illus361   from 'figma:asset/7f175843583fa58655f78c47973227628b89982d.png';
import illus371   from 'figma:asset/78b7a64438c2b7ac751d5628adb4687887814927.png';
import illus31    from 'figma:asset/7fdb8d36cb93be1176248e9607fe843d56a298f3.png';
import illusCPG5  from 'figma:asset/3879c0ec39604c7c2a52ca46adfd07f7da1222d1.png';
import illusCPG6  from 'figma:asset/295ce5f6731dca3cbda760f5cc488a21e38712eb.png';
import illusCPG7  from 'figma:asset/307da65ed1e90b8279bcd26f5636481bff812e68.png';
import illus421   from 'figma:asset/20ac35d10a4fa51b0d89d64d67f2793087bea058.png';
import illus21    from 'figma:asset/821fda21e39babf2916862e246d59dfdc46c5e3f.png';
import illus411   from 'figma:asset/02cbc63c0784ea868552d2eb31cf66c09368724b.png';
import illus211   from 'figma:asset/da6f9df7694263f620bbd680722af142322520fe.png';
import illus41    from 'figma:asset/8337022f7f001595f60f0f27fa639ea71effb5a2.png';
import illus51    from 'figma:asset/e857f357a0602214eb0ee0b8cf99738e8051a54c.png';
import illusCPG1  from 'figma:asset/6aada4d0fa884957c18f1a677575bd9eb858204c.png';
import illusG84   from 'figma:asset/dfc34e809ef82f76744f1609894796d030a1cae1.png';
import illusG82   from 'figma:asset/80b68a4bed77a3a6fc8f8c7ef2c2451193c8f85f.png';
import illusG2136 from 'figma:asset/54a8e8e03cde746d7c55080c664877513ec97efd.png';
import illusCPG17 from 'figma:asset/a98cef41c937a0e74b70d985f4bc877cb13b8093.png';
import illusCPG2  from 'figma:asset/2d5c34b547dc93d0a0d1c22334fc76525a4e9e2f.png';
import illusCPG3  from 'figma:asset/5437544e3bb2a325fb6b426df87b504a36a88031.png';
import illusCPG4  from 'figma:asset/cf93f7ebc766d78a80c8333791a8c17da29666e5.png';
import illusCPG8  from 'figma:asset/dcc4d2ef0b2fe93482dbfeed5cfabc60fc624df5.png';
import illusCPG9  from 'figma:asset/b4cacaacd44d94845f01894083a3ea48e4b2857b.png';
import illusCPG10 from 'figma:asset/8ae5f4ad88a07cfb917e6165fdcc0350b275186b.png';
import illusCPG11 from 'figma:asset/8b568eaf57fd88743aa634fae8749d532693fffb.png';
import illusCPG12 from 'figma:asset/f6f7fc5429ed7d0dfbc7650643f8e8c67e943d42.png';
import illusCPG13 from 'figma:asset/bb1ff529af00284b18a3eddb93ca75b70b26380f.png';
import illusCPG14 from 'figma:asset/0640e40b0e8cec58eacfdda504976fdb5614ea56.png';
import illusCPG15 from 'figma:asset/eefaf229e2674a4a4bfc8586815727d397f31e8d.png';
import illusCPG16 from 'figma:asset/3d38cffd45527a86eff42925631906c00412c35f.png';
import illusF3    from 'figma:asset/fd737db2a17733daa8d062216bd99c8d4c222d0e.png';
import illusG51   from 'figma:asset/99cd4d23fe13fb13400b44f499f75342c53feb27.png';
import illusG1    from 'figma:asset/ccec034c99ca01e21fccd90ac6476b927e3467cb.png';
import illusG2    from 'figma:asset/c18135adb7e00b86cd761d464dce6e80410546c0.png';
import illusG46   from 'figma:asset/b6618fbd42c7d93be3942e02639706419869be35.png';
import illusG478  from 'figma:asset/939c24e9457721fee9d1e43ae742669be8adec14.png';
import illusG489  from 'figma:asset/d01b860ed9c692452434b338834207c4fb9fa8a5.png';
import illusG49   from 'figma:asset/66bddac21e2468e0618748851a2ddfc502c93720.png';
// News section — dark two-people background + two news iPhones
import imgNewsBackground          from 'figma:asset/e52676864f1c47149204f1d37c3f696bb23e32d9.png';
import imgNewsIPhone1             from 'figma:asset/cea26a6e715fc266e545b9879e44a215eaa40adb.png';
import imgNewsIPhone2             from 'figma:asset/2e87fd02959df06a560dc2e4c2a22125121b493e.png';
// Bonus section — woman photo + bonus iPhone
import imgWoman                   from 'figma:asset/c0e67e287838f98f5874e0a03a5305ed300b944b.png';
import imgBonusIPhone             from 'figma:asset/dc33a1613b8653cb174a8215a28bc02990404edb.png';
// Shop iPhones
import imgIPhone23                from 'figma:asset/32533ee4cbf9c603e2f2fed9d8e5f11a2d539413.png';
import imgIPhone24                from 'figma:asset/e7c75ddde5e9559ae2797d1b4ac16ab327bb75ad.png';
// Brand style
import imgBrandPhoto               from 'figma:asset/760b6a60629efb42211802c9db9431db0d1b25ba.png';
import imgBrandInvite             from 'figma:asset/bcf3177c80abf1b743b452014000766966fbeed1.png';
import imgBrand1                  from 'figma:asset/4d2059ca38537fdd57330830faad3da787058c5f.png';
import imgBrand2                  from 'figma:asset/cecedf3ffb11af9741994c73716af1ba8dea0f77.png';
import imgBrand3                  from 'figma:asset/46fa9a4ea050cfd30f52975a7a407f2e09fdf541.png';
import imgBrand4                  from 'figma:asset/d23c6fd1699e3172ab0e347c16921e1bae14ec3e.png';
import imgBrand5                  from 'figma:asset/16092065703d19bc4cc14eb89a2c71bb431251a5.png';
import imgBrand6                  from 'figma:asset/d8cb79335b30c902959fbb44b47101bf4a582ee9.png';
import imgBrandEvent1             from 'figma:asset/e94177d23c4b4b7c9f6aaa63ca258525d67b9883.png';
import imgBrandEvent2             from 'figma:asset/36a283b0818cbb993a3af5ed58381dfaa2ee89e1.png';
import imgBrandEvent3             from 'figma:asset/a8f7631c1b36f8df397345be4b29c5f01659c792.png';
import imgBrand40                 from 'figma:asset/9a71c60fc38ef5fd7dbcdb4c7aedb5478fafd2ae.png';

// ── Shared animation presets (identical to GazpromID Frame56) ─────────────────
export const fadeUp = {
  hidden:  { opacity: 0, y: 48,  filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0,   filter: 'blur(0px)'  },
} as const;

export const fadeScale = {
  hidden:  { opacity: 0, y: 56, scale: 0.965 },
  visible: { opacity: 1, y: 0,  scale: 1     },
} as const;

export const smoothEase = [0.25, 0.46, 0.45, 0.94] as const;
export const springEase = [0.22, 1,    0.36, 1    ] as const;

// ── GID Logo SVG (without back-arrow, identical paths from Figma import) ──────
function GIDLogo() {
  return (
    <div className="h-[40px] overflow-clip relative shrink-0 w-[115px]">
      <div className="absolute inset-[0_65.71%_0.65%_0]">
        <div className="absolute inset-[-72.14%_-168.86%_-263.39%_-168.86%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 172.814 173.072">
            <g filter="url(#gid_f)">
              <path d={svgPaths.p1ed4c300} fill="url(#gid_g)" />
              <path d={svgPaths.p337f4200} stroke="rgba(255,255,255,0.15)" strokeWidth="0.666667" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"
                height="173.072" id="gid_f" width="172.814" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="38" /><feGaussianBlur stdDeviation="33.3333" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix"
                  values="0 0 0 0 0.0195658 0 0 0 0 0.0507708 0 0 0 0 0.287037 0 0 0 0.3 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="gid_g"
                x1="94.437" x2="71.037" y1="28.6781" y2="68.3281">
                <stop stopColor="#5E93FA" /><stop offset="1" stopColor="#3174F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute inset-[7.24%_75.82%_14.68%_8.04%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5862 31.2299">
          <path clipRule="evenodd" d={svgPaths.p20fe1700} fill="white" fillRule="evenodd" />
        </svg>
      </div>
      <div className="absolute inset-[11.38%_0.24%_3.69%_43.21%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65.11 33.9688">
          <path clipRule="evenodd" d={svgPaths.p15f0a980} fill="white" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

// ── Stat badge (green gradient pill) ─────────────────────────────────────────
// ── Mobile breakpoint hook ─────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

function StatBadge({ value }: { value: string }) {
  return (
    <div className="bg-gradient-to-b flex from-[#c8ffab] from-[20%] items-center justify-center px-[6px] py-[6px] relative rounded-[24px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.16)] shrink-0 to-[#2e8600]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-none not-italic text-[#13461e] text-[18px] tracking-[-0.72px] whitespace-nowrap">{value}</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_4px_0px_white]" />
    </div>
  );
}

// ── Phone mockup (scaled, with Deep Blue frame overlay) ───────────────────────
function Phone({ src, delay = 0, rounded = '30px' }: { src: string; delay?: number; rounded?: string }) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      className="relative shrink-0"
      style={{ width: isMobile ? '90vw' : 'clamp(160px, 22vw, 368px)', aspectRatio: '368 / 799' }}
      variants={fadeScale}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.0, delay, ease: springEase }}
    >
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ borderRadius: rounded }}
        src={src}
      />
      {/* Frame overlay (slight overflow matches Figma exact proportions) */}
      <div className="absolute pointer-events-none"
        style={{ top: '-2.63%', left: '-5.96%', width: '111.9%', height: '105.26%' }}>
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgIPhoneFrame} />
      </div>
    </motion.div>
  );
}

// ── Mockup phone (image already includes device frame — no overlay added) ──────
function PhoneMockup({ src, delay = 0, maxW = 271 }: { src: string; delay?: number; maxW?: number }) {
  const isMobile = useIsMobile();
  return (
    <motion.img
      alt=""
      className="shrink-0 pointer-events-none h-auto"
      style={{ width: isMobile ? '90vw' : `clamp(140px, ${((maxW / 1444) * 100).toFixed(2)}vw, ${maxW}px)` }}
      src={src}
      variants={fadeScale}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.0, delay, ease: springEase }}
    />
  );
}

// ── Illustration items (width ratios from Figma original) ────────────────────
const ILLUS_ITEMS: [string, number][] = [
  [illus311, 200], [illus321, 238], [illus331, 237], [illus341, 197],
  [illus351, 283], [illus361, 277], [illus371, 326], [illus31,  201],
  [illusCPG5, 200], [illusCPG6, 224], [illusCPG7, 276], [illus421, 415],
  [illus21,  235], [illus411, 267], [illus211, 328], [illus41,  235],
  [illus51,  285], [illusCPG1, 200], [illusG84, 200], [illusG82, 230],
  [illusG2136, 233], [illusCPG17, 297], [illusCPG2, 280], [illusCPG3, 283],
  [illusCPG4, 200], [illusCPG8, 215], [illusCPG9, 204], [illusCPG10, 216],
  [illusCPG11, 226], [illusCPG12, 224], [illusCPG13, 200], [illusCPG14, 200],
  [illusCPG15, 186], [illusCPG16, 244], [illusF3, 546], [illusG51, 227],
  [illusG1, 202], [illusG2, 112], [illusG46, 142], [illusG478, 116],
  [illusG489, 134], [illusG49, 104],
];

// ── Achievement icon grid items ───────────────────────────────────────────────
const ACH_ICONS = [
  imgAch1,  imgAch2,  imgAch3,  imgAch4,  imgAch5,
  imgAch6,  imgAch7,  imgAch8,  imgAch9,  imgAch10, imgAch11,
  imgAch12, imgAch13, imgAch14, imgAch15, imgAch16, imgAch17,
  imgAch18, imgAch19, imgAch20, imgAch21, imgAch22, imgAch23,
  imgAch24, imgAch25, imgAch26, imgAch27, imgAch28, imgAch29,
  imgAch30, imgAch31, imgAch32, imgAch33,
];

// ── Main export ───────────────────────────────────────────────────────────────
export function GIDContent() {
  const isMobile = useIsMobile();
  return (
    <div className="relative mx-auto flex flex-col gap-[60px] sm:gap-[120px] items-center py-8 sm:py-[60px] w-full px-4 sm:px-0 sm:w-[1444px] overflow-x-clip">


      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <div className="content-stretch flex flex-col gap-[48px] sm:gap-[60px] items-start relative z-10 w-full sm:w-[568px] mx-auto">

        {/* Logo + description */}
        <div className="flex flex-col gap-[32px] sm:gap-[60px] w-full">
          <motion.div
            className="flex gap-[12px] items-center"
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.25, ease: smoothEase }}
          >
            <GIDLogo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.0, delay: 0.45, ease: smoothEase }}
            className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full whitespace-pre-wrap"
          >
            <p className="mb-0">{fixText('ГИД — цифровая платформа взаимодействия сотрудников и бизнеса, объединяющая 30+ сервисов, коммуникации и корпоративные процессы в единой экосистеме.')}</p>
            <p className="mb-0"><br aria-hidden="true" />{fixText('Цифровая платформа — ключевая точка взаимодействия сотрудника и компании: она объединяет сервисы, обучение, коммуникации и партнёрские предложения, формируя единое цифровое пространство для работы и повседневных задач.')}</p>
            <p><br aria-hidden="true" />{fixText('Задача состояла не просто в создании корпоративного приложения, а в формировании масштабируемой платформы взаимодействия с сотрудниками ГК Газпром.')}</p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="flex flex-col gap-[24px] sm:gap-[32px] w-full"
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 1.0, ease: springEase }}
        >
          <motion.p
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.9, ease: smoothEase }}
            className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full"
          >
            {fixText('Результат работы над продуктом за 3 года:')}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] sm:gap-x-[32px] gap-y-[24px] sm:gap-y-[32px] w-full">
            {([
              ['420 000', '+273%', 'Сотрудников подключено'],
              ['53 000',  '+78%',  'Пользователей в месяц'],
              ['30+',     '+60%',  'Сервисов'],
              ['68%',     '+35%',  'NPS приложения'],
            ] as [string, string, string][]).map(([num, badge, label], i) => (
              <motion.div
                key={i}
                className="flex flex-col gap-[8px] items-start"
                initial={{ opacity: 0, y: 24, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.75, delay: 1.3 + i * 0.2, ease: springEase }}
              >
                <div className="flex gap-[8px] items-start">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic text-[24px] sm:text-[32px] text-white tracking-[-0.96px] whitespace-nowrap">{num}</p>
                  <StatBadge value={badge} />
                </div>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════���═════════════════════════════════
          HERO iPHONE
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 w-full sm:w-[368px]"
        style={{
          aspectRatio: '368 / 799',
          boxShadow: '0px 14.629px 29.258px 0px rgba(12,12,13,0.4)',
          borderRadius: '30px',
        }}
        initial={{ opacity: 0, y: 60, scale: 0.93, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, delay: 0.5, ease: springEase }}
      >
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[30px]" src={imgIPhone17Pro} />
        <div className="absolute pointer-events-none" style={{ top: '-2.63%', left: '-5.96%', width: '111.9%', height: '105.26%' }}>
          <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgIPhoneFrame} />
        </div>
      </motion.div>



      {/* ════════════════════════════════════════════════════════════════════
          WEB DASHBOARD + MAN PHOTO
          Figma Group7: desktop at (ml=240, top=0), man photo at (x=0, top=411)
          → desktop 1138×712, man photo 1618×1219, both inside 1444px canvas
          Desktop overlaps man photo: 712−411 = 301px from photo top
          Proportions (relative to desktop width 1138):
            man photo width  = 1618/1138 = 142.2%  (extends 21.1% each side)
            man photo top    = 411/1138  = 36.1%  of desktop width (= 57.7% of desktop height)
            desktop overlap  = 301/1138  = 26.45% of desktop width
      ════════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full sm:w-[1138px] mx-auto">
        {/* Desktop browser — in front (z-10) */}
        <motion.div
          className="relative w-full z-10"
          style={{ aspectRatio: '1138 / 712' }}
          variants={fadeScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.0, ease: springEase }}
        >
          <img alt="GID web dashboard" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgDesktopGID} />
        </motion.div>

        {/* Man photo — behind & below desktop, overlaps desktop by 26.45% of width */}
        {/* marginTop: -26.45% pulls it up so its top starts inside the desktop bottom */}
        <motion.div
          className="relative overflow-hidden"
          style={{
            marginTop:  '-26.45%',     /* 301/1138 — desktop overlap into photo */
            marginLeft: '-21.1%',      /* 240/1138 — left extension */
            width:       '142.2%',     /* 1618/1138 */
            aspectRatio: '1618 / 1219',
            zIndex: 0,
          }}
          variants={fadeScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.04 }}
          transition={{ duration: 1.2, ease: springEase }}
        >
          <img
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            src={imgMan031}
          />
          {/* Fade: black → transparent from top (matches Frame70 gradient, h=399/1219=32.7%) */}
          <div className="absolute inset-x-0 top-0 h-[33%] bg-gradient-to-b from-black to-transparent pointer-events-none" />
          {/* Fade: transparent → black at bottom (h=109/1219=8.9%) */}
          <div className="absolute inset-x-0 bottom-0 h-[9%] bg-gradient-to-b from-transparent to-black pointer-events-none" />
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          LOYALTY — text
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="flex flex-col gap-[32px] sm:gap-[40px] items-start w-full max-w-[568px]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic text-[28px] sm:text-[32px] text-white tracking-[-0.96px]">{fixText('Система лояльности')}</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full whitespace-pre-wrap">
          {fixText('Платформа ГИД включает встроенную систему мотивации сотрудников, основанную на геймификации и внутренней экономике: сотрудники получают баллы, достижения и награды, используют корпоративную валюту и могут обменивать её в магазине бонусов. ')}
          <br aria-hidden="true" /><br aria-hidden="true" />
          {fixText('Такая механика повышает вовлечённость сотрудников, стимулирует обучение и помогает снижать текучесть персонала.')}
        </p>
      </motion.div>

      {/* Loyalty iPhone */}
      <Phone src={imgIPhone1} />



      {/* ════════════════════════════════════════════════════════════════════
          ACHIEVEMENTS — text + 2 iPhones
      ════════════════════════════════════════════════════════════════════ */}
      <motion.p
        className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        {fixText('В платформе ГИД реа��изован�� гибкая система достижений, которую можно настраивать через админку: ��оздавать кастомные ачивки, задавать условия их получения и привязывать их к различным активностям сотрудников. Это позв��ляет адаптир��вать систему мотивации под задачи компании и повышать вовлечённость через геймификацию.')}
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-[100px] w-full">
        <Phone src={imgIPhone2} delay={0} />
        <Phone src={imgIPhone3} delay={0.14} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          ACHIEVEMENTS + CHANNELS — stickers → pill photo → title+text → iPhones
          Layout matches Figma Frame2147222998-50-149:
            • Achievement icons grid (z-10, sits ON TOP of photo)
            • Girl photo — pill/ellipse shape, slides up behind bottom sticker rows
            • "Каналы" title + description — slides up into bottom of photo
            • 3 new channel iPhones
      ════════════════════════════════════════════════════════════════════ */}

      {/* ── Achievement sticker grid — z-10 so it overlays the photo ─── */}
      <motion.div
        className="w-full relative z-10 sm:-mb-[250px]"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.03 }}
        transition={{ duration: 0.5, ease: springEase }}
      >
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
          {ACH_ICONS.map((src, i) => (
            <motion.div
              key={i}
              className="shrink-0 relative"
              style={{ width: 'clamp(56px, 8vw, 150px)', height: 'clamp(56px, 8vw, 150px)' }}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, delay: i * 0.015, ease: springEase }}
            >
              <img alt="" className="absolute inset-0 w-full h-full object-contain pointer-events-none" src={src} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Girl photo pill — behind stickers (z-0), slides up to overlap ─ */}
      <motion.div
        className="relative flex justify-center z-0"
        style={{ marginTop: 0 }}
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1.1, ease: springEase }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            width: isMobile ? '90vw' : 'clamp(260px, 63vw, 908px)',
            aspectRatio: '908 / 638',
            borderRadius: isMobile ? 'clamp(60px, 15vw, 120px)' : 'clamp(91px, 22vw, 319px)',
          }}
        >
          <img
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            src={imgImage1091525}
          />
          {/* Top fade — blends sticker/photo overlap seam */}
          <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-black to-transparent pointer-events-none" />
          {/* Bottom fade — blends into text that overlaps from below */}
          <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-b from-transparent to-black pointer-events-none" />
        </div>
      </motion.div>

      {/* ── "Каналы" title + description — z-10, slides up over photo bottom ─ */}
      <motion.div
        className="flex flex-col gap-[32px] sm:gap-[40px] items-start w-full max-w-[568px] relative z-10 sm:-mt-[100px]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[27px] not-italic text-[28px] sm:text-[32px] text-white tracking-[-0.96px]">
          {fixText('Каналы')}
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full whitespace-pre-wrap">
          {fixText('В приложении ГИД есть система каналов, аналогичная каналам в мессенджерах.')}
          <br aria-hidden="true" /><br aria-hidden="true" />
          {fixText('В одном разделе собраны все корпоративные и пользовательские каналы, где сотрудники могут читать новости компании, подписываться на тематические сообщества и взаимодействовать с контентом.')}
          <br aria-hidden="true" /><br aria-hidden="true" />
          {fixText('Это делает приложение единым центром корпоративной коммуникации.')}
        </p>
      </motion.div>

      {/* ── 3 new channel iPhones (full mockups, no extra frame) ──────── */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-[100px] w-full items-end">
        <PhoneMockup src={imgChanIPhone1} delay={0}    maxW={352} />
        <PhoneMockup src={imgChanIPhone2} delay={0.12} maxW={352} />
        <PhoneMockup src={imgChanIPhone3} delay={0.24} maxW={352} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          COMMENTS — text + 3 phone screens
      ════════════════════════════════════════════════════════════════════ */}
      <motion.p
        className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        {fixText('В комментариях сотрудники могут обсуждать новости, отвечать на сообщения и ставить эмодзи-реакции, что делает коммуникацию внутри каналов более живой и повышает вовлечённость.')}
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-[100px] w-full">
        <Phone src={imgAuthMobile}  delay={0}    />
        <Phone src={imgAuthMobile1} delay={0.12} />
        <Phone src={imgAuthMobile2} delay={0.24} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          BLOGS — text + 2 iPhones
      ════════════════════════════════════════════════════════════════════ */}
      <motion.p
        className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        {fixText('Дополнительно в приложении есть лента блогов и сообществ, работающая по принципу социальных сетей, где сотрудники публикуют собственный UGC-контент и формируют тематические сообщества')}
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-[100px] w-full relative z-10 sm:-mb-[250px]">
        <Phone src={imgIPhone10} delay={0}    />
        <Phone src={imgIPhone11} delay={0.14} />
      </div>

      {/* ═════════════��══════════════════════════════════════════════════════
          INDUSTRIAL PHOTO
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative w-full sm:w-[787px] z-0"
        style={{ aspectRatio: '787 / 1044', boxShadow: '0px 16px 32px -8px rgba(12,12,13,0.4)' }}
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1.1, ease: springEase }}
      >
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgWorker} />
      </motion.div>

      {/* ═════════════════════════��══════════════════════════════════════════
          UGC / PROFILE — 3 iPhones
      ════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-[100px] w-full relative z-10 sm:-mt-[250px]">
        <Phone src={imgIPhone12} delay={0}    />
        <Phone src={imgIPhone13} delay={0.12} />
        <Phone src={imgIPhone14} delay={0.24} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          LEARNING — 1 iPhone + text + 4 iPhones
      ════════════════════════════════════════════════════════════════════ */}

      {/* Learning single iPhone */}
      <Phone src={imgIPhone15} />

      <motion.p
        className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        {fixText('В приложении ГИД реализован сервис обучения, где сотрудники могут проходить корпоративные и развивающие курсы. Платформа включает каталог ��урсов с категориями, персональную ленту обучения, отзывы и оценки. Это позволяет сотрудникам развивать профессиональные и soft-skills навыки и поддерживает культуру непрерывного обучения внутри компании.')}
      </motion.p>

      {/* 4 learning iPhones */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-[100px] w-full">
        <Phone src={imgIPhone16} delay={0}    />
        <Phone src={imgIPhone17} delay={0.12} />
        <Phone src={imgIPhone18} delay={0.24} />
        <Phone src={imgIPhone19} delay={0.36} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          ILLUSTRATIONS — text + grid + full-width
      ════════════════════════════════════════════════════════════════════ */}
      <BlurReveal
        as="p"
        className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px]"
        delay={0}
        wordDelay={0.048}
      >
        {fixText('Для сервиса создан уникальный фирменный стиль с упором на 2д иллюстрации. Для каждого курса создается отдельный пак потрясающих иллюстраций, которые хочется разглядывать часами. За все время существования сервиса было разработано более 1000 иллюстраций.')}
      </BlurReveal>

      {/* Illustration grid */}
      <motion.div
        className="w-full"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.03 }}
        transition={{ duration: 0.6, ease: springEase }}
      >
        <div className="flex flex-wrap justify-center items-end gap-3 sm:gap-5 px-0 sm:px-[100px]">
          {ILLUS_ITEMS.map(([src, w], i) => {
            const ratio = w / 200;
            return (
              <motion.div
                key={i}
                className="shrink-0 relative"
                style={{
                  width:  `clamp(${Math.round(ratio * 60)}px, ${ratio * 10}vw, ${w}px)`,
                  height: `clamp(60px, 10vw, 200px)`,
                }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.55, delay: i * 0.018, ease: springEase }}
              >
                <img alt="" className="absolute inset-0 w-full h-full object-contain pointer-events-none" src={src} />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════════
          NEWS — text above dark photo + 2 iPhones overlapping photo bottom
          Figma: text y=-196px, photo y=-80px, phones y=957px (50px overlap)
      ═════════════════════════════════════════════════════════════════���══ */}
      <motion.p
        className="relative z-10 font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px] sm:-mb-[250px]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        {fixText('В приложении ГИД есть сервис но��остей, ��де в одной ленте объединяются новости компании, материалы редакции и мировые новости из открытых источников. Контент агрегируется �� персонализируется с помощью рекомендательной с��стемы на основе дата-решений ГИД, формируя для каждого пользователя актуальную новостную ленту.')}
      </motion.p>

      {/* Dark photo */}
      <motion.div
        className="relative w-full overflow-hidden z-0"
        style={{
          aspectRatio: '1444 / 1007',
          boxShadow:  '0px 16px 32px -8px rgba(12,12,13,0.4)',
        }}
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.04 }}
        transition={{ duration: 1.1, ease: springEase }}
      >
        <img alt="" className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none" src={imgNewsBackground} />
        <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-b from-transparent to-black pointer-events-none" />
      </motion.div>

      {/* Two news iPhones */}
      <div
        className="flex flex-wrap justify-center gap-6 sm:gap-[100px] w-full relative z-10 sm:-mt-[250px]"
      >
        <Phone src={imgNewsIPhone1} delay={0}    />
        <Phone src={imgNewsIPhone2} delay={0.14} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          GAZPROM BONUS — text + woman photo (left) + iPhone (right)
      ════════════════════════════════════════════════════════════════════ */}
      <motion.p
        className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px] whitespace-pre-wrap"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        {fixText('В приложении ГИД интегрирован сер��ис Газпром Бонус — подписка, которая бесплатно предоставляется всем сотрудникам. Она открывает доступ к сотням скидок и специальных предложений от партнёров в различных категориях: рестораны, отдых, сервисы и товары.')}
        <br aria-hidden="true" /><br aria-hidden="true" />
        {fixText('Это позволяет сотрудникам получать дополнительные привилегии и экономить на повседневных покупках и услугах.')}
      </motion.p>

      {/* ── GAZPROM BONUS — woman photo + iPhone ─────────────────────────
          Figma layout (1444px canvas):
            Woman  : left=221px (15.3%), w=642px (44.5%), h=963px (100%)
            iPhone : left=803px (55.6%), top=125px (13%), w=409px (28.3%), h=837px (86.9%)
      ──────────────────────────────────────────────────────────────── */}

      {/* Mobile: stack vertically */}
      <div className="sm:hidden flex flex-col items-center gap-6 w-full">
        <motion.div
          className="relative overflow-hidden mx-auto"
          style={{ width: '90vw', aspectRatio: '642 / 963' }}
          variants={fadeScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.04 }}
          transition={{ duration: 1.1, ease: springEase }}
        >
          <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgWoman} />
          <div className="absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-b from-transparent to-black pointer-events-none" />
        </motion.div>
        <PhoneMockup src={imgBonusIPhone} delay={0.12} maxW={300} />
      </div>

      {/* Desktop: Figma-exact proportional layout */}
      <div
        className="hidden sm:block relative w-full overflow-hidden"
        style={{ aspectRatio: '1444 / 963' }}
      >
        {/* Woman photo at left=15.3%, full height */}
        <motion.div
          className="absolute overflow-hidden"
          style={{ left: '15.3%', top: 0, width: '44.5%', height: '100%' }}
          variants={fadeScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.04 }}
          transition={{ duration: 1.1, ease: springEase }}
        >
          <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgWoman} />
          {/* Left-edge fade (matches Figma rotate-90 gradient on left side) */}
          <div className="absolute inset-y-0 left-0 w-[17%] bg-gradient-to-r from-black to-transparent pointer-events-none" />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-b from-transparent to-black pointer-events-none" />
        </motion.div>

        {/* Bonus iPhone at left=55.6%, top=13%, aspect 409/837 */}
        <motion.div
          className="absolute"
          style={{ left: '55.6%', top: '13%', width: '28.3%' }}
          variants={fadeScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.04 }}
          transition={{ duration: 1.1, delay: 0.12, ease: springEase }}
        >
          {/* Bonus iPhone is a full mockup — no frame overlay */}
          <img
            alt=""
            className="w-full h-auto pointer-events-none"
            src={imgBonusIPhone}
          />
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SHOP — text + 2 iPhones + man pill photo below
      ════════════════════════════════════════════════════════════════════ */}
      <motion.p
        className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        {fixText('В приложении есть внутренний магазин, где сотрудники могут покупать товары за баллы, полученные в системе лояльности. Внутреннюю валюту можно тратить на брендированные товары и предложения внутри платформы, а также использовать для получения скидок и частичной оплаты товаров и услуг у партнёров.')}
      </motion.p>

      {/* Two Shop iPhones side-by-side */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-[100px] w-full relative z-10 sm:-mb-[250px]">
        <Phone src={imgIPhone23} delay={0}    />
        <Phone src={imgIPhone24} delay={0.14} />
      </div>


      {/* ════════════════════════════════════════════════════════════════════
          BRAND STYLE — photo + text + invitation + 6 posters + 3 events + logo
      ════════════════════════════════════════════════════════════════════ */}

      {/* Brand style photo */}
      <motion.div
        className="relative overflow-hidden mx-auto z-0"
        style={{
          width: 'clamp(280px, 83vw, 1116px)',
          aspectRatio: '1116 / 744',
          borderRadius: 'clamp(93px, 28vw, 372px)',
        }}
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.04 }}
        transition={{ duration: 1.1, ease: springEase }}
      >
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgBrandPhoto} />
      </motion.div>

      <motion.p
        className="relative z-10 font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[16px] sm:text-[20px] text-white tracking-[-0.2px] w-full max-w-[568px]"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        {fixText('У ГИД есть фирменный стиль для внешних коммуникаций и оффлайн событий, а каждая версия приложения отмечается большим оффлайн мероприятием с сотнями гостей.')}
      </motion.p>

      {/* Invitation video */}
      <motion.div
        className="relative w-full sm:w-[629px] overflow-hidden"
        style={{ aspectRatio: '629 / 890' }}
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.1, ease: springEase }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          controlsList="nodownload"
        >
          <source
            src="https://www.dropbox.com/scl/fi/3tvwcwj25jdxhdhdbiyw6/ff07aae189a69e6488a25944e32418eb_72eac719-0619-411e-963c-f0e664bad2a6.mov?rlkey=k8pcjrwnvnx4pebzzdbkxnicd&st=g827si7j&dl=1"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* 6 brand posters — 2 per row on mobile, 6 in a row on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 sm:gap-[24px] w-full">
        {([imgBrand1, imgBrand2, imgBrand3, imgBrand4, imgBrand5, imgBrand6] as string[]).map((src, i) => (
          <motion.div
            key={i}
            className="relative w-full"
            style={{ aspectRatio: '355 / 502' }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.75, delay: i * 0.07, ease: springEase }}
          >
            <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[8px] sm:rounded-none" src={src} />
          </motion.div>
        ))}
      </div>

      {/* 3 event cards */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-[60px] w-full">
        {([imgBrandEvent1, imgBrandEvent2, imgBrandEvent3] as string[]).map((src, i) => (
          <motion.div
            key={i}
            className="relative shrink-0"
            style={{ width: 'clamp(140px, 25vw, 401px)', aspectRatio: '1 / 1' }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: i * 0.1, ease: springEase }}
          >
            <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={src} />
          </motion.div>
        ))}
      </div>

      {/* GID 4.0 event logo */}
      <motion.div
        className="relative w-full sm:w-[704px]"
        style={{ aspectRatio: '704 / 352' }}
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, ease: springEase }}
      >
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgBrand40} />
      </motion.div>

    </div>
  );
}
