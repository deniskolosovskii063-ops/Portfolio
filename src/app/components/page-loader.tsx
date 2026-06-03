import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router';

// ── Phrases ───────────────────────────────────────────────────────────────────
const PHRASES = [
  'Собираю кейсы',
  'Двигаю пиксели',
  'Выравниваю по сетке',
  'Ищу идеальный отступ',
  'Подкручиваю типографику',
  'Добавляю ещё один экран',
  'Почти закончил\u2026',
  'Проверяю ещё раз',
  'Теперь точно готово',
];

// Cyrillic pool for the scramble effect
const POOL = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯабвгдежзиклмнопрстуфхцчшщыэюя';

const PHRASE_MS   = 1900; // ms each phrase stays before cycling
const MIN_SHOW_MS = 2600; // minimum loader display time
const STAGGER_MS  = 42;   // ms delay between each character starting to scramble
const SCRAMBLE_MS = 370;  // ms duration each character scrambles before settling
const MAX_WAIT_MS = 6_000; // hard cap — страховка если Dropbox/CDN медленный

// ── Home page video URLs ──────────────────────────────────────────────────────
const HOME_VIDEO_URLS = [
  'https://www.dropbox.com/scl/fi/8x9o2ypvw3sgo7gdh5ocq/6582428af2e2e3dcffe3cfaaee40eed8_10b7857c-3527-4fdf-832a-48abdf756739-1.mp4?rlkey=aciaz24y4u7nsdfb2et8uxypc&dl=1',
  'https://www.dropbox.com/scl/fi/6msfngpelt75pqllwmw0j/gazprom_id.mp4?rlkey=d35ci80zhqgbldgc0txnp6q81&dl=1',
  'https://www.dropbox.com/scl/fi/z8q8slg8i0tp9xmjy4wek/Noveba.mp4?rlkey=orfe7umoay60zkf8x1t3ekmmi&dl=1',
  'https://www.dropbox.com/scl/fi/a2kliogzdrywvjt9bblsm/Zenit.mp4?rlkey=quj0pfsjmxv1wdcmr3067sb7l&dl=1',
  'https://www.dropbox.com/scl/fi/22qxdoik6xggtmelt42zl/MTS.mp4?rlkey=e2eyc3ttr9tt9kz2znaofy35s&dl=1',
];

// ── Cache helpers (only for non-home routes) ──────────────────────────────────
function visitKey(path: string) { return `_ldr_v1_${path}`; }
function wasVisited(path: string): boolean {
  try { return !!sessionStorage.getItem(visitKey(path)); } catch { return false; }
}
function markVisited(path: string) {
  try { sessionStorage.setItem(visitKey(path), '1'); } catch {}
}

