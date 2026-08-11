// Settings Modal Component for THE SILENT LOVE

import { store } from "../state/store.js";
import { ambientAudio } from "./AmbientAudio.js";

export function renderSettingsModal(container) {
  const state = store.getState();
  if (!state.settingsModalOpen) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center;" id="modal-backdrop">
      <div style="background: #0e162d; border: 1px solid var(--border-gold); border-radius: 12px; width: 90%; max-width: 420px; padding: 1.75rem; box-shadow: 0 20px 40px rgba(0,0,0,0.6); color: var(--text-cream);" id="modal-box">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-dark); padding-bottom: 0.75rem;">
          <h3 style="font-family: var(--font-display); font-size: 1rem; color: var(--text-gold); letter-spacing: 0.1em;">READING SETTINGS</h3>
          <button id="btn-close-settings" style="background: transparent; border: none; color: var(--text-cream); cursor: pointer; font-size: 1.2rem;">✕</button>
        </div>

        <!-- Theme Mode -->
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; font-family: var(--font-display); font-size: 0.75rem; color: var(--text-gold); margin-bottom: 0.5rem; letter-spacing: 0.08em;">BACKGROUND THEME</label>
          <div style="display: flex; gap: 0.5rem;">
            <button class="settings-theme-btn ${state.theme === "sepia" ? "active" : ""}" data-theme="sepia" style="flex: 1; padding: 0.6rem; background: #f4eee0; color: #231e18; border: 2px solid ${state.theme === "sepia" ? "#c5a059" : "transparent"}; border-radius: 6px; font-weight: 600; cursor: pointer;">Sepia Paper</button>
            <button class="settings-theme-btn ${state.theme === "dark" ? "active" : ""}" data-theme="dark" style="flex: 1; padding: 0.6rem; background: #0b1120; color: #e2ded4; border: 2px solid ${state.theme === "dark" ? "#c5a059" : "transparent"}; border-radius: 6px; font-weight: 600; cursor: pointer;">Midnight</button>
            <button class="settings-theme-btn ${state.theme === "light" ? "active" : ""}" data-theme="light" style="flex: 1; padding: 0.6rem; background: #ffffff; color: #1a1a1a; border: 2px solid ${state.theme === "light" ? "#c5a059" : "transparent"}; border-radius: 6px; font-weight: 600; cursor: pointer;">Pure Light</button>
          </div>
        </div>

        <!-- Font Size -->
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; font-family: var(--font-display); font-size: 0.75rem; color: var(--text-gold); margin-bottom: 0.5rem; letter-spacing: 0.08em;">TEXT SIZE (TEXT MODE)</label>
          <div style="display: flex; gap: 0.5rem;">
            <button class="settings-font-btn ${state.fontSize === "sm" ? "active" : ""}" data-size="sm" style="flex: 1; padding: 0.5rem; background: rgba(255,255,255,0.05); color: var(--text-cream); border: 1px solid var(--border-dark); border-radius: 6px; cursor: pointer;">Small</button>
            <button class="settings-font-btn ${state.fontSize === "md" ? "active" : ""}" data-size="md" style="flex: 1; padding: 0.5rem; background: rgba(255,255,255,0.05); color: var(--text-cream); border: 1px solid var(--border-dark); border-radius: 6px; cursor: pointer;">Medium</button>
            <button class="settings-font-btn ${state.fontSize === "lg" ? "active" : ""}" data-size="lg" style="flex: 1; padding: 0.5rem; background: rgba(255,255,255,0.05); color: var(--text-cream); border: 1px solid var(--border-dark); border-radius: 6px; cursor: pointer;">Large</button>
          </div>
        </div>

        <!-- Audio Atmosphere Toggle -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; border-top: 1px solid var(--border-dark); padding-top: 1rem;">
          <div>
            <div style="font-family: var(--font-display); font-size: 0.8rem; color: var(--text-cream);">Atmosphere Audio</div>
            <div style="font-size: 0.75rem; color: var(--text-light-muted);">Soft rain & warm piano chords</div>
          </div>
          <button id="btn-toggle-modal-audio" style="padding: 0.5rem 1rem; background: ${state.audioEnabled ? "var(--text-gold)" : "rgba(255,255,255,0.1)"}; color: ${state.audioEnabled ? "#070b19" : "var(--text-cream)"}; border: none; border-radius: 20px; font-weight: 600; cursor: pointer;">
            ${state.audioEnabled ? "ENABLED" : "DISABLED"}
          </button>
        </div>
      </div>
    </div>
  `;

  // Event Listeners
  document.getElementById("btn-close-settings")?.addEventListener("click", () => {
    store.setState({ settingsModalOpen: false });
  });

  document.getElementById("modal-backdrop")?.addEventListener("click", (e) => {
    if (e.target.id === "modal-backdrop") {
      store.setState({ settingsModalOpen: false });
    }
  });

  container.querySelectorAll(".settings-theme-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const theme = e.currentTarget.getAttribute("data-theme");
      store.setState({ theme });
    });
  });

  container.querySelectorAll(".settings-font-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const fontSize = e.currentTarget.getAttribute("data-size");
      store.setState({ fontSize });
    });
  });

  document.getElementById("btn-toggle-modal-audio")?.addEventListener("click", () => {
    const active = ambientAudio.toggle();
    store.setState({ audioEnabled: active });
  });
}
