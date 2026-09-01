#!/usr/bin/env node
/**
 * Generates og-image.png (1200x630), the social share card.
 *
 * Same approach as the generators on erickryski.com: compose an SVG over a
 * flat background with sharp, rather than pulling in a headless browser.
 *
 * The card is the page in one frame — the mark, the wordmark, the tagline,
 * and the two things that are coming — on the site's dark roast ground.
 *
 *   npm run build:og
 */

const sharp = require('sharp')
const { join } = require('path')

const ROOT = join(__dirname, '..')
const MARK = join(ROOT, 'waffle.png')
const OUT = join(ROOT, 'og-image.png')

const W = 1200
const H = 630

// Lifted from the page's custom properties so the card cannot drift from it.
const BG = '#17130f'
const INK = '#f6efe6'
const MUTED = '#b8a894'
const GOLD = '#e0a341'
const GOLD_SOFT = '#f2c877'
const EDGE = '#33291f'
const PANEL = '#201a15'

const FONT =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

const MARK_SIZE = 300
const MARK_LEFT = 92
const MARK_TOP = Math.round((H - MARK_SIZE) / 2) - 18

const TEXT_LEFT = 452

/** A rounded "Coming soon" pill with its label, used for Iron and Butter. */
function chip(x, y, label) {
  const padX = 16
  // ~8.2px per glyph at 13px/650 weight, plus the 1.4 tracking applied to each.
  const charW = 8.2 + 1.4
  const w = Math.round(label.length * charW + padX * 2)
  return `
    <rect x="${x}" y="${y}" width="${w}" height="30" rx="15"
          fill="rgba(224,163,65,0.10)" stroke="rgba(224,163,65,0.38)" stroke-width="1"/>
    <text x="${x + padX}" y="${y + 20}" font-family="${FONT}" font-size="13"
          font-weight="650" letter-spacing="1.4" fill="${GOLD_SOFT}">${label}</text>`
}

async function main() {
  const mark = await sharp(MARK)
    .resize(MARK_SIZE, MARK_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="75%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.16"/>
      <stop offset="70%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="card" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${PANEL}"/>
      <stop offset="100%" stop-color="#1b1611"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- wordmark -->
  <text x="${TEXT_LEFT}" y="228" font-family="${FONT}" font-size="86"
        font-weight="700" letter-spacing="-2.6" fill="${INK}">Waffuru</text>
  <text x="${TEXT_LEFT + 4}" y="266" font-family="${FONT}" font-size="21"
        letter-spacing="8" fill="${GOLD}">ワッフル</text>

  <!-- tagline -->
  <text x="${TEXT_LEFT}" y="322" font-family="${FONT}" font-size="25" fill="${MUTED}">
    <tspan x="${TEXT_LEFT}">Low-level tools for running models fast</tspan>
    <tspan x="${TEXT_LEFT}" dy="34">on the hardware you already own.</tspan>
  </text>

  <!-- the two products -->
  <rect x="${TEXT_LEFT}" y="392" width="308" height="128" rx="16"
        fill="url(#card)" stroke="${EDGE}" stroke-width="1"/>
  ${chip(TEXT_LEFT + 22, 414, 'COMING SOON')}
  <text x="${TEXT_LEFT + 22}" y="486" font-family="${FONT}" font-size="30"
        font-weight="650" fill="${INK}">Iron</text>

  <rect x="${TEXT_LEFT + 332}" y="392" width="308" height="128" rx="16"
        fill="url(#card)" stroke="${EDGE}" stroke-width="1"/>
  ${chip(TEXT_LEFT + 354, 414, 'COMING SOON')}
  <text x="${TEXT_LEFT + 354}" y="486" font-family="${FONT}" font-size="30"
        font-weight="650" fill="${INK}">Butter</text>

  <text x="${TEXT_LEFT}" y="566" font-family="${FONT}" font-size="18"
        fill="#8c7d6d">waffuru.ai</text>
</svg>`

  await sharp(Buffer.from(svg))
    .composite([{ input: mark, left: MARK_LEFT, top: MARK_TOP }])
    .png()
    .toFile(OUT)

  console.log(`wrote ${OUT} (${W}x${H})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
