/**
 * fixText — утилита нормализации «битого» текста из Figma-экспорта.
 *
 * Figma иногда экспортирует текст с символами из нестандартных
 * Unicode-блоков (Cyrillic Extended-C, Mathematical Alphanumeric,
 * Private Use Area и др.), которые отсутствуют в большинстве шрифтов
 * и отображаются как «тофу»-квадраты (◆◆).
 *
 * Стратегия:
 *  1. NFC-нормализация (объединяет составные символы)
 *  2. Замена символов из Cyrillic Extended-C (U+1C80–U+1C8F) на стандартные
 *  3. Замена визуально-идентичных Unicode-копий латиницы/кириллицы
 *  4. Удаление символов из Private Use Area (U+E000–U+F8FF, U+F0000–U+FFFFF)
 *  5. Удаление суррогатных пар, попавших в строку как одиночные code unit-ы
 *  6. Привязка висячих предлогов/союзов неразрывным пробелом (U+00A0)
 */

// ── Cyrillic Extended-C → стандартная кириллица ──────────────────────────────
const CYRILLIC_EXTENDED_C: Record<number, string> = {
  0x1c80: '\u0432', // ᲀ → в (rounded ve)
  0x1c81: '\u0434', // ᲁ → д (long-legged de)
  0x1c82: '\u043e', // ᲂ → о (narrow o)
  0x1c83: '\u0441', // ᲃ → с (wide es)
  0x1c84: '\u0442', // ᲄ → т (tall te)
  0x1c85: '\u0442', // ᲅ → т (three-legged te)
  0x1c86: '\u044a', // ᲆ → ъ (tall hard sign)
  0x1c87: '\u0463', // ᲇ → ѣ (tall yat)
  0x1c88: '\ua64b', // ᲈ → ꙋ (unblended uk)
};

// ── Кириллица Extended-A (U+2DE0–U+2DFF) — объединяющие, обычно лишние ───────
// Они уже обрабатываются NFC-нормализацией, дополнительно не нужны.

// ── Визуальные «клоны» латинских/кириллических букв из других блоков ──────────
// Модифицированные кириллические из Cyrillic Extended-B (U+A640–U+A69F)
const CYRILLIC_EXTENDED_B: Record<number, string> = {
  0xa64a: '\u043e', // Ꙋ → О (round omega)  -- uppercase
  0xa64b: '\u043e', // ꙋ → о (round omega) -- lowercase
  0xa656: '\ua656', // keep Ꙗ (no good substitute)
  0xa657: '\ua657',
};

// ── Mathematical Alphanumeric Symbols (U+1D400–U+1D7FF) — жирные/курсивные ───
// Каждый такой символ — декоративный «клон» Latin/Greek, кириллицы там нет.
// Обрабатываем через диапазон в основной функции.

function codePointToStandard(cp: number): string | null {
  // Cyrillic Extended-C
  if (cp >= 0x1c80 && cp <= 0x1c8f) {
    return CYRILLIC_EXTENDED_C[cp] ?? null;
  }
  // Private Use Area (BMP)
  if (cp >= 0xe000 && cp <= 0xf8ff) return '';
  // Private Use Area (Supplementary)
  if (cp >= 0xf0000 && cp <= 0xfffff) return '';
  if (cp >= 0x100000 && cp <= 0x10fffd) return '';
  // Specials / Object Replacement / BOM / Zero-width
  if (cp === 0xfffc || cp === 0xfffd || cp === 0xfeff) return '';
  // Mathematical Alphanumeric (U+1D400–1D7FF): strip since no Cyrillic here
  if (cp >= 0x1d400 && cp <= 0x1d7ff) return '';
  // Lone surrogates that ended up in the string
  if (cp >= 0xd800 && cp <= 0xdfff) return '';
  return null;
}

// ── Висячие предлоги ──────────────────────────────────────────────────────────
//
// Список предлогов, союзов и частиц, которые не должны оставаться
// в одиночестве в конце строки. После каждого слова из списка пробел
// заменяется на неразрывный (U+00A0), чтобы браузер не переносил строку
// между предлогом и следующим словом.
//
// Формат регулярного выражения:
//   (начало строки | обычный пробел/таб)(предлог)(обычный пробел)
//   → заменяем последний пробел на \u00A0
//
const HANGING_WORDS = [
  // ── 1 символ ──────────────────────────────────────────────────────
  'а', 'в', 'и', 'к', 'о', 'с', 'у',
  // ── 2 символа ─────────────────────────────────────────────────────
  'во', 'из', 'до', 'за', 'на', 'не', 'ни', 'об', 'от', 'по', 'со', 'то',
  'же', 'ли', 'бы', 'но', 'да', 'ко', 'ко',
  // ── 3 символа ─────────────────────────────────────────────────────
  'без', 'для', 'над', 'под', 'про', 'при', 'что', 'как', 'все', 'всё',
  'они', 'она', 'оно', 'ещё', 'еще', 'уже', 'или', 'вот', 'там', 'тут',
  'раз', 'чем', 'где', 'кто', 'его', 'ему', 'ней', 'них', 'нею',
  // ── 4 символа ─────────────────────────────────────────────────────
  'ведь', 'если', 'хотя', 'пока', 'лишь', 'зато', 'либо', 'дабы',
  'ради', 'чего', 'чему', 'него', 'нему', 'ними', 'были', 'быть',
  'этот', 'этой', 'этих', 'этим', 'того', 'тому', 'тоже', 'тогда',
  'когда', 'после',
].join('|');

// Регулярное выражение создаётся один раз (дорогая операция)
const HANG_RE = new RegExp(`(^|[ \\t])(${HANGING_WORDS}) `, 'gi');

/**
 * noHangingPrepositions(str)
 *
 * Заменяет пробел сразу после предлога/союза на неразрывный пробел (U+00A0),
 * предотвращая «висячий» предлог в конце строки.
 *
 * Пример:
 *   "работа в команде" → "работа в\u00A0команде"
 *   "сделано для людей" → "сделано для\u00A0людей"
 */
export function noHangingPrepositions(str: string): string {
  if (!str) return str;
  // Сбрасываем lastIndex на случай если функция вызывается многократно
  HANG_RE.lastIndex = 0;
  return str.replace(HANG_RE, '$1$2\u00A0');
}

/**
 * fixText(str) — принимает строку, возвращает «чистую» строку.
 */
export function fixText(str: string): string {
  if (!str) return str;

  // Шаг 1: NFC-нормализация
  let result = str.normalize('NFC');

  // Шаг 2: посимвольная замена проблемных code point-ов
  let out = '';
  for (const char of result) {
    const cp = char.codePointAt(0)!;
    const replacement = codePointToStandard(cp);
    if (replacement !== null) {
      out += replacement;
    } else {
      out += char;
    }
  }

  // Шаг 3: привязываем висячие предлоги неразрывным пробелом
  out = noHangingPrepositions(out);

  return out;
}

/**
 * useFixText — хук, возвращающий fixText-санитайзер.
 * Удобно использовать когда нужна реактивность или внутри useEffect.
 */
export function useFixText() {
  return fixText;
}

/**
 * fixNode — рекурсивно обходит React-children и чинит текстовые узлы.
 * Используется в SafeText/fixChildren.
 */
import React from 'react';

export function fixChildren(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') return fixText(child);
    if (typeof child === 'number') return child;
    if (React.isValidElement(child)) {
      const el = child as React.ReactElement<{ children?: React.ReactNode }>;
      if (el.props?.children != null) {
        return React.cloneElement(el, {
          children: fixChildren(el.props.children),
        } as Partial<typeof el.props>);
      }
    }
    return child;
  });
}
