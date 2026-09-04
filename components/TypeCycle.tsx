"use client";

import { useEffect, useRef } from "react";

const TYPE_MS = 110; // per character while typing
const DELETE_MS = 55; // faster on the way out, the way real backspacing feels
const HOLD_MS = 1600; // how long a finished word sits before it is rewound
const RESTART_MS = 400;

/** How many leading characters two words share, floored at one so a pair with
 *  nothing in common still leaves a single character standing. */
function sharedPrefix(a: string, b: string): number {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i += 1;
  return Math.max(i, 1);
}

/**
 * Types a word out a character at a time, pauses, rewinds only as far as the
 * next word's shared prefix, then types forward into that one — forever.
 * "defacto" rewinds to "defa" and grows into "default", so the braces around it
 * are never empty.
 *
 * `reserve` holds the field at the width of the widest word. That matters where
 * something follows the word on the same line (the home hero's closing brace)
 * or the line is centred and would otherwise slide on every keystroke. Pass
 * false where the caret is the last thing on the line — the reservation would
 * strand it to the right of the text.
 */
export default function TypeCycle({
  words,
  className,
  reserve = true,
}: {
  words: string[];
  className?: string;
  reserve?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || words.length === 0) return;

    let timer: number | undefined;
    let resizeTimer: number | undefined;
    let cancelled = false;

    // Measured, never computed in ch: a ch is the width of "0", wider than
    // lowercase in most proportional faces, which would leave a permanent gap
    // before the brace. The longest word is not always the widest one either.
    const reserveWidth = (current: string) => {
      if (!reserve) return;
      node.style.minWidth = "";
      let widest = 0;
      for (const word of words) {
        node.textContent = word;
        widest = Math.max(widest, node.getBoundingClientRect().width);
      }
      node.textContent = current;
      node.style.minWidth = `${widest.toFixed(2)}px`;
    };

    const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let cleanupResize: (() => void) | undefined;

    const run = () => {
      if (cancelled) return;

      // Asked the OS for less motion: the first word, held still.
      if (still) {
        node.textContent = words[0];
        reserveWidth(words[0]);
        return;
      }

      let wordIndex = 0;
      let charCount = 0;
      let deleting = false;
      reserveWidth("");

      // The headline is clamp()-sized against the viewport, so a reserved width
      // is only right for the width it was measured at.
      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => reserveWidth(node.textContent ?? ""), 150);
      };
      window.addEventListener("resize", onResize);
      cleanupResize = () => window.removeEventListener("resize", onResize);

      const tick = () => {
        if (cancelled) return;
        const word = words[wordIndex];
        const nextWord = words[(wordIndex + 1) % words.length];
        let delay: number;

        if (deleting) {
          charCount -= 1;
          delay = DELETE_MS;
          if (charCount <= sharedPrefix(word, nextWord)) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = RESTART_MS;
          }
        } else {
          charCount += 1;
          delay = TYPE_MS;
          if (charCount >= word.length) {
            deleting = true;
            delay = HOLD_MS;
          }
        }

        node.textContent = words[wordIndex].slice(0, Math.max(charCount, 0));
        timer = window.setTimeout(tick, delay);
      };

      tick();
    };

    // Measuring before the webfont lands would size the field to the fallback.
    if (document.fonts?.ready) {
      document.fonts.ready.then(run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.clearTimeout(resizeTimer);
      cleanupResize?.();
    };
  }, [words, reserve]);

  return <span className={className} ref={ref} />;
}
