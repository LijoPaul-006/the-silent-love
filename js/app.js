// App Entry Point for THE SILENT LOVE (PDF Visual Reader)

import { store } from "./state/store.js";
import { renderLandingPage } from "./components/LandingPage.js";
import { renderReaderView } from "./components/ReaderView.js";
import { pdfRenderer } from "./services/pdfRenderer.js";

const appRoot = document.getElementById("app");

// Pre-fetch PDF document in background
pdfRenderer.loadPDF().catch((e) => console.warn("PDF pre-loading:", e));

function renderApp() {
  const state = store.getState();

  if (state.view === "landing") {
    renderLandingPage(appRoot);
    return;
  }

  renderReaderView(appRoot);
}

// Subscribe to store updates
store.subscribe(() => {
  renderApp();
});

// Keyboard Navigation Listeners
window.addEventListener("keydown", (e) => {
  const state = store.getState();
  if (state.view !== "reader") return;

  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    store.prevPage();
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    store.nextPage();
  } else if (e.key === "Home") {
    e.preventDefault();
    store.goToPage(1);
  } else if (e.key === "End") {
    e.preventDefault();
    store.goToPage(151);
  } else if (e.key === "Escape") {
    e.preventDefault();
    if (state.chapterDrawerOpen) {
      store.setState({ chapterDrawerOpen: false });
    } else if (state.companionOpen) {
      store.setState({ companionOpen: false });
    } else if (state.focusMode) {
      store.setState({ focusMode: false });
    }
  }
});

// Handle Window Resize to maintain crisp high-DPI rendering
let resizeTimeout = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (store.getState().view === "reader") {
      renderApp();
    }
  }, 200);
});

// Initial Render
renderApp();
