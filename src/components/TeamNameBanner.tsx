import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import bluePanelBg from '../assets/images/blue_panel_bg.jpg';
import redPanelBg from '../assets/images/red_panel_bg.jpg';

interface TeamNameBannerProps {
  side: 'left' | 'right';
  name: string;
  color?: string;
  width?: number;
  height?: number;
  fontSize?: number;
}

export const TeamNameBanner: React.FC<TeamNameBannerProps> = ({
  side,
  name,
  width,
  height,
  fontSize,
}) => {
  const isLeft = side === 'left';
  const primary = isLeft ? '#00f0ff' : '#ff1753';

  const displayName = (name || (isLeft ? 'BLUE RAIDERS' : 'RED WARRIORS')).trim().slice(0, 15);
  const nameLen = displayName.length;

  const nameSize =
    nameLen <= 7
      ? 'text-xl sm:text-2xl xl:text-3xl'
      : nameLen <= 10
      ? 'text-lg sm:text-xl xl:text-2xl'
      : nameLen <= 12
      ? 'text-base sm:text-lg xl:text-xl'
      : 'text-sm sm:text-base xl:text-lg';

  return (
    <div
      id={`${side}-team-name-banner`}
      className="relative w-full h-full flex items-center justify-center select-none group/banner"
    >
      {/* Full Vector High-Speed Racing / Broadcast Name Chassis */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        viewBox="0 0 500 96"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`bannerMetalBg-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isLeft ? '#020814' : '#100105'} stopOpacity="0.99" />
            <stop offset="25%" stopColor={isLeft ? '#04132b' : '#22030b'} stopOpacity="0.99" />
            <stop offset="50%" stopColor={isLeft ? '#072044' : '#330512'} stopOpacity="1" />
            <stop offset="75%" stopColor={isLeft ? '#04132b' : '#22030b'} stopOpacity="0.99" />
            <stop offset="100%" stopColor={isLeft ? '#020814' : '#100105'} stopOpacity="0.99" />
          </linearGradient>

          <linearGradient id={`bannerBorderNeon-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primary} stopOpacity="0.4" />
            <stop offset="20%" stopColor={primary} stopOpacity="0.95" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="80%" stopColor={primary} stopOpacity="0.95" />
            <stop offset="100%" stopColor={primary} stopOpacity="0.4" />
          </linearGradient>

          {/* 45-degree Speed Streak Beam Gradient for Name Banner */}
          <linearGradient id={`bannerSpeedBeamGrad-${side}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primary} stopOpacity="0" />
            <stop offset="25%" stopColor={primary} stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="75%" stopColor={primary} stopOpacity="0.8" />
            <stop offset="100%" stopColor={primary} stopOpacity="0" />
          </linearGradient>

          {/* Soft bloom glow filter */}
          <filter id={`bannerGlow-${side}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Inner banner clipping boundary */}
          <clipPath id={`bannerInnerClip-${side}`}>
            <polygon points="38,8 462,8 492,43 462,78 38,78 8,43" />
          </clipPath>

          {/* Feathered Center Contrast Shield Filter */}
          <filter id={`bannerShieldBlur-${side}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="12" />
          </filter>

          <radialGradient id={`bannerCenterVignette-${side}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isLeft ? '#020814' : '#100105'} stopOpacity="0.95" />
            <stop offset="35%" stopColor={isLeft ? '#020814' : '#100105'} stopOpacity="0.80" />
            <stop offset="70%" stopColor={isLeft ? '#020814' : '#100105'} stopOpacity="0.35" />
            <stop offset="100%" stopColor={isLeft ? '#020814' : '#100105'} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Neon Glow Aura */}
        <polygon
          points="38,8 462,8 492,43 462,78 38,78 8,43"
          fill="none"
          stroke={primary}
          strokeWidth="6"
          opacity="0.35"
          filter="blur(5px)"
        />

        {/* Primary Beveled Armor Plate Hull */}
        <polygon
          points="38,8 462,8 492,43 462,78 38,78 8,43"
          fill={`url(#bannerMetalBg-${side})`}
          stroke={`url(#bannerBorderNeon-${side})`}
          strokeWidth="2.4"
          className="filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)]"
        />

        {/* High-Speed Racing / Telemetry Background Elements */}
        <g clipPath={`url(#bannerInnerClip-${side})`} pointerEvents="none">
          <g transform={isLeft ? 'translate(500, 0) scale(-1, 1)' : undefined}>
            {/* Photorealistic Metallic Speed-Plate Texture (Subdued for sharp text contrast) */}
            <image
              href={redPanelBg}
              x="0"
              y="0"
              width="500"
              height="96"
              preserveAspectRatio="xMidYMid slice"
              opacity="0.28"
              style={{
                filter: isLeft
                  ? 'hue-rotate(185deg) saturate(1.2) brightness(0.92)'
                  : 'brightness(0.92)',
              }}
            />

            {/* Dynamic 45-Degree Speed Streaks across Banner */}
            <line
              x1="20"
              y1="82"
              x2="110"
              y2="-8"
              stroke={primary}
              strokeWidth="10"
              opacity="0.25"
              filter={`url(#bannerGlow-${side})`}
            />
            <line
              x1="28"
              y1="76"
              x2="108"
              y2="-4"
              stroke={`url(#bannerSpeedBeamGrad-${side})`}
              strokeWidth="2.5"
            />
            <line
              x1="60"
              y1="86"
              x2="145"
              y2="1"
              stroke={primary}
              strokeWidth="1.2"
              strokeOpacity="0.45"
              strokeDasharray="25 8"
            />
            <line
              x1="180"
              y1="86"
              x2="265"
              y2="1"
              stroke={primary}
              strokeWidth="0.9"
              strokeOpacity="0.25"
            />
            <line
              x1="320"
              y1="86"
              x2="410"
              y2="-4"
              stroke={primary}
              strokeWidth="1.2"
              strokeOpacity="0.45"
              strokeDasharray="30 10"
            />
            <line
              x1="390"
              y1="84"
              x2="475"
              y2="-1"
              stroke={`url(#bannerSpeedBeamGrad-${side})`}
              strokeWidth="3"
            />
            <line
              x1="410"
              y1="82"
              x2="490"
              y2="2"
              stroke="#ffffff"
              strokeWidth="1"
              opacity="0.8"
            />
          </g>

          {/* Top & Bottom Technical Guide Rails */}
          <line
            x1="60"
            y1="16"
            x2="440"
            y2="16"
            stroke={primary}
            strokeWidth="1"
            strokeOpacity="0.35"
            strokeDasharray="40 8 10 8"
          />
          <line
            x1="60"
            y1="70"
            x2="440"
            y2="70"
            stroke={primary}
            strokeWidth="1"
            strokeOpacity="0.35"
            strokeDasharray="30 8 50 12"
          />

          {/* Micro Telemetry Dot Matrix (Center Top) */}
          {[220, 232, 244, 256, 268, 280].map((dotX) => (
            <circle key={dotX} cx={dotX} cy="16" r="1.3" fill={primary} opacity="0.7" />
          ))}

          {/* Feathered Center Dark Vignette to ensure text clarity with soft edge blend */}
          <ellipse
            cx="250"
            cy="43"
            rx="160"
            ry="32"
            fill={`url(#bannerCenterVignette-${side})`}
            filter={`url(#bannerShieldBlur-${side})`}
          />
        </g>

        {/* Left Chevrons: 3 nested arrows pointing left <<< */}
        <g opacity="0.9" filter={`url(#bannerGlow-${side})`}>
          <path
            d="M 28,26 L 16,43 L 28,60"
            fill="none"
            stroke={primary}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 40,26 L 28,43 L 40,60"
            fill="none"
            stroke={primary}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.85"
          />
          <path
            d="M 52,26 L 40,43 L 52,60"
            fill="none"
            stroke={primary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.6"
          />
        </g>

        {/* Right Chevrons: 3 nested arrows pointing right >>> */}
        <g opacity="0.9" filter={`url(#bannerGlow-${side})`}>
          <path
            d="M 448,26 L 460,43 L 448,60"
            fill="none"
            stroke={primary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.6"
          />
          <path
            d="M 460,26 L 472,43 L 460,60"
            fill="none"
            stroke={primary}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.85"
          />
          <path
            d="M 472,26 L 484,43 L 472,60"
            fill="none"
            stroke={primary}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Top/Bottom Edge Specular Highlights */}
        <line x1="58" y1="9" x2="442" y2="9" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.85" />
        <line x1="65" y1="77" x2="435" y2="77" stroke={primary} strokeWidth="2.2" strokeOpacity="0.9" />

        {/* Glowing Anchor Vertex Nodes */}
        <circle cx="38" cy="8" r="3.2" fill="#ffffff" />
        <circle cx="462" cy="8" r="3.2" fill="#ffffff" />
        <circle cx="492" cy="43" r="3.5" fill="#ffffff" />
        <circle cx="462" cy="78" r="3.2" fill="#ffffff" />
        <circle cx="38" cy="78" r="3.2" fill="#ffffff" />
        <circle cx="8" cy="43" r="3.5" fill="#ffffff" />

        {/* Dual Vertical Connector Stems to Score Panel Below (as seen in reference image) */}
        <line x1="85" y1="78" x2="85" y2="92" stroke={primary} strokeWidth="1.8" strokeOpacity="0.8" />
        <circle cx="85" cy="92" r="2.8" fill="#ffffff" stroke={primary} strokeWidth="1.5" />
        <line x1="415" y1="78" x2="415" y2="92" stroke={primary} strokeWidth="1.8" strokeOpacity="0.8" />
        <circle cx="415" cy="92" r="2.8" fill="#ffffff" stroke={primary} strokeWidth="1.5" />
      </svg>

      {/* Holographic Scan Beam */}
      <div className="absolute inset-x-8 inset-y-1 overflow-hidden pointer-events-none rounded-lg">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent absolute animate-cyber-scan" />
      </div>

      {/* Team Name Label */}
      <div className="relative z-10 w-full h-full px-6 flex items-center justify-center pointer-events-none">
        <h1
          className={`font-display font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-white drop-shadow-[0_3px_15px_rgba(0,0,0,1)] ${
            fontSize ? '' : nameSize
          } truncate max-w-[85%] text-center leading-tight`}
          style={fontSize ? { fontSize: `${fontSize}px` } : undefined}
          title={displayName}
        >
          {displayName}
        </h1>
      </div>
    </div>
  );
};
