import { interpolate } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';

const linkClass =
  'label-mono border-foreground/20 text-soft hover:border-foreground/50 hover:text-foreground focus-visible:ring-ring inline-flex h-10 items-center rounded-full border px-4 transition-colors outline-none focus-visible:ring-2';

/** Share a post on X or LinkedIn with plain links (no scripts, no embeds). */
export function ShareLinks({
  title,
  url,
  blog,
}: {
  title: string;
  url: string;
  blog: Dictionary['blog'];
}) {
  const encodedUrl = encodeURIComponent(url);
  const networks = [
    {
      name: 'X',
      href: `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3" data-section="share">
      <span className="label-mono text-muted-foreground">{blog.share}</span>
      {networks.map((network) => (
        <a
          key={network.name}
          href={network.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={interpolate(blog.shareOn, { network: network.name })}
          className={linkClass}
        >
          {network.name}
        </a>
      ))}
    </div>
  );
}
