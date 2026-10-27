import type { Localized } from '@/content/types';

import pantryEs from './pantry.es';
import pantryFr from './pantry.fr';
import pantryJa from './pantry.ja';
import pantryKo from './pantry.ko';
import pantryZh from './pantry.zh';
import type { PantryContent } from './types';

/*
 * Copy for /products/pantry. Facts (commands, transcripts, links) are in
 * `facts.ts`. Everything here describes the shipped release; the founder
 * confirmed Rust, signed and hashed releases, packslip and GitHub attestation
 * verification, no telemetry and no AI for launch.
 */
export const pantry: Localized<PantryContent> = {
  en: {
    seo: {
      title: 'Pantry: free vulnerability scanner for macOS and Linux',
      description:
        'Pantry finds the vulnerabilities that actually apply to your machine and fixes what it safely can. Free and open source, written in Rust. No telemetry, no AI.',
      keywords: [
        'vulnerability scanner',
        'CVE scanner',
        'open source security scanner',
        'patch vulnerabilities macOS',
        'Linux vulnerability scanner',
        'OSV',
        'CISA KEV',
        'wscanner',
      ],
    },
    hero: {
      label: 'Free · Open source · macOS and Linux',
      title: 'From exposed to *patched*, in minutes.',
      lede: 'Pantry checks everything installed on your Mac or Linux machine, and every repo on it, against open vulnerability data. It reports only what actually applies, names the version that fixes it, and applies the fixes it safely can.',
      primary: 'Secure your system',
      secondary: 'Learn more',
      source: 'View the source',
      windows: 'Windows support is planned.',
      windowsLink: 'Tell us you need it',
    },
    how: {
      title: 'Install. Scan. Cache. *Fix.*',
      intro:
        'One small binary does the whole job on your machine. Only package names and versions ever leave it.',
      caption: 'Example output from one machine. Yours will differ.',
      stepsLabel: 'How Pantry works',
      pause: 'Pause',
      play: 'Play',
      steps: [
        {
          id: 'install',
          label: 'Install',
          title: 'Verified before it runs',
          body: 'Pantry can read your whole home directory, so every release is signed, hashed and built reproducibly. packslip or GitHub checks the download before it ever runs.',
          flow: ['Signed release', 'Signature + SHA-256', 'Your machine'],
          note: 'A download that fails either check is never installed.',
        },
        {
          id: 'scan',
          label: 'Scan',
          title: 'Only what applies',
          body: 'Pantry takes stock of your runtimes, packages, apps and every repo lockfile, then asks OSV.dev, CISA KEV and endoflife.date about those exact versions. Nothing you have not installed gets reported.',
          flow: [
            'Your machine',
            'Names + versions',
            'OSV.dev · CISA KEV · endoflife.date',
          ],
          note: 'File contents, paths and secrets never leave your machine.',
        },
        {
          id: 'cache',
          label: 'Cache',
          title: 'Seconds, the second time',
          body: 'Answers land in a SQLite database on your disk, along with a record of every run. A second scan the same day takes seconds, and you can search the advisories offline.',
          flow: ['Open data', 'SQLite on your disk', 'Your next scan'],
          note: 'The cache is yours: plain SQLite you can query read-only.',
        },
        {
          id: 'fix',
          label: 'Fix',
          title: 'Fixes you can trust',
          body: 'Preview the plan, then let Pantry run the safe, user-level updates and check again. Anything that needs sudo or a code change is printed for you to run.',
          flow: ['The plan', 'Safe updates run', 'Checked again'],
          note: 'Pantry never runs sudo and never edits your code.',
        },
      ],
    },
    install: {
      title: 'Secure your *system*.',
      intro:
        'Choose how much you want to check yourself. Every route verifies the release before anything runs.',
      methods: [
        {
          id: 'packslip',
          label: 'One line',
          title: 'With packslip',
          body: 'Downloads the build for your platform and checks its signature and SHA-256 before installing it.',
          link: 'What is packslip?',
        },
        {
          id: 'verify',
          label: 'By hand',
          title: 'Verify it yourself',
          body: 'Download the binary, check it against SHA256SUMS and its GitHub build attestation, then install it. A cosign bundle ships too.',
          link: 'Full install guide',
        },
        {
          id: 'cargo',
          label: 'From source',
          title: 'Build it with cargo',
          body: 'Builds from crates.io with the exact dependency versions in the lockfile. Needs a Rust toolchain and a C compiler.',
        },
      ],
      then: 'Then scan, and see the plan:',
    },
    checks: {
      title: 'Everything on the *shelves*.',
      intro:
        'A pantry check covers what you have, what is past its date and what has been recalled. So does Pantry.',
      items: [
        {
          title: 'Everything installed',
          body: 'Runtimes and compilers (every version your version managers keep), package managers, CLI tools, datastores, Docker, Homebrew and global packages.',
        },
        {
          title: 'Every repo’s lockfile',
          body: 'Cargo, npm, pnpm, yarn, bun, Go, uv, poetry, pip, Bundler, Composer and more, before vulnerable code ships.',
        },
        {
          title: 'Malware, not just CVEs',
          body: 'Every package name against the OpenSSF malicious-packages index, and editor extensions against VS Code’s malicious list.',
        },
        {
          title: 'Leaked secrets',
          body: 'Credentials committed anywhere in a repo’s git history, reported redacted.',
        },
        {
          title: 'Your AI coding tools',
          body: 'What Claude Code, Codex, Cursor, Gemini CLI and other agents actually run: their MCP servers, plugins, skills and bundled packages.',
        },
        {
          title: 'OS, browsers and apps',
          body: 'macOS Software Update, the major Linux distributions’ packages, Chrome, Firefox, Electron apps and other apps against their latest releases.',
        },
        {
          title: 'End of life',
          body: 'Runtimes and datastores that no longer get security fixes, with the date they stopped.',
        },
        {
          title: 'Compromised certificate authorities',
          body: 'Your system, OpenSSL, Homebrew, Python and Node trust stores, checked against certificate authorities known to be distrusted.',
        },
        {
          title: 'Supply-chain risk',
          body: 'Licenses outside your allowlist, npm install scripts, and the container images your repos build from.',
        },
      ],
    },
    trust: {
      title: 'Built to be *trusted*.',
      intro:
        'A security tool sees your whole machine. So Pantry keeps its own footprint small and every claim checkable.',
      items: [
        {
          title: 'No telemetry',
          body: 'Pantry never reports on you. The only thing it sends is package names and versions, to OSV.dev, to look them up.',
        },
        {
          title: 'No AI',
          body: 'Plain, deterministic code. The same machine gets the same answer, every time.',
        },
        {
          title: 'Written in Rust',
          body: 'Memory-safe, with unsafe code forbidden, compiled to one static binary.',
        },
        {
          title: 'Dependency-light',
          body: 'A handful of pinned Rust crates, each one vetted. No runtime to install.',
        },
        {
          title: 'Versioned and hashed',
          body: 'Every release is tagged, rebuilt byte for byte before it ships, and listed in SHA256SUMS.',
        },
        {
          title: 'Two ways to verify',
          body: 'Check a download with packslip or with its GitHub build attestation, before it runs.',
        },
        {
          title: 'Reads first',
          body: 'A scan changes nothing. Fixes run only when you ask, and never with sudo.',
        },
        {
          title: 'Unreachable is not clean',
          body: 'If a source cannot be reached, Pantry says “not checked”. It never calls that safe.',
        },
        {
          title: 'Free and open source',
          body: 'Apache-2.0. Read every line, fork it, and run it on as many machines as you like.',
        },
      ],
    },
    uses: {
      title: 'For you, your agents and your *fleet*.',
      intro:
        'The same binary on a laptop, inside your coding agent, in CI or across a few hundred servers.',
      items: [
        {
          title: 'People',
          body: 'Run it, read the plan, apply the safe fixes. The exit code says whether anything still needs you.',
        },
        {
          title: 'Agents',
          body: 'Structured JSON and a bundled skill (wscanner skill) teach your coding agent to triage and fix, without ever running sudo.',
        },
        {
          title: 'Fleets and CI',
          body: 'Point it at a checkout, skip the machine, and fail the build when something has a released fix.',
        },
      ],
    },
    faq: [
      {
        question: 'What leaves my machine?',
        answer:
          'Package names and versions, sent to OSV.dev, plus downloads of public data such as CISA’s Known Exploited Vulnerabilities list and endoflife.date. File contents, paths and secrets never leave. The optional email breach check is the one exception, and it runs only after you say yes.',
      },
      {
        question: 'Does it need sudo?',
        answer:
          'No. Pantry runs as you. Fixes that need sudo, like operating system packages, are printed for you to run yourself.',
      },
      {
        question: 'Why is it free?',
        answer:
          'Because security should not depend on what you can pay. Vulnerability data behind a paywall leaves the people who can least afford a breach the most exposed. Pantry uses open data, and it is free for everyone.',
      },
      {
        question: 'How is this different from a CVE feed?',
        answer:
          'A feed lists everything that broke, anywhere. Pantry tells you what applies to the exact versions on your machine, and which version fixes it.',
      },
      {
        question: 'Why is it called Pantry?',
        answer:
          'A pantry check tells you what you have, what is past its date and what has been recalled. That is the job. The command is wscanner.',
      },
      {
        question: 'Does it run on Windows?',
        answer:
          'Not yet. Pantry runs on macOS and Linux today. Windows support is planned, and demand sets the date, so tell us if you need it.',
      },
      {
        question: 'Can my AI agent use it?',
        answer:
          'Yes. wscanner --json gives your agent structured findings, and wscanner skill prints a skill that teaches it to triage and fix, and never to run the steps that need sudo.',
      },
    ],
    cta: {
      title: 'Check your *pantry*.',
      body: 'Free, open source and verified before it runs. Read the source first if you like. That is the point.',
    },
  },
  es: pantryEs,
  fr: pantryFr,
  zh: pantryZh,
  ja: pantryJa,
  ko: pantryKo,
};
