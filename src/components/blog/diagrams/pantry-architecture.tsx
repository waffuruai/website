import { cn } from '@/lib/utils';

/*
 * How Pantry works, as a diagram for the blog (DESIGN.md's diagram rules):
 * the machine it runs on inside a dashed boundary, the wscanner binary and
 * its SQLite cache in gold (built), the open data it asks in blue (systems
 * we do not own), and the one thing that crosses the boundary on the arrow.
 * Plain HTML and CSS, so it follows the theme and reads in any width; the
 * figure caption carries the text alternative.
 */

const SOURCES = [
  'Runtimes and compilers, every version',
  'Global packages: pip, npm, cargo, gems, Homebrew',
  'Apps, browsers and OS updates',
  'AI coding tools: MCP servers, plugins, skills',
  'Trust stores',
  'Repos: lockfiles, git history, container images',
];

const OPEN_DATA = [
  'OSV.dev',
  'CISA KEV',
  'endoflife.date',
  'OpenSSF malicious packages',
  'Vendor release feeds',
];

function Label({ index, children }: { index: string; children: string }) {
  return (
    <p className="label-mono text-[11px] text-muted-foreground">
      {index} {children}
    </p>
  );
}

function Node({
  title,
  body,
  kind = 'built',
  className,
}: {
  title: string;
  body?: string;
  kind?: 'built' | 'external' | 'plain';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card px-4 py-3',
        kind === 'built' && 'border-brand',
        kind === 'external' && 'border-external/70',
        kind === 'plain' && 'border-foreground/10',
        className,
      )}
    >
      <p
        className={cn(
          'text-[14px] font-medium',
          kind === 'external' ? 'text-external' : 'text-foreground',
        )}
      >
        {title}
      </p>
      {body && (
        <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
          {body}
        </p>
      )}
    </div>
  );
}

/** Down arrow between steps on the machine. */
const Down = () => (
  <span aria-hidden className="mx-auto block h-6 w-px bg-foreground/25" />
);

export function PantryArchitecture() {
  return (
    <figure className="not-prose my-10">
      <div className="rounded-2xl border border-foreground/10 bg-background p-5 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-serif text-[28px] leading-none text-foreground">
              How Pantry <em className="text-brand-ink">works</em>
            </p>
            <p className="mt-2 text-sm text-soft">
              Everything runs on your machine. Only names and versions cross the
              line.
            </p>
          </div>
          <ul className="flex flex-col gap-1.5 font-mono text-[11px] text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="size-3 rounded-sm border border-brand" /> Pantry
              (built)
            </li>
            <li className="flex items-center gap-2">
              <span className="size-3 rounded-sm border border-external" />{' '}
              External, not ours
            </li>
            <li className="flex items-center gap-2">
              <span className="size-3 rounded-sm border border-dashed border-foreground/50" />{' '}
              Your machine
            </li>
          </ul>
        </div>

        <div className="mt-8 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.6fr)]">
          <div className="rounded-2xl border border-dashed border-foreground/40 p-4 md:p-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label index="1">What is installed</Label>
                <ul className="flex flex-col gap-1.5">
                  {SOURCES.map((source) => (
                    <li
                      key={source}
                      className="rounded-lg border border-foreground/10 bg-card px-3 py-1.5 text-[13px] text-soft"
                    >
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <Label index="2">Pantry</Label>
                <Node
                  title="wscanner"
                  body="One static Rust binary. Inventories, asks, reports."
                />
                <Down />
                <Node
                  title="SQLite cache"
                  body="Advisories, findings and every run, on your disk."
                />
                <Down />
                <Node
                  title="Report and plan"
                  body="Only what applies, with the version that fixes it."
                  kind="plain"
                />
                <Down />
                <Node
                  title="Fix"
                  body="Safe, user-level updates run; sudo and code changes are printed for you."
                  kind="plain"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 text-center lg:w-36">
            <span
              aria-hidden
              className="font-mono text-lg text-brand-ink lg:rotate-0"
            >
              ⇄
            </span>
            <p className="font-mono text-[11px] leading-snug text-muted-foreground">
              3 Names and versions only
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Label index="4">Open data</Label>
            {OPEN_DATA.map((source) => (
              <Node key={source} title={source} kind="external" />
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        Pantry takes stock of what is installed and every repo, asks open
        vulnerability data about those exact versions, keeps the answers in a
        local SQLite cache, and reports and fixes only what applies. File
        contents, paths and secrets stay on your machine.
      </figcaption>
    </figure>
  );
}
