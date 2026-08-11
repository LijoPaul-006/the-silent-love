# THE SILENT LOVE

A premium digital reading experience for the romance novel **"The Silent Love"** by **Lijo Paul M E**.

---

## About

**The Silent Love** is an original romance novel by Lijo Paul M E about two people who learn that communication isn't always spoken:

> *"Some love stories are written in words.  
> Others are written in silence."*

This web project transforms the author's finished book into an immersive, production-ready digital reading experience while preserving the authoritative original PDF edition exactly as designed.

---

## Core Philosophy

> **"The PDF is the book.  
> The website is the experience around the book."**

The website surrounds the book with an elegant, responsive interface—it does not reconstruct, reflow, rewrite, or alter the manuscript. Every typography line, page dimension, margin, illustration, and blank space matches the original PDF with 100% fidelity.

---

## Features

- **Premium Book Reader**: Clean, cinematic reading interface designed with restraint and visual elegance.
- **Exact PDF Rendering**: Uses PDF.js vector rendering engine with devicePixelRatio awareness for crisp text on Retina, desktop, tablet, and mobile displays.
- **Focus Reading Mode**: Immersive reading experience that softly fades surrounding controls so the reader is alone with the story.
- **Mobile-First Reading**: PDF pages automatically fit screen width on mobile devices with full touch gesture support (swipe left/right for page turns, pinch-to-zoom, double-tap zoom).
- **Page & Chapter Navigation**: Page counter (`PAGE 72 OF 151`), thin gold progress line, and a Chapter Drawer mapping directly to exact PDF starting pages.
- **Resume Reading**: LocalStorage persistence automatically remembers your reading location when returning.
- **Fullscreen Mode**: Toggle fullscreen viewing to remove browser distractions.
- **Downloadable Original Book PDF**: Allows readers to download the original PDF file directly.
- **Story Companion Sidebar**: Supplementary panel featuring character profiles (**Jo**, **Mouna**, **Arjun**, **Daniel**, **Kiran**) and story motifs (**The Diary**, **The Guitar**, **Chocolate**, **Sunday & Church**, **2:17 A.M.**).
- **Zero Audio Distraction**: Completely quiet reading environment honoring the silence of the novel.

---

## Tech Stack

- **Core**: HTML5, Vanilla CSS3 (Custom Design System with CSS Variables)
- **Logic**: Modern JavaScript (ES Modules, Store State Management)
- **PDF Rendering Engine**: PDF.js v3.11.174
- **State & Persistence**: LocalStorage API
- **Fonts**: Google Fonts (`Cinzel`, `Cormorant Garamond`, `Inter`)

---

## Project Structure

```
.
├── index.html               # Main HTML5 application entry point
├── package.json             # Node package metadata & scripts
├── README.md                # Project documentation
├── .gitignore               # Version control exclusion rules
├── the_silent_love.pdf      # Original authoritative PDF book asset (5.1MB)
├── css/
│   └── styles.css           # Luxury editorial design system & responsive layout
└── js/
    ├── app.js               # Application bootstrapper & keyboard event router
    ├── components/          # Modular UI view components
    │   ├── LandingPage.js   # Cinematic cover landing view
    │   ├── ReaderView.js    # Main PDF reader layout & canvas viewport
    │   ├── ChapterDrawer.js # Chapter quick-jump menu
    │   └── CompanionPanel.js# Supplementary character & motif panel
    ├── data/
    │   └── metadata.js      # Book metadata, chapter page directory & motifs
    ├── services/
    │   └── pdfRenderer.js   # PDF.js high-DPI lazy canvas rendering engine
    ├── state/
    │   └── store.js         # Reactive state manager & LocalStorage persistence
    └── vendor/
        ├── pdf.js           # PDF.js core library
        └── pdf.worker.js    # PDF.js web worker for async background rendering
```

---

## Running Locally

To run the project locally, serve the directory using any static HTTP web server:

```bash
# Option 1: Using npx serve
npx serve -l 3000 .

# Option 2: Using Python 3 built-in HTTP server
python3 -m http.server 3000
```

Then open your browser and navigate to `http://localhost:3000`.

---

## Production Build & Deployment

Since this project is built using native HTML5, CSS3, ES Modules, and PDF.js, no compilation build step is required.

### Deploying to GitHub Pages, Vercel, or Netlify
1. Push this repository to GitHub.
2. For **GitHub Pages**: Enable Pages in Repository Settings (`Source: Deploy from branch main / root`).
3. For **Vercel** or **Netlify**: Import the repository directly (Framework Preset: *Other / Static Store*, Output Directory: `./`).

---

## Author

**Lijo Paul M E**

---

## License

License not currently specified.
