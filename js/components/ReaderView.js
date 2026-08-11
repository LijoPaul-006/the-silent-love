// Main Visual PDF Reader View Component for THE SILENT LOVE

import { store } from "../state/store.js";
import { pdfRenderer } from "../services/pdfRenderer.js";
import { renderChapterDrawer } from "./ChapterDrawer.js";
import { renderCompanionPanel } from "./CompanionPanel.js";

let touchStartX = 0;
let touchStartY = 0;
let lastTapTime = 0;

export function renderReaderView(container) {
  const state = store.getState();
  const isFocus = state.focusMode;

  if (isFocus) {
    document.body.classList.add("focus-mode");
  } else {
    document.body.classList.remove("focus-mode");
  }

  const progressPercent = ((state.currentPage / 151) * 100).toFixed(1);

  container.innerHTML = `
    <div class="reader-wrapper">
      <div class="bg-grain"></div>

      <!-- TOP CONTROL BAR -->
      <header class="reader-top-bar">
        <h1 class="reader-top-title">THE SILENT LOVE</h1>

        <div class="reader-top-counter">
          PAGE ${state.currentPage} OF 151
        </div>

        <div class="reader-top-actions">
          <button class="btn-icon" id="btn-toggle-focus" title="Focus Reading Mode">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
            <span>${isFocus ? "FOCUS ON" : "FOCUS"}</span>
          </button>

          <button class="btn-icon" id="btn-toggle-chapters" title="Chapter Drawer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
            <span>CHAPTERS</span>
          </button>

          <button class="btn-icon" id="btn-toggle-companion" title="Story Companion">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span>COMPANION</span>
          </button>

          <button class="btn-icon" id="btn-toggle-fullscreen" title="Fullscreen Mode">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
          </button>

          <a href="./the_silent_love.pdf" download="The_Silent_Love_by_Lijo_Paul_M_E.pdf" class="btn-icon" title="Download Original PDF Book" style="text-decoration: none;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>DOWNLOAD</span>
          </a>
        </div>
      </header>

      <!-- CENTER PDF CANVAS VIEWPORT -->
      <main class="reader-viewport" id="viewport-container">
        <canvas id="pdf-canvas" class="pdf-canvas-card"></canvas>
      </main>

      <!-- BOTTOM NAVIGATION CONTROL BAR -->
      <footer class="reader-bottom-bar">
        <div class="nav-buttons-row">
          <button class="btn-nav-step" id="btn-prev-page">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            PREVIOUS
          </button>

          <div style="font-family: var(--font-display); font-size: 0.75rem; color: var(--color-gold);">
            PAGE ${state.currentPage} OF 151
          </div>

          <button class="btn-nav-step" id="btn-next-page">
            NEXT
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        <!-- Thin Gold Progress Line -->
        <div class="progress-line-container">
          <div class="progress-track" id="progress-track">
            <div class="progress-fill" style="width: ${progressPercent}%;"></div>
            <div class="progress-thumb" style="left: ${progressPercent}%;"></div>
          </div>
        </div>
      </footer>

      <!-- Chapter Drawer Mount -->
      <div id="drawer-mount"></div>

      <!-- Story Companion Panel Mount -->
      <div id="companion-mount"></div>
    </div>
  `;

  // Render Overlays
  const drawerMount = document.getElementById("drawer-mount");
  const companionMount = document.getElementById("companion-mount");
  if (drawerMount) renderChapterDrawer(drawerMount);
  if (companionMount) renderCompanionPanel(companionMount);

  // Render PDF Page to Canvas
  const canvas = document.getElementById("pdf-canvas");
  const viewportContainer = document.getElementById("viewport-container");

  if (canvas && viewportContainer) {
    const rect = viewportContainer.getBoundingClientRect();
    const availableW = rect.width - 40;
    const availableH = rect.height - 40;

    const fitMode = window.innerWidth <= 768 ? "width" : "page";
    pdfRenderer.renderPageToCanvas(state.currentPage, canvas, availableW, availableH, fitMode, state.zoomLevel);
  }

  // Event Listeners
  document.getElementById("btn-prev-page")?.addEventListener("click", () => store.prevPage());
  document.getElementById("btn-next-page")?.addEventListener("click", () => store.nextPage());

  document.getElementById("btn-toggle-focus")?.addEventListener("click", () => store.toggleFocusMode());
  document.getElementById("btn-toggle-chapters")?.addEventListener("click", () => store.toggleChapterDrawer());
  document.getElementById("btn-toggle-companion")?.addEventListener("click", () => store.toggleCompanion());

  document.getElementById("btn-toggle-fullscreen")?.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  // Progress Bar Track Click Handler
  document.getElementById("progress-track")?.addEventListener("click", (e) => {
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetPage = Math.round(ratio * 150) + 1;
    store.goToPage(targetPage);
  });

  // Mobile Touch Gestures (Swipe & Double Tap Zoom)
  if (viewportContainer) {
    viewportContainer.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    });

    viewportContainer.addEventListener("touchend", (e) => {
      if (e.changedTouches.length === 1) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;

        // Horizontal Swipe detection (min 50px swipe, low vertical drift)
        if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 60) {
          if (deltaX < 0) {
            store.nextPage(); // Swipe Left -> Next Page
          } else {
            store.prevPage(); // Swipe Right -> Prev Page
          }
        }

        // Double Tap Zoom detection
        const now = Date.now();
        if (now - lastTapTime < 300) {
          const nextZoom = state.zoomLevel > 1.0 ? 1.0 : 1.75;
          store.setState({ zoomLevel: nextZoom });
        }
        lastTapTime = now;
      }
    });
  }
}
