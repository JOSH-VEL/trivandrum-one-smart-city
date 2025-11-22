
import React from 'react';

interface LandmarkIconProps {
  size?: number;
  className?: string;
  animated?: boolean;  // Enable hover/active animations
  variant?: 'normal' | 'float' | 'pulse' | 'bounce';  // Animation style
}

// Kovalam Beach
export const KovalamBeachSVG: React.FC<LandmarkIconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="beachGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#87CEEB" />
        <stop offset="50%" stopColor="#4DA6FF" />
        <stop offset="100%" stopColor="#FFD700" />
      </linearGradient>
    </defs>
    
    {/* Sky */}
    <rect width="100" height="40" fill="#87CEEB" />
    
    {/* Sun */}
    <circle cx="75" cy="15" r="8" fill="#FFD700" />
    
    {/* Ocean */}
    <path d="M0 40 Q25 35 50 40 T100 40 L100 100 L0 100 Z" fill="#4DA6FF" />
    <path d="M0 50 Q25 45 50 50 T100 50" stroke="#87CEEB" strokeWidth="2" fill="none" opacity="0.6" />
    
    {/* Sand */}
    <ellipse cx="50" cy="75" rx="35" ry="15" fill="#FFD700" opacity="0.8" />
    
    {/* Beach umbrella */}
    <line x1="50" y1="55" x2="50" y2="70" stroke="#8B4513" strokeWidth="2" />
    <path d="M40 55 Q50 45 60 55" fill="#FF6B6B" stroke="#FF6B6B" strokeWidth="1" />
    
    {/* Palm tree */}
    <line x1="20" y1="70" x2="20" y2="85" stroke="#8B4513" strokeWidth="2" />
    <circle cx="15" cy="65" r="3" fill="#228B22" />
    <circle cx="20" cy="60" r="4" fill="#228B22" />
    <circle cx="25" cy="65" r="3" fill="#228B22" />
  </svg>
);

// Ponmudi Hill Station
export const PonmudiHillSVG: React.FC<LandmarkIconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="hillGradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#2D5016" />
        <stop offset="50%" stopColor="#5A8C3A" />
        <stop offset="100%" stopColor="#87CEEB" />
      </linearGradient>
    </defs>
    
    {/* Sky */}
    <rect width="100" height="50" fill="#87CEEB" />
    
    {/* Mist/clouds */}
    <circle cx="25" cy="35" r="12" fill="white" opacity="0.4" />
    <circle cx="70" cy="40" r="10" fill="white" opacity="0.3" />
    
    {/* Back mountains */}
    <polygon points="10,50 40,20 70,50" fill="#5A8C3A" />
    
    {/* Front mountain */}
    <polygon points="5,60 50,15 95,60" fill="#2D5016" />
    
    {/* Tea plantations (terraces) */}
    <line x1="20" y1="45" x2="80" y2="45" stroke="#4A7C2C" strokeWidth="2" opacity="0.6" />
    <line x1="15" y1="52" x2="85" y2="52" stroke="#4A7C2C" strokeWidth="2" opacity="0.6" />
    <line x1="10" y1="59" x2="90" y2="59" stroke="#4A7C2C" strokeWidth="2" opacity="0.6" />
    
    {/* Forest trees */}
    <circle cx="30" cy="55" r="4" fill="#1F3A1A" />
    <circle cx="70" cy="50" r="3" fill="#1F3A1A" />
    <circle cx="50" cy="58" r="3" fill="#1F3A1A" />
  </svg>
);

