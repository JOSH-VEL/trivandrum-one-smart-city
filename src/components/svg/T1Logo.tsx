import React, { useEffect, useState } from 'react';

interface T1LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon';
  className?: string;
  darkMode?: boolean;  // Can override auto-detection
}

const sizeMap = {
  sm: { logo: 24, text: 'text-sm' },
  md: { logo: 32, text: 'text-base' },
  lg: { logo: 40, text: 'text-lg' },
  xl: { logo: 48, text: 'text-2xl' },
};

export const T1Logo: React.FC<T1LogoProps> = ({ 
  size = 'md', 
  variant = 'full',
  className = '',
  darkMode: darkModeProp
}) => {
  const [mounted, setMounted] = useState(false);
  const [systemDark, setSystemDark] = useState(false);

  // Auto-detect dark mode from system or DOM
  useEffect(() => {
    setMounted(true);
    // Check if document has dark class
    const isDark = document.documentElement.classList.contains('dark');
    setSystemDark(isDark);

    // Listen for changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setSystemDark(isDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Use provided darkMode prop if specified, otherwise use auto-detected value
  const darkMode = darkModeProp !== undefined ? darkModeProp : systemDark;
  const sizeConfig = sizeMap[size];

  if (variant === 'icon') {
    return (
      <svg
        width={sizeConfig.logo}
        height={sizeConfig.logo}
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className}`}
      >
        <defs>
          <linearGradient id={`gradientT1-${darkMode ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={darkMode ? '#06B6D4' : '#00C2E0'} stopOpacity="1" />
            <stop offset="50%" stopColor="#0EA5E9" stopOpacity="1" />
            <stop offset="100%" stopColor={darkMode ? '#3B82F6' : '#2563EB'} stopOpacity="1" />
          </linearGradient>
          <linearGradient id={`glowGradient-${darkMode ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={darkMode ? '#06B6D4' : '#00C2E0'} stopOpacity={darkMode ? '0.4' : '0.3'} />
            <stop offset="100%" stopColor={darkMode ? '#3B82F6' : '#2563EB'} stopOpacity={darkMode ? '0.4' : '0.3'} />
          </linearGradient>
        </defs>
        
        <circle cx="64" cy="64" r="60" fill={`url(#glowGradient-${darkMode ? 'dark' : 'light'})`} opacity={darkMode ? '0.8' : '0.6'}/>
        <rect x="16" y="16" width="96" height="96" rx="24" fill={`url(#gradientT1-${darkMode ? 'dark' : 'light'})`}/>
        <rect x="20" y="20" width="88" height="88" rx="20" fill="none" stroke={`url(#gradientT1-${darkMode ? 'dark' : 'light'})`} strokeWidth="1.5" opacity="0.5"/>
        
        <g transform="translate(64, 64)">
          <rect x="-24" y="-28" width="48" height="8" rx="4" fill="white" opacity="0.95"/>
          <rect x="-6" y="-20" width="12" height="36" rx="6" fill="white" opacity="0.95"/>
          <circle cx="-28" cy="-24" r="3" fill="white" opacity="0.7"/>
          <circle cx="28" cy="-24" r="3" fill="white" opacity="0.7"/>
          <text x="18" y="20" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="white" opacity="0.9">1</text>
        </g>
        
        <line x1="32" y1="18" x2="96" y2="18" stroke="white" strokeWidth="2" opacity="0.3" strokeLinecap="round"/>
      </svg>
    );
  }

  // Full variant with text
  const textColor = darkMode ? 'text-slate-100' : 'text-navy';
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={sizeConfig.logo}
        height={sizeConfig.logo}
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`gradientT1Full-${darkMode ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={darkMode ? '#06B6D4' : '#00C2E0'} stopOpacity="1" />
            <stop offset="50%" stopColor="#0EA5E9" stopOpacity="1" />
            <stop offset="100%" stopColor={darkMode ? '#3B82F6' : '#2563EB'} stopOpacity="1" />
          </linearGradient>
        </defs>
        
        <rect x="16" y="16" width="96" height="96" rx="24" fill={`url(#gradientT1Full-${darkMode ? 'dark' : 'light'})`}/>
        
        <g transform="translate(64, 64)">
          <rect x="-24" y="-28" width="48" height="8" rx="4" fill="white" opacity="0.95"/>
          <rect x="-6" y="-20" width="12" height="36" rx="6" fill="white" opacity="0.95"/>
          <text x="18" y="20" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="white" opacity="0.9">1</text>
        </g>
      </svg>
      <div className="flex flex-col leading-tight">
        <span className={`font-bold ${textColor} ${sizeConfig.text}`}>Trivandrum</span>
        <span className={`text-gradient font-bold ${sizeConfig.text}`}>One</span>
      </div>
    </div>
  );
};

export default T1Logo;
