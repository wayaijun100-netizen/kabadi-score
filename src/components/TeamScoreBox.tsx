import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import bluePanelBg from '../assets/images/blue_panel_bg.jpg';
import redPanelBg from '../assets/images/red_panel_bg.jpg';

interface TeamScoreBoxProps {
  side: 'left' | 'right';
  score: number;
  color?: string;
  isScoring: boolean;
  onAdjustScore?: (delta: number) => void;
  width?: number;
  height?: number;
  fontSize?: number;
}

export const TeamScoreBox: React.FC<TeamScoreBoxProps> = ({
  side,
  score,
  isScoring,
  onAdjustScore,
  fontSize,
}) => {
  const isLeft = side === 'left';
  const [surgeKey, setSurgeKey] = useState(0);
  const prevScoreRef = useRef(score);

  useEffect(() => {
    if (prevScoreRef.current !== score) {
      setSurgeKey((k) => k + 1);
      prevScoreRef.current = score;
    }
  }, [score]);

  const p = isLeft
    ? {
        primary: '#00f0ff',
        secondary: '#0284c7',
        neonGlow: '#00f0ff',
        scoreGrad: 'from-white via-white to-slate-200',
        scoreShadow:
          'drop-shadow-[0_6px_12px_rgba(0,0,0,1)] drop-shadow-[0_14px_35px_rgba(0,0,0,0.95)] drop-shadow-[0_0_18px_rgba(0,240,255,0.45)]',
        shockwave: 'bg-cyan-500/40',
        scanGlow: 'bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent',
      }
    : {
        primary: '#ff1753',
        secondary: '#be123c',
        neonGlow: '#ff1753',
        scoreGrad: 'from-white via-white to-slate-200',
        scoreShadow:
          'drop-shadow-[0_6px_12px_rgba(0,0,0,1)] drop-shadow-[0_14px_35px_rgba(0,0,0,0.95)] drop-shadow-[0_0_18px_rgba(255,23,83,0.45)]',
        shockwave: 'bg-red-500/40',
        scanGlow: 'bg-gradient-to-r from-transparent via-rose-500/50 to-transparent',
      };

  return (
    <div
      id={`${side}-team-score-box`}
      onClick={() => onAdjustScore && onAdjustScore(1)}
      title="Click score to add +1 point"
      className="relative w-full h-full flex items-center justify-center cursor-pointer group/score select-none transition-transform duration-200 hover:scale-[1.015]"
    >
      {/* Scoring Shockwave */}
      <AnimatePresence>
        {isScoring && (
          <motion.div
            initial={{ scale: 0.85, opacity: 1 }}
            animate={{ scale: 1.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className={`absolute -inset-6 rounded-full ${p.shockwave} blur-3xl pointer-events-none z-0`}
          />
        )}
      </AnimatePresence>

      {/* Futuristic High-Speed Racing / Broadcast Score Chassis SVG */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        viewBox="0 0 500 340"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`boxChamberBg-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isLeft ? '#020814' : '#100105'} stopOpacity="0.99" />
            <stop offset="28%" stopColor={isLeft ? '#041126' : '#1d0209'} stopOpacity="0.99" />
            <stop offset="72%" stopColor={isLeft ? '#020b1c' : '#140107'} stopOpacity="0.99" />
            <stop offset="100%" stopColor={isLeft ? '#01050e' : '#080003'} stopOpacity="1" />
          </linearGradient>

          <linearGradient id={`boxHullBorder-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={p.primary} stopOpacity="0.45" />
            <stop offset="20%" stopColor={p.primary} stopOpacity="0.95" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="80%" stopColor={p.primary} stopOpacity="0.95" />
            <stop offset="100%" stopColor={p.primary} stopOpacity="0.45" />
          </linearGradient>

          {/* Inner Panel Clipping Boundary - Stadium Shield Shape */}
          <clipPath id={`scorePanelInnerClip-${side}`}>
            <polygon points="55,20 445,20 478,52 484,170 478,288 445,320 55,320 22,288 16,170 22,52" />
          </clipPath>

          {/* Glow filter for radiant speed streaks */}
          <filter id={`streakGlow-${side}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial flare gradients for luminous speed corner blooms */}
          <radialGradient id={`flareBloom-${side}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={p.primary} stopOpacity="0.8" />
            <stop offset="35%" stopColor={p.primary} stopOpacity="0.38" />
            <stop offset="70%" stopColor={p.primary} stopOpacity="0.1" />
            <stop offset="100%" stopColor={p.primary} stopOpacity="0" />
          </radialGradient>

          {/* Dynamic 45-Degree Speed Streak Beam Gradient (Directional / Slanted) */}
          <linearGradient id={`speedBeamGrad-${side}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={p.primary} stopOpacity="0" />
            <stop offset="20%" stopColor={p.primary} stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="80%" stopColor={p.primary} stopOpacity="0.8" />
            <stop offset="100%" stopColor={p.primary} stopOpacity="0" />
          </linearGradient>

          {/* Speed Capsule Bar Gradient */}
          <linearGradient id={`speedCapsuleGrad-${side}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={p.primary} stopOpacity="0.1" />
            <stop offset="35%" stopColor={p.primary} stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="65%" stopColor={p.primary} stopOpacity="0.85" />
            <stop offset="100%" stopColor={p.primary} stopOpacity="0.1" />
          </linearGradient>

          {/* Feathered Deep Obsidian Contrast Shield Blur Filter */}
          <filter id={`shieldFeatherBlur-${side}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="24" />
          </filter>

          {/* Deep Center Feathered Contrast Shield Gradient */}
          <radialGradient id={`scoreCenterVignette-${side}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#010307" stopOpacity="0.98" />
            <stop offset="28%" stopColor="#010307" stopOpacity="0.94" />
            <stop offset="52%" stopColor="#010307" stopOpacity="0.72" />
            <stop offset="74%" stopColor="#010307" stopOpacity="0.36" />
            <stop offset="88%" stopColor="#010307" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#010307" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Bloom Shadow */}
        <polygon
          points="55,20 445,20 478,52 484,170 478,288 445,320 55,320 22,288 16,170 22,52"
          fill="none"
          stroke={p.primary}
          strokeWidth="7"
          opacity="0.3"
          filter="blur(8px)"
        />

        {/* 2. Outer Armor Plating Foundation */}
        <polygon
          points="55,20 445,20 478,52 484,170 478,288 445,320 55,320 22,288 16,170 22,52"
          fill={`url(#boxChamberBg-${side})`}
          stroke={`url(#boxHullBorder-${side})`}
          strokeWidth="2.8"
          className="filter drop-shadow-[0_20px_60px_rgba(0,0,0,0.95)] transition-all duration-300 group-hover/score:stroke-white"
        />

        {/* 3. Futuristic High-Speed Racing / Fast-Track Broadcast Background */}
        <g clipPath={`url(#scorePanelInnerClip-${side})`} pointerEvents="none">
          {/* Dark Base Plate */}
          <polygon
            points="55,20 445,20 478,52 484,170 478,288 445,320 55,320 22,288 16,170 22,52"
            fill={isLeft ? '#020914' : '#120106'}
          />

          {/* High-Speed Racing / Fast-Track Broadcast Pattern (Horizontally Mirrored on Left Side) */}
          <g transform={isLeft ? 'translate(500, 0) scale(-1, 1)' : undefined}>
            {/* Photorealistic Metallic Anisotropic Speed-Plate Texture (Subdued intensity for crystal clear score readability) */}
            <image
              href={redPanelBg}
              x="0"
              y="0"
              width="500"
              height="340"
              preserveAspectRatio="xMidYMid slice"
              opacity="0.28"
              style={{
                filter: isLeft
                  ? 'hue-rotate(185deg) saturate(1.2) brightness(0.92)'
                  : 'brightness(0.92)',
              }}
            />
            {/* Top-Right Major Glowing Flare */}
            <ellipse
              cx="395"
              cy="70"
              rx="95"
              ry="38"
              transform="rotate(-45 395 70)"
              fill={`url(#flareBloom-${side})`}
              opacity="0.28"
            />
              {/* Bottom-Right & Bottom-Left Secondary Ambient Blooms */}
              <ellipse
                cx="380"
                cy="260"
                rx="80"
                ry="32"
                transform="rotate(-45 380 260)"
                fill={`url(#flareBloom-${side})`}
                opacity="0.20"
              />
              <ellipse
                cx="110"
                cy="235"
                rx="75"
                ry="30"
                transform="rotate(-45 110 235)"
                fill={`url(#flareBloom-${side})`}
                opacity="0.16"
              />

              {/* Top-Right Intense Speed Beam & Streaks */}
              <line
                x1="305"
                y1="155"
                x2="455"
                y2="5"
                stroke={p.primary}
                strokeWidth="12"
                opacity="0.14"
                filter={`url(#streakGlow-${side})`}
              />
              <line
                x1="315"
                y1="145"
                x2="455"
                y2="5"
                stroke={`url(#speedBeamGrad-${side})`}
                strokeWidth="2.8"
                opacity="0.50"
              />
              <line
                x1="325"
                y1="135"
                x2="455"
                y2="5"
                stroke="#ffffff"
                strokeWidth="1.2"
                opacity="0.50"
              />

              {/* Top-Right Parallel Speed Lines */}
              <line
                x1="285"
                y1="155"
                x2="425"
                y2="15"
                stroke={p.primary}
                strokeWidth="1.4"
                strokeOpacity="0.30"
                strokeDasharray="45 15 15 10"
              />
              <line
                x1="340"
                y1="165"
                x2="465"
                y2="40"
                stroke={p.primary}
                strokeWidth="1"
                strokeOpacity="0.20"
              />
              <line
                x1="365"
                y1="175"
                x2="475"
                y2="65"
                stroke={p.primary}
                strokeWidth="0.8"
                strokeOpacity="0.16"
              />

              {/* Top-Right Speed Capsule Bar */}
              <line
                x1="375"
                y1="120"
                x2="445"
                y2="50"
                strokeLinecap="round"
                stroke={p.primary}
                strokeWidth="6"
                opacity="0.16"
              />
              <line
                x1="380"
                y1="115"
                x2="440"
                y2="55"
                strokeLinecap="round"
                stroke={`url(#speedCapsuleGrad-${side})`}
                strokeWidth="2.4"
                opacity="0.40"
              />

              {/* Top-Left Stepped Technical HUD Lines */}
              <path
                d="M 65,42 L 135,42 L 160,67 L 230,67"
                fill="none"
                stroke={p.primary}
                strokeWidth="1.4"
                strokeOpacity="0.40"
              />
              <path
                d="M 95,50 L 138,50 L 160,72 L 210,72"
                fill="none"
                stroke={p.primary}
                strokeWidth="0.8"
                strokeOpacity="0.20"
              />

              {/* Top-Left Dot Matrix Under Stepped HUD (4 cols x 3 rows) */}
              {[165, 175, 185, 195].map((gridX) =>
                [78, 87, 96].map((gridY) => (
                  <circle
                    key={`r-dot-${gridX}-${gridY}`}
                    cx={gridX}
                    cy={gridY}
                    r="1.3"
                    fill={p.primary}
                    opacity="0.40"
                  />
                ))
              )}

              {/* Top-Left Diagonal Speed Lines */}
              <line
                x1="55"
                y1="160"
                x2="170"
                y2="45"
                stroke={p.primary}
                strokeWidth="1.1"
                strokeOpacity="0.25"
              />
              <line
                x1="80"
                y1="175"
                x2="190"
                y2="65"
                stroke={p.primary}
                strokeWidth="0.8"
                strokeOpacity="0.18"
                strokeDasharray="30 10 10 10"
              />

              {/* Bottom-Left Speed Streaks & Aero Strakes */}
              <line
                x1="45"
                y1="285"
                x2="165"
                y2="165"
                stroke={`url(#speedBeamGrad-${side})`}
                strokeWidth="1.8"
                strokeOpacity="0.40"
              />
              <line
                x1="70"
                y1="305"
                x2="190"
                y2="185"
                stroke={p.primary}
                strokeWidth="1"
                strokeOpacity="0.22"
                strokeDasharray="35 12"
              />
              <line
                x1="95"
                y1="320"
                x2="205"
                y2="210"
                stroke={p.primary}
                strokeWidth="0.8"
                strokeOpacity="0.16"
              />

              {/* Bottom-Right Speed Lines & Blades */}
              <line
                x1="305"
                y1="325"
                x2="435"
                y2="195"
                stroke={`url(#speedBeamGrad-${side})`}
                strokeWidth="1.8"
                strokeOpacity="0.40"
              />
              <line
                x1="335"
                y1="335"
                x2="455"
                y2="215"
                stroke={p.primary}
                strokeWidth="1"
                strokeOpacity="0.25"
              />
              <line
                x1="365"
                y1="335"
                x2="470"
                y2="230"
                strokeLinecap="round"
                stroke={p.primary}
                strokeWidth="5"
                opacity="0.16"
              />

              {/* Bottom Center-Right Dot Matrix Array (5 cols x 4 rows) */}
              {[272, 281, 290, 299, 308].map((gridX) =>
                [270, 279, 288, 297].map((gridY) => (
                  <circle
                    key={`r-bot-dot-${gridX}-${gridY}`}
                    cx={gridX}
                    cy={gridY}
                    r="1.3"
                    fill={p.primary}
                    opacity="0.35"
                  />
                ))
              )}
          </g>

          {/* Top Technical Guide Rail & Row of Micro Ticks */}
          <line
            x1="68"
            y1="28"
            x2="432"
            y2="28"
            stroke={p.primary}
            strokeWidth="1"
            strokeOpacity="0.30"
            strokeDasharray="35 8 10 8"
          />

          {/* Bottom Technical HUD Bracket & Notched Tray */}
          <path
            d="M 65,308 L 65,314 L 175,314 M 195,314 L 305,314 M 325,314 L 435,314 L 435,308"
            fill="none"
            stroke={p.primary}
            strokeWidth="1.4"
            strokeOpacity="0.40"
          />
          <line
            x1="180"
            y1="314"
            x2="190"
            y2="314"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeOpacity="0.55"
          />
          <line
            x1="310"
            y1="314"
            x2="320"
            y2="314"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeOpacity="0.55"
          />

          {/* Depth Created with Feathered Deep Obsidian Contrast Shield - Seamlessly blended with soft edges, zero visible circle outline */}
          <ellipse
            cx="250"
            cy="170"
            rx="210"
            ry="125"
            fill={`url(#scoreCenterVignette-${side})`}
            filter={`url(#shieldFeatherBlur-${side})`}
          />
        </g>

        {/* 4. Top & Bottom Specular Highlight Lines */}
        <line x1="60" y1="20" x2="440" y2="20" stroke="#ffffff" strokeWidth="2.2" strokeOpacity="0.9" />
        <line x1="60" y1="320" x2="440" y2="320" stroke={p.primary} strokeWidth="2.6" strokeOpacity="0.95" />

        {/* 5. Left & Right Flanking Score Chevrons (as seen on side borders in reference image) */}
        {/* Left Flanking Chevron ◀ pointing left */}
        <polygon
          points="8,170 30,138 36,144 18,170 36,196 30,202"
          fill={p.primary}
          filter={`url(#streakGlow-${side})`}
        />
        <polygon
          points="12,170 28,144 32,148 18,170 32,192 28,196"
          fill="#ffffff"
          opacity="0.85"
        />

        {/* Right Flanking Chevron ▶ pointing right */}
        <polygon
          points="492,170 470,138 464,144 482,170 464,196 470,202"
          fill={p.primary}
          filter={`url(#streakGlow-${side})`}
        />
        <polygon
          points="488,170 472,144 468,148 482,170 468,192 472,196"
          fill="#ffffff"
          opacity="0.85"
        />

        {/* 6. Four Prominent Glowing Corner Anchor Nodes (Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
        <circle cx="55" cy="20" r="7" fill="none" stroke={p.primary} strokeWidth="1.4" opacity="0.8" />
        <circle cx="55" cy="20" r="4" fill="#ffffff" />
        <circle cx="445" cy="20" r="7" fill="none" stroke={p.primary} strokeWidth="1.4" opacity="0.8" />
        <circle cx="445" cy="20" r="4" fill="#ffffff" />
        <circle cx="445" cy="320" r="7" fill="none" stroke={p.primary} strokeWidth="1.4" opacity="0.8" />
        <circle cx="445" cy="320" r="4" fill="#ffffff" />
        <circle cx="55" cy="320" r="7" fill="none" stroke={p.primary} strokeWidth="1.4" opacity="0.8" />
        <circle cx="55" cy="320" r="4" fill="#ffffff" />
      </svg>

      {/* Sweeping Laser Scanner */}
      <div className="absolute inset-x-12 inset-y-6 overflow-hidden pointer-events-none opacity-30">
        <div className={`w-full h-[2px] ${p.scanGlow} absolute animate-cyber-scan shadow-[0_0_8px_${p.primary}]`} />
      </div>

      {/* Dynamic Pulse Ring */}
      <AnimatePresence>
        {surgeKey > 0 && (
          <motion.div
            key={`reactor-surge-${surgeKey}`}
            initial={{ scale: 0.5, opacity: 0.95 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="absolute w-44 h-44 rounded-full border-2 border-dashed pointer-events-none z-10"
            style={{
              borderColor: p.primary,
              boxShadow: `0 0 30px ${p.primary}`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Snap Score Numeral */}
      <div className="relative z-20 flex items-center justify-center select-none py-1 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={score}
            initial={{
              scale: 1.28,
              opacity: 0.4,
              filter: 'brightness(2.4) contrast(1.3)',
            }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: 'brightness(1) contrast(1)',
            }}
            exit={{
              scale: 0.88,
              opacity: 0,
              filter: 'brightness(0.5)',
            }}
            transition={{
              duration: 0.22,
              ease: [0.2, 0.9, 0.3, 1.1],
            }}
            className={`font-display font-black ${
              fontSize ? '' : 'text-[120px] sm:text-[160px] xl:text-[200px]'
            } leading-none tabular-nums tracking-normal text-transparent bg-clip-text bg-gradient-to-b ${
              p.scoreGrad
            } ${p.scoreShadow} group-hover/score:scale-[1.03] transition-transform duration-200`}
            style={fontSize ? { fontSize: `${fontSize}px` } : undefined}
          >
            {score}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
