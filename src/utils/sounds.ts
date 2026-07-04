import { Howl } from 'howler';

let ambientMusic: Howl | null = null;
let audioCtx: AudioContext | null = null;

// Initialize Audio Context on demand (browsers require user gesture)
function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Background Music Controller
export const playBackgroundMusic = (volume: number = 0.5) => {
  if (typeof window === 'undefined') return;

  if (!ambientMusic) {
    ambientMusic = new Howl({
      // Gorgeous happy birthday piano track
      src: ['https://archive.org/download/HappyBirthdayInstrumentalPianoViaInstrumentals.com.ng/Happy%20Birthday%20Instrumental%20Piano%20via%20instrumentals.com.ng.mp3'],
      html5: true, // Enable HTML5 Audio for streaming large files
      loop: true,
      volume: volume,
      autoplay: false,
    });
  }

  if (!ambientMusic.playing()) {
    ambientMusic.play();
    ambientMusic.fade(0, volume, 2000); // Smooth fade in
  }
};

export const pauseBackgroundMusic = () => {
  if (ambientMusic && ambientMusic.playing()) {
    ambientMusic.pause();
  }
};

export const stopBackgroundMusic = () => {
  if (ambientMusic) {
    ambientMusic.stop();
  }
};

export const setMusicVolume = (volume: number) => {
  if (ambientMusic) {
    ambientMusic.volume(volume);
  }
};

// 1. Synthesize Blow Candle sound using Web Audio API (White Noise + Envelope)
export const playBlowCandleSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 1.2; // 1.2 seconds of blowing
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate White Noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    // Filter white noise to make it sound like wind/breath (low-pass + bandpass style)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.Q.setValueAtTime(3.0, ctx.currentTime);

    // Apply envelope to fade the blow in and out smoothly
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.1); // Quick attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0); // Slow decay

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseNode.start();
    noiseNode.stop(ctx.currentTime + 1.2);
  } catch (error) {
    console.error('Audio synthesis failed:', error);
  }
};

// 2. Synthesize a Cute Pop sound (Frequency Sweep)
export const playPopSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    
    // Quick upward frequency sweep
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    console.error(e);
  }
};

// 3. Synthesize sweet success chimes (Arpeggio chord)
export const playSuccessSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Bright romantic C-major)
    
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = index * 0.08; // Arpeggiate notes

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.5);
    });
  } catch (e) {
    console.error(e);
  }
};

// 4. Synthesize a soft bell chime
export const playChimeSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const ctx = getAudioContext();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1320, ctx.currentTime); // E6 fifth

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.9);
    osc2.stop(ctx.currentTime + 0.9);
  } catch (e) {
    console.error(e);
  }
};

// Trigger mobile haptic feedback vibration
export const triggerHaptic = (duration = 50) => {
  if (typeof window !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(duration);
  }
};
