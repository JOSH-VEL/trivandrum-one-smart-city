# 🔥 Firebase Complete Setup Guide

## Step-by-Step Firebase Configuration for Trivandrum One

---

## 1️⃣ Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `trivandrum-one` (or your preferred name)
4. Enable Google Analytics (recommended)
5. Create project and wait for initialization

---

## 2️⃣ Register Web App

1. In your Firebase project, click the **Web icon** (</>)
2. Register app with nickname: "Trivandrum One Web"
3. **Copy the Firebase configuration** - you'll need this for Blink secrets
4. Click "Continue to console"

---

## 3️⃣ Enable Firebase Services

### 🔐 Authentication

1. Go to **Authentication** in the left sidebar
2. Click **"Get started"**
3. Enable **Email/Password** provider:
   - Click "Email/Password"
   - Toggle "Enable"
   - Save
4. Enable **Phone** provider (optional but recommended):
   - Click "Phone"
   - Toggle "Enable"
   - Save
5. Configure **Authorized domains**:
   - Add your production domain
   - Add `localhost` for development

### 📊 Firestore Database

1. Go to **Firestore Database** in the left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"** (for now - we'll update rules later)
4. Choose location: **`asia-south1`** (closest to India)
5. Click "Enable"

### 📁 Storage

1. Go to **Storage** in the left sidebar
2. Click **"Get started"**
3. Start in **test mode** (we'll secure it later)
4. Use the same location as Firestore: **`asia-south1`**
5. Click "Done"

---

## 4️⃣ Configure Security Rules

### Firestore Rules (Enhanced Security)

Go to Firestore Database → Rules and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isSignedIn() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn() && request.auth.uid == userId;
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
    }
    
    // Places collection (public read, admin write)
    match /places/{placeId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Brands collection (public read, admin write)
    match /brands/{brandId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Campaigns collection (public read, admin write)
    match /campaigns/{campaignId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // QR Events (user can create their own, admin can read all)
    match /qrEvents/{eventId} {
      allow read: if isAdmin();
      allow create: if isSignedIn();
    }
    
    // Reward Transactions (user can read their own, admin can read/write all)
    match /rewardTransactions/{transactionId} {
      allow read: if isOwner(resource.data.userId) || isAdmin();
      allow create: if isSignedIn();
      allow update, delete: if isAdmin();
    }
  }
}
```

### Storage Rules (Enhanced Security)

Go to Storage → Rules and replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Helper function
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isSignedIn() && 
             firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // User uploads (profile pictures, etc.)
    match /users/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if isSignedIn() && request.auth.uid == userId;
    }
    
    // Campaign images (admin only)
    match /campaigns/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Place images (admin only)
    match /places/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Brand images (admin only)
    match /brands/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

---

## 5️⃣ Seed Database with Sample Data

### Option A: Using Firebase Console (Manual)

1. Go to Firestore Database
2. Click "Start collection"
3. Create collections: `users`, `places`, `brands`, `campaigns`, `qrEvents`, `rewardTransactions`
4. Add documents manually using the provided seed data in `scripts/seedFirebaseData.ts`

### Option B: Using Seed Script (Recommended)

1. Make sure you've configured Firebase credentials in Blink secrets
2. Run the seed script:

```bash
# Install dependencies
npm install

# Run seed script
npx tsx scripts/seedFirebaseData.ts
```

This will populate your database with:
- 25+ places across Trivandrum (restaurants, pharmacies, tourist spots, etc.)
- Sample brands (McDonald's, Café Coffee Day, Lulu Mall)
- Active campaigns for testing QR rewards

---

## 6️⃣ Create Admin User

### Method 1: Via Firebase Console

1. Go to Authentication → Users
2. Click "Add user"
3. Enter email and password
4. Note the User UID
5. Go to Firestore Database → users collection
6. Create a document with the User UID as the document ID:

```json
{
  "email": "admin@trivandrumone.com",
  "name": "Admin User",
  "phone": "+919876543210",
  "role": "admin",
  "totalCoins": 0,
  "createdAt": "2024-01-20T00:00:00.000Z",
  "preferredArea": "Trivandrum"
}
```

### Method 2: Via App (Sign up then manually set role)

1. Sign up normally through the app
2. Go to Firestore → users → find your user document
3. Add field: `role` with value `admin`

---

## 7️⃣ Configure Firebase Cloud Functions (Optional)

If you want to add server-side logic:

```bash
firebase init functions
```

Select:
- JavaScript or TypeScript
- Install dependencies

Example function for reward validation:

```javascript
// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const validateReward = functions.https.onCall(async (data, context) => {
  // Check authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
  }
  
  const { campaignId, userId } = data;
  const db = admin.firestore();
  
  // Check if user already got reward today
  const today = new Date().toISOString().split('T')[0];
  const existingReward = await db.collection('rewardTransactions')
    .where('userId', '==', userId)
    .where('campaignId', '==', campaignId)
    .where('createdAt', '>=', today)
    .get();
  
  if (!existingReward.empty) {
    throw new functions.https.HttpsError('already-exists', 'Reward already claimed today');
  }
  
  // Generate random coins (20-40)
  const coins = Math.floor(Math.random() * 21) + 20;
  
  return { coins, valid: true };
});
```

Deploy functions:
```bash
firebase deploy --only functions
```

---

## 8️⃣ Testing Your Setup

### Test Authentication

```javascript
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
signInWithEmailAndPassword(auth, 'admin@trivandrumone.com', 'your-password')
  .then((userCredential) => {
    console.log('✅ Authentication working!', userCredential.user);
  })
  .catch((error) => {
    console.error('❌ Authentication failed:', error);
  });
```

### Test Firestore

```javascript
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore();
const placesSnapshot = await getDocs(collection(db, 'places'));
console.log(`✅ Found ${placesSnapshot.size} places`);
```

### Test Storage

```javascript
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage();
const storageRef = ref(storage, 'test/hello.txt');
const blob = new Blob(['Hello Firebase!'], { type: 'text/plain' });
await uploadBytes(storageRef, blob);
console.log('✅ Storage working!');
```

---

## 9️⃣ Production Checklist

Before going live:

- [ ] Update Firestore rules to production mode
- [ ] Update Storage rules to production mode
- [ ] Enable Firebase App Check for security
- [ ] Set up Firebase Performance Monitoring
- [ ] Configure Firebase Analytics
- [ ] Add custom domain to Hosting
- [ ] Set up billing alerts
- [ ] Create admin user account
- [ ] Seed database with real data
- [ ] Test all features end-to-end
- [ ] Set up backup strategy

---

## 🔟 Monitoring & Maintenance

### Firebase Console Sections to Monitor

1. **Authentication** - User signups and login activity
2. **Firestore** - Database queries and document count
3. **Storage** - File uploads and bandwidth
4. **Analytics** - User behavior and engagement
5. **Performance** - Page load times and user experience
6. **Crashlytics** - Error tracking (add SDK)

### Set Up Alerts

1. Go to Firebase Console → Project Settings → Integrations
2. Connect to Slack or email for alerts
3. Set up alerts for:
   - High error rates
   - Quota limits
   - Security rule violations

---

## 🎉 You're All Set!

Your Firebase backend is now fully configured and ready for production!

### Resources:

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Data Modeling](https://firebase.google.com/docs/firestore/manage-data/structure-data)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase Best Practices](https://firebase.google.com/docs/firestore/best-practices)

---

**Questions?** Check the troubleshooting section in DEPLOYMENT_GUIDE.md or contact support@blink.new
