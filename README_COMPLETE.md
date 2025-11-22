# 🏙️ Trivandrum One – Complete Smart City Platform

A premium, production-ready smart city guide platform for Trivandrum featuring QR-based rewards, local discovery, and admin dashboard.

## ✨ Features

### 🎯 Core Features
- **Smart City Guide** – Discover restaurants, medicine stores, tourist spots, transport, and emergency services
- **QR Reward System** – Scan QR codes from DOOH screens to earn coins (20-40 coins per scan)
- **Instagram Integration** – Share campaigns for bonus rewards (20-30 extra coins)
- **Location-Based Discovery** – Find nearest places with distance and ETA calculations
- **User Wallet** – Track coins with daily earning limits and transaction history
- **Premium Offers** – Redeem coins for exclusive deals from local advertisers
- **Admin Dashboard** – Complete management system for campaigns, users, and analytics

### 🎨 Design System
- **Premium UI** – Inspired by Nike/Apple with coastal Trivandrum theme
- **Glassmorphism** – High-contrast glass effects with cyan/blue gradients
- **Smooth Animations** – Framer Motion powered micro-interactions
- **Mobile-First** – Responsive design optimized for all devices
- **Dark Theme** – Navy blue base with vibrant accent colors

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Blink SDK account (automatic setup included)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd trivandrum-one

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

### First Run
The app automatically seeds the database with dummy data on first load:
- 20+ Places (restaurants, medicine stores, tourist spots, transport)
- 3 Active campaigns
- 3 Brand profiles

## 🏗️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for blazing fast builds
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations
- **React Router** for navigation
- **TanStack Query** for state management

### Backend & Database
- **Blink SDK** for authentication and database
- **SQLite** (via Blink DB) for data storage
- **Automatic schema** with camelCase/snake_case conversion

### UI Components
- **Radix UI** for accessible primitives
- **Lucide React** for icons
- **React Hot Toast** for notifications
- **Canvas Confetti** for reward animations

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/Radix UI components
│   ├── CategoryCard.tsx
│   ├── PlaceCard.tsx
│   ├── Navbar.tsx
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── lib/               # Utilities and configs
│   ├── firebase.ts    # Blink SDK setup
│   ├── seedData.ts    # Database seed data
│   ├── location.ts    # Geolocation utils
│   └── utils.ts       # Helper functions
├── pages/             # Route components
│   ├── HomeEnhanced.tsx
│   ├── ExploreEnhanced.tsx
│   ├── RewardsEnhanced.tsx
│   ├── TransportEnhanced.tsx
│   ├── ProfileEnhanced.tsx
│   ├── Login.tsx
│   └── admin/
│       └── AdminDashboard.tsx
├── types/             # TypeScript definitions
│   └── index.ts
├── App.tsx            # Main app component
└── main.tsx           # App entry point
```

## 🎯 Key Pages

### Home (`/`)
- Hero section with animated carousel
- Search bar for quick discovery
- Quick category navigation
- Nearby places (location-based)
- Feature highlights
- CTA sections

### Explore (`/explore`)
- Dynamic Masonry grid layout
- Category filters (All, Food, Medicine, Tourist, Shopping, etc.)
- Animated card transitions
- Distance-based sorting
- Search functionality

### Rewards (`/rewards`)
- Wallet display with animated coin count
- Available offers grid
- Countdown timers for limited offers
- Transaction history
- How to earn section with visual guides

### Transport (`/transport`)
- Bus stops list with real-time info
- Distance and ETA calculations
- Google Maps integration for directions
- Search and filter functionality

### Profile (`/profile`)
- Account information management
- Stats cards (Total Coins, Daily Earned, Member Since)
- Edit profile with live updates
- Admin access (if admin role)
- Secure logout

### Admin Dashboard (`/admin`)
- User management
- Campaign creation and editing
- Analytics and insights
- QR code generation
- Fraud prevention tools

## 🎨 Customization Guide

### Replacing Dummy Content

#### 1. Brand Names
```typescript
// src/lib/seedData.ts
// Replace brand names in seedData.brands array
{
  id: 'brand-1',
  name: 'Your Brand Name', // Change this
  description: 'Your description',
  // ... other fields
}
```

#### 2. Places
```typescript
// src/lib/seedData.ts
// Update places in seedData.places array
{
  id: 'place-1',
  name: 'Your Place Name',
  category: 'food' | 'medicine' | 'tourist' | 'shopping' | 'transport',
  latitude: 8.5241, // Real coordinates
  longitude: 76.9366,
  // ... other fields
}
```

#### 3. Images
```typescript
// Current: Placeholder images
// Replace with real URLs:
const placeImageUrl = 'https://your-cdn.com/images/place.jpg';
```

#### 4. Content Text
```typescript
// Home page hero title
<h1>Discover Your City Name</h1>

