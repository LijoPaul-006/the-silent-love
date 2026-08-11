// Text Mode Reader Component for THE SILENT LOVE

import { PAGES_DATA } from "../data/manuscript.js";

export function renderTextPageReader(pageNumber, theme = "sepia", fontSize = "md") {
  const page = PAGES_DATA.find((p) => p.pageNumber === pageNumber) || PAGES_DATA[0];

  const linesHtml = page.lines
    .map((line) => {
      const isQuote = line.startsWith('"') && line.endsWith('"') && line.length < 90;
      if (isQuote) {
        return `<p style="font-style: italic; text-align: center; margin: 1.25rem 0; opacity: 0.9;">${line}</p>`;
      }
      return `<p style="margin-bottom: 1.2rem; text-indent: 1.5rem; text-align: justify;">${line}</p>`;
    })
    .join("");

  return `
    <div class="text-mode-reader theme-${theme} font-${fontSize}">
      <div style="max-width: 680px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 2.5rem; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 1rem;">
          <span style="font-family: var(--font-display); font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.7;">
            THE SILENT LOVE — PAGE ${page.pageNumber} OF 151
          </span>
        </div>
        <div>
          ${linesHtml}
        </div>
      </div>
    </div>
  `;
}
