// Final Screen Component for THE SILENT LOVE (Page 151 Finish)

import { store } from "../state/store.js";
import { BOOK_METADATA } from "../data/metadata.js";

export function renderFinalScreen(container) {
  container.innerHTML = `
    <div class="final-screen">
      <div class="grain-overlay"></div>

      <h1 class="final-title">${BOOK_METADATA.title}</h1>

      <p class="final-quote">
        "${BOOK_METADATA.tagline}"
      </p>

      <p style="font-family: var(--font-serif); font-size: 1.1rem; color: #b8af9f; max-width: 550px; margin-bottom: 2rem; font-style: italic;">
        Thank you for reading the quiet story of Jo and Mouna.
      </p>

      <div class="final-author">
        A love story by ${BOOK_METADATA.author}
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; z-index: 10;">
        <button class="btn-primary" id="btn-read-again">READ AGAIN</button>
        <button class="btn-secondary" id="btn-final-explore">EXPLORE THE STORY</button>
      </div>
    </div>
  `;

  document.getElementById("btn-read-again")?.addEventListener("click", () => {
    store.goToPage(1);
    store.setState({ view: "reader" });
  });

  document.getElementById("btn-final-explore")?.addEventListener("click", () => {
    store.setState({ view: "reader", sidebarOpen: true, activeTab: "story" });
  });
}
