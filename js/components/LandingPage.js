// Cinematic Landing Page for THE SILENT LOVE (PDF Visual Edition)

import { store } from "../state/store.js";
import { BOOK_METADATA, COMPANION_SUMMARY } from "../data/metadata.js";

export function renderLandingPage(container) {
  container.innerHTML = `
    <div class="landing-wrapper">
      <div class="bg-grain"></div>

      <header style="text-align: center; max-width: 650px; z-index: 2;">
        <p style="font-family: var(--font-display); font-size: 0.75rem; letter-spacing: 0.3em; color: var(--color-gold); text-transform: uppercase; margin-bottom: 0.75rem;">
          "${BOOK_METADATA.tagline}"
        </p>
        <h1 class="landing-header-title">${BOOK_METADATA.title}</h1>
        <p class="landing-header-subtitle">"${BOOK_METADATA.subtitle}"</p>
      </header>

      <!-- Book Cover Graphic Container -->
      <div class="landing-cover-preview" id="landing-cover-click" title="Click to Begin Reading">
        <svg viewBox="0 0 400 600" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="lCoverBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0b142b"/>
              <stop offset="60%" stop-color="#050a16"/>
              <stop offset="100%" stop-color="#02040a"/>
            </linearGradient>
            <radialGradient id="lAmber" cx="70%" cy="65%" r="45%">
              <stop offset="0%" stop-color="#e09f3e" stop-opacity="0.35"/>
              <stop offset="100%" stop-color="#050a16" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="lGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#c69a52"/>
              <stop offset="50%" stop-color="#e2b76b"/>
              <stop offset="100%" stop-color="#a27a36"/>
            </linearGradient>
          </defs>
          <rect width="400" height="600" fill="url(#lCoverBg)"/>
          <rect width="400" height="600" fill="url(#lAmber)"/>
          <rect x="15" y="15" width="370" height="570" fill="none" stroke="#c69a52" stroke-opacity="0.3" stroke-width="1.5" rx="4"/>
          
          <text x="200" y="55" font-family="'Cinzel', serif" font-size="10" fill="#c69a52" letter-spacing="3" text-anchor="middle">SOME LOVE STORIES ARE WRITTEN IN WORDS.</text>
          <text x="200" y="73" font-family="'Cinzel', serif" font-size="10" fill="#c69a52" letter-spacing="3" text-anchor="middle">OTHERS ARE WRITTEN IN SILENCE.</text>

          <text x="200" y="140" font-family="'Cinzel', serif" font-size="22" font-weight="600" fill="#ffffff" letter-spacing="8" text-anchor="middle">T H E</text>
          <text x="200" y="215" font-family="'Cormorant Garamond', serif" font-style="italic" font-size="64" fill="#ffffff" text-anchor="middle">Silent</text>
          <text x="200" y="275" font-family="'Cinzel', serif" font-size="46" font-weight="700" fill="url(#lGold)" letter-spacing="6" text-anchor="middle">LOVE</text>
          
          <text x="200" y="315" font-family="'Cinzel', serif" font-size="10" fill="#d0c7b3" letter-spacing="3" text-anchor="middle">A STORY OF UNHEARD WORDS</text>
          <text x="200" y="332" font-family="'Cinzel', serif" font-size="10" fill="#d0c7b3" letter-spacing="3" text-anchor="middle">AND UNDERSTOOD SILENCES</text>

          <g transform="translate(40, 370)">
            <rect x="110" y="90" width="110" height="135" rx="3" fill="#202b3c" stroke="#c69a52" stroke-width="1"/>
            <rect x="105" y="90" width="8" height="135" fill="#141c29" rx="1"/>
            <text x="165" y="125" font-family="'Cormorant Garamond', serif" font-style="italic" font-size="20" fill="#e2b76b" text-anchor="middle">Mouna. ♡</text>
            <rect x="135" y="145" width="75" height="55" fill="#f3e9d8" rx="2" transform="rotate(-3, 160, 165)"/>
            <text x="172" y="162" font-family="'Cormorant Garamond', serif" font-size="11" fill="#332a20" text-anchor="middle">You don't have to</text>
            <text x="172" y="176" font-family="'Cormorant Garamond', serif" font-size="11" fill="#332a20" text-anchor="middle">say it... I will</text>
            <text x="172" y="190" font-family="'Cormorant Garamond', serif" font-size="11" fill="#332a20" text-anchor="middle">understand anyway.</text>
          </g>
          <text x="200" y="565" font-family="'Cinzel', serif" font-size="12" fill="#c69a52" letter-spacing="2" text-anchor="middle">A love story by Lijo Paul M E</text>
        </svg>
      </div>

      <!-- Short Cinematic Intro Quote -->
      <div style="max-width: 550px; text-align: center; margin: 1.5rem 0; z-index: 2;">
        <p style="font-family: var(--font-serif); font-size: 1.1rem; font-style: italic; color: #cfc8b8; line-height: 1.6;">
          "${COMPANION_SUMMARY.cinematicIntro}"
        </p>
      </div>

      <!-- Action Buttons -->
      <div style="z-index: 2; display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
        <button class="landing-btn-begin" id="btn-begin">BEGIN READING</button>
      </div>

      <footer style="font-family: var(--font-serif); font-size: 0.9rem; color: #8a95ab; z-index: 2; margin-top: 1rem;">
        A love story by ${BOOK_METADATA.author}
      </footer>
    </div>
  `;

  document.getElementById("btn-begin")?.addEventListener("click", () => {
    store.goToPage(1);
    store.setState({ view: "reader" });
  });

  document.getElementById("landing-cover-click")?.addEventListener("click", () => {
    store.goToPage(1);
    store.setState({ view: "reader" });
  });
}
