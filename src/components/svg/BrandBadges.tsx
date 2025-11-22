import React, { useEffect, useState } from 'react';

interface BrandBadgeProps {
  brand: 'kfc' | 'swiggy' | 'lulu' | 'clt' | 'uber' | 'flipkart' | 'generic';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  darkMode?: boolean;  // Can override auto-detection
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 48,
};

/**
 * Brand badge SVG components for partner brands
 * These are minimalist, scalable SVG representations
 * Supports both light and dark mode variants
 * Auto-detects dark mode from DOM .dark class
 */
export const BrandBadges: React.FC<BrandBadgeProps> = ({ 
  brand, 
  size = 'md',
  className = '',
  darkMode: darkModeProp
}) => {
  const [mounted, setMounted] = useState(false);
  const [systemDark, setSystemDark] = useState(false);

  // Auto-detect dark mode from DOM
  useEffect(() => {
    setMounted(true);
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
  const logoSize = sizeMap[size];

  // KFC Badge - Red and white (consistent in both modes)
  if (brand === 'kfc') {
    return (
      <svg
        width={logoSize}
        height={logoSize}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="64" height="64" rx="12" fill="#E4002B"/>
        <circle cx="32" cy="32" r="20" fill="white"/>
        <text x="32" y="37" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#E4002B">KFC</text>
      </svg>
    );
  }

  // Swiggy Badge - Orange (light mode) / Orange+Dark (dark mode)
  if (brand === 'swiggy') {
    if (darkMode) {
      return (
        <svg
          width={logoSize}
          height={logoSize}
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <rect width="64" height="64" rx="12" fill="#1A1A1A" stroke="#FFA500" strokeWidth="2"/>
          <circle cx="32" cy="32" r="18" fill="#FFA500"/>
          <text x="32" y="37" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#1A1A1A">S</text>
        </svg>
      );
    }
    return (
      <svg
        width={logoSize}
        height={logoSize}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="64" height="64" rx="12" fill="white" stroke="#FFA500" strokeWidth="2"/>
        <circle cx="32" cy="32" r="18" fill="#FFA500"/>
        <text x="32" y="37" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">S</text>
      </svg>
    );
  }

  // Lulu Mall Badge - Purple and gold
  if (brand === 'lulu') {
    return (
      <svg
        width={logoSize}
        height={logoSize}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id={`luluGrad-${darkMode ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={darkMode ? '#7C3AED' : '#6B21A8'} stopOpacity="1" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="12" fill={`url(#luluGrad-${darkMode ? 'dark' : 'light'})`}/>
        <text x="32" y="37" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">LULU</text>
      </svg>
    );
  }

  // Cochin International Airport Badge - Blue (light) / Cyan (dark)
  if (brand === 'clt') {
    return (
      <svg
        width={logoSize}
        height={logoSize}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="64" height="64" rx="12" fill={darkMode ? '#0EA5E9' : '#003DA5'}/>
        <text x="32" y="35" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="white">✈</text>
        <text x="32" y="48" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="white">CLT</text>
      </svg>
    );
  }

  // Uber Badge - Black (light) / Dark Gray (dark)
  if (brand === 'uber') {
    return (
      <svg
        width={logoSize}
        height={logoSize}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="64" height="64" rx="12" fill={darkMode ? '#374151' : 'black'}/>
        <text x="32" y="37" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="white">U</text>
      </svg>
    );
  }

  // Flipkart Badge - Blue and yellow (adjusted for dark mode)
  if (brand === 'flipkart') {
    return (
      <svg
        width={logoSize}
        height={logoSize}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id={`flipkartGrad-${darkMode ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={darkMode ? '#3B82F6' : '#1E40AF'} stopOpacity="1" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="12" fill={`url(#flipkartGrad-${darkMode ? 'dark' : 'light'})`}/>
        <text x="32" y="37" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="white">FK</text>
      </svg>
    );
  }

  // Generic Badge - Teal gradient (adjusted for dark mode)
  return (
    <svg
      width={logoSize}
      height={logoSize}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`genericGrad-${darkMode ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={darkMode ? '#06B6D4' : '#00C2E0'} stopOpacity="1" />
          <stop offset="100%" stopColor={darkMode ? '#3B82F6' : '#2563EB'} stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="12" fill={`url(#genericGrad-${darkMode ? 'dark' : 'light'})`}/>
      <circle cx="32" cy="32" r="8" fill="white" opacity="0.3"/>
      <circle cx="32" cy="32" r="5" fill="white"/>
    </svg>
  );
};

export default BrandBadges;
