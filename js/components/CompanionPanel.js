// Supplementary Story Companion Panel Component for THE SILENT LOVE

import { store } from "../state/store.js";
import { BOOK_METADATA, CHARACTERS, MOTIFS, COMPANION_SUMMARY } from "../data/metadata.js";

export function renderCompanionPanel(container) {
  const state = store.getState();
  const isOpen = state.companionOpen;

  container.innerHTML = `
    <div class="companion-panel ${isOpen ? "open" : ""}">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <h3 style="font-family: var(--font-display); font-size: 0.95rem; color: var(--color-gold); letter-spacing: 0.1em;">STORY COMPANION</h3>
        <button id="btn-close-companion" style="background: transparent; border: none; color: var(--color-paper-cream); cursor: pointer; font-size: 1.2rem;">✕</button>
      </div>

      <!-- Book Summary Section -->
      <section style="margin-bottom: 1.5rem;">
        <h4 style="font-family: var(--font-display); font-size: 0.78rem; color: var(--color-gold-bright); letter-spacing: 0.1em; margin-bottom: 0.4rem;">THE STORY</h4>
        <p style="font-family: var(--font-serif); font-size: 0.92rem; color: var(--color-paper-cream); line-height: 1.55;">
          ${COMPANION_SUMMARY.shortDescription}
        </p>
      </section>

      <!-- Characters Section -->
      <section style="margin-bottom: 1.5rem;">
        <h4 style="font-family: var(--font-display); font-size: 0.78rem; color: var(--color-gold-bright); letter-spacing: 0.1em; margin-bottom: 0.75rem;">CHARACTERS</h4>
        ${CHARACTERS.map(
          (c) => `
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--color-border); border-radius: 6px; padding: 0.75rem; margin-bottom: 0.6rem;">
            <strong style="font-family: var(--font-display); font-size: 0.85rem; color: var(--color-gold);">${c.name}</strong>
            <span style="font-size: 0.72rem; color: #9aa5c4; margin-left: 0.4rem;">• ${c.role}</span>
            <p style="font-family: var(--font-serif); font-size: 0.85rem; color: var(--color-paper-cream); margin-top: 0.3rem; line-height: 1.4;">${c.description}</p>
          </div>
        `
        ).join("")}
      </section>

      <!-- Motifs Section -->
      <section>
        <h4 style="font-family: var(--font-display); font-size: 0.78rem; color: var(--color-gold-bright); letter-spacing: 0.1em; margin-bottom: 0.75rem;">STORY MOTIFS</h4>
        ${MOTIFS.map(
          (m) => `
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--color-border); border-radius: 6px; padding: 0.75rem; margin-bottom: 0.6rem;">
            <strong style="font-family: var(--font-display); font-size: 0.82rem; color: var(--color-gold);">${m.name}</strong>
            <p style="font-family: var(--font-serif); font-style: italic; font-size: 0.82rem; color: #d0c7b3; margin: 0.2rem 0;">"${m.quote}"</p>
            <p style="font-family: var(--font-sans); font-size: 0.78rem; color: var(--color-paper-cream); line-height: 1.35;">${m.description}</p>
          </div>
        `
        ).join("")}
      </section>
    </div>
  `;

  document.getElementById("btn-close-companion")?.addEventListener("click", () => {
    store.setState({ companionOpen: false });
  });
}
