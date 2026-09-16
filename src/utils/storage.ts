import { ScoreboardSettings } from '../types';
import { DEFAULT_LAYOUT } from './defaultLayout';

export const DEFAULT_SETTINGS: ScoreboardSettings = {
  team1: {
    name: 'BLUE RAIDERS',
    score: 0,
    color: '#1d4ed8', // Vivid Cobalt Blue
  },
  team2: {
    name: 'RED WARRIORS',
    score: 0,
    color: '#dc2626', // Intense Crimson Red
  },
  raidDuration: 30,
  soundEnabled: true,
  soundVolume: 0.8,
  beepOnLowTime: true,
  customLayout: DEFAULT_LAYOUT,
  teamNameFontSize: 26,
  scoreFontSize: 180,
  keyBindings: {
    team1Add: 'q',
    team1Sub: 'a',
    team1Reset: 'z',
    team2Add: 'p',
    team2Sub: 'l',
    team2Reset: 'm',
    raidTimerToggle: ' ',
    raidTimerReset: 'r',
    thirdRaidToggle: 'd',
    raidTimerAdd5: 'ArrowUp',
    raidTimerSub5: 'ArrowDown',
    resetScores: 'x',
    toggleFullscreen: 'f',
    toggleSound: 'b',
    openSettings: 'Escape',
  },
};

const STORAGE_KEY = 'kabaddi_scoreboard_v2';

export function loadSettings(): ScoreboardSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      team1: { ...DEFAULT_SETTINGS.team1, ...parsed.team1 },
      team2: { ...DEFAULT_SETTINGS.team2, ...parsed.team2 },
      keyBindings: {
        ...DEFAULT_SETTINGS.keyBindings,
        ...parsed.keyBindings,
        team1Reset: parsed.keyBindings?.team1Reset || DEFAULT_SETTINGS.keyBindings.team1Reset,
        team2Reset: parsed.keyBindings?.team2Reset || DEFAULT_SETTINGS.keyBindings.team2Reset,
        thirdRaidToggle: parsed.keyBindings?.thirdRaidToggle || DEFAULT_SETTINGS.keyBindings.thirdRaidToggle,
      },
      customLayout: parsed.customLayout
        ? { ...DEFAULT_SETTINGS.customLayout, ...parsed.customLayout }
        : DEFAULT_SETTINGS.customLayout,
      teamNameFontSize: typeof parsed.teamNameFontSize === 'number' ? parsed.teamNameFontSize : DEFAULT_SETTINGS.teamNameFontSize,
      scoreFontSize: typeof parsed.scoreFontSize === 'number' ? parsed.scoreFontSize : DEFAULT_SETTINGS.scoreFontSize,
      team1NameFontSize: typeof parsed.team1NameFontSize === 'number' ? parsed.team1NameFontSize : undefined,
      team2NameFontSize: typeof parsed.team2NameFontSize === 'number' ? parsed.team2NameFontSize : undefined,
      team1ScoreFontSize: typeof parsed.team1ScoreFontSize === 'number' ? parsed.team1ScoreFontSize : undefined,
      team2ScoreFontSize: typeof parsed.team2ScoreFontSize === 'number' ? parsed.team2ScoreFontSize : undefined,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: ScoreboardSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage might be unavailable
  }
}

export function formatKeyLabel(key: string): string {
  if (key === ' ') return 'SPACEBAR';
  if (key.startsWith('Key')) return key.replace('Key', '').toUpperCase();
  if (key.startsWith('Digit')) return key.replace('Digit', '');
  if (key === 'ArrowUp') return 'UP ARROW';
  if (key === 'ArrowDown') return 'DOWN ARROW';
  if (key === 'ArrowLeft') return 'LEFT ARROW';
  if (key === 'ArrowRight') return 'RIGHT ARROW';
  if (key === 'Escape') return 'ESC';
  return key.toUpperCase();
}
