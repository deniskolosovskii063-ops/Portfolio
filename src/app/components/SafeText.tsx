/**
 * SafeText — универсальная обёртка для текстовых блоков из Figma-экспорта.
 *
 * Автоматически:
 *  • Чинит битые символы (Cyrillic Extended-C, Private Use Area, суррогаты)
 *  • Привязывает висячие предлоги/союзы неразрывным пробелом (U+00A0),
 *    чтобы «в», «и», «на», «для», «без» и др. не оставались одни в конце строки
 *  • Рекурсивно обходит вложенные элементы (<span>, <br/> и т.д.)
 *  • Полностью прозрачна в рендере (рендерит children напрямую)
 *
 * Использование:
 *   <SafeText as="p" className="...">
 *     Авторизация — критическая точка пользовательского пути...
 *   </SafeText>
 *
 * Также работает на чистых строках через fixText():
 *   {fixText('работа в команде')} → 'работа в\u00A0команде'
 */
import React from 'react';
import { fixChildren } from '../utils/fixText';

type AsProp = keyof JSX.IntrinsicElements;

interface SafeTextProps<T extends AsProp = 'span'> {
  as?: T;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export function SafeText<T extends AsProp = 'span'>({
  as,
  children,
  ...rest
}: SafeTextProps<T>) {
  const Tag = (as ?? 'span') as AsProp;
  const fixed = fixChildren(children);
  return React.createElement(Tag, rest, fixed);
}
