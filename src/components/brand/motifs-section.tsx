import { BrandSection } from '@/components/brand/brand-section';
import {
  ButterMelt,
  IronPress,
  PantryJar,
  PantryShelf,
  SyrupDrips,
  WhiskSpin,
} from '@/components/sections/motifs';
import { TileDeco } from '@/components/sections/tile-deco';
import type { BrandContent, MotifKey } from '@/content/pages/brand';

/** Live CSS from `motifs.css`: nothing is an image, nothing needs script. */
function Motif({ kind }: { kind: MotifKey }) {
  switch (kind) {
    case 'jar':
      return <PantryJar size="md" className="mt-2" />;
    case 'shelf':
      return <PantryShelf size="md" />;
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
    case 'whisk':
      return <WhiskSpin size="md" className="mt-4" />;
    case 'drips':
      return <SyrupDrips size="md" />;
    case 'pat':
      return <ButterMelt size="md" className="mt-10" />;
    case 'stamps':
      return <IronPress size="md" />;
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
            className="flex flex-col gap-5 rounded-2xl border border-foreground/12 bg-card p-5"
          >
            <div
              aria-hidden
              className="flex h-44 items-center justify-center overflow-hidden rounded-xl border border-foreground/10 bg-background"
            >
              <Motif kind={item.key} />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-serif text-[28px] leading-[1.05]">
                {item.name}
              </h3>
              <p className="text-[15px] leading-[1.55] text-pretty text-muted-foreground">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </BrandSection>
  );
}
