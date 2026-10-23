import images from '@/generated/images.json';
import type { TeamMember } from '@/content/team';

type ImageEntry = { widths: number[]; formats: string[] };

/**
 * Site path of a member's largest built portrait (the JPEG fallback), for
 * Person JSON-LD. Built by `scripts/build-images.mjs`, so the size follows
 * the source photo.
 */
export function photoPath(member: TeamMember): string | undefined {
  const entry = (images as Record<string, ImageEntry>)[member.photo];
  const width = entry?.widths.at(-1);
  const format = entry?.formats.at(-1);
  if (!entry || !width || !format) return undefined;
  const [group, file] = member.photo.split('/');
  return `/img/${group}/${file}-${width}.${format}`;
}
