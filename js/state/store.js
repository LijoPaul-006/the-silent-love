// State Manager & LocalStorage Persistence for THE SILENT LOVE PDF Reader

const STORAGE_KEY = "the_silent_love_pdf_progress_v2";

const defaultState = {
  currentPage: 1,
  totalPages: 151,
  focusMode: true, // Immersive reading default
  companionOpen: false,
  chapterDrawerOpen: false,
  zoomLevel: 1.0, // Scale multiplier
  fitMode: "page", // 'page' | 'width'
  view: "landing" // 'landing' | 'intro' | 'reader'
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        currentPage: Math.max(1, Math.min(151, Number(parsed.currentPage || 1))),
        focusMode: parsed.focusMode ?? true
      };
    }
  } catch (e) {
    console.warn("Could not read saved progress:", e);
  }
  return defaultState;
}

class Store {
  constructor() {
    this.state = loadState();
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  setState(partial) {
    this.state = { ...this.state, ...partial };
    this.save();
    this.notify();
  }

  save() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentPage: this.state.currentPage,
          focusMode: this.state.focusMode
        })
      );
    } catch (e) {}
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((l) => l(this.state));
  }

  goToPage(page) {
    const target = Math.max(1, Math.min(151, Number(page)));
    this.setState({ currentPage: target });
  }

  nextPage() {
    if (this.state.currentPage < 151) {
      this.goToPage(this.state.currentPage + 1);
    }
  }

  prevPage() {
    if (this.state.currentPage > 1) {
      this.goToPage(this.state.currentPage - 1);
    }
  }

  toggleFocusMode() {
    this.setState({ focusMode: !this.state.focusMode });
  }

  toggleCompanion() {
    this.setState({ companionOpen: !this.state.companionOpen });
  }

  toggleChapterDrawer() {
    this.setState({ chapterDrawerOpen: !this.state.chapterDrawerOpen });
  }
}

export const store = new Store();
