// Special Story Moment Motif Notification Banner

import { PAGES_DATA } from "../data/manuscript.js";
import { MOTIFS } from "../data/metadata.js";

export function renderSpecialMotifBanner(container, pageNumber) {
  const page = PAGES_DATA.find((p) => p.pageNumber === pageNumber);
  if (!page || !page.motif) {
    container.innerHTML = "";
    return;
  }

  const motifObj = MOTIFS.find((m) => m.name === page.motif || m.id === page.motif);
  const symbol = motifObj ? motifObj.symbol : "✨";
  const label = page.motif;

  container.innerHTML = `
    <div class="motif-banner">
      <span>${symbol}</span>
      <span>STORY MOTIF: ${label}</span>
    </div>
  `;
}
