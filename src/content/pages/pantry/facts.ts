/*
 * Facts about Pantry, our free, open-source vulnerability scanner. The
 * product is Pantry, the repository is waffuruai/pantry and the command,
 * crates and release assets are `wpantry`. Copy
 * lives in `pantry.ts`; nothing here translates. The terminal transcripts
 * follow wscanner's real output format (`python/wscanner/report.py`) with an
 * example machine's findings, and the page captions them as examples.
 *
 * Kept free of imports so the nav (a client component) can read the path
 * without pulling in the page's copy.
 */

const repo = 'https://github.com/waffuruai/pantry';

export const pantryFacts = {
  name: 'Pantry',
  command: 'wpantry',
  path: '/products/pantry',
  repo,
  releases: `${repo}/releases`,
  installGuide: `${repo}/blob/HEAD/docs/public/install.md`,
  /** The install script's source, to read before running it. */
  installScript: `${repo}/blob/HEAD/install.sh`,
  packslip: 'https://packslip.dev',
  /** The deep dive this page's "Learn more" points at. */
  post: '/blog/introducing-pantry',
  license: 'MIT',
  platforms: ['macOS', 'Linux'],
  install: {
    mise: 'mise use -g packslip:github.com/waffuruai/pantry',
    /** The latest release's script, verified and pinned by the release receiver (`releases/products.json`). */
    script: 'curl -fsSL https://waffuru.ai/pantry/install.sh | sh',
    verify: [
      'ASSET=wpantry-universal-apple-darwin  # Linux: wpantry-x86_64-unknown-linux-musl',
      'gh release download --repo waffuruai/pantry -p "$ASSET" -p SHA256SUMS -p packslip.sigstore.json',
      'grep " $ASSET$" SHA256SUMS | shasum -a 256 -c -',
      'packslip verify packslip.sigstore.json --artifact "$ASSET"',
      'gh attestation verify "$ASSET" --repo waffuruai/pantry',
      'install -m 0755 "$ASSET" ~/.local/bin/wpantry',
    ].join('\n'),
  },
  /**
   * Where Pantry's answers come from, in the order the page lists them. The
   * hosts are the ones wscanner contacts (its README, "What leaves the
   * machine"); GitHub advisories arrive through OSV.
   */
  sources: {
    osv: [{ label: 'OSV.dev', url: 'https://osv.dev' }],
    ghsa: [
      {
        label: 'GitHub Advisory Database',
        url: 'https://github.com/advisories',
      },
    ],
    kev: [
      {
        label: 'CISA Known Exploited Vulnerabilities',
        url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog',
      },
    ],
    eol: [{ label: 'endoflife.date', url: 'https://endoflife.date' }],
    malicious: [
      {
        label: 'OpenSSF malicious packages',
        url: 'https://github.com/ossf/malicious-packages',
      },
    ],
    vendors: [
      { label: 'Homebrew', url: 'https://formulae.brew.sh' },
      { label: 'Chrome', url: 'https://versionhistory.googleapis.com' },
      { label: 'Firefox', url: 'https://product-details.mozilla.org' },
      {
        label: 'PostgreSQL',
        url: 'https://www.postgresql.org/support/security/',
      },
      { label: 'Arch Linux', url: 'https://security.archlinux.org' },
      {
        label: 'VS Code Marketplace',
        url: 'https://marketplace.visualstudio.com',
      },
    ],
  },
  /** What to run once it is installed. */
  firstRun: ['wpantry', 'wpantry --update --dryrun'].join('\n'),
  /** One command per "who uses it" card, in order: people, agents, fleets. */
  uses: [
    'wpantry --update --dryrun',
    'wpantry --json --no-input',
    'wpantry --path . --no-machine --json',
  ],
  /** Transcript lines per step. `$ ` is a command, `# ` a comment. */
  transcripts: {
    install: [
      '$ mise use -g packslip:github.com/waffuruai/pantry',
      '# verifies the signed packslip, then the binary’s digest',
      '$ wpantry version',
      'wpantry 0.1.0 (rust, schema 1)',
    ],
    scan: [
      '$ wpantry',
      '==> Security scan (~/.cache/wpantry/wpantry.db)',
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
      '$ wpantry',
      '# same day: answers come from the local cache, so it takes seconds',
      '$ wpantry search "http2" --applicable',
      '# full-text search over cached advisories, offline',
      '$ sqlite3 -readonly ~/.cache/wpantry/wpantry.db .tables',
      'casks  eol  findings  kev  malicious  meta  queries  runs  vulns  …',
    ],
    fix: [
      '$ wpantry --update --dryrun',
      '==> Update plan (dry run: nothing is changed)',
      '  would run: brew upgrade node@20',
      '  would run: python3 -m pip install --upgrade requests',
      '  Also worth doing (warnings: outdated, or waiting on a vendor):',
      '    • pyenv install 3.13',
      '$ wpantry --update',
      '? Run these 2 updates now? [Y/n] y',
      '✓ nothing with a released fix applies; 1 warning(s) above',
    ],
  },
} as const;
