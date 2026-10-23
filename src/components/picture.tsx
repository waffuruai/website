import images from '@/generated/images.json';
import { cn } from '@/lib/utils';

type ImageEntry = {
  width: number;
  height: number;
  widths: number[];
  formats: string[];
};

const manifest = images as Record<string, ImageEntry>;

const MIME: Record<string, string> = {
  avif: 'image/avif',
  webp: 'image/webp',
  jpg: 'image/jpeg',
  png: 'image/png',
};

/**
 * A responsive `<picture>` for images built by `scripts/build-images.mjs`:
 * AVIF and WebP sources with width descriptors, and a JPEG/PNG fallback.
 * Width and height come from the original, so the browser reserves space
 * and nothing shifts while loading.
 *
 * `name` is the manifest key, e.g. `team/kyle-croll`.
 */
export function Picture({
  name,
  alt,
  sizes,
  priority = false,
  className,
  imgClassName,
}: {
  name: string;
  alt: string;
  /** The `sizes` attribute: how wide the image renders at each breakpoint. */
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const entry = manifest[name];
  if (!entry) throw new Error(`Picture: no built image named "${name}"`);

  const [, group = '', file = ''] = name.match(/^(.*)\/([^/]+)$/) ?? [];
  const srcset = (format: string) =>
    entry.widths
      .map((w) => `/img/${group}/${file}-${w}.${format} ${w}w`)
      .join(', ');
  const fallback = entry.formats.at(-1) ?? 'jpg';
  const modern = entry.formats.filter((format) => format !== fallback);

  return (
    <picture className={className}>
      {modern.map((format) => (
        <source
          key={format}
          type={MIME[format]}
          srcSet={srcset(format)}
          sizes={sizes}
        />
      ))}
      <img
        src={`/img/${group}/${file}-${entry.widths.at(-1)}.${fallback}`}
        srcSet={srcset(fallback)}
        sizes={sizes}
        alt={alt}
        width={entry.width}
        height={entry.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        className={cn('h-auto', imgClassName)}
      />
    </picture>
  );
}
