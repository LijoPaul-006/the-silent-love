// Web Audio API Ambient Atmosphere Synthesizer
// Generates rain noise + warm ambient piano chords

class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.rainNode = null;
    this.synthGain = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.timer = null;
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  startRain() {
    if (!this.ctx) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.04; // Soft rain volume
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter rain frequencies
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.masterGain);
    whiteNoise.start();
    this.rainNode = whiteNoise;
  }

  playChordNote(freq, duration = 4, delay = 0) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, this.ctx.currentTime + delay);

    const now = this.ctx.currentTime + delay;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.08, now + 0.8);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  startChordsLoop() {
    // Warm Cmaj7 / Am9 ambient pad progression: C3, E3, G3, B3, A2, C3, E3, G3
    const chords = [
      [130.81, 164.81, 196.00, 246.94], // Cmaj7
      [110.00, 130.81, 164.81, 196.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [146.83, 174.61, 220.00, 261.63]  // Dm7
    ];

    let chordIdx = 0;
    const playNext = () => {
      if (!this.isPlaying) return;
      const notes = chords[chordIdx % chords.length];
      notes.forEach((freq, idx) => {
        this.playChordNote(freq, 6, idx * 0.15);
      });
      chordIdx++;
      this.timer = setTimeout(playNext, 6500);
    };

    playNext();
  }

  start() {
    this.init();
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.startRain();
    this.startChordsLoop();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
    if (this.rainNode) {
      try { this.rainNode.stop(); } catch (e) {}
      this.rainNode = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }
}

export const ambientAudio = new AmbientAudioEngine();
