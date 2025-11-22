import React from 'react';

/**
 * IconManager - Centralized SVG icon management system
 * 
 * This component manages custom SVG icons and provides a unified interface
 * for icon usage throughout the app. It bridges Lucide React icons with custom SVGs.
 */

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

/**
 * Reusable SVG Icon Component
 * Acts as a wrapper for custom SVG icons with consistent sizing and styling
 */
export const SvgIcon: React.FC<IconProps & { children: React.ReactNode }> = ({
  name,
  size = 24,
  className = '',
  color = 'currentColor',
  strokeWidth = 2,
  children,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      data-icon={name}
      role="img"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
};

/**
 * Trivandrum City Icon
 * Represents the city with a stylized palm tree or landmark
 */
export const TrivandumCityIcon: React.FC<IconProps> = ({
  size = 24,
  className = '',
  color = 'currentColor',
}) => (
  <SvgIcon name="trivandrum-city" size={size} className={className} color={color}>
    {/* Palm tree structure */}
    <g fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Trunk */}
      <rect x={size / 2 - 1.5} y={size * 0.5} width="3" height={size * 0.4} rx="1.5"/>
      {/* Leaves - simplified palm fronds */}
      <path d={`M ${size / 2} ${size * 0.4} Q ${size * 0.3} ${size * 0.2} ${size * 0.2} ${size * 0.1}`}/>
      <path d={`M ${size / 2} ${size * 0.4} Q ${size * 0.7} ${size * 0.2} ${size * 0.8} ${size * 0.1}`}/>
      <path d={`M ${size / 2} ${size * 0.4} Q ${size * 0.4} ${size * 0.05} ${size * 0.5} 0`}/>
    </g>
  </SvgIcon>
);

/**
 * QR Code Scanner Icon
 * Represents the QR reward system
 */
export const QRScannerIcon: React.FC<IconProps> = ({
  size = 24,
  className = '',
  color = 'currentColor',
}) => (
  <SvgIcon name="qr-scanner" size={size} className={className} color={color}>
    <g fill="none" stroke={color} strokeWidth="1.5">
      {/* Top-left corner */}
      <path d={`M 2 2 h 6 v 6 m -6 0 v 6`}/>
      {/* Top-right corner */}
      <path d={`M ${size - 2} 2 h -6 v 6 m 6 0 v 6`}/>
      {/* Bottom-left corner */}
      <path d={`M 2 ${size - 2} h 6 v -6 m -6 0 v -6`}/>
      {/* Bottom-right corner */}
      <path d={`M ${size - 2} ${size - 2} h -6 v -6 m 6 0 v -6`}/>
      {/* Center scanning element */}
      <circle cx={size / 2} cy={size / 2} r="2" fill={color}/>
    </g>
  </SvgIcon>
);

/**
 * Coin Reward Icon
 * Represents the coin reward system
 */
export const CoinRewardIcon: React.FC<IconProps> = ({
  size = 24,
  className = '',
  color = 'currentColor',
}) => (
  <SvgIcon name="coin-reward" size={size} className={className} color={color}>
    <defs>
      <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
        <stop offset="100%" stopColor="#FFA500" stopOpacity="1" />
      </linearGradient>
    </defs>
    <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill="url(#coinGrad)"/>
    <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill="none" stroke={color} strokeWidth="1" opacity="0.3"/>
    <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="middle" fontSize={size * 0.6} fontWeight="bold" fill="white">C</text>
  </SvgIcon>
);

/**
 * Location Pin Icon with gradient
 * Represents location services
 */
export const LocationPinIcon: React.FC<IconProps> = ({
  size = 24,
  className = '',
  color = 'currentColor',
}) => (
  <SvgIcon name="location-pin" size={size} className={className} color={color}>
    <defs>
      <linearGradient id="locGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00C2E0" stopOpacity="1" />
        <stop offset="100%" stopColor="#2563EB" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path
      d={`M ${size / 2} 2 C ${size * 0.3} 2 ${size * 0.2} ${size * 0.4} ${size * 0.2} ${size * 0.6} C ${size * 0.2} ${size * 0.8} ${size / 2} ${size - 2} ${size / 2} ${size - 2} C ${size / 2} ${size - 2} ${size * 0.8} ${size * 0.8} ${size * 0.8} ${size * 0.6} C ${size * 0.8} ${size * 0.4} ${size * 0.7} 2 ${size / 2} 2 Z`}
      fill="url(#locGrad)"\n      stroke={color}\n      strokeWidth="0.5"\n    />\n    <circle cx={size / 2} cy={size * 0.55} r={size * 0.12} fill="white\"/>\n  </SvgIcon>\n);\n\n/**\n * Navigation Menu Icon\n * Minimalist hamburger-style menu icon\n */\nexport const NavigationMenuIcon: React.FC<IconProps> = ({\n  size = 24,\n  className = '',\n  color = 'currentColor',\n}) => (\n  <SvgIcon name=\"navigation-menu\" size={size} className={className} color={color}>\n    <g fill=\"none\" stroke={color} strokeWidth=\"1.5\" strokeLinecap=\"round\">\n      <line x1=\"3\" y1=\"6\" x2={size - 3} y2=\"6\"/>\n      <line x1=\"3\" y1={size / 2} x2={size - 3} y2={size / 2}/>\n      <line x1=\"3\" y1={size - 6} x2={size - 3} y2={size - 6}/>\n    </g>\n  </SvgIcon>\n);\n\n/**\n * Icon System Registry\n * Maps icon names to components for centralized management\n */\ntype IconName =\n  | 'trivandrum-city'\n  | 'qr-scanner'\n  | 'coin-reward'\n  | 'location-pin'\n  | 'navigation-menu';\n\ninterface IconRegistry {\n  [key: string]: React.FC<IconProps>;\n}\n\nconst iconRegistry: IconRegistry = {\n  'trivandrum-city': TrivandumCityIcon,\n  'qr-scanner': QRScannerIcon,\n  'coin-reward': CoinRewardIcon,\n  'location-pin': LocationPinIcon,\n  'navigation-menu': NavigationMenuIcon,\n};\n\n/**\n * Icon Component - Universal icon loader\n * Usage: <Icon name=\"qr-scanner\" size={32} />\n */\nexport const Icon: React.FC<IconProps> = ({\n  name,\n  size = 24,\n  className = '',\n  color = 'currentColor',\n}) => {\n  const IconComponent = iconRegistry[name];\n\n  if (!IconComponent) {\n    console.warn(`Icon \"${name}\" not found in registry`);\n    return <div className={className} style={{ width: size, height: size }} />;\n  }\n\n  return <IconComponent size={size} className={className} color={color} />;\n};\n\n/**\n * Get all registered icons\n * Useful for documentation or icon browsing\n */\nexport const getRegisteredIcons = (): IconName[] => {\n  return Object.keys(iconRegistry) as IconName[];\n};\n\n/**\n * Register custom icon\n * Allows adding new icons at runtime\n */\nexport const registerIcon = (name: string, component: React.FC<IconProps>): void => {\n  iconRegistry[name] = component;\n};\n\nexport default Icon;\n"}}]
