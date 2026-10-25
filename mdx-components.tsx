import type { MDXComponents } from 'mdx/types';
import Image, { type ImageProps } from 'next/image';

import { MdxFigure, Pre } from '@/components/blog/code-block';
import { LocalizedLink } from '@/components/localized-link';
import { slugify, textOf } from '@/lib/headings';
import { cn } from '@/lib/utils';

/**
 * Internal links keep the visitor's language and navigate client-side; web
 * links open in a new tab (see `LocalizedLink`).
 */
function MdxLink({ href = '', ...props }: React.ComponentPropsWithoutRef<'a'>) {
  return <LocalizedLink href={href} {...props} />;
}

/**
 * `##` and `###` headings are links to themselves (the ids come from
 * `rehype-slug`; the slug fallback covers pages compiled without it). The
 * anchor opts out of the prose link style and shows a `#` on hover or focus.
 */
function heading(Tag: 'h2' | 'h3') {
  return function MdxHeading({
    id,
    children,
    ...props
  }: React.ComponentPropsWithoutRef<'h2'>) {
    const anchor = id ?? (slugify(textOf(children)) || undefined);
    return (
      <Tag id={anchor} {...props}>
        {anchor ? (
          <a
            href={`#${anchor}`}
            className="not-prose text-inherit no-underline after:ml-2 after:text-[0.6em] after:text-faint after:opacity-0 after:transition-opacity after:content-['#'] hover:after:opacity-100 focus-visible:after:opacity-100"
          >
            {children}
          </a>
        ) : (
          children
        )}
      </Tag>
    );
  };
}

/** Raw <img> from markdown has unknown dimensions, so next/image can't be used. */
function MdxImg({
  className,
  alt = '',
  ...props
}: React.ComponentPropsWithoutRef<'img'>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn('mx-auto h-auto max-w-full rounded-xl', className)}
      {...props}
    />
  );
}

/** A block-level image with a caption taken from its alt text. */
function Captioned({
  alt,
  children,
}: {
  alt?: string;
  children: React.ReactNode;
}) {
  return (
    <figure>
      {children}
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  );
}

/** `<Image>` in a post: rounded, responsive, captioned from its alt text. */
function MdxImage({ className, alt, ...props }: ImageProps) {
  return (
    <Captioned alt={alt}>
      <Image
        alt={alt}
        sizes="(min-width: 768px) 768px, 100vw"
        className={cn('mx-auto h-auto w-full rounded-xl', className)}
        {...props}
      />
    </Captioned>
  );
}

/** A paragraph holding only a markdown image becomes a captioned figure. */
function MdxParagraph({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  const only =
    Array.isArray(children) && children.length === 1 ? children[0] : children;
  if (
    only &&
    typeof only === 'object' &&
    'type' in only &&
    only.type === MdxImg
  ) {
    const alt = (only.props as { alt?: string }).alt;
    return <Captioned alt={alt}>{only}</Captioned>;
  }
  return <p {...props}>{children}</p>;
}

/** Wide tables scroll inside the column instead of the page. */
function MdxTable(props: React.ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <table {...props} className={cn('my-0', props.className)} />
    </div>
  );
}

/** Embeds (YouTube etc.) scale to the column width at 16:9. */
function MdxIframe({
  className,
  title = 'Embedded content',
  ...props
}: React.ComponentPropsWithoutRef<'iframe'>) {
  return (
    <span className="not-prose my-8 block aspect-video w-full overflow-hidden rounded-xl">
      <iframe
        title={title}
        loading="lazy"
        className={cn('size-full border-0', className)}
        {...props}
      />
    </span>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: MdxLink,
    h2: heading('h2'),
    h3: heading('h3'),
    pre: Pre,
    figure: MdxFigure,
    img: MdxImg,
    p: MdxParagraph,
    table: MdxTable,
    iframe: MdxIframe,
    Image: MdxImage,
  };
}