// Padmanabhaswamy Temple
export const TemplateSVG: React.FC<LandmarkIconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="templeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#DAA520" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
    
    {/* Sky */}
    <rect width="100" height="40" fill="#87CEEB" />
    
    {/* Temple base */}
    <rect x="20" y="55" width="60" height="40" fill="#8B4513" rx="4" />
    
    {/* Temple tower (gopuram) */}
    <polygon points="50,20 70,40 65,40 65,55 35,55 35,40 30,40" fill="url(#templeGradient)" />
    
    {/* Tower decorations */}
    <circle cx="50" cy="25" r="3" fill="#FFD700" />
    <circle cx="45" cy="30" r="2" fill="#FFD700" />
    <circle cx="55" cy="30" r="2" fill="#FFD700" />
    
    {/* Temple doors */}
    <rect x="35" y="60" width="8" height="15" fill="#654321" rx="1" />
    <rect x="57" y="60" width="8" height="15" fill="#654321" rx="1" />
    
    {/* Temple windows */}
    <rect x="27" y="48" width="6" height="6" fill="#1A1A1A" />
    <rect x="67" y="48" width="6" height="6" fill="#1A1A1A" />
    
    {/* Flag pole */}
    <line x1="50" y1="18" x2="50" y2="12" stroke="#FF6B6B" strokeWidth="1" />
    <polygon points="50,12 54,14 50,16" fill="#FF6B6B" />
  </svg>
);

// Veli Tourist Village
export const VeliLakeSVG: React.FC<LandmarkIconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#00CED1" />
        <stop offset="100%" stopColor="#1E90FF" />
      </linearGradient>
    </defs>
    
    {/* Sky */}
    <rect width="100" height="35" fill="#87CEEB" />
    
    {/* Sun */}
    <circle cx="80" cy="15" r="6" fill="#FFD700" />
    
    {/* Water */}
    <rect y="35" width="100" height="65" fill="url(#waterGradient)" />
    
    {/* Water ripples */}
    <circle cx="30" cy="60" r="8" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
    <circle cx="70" cy="75" r="6" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
    
    {/* Boat */}
    <path d="M25 50 L35 55 L45 50 Z" fill="#8B4513" stroke="#654321" strokeWidth="1" />
    
    {/* Boat sail */}
    <polygon points="35,50 35,35 42,50" fill="#FF6B6B" opacity="0.8" />
    
    {/* Floating bridge */}
    <rect x="50" y="70" width="30" height="3" fill="#DAA520" rx="1" />
    <circle cx="55" cy="68" r="2" fill="#654321" />
    <circle cx="65" cy="68" r="2" fill="#654321" />
    <circle cx="75" cy="68" r="2" fill="#654321" />
    
    {/* Bridge railings */}
    <line x1="52" y1="68" x2="52" y2="62" stroke="#654321" strokeWidth="1" />
    <line x1="78" y1="68" x2="78" y2="62" stroke="#654321" strokeWidth="1" />
  </svg>
);

// Lulu Mall
export const ShoppingMallSVG: React.FC<LandmarkIconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#C0C0C0" />
        <stop offset="100%" stopColor="#808080" />
      </linearGradient>
    </defs>

    {/* Sky */}
    <rect width="100" height="20" fill="#87CEEB" />

    {/* Building main structure */}
    <rect x="10" y="25" width="80" height="65" fill="url(#buildingGradient)" rx="4" />

    {/* Building accent stripe */}
    <rect x="10" y="40" width="80" height="4" fill="#FFD700" />

    {/* Windows grid - row 1 */}
    <rect x="20" y="30" width="12" height="8" fill="#1E90FF" stroke="#333" strokeWidth="0.5" rx="1" />
    <rect x="36" y="30" width="12" height="8" fill="#1E90FF" stroke="#333" strokeWidth="0.5" rx="1" />
    <rect x="52" y="30" width="12" height="8" fill="#1E90FF" stroke="#333" strokeWidth="0.5" rx="1" />
    <rect x="68" y="30" width="12" height="8" fill="#1E90FF" stroke="#333" strokeWidth="0.5" rx="1" />

    {/* Windows grid - row 2 */}
    <rect x="20" y="48" width="12" height="8" fill="#1E90FF" stroke="#333" strokeWidth="0.5" rx="1" />
    <rect x="36" y="48" width="12" height="8" fill="#1E90FF" stroke="#333" strokeWidth="0.5" rx="1" />
    <rect x="52" y="48" width="12" height="8" fill="#1E90FF" stroke="#333" strokeWidth="0.5" rx="1" />
    <rect x="68" y="48" width="12" height="8" fill="#1E90FF" stroke="#333" strokeWidth="0.5" rx="1" />

    {/* Entrance */}
    <rect x="42" y="68" width="16" height="20" fill="#333" rx="2" />
    <rect x="45" y="71" width="10" height="8" fill="#FFD700" rx="1" />

    {/* Door lines */}
    <line x1="50" y1="71" x2="50" y2="79" stroke="#333" strokeWidth="0.5" />

    {/* Shopping bags icon (decorative) */}
    <path d="M25 85 L20 80 L30 80 Z" fill="#FF6B6B" />
    <path d="M75 85 L70 80 L80 80 Z" fill="#FF6B6B" />
  </svg>
);