// ── Scramble animation for a single phrase ────────────────────────────────────
function ScramblePhrase({ text }: { text: string }) {
  const [chars, setChars] = useState<Array<{ ch: string; settled: boolean }>>([]);

  useEffect(() => {
    const src = text.split('');
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      let anyPending = false;

      const next = src.map((ch, i) => {
        // Spaces and special glyphs appear immediately, no scramble
        if (ch === ' ' || ch === '\u2026' || ch === '\u2014') {
          return { ch, settled: true };
        }
        const charEnd = i * STAGGER_MS + SCRAMBLE_MS;
        if (elapsed >= charEnd) return { ch, settled: true };
        anyPending = true;
        return {
          ch: POOL[Math.floor(Math.random() * POOL.length)],
          settled: false,
        };
      });

      setChars(next);
      if (anyPending) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  // white-space: pre — preserves spaces between words correctly
  return (
    <span style={{ whiteSpace: 'pre' }}>
      {chars.map((c, i) => (
        <span
          key={i}
          style={{
            // Settled → bright white; scrambling → barely visible
            color: c.settled ? '#ffffff' : 'rgba(255,255,255,0.14)',
            transition: c.settled ? 'color 0.07s ease' : 'none',
          }}
        >
          {c.ch}
        </span>
      ))}
    </span>
  );
}

// ── Main loader component ────────────────────────────────────────────────────
export function PageLoader() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // For home: always show the loader (wait for videos every page load).
  // For other routes: use sessionStorage (skip if already visited in this tab session).
  const alreadyCached = isHome ? false : wasVisited(pathname);

  const [visible, setVisible] = useState(() => !alreadyCached);

  const [phraseIdx, setPhraseIdx] = useState(0);
  const mountedAt  = useRef(performance.now());
  const dismissed  = useRef(false);

  useEffect(() => {
    if (!visible) return;

    // Cycle phrases
    const cycleId = setInterval(
      () => setPhraseIdx(i => (i + 1) % PHRASES.length),
      PHRASE_MS,
    );

    const dismiss = () => {
      if (dismissed.current) return;
      dismissed.current = true;
      if (!isHome) {
        markVisited(pathname);
      }
      setVisible(false);
    };

    if (isHome) {
      // ── Home page: wait for all videos to fire canplay ───────────────────
      let readyCount = 0;
      const videos: HTMLVideoElement[] = [];
      const timeoutId = setTimeout(dismiss, MAX_WAIT_MS);

      const onReady = () => {
        readyCount++;
        const elapsed = performance.now() - mountedAt.current;
        if (readyCount >= HOME_VIDEO_URLS.length && elapsed >= MIN_SHOW_MS) {
          clearTimeout(timeoutId);
          dismiss();
        } else if (readyCount >= HOME_VIDEO_URLS.length) {
          // All videos ready but minimum display time not reached — wait the rest
          const remaining = MIN_SHOW_MS - elapsed;
          clearTimeout(timeoutId);
          setTimeout(() => dismiss(), Math.max(0, remaining));
        }
      };

      HOME_VIDEO_URLS.forEach(src => {
        const v = document.createElement('video');
        v.muted   = true;
        v.preload = 'auto';
        v.src     = src;
        v.addEventListener('canplay', onReady, { once: true });
        v.addEventListener('error',   onReady, { once: true });
        videos.push(v);
      });

      return () => {
        clearInterval(cycleId);
        clearTimeout(timeoutId);
        videos.forEach(v => { v.src = ''; v.load(); });
      };
    } else {
      // ── Other pages: check image load progress ────────────────────────────
      const tryDismiss = () => {
        if (dismissed.current) return;
        const imgs   = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
        const total  = imgs.length;
        // Count both successfully loaded and failed images as "settled" so a
        // single broken/lazy image cannot block the page forever.
        const loaded = imgs.filter(img => img.complete).length;
        const pct    = total === 0 ? 1 : loaded / total;
        const elapsed = performance.now() - mountedAt.current;

        // Hard cap for non-home pages too: never keep loader forever.
        if (elapsed >= MAX_WAIT_MS) {
          dismiss();
          return;
        }

        if (pct >= 0.3 && elapsed >= MIN_SHOW_MS) {
          dismiss();
        }
      };

      const checkId = setInterval(tryDismiss, 250);
      document.addEventListener('load', tryDismiss, true);

      return () => {
        clearInterval(cycleId);
        clearInterval(checkId);
        document.removeEventListener('load', tryDismiss, true);
      };
    }
  }, [visible, pathname, isHome]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 flex items-center justify-center select-none"
          style={{ zIndex: 9999, background: '#000000' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.15, 1] }}
        >
          {/* Phrase cycling — blur-reveal entrance exactly like BlurReveal component */}
          <AnimatePresence mode="wait">
            <motion.div
              key={phraseIdx}
              initial={{ opacity: 0, filter: 'blur(12px)', y: 18 }}
              animate={{ opacity: 1, filter: 'blur(0px)',  y: 0  }}
              exit={{    opacity: 0, filter: 'blur(8px)',  y: -16 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[28px] sm:text-[32px] font-normal tracking-[-0.96px] not-italic leading-[27px]"
              style={{ fontFamily: "'Lebowski', 'Inter', sans-serif" }}
            >
              <ScramblePhrase text={PHRASES[phraseIdx]} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}