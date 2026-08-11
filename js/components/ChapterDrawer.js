// Chapter Drawer Component for THE SILENT LOVE PDF Edition

import { store } from "../state/store.js";
import { CHAPTER_NAVIGATION } from "../data/metadata.js";

export function renderChapterDrawer(container) {
  const state = store.getState();
  const isOpen = state.chapterDrawerOpen;

  container.innerHTML = `
    <div class="drawer-overlay ${isOpen ? "open" : ""}" id="drawer-overlay"></div>
    <div class="chapter-drawer ${isOpen ? "open" : ""}">
      <div class="drawer-title">
        <span>CHAPTERS</span>
        <button id="btn-close-drawer" style="background: transparent; border: none; color: var(--color-paper-cream); cursor: pointer; font-size: 1.2rem;">✕</button>
      </div>

      <div class="chapter-list">
        ${CHAPTER_NAVIGATION.map((ch, idx) => {
          const nextCh = CHAPTER_NAVIGATION[idx + 1];
          const endPg = nextCh ? nextCh.pdfPage - 1 : 151;
          const isActive = state.currentPage >= ch.pdfPage && state.currentPage <= endPg;

          return `
            <button class="chapter-btn ${isActive ? "active" : ""}" data-page="${ch.pdfPage}">
              <div>
                <div class="chapter-btn-name">${ch.number}: ${ch.title}</div>
              </div>
              <div class="chapter-btn-page">P. ${ch.pdfPage}</div>
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;

  // Attach event listeners
  document.getElementById("btn-close-drawer")?.addEventListener("click", () => {
    store.setState({ chapterDrawerOpen: false });
  });

  document.getElementById("drawer-overlay")?.addEventListener("click", () => {
    store.setState({ chapterDrawerOpen: false });
  });

  container.querySelectorAll(".chapter-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const page = Number(e.currentTarget.getAttribute("data-page"));
      store.goToPage(page);
      store.setState({ chapterDrawerOpen: false });
    });
  });
}
