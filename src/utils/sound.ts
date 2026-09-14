// Web Audio API retro cyber synth sounds
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function toggleAudio(enable?: boolean): boolean {
  soundEnabled = enable !== undefined ? enable : !soundEnabled;
  return soundEnabled;
}

export function isAudioEnabled(): boolean {
  return soundEnabled;
}

export function playCyberBlip(frequency = 880, duration = 0.05, type: OscillatorType = 'sine') {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio contexts may be blocked before interaction
  }
}

export function playArmTerminalSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    [440, 660, 880, 1320].forEach((freq, i) => {
      setTimeout(() => {
        playCyberBlip(freq, 0.08, 'sawtooth');
      }, i * 60);
    });
  } catch {
    // ignore
  }
}

export function playWarningBeep() {
  if (!soundEnabled) return;
  try {
    playCyberBlip(320, 0.12, 'square');
  } catch {
    // ignore
  }
}

export function playCyberWarning() {
  if (!soundEnabled) return;
  try {
    playCyberBlip(280, 0.15, 'sawtooth');
  } catch {
    // ignore
  }
}
