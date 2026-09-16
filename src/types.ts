export interface Team {
  name: string;
  score: number;
  color: string;
}

export interface KeyBindings {
  team1Add: string;
  team1Sub: string;
  team1Reset: string;
  team2Add: string;
  team2Sub: string;
  team2Reset: string;
  raidTimerToggle: string;
  raidTimerReset: string;
  thirdRaidToggle: string;
  raidTimerAdd5?: string;
  raidTimerSub5?: string;
  resetScores?: string;
  toggleFullscreen?: string;
  toggleSound?: string;
  openSettings?: string;
}

export interface ElementLayout {
  x: number; // percentage (0 to 100) or pixel
  y: number; // percentage (0 to 100) or pixel
  width: number; // pixels
  height: number; // pixels
  zIndex?: number;
}

export interface ScoreboardUILayout {
  team1Name: ElementLayout;
  team1Score: ElementLayout;
  team2Name: ElementLayout;
  team2Score: ElementLayout;
  timer: ElementLayout;
}

export interface ScoreboardSettings {
  team1: Team;
  team2: Team;
  raidDuration: number; // default 30s
  soundEnabled: boolean;
  soundVolume: number;
  beepOnLowTime: boolean;
  keyBindings: KeyBindings;
  customLayout?: ScoreboardUILayout;
  teamNameFontSize?: number; // default 26px
  scoreFontSize?: number; // default 180px
  team1NameFontSize?: number;
  team2NameFontSize?: number;
  team1ScoreFontSize?: number;
  team2ScoreFontSize?: number;
}
