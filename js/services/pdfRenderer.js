// PDF.js High-Resolution Lazy PDF Rendering Engine for THE SILENT LOVE

import { BOOK_METADATA } from "../data/metadata.js";

class PDFRenderEngine {
  constructor() {
    this.pdfDoc = null;
    this.pageCache = new Map();
    this.renderTaskMap = new Map();
    this.isDocLoading = false;
    this.loadPromise = null;
  }

  async loadPDF() {
    if (this.pdfDoc) return this.pdfDoc;
    if (this.loadPromise) return this.loadPromise;

    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "./js/vendor/pdf.worker.js";
    } else {
      throw new Error("pdfjsLib not found");
    }

    this.isDocLoading = true;
    this.loadPromise = window.pdfjsLib
      .getDocument(BOOK_METADATA.pdfPath)
      .promise.then((doc) => {
        this.pdfDoc = doc;
        this.isDocLoading = false;
        return doc;
      })
      .catch((err) => {
        this.isDocLoading = false;
        console.error("Failed to load PDF:", err);
        throw err;
      });

    return this.loadPromise;
  }

  async getPageProxy(pageNumber) {
    if (this.pageCache.has(pageNumber)) {
      return this.pageCache.get(pageNumber);
    }
    const doc = await this.loadPDF();
    const pageProxy = await doc.getPage(pageNumber);
    this.pageCache.set(pageNumber, pageProxy);
    return pageProxy;
  }

  async renderPageToCanvas(pageNumber, canvas, containerWidth, containerHeight, fitMode = "page", zoomLevel = 1.0) {
    try {
      const pageProxy = await this.getPageProxy(pageNumber);

      // Cancel any ongoing render task for this canvas
      if (this.renderTaskMap.has(canvas)) {
        try {
          this.renderTaskMap.get(canvas).cancel();
        } catch (e) {}
        this.renderTaskMap.delete(canvas);
      }

      const unscaledViewport = pageProxy.getViewport({ scale: 1.0 });

      let scale = 1.0;
      if (fitMode === "width" && containerWidth) {
        scale = containerWidth / unscaledViewport.width;
      } else if (fitMode === "page" && containerHeight) {
        const scaleW = containerWidth / unscaledViewport.width;
        const scaleH = containerHeight / unscaledViewport.height;
        scale = Math.min(scaleW, scaleH);
      }

      // Apply zoom multiplier
      scale *= zoomLevel;

      // devicePixelRatio aware high-DPI rendering
      const dpr = window.devicePixelRatio || 1;
      const renderViewport = pageProxy.getViewport({ scale: scale * dpr });

      canvas.width = Math.floor(renderViewport.width);
      canvas.height = Math.floor(renderViewport.height);

      const displayWidth = Math.floor(renderViewport.width / dpr);
      const displayHeight = Math.floor(renderViewport.height / dpr);

      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const renderContext = {
        canvasContext: ctx,
        viewport: renderViewport
      };

      const renderTask = pageProxy.render(renderContext);
      this.renderTaskMap.set(canvas, renderTask);

      await renderTask.promise;
      this.renderTaskMap.delete(canvas);

      // Preload adjacent pages silently in background
      this.preloadAdjacent(pageNumber);
    } catch (err) {
      if (err.name !== "RenderingCancelledException") {
        console.error(`Error rendering PDF page ${pageNumber}:`, err);
      }
    }
  }

  preloadAdjacent(currentPage) {
    const pagesToPreload = [currentPage - 1, currentPage + 1, currentPage + 2].filter(
      (p) => p >= 1 && p <= 151
    );
    pagesToPreload.forEach((p) => {
      if (!this.pageCache.has(p)) {
        this.getPageProxy(p).catch(() => {});
      }
    });
  }
}

export const pdfRenderer = new PDFRenderEngine();
