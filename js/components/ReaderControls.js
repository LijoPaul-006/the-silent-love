// Reader Controls & Navigation Component for THE SILENT LOVE

import { store } from "../state/store.js";
import { ambientAudio } from "./AmbientAudio.js";

export function renderReaderControlsTop(container) {
  const state = store.getState();
  const isBookMode = state.readingMode === "book";

  container.innerHTML = `
    <div class="reader-controls-top">
      <button class="ctrl-btn" id="ctrl-sidebar-toggle" title="Toggle Sidebar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        <span>${state.sidebarOpen ? "Hide Sidebar" : "Sidebar"}</span>
      </button>

      <div class="page-indicator">
        PAGE ${state.currentPage} / 151
      </div>

      <button class="ctrl-btn ${isBookMode ? "active" : ""}" id="ctrl-mode-book">
        <span>BOOK</span>
      </button>

      <button class="ctrl-btn ${!isBookMode ? "active" : ""}" id="ctrl-mode-text">
        <span>TEXT</span>
      </button>

      <button class="ctrl-btn ${state.audioEnabled ? "active" : ""}" id="ctrl-audio" title="Atmosphere Ambient Audio">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
        <span>${state.audioEnabled ? "AUDIO ON" : "AUDIO"}</span>
      </button>

      <button class="ctrl-btn" id="ctrl-settings" title="Reading Settings">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </button>
    </div>
  `;

  // Attach event listeners
  document.getElementById("ctrl-sidebar-toggle")?.addEventListener("click", () => {
    store.setState({ sidebarOpen: !state.sidebarOpen });
  });

  document.getElementById("ctrl-mode-book")?.addEventListener("click", () => {
    store.setState({ readingMode: "book" });
  });

  document.getElementById("ctrl-mode-text")?.addEventListener("click", () => {
    store.setState({ readingMode: "text" });
  });

  document.getElementById("ctrl-audio")?.addEventListener("click", () => {
    const active = ambientAudio.toggle();
    store.setState({ audioEnabled: active });
  });

  document.getElementById("ctrl-settings")?.addEventListener("click", () => {
    store.setState({ settingsModalOpen: !state.settingsModalOpen });
  });
}

export function renderReaderControlsBottom(container) {
  const state = store.getState();
  const percentage = ((state.currentPage / 151) * 100).toFixed(1);

  container.innerHTML = `
    <div class="reader-controls-bottom">
      <input type="range" class="progress-slider" min="1" max="151" value="${state.currentPage}" id="page-slider">
      <span style="font-family: var(--font-display); font-size: 0.72rem; color: var(--text-gold); min-width: 45px; text-align: right;">
        ${percentage}%
      </span>
    </div>
  `;

  document.getElementById("page-slider")?.addEventListener("input", (e) => {
    const targetPage = Number(e.target.value);
    store.goToPage(targetPage);
  });
}