// Thiruvananthapuram Zoo - Step 2 Extension
export const ZooSVG: React.FC<LandmarkIconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Sky */}
    <rect width="100" height="35" fill="#87CEEB" />
    
    {/* Trees - background */}
    <circle cx="20" cy="45" r="10" fill="#228B22" />
    <circle cx="80" cy="50" r="12" fill="#228B22" />
    
    {/* Grass */}
    <ellipse cx="50" cy="65" rx="45" ry="20" fill="#90EE90" />
    
    {/* Zoo fence */}
    <line x1="10" y1="55" x2="90" y2="55" stroke="#8B4513" strokeWidth="2" />
    <line x1="25" y1="55" x2="25" y2="75" stroke="#8B4513" strokeWidth="1.5" />
    <line x1="40" y1="55" x2="40" y2="75" stroke="#8B4513" strokeWidth="1.5" />
    <line x1="60" y1="55" x2="60" y2="75" stroke="#8B4513" strokeWidth="1.5" />
    <line x1="75" y1="55" x2="75" y2="75" stroke="#8B4513" strokeWidth="1.5" />
    
    {/* Animal - Elephant body */}
    <ellipse cx="35" cy="70" rx="8" ry="6" fill="#696969" />
    <circle cx="32" cy="68" r="3" fill="#696969" /> {/* Head */}
    <line x1="32" y1="68" x2="32" y2="76" stroke="#696969" strokeWidth="1.5" /> {/* Trunk */}
    
    {/* Animal - Giraffe */}
    <line x1="65" y1="80" x2="65" y2="60" stroke="#DAA520" strokeWidth="2" /> {/* Neck */}
    <circle cx="65" cy="58" r="2.5" fill="#DAA520" /> {/* Head */}
    <ellipse cx="65" cy="75" rx="4" ry="5" fill="#DAA520" /> {/* Body */}
    <circle cx="62" cy="75" r="1.5" fill="#DAA520" /> {/* Spot 1 */}
    <circle cx="68" cy="75" r="1.5" fill="#DAA520" /> {/* Spot 2 */}
    
    {/* Zoo Gate */}
    <rect x="45" y="80" width="10" height="8" fill="#654321" />
    <rect x="47" y="82" width="6" height="4" fill="#1A1A1A" />
  </svg>
);

