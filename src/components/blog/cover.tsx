import images from '@/generated/images.json';
import { Picture } from '@/components/picture';
import { cn } from '@/lib/utils';

type ImageEntry = { widths: number[]; formats: string[] };

const manifest = images as Record<string, ImageEntry>;

/**
 * Public URL of the largest built size of an image (for Open Graph and
 * JSON-LD, which need one URL rather than a srcset).
 */
export function coverSrc(name: string): string {
  const entry = manifest[name];
  if (!entry) throw new Error(`Cover: no built image named "${name}"`);
  const [, group = '', file = ''] = name.match(/^(.*)\/([^/]+)$/) ?? [];
  const width = entry.widths.at(-1);
  const format = entry.formats.at(-1) ?? 'jpg';
  return `/img/${group}/${file}-${width}.${format}`;
}

/** A post's cover image (a `<Picture>` manifest key) in a rounded frame. */
export function PostCover({
  name,
  alt = '',
  sizes,
  priority,
  className,
}: {
  name: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Picture
      name={name}
      alt={alt}
      sizes={sizes}
      priority={priority}
      className={cn(
        'block overflow-hidden rounded-2xl border border-foreground/10 bg-card',
        className,
      )}
      imgClassName="w-full"
    />
  );
}
