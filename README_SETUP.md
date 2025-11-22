# Trivandrum One - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the wizard
3. Enable Firebase Authentication (Phone authentication)
4. Enable Firestore Database
5. Get your Firebase config

#### Configure Environment Variables
1. Copy `.env.example` to `.env`
2. Fill in your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### Set Up Firestore Security Rules
1. Go to Firebase Console → Firestore Database → Rules
2. Copy the contents of `firestore.rules` and paste it
3. Publish the rules

#### Enable Phone Authentication
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable "Phone" provider
3. Add test phone numbers if needed (for development)

### 3. Seed Database (Optional)

You can manually add data to Firestore through the Firebase Console or use the following structure:

#### Places Collection
```json
{
  "name": "Medical College Hospital",
  "category": "emergency",
  "area": "Kumarapuram",
  "description": "Multi-specialty government hospital with 24/7 emergency services",
  "latitude": 8.5241,
  "longitude": 76.9366,
  "timing": "24/7",
  "phone": "+91-471-2443152"
}
```

#### Brands Collection
```json
{
  "name": "Lulu Mall",
  "description": "Largest shopping mall in Trivandrum with entertainment and dining",
  "address": "Akkulam, Trivandrum",
  "latitude": 8.5123,
  "longitude": 76.9470,
  "images": ["https://example.com/lulu-mall.jpg"],
  "phone": "+91-471-2730000",
  "socials": {
    "instagram": "https://instagram.com/lulumall",
    "website": "https://www.lulumall.in/"
  }
}
```

#### Campaigns Collection
```json
{
  "title": "Welcome to Lulu Mall",
  "brandId": "brand_id_here",
  "description": "Visit Lulu Mall and enjoy exclusive offers",
  "active": true,
  "extraRewardEnabled": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### 4. Create Admin User

After first login with phone OTP:
1. Go to Firebase Console → Firestore Database
2. Find your user document in `users` collection
3. Edit the document and change `role` from `"user"` to `"admin"`
4. Refresh your app and you'll have admin access

### 5. Run Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 📱 Features

### User Features
- 🏠 Home page with hero section and quick categories
- 🔍 Search and explore places (restaurants, medicine, transport, etc.)
- 🚌 Transport information with nearest bus stops
- 🎁 QR code reward system (20-40 coins per scan)
- 📸 Instagram share bonus (20-30 extra coins)
- 👤 User profile and coin wallet
- 🔐 Phone OTP authentication

### Admin Features
- 📊 Dashboard with key metrics
- 👥 User management
- 📱 Campaign management
- 📈 Analytics and insights
- 🎯 QR code generation for campaigns

## 🏗️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI + shadcn/ui
- **Routing**: React Router v6
- **State Management**: TanStack Query
- **Authentication**: Firebase Authentication (Phone OTP)
- **Database**: Firebase Firestore
- **Maps**: Geolocation API + Leaflet (optional)
- **Animations**: Framer Motion + Canvas Confetti

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn components
│   ├── CategoryCard.tsx
│   ├── PlaceCard.tsx
│   ├── RewardAnimation.tsx
│   └── Navbar.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── lib/               # Utility functions
│   ├── firebase.ts
│   ├── rewards.ts
│   └── location.ts
├── pages/             # Page components
│   ├── Home.tsx
│   ├── Explore.tsx
│   ├── Transport.tsx
│   ├── Rewards.tsx
│   ├── Profile.tsx
│   ├── Login.tsx
│   ├── CampaignReward.tsx
│   └── admin/
│       └── AdminDashboard.tsx
├── types/             # TypeScript types
│   └── index.ts
└── App.tsx           # Main app component
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#0099ff) - Main brand color
- **Secondary**: Teal (#00d4aa) - Accent color
- **Accent**: Orange (#ff9933) - CTA and highlights
- **Gradients**: Multi-color gradients for premium feel

### Typography
- **Font Family**: DM Sans (sans-serif)
- **Headings**: Bold, large sizes
- **Body**: Regular, readable sizes

### Components
- Glassmorphism cards
- Rounded corners (0.5rem)
- Soft shadows
- Smooth animations

## 🔒 Security Rules

The Firestore security rules ensure:
- Users can only read their own data
- Admins have full access
- Public read access for places, brands, and campaigns
- Write access restricted to authenticated users and admins

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📝 Testing

### Test Phone Numbers (Development)
Add test phone numbers in Firebase Console:
- Phone: +91 1234567890
- Code: 123456

### Test QR Campaigns
1. Create a campaign as admin
2. Generate QR code with URL: `https://yourapp.com/ad/{campaignId}`
3. Scan QR code and claim reward

## 🐛 Troubleshooting

### Phone Auth Not Working
- Ensure reCAPTCHA is enabled in Firebase Console
- Add your domain to authorized domains
- Check if phone authentication is enabled

### Firestore Permission Denied
- Verify security rules are published
- Check if user is authenticated
- Ensure user document exists in Firestore

### Location Not Working
- Allow location permission in browser
- Check if HTTPS is enabled (required for geolocation)

## 📄 License

This project is for demonstration purposes.

## 🤝 Support

For issues or questions, please check:
- Firebase documentation: https://firebase.google.com/docs
- React Router docs: https://reactrouter.com/
- Tailwind CSS docs: https://tailwindcss.com/

---

Built with ❤️ for Trivandrum

