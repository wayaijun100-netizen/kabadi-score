import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ScoreboardSettings, ScoreboardUILayout } from './types';
import { loadSettings, saveSettings } from './utils/storage';
import { soundManager } from './utils/audio';
import { MainScoreboard } from './components/MainScoreboard';
import { OptionsModal } from './components/OptionsModal';

export default function App() {
  const [settings, setSettings] = useState<ScoreboardSettings>(() => loadSettings());
  const [raidTime, setRaidTime] = useState<number>(settings.raidDuration || 30);
  const [isRaidRunning, setIsRaidRunning] = useState<boolean>(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [isUIEditorActive, setIsUIEditorActive] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isThirdRaid, setIsThirdRaid] = useState<boolean>(false);
  const [showDoOrDieWarning, setShowDoOrDieWarning] = useState<boolean>(false);

  // Keep references to state for keyboard callbacks
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const isRaidRunningRef = useRef(isRaidRunning);
  isRaidRunningRef.current = isRaidRunning;
  const isOptionsOpenRef = useRef(isOptionsOpen);
  isOptionsOpenRef.current = isOptionsOpen;
  const isUIEditorActiveRef = useRef(isUIEditorActive);
  isUIEditorActiveRef.current = isUIEditorActive;
  const isThirdRaidRef = useRef(isThirdRaid);
  isThirdRaidRef.current = isThirdRaid;
  const raidTimeRef = useRef(raidTime);
  raidTimeRef.current = raidTime;

  // Sync sound settings with SoundManager
  useEffect(() => {
    soundManager.setEnabled(settings.soundEnabled);
    soundManager.setVolume(settings.soundVolume);
  }, [settings.soundEnabled, settings.soundVolume]);

  // Handle Fullscreen state change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        // Fullscreen might be blocked by browser iframe policies
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, []);

  // Raid Timer Countdown Loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRaidRunning) {
      timer = setInterval(() => {
        setRaidTime((prev) => {
          if (prev <= 1) {
            // Reached 0: Trigger Stadium Buzzer
            soundManager.playBuzzer();
            setIsRaidRunning(false);
            return 0;
          }

          const next = prev - 1;
          // Warning beeps on last 10 seconds (10, 9, 8... down to 1)
          if (next <= 10 && settingsRef.current.beepOnLowTime) {
            // Pitch increases as time runs out
            soundManager.playTick(next <= 3 ? 1200 : next <= 6 ? 1050 : 900);
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRaidRunning]);

  // Timer controls
  const handleToggleRaid = useCallback(() => {
    if (raidTimeRef.current <= 0) {
      // If expired, reset back to duration and start
      setRaidTime(settingsRef.current.raidDuration);
      setIsRaidRunning(true);
    } else {
      setIsRaidRunning((prev) => !prev);
    }
  }, []);

  // Shared Reset for both 30s Countdown Clock & 3rd Raid (Do-or-Die)
  const handleResetRaid = useCallback(() => {
    setIsRaidRunning(false);
    setRaidTime(settingsRef.current.raidDuration);
    setIsThirdRaid(false);
    setShowDoOrDieWarning(false);
    soundManager.playResetSound();
  }, []);

  // 3rd Raid (Do-or-Die) mode trigger & timer start
  const handleToggleThirdRaid = useCallback(() => {
    setIsThirdRaid((prev) => {
      const next = !prev;
      if (next) {
        // Start 30s raid timer immediately
        if (raidTimeRef.current <= 0) {
          setRaidTime(settingsRef.current.raidDuration);
        }
        setIsRaidRunning(true);
        setShowDoOrDieWarning(true);
        soundManager.playDoOrDieSound();
      } else {
        setShowDoOrDieWarning(false);
        soundManager.playResetSound();
      }
      return next;
    });
  }, []);

  // Team score adjustments
  const handleAdjustTeam1 = useCallback((delta: number) => {
    setSettings((prev) => {
      const newScore = Math.max(0, prev.team1.score + delta);
      if (delta > 0) soundManager.playPointSound();
      const updated = {
        ...prev,
        team1: { ...prev.team1, score: newScore },
      };
      saveSettings(updated);
      return updated;
    });
  }, []);

  const handleResetTeam1 = useCallback(() => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        team1: { ...prev.team1, score: 0 },
      };
      saveSettings(updated);
      return updated;
    });
    soundManager.playResetSound();
  }, []);

  const handleAdjustTeam2 = useCallback((delta: number) => {
    setSettings((prev) => {
      const newScore = Math.max(0, prev.team2.score + delta);
      if (delta > 0) soundManager.playPointSound();
      const updated = {
        ...prev,
        team2: { ...prev.team2, score: newScore },
      };
      saveSettings(updated);
      return updated;
    });
  }, []);

  const handleResetTeam2 = useCallback(() => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        team2: { ...prev.team2, score: 0 },
      };
      saveSettings(updated);
      return updated;
    });
    soundManager.playResetSound();
  }, []);

  const handleUpdateTeam1Name = useCallback((name: string) => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        team1: { ...prev.team1, name },
      };
      saveSettings(updated);
      return updated;
    });
  }, []);

  const handleUpdateTeam2Name = useCallback((name: string) => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        team2: { ...prev.team2, name },
      };
      saveSettings(updated);
      return updated;
    });
  }, []);

  const handleResetMatchScores = useCallback(() => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        team1: { ...prev.team1, score: 0 },
        team2: { ...prev.team2, score: 0 },
      };
      saveSettings(updated);
      return updated;
    });
    handleResetRaid();
  }, [handleResetRaid]);

  const handleToggleSound = useCallback(() => {
    setSettings((prev) => {
      const updated = { ...prev, soundEnabled: !prev.soundEnabled };
      saveSettings(updated);
      return updated;
    });
  }, []);

  const handleSaveSettings = useCallback((newSettings: ScoreboardSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  }, []);

  const handleSaveLayout = useCallback((layout: ScoreboardUILayout) => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        customLayout: layout,
      };
      saveSettings(updated);
      return updated;
    });
  }, []);

  const handleEnterUIEditor = useCallback(() => {
    setIsOptionsOpen(false);
    setIsUIEditorActive(true);
  }, []);

  const handleExitUIEditor = useCallback(() => {
    setIsUIEditorActive(false);
  }, []);

  // Global Keyboard Navigation & Shortcut Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing inside an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        if (e.key === 'Escape') {
          target.blur();
        }
        return;
      }

      // If in UI Editor mode and ESC is pressed, exit editor mode
      if (isUIEditorActiveRef.current && e.key === 'Escape') {
        e.preventDefault();
        setIsUIEditorActive(false);
        return;
      }

      const bindings = settingsRef.current.keyBindings;
      const key = e.key.toLowerCase();
      const code = e.code;

      // ESCAPE key logic: open or close options
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOptionsOpen((prev) => !prev);
        return;
      }

      // If options modal or UI editor is active, ignore game shortcuts
      if (isOptionsOpenRef.current || isUIEditorActiveRef.current) {
        return;
      }

      // 1. Raid Timer Toggle (Spacebar or custom key)
      const isSpace = bindings.raidTimerToggle === ' ' && (e.code === 'Space' || e.key === ' ');
      if (isSpace || key === bindings.raidTimerToggle.toLowerCase() || code === bindings.raidTimerToggle) {
        e.preventDefault();
        handleToggleRaid();
        return;
      }

      // 2. Shared Reset Key: Resets 30s Raid Timer AND Clears 3rd Raid (r)
      if (key === bindings.raidTimerReset.toLowerCase() || code === bindings.raidTimerReset) {
        e.preventDefault();
        handleResetRaid();
        return;
      }

      // 3. 3rd Raid (Do-or-Die) Toggle Key (d)
      if (bindings.thirdRaidToggle && (key === bindings.thirdRaidToggle.toLowerCase() || code === bindings.thirdRaidToggle)) {
        e.preventDefault();
        handleToggleThirdRaid();
        return;
      }

      // 4. Team 1 Score +1 (q)
      if (key === bindings.team1Add.toLowerCase() || code === bindings.team1Add) {
        e.preventDefault();
        handleAdjustTeam1(1);
        return;
      }

      // 5. Team 1 Score -1 (a)
      if (key === bindings.team1Sub.toLowerCase() || code === bindings.team1Sub) {
        e.preventDefault();
        handleAdjustTeam1(-1);
        return;
      }

      // 6. Team 1 Score Reset (z)
      if (bindings.team1Reset && (key === bindings.team1Reset.toLowerCase() || code === bindings.team1Reset)) {
        e.preventDefault();
        handleResetTeam1();
        return;
      }

      // 7. Team 2 Score +1 (p)
      if (key === bindings.team2Add.toLowerCase() || code === bindings.team2Add) {
        e.preventDefault();
        handleAdjustTeam2(1);
        return;
      }

      // 8. Team 2 Score -1 (l)
      if (key === bindings.team2Sub.toLowerCase() || code === bindings.team2Sub) {
        e.preventDefault();
        handleAdjustTeam2(-1);
        return;
      }

      // 9. Team 2 Score Reset (m)
      if (bindings.team2Reset && (key === bindings.team2Reset.toLowerCase() || code === bindings.team2Reset)) {
        e.preventDefault();
        handleResetTeam2();
        return;
      }

      // 10. Fullscreen Toggle (f)
      if (bindings.toggleFullscreen && (key === bindings.toggleFullscreen.toLowerCase() || code === bindings.toggleFullscreen)) {
        e.preventDefault();
        toggleFullscreen();
        return;
      }

      // 11. Sound Toggle (b / m)
      if (bindings.toggleSound && (key === bindings.toggleSound.toLowerCase() || code === bindings.toggleSound)) {
        e.preventDefault();
        handleToggleSound();
        return;
      }

      // 12. Reset Match Scores (x)
      if (bindings.resetScores && (key === bindings.resetScores.toLowerCase() || code === bindings.resetScores)) {
        e.preventDefault();
        handleResetMatchScores();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    handleToggleRaid,
    handleResetRaid,
    handleToggleThirdRaid,
    handleAdjustTeam1,
    handleResetTeam1,
    handleAdjustTeam2,
    handleResetTeam2,
    handleResetMatchScores,
    toggleFullscreen,
    handleToggleSound,
  ]);

  return (
    <div className="w-screen h-screen bg-[#07090e] font-body">
      {/* Main Television / Stadium Screen: Only Left Team, 30s Raid Timer, Right Team */}
      <MainScoreboard
        settings={settings}
        raidTime={raidTime}
        isRaidRunning={isRaidRunning}
        isThirdRaid={isThirdRaid}
        showDoOrDieWarning={showDoOrDieWarning}
        onDismissDoOrDieWarning={() => setShowDoOrDieWarning(false)}
        onResetRaidTimerAndThirdRaid={handleResetRaid}
        isEditorActive={isUIEditorActive}
        onAdjustTeam1={handleAdjustTeam1}
        onAdjustTeam2={handleAdjustTeam2}
        onResetTeam1={handleResetTeam1}
        onResetTeam2={handleResetTeam2}
        onOpenOptions={() => setIsOptionsOpen(true)}
        onSaveLayout={handleSaveLayout}
        onExitEditor={handleExitUIEditor}
      />

      {/* Options & Configuration Modal (Opened via ESC) */}
      <OptionsModal
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
        onResetMatchScores={handleResetMatchScores}
        onResetRaidTimer={handleResetRaid}
        onEnterUIEditor={handleEnterUIEditor}
      />
    </div>
  );
}
