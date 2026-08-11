// Story Companion Sidebar Component for THE SILENT LOVE

import { store } from "../state/store.js";
import { BOOK_METADATA, CHAPTERS, CHARACTERS, MOTIFS, ABOUT_STORY } from "../data/metadata.js";

export function renderStorySidebar(container) {
  const state = store.getState();
  const activeTab = state.activeTab;

  container.innerHTML = `
    <div class="reader-sidebar ${state.sidebarOpen ? "" : "collapsed"}">
      <div class="sidebar-header">
        <h2 class="sidebar-title">${BOOK_METADATA.title}</h2>
        <p class="sidebar-subtitle">${BOOK_METADATA.subtitle}</p>
      </div>

      <nav class="sidebar-nav">
        <button class="nav-tab ${activeTab === "story" ? "active" : ""}" data-tab="story">STORY</button>
        <button class="nav-tab ${activeTab === "characters" ? "active" : ""}" data-tab="characters">CHARACTERS</button>
        <button class="nav-tab ${activeTab === "chapters" ? "active" : ""}" data-tab="chapters">CHAPTERS</button>
        <button class="nav-tab ${activeTab === "motifs" ? "active" : ""}" data-tab="motifs">MOTIFS</button>
        <button class="nav-tab ${activeTab === "about" ? "active" : ""}" data-tab="about">ABOUT</button>
      </nav>

      <div class="sidebar-content">
        ${renderTabContent(activeTab, state.currentPage)}
      </div>
    </div>
  `;

  // Attach tab click listeners
  container.querySelectorAll(".nav-tab").forEach((tabBtn) => {
    tabBtn.addEventListener("click", (e) => {
      const targetTab = e.currentTarget.getAttribute("data-tab");
      store.setState({ activeTab: targetTab });
    });
  });

  // Attach chapter item click listeners
  container.querySelectorAll(".chapter-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const page = Number(e.currentTarget.getAttribute("data-page"));
      store.goToPage(page);
    });
  });
}

function renderTabContent(tab, currentPage) {
  if (tab === "story") {
    return `
      <div style="font-family: var(--font-serif); line-height: 1.6; color: var(--text-cream);">
        <p style="font-size: 1rem; font-style: italic; color: var(--text-gold); margin-bottom: 1rem; text-align: center;">
          "Some love stories are written in words.<br>Others are written in silence."
        </p>
        <p style="font-size: 0.92rem; margin-bottom: 1rem; color: #d0c8b8;">
          Follow Jo—a young dreamer whose world collides with Mouna, a deaf girl who carries a small handwritten diary.
        </p>
        <p style="font-size: 0.92rem; color: #d0c8b8;">
          Through notes, music, small chocolates, and quiet Sunday walks, their silence becomes the most meaningful conversation of their lives.
        </p>
      </div>
    `;
  }

  if (tab === "characters") {
    return CHARACTERS.map(
      (c) => `
      <div class="character-card">
        <div class="character-name">${c.name}</div>
        <div class="character-role">${c.role}</div>
        <div class="character-desc">${c.description}</div>
      </div>
    `
    ).join("");
  }

  if (tab === "chapters") {
    return CHAPTERS.map((ch) => {
      const isActive = currentPage >= ch.startPage && currentPage <= ch.endPage;
      return `
        <div class="chapter-item ${isActive ? "active" : ""}" data-page="${ch.startPage}">
          <div class="chapter-item-title">${ch.title}</div>
          <div class="chapter-item-pages">P. ${ch.startPage} - ${ch.endPage}</div>
        </div>
      `;
    }).join("");
  }

  if (tab === "motifs") {
    return MOTIFS.map(
      (m) => `
      <div class="motif-card">
        <div class="motif-title"><span>${m.symbol}</span> ${m.name}</div>
        <div class="motif-quote">"${m.quote}"</div>
        <div class="motif-desc">${m.description}</div>
      </div>
    `
    ).join("");
  }

  if (tab === "about") {
    return `
      <div style="font-family: var(--font-serif); line-height: 1.6;">
        <h4 style="font-family: var(--font-display); font-size: 0.85rem; color: var(--text-gold); margin-bottom: 0.5rem; letter-spacing: 0.1em;">ABOUT THE BOOK</h4>
        <p style="font-size: 0.9rem; color: var(--text-cream); margin-bottom: 1.25rem;">
          ${ABOUT_STORY.summary}
        </p>
        <h4 style="font-family: var(--font-display); font-size: 0.85rem; color: var(--text-gold); margin-bottom: 0.5rem; letter-spacing: 0.1em;">CORE THEMES</h4>
        ${ABOUT_STORY.themes
          .map(
            (t) => `
          <div style="margin-bottom: 0.75rem;">
            <strong style="color: var(--text-gold-bright); font-size: 0.85rem; font-family: var(--font-sans);">${t.title}</strong>
            <p style="font-size: 0.85rem; color: #b8af9f;">${t.detail}</p>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  return "";
}