// Sree Chitra Art Gallery
export const ArtGallerySVG: React.FC<LandmarkIconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Sky */}
    <rect width="100" height="25" fill="#E6E6FA" />
    
    {/* Building structure */}
    <rect x="15" y="30" width="70" height="55" fill="#FFFACD" stroke="#B8860B" strokeWidth="2" rx="3" />
    
    {/* Dome/Roof accent */}
    <path d="M20 30 Q50 10 80 30" fill="none" stroke="#B8860B" strokeWidth="2" />
    <circle cx="50" cy="18" r="8" fill="#FFD700" />
    
    {/* Columns */}
    <rect x="22" y="30" width="4" height="55" fill="#D2B48C" />
    <rect x="74" y="30" width="4" height="55" fill="#D2B48C" />
    
    {/* Art frames/paintings on wall */}
    <rect x="28" y="40" width="14" height="18" fill="#FF6B6B" stroke="#333" strokeWidth="1" />
    <rect x="47" y="40" width="14" height="18" fill="#4169E1" stroke="#333" strokeWidth="1" />
    <rect x="66" y="40" width="14" height="18" fill="#228B22" stroke="#333" strokeWidth="1" />
    
    {/* Abstract art patterns */}
    <circle cx="35" cy="49" r="3" fill="#FFD700" />
    <circle cx="54" cy="49" r="3" fill="#FFD700" />
    <circle cx="73" cy="49" r="3" fill="#FFD700" />
    
    {/* Entrance */}
    <rect x="47" y="80" width="6" height="10" fill="#333" />
    <circle cx="50" cy="85" r="0.5" fill="#FFD700" />
  </svg>
);

// Kanyakumari Cape
export const KanyakumariSVG: React.FC<LandmarkIconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="oceanGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#87CEEB" />
        <stop offset="50%" stopColor="#4DA6FF" />
        <stop offset="100%" stopColor="#00008B" />
      </linearGradient>
    </defs>
    
    {/* Sky */}
    <rect width="100" height="30" fill="#FFB6C1" />
    
    {/* Cape/Rocky formation */}
    <polygon points="20,50 30,30 80,40 75,65 35,70" fill="#8B7355" />
    <polygon points="30,40 45,50 40,65" fill="#A0826D" />
    
    {/* Ocean */}
    <rect y="45" width="100" height="55" fill="url(#oceanGradient2)" />
    
    {/* Waves */}
    <path d="M0 60 Q25 55 50 60 T100 60" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
    <path d="M0 75 Q25 70 50 75 T100 75" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
    
    {/* Monument silhouette */}
    <rect x="48" y="35" width="4" height="25" fill="#333" />
    <polygon points="50,32 45,35 55,35" fill="#FFD700" />
    
    {/* Fishing boats */}
    <path d="M20 55 L25 60 L30 55 Z" fill="#8B4513" />
    <path d="M75 65 L78 68 L81 65 Z" fill="#8B4513" />
  </svg>
);

// Napier Museum
export const NapierMuseumSVG: React.FC<LandmarkIconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Sky */}
    <rect width="100" height="30" fill="#87CEEB" />
    
    {/* Main building - Kerala architecture style */}
    <polygon points="15,40 50,20 85,40 80,75 20,75" fill="#CD853F" stroke="#8B4513" strokeWidth="2" />
    
    {/* Traditional roof pattern */}
    <line x1="30" y1="50" x2="70" y2="50" stroke="#8B4513" strokeWidth="1.5" opacity="0.7" />
    <line x1="28" y1="60" x2="72" y2="60" stroke="#8B4513" strokeWidth="1.5" opacity="0.7" />
    
    {/* Windows */}
    <rect x="25" y="35" width="8" height="8" fill="#1E90FF" stroke="#333" strokeWidth="0.5" />
    <rect x="67" y="35" width="8" height="8" fill="#1E90FF" stroke="#333" strokeWidth="0.5" />
    <rect x="30" y="50" width="8" height="8" fill="#1E90FF" stroke="#333" strokeWidth="0.5" />
    <rect x="62" y="50" width="8" height="8" fill="#1E90FF" stroke="#333" strokeWidth="0.5" />
    
    {/* Traditional spire */}
    <polygon points="50,18 48,28 52,28" fill="#DAA520" />
    
    {/* Entrance platform */}
    <ellipse cx="50" cy="78" rx="25" ry="4" fill="#A0826D" />
    <rect x="45" y="75" width="10" height="5" fill="#654321" />
  </svg>
);

