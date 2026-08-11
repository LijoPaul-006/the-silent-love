// High-Fidelity Visual Book Page SVG Renderer for THE SILENT LOVE

import { PAGES_DATA } from "../data/manuscript.js";
import { CHAPTERS } from "../data/metadata.js";

export function renderBookPageSVG(pageNumber) {
  const page = PAGES_DATA.find((p) => p.pageNumber === pageNumber) || PAGES_DATA[0];

  // Special Page 1 Cover Graphic
  if (page.pageNumber === 1) {
    return `
      <div class="svg-page-content" style="padding: 0; background: #070b19;">
        <svg viewBox="0 0 400 600" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="pageCoverBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0b142b"/>
              <stop offset="60%" stop-color="#050a16"/>
              <stop offset="100%" stop-color="#02040a"/>
            </linearGradient>
            <radialGradient id="pageGlow" cx="70%" cy="65%" r="45%">
              <stop offset="0%" stop-color="#e09f3e" stop-opacity="0.35"/>
              <stop offset="100%" stop-color="#050a16" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="pageGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#d4af37"/>
              <stop offset="50%" stop-color="#f3e5ab"/>
              <stop offset="100%" stop-color="#c5a059"/>
            </linearGradient>
          </defs>
          <rect width="400" height="600" fill="url(#pageCoverBg)"/>
          <rect width="400" height="600" fill="url(#pageGlow)"/>
          <rect x="15" y="15" width="370" height="570" fill="none" stroke="#c5a059" stroke-opacity="0.3" stroke-width="1.5" rx="4"/>
          <text x="200" y="55" font-family="'Cinzel', serif" font-size="10" fill="#c5a059" letter-spacing="3" text-anchor="middle">SOME LOVE STORIES ARE WRITTEN IN WORDS.</text>
          <text x="200" y="73" font-family="'Cinzel', serif" font-size="10" fill="#c5a059" letter-spacing="3" text-anchor="middle">OTHERS ARE WRITTEN IN SILENCE.</text>
          <text x="200" y="140" font-family="'Cinzel', serif" font-size="22" font-weight="600" fill="#ffffff" letter-spacing="8" text-anchor="middle">T H E</text>
          <text x="200" y="215" font-family="'Caveat', cursive" font-size="68" fill="#ffffff" text-anchor="middle">Silent</text>
          <text x="200" y="275" font-family="'Cinzel', serif" font-size="46" font-weight="700" fill="url(#pageGold)" letter-spacing="6" text-anchor="middle">LOVE</text>
          <text x="200" y="315" font-family="'Cinzel', serif" font-size="10" fill="#d0c7b3" letter-spacing="3" text-anchor="middle">A STORY OF UNHEARD WORDS</text>
          <text x="200" y="332" font-family="'Cinzel', serif" font-size="10" fill="#d0c7b3" letter-spacing="3" text-anchor="middle">AND UNDERSTOOD SILENCES</text>

          <g transform="translate(40, 370)">
            <rect x="110" y="90" width="110" height="135" rx="3" fill="#202b3c" stroke="#c5a059" stroke-width="1"/>
            <rect x="105" y="90" width="8" height="135" fill="#141c29" rx="1"/>
            <text x="165" y="125" font-family="'Caveat', cursive" font-size="20" fill="#d4af37" text-anchor="middle">Mouna. ♡</text>
            <rect x="135" y="145" width="75" height="55" fill="#f4eee0" rx="2" transform="rotate(-3, 160, 165)"/>
            <text x="172" y="162" font-family="'Caveat', cursive" font-size="11" fill="#332a20" text-anchor="middle">You don't have to</text>
            <text x="172" y="176" font-family="'Caveat', cursive" font-size="11" fill="#332a20" text-anchor="middle">say it... I will</text>
            <text x="172" y="190" font-family="'Caveat', cursive" font-size="11" fill="#332a20" text-anchor="middle">understand anyway. ♡</text>
            <rect x="20" y="130" width="80" height="45" fill="#2e1452" rx="2" transform="rotate(-12, 60, 150)"/>
            <text x="60" y="152" font-family="'Cinzel', serif" font-size="9" fill="#f3e5ab" text-anchor="middle" transform="rotate(-12, 60, 150)">Dairy Milk</text>
            <rect x="235" y="80" width="105" height="120" fill="#fdfbf7" rx="2" transform="rotate(8, 280, 140)"/>
            <rect x="242" y="87" width="91" height="85" fill="#131c2b" transform="rotate(8, 280, 140)"/>
            <text x="285" y="192" font-family="'Caveat', cursive" font-size="13" fill="#2b241c" text-anchor="middle" transform="rotate(8, 280, 140)">Sunday. Always. ♡</text>
          </g>
          <text x="200" y="565" font-family="'Cinzel', serif" font-size="12" fill="#c5a059" letter-spacing="2" text-anchor="middle">A love story by Lijo Paul M E</text>
        </svg>
      </div>
    `;
  }

  // Chapter Header Pages
  if (page.type === "chapter_header") {
    return `
      <div class="svg-page-content" style="justify-content: center; align-items: center; text-align: center;">
        <div style="margin-bottom: 2rem;">
          <h2 style="font-family: var(--font-display); font-size: 2.2rem; letter-spacing: 0.35em; font-weight: 700; color: #1c1813; text-transform: uppercase;">
            ${page.lines[0] || ""}
          </h2>
          ${
            page.lines[1]
              ? `<p style="font-family: var(--font-sans); font-size: 0.9rem; letter-spacing: 0.25em; font-weight: 600; color: #574b3e; margin-top: 0.75rem; text-transform: uppercase;">
                  ${page.lines[1]}
                </p>`
              : ""
          }
        </div>
        <div style="width: 40px; height: 1px; background: #a89988; margin: 1.5rem auto;"></div>
        <div class="page-footer-num">${page.pageNumber}</div>
      </div>
    `;
  }

  // Dedication Page
  if (page.type === "dedication") {
    return `
      <div class="svg-page-content" style="justify-content: center; align-items: center; text-align: center;">
        <h2 style="font-family: var(--font-display); font-size: 1.8rem; letter-spacing: 0.3em; margin-bottom: 2.5rem; color: #231d17;">D E D I C A T E D</h2>
        <div style="font-family: var(--font-serif); font-size: 1.2rem; line-height: 1.9; color: #3b3228;">
          ${page.lines.slice(1).map((l) => `<p>${l}</p>`).join("")}
        </div>
        <div class="page-footer-num">${page.pageNumber}</div>
      </div>
    `;
  }

  // Quote Page
  if (page.type === "quote") {
    return `
      <div class="svg-page-content" style="justify-content: center; align-items: center; text-align: center;">
        <div style="font-family: var(--font-serif); font-size: 1.25rem; font-style: italic; line-height: 2; color: #332b22; max-width: 450px;">
          ${page.lines.map((l) => `<p>${l}</p>`).join("")}
        </div>
        <div class="page-footer-num">${page.pageNumber}</div>
      </div>
    `;
  }

  // Regular Manuscript / Story Page
  const linesHtml = page.lines
    .map((line) => {
      const isQuote = line.startsWith('"') && line.endsWith('"') && line.length < 90;
      const isHeading = line.startsWith("CHAPTER") || line.startsWith("PROLOGUE") || line.startsWith("A LETTER");
      if (isHeading) return `<div class="page-chapter-title">${line}</div>`;
      if (isQuote) return `<p class="page-line quote">${line}</p>`;
      return `<p class="page-line">${line}</p>`;
    })
    .join("");

  return `
    <div class="svg-page-content">
      <div class="page-body-lines">
        ${linesHtml}
      </div>
      <div class="page-footer-num">${page.pageNumber}</div>
    </div>
  `;
}
