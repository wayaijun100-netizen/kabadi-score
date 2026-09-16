import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RaidClockProps {
  raidTime: number;
  totalDuration?: number;
  isRaidRunning: boolean;
  isThirdRaid?: boolean;
}

interface SparkParticle {
  angle: number;
  distance: number;
  speed: number;
  size: number;
  alpha: number;
  color: string;
  wobble: number;
  life: number;
  maxLife: number;
}

export const RaidClock: React.FC<RaidClockProps> = ({
  raidTime,
  totalDuration = 30,
  isRaidRunning,
  isThirdRaid = false,
}) => {
  // CRITICAL REQUIREMENT: Color change animations start at 10 seconds and below!
  const isWarning = raidTime <= 10 && raidTime > 0;
  const isExpired = raidTime === 0;

  // Canvas ref for high-performance 60FPS particle & plasma graphics
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High-frequency sub-second millisecond ticker for continuous kinetic sensation
  const [subMillis, setSubMillis] = useState<number>(99);
  const lastSecTimeRef = useRef<number>(Date.now());
  const raidTimeRef = useRef<number>(raidTime);
  raidTimeRef.current = raidTime;

  // Track second changes for shockwave burst
  useEffect(() => {
    lastSecTimeRef.current = Date.now();
  }, [raidTime]);

  // Main 60FPS Canvas Animation Loop: Plasma Vortex, Rotating Reticles, Trailing Sparks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let rotation1 = 0;
    let rotation2 = 0;
    let radarAngle = 0;
    let pulsePhase = 0;

    // Seed orbiting particles
    const particles: SparkParticle[] = [];
    const maxParticles = 65;

    const baseColorsCyan = ['#38bdf8', '#00f0ff', '#0284c7', '#ffffff', '#60a5fa'];
    const baseColorsOrange = ['#ff4500', '#ff8c00', '#ffa500', '#ff0055', '#ffffff', '#ffd700'];
    const baseColorsRed = ['#ef4444', '#dc2626', '#b91c1c', '#ff0000', '#ffffff'];

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        distance: 114 + (Math.random() - 0.5) * 22,
        speed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 2.4 + 1.0,
        alpha: Math.random() * 0.8 + 0.2,
        color: '#38bdf8',
        wobble: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: Math.random() * 120 + 80,
      });
    }

    // Set canvas dimensions
    const width = 340;
    const height = 340;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const centerX = width / 2;
    const centerY = height / 2;
    const baseRadius = 118;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const currentTime = raidTimeRef.current;
      const warningActive = currentTime <= 10 && currentTime > 0;
      const expiredActive = currentTime === 0;
      const running = isRaidRunning && !expiredActive;

      // Color Palette based on standard normal raid timer rules
      const primaryColor = expiredActive
        ? '#ef4444'
        : warningActive
        ? '#ff6b00'
        : '#00e5ff';
      const secondaryColor = expiredActive
        ? '#b91c1c'
        : warningActive
        ? '#ffaa00'
        : '#2563eb';
      const currentColors = expiredActive
        ? baseColorsRed
        : warningActive
        ? baseColorsOrange
        : baseColorsCyan;

      // Speed multipliers
      const speedMultiplier = warningActive ? 2.8 : running ? 1.0 : 0.25;

      rotation1 += 0.008 * speedMultiplier;
      rotation2 -= 0.012 * speedMultiplier;
      radarAngle += 0.025 * speedMultiplier;
      pulsePhase += 0.05 * speedMultiplier;

      // Update ms ticker
      if (running) {
        const elapsed = (Date.now() - lastSecTimeRef.current) % 1000;
        const frac = 1000 - elapsed;
        setSubMillis(Math.floor((frac / 1000) * 99));
      } else if (expiredActive) {
        setSubMillis(0);
      }

      // ================= 1. RADIAL PULSING PLASMA SPIKES (EQUALIZER CORE) =================
      const numSpikes = 36;
      ctx.save();
      ctx.translate(centerX, centerY);
      for (let i = 0; i < numSpikes; i++) {
        const angle = (i / numSpikes) * Math.PI * 2;
        const wave = Math.sin(pulsePhase * 1.5 + i * 0.4) * Math.cos(pulsePhase * 0.8 + i * 0.2);
        const spikeLen = running
          ? (warningActive ? 13 + Math.abs(wave) * 17 : 6 + Math.abs(wave) * 11)
          : 3;

        const x1 = Math.cos(angle) * (baseRadius - 13);
        const y1 = Math.sin(angle) * (baseRadius - 13);
        const x2 = Math.cos(angle) * (baseRadius - 13 + spikeLen);
        const y2 = Math.sin(angle) * (baseRadius - 13 + spikeLen);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = primaryColor;
        ctx.globalAlpha = warningActive ? 0.75 : 0.35;
        ctx.lineWidth = warningActive ? 2 : 1.2;
        ctx.stroke();
      }
      ctx.restore();

      // ================= 2. ROTATING CONCENTRIC HOLOGRAPHIC RETICLE RINGS =================
      // Outer Segmented Gear Ring (Clockwise)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation1);
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius + 14, 0, Math.PI * 2);
      ctx.strokeStyle = primaryColor;
      ctx.globalAlpha = warningActive ? 0.45 : 0.2;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([5, 11]);
      ctx.stroke();

      // Outer Ticks (12 compass notches)
      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * Math.PI * 2;
        const tx1 = Math.cos(ang) * (baseRadius + 11);
        const ty1 = Math.sin(ang) * (baseRadius + 11);
        const tx2 = Math.cos(ang) * (baseRadius + 19);
        const ty2 = Math.sin(ang) * (baseRadius + 19);
        ctx.beginPath();
        ctx.moveTo(tx1, ty1);
        ctx.lineTo(tx2, ty2);
        ctx.lineWidth = i % 3 === 0 ? 2 : 1.2;
        ctx.strokeStyle = i % 3 === 0 ? '#ffffff' : primaryColor;
        ctx.globalAlpha = warningActive ? 0.8 : 0.4;
        ctx.stroke();
      }
      ctx.restore();

      // Inner Counter-Rotating Hologram Ring (Counter-Clockwise)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation2);
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius - 10, 0, Math.PI * 2);
      ctx.strokeStyle = secondaryColor;
      ctx.globalAlpha = warningActive ? 0.4 : 0.2;
      ctx.lineWidth = 1;
      ctx.setLineDash([10, 6, 3, 6]);
      ctx.stroke();

      // Holographic corner bracket arcs
      for (let i = 0; i < 4; i++) {
        const ang = (i * Math.PI) / 2 + Math.PI / 4;
        ctx.beginPath();
        ctx.arc(0, 0, baseRadius + 22, ang - 0.15, ang + 0.15);
        ctx.strokeStyle = primaryColor;
        ctx.globalAlpha = warningActive ? 0.9 : 0.5;
        ctx.lineWidth = 2.5;
        ctx.setLineDash([]);
        ctx.stroke();
      }
      ctx.restore();

      // ================= 3. SWEEPING RADAR SCANNER BEAM =================
      if (running) {
        ctx.save();
        ctx.translate(centerX, centerY);
        const scanGrad = ctx.createRadialGradient(0, 0, 40, 0, 0, baseRadius + 16);
        scanGrad.addColorStop(0, 'rgba(0,0,0,0)');
        scanGrad.addColorStop(1, warningActive ? 'rgba(255, 107, 0, 0.25)' : 'rgba(0, 229, 255, 0.18)');

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, baseRadius + 16, radarAngle - 0.45, radarAngle);
        ctx.closePath();
        ctx.fillStyle = scanGrad;
        ctx.fill();

        // Laser scan leading line
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(radarAngle) * (baseRadius + 18), Math.sin(radarAngle) * (baseRadius + 18));
        ctx.strokeStyle = '#ffffff';
        ctx.globalAlpha = warningActive ? 0.9 : 0.6;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      // ================= 4. BASE SVG-EQUIVALENT RECESSED ENERGY ARC =================
      const progressRatio = Math.max(0, Math.min(1, currentTime / totalDuration));
      const startAngle = -Math.PI / 2;
      const endAngle = startAngle + progressRatio * Math.PI * 2;

      // Dark background rail
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 10;
      ctx.setLineDash([]);
      ctx.stroke();

      // Multi-layer glowing energy arc
      if (progressRatio > 0.001) {
        // Outer Bloom Halo
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius, startAngle, endAngle);
        ctx.strokeStyle = primaryColor;
        ctx.globalAlpha = warningActive ? 0.65 : 0.4;
        ctx.lineWidth = warningActive ? 18 : 14;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Inner Core Laser Arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius, startAngle, endAngle);
        ctx.strokeStyle = '#ffffff';
        ctx.globalAlpha = 0.9;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
      }

      // ================= 5. LEADING COMET HEAD & PLASMA TAIL =================
      if (progressRatio > 0.01) {
        const cometX = centerX + Math.cos(endAngle) * baseRadius;
        const cometY = centerY + Math.sin(endAngle) * baseRadius;

        // Multi-tier bloom comet
        ctx.save();
        const cometGrad = ctx.createRadialGradient(cometX, cometY, 2, cometX, cometY, warningActive ? 18 : 14);
        cometGrad.addColorStop(0, '#ffffff');
        cometGrad.addColorStop(0.35, primaryColor);
        cometGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(cometX, cometY, warningActive ? 18 : 14, 0, Math.PI * 2);
        ctx.fillStyle = cometGrad;
        ctx.fill();

        // Intense core bead
        ctx.beginPath();
        ctx.arc(cometX, cometY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();

        // Inject new sparks at the comet head if running
        if (running && Math.random() < (warningActive ? 0.8 : 0.45)) {
          particles.push({
            angle: endAngle + (Math.random() - 0.5) * 0.2,
            distance: baseRadius + (Math.random() - 0.5) * 12,
            speed: (Math.random() * 0.03 + 0.01) * -1, // trail backwards
            size: Math.random() * (warningActive ? 3.0 : 2.0) + 1.0,
            alpha: 1,
            color: currentColors[Math.floor(Math.random() * currentColors.length)],
            wobble: Math.random() * Math.PI * 2,
            life: 0,
            maxLife: Math.random() * 45 + 25,
          });
        }
      }

      // ================= 6. ORBITING EMBER & PLASMA PARTICLE FIELD =================
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.angle += p.speed * speedMultiplier;
        p.wobble += 0.08;
        const radialOffset = Math.sin(p.wobble) * (warningActive ? 6 : 3);
        const r = p.distance + radialOffset;

        const px = centerX + Math.cos(p.angle) * r;
        const py = centerY + Math.sin(p.angle) * r;

        const lifeRatio = 1 - p.life / p.maxLife;
        if (lifeRatio <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(px, py, p.size * lifeRatio, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * lifeRatio;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = warningActive ? 8 : 4;
        ctx.fill();
      }

      // Keep minimum particle count replenished
      while (particles.length < maxParticles) {
        particles.push({
          angle: Math.random() * Math.PI * 2,
          distance: baseRadius + (Math.random() - 0.5) * 26,
          speed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
          size: Math.random() * (warningActive ? 2.8 : 1.8) + 0.9,
          alpha: Math.random() * 0.7 + 0.3,
          color: currentColors[Math.floor(Math.random() * currentColors.length)],
          wobble: Math.random() * Math.PI * 2,
          life: 0,
          maxLife: Math.random() * 100 + 60,
        });
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isRaidRunning, totalDuration]);

  // Overall theme styling
  const theme = isExpired
    ? {
        digitColor: 'text-red-500 drop-shadow-[0_0_35px_rgba(239,68,68,0.95)]',
        glowAura: 'shadow-[0_0_80px_rgba(239,68,68,0.6)]',
      }
    : isWarning
    ? {
        digitColor: 'text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-orange-400 to-red-500 drop-shadow-[0_0_35px_rgba(255,107,0,0.95)] animate-pulse',
        glowAura: 'shadow-[0_0_80px_rgba(255,107,0,0.55)]',
      }
    : {
        digitColor: isRaidRunning
          ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-sky-100 to-sky-300 drop-shadow-[0_0_30px_rgba(56,189,248,0.85)]'
          : 'text-slate-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]',
        glowAura: isRaidRunning
          ? 'shadow-[0_0_60px_rgba(56,189,248,0.35)]'
          : 'shadow-[0_20px_50px_rgba(0,0,0,0.8)]',
      };

  return (
    <div
      id="holographic-raid-reactor"
      className="relative flex flex-col items-center justify-center select-none w-full max-w-[340px]"
    >
      {/* 1. Ambient Volcanic Shockwave Background (Under 10s & Expired) */}
      <AnimatePresence>
        {isWarning && isRaidRunning && (
          <motion.div
            key={`shockwave-${raidTime}`}
            initial={{ scale: 0.82, opacity: 0.8 }}
            animate={{ scale: 1.35, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="absolute -inset-6 rounded-full bg-gradient-to-r from-orange-600/35 via-red-600/35 to-amber-500/35 blur-2xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      {isExpired && (
        <div className="absolute -inset-8 rounded-full bg-red-600/50 blur-2xl animate-ping pointer-events-none" />
      )}

      {/* 2. Main Holographic Circular Display Container */}
      <div
        className={`relative w-[280px] sm:w-[310px] xl:w-[335px] h-[280px] sm:h-[310px] xl:h-[335px] flex items-center justify-center transition-all duration-500`}
      >
        {/* Dynamic 60FPS Particle & Hologram Canvas Layer */}
        <canvas
          ref={canvasRef}
          style={{ width: '340px', height: '340px' }}
          className="absolute inset-0 pointer-events-none z-10 m-auto"
        />

        {/* Outer Circular Shield Border with Corner Notches */}
        <div
          className={`absolute inset-2 sm:inset-2.5 rounded-full border-2 border-white/10 ${theme.glowAura} bg-[#04060b]/90 transition-all duration-500 backdrop-blur-md overflow-hidden`}
        >
          {/* Subtle Cyberpunk CRT Scanline Grid */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.8)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        </div>

        {/* 3. Central Holographic Core Glass Disc */}
        <div className="relative z-20 w-[195px] sm:w-[218px] xl:w-[235px] h-[195px] sm:h-[218px] xl:h-[235px] rounded-full bg-gradient-to-b from-[#080d19]/95 via-[#030509]/95 to-[#010204]/95 border border-white/15 shadow-[inset_0_4px_30px_rgba(0,0,0,0.95)] flex flex-col items-center justify-center p-2.5">
          {/* MASSIVE 3D EXTRACTED NUMERALS WITH SPRING KINETIC PUNCH */}
          <div className="relative flex items-center justify-center my-[-2px]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={raidTime}
                initial={{ scale: 1.2, opacity: 0.75, filter: 'brightness(1.5)' }}
                animate={{ scale: 1, opacity: 1, filter: 'brightness(1)' }}
                transition={{ type: 'spring', stiffness: 650, damping: 22 }}
                className={`font-display font-black text-[96px] sm:text-[108px] xl:text-[118px] leading-none tabular-nums tracking-tighter transition-all duration-300 ${theme.digitColor}`}
              >
                {String(raidTime).padStart(2, '0')}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