// Update in src/pages/HomeEnhanced.tsx
```

### Color Customization
```css
/* src/index.css */
:root {
  --primary: 189 94% 43%;      /* Cyan - main brand color */
  --secondary: 200 40% 25%;    /* Navy - backgrounds */
  --accent: 174 100% 47%;      /* Teal - highlights */
  /* Adjust HSL values as needed */
}
```

## 🔐 Authentication

The app uses Blink SDK for authentication with two methods:

### Email Login (Demo)
```typescript
// Email: joshveltomy@gmail.com
// Password: password@123
```

### Phone OTP (Mocked)
```typescript
// Phone: Any 10-digit number
// OTP: Same as phone number (for demo)
```

### Production Setup
For production, configure proper OTP service:
1. Integrate Twilio/Firebase Phone Auth
2. Update `AuthContext.tsx` sendOTP method
3. Add webhook for OTP verification

## 📊 Database Schema

### Tables
- **users** – User accounts with coins and preferences
- **places** – Locations (restaurants, stores, attractions)
- **campaigns** – Marketing campaigns linked to DOOH displays
- **brands** – Advertiser profiles
- **reward_transactions** – Coin earning history
- **qr_events** – QR scan tracking

### Key Relationships
```
users 1→∞ reward_transactions
campaigns 1→∞ reward_transactions
brands 1→∞ campaigns
places ← categories (enum)
```

## 🎁 Reward System Logic

### QR Code Scanning
1. User scans QR → Opens `/ad/:campaignId`
2. Check if user logged in
3. Verify daily limit not exceeded
4. Award random 20-40 coins
5. Optional: Instagram share bonus +20-30 coins
6. Confetti animation + coin rise effect

### Daily Limits
- Max 200 coins per day per user
- Resets at midnight
- Stored in `users.dailyCoins` column

### Fraud Prevention
- Track IP and device ID in `qr_events`
- Limit scans per campaign per day
- Admin can flag suspicious accounts

## 🚀 Deployment

### Blink Hosting (Recommended)
```bash
# Build the project
npm run build

# Deploy to Blink
# Automatic via Blink platform
```

### Firebase Hosting
```bash
# Build
npm run build

# Deploy
firebase deploy --only hosting
```

### Netlify/Vercel
```bash
# Connect your GitHub repo
# Set build command: npm run build
# Set publish directory: dist
```

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run check-css    # Validate CSS variables
```

### Environment Variables
```env
# Blink SDK (auto-configured)
VITE_BLINK_PROJECT_ID=trivandrum-one-smart-city-platform-mfrrlq54
```

## 🐛 Troubleshooting

### Database Issues
```bash
# Clear and reseed database
# Delete browser localStorage
# Refresh page - auto-seeds on empty DB
```

### Build Errors
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Authentication Issues
```bash
# Check console for Blink SDK errors
# Verify project ID in lib/firebase.ts
# Ensure user is created in database
```

## 📝 TODO / Future Enhancements

- [ ] Real-time bus tracking integration
- [ ] Push notifications for offers
- [ ] Social media campaign sharing analytics
- [ ] Merchant dashboard for advertisers
- [ ] Multi-language support (Malayalam, English)
- [ ] PWA offline support
- [ ] Payment gateway integration
- [ ] Referral program
- [ ] Gamification leaderboards

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Blink SDK** for backend infrastructure
- **Radix UI** for accessible components
- **Tailwind CSS** for styling system
- **Framer Motion** for animations
- **Trivandrum Smart City** for inspiration

---

**Built with ❤️ for Trivandrum**

For questions or support, contact: [your-email@example.com]
