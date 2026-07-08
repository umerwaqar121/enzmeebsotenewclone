import React from 'react';

// ═══ PARTNER LOGOS CRATED TO PERFECTLY MATCH USER UPLOADED IMAGE ═══

/**
 * 1. Iarnród Éireann / Irish Rail Logo
 * Styled vector with exact green/orange arrows and custom dual-language text.
 */
export const IrishRailLogo = () => (
  <svg viewBox="0 0 200 60" className="h-10 w-auto opacity-85 hover:opacity-100 transition-opacity" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="irishRailGreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7CB342" />
        <stop offset="100%" stopColor="#33691E" />
      </linearGradient>
      <linearGradient id="irishRailOrange" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFB300" />
        <stop offset="100%" stopColor="#E65100" />
      </linearGradient>
    </defs>
    <g transform="translate(4, 0)">
      {/* Green Left Chevron */}
      <path d="M14 30 L32 12 V48 Z" fill="url(#irishRailGreen)" />
      {/* Grey Diagonal Divider bar */}
      <path d="M32 12 L37 17 V43 L32 48 Z" fill="#90A4AE" opacity="0.8" />
      {/* Orange Right Chevron */}
      <path d="M55 30 L37 12 V48 Z" fill="url(#irishRailOrange)" />
    </g>
    {/* Company Name in clean Irish/English typeface */}
    <text x="68" y="27" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="-0.2px">Iarnród Éireann</text>
    <text x="68" y="44" fill="#81C784" fontSize="15" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="-0.2px">Irish Rail</text>
  </svg>
);

/**
 * 2. Mater Misericordiae (Misericordia) University Hospital Logo
 * Highly-polished medieval crest with golden crown, cross, anchor, and scroll ribbon.
 */
export const MisericordiaLogo = () => (
  <svg viewBox="0 0 220 60" className="h-11 w-auto opacity-85 hover:opacity-100 transition-opacity" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Elegant Gold Crown */}
    <path d="M20 9 L17 15 L28 13 L39 15 L36 9 Z" fill="#FFC107" stroke="#FF8F00" strokeWidth="1" />
    <circle cx="17" cy="15" r="1.2" fill="#FF8F00" />
    <circle cx="28" cy="13" r="1.8" fill="#FFD54F" />
    <circle cx="39" cy="15" r="1.2" fill="#FF8F00" />
    
    {/* Shield Base */}
    <path d="M17 18 H39 V34 C39 40, 28 44, 28 44 C28 44, 17 40, 17 34 V18 Z" fill="#FFFFFF" stroke="#FFC107" strokeWidth="1.5" />
    
    {/* Left blue quadrant */}
    <path d="M17.8 18.8 H28 V43.1 C22 41.5, 17.8 37.5, 17.8 34 V18.8 Z" fill="#29B6F6" />
    
    {/* Right green quadrant */}
    <path d="M28 18.8 H38.2 V34 C38.2 37.5, 34 41.5, 28 43.1 V18.8 Z" fill="#66BB6A" />
    
    {/* Celtic Cross (Left side) */}
    <circle cx="23" cy="28.5" r="2.8" stroke="#FFFFFF" strokeWidth="0.8" fill="none" />
    <path d="M23 23.5 V33.5 M18 28.5 H28" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    
    {/* Anchor (Right side) */}
    <path d="M33 24 V33 M30.5 30.5 C30.5 33, 35.5 33, 35.5 30.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <path d="M31.5 24 H34.5" stroke="#FFFFFF" strokeWidth="1.2" />
    
    {/* Gold Ribbon with Misericordia lettering */}
    <path d="M12 43.5 Q28 47.5 44 43.5 L42.5 41 Q28 44.5 13.5 41 Z" fill="#FFB300" stroke="#FF8F00" strokeWidth="0.5" />
    <text x="28" y="44" fill="#1A1A1A" fontSize="3.6" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.4">MISERICORDIA</text>

    {/* Side Typography */}
    <text x="52" y="27" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="system-ui, sans-serif">Mater Hospital</text>
    <text x="52" y="42" fill="#B0BEC5" fontSize="10" fontWeight="500" fontFamily="system-ui, sans-serif">Misericordia University</text>
  </svg>
);

/**
 * 3. Maynooth University Logo
 * Divided into 4 colored quadrants: Book, Sundial, Fern, and Castle.
 */
