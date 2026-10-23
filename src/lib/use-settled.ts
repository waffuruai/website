'use client';

import { useEffect, useRef, useState } from 'react';

const INTERACTIONS = [
  'pointerdown',
  'pointermove',
  'keydown',
  'scroll',
  'touchstart',
  'wheel',
] as const;

/**
 * `true` once the page has finished loading AND either the visitor has
 * interacted or `timeout` ms have passed. Use it to hold back third-party
 * scripts (gtag.js) so they never compete with loading and hydration: an
 * engaged visitor gets them at once, an idle tab a little later.
 *
 * `allow` is asked once, at that moment; if it returns `false` the hook
 * stays `false` for good.
 */
export function useSettled(timeout = 2000, allow?: () => boolean) {
  const [settled, setSettled] = useState(false);
  // Read through a ref so a new function identity never re-arms the timer.
  const allowRef = useRef(allow);
  useEffect(() => {
    allowRef.current = allow;
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const controller = new AbortController();
    const { signal } = controller;

    const finish = () => {
      controller.abort();
      clearTimeout(timer);
      setSettled(allowRef.current ? allowRef.current() : true);
    };

    const arm = () => {
      timer = setTimeout(finish, timeout);
      for (const type of INTERACTIONS) {
        window.addEventListener(type, finish, { passive: true, signal });
      }
    };

    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true, signal });

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [timeout]);

  return settled;
}
