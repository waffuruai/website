/*
 * Facts about Pantry, our free, open-source vulnerability scanner. The
 * product is Pantry; the command and the repository are `wscanner`. Copy
 * lives in `pantry.ts`; nothing here translates. The terminal transcripts
 * follow wscanner's real output format (`python/wscanner/report.py`) with an
 * example machine's findings, and the page captions them as examples.
 *
 * Kept free of imports so the nav (a client component) can read the path
 * without pulling in the page's copy.
 */

const repo = 'https://github.com/waffuruai/wscanner';

// TODO(founder): once the first release is signed with packslip, publish its
// signer fingerprint here and add `--pin <fingerprint>` to the command.
export const pantryFacts = {
  name: 'Pantry',
  command: 'wscanner',
  path: '/products/pantry',
  repo,
  releases: `${repo}/releases`,
  installGuide: `${repo}/blob/main/docs/public/install.md`,
  packslip: 'https://packslip.dev',
  /** The deep dive this page's "Learn more" points at. */
  post: '/blog/introducing-pantry',
  license: 'Apache-2.0',
  platforms: ['macOS', 'Linux'],
  install: {
    packslip: 'packslip install github.com/waffuruai/wscanner',
    verify: [
      'ASSET=wscanner-universal-apple-darwin  # Linux: wscanner-x86_64-unknown-linux-musl',
      'gh release download --repo waffuruai/wscanner -p "$ASSET" -p SHA256SUMS',
      'grep " $ASSET$" SHA256SUMS | shasum -a 256 -c -',
      'gh attestation verify "$ASSET" --repo waffuruai/wscanner',
      'install -m 0755 "$ASSET" ~/.local/bin/wscanner',
    ].join('\n'),
    cargo: 'cargo install --locked wscanner-cli',
  },
  /** What to run once it is installed. */
  firstRun: ['wscanner', 'wscanner --update --dryrun'].join('\n'),
  /** One command per "who uses it" card, in order: people, agents, fleets. */
  uses: [
    'wscanner --update --dryrun',
    'wscanner --json --no-input',
    'wscanner --path . --no-machine --json',
  ],
  /** Transcript lines per step. `$ ` is a command, `# ` a comment. */
  transcripts: {
    install: [
      '$ packslip install github.com/waffuruai/wscanner',
      '# checks the release signature, then the SHA-256 of the download',
      '$ wscanner version',
      'wscanner 0.1.0 (rust, schema 1)',
    ],
    scan: [
      '$ wscanner',
      '==> Security scan (~/.cache/wscanner/wscanner.db)',
      '  checked 9 git repos, 214 tools, runtimes and packages',
      '  ✗ runtime  node 20.11.0  (/opt/homebrew/bin/node)',
      '      CVE-2024-27983 HIGH  HTTP/2 server crash',
      '      fixed in 20.12.1',
      '  ✗ pip      requests 2.31.0  (~/.local/lib/python3.12)',
      '      CVE-2024-35195 MEDIUM  verify=False sticks to the session',
      '      fixed in 2.32.0',
      '  ⚠ eol      python 3.8.18  (~/.pyenv/versions/3.8.18)',
      '✗ 2 thing(s) to update (2 advisories), 1 warning(s).',
    ],
    cache: [
      '$ wscanner',
      '# same day: answers come from the local cache, so it takes seconds',
      '$ wscanner search "http2" --applicable',
      '# full-text search over cached advisories, offline',
      '$ sqlite3 -readonly ~/.cache/wscanner/wscanner.db .tables',
      'casks  eol  findings  kev  malicious  meta  queries  runs  vulns  …',
    ],
    fix: [
      '$ wscanner --update --dryrun',
      '==> Update plan (dry run: nothing is changed)',
      '  would run: brew upgrade node@20',
      '  would run: python3 -m pip install --upgrade requests',
      '  Also worth doing (warnings: outdated, or waiting on a vendor):',
      '    • pyenv install 3.13',
      '$ wscanner --update',
      '✓ nothing with a released fix applies; 1 warning(s) above',
    ],
  },
} as const;