export const MaynoothLogo = () => (
  <svg viewBox="0 0 250 60" className="h-11 w-auto opacity-85 hover:opacity-100 transition-opacity" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* White shield backing */}
    <rect x="10" y="10" width="36" height="36" rx="4" fill="#FFFFFF" />
    
    {/* Top-Left: Deep Blue with Book */}
    <path d="M11 11 H28 V28 H11 V11 Z" fill="#0D47A1" />
    <path d="M14 21 Q19.5 22.5 19.5 17 Q19.5 22.5 25 21 V16.5 Q19.5 17.5 19.5 13.5 Q19.5 17.5 14 16.5 Z" fill="#FFFFFF" />
    
    {/* Top-Right: Gold with Sundial */}
    <path d="M28 11 H45 V28 H28 V11 Z" fill="#FFC107" />
    <circle cx="36.5" cy="19.5" r="4.5" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
    <path d="M36.5 19.5 L39.5 16.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M36.5 15.5 V19.5 H40.5" stroke="#FFFFFF" strokeWidth="0.8" />
    
    {/* Bottom-Left: Teal with Fern */}
    <path d="M11 28 H28 V45 H11 V28 Z" fill="#00695C" />
    <path d="M14 41 C16.5 38.5, 22.5 32.5, 24.5 29.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M17.5 38 L15.5 37 M19.5 36 L17.5 35 M21.5 34 L19.5 33 M23.5 32 L21.5 31" stroke="#FFFFFF" strokeWidth="0.8" />
    
    {/* Bottom-Right: Burgundy with Castle */}
    <path d="M28 28 H45 V45 H28 V28 Z" fill="#880E4F" />
    <path d="M32 41 V32.5 H34 V30.5 H39 V32.5 H41 V41 Z" fill="#FFFFFF" />
    <path d="M35.5 30.5 V32.5 M37.5 30.5 V32.5" stroke="#880E4F" strokeWidth="0.8" />
    <rect x="35" y="35" width="2.5" height="3.5" rx="0.5" fill="#880E4F" />
    
    {/* Official Logo Text */}
    <text x="56" y="27" fill="#FFFFFF" fontSize="14" fontWeight="800" fontFamily="system-ui, sans-serif">Maynooth</text>
    <text x="56" y="41" fill="#FFFFFF" fontSize="14" fontWeight="400" fontFamily="system-ui, sans-serif">University</text>
    <text x="134" y="26" fill="#CFD8DC" fontSize="8.5" fontWeight="400" fontFamily="system-ui, sans-serif">National University</text>
    <text x="134" y="37" fill="#CFD8DC" fontSize="8.5" fontWeight="400" fontFamily="system-ui, sans-serif">of Ireland Maynooth</text>
  </svg>
);

/**
 * 4. RTÉ Logo
 * Heavy, modern geometric wordmark with the signature green accent arc.
 */
export const RteLogo = () => (
  <svg viewBox="0 0 160 60" className="h-10 w-auto opacity-85 hover:opacity-100 transition-opacity" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* "R" */}
    <path d="M15 44 V16 H29 C35.5 16, 39.5 19.5, 39.5 25.5 C39.5 30.5, 35.5 33.5, 30.5 33.5 H21.5 V44 H15 Z M21.5 28 H29.5 C32 28, 33.5 27, 33.5 25 C33.5 23, 32 22, 29.5 22 H21.5 V28 Z" fill="#FFFFFF" />
    <path d="M29 33 L39.5 44 H32 L23 33.5 H29 Z" fill="#FFFFFF" />
    
    {/* "T" */}
    <path d="M44 16 H64 V22 H56.5 V44 H50.5 V22 H44 V16 Z" fill="#FFFFFF" />
    
    {/* "É" */}
    <path d="M69 16 H87 V22 H75 V28 H85 V33.5 H75 V38.5 H87 V44 H69 V16 Z" fill="#FFFFFF" />
    
    {/* Green Accent Arc */}
    <path d="M72.5 10.5 Q80 6.5 87.5 10.5" stroke="#00C853" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/**
 * 5. UCD Dublin Logo
 * Crest with 3 castles, UCD DUBLIN text, and a golden Irish harp in deep green background.
 */
export const UcdLogo = () => (
  <svg viewBox="0 0 180 60" className="h-11 w-auto opacity-85 hover:opacity-100 transition-opacity" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shield outer boundary */}
    <path d="M12 10 H42 V28 C42 35, 27 48, 27 48 C27 48, 12 35, 12 28 V10 Z" fill="#01579B" stroke="#00C853" strokeWidth="1.5" />
    
    {/* Green lower portion */}
    <path d="M12.7 28 C12.7 34, 27 46.5, 27 46.5 C27 46.5, 41.3 34, 41.3 28 H12.7 Z" fill="#2E7D32" />
    
    {/* Three white castle towers */}
    <path d="M16 23 V17.5 H17.2 V15.5 H18.8 V17.5 H20 V23 Z" fill="#FFFFFF" />
    <path d="M24 23 V17.5 H25.2 V15.5 H26.8 V17.5 H28 V23 Z" fill="#FFFFFF" />
    <path d="M32 23 V17.5 H33.2 V15.5 H34.8 V17.5 H36 V23 Z" fill="#FFFFFF" />
    
    {/* Horizontal divider banner for "UCD DUBLIN" */}
    <rect x="11.5" y="24" width="31" height="5.5" fill="#0D47A1" stroke="#FFFFFF" strokeWidth="0.8" />
    <text x="27" y="28.5" fill="#FFFFFF" fontSize="4.2" fontWeight="950" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.3">UCD DUBLIN</text>
    
    {/* Golden Irish Harp */}
    <path d="M23 32.5 V43" stroke="#FFD54F" strokeWidth="1.2" />
    <path d="M23 32.5 Q29 33.5 32 36.5 L23 43" fill="none" stroke="#FFD54F" strokeWidth="1.5" />
    <line x1="25.5" y1="33.8" x2="25.5" y2="41.5" stroke="#FFD54F" strokeWidth="0.6" />
    <line x1="27.5" y1="34.4" x2="27.5" y2="39.8" stroke="#FFD54F" strokeWidth="0.6" />
    <line x1="29.5" y1="35.0" x2="29.5" y2="38.0" stroke="#FFD54F" strokeWidth="0.6" />
    
    {/* Logo typography */}
    <text x="49" y="28" fill="#FFFFFF" fontSize="15" fontWeight="800" fontFamily="system-ui, sans-serif">UCD</text>
    <text x="49" y="42" fill="#B0BEC5" fontSize="11" fontWeight="500" fontFamily="system-ui, sans-serif" letterSpacing="0.1px">University College Dublin</text>
  </svg>
);
