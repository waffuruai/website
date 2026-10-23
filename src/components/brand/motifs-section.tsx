import { BrandSection } from '@/components/brand/brand-section';
import { TileDeco } from '@/components/sections/tile-deco';
import type { BrandContent, MotifKey } from '@/content/pages/brand';

/** A 4x4 grid index as [row, column]. */
const GRID = Array.from({ length: 16 }, (_, i) => [Math.floor(i / 4), i % 4]);

/** Live CSS from `motifs.css`: nothing is an image, nothing needs script. */
function Motif({ kind }: { kind: MotifKey }) {
  switch (kind) {
    case 'tiles':
      return (
        <TileDeco
          size={4}
          hot={[
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 0],
          ]}
          className="w-[132px]"
        />
      );
    case 'stamps':
      return (
        <div className="grid w-[116px] grid-cols-4 gap-1.5">
          {GRID.map(([row, column]) => (
            <div
              key={`${row}-${column}`}
              className="wf-stamp"
              style={{
                animationDelay: `${((row + column) * 0.12).toFixed(2)}s`,
              }}
            />
          ))}
        </div>
      );
    case 'pat':
      return (
        <div className="flex h-full items-end pb-8">
          <div className="wf-pat" />
        </div>
      );
    case 'leds':
      return (
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="wf-led"
              style={{
                animationDelay: `${(((i * 5) % 12) * 0.33).toFixed(2)}s`,
              }}
            />
          ))}
        </div>
      );
    case 'drip':
      return (
        <div className="relative h-32 w-6">
          <div className="wf-drip" />
          <div className="wf-drop" />
        </div>
      );
  }
}

/** The motif gallery: each motif running, with a line on where it is used. */
export function MotifsSection({
  content,
}: {
  content: BrandContent['motifs'];
}) {
  return (
    <BrandSection id="motifs" title={content.title} intro={content.intro}>
      <ul role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item) => (
          <li
            key={item.key}
            className="border-foreground/12 bg-card flex flex-col gap-5 rounded-2xl border p-5"
          >
            <div
              aria-hidden
              className="border-foreground/10 bg-background flex h-44 items-center justify-center overflow-hidden rounded-xl border"
            >
              <Motif kind={item.key} />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-serif text-[28px] leading-[1.05]">
                {item.name}
              </h3>
              <p className="text-muted-foreground text-[15px] leading-[1.55] text-pretty">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </BrandSection>
  );
}
