import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TeamScorePodProps {
  side: 'left' | 'right';
  name: string;
  score: number;
  opponentScore?: number;
  color?: string;
  isScoring: boolean;
  onAdjustScore?: (delta: number) => void;
}

export const TeamScorePod: React.FC<TeamScorePodProps> = ({
  side,
  name,
  score,
  isScoring,
  onAdjustScore,
}) => {
  const isLeft = side === 'left';

  // State to trigger reactor surge & energy arcs on score change
  const [surgeKey, setSurgeKey] = useState(0);
  const prevScoreRef = useRef(score);

  useEffect(() => {
    if (prevScoreRef.current !== score) {
      setSurgeKey((k) => k + 1);
      prevScoreRef.current = score;
    }
  }, [score]);

  // Cybernetic / Alien Sci-Fi Vector Palette
  const p = isLeft
    ? {
        primary: '#00f0ff',
        secondary: '#0284c7',
        neonGlow: '#00f0ff',
        scoreGrad: 'from-white via-cyan-100 to-cyan-400',
        scoreShadow: 'drop-shadow-[0_4px_30px_rgba(0,240,255,0.85)] drop-shadow-[0_2px_4px_rgba(0,0,0,1)]',
        shockwave: 'bg-cyan-500/40',
        scanGlow: 'bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent',
      }
    : {
        primary: '#ff1753',
        secondary: '#be123c',
        neonGlow: '#ff1753',
        scoreGrad: 'from-white via-rose-100 to-red-500',
        scoreShadow: 'drop-shadow-[0_4px_30px_rgba(255,23,83,0.85)] drop-shadow-[0_2px_4px_rgba(0,0,0,1)]',
        shockwave: 'bg-red-500/40',
        scanGlow: 'bg-gradient-to-r from-transparent via-rose-500/50 to-transparent',
      };

  const displayName = (name || (isLeft ? 'BLUE RAIDERS' : 'RED WARRIORS')).trim().slice(0, 15);
  const nameLen = displayName.length;

  const nameSize =
    nameLen <= 7
      ? 'text-2xl sm:text-3xl xl:text-4xl'
      : nameLen <= 10
      ? 'text-xl sm:text-2xl xl:text-3xl'
      : nameLen <= 12
      ? 'text-lg sm:text-xl xl:text-2xl'
      : 'text-base sm:text-lg xl:text-xl';

  return (
    <div
      id={`${side}-alien-hex-monolith`}
      className="w-full max-w-[500px] flex flex-col items-center relative select-none group"
    >
      {/* Dynamic Scoring Shockwave Burst */}
      <AnimatePresence>
        {isScoring && (
          <motion.div
            initial={{ scale: 0.85, opacity: 1 }}
            animate={{ scale: 1.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className={`absolute -inset-8 rounded-full ${p.shockwave} blur-3xl pointer-events-none z-0`}
          />
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODULE 1: COMPLEX ALIEN CYBER-HEXAGON TEAM BANNER
          ========================================================================= */}
      <div className="relative w-full h-[78px] sm:h-[86px] z-20 mb-[-8px] group/banner">
        {/* Full Vector Hexagonal Mechanical Wing Chassis */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          viewBox="0 0 500 86"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`bannerMetalBg-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isLeft ? '#020b1c' : '#180208'} stopOpacity="0.98" />
              <stop offset="20%" stopColor={isLeft ? '#071d3d' : '#300612'} stopOpacity="0.98" />
              <stop offset="50%" stopColor={isLeft ? '#0a2a57' : '#45091a'} stopOpacity="1" />
              <stop offset="80%" stopColor={isLeft ? '#071d3d' : '#300612'} stopOpacity="0.98" />
              <stop offset="100%" stopColor={isLeft ? '#020b1c' : '#180208'} stopOpacity="0.98" />
            </linearGradient>

            <linearGradient id={`bannerBorderNeon-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={p.primary} stopOpacity="0.4" />
              <stop offset="20%" stopColor={p.primary} stopOpacity="0.95" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="80%" stopColor={p.primary} stopOpacity="0.95" />
              <stop offset="100%" stopColor={p.primary} stopOpacity="0.4" />
            </linearGradient>

            <pattern id={`bannerGrid-${side}`} width="12" height="20.78" patternUnits="userSpaceOnUse">
              <path
                d="M 6,0 L 12,3.46 L 12,10.39 L 6,13.85 L 0,10.39 L 0,3.46 Z"
                fill="none"
                stroke={p.primary}
                strokeWidth="0.5"
                strokeOpacity="0.22"
              />
            </pattern>
          </defs>

          {/* 1. Outer Neon Aura Silhouette */}
          <polygon
            points="38,4 462,4 496,43 462,82 38,82 4,43"
            fill="none"
            stroke={p.primary}
            strokeWidth="5"
            opacity="0.3"
            filter="blur(4px)"
          />

          {/* 2. Primary Beveled Hexagonal Armor Hull */}
          <polygon
            points="38,4 462,4 496,43 462,82 38,82 4,43"
            fill={`url(#bannerMetalBg-${side})`}
            stroke={`url(#bannerBorderNeon-${side})`}
            strokeWidth="2.5"
            className="filter drop-shadow-[0_8px_25px_rgba(0,0,0,0.95)]"
          />

          {/* 3. Honeycomb Mesh Grid Inside Banner */}
          <polygon
            points="46,12 454,12 484,43 454,74 46,74 16,43"
            fill={`url(#bannerGrid-${side})`}
          />

          {/* 4. Dashed Optical Circuit Contour Line */}
          <polygon
            points="48,14 452,14 480,43 452,72 48,72 20,43"
            fill="none"
            stroke={p.primary}
            strokeWidth="1.2"
            strokeOpacity="0.5"
            strokeDasharray="10 6 3 6"
          />

          {/* 5. Alien Tech Quad Wing Fins (Left Side) */}
          <path d="M 28,24 L 38,24 L 27,43 L 38,62 L 28,62 L 17,43 Z" fill={p.primary} opacity="0.75" />
          <path d="M 42,26 L 50,26 L 40,43 L 50,60 L 42,60 L 32,43 Z" fill={p.primary} opacity="0.4" />
          <path d="M 54,28 L 60,28 L 51,43 L 60,58 L 54,58 L 45,43 Z" fill={p.primary} opacity="0.25" />
          <line x1="68" y1="26" x2="68" y2="60" stroke={p.primary} strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4 3" />

          {/* 6. Alien Tech Quad Wing Fins (Right Side) */}
          <path d="M 472,24 L 462,24 L 473,43 L 462,62 L 472,62 L 483,43 Z" fill={p.primary} opacity="0.75" />
          <path d="M 458,26 L 450,26 L 460,43 L 450,60 L 458,60 L 468,43 Z" fill={p.primary} opacity="0.4" />
          <path d="M 446,28 L 440,28 L 449,43 L 440,58 L 446,58 L 455,43 Z" fill={p.primary} opacity="0.25" />
          <line x1="432" y1="26" x2="432" y2="60" stroke={p.primary} strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4 3" />

          {/* 7. Razor-Sharp Top White Specular Horizon */}
          <line x1="58" y1="6" x2="442" y2="6" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.75" />

          {/* 8. Bottom Laser Emitter Horizon */}
          <line x1="65" y1="80" x2="435" y2="80" stroke={p.primary} strokeWidth="2.5" strokeOpacity="0.9" />

          {/* 9. Hex Apex Pulsing Optical Nodes */}
          <circle cx="38" cy="4" r="3" fill="#ffffff" />
          <circle cx="462" cy="4" r="3" fill="#ffffff" />
          <circle cx="496" cy="43" r="4.5" fill={p.primary} className="animate-ping" style={{ transformOrigin: '496px 43px' }} />
          <circle cx="496" cy="43" r="3.5" fill="#ffffff" />
          <circle cx="462" cy="82" r="3" fill="#ffffff" />
          <circle cx="38" cy="82" r="3" fill="#ffffff" />
          <circle cx="4" cy="43" r="4.5" fill={p.primary} className="animate-ping" style={{ transformOrigin: '4px 43px' }} />
          <circle cx="4" cy="43" r="3.5" fill="#ffffff" />

          {/* 10. Corner Targeting Reticles */}
          <path d="M 52,18 L 42,18 L 30,36" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
          <path d="M 448,18 L 458,18 L 470,36" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
        </svg>

        {/* Dynamic Holographic Scan Beam Passing Across Banner */}
        <div className="absolute inset-x-12 inset-y-2 overflow-hidden pointer-events-none rounded-lg">
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent absolute animate-cyber-scan" />
        </div>

        {/* Banner Content Layout - Clean with only team name */}
        <div className="relative z-10 w-full h-full px-10 sm:px-16 flex items-center justify-center pointer-events-none">
          <h1
            className={`font-display font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-white drop-shadow-[0_3px_15px_rgba(0,0,0,1)] ${nameSize} truncate max-w-[340px] sm:max-w-[420px] text-center`}
            title={displayName}
          >
            {displayName}
          </h1>
        </div>
      </div>

      {/* =========================================================================
          MODULE 2: HYPER-COMPLEX ALIEN HEXAGON REACTOR SCORE CHAMBER
          ========================================================================= */}
      <div
        onClick={() => onAdjustScore && onAdjustScore(1)}
        title="Click score to add +1 point"
        className="relative w-full h-[270px] sm:h-[310px] xl:h-[340px] flex items-center justify-center cursor-pointer group/score select-none transition-transform duration-200 hover:scale-[1.018]"
      >
        {/* Complex Multi-Layered Alien Hexagon Reactor SVG Engine */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          viewBox="0 0 500 340"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`reactorChamberBg-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isLeft ? '#020814' : '#100105'} stopOpacity="0.99" />
              <stop offset="28%" stopColor={isLeft ? '#041126' : '#1d0209'} stopOpacity="0.99" />
              <stop offset="72%" stopColor={isLeft ? '#020b1c' : '#140107'} stopOpacity="0.99" />
              <stop offset="100%" stopColor={isLeft ? '#01050e' : '#080003'} stopOpacity="1" />
            </linearGradient>

            <linearGradient id={`reactorHullBorder-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={p.primary} stopOpacity="0.4" />
              <stop offset="20%" stopColor={p.primary} stopOpacity="0.95" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="80%" stopColor={p.primary} stopOpacity="0.95" />
              <stop offset="100%" stopColor={p.primary} stopOpacity="0.4" />
            </linearGradient>

            {/* Inner Panel Clipping Boundary */}
            <clipPath id={`podInnerClip-${side}`}>
              <polygon points="50,10 450,10 494,170 450,330 50,330 6,170" />
            </clipPath>

            {/* Glow filter for radiant speed streaks */}
            <filter id={`podStreakGlow-${side}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Radial flare gradients for luminous speed corner blooms */}
            <radialGradient id={`podFlareBloom-${side}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={p.primary} stopOpacity="0.75" />
              <stop offset="35%" stopColor={p.primary} stopOpacity="0.35" />
              <stop offset="70%" stopColor={p.primary} stopOpacity="0.1" />
              <stop offset="100%" stopColor={p.primary} stopOpacity="0" />
            </radialGradient>

            {/* Dynamic 45-Degree Speed Streak Beam Gradient (Directional / Slanted) */}
            <linearGradient id={`podSpeedBeamGrad-${side}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={p.primary} stopOpacity="0" />
              <stop offset="20%" stopColor={p.primary} stopOpacity="0.75" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.98" />
              <stop offset="80%" stopColor={p.primary} stopOpacity="0.75" />
              <stop offset="100%" stopColor={p.primary} stopOpacity="0" />
            </linearGradient>

            {/* Speed Capsule Bar Gradient */}
            <linearGradient id={`podSpeedCapsuleGrad-${side}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={p.primary} stopOpacity="0.1" />
              <stop offset="35%" stopColor={p.primary} stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="65%" stopColor={p.primary} stopOpacity="0.8" />
              <stop offset="100%" stopColor={p.primary} stopOpacity="0.1" />
            </linearGradient>

            {/* Deep Center Vignette for Crystal Clear Score Readability */}
            <radialGradient id={`podScoreCenterVignette-${side}`} cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor={isLeft ? '#01050e' : '#080003'} stopOpacity="0.95" />
              <stop offset="46%" stopColor={isLeft ? '#01050e' : '#080003'} stopOpacity="0.88" />
              <stop offset="78%" stopColor={isLeft ? '#01050e' : '#080003'} stopOpacity="0.38" />
              <stop offset="100%" stopColor={isLeft ? '#01050e' : '#080003'} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Neon Aura Bloom Soft Shadow */}
          <polygon
            points="50,10 450,10 494,170 450,330 50,330 6,170"
            fill="none"
            stroke={p.primary}
            strokeWidth="7"
            opacity="0.3"
            filter="blur(8px)"
          />

          {/* 2. Outer Armor Plating Foundation */}
          <polygon
            points="50,10 450,10 494,170 450,330 50,330 6,170"
            fill={`url(#reactorChamberBg-${side})`}
            stroke={`url(#reactorHullBorder-${side})`}
            strokeWidth="2.8"
            className="filter drop-shadow-[0_20px_60px_rgba(0,0,0,0.95)] transition-all duration-300 group-hover/score:stroke-white"
          />

          {/* 3. Futuristic High-Speed Racing / Fast-Track Broadcast Background */}
          <g clipPath={`url(#podInnerClip-${side})`} pointerEvents="none">
            {isLeft ? (
              /* =================== BLUE RAIDERS (CYAN-BLUE ILLUMINATED AERO TRACKS) =================== */
              <>
                {/* Top-Left Major Glowing Cyan Flare */}
                <ellipse
                  cx="100"
                  cy="65"
                  rx="85"
                  ry="34"
                  transform="rotate(-45 100 65)"
                  fill={`url(#podFlareBloom-${side})`}
                />

                {/* Bottom-Right Major Glowing Cyan Flare */}
                <ellipse
                  cx="380"
                  cy="255"
                  rx="95"
                  ry="36"
                  transform="rotate(-45 380 255)"
                  fill={`url(#podFlareBloom-${side})`}
                />

                {/* Top-Left Intense Speed Beam & Streaks */}
                <line
                  x1="30"
                  y1="135"
                  x2="165"
                  y2="0"
                  stroke={p.primary}
                  strokeWidth="12"
                  opacity="0.3"
                  filter={`url(#podStreakGlow-${side})`}
                />
                <line
                  x1="38"
                  y1="127"
                  x2="165"
                  y2="0"
                  stroke={`url(#podSpeedBeamGrad-${side})`}
                  strokeWidth="3.5"
                />
                <line
                  x1="48"
                  y1="117"
                  x2="165"
                  y2="0"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  opacity="0.95"
                />

                {/* Top-Left Parallel Precision Speed Lines */}
                <line
                  x1="18"
                  y1="108"
                  x2="118"
                  y2="8"
                  stroke={p.primary}
                  strokeWidth="1.2"
                  strokeOpacity="0.45"
                />
                <line
                  x1="58"
                  y1="142"
                  x2="185"
                  y2="15"
                  stroke={p.primary}
                  strokeWidth="1.8"
                  strokeOpacity="0.65"
                  strokeDasharray="50 15 15 10"
                />
                <line
                  x1="76"
                  y1="152"
                  x2="198"
                  y2="30"
                  stroke={p.primary}
                  strokeWidth="1"
                  strokeOpacity="0.35"
                />
                <line
                  x1="94"
                  y1="162"
                  x2="216"
                  y2="40"
                  stroke={p.primary}
                  strokeWidth="0.8"
                  strokeOpacity="0.25"
                />

                {/* Top Row of Small Cyan Dotted Details (Below Top Border) */}
                {[85, 97, 109, 121, 133, 145, 157, 169].map((dotX) => (
                  <circle key={dotX} cx={dotX} cy="34" r="1.4" fill={p.primary} opacity="0.75" />
                ))}

                {/* Top-Right Parallel Speed Streaks */}
                <line
                  x1="375"
                  y1="82"
                  x2="445"
                  y2="12"
                  stroke={p.primary}
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                />
                <line
                  x1="398"
                  y1="94"
                  x2="465"
                  y2="27"
                  stroke={p.primary}
                  strokeWidth="0.9"
                  strokeOpacity="0.3"
                />

                {/* Bottom-Right Major High-Speed Capsule Bars & Aero Strakes */}
                <line
                  x1="315"
                  y1="312"
                  x2="405"
                  y2="222"
                  strokeLinecap="round"
                  stroke={p.primary}
                  strokeWidth="9"
                  opacity="0.4"
                  filter={`url(#podStreakGlow-${side})`}
                />
                <line
                  x1="320"
                  y1="307"
                  x2="400"
                  y2="227"
                  strokeLinecap="round"
                  stroke={`url(#podSpeedCapsuleGrad-${side})`}
                  strokeWidth="4.2"
                />
                <line
                  x1="355"
                  y1="322"
                  x2="445"
                  y2="232"
                  strokeLinecap="round"
                  stroke={p.primary}
                  strokeWidth="7"
                  opacity="0.35"
                />
                <line
                  x1="360"
                  y1="317"
                  x2="440"
                  y2="237"
                  strokeLinecap="round"
                  stroke={`url(#podSpeedCapsuleGrad-${side})`}
                  strokeWidth="3"
                />

                {/* Bottom-Right Parallel Speed Lines */}
                <line
                  x1="285"
                  y1="330"
                  x2="430"
                  y2="185"
                  stroke={`url(#podSpeedBeamGrad-${side})`}
                  strokeWidth="2.2"
                  strokeOpacity="0.85"
                />
                <line
                  x1="260"
                  y1="325"
                  x2="390"
                  y2="195"
                  stroke={p.primary}
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                  strokeDasharray="40 12 15 8"
                />
                <line
                  x1="338"
                  y1="340"
                  x2="465"
                  y2="213"
                  stroke={p.primary}
                  strokeWidth="1.5"
                  strokeOpacity="0.55"
                />

                {/* Bottom Center-Right Dot Matrix Array (4 rows x 5 columns) */}
                {[270, 279, 288, 297, 306].map((gridX) =>
                  [270, 279, 288, 297].map((gridY) => (
                    <circle
                      key={`bp-dot-${gridX}-${gridY}`}
                      cx={gridX}
                      cy={gridY}
                      r="1.3"
                      fill={p.primary}
                      opacity="0.68"
                    />
                  ))
                )}

                {/* Bottom-Left Speed Blade & Fine Angled Accents */}
                <line
                  x1="25"
                  y1="280"
                  x2="90"
                  y2="215"
                  stroke={p.primary}
                  strokeWidth="1.5"
                  strokeOpacity="0.45"
                />
                <line
                  x1="35"
                  y1="300"
                  x2="110"
                  y2="225"
                  stroke={p.primary}
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  strokeDasharray="25 8"
                />
                <circle cx="48" cy="256" r="1.3" fill={p.primary} opacity="0.65" />
                <circle cx="56" cy="264" r="1.3" fill={p.primary} opacity="0.65" />
                <circle cx="64" cy="272" r="1.3" fill={p.primary} opacity="0.65" />
                <circle cx="72" cy="280" r="1.3" fill={p.primary} opacity="0.65" />
              </>
            ) : (
              /* =================== RED WARRIORS (CRIMSON-RED ILLUMINATED AERO TRACKS) =================== */
              <>
                {/* Top-Right Major Glowing Crimson Flare */}
                <ellipse
                  cx="395"
                  cy="70"
                  rx="90"
                  ry="35"
                  transform="rotate(-45 395 70)"
                  fill={`url(#podFlareBloom-${side})`}
                />

                {/* Bottom-Right & Bottom-Left Secondary Ambient Blooms */}
                <ellipse
                  cx="380"
                  cy="260"
                  rx="75"
                  ry="30"
                  transform="rotate(-45 380 260)"
                  fill={`url(#podFlareBloom-${side})`}
                  opacity="0.6"
                />
                <ellipse
                  cx="110"
                  cy="235"
                  rx="70"
                  ry="28"
                  transform="rotate(-45 110 235)"
                  fill={`url(#podFlareBloom-${side})`}
                  opacity="0.5"
                />

                {/* Top-Right Intense Speed Beam & Streaks */}
                <line
                  x1="315"
                  y1="150"
                  x2="455"
                  y2="10"
                  stroke={p.primary}
                  strokeWidth="14"
                  opacity="0.35"
                  filter={`url(#podStreakGlow-${side})`}
                />
                <line
                  x1="325"
                  y1="140"
                  x2="455"
                  y2="10"
                  stroke={`url(#podSpeedBeamGrad-${side})`}
                  strokeWidth="4"
                />
                <line
                  x1="335"
                  y1="130"
                  x2="455"
                  y2="10"
                  stroke="#ffffff"
                  strokeWidth="1.4"
                  opacity="0.92"
                />

                {/* Top-Right Parallel Speed Lines */}
                <line
                  x1="290"
                  y1="155"
                  x2="425"
                  y2="20"
                  stroke={p.primary}
                  strokeWidth="1.8"
                  strokeOpacity="0.65"
                  strokeDasharray="45 15 15 10"
                />
                <line
                  x1="345"
                  y1="165"
                  x2="465"
                  y2="45"
                  stroke={p.primary}
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                />
                <line
                  x1="365"
                  y1="175"
                  x2="475"
                  y2="65"
                  stroke={p.primary}
                  strokeWidth="0.9"
                  strokeOpacity="0.3"
                />

                {/* Top-Right Speed Capsule Bar */}
                <line
                  x1="375"
                  y1="120"
                  x2="445"
                  y2="50"
                  strokeLinecap="round"
                  stroke={p.primary}
                  strokeWidth="8"
                  opacity="0.32"
                />
                <line
                  x1="380"
                  y1="115"
                  x2="440"
                  y2="55"
                  strokeLinecap="round"
                  stroke={`url(#podSpeedCapsuleGrad-${side})`}
                  strokeWidth="3.2"
                />

                {/* Top-Left Stepped Technical HUD Lines */}
                <path
                  d="M 65,40 L 140,40 L 165,65 L 235,65"
                  fill="none"
                  stroke={p.primary}
                  strokeWidth="1.6"
                  strokeOpacity="0.75"
                />
                <path
                  d="M 95,48 L 142,48 L 165,71 L 215,71"
                  fill="none"
                  stroke={p.primary}
                  strokeWidth="0.9"
                  strokeOpacity="0.4"
                />

                {/* Top-Left Dot Matrix Under Stepped HUD (3 rows x 4 columns) */}
                {[165, 175, 185, 195].map((gridX) =>
                  [80, 89, 98].map((gridY) => (
                    <circle
                      key={`rp-dot-${gridX}-${gridY}`}
                      cx={gridX}
                      cy={gridY}
                      r="1.3"
                      fill={p.primary}
                      opacity="0.7"
                    />
                  ))
                )}

                {/* Top-Left Diagonal Speed Lines */}
                <line
                  x1="60"
                  y1="160"
                  x2="175"
                  y2="45"
                  stroke={p.primary}
                  strokeWidth="1.4"
                  strokeOpacity="0.5"
                />
                <line
                  x1="85"
                  y1="175"
                  x2="195"
                  y2="65"
                  stroke={p.primary}
                  strokeWidth="0.9"
                  strokeOpacity="0.35"
                  strokeDasharray="30 10 10 10"
                />

                {/* Bottom-Left Speed Streaks & Aero Strakes */}
                <line
                  x1="45"
                  y1="285"
                  x2="165"
                  y2="165"
                  stroke={`url(#podSpeedBeamGrad-${side})`}
                  strokeWidth="2.2"
                  strokeOpacity="0.8"
                />
                <line
                  x1="70"
                  y1="305"
                  x2="190"
                  y2="185"
                  stroke={p.primary}
                  strokeWidth="1.2"
                  strokeOpacity="0.45"
                  strokeDasharray="35 12"
                />
                <line
                  x1="95"
                  y1="320"
                  x2="205"
                  y2="210"
                  stroke={p.primary}
                  strokeWidth="0.9"
                  strokeOpacity="0.3"
                />

                {/* Bottom-Right Speed Lines & Blades */}
                <line
                  x1="305"
                  y1="325"
                  x2="435"
                  y2="195"
                  stroke={`url(#podSpeedBeamGrad-${side})`}
                  strokeWidth="2.4"
                  strokeOpacity="0.75"
                />
                <line
                  x1="335"
                  y1="335"
                  x2="455"
                  y2="215"
                  stroke={p.primary}
                  strokeWidth="1.4"
                  strokeOpacity="0.5"
                />
                <line
                  x1="365"
                  y1="335"
                  x2="470"
                  y2="230"
                  strokeLinecap="round"
                  stroke={p.primary}
                  strokeWidth="7"
                  opacity="0.35"
                />
              </>
            )}

            {/* Top Technical HUD Bracket & Specular Datum */}
            <path
              d="M 68,30 L 68,25 L 432,25 L 432,30"
              fill="none"
              stroke={p.primary}
              strokeWidth="1.2"
              strokeOpacity="0.5"
            />
            <line
              x1="210"
              y1="25"
              x2="290"
              y2="25"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeOpacity="0.75"
            />

            {/* Bottom Technical HUD Bracket & Notched Datum */}
            <path
              d="M 65,307 L 65,314 L 175,314 M 195,314 L 305,314 M 325,314 L 435,314 L 435,307"
              fill="none"
              stroke={p.primary}
              strokeWidth="1.5"
              strokeOpacity="0.65"
            />
            <line
              x1="210"
              y1="314"
              x2="290"
              y2="314"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeOpacity="0.7"
            />
            <line
              x1="180"
              y1="317"
              x2="190"
              y2="317"
              stroke={p.primary}
              strokeWidth="1.5"
              strokeOpacity="0.8"
            />
            <line
              x1="310"
              y1="317"
              x2="320"
              y2="317"
              stroke={p.primary}
              strokeWidth="1.5"
              strokeOpacity="0.8"
            />

            {/* Depth Created with Dark Layered Surfaces & Center Contrast Vignette */}
            <ellipse
              cx="250"
              cy="170"
              rx="180"
              ry="115"
              fill={`url(#podScoreCenterVignette-${side})`}
            />
          </g>

          {/* 4. Concentric Inner Hexagon Energy Conduit Ring 1 (Dashed Alien Tracks) */}
          <polygon
            points="64,24 436,24 476,170 436,316 64,316 24,170"
            fill="none"
            stroke={p.primary}
            strokeWidth="1.4"
            strokeOpacity="0.4"
            strokeDasharray="16 8 4 8"
          />

          {/* 9. Alien Tech Flank Heat Sinks & Emitter Fins (Left Flank) */}
          <path d="M 30,135 L 45,135 L 36,170 L 45,205 L 30,205 L 18,170 Z" fill={p.primary} opacity="0.8" />
          <path d="M 48,115 L 60,115 L 46,170 L 60,225 L 48,225 L 34,170 Z" fill={p.primary} opacity="0.4" />
          <path d="M 64,95 L 74,95 L 58,170 L 74,245 L 64,245 L 48,170 Z" fill={p.primary} opacity="0.2" />
          <line x1="72" y1="80" x2="72" y2="260" stroke={p.primary} strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="6 4" />

          {/* 10. Alien Tech Flank Heat Sinks & Emitter Fins (Right Flank) */}
          <path d="M 470,135 L 455,135 L 464,170 L 455,205 L 470,205 L 482,170 Z" fill={p.primary} opacity="0.8" />
          <path d="M 452,115 L 440,115 L 454,170 L 440,225 L 452,225 L 466,170 Z" fill={p.primary} opacity="0.4" />
          <path d="M 436,95 L 426,95 L 442,170 L 426,245 L 436,245 L 452,170 Z" fill={p.primary} opacity="0.2" />
          <line x1="428" y1="80" x2="428" y2="260" stroke={p.primary} strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="6 4" />

          {/* 11. Top Specular High-Voltage Horizon Line */}
          <line x1="85" y1="14" x2="415" y2="14" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="0.8" />

          {/* 12. Bottom Ion Accelerator Rail */}
          <line x1="95" y1="326" x2="405" y2="326" stroke={p.primary} strokeWidth="3" strokeOpacity="0.9" />

          {/* 13. Vertex Pulsar Energy Nodes */}
          <circle cx="50" cy="10" r="3.5" fill="#ffffff" />
          <circle cx="450" cy="10" r="3.5" fill="#ffffff" />
          <circle cx="494" cy="170" r="5" fill={p.primary} className="animate-pulse" />
          <circle cx="494" cy="170" r="3" fill="#ffffff" />
          <circle cx="450" cy="330" r="3.5" fill="#ffffff" />
          <circle cx="50" cy="330" r="3.5" fill="#ffffff" />
          <circle cx="6" cy="170" r="5" fill={p.primary} className="animate-pulse" />
          <circle cx="6" cy="170" r="3" fill="#ffffff" />

          {/* 14. Quad Precision HUD Corner Brackets */}
          <path d="M 75,36 L 58,36 L 38,88" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M 425,36 L 442,36 L 462,88" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M 75,304 L 58,304 L 38,252" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M 425,304 L 442,304 L 462,252" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.5" />
        </svg>

        {/* Dynamic Sweeping Laser Scanner Plane */}
        <div className="absolute inset-x-12 inset-y-6 overflow-hidden pointer-events-none">
          <div className={`w-full h-[3px] ${p.scanGlow} absolute animate-cyber-scan shadow-[0_0_12px_${p.primary}]`} />
        </div>

        {/* =========================================================================
            DYNAMIC REACTOR CORE OVERCHARGE PULSE RING (NO FLOATING TEXT)
            ========================================================================= */}
        <AnimatePresence>
          {surgeKey > 0 && (
            <motion.div
              key={`reactor-surge-${surgeKey}`}
              initial={{ scale: 0.5, opacity: 0.95 }}
              animate={{ scale: 1.6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="absolute w-48 h-48 rounded-full border-2 border-dashed pointer-events-none z-10"
              style={{
                borderColor: p.primary,
                boxShadow: `0 0 30px ${p.primary}`,
              }}
            />
          )}
        </AnimatePresence>

        {/* =========================================================================
            CLEAN, IMPACTFUL QUANTUM CORE GLITCH-SNAP SCORE NUMERAL
            ========================================================================= */}
        <div className="relative z-20 flex items-center justify-center select-none py-1">
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
              className={`font-display font-black text-[140px] sm:text-[185px] xl:text-[230px] leading-none tabular-nums tracking-tighter text-transparent bg-clip-text bg-gradient-to-b ${p.scoreGrad} ${p.scoreShadow} group-hover/score:scale-[1.03] transition-transform duration-200`}
            >
              {score}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