// Akkulam Lake / Garden
export const AkkulamLakeSVG: React.FC<LandmarkIconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="lakeGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#20B2AA" />
        <stop offset="100%" stopColor="#008B8B" />
      </linearGradient>
    </defs>
    
    {/* Sky */}
    <rect width="100" height="30" fill="#FFD700" />
    <circle cx="80" cy="15" r="8" fill="#FFA500" /> {/* Sun */}
    
    {/* Lake water */}
    <ellipse cx="50" cy="55" rx="40" ry="35" fill="url(#lakeGradient2)" />
    
    {/* Water reflections */}
    <circle cx="30" cy="45" r="5" fill="white" opacity="0.3" />
    <circle cx="70" cy="60" r="4" fill="white" opacity="0.2" />
    
    {/* Gardens - Trees and plants */}
    <circle cx="20" cy="40" r="6" fill="#228B22" />
    <circle cx="80" cy="35" r="8" fill="#2D5016" />
    <circle cx="15" cy="55" r="5" fill="#3CB371" />
    <circle cx="85" cy="65" r="6" fill="#2D5016" />
    
    {/* Flower accents */}
    <circle cx="25" cy="50" r="2" fill="#FF69B4" />
    <circle cx="75" cy="45" r="2" fill="#FF69B4" />
    
    {/* Walking path/Bridge */}
    <rect x="45" y="70" width="10" height="3" fill="#DAA520" opacity="0.8" />
  </svg>
);

// Icon selector component
export const LandmarkIcon: React.FC<{
  landmark: string;
  size?: number;
  className?: string;
  animated?: boolean;
  variant?: 'normal' | 'float' | 'pulse' | 'bounce';
}> = ({ landmark, size = 48, className = '', animated = false, variant = 'normal' }) => {
  // Get animation class based on variant
  const getAnimationClass = () => {
    if (!animated) return '';
    const baseClass = 'transition-transform duration-300 hover:scale-110 active:scale-95';
    
    switch (variant) {
      case 'float':
        return `${baseClass} animate-landmark-float`;
      case 'pulse':
        return `${baseClass} animate-landmark-pulse`;
      case 'bounce':
        return `${baseClass} animate-landmark-bounce`;
      default:
        return baseClass;
    }
  };

  const animationClass = getAnimationClass();
  const combinedClassName = animationClass ? `${className} ${animationClass}` : className;

  switch (landmark.toLowerCase()) {
    case 'kovalam':
    case 'kovalam beach':
      return <KovalamBeachSVG size={size} className={combinedClassName} />;
    case 'ponmudi':
    case 'ponmudi hill':
    case 'ponmudi hills':
      return <PonmudiHillSVG size={size} className={combinedClassName} />;
    case 'padmanabhaswamy':
    case 'temple':
    case 'padmanabhaswamy temple':
      return <TemplateSVG size={size} className={combinedClassName} />;
    case 'veli':
    case 'veli lake':
    case 'veli tourist village':
      return <VeliLakeSVG size={size} className={combinedClassName} />;
    case 'lulu':
    case 'lulu mall':
    case 'shopping':
      return <ShoppingMallSVG size={size} className={combinedClassName} />;
    case 'zoo':
    case 'thiruvananthapuram zoo':
      return <ZooSVG size={size} className={combinedClassName} />;
    case 'art gallery':
    case 'sree chitra art gallery':
      return <ArtGallerySVG size={size} className={combinedClassName} />;
    case 'kanyakumari':
    case 'kanyakumari cape':
      return <KanyakumariSVG size={size} className={combinedClassName} />;
    case 'napier museum':
      return <NapierMuseumSVG size={size} className={combinedClassName} />;
    case 'akkulam lake':
    case 'akkulam garden':
      return <AkkulamLakeSVG size={size} className={combinedClassName} />;
    default:
      return null;
  }
};
