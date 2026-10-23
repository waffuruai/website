import type { MDXComponents } from 'mdx/types';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';

import { slugify } from '@/lib/headings';
import { cn } from '@/lib/utils';

const isInternal = (href: string) =>
  href.startsWith('/') && !href.startsWith('//');

/** Internal links use client-side navigation; web links open in a new tab. */
function MdxLink({ href = '', ...props }: React.ComponentPropsWithoutRef<'a'>) {
  if (isInternal(href)) return <Link href={href} {...props} />;
  if (href.startsWith('#') || /^(mailto|tel):/i.test(href)) {
    return <a href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

/** Plain text of React children (for heading ids). */
function textOf(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return textOf(
      (node as React.ReactElement<{ children?: React.ReactNode }>).props
        .children,
    );
  }
  return '';
}

/** `##` headings get ids so the table of contents can link to them. */
function heading(Tag: 'h2' | 'h3') {
  return function MdxHeading({
    id,
    children,
    ...props
  }: React.ComponentPropsWithoutRef<'h2'>) {
    return (
      <Tag id={id ?? (slugify(textOf(children)) || undefined)} {...props}>
        {children}
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
    img: MdxImg,
    p: MdxParagraph,
    table: MdxTable,
    iframe: MdxIframe,
    Image: MdxImage,
  };
}
