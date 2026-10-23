import Image from 'next/image';

import { site } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * The waffle mark, the serif "waffuru" wordmark and ワッフル beside it, as in
 * the After Hours header. The katakana hides below 390px so the header's
 * button never gets pushed off screen.
 */
export function Wordmark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2 sm:gap-3', className)}>
      <Image
        src="/img/brand/waffle-80.png"
        alt=""
        width={40}
        height={40}
        priority={priority}
        unoptimized
        className="size-10"
      />
      <span className="font-serif text-[30px] leading-none tracking-[-0.01em] lowercase">
        waffuru
      </span>
      <span
        lang="ja"
        className="text-muted-foreground hidden text-[13px] tracking-[0.04em] min-[390px]:inline sm:tracking-[0.1em]"
      >
        {site.kana}
      </span>
    </span>
  );
}
