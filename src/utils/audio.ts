class SoundManager {
  private ctx: AudioContext | null = null;
  private volume: number = 0.8;
  private enabled: boolean = true;

  constructor() {
    // Lazy initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  // Final Raid Buzzer (Deep sports stadium horn / klaxon)
  public playBuzzer() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';

      // 150 Hz and 225 Hz (major fifth stadium horn blend)
      osc1.frequency.setValueAtTime(146.83, now);
      osc2.frequency.setValueAtTime(220.00, now);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.4 * this.volume, now + 0.05);
      gainNode.gain.setValueAtTime(0.4 * this.volume, now + 1.2);
      gainNode.gain.linearRampToValueAtTime(0.001, now + 1.6);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.6);
      osc2.stop(now + 1.6);
    } catch {
      // Audio context might fail before first interaction
    }
  }

  // High tick for countdown under 5s
  public playTick(pitch: number = 880) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      gain.gain.setValueAtTime(0.25 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignore
    }
  }

  // Short point chime when score increases
  public playPointSound() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08); // E5

      gain.gain.setValueAtTime(0.2 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // Ignore
    }
  }

  // Dramatic Do-or-Die / 3rd Raid Stadium Klaxon Alert
  public playDoOrDieSound() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Sub-bass boom
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(120, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.6);
      subGain.gain.setValueAtTime(0.5 * this.volume, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.65);

      // 2. Dual siren horns (dramatic PKL alert)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const hornGain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';

      // Quick double siren chirp
      osc1.frequency.setValueAtTime(440, now);
      osc1.frequency.linearRampToValueAtTime(880, now + 0.15);
      osc1.frequency.setValueAtTime(440, now + 0.22);
      osc1.frequency.linearRampToValueAtTime(880, now + 0.42);

      osc2.frequency.setValueAtTime(330, now);
      osc2.frequency.linearRampToValueAtTime(660, now + 0.15);
      osc2.frequency.setValueAtTime(330, now + 0.22);
      osc2.frequency.linearRampToValueAtTime(660, now + 0.42);

      hornGain.gain.setValueAtTime(0.35 * this.volume, now);
      hornGain.gain.setValueAtTime(0.35 * this.volume, now + 0.45);
      hornGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc1.connect(hornGain);
      osc2.connect(hornGain);
      hornGain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.9);
      osc2.stop(now + 0.9);
    } catch {
      // Audio might fail before user interaction
    }
  }

  // Quick crisp click for reset operations
  public playResetSound() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(290, now + 0.12);

      gain.gain.setValueAtTime(0.25 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // Ignore
    }
  }
}

export const soundManager = new SoundManager();
