/**
 * Firebase Data Seeding Script
 * Run this script to populate Firebase with dummy data for testing
 * 
 * Usage: node --loader ts-node/esm scripts/seedFirebaseData.ts
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Seed data
const seedData = {
  places: [
    // Restaurants
    {
      name: 'Arya Nivas',
      category: 'food',
      area: 'Palayam',
      description: 'Popular vegetarian restaurant serving authentic South Indian cuisine',
      latitude: 8.5088,
      longitude: 76.9514,
      timing: '7:00 AM - 10:00 PM',
      phone: '+91 471 233 0021',
      images: []
    },
    {
      name: 'Mothers Veg Plaza',
      category: 'food',
      area: 'Thampanoor',
      description: 'Multi-cuisine vegetarian restaurant with Kerala specialties',
      latitude: 8.4900,
      longitude: 76.9515,
      timing: '11:00 AM - 11:00 PM',
      phone: '+91 471 245 1234',
      images: []
    },
    {
      name: 'Zam Zam Restaurant',
      category: 'food',
      area: 'Chalai',
      description: 'Famous for Kerala Biriyani and Malabar cuisine',
      latitude: 8.4875,
      longitude: 76.9487,
      timing: '12:00 PM - 11:00 PM',
      phone: '+91 471 246 7890',
      images: []
    },
    {
      name: 'Café Coffee Day - Lulu Mall',
      category: 'food',
      area: 'Akkulam',
      description: 'Coffee shop chain with variety of beverages and snacks',
      latitude: 8.5310,
      longitude: 76.8870,
      timing: '9:00 AM - 10:00 PM',
      phone: '+91 471 600 1234',
      images: []
    },
    
    // Medicine/Pharmacies
    {
      name: 'Apollo Pharmacy',
      category: 'medicine',
      area: 'Vazhuthacaud',
      description: '24/7 pharmacy with wide range of medicines and healthcare products',
      latitude: 8.5165,
      longitude: 76.9560,
      timing: 'Open 24 hours',
      phone: '+91 471 234 5678',
      images: []
    },
    {
      name: 'MedPlus',
      category: 'medicine',
      area: 'Kazhakkoottam',
      description: 'Reliable pharmacy chain with affordable medicines',
      latitude: 8.5782,
      longitude: 76.8739,
      timing: '8:00 AM - 10:00 PM',
      phone: '+91 471 256 7890',
      images: []
    },
    {
      name: 'Oushadhi Medical Store',
      category: 'medicine',
      area: 'Pattom',
      description: 'Ayurvedic and allopathic medicines available',
      latitude: 8.5382,
      longitude: 76.9162,
      timing: '7:00 AM - 9:00 PM',
      phone: '+91 471 248 9012',
      images: []
    },
    
    // Tourist Spots
    {
      name: 'Kovalam Beach',
      category: 'tourist',
      area: 'Kovalam',
      description: 'Famous crescent-shaped beach with golden sands and clear waters',
      latitude: 8.4004,
      longitude: 76.9788,
      timing: 'Open 24 hours',
      phone: '',
      images: []
    },
    {
      name: 'Padmanabhaswamy Temple',
      category: 'tourist',
      area: 'East Fort',
      description: 'Historic Hindu temple dedicated to Lord Vishnu',
      latitude: 8.4829,
      longitude: 76.9454,
      timing: '3:30 AM - 12:00 PM, 5:00 PM - 8:00 PM',
      phone: '+91 471 245 0233',
      images: []
    },
    {
      name: 'Napier Museum',
      category: 'tourist',
      area: 'Museum Junction',
      description: 'Art and natural history museum with Indo-Saracenic architecture',
      latitude: 8.5044,
      longitude: 76.9529,
      timing: '10:00 AM - 5:00 PM (Closed Monday)',
      phone: '+91 471 231 8294',
      images: []
    },
    {
      name: 'Shanghumukham Beach',
      category: 'tourist',
      area: 'Shanghumukham',
      description: 'Popular beach with beautiful sunset views',
      latitude: 8.4596,
      longitude: 76.9248,
      timing: 'Open 24 hours',
      phone: '',
      images: []
    },
    {
      name: 'Ponmudi Hill Station',
      category: 'tourist',
      area: 'Ponmudi',
      description: 'Scenic hill station with lush green forests and tea gardens',
      latitude: 8.7557,
      longitude: 77.1086,
      timing: 'Open 24 hours',
      phone: '',
      images: []
    },
    {
      name: 'Veli Tourist Village',
      category: 'tourist',
      area: 'Veli',
      description: 'Beach resort with backwater rides and floating bridge',
      latitude: 8.4473,
      longitude: 76.9199,
      timing: '9:00 AM - 6:00 PM',
      phone: '+91 471 238 0415',
      images: []
    },
    
    // Emergency Services
    {
      name: 'General Hospital Trivandrum',
      category: 'emergency',
      area: 'Thycaud',
      description: 'Major government hospital with emergency services',
      latitude: 8.4958,
      longitude: 76.9516,
      timing: 'Open 24 hours',
      phone: '+91 471 244 4200',
      images: []
    },
    {
      name: 'KIMS Hospital',
      category: 'emergency',
      area: 'Anayara',
      description: 'Multi-specialty private hospital with advanced facilities',
      latitude: 8.5462,
      longitude: 76.8995,
      timing: 'Open 24 hours',
      phone: '+91 471 302 4000',
      images: []
    },
    {
      name: 'Police Station - Cantonment',
      category: 'emergency',
      area: 'Cantonment',
      description: 'Police station for law enforcement and emergency assistance',
      latitude: 8.5050,
      longitude: 76.9545,
      timing: 'Open 24 hours',
      phone: '100',
      images: []
    },
    {
      name: 'Fire Station - Pattom',
      category: 'emergency',
      area: 'Pattom',
      description: 'Fire and rescue services for emergency situations',
      latitude: 8.5351,
      longitude: 76.9182,
      timing: 'Open 24 hours',
      phone: '101',
      images: []
    },
    
    // Shopping
    {
      name: 'Lulu Mall',
      category: 'shopping',
      area: 'Akkulam',
      description: 'Largest shopping mall in India with 300+ stores',
      latitude: 8.5310,
      longitude: 76.8870,
      timing: '10:00 AM - 10:00 PM',
      phone: '+91 471 600 5000',
      images: []
    },
    {
      name: 'Mall of Travancore',
      category: 'shopping',
      area: 'Thampanoor',
      description: 'Modern shopping complex with retail stores and entertainment',
      latitude: 8.4933,
      longitude: 76.9527,
      timing: '10:00 AM - 9:00 PM',
      phone: '+91 471 245 7777',
      images: []
    },
    {
      name: 'Chalai Bazaar',
      category: 'shopping',
      area: 'Chalai',
      description: 'Traditional street market with clothes, electronics, and spices',
      latitude: 8.4869,
      longitude: 76.9478,
      timing: '9:00 AM - 8:00 PM',
      phone: '',
      images: []
    },
    
    // Transport
    {
      name: 'Thampanoor Bus Station',
      category: 'transport',
      area: 'Thampanoor',
      description: 'Main KSRTC bus terminal with interstate and local services',
      latitude: 8.4902,
      longitude: 76.9512,
      timing: '24/7 Service',
      phone: '+91 471 232 3886',
      images: []
    },
    {
      name: 'East Fort Bus Stop',
      category: 'transport',
      area: 'East Fort',
      description: 'Major city bus stop near Padmanabhaswamy Temple',
      latitude: 8.4831,
      longitude: 76.9463,
      timing: '5:00 AM - 11:00 PM',
      phone: '',
      images: []
    },
    {
      name: 'Kazhakkoottam Bus Stop',
      category: 'transport',
      area: 'Kazhakkoottam',
      description: 'Major bus stop serving Technopark and surrounding areas',
      latitude: 8.5785,
      longitude: 76.8741,
      timing: '5:30 AM - 10:30 PM',
      phone: '',
      images: []
    },
    {
      name: 'Pattom Bus Stop',
      category: 'transport',
      area: 'Pattom',
      description: 'Busy junction with buses to all parts of the city',
      latitude: 8.5378,
      longitude: 76.9170,
      timing: '5:00 AM - 11:00 PM',
      phone: '',
      images: []
    },
    {
      name: 'Vellayambalam Bus Stop',
      category: 'transport',
      area: 'Vellayambalam',
      description: 'Major bus stop near Secretariat',
      latitude: 8.5237,
      longitude: 76.9364,
      timing: '5:00 AM - 11:00 PM',
      phone: '',
      images: []
    }
  ],
  
  brands: [
    {
      name: 'McDonald\'s Trivandrum',
      description: 'Fast food restaurant chain serving burgers, fries, and more',
      address: 'Lulu Mall, Akkulam, Trivandrum',
      latitude: 8.5310,
      longitude: 76.8870,
      phone: '+91 471 600 1111',
      images: [],
      socials: {
        instagram: 'https://instagram.com/mcdonaldsindia',
        facebook: 'https://facebook.com/McDonaldsIndia'
      }
    },
    {
      name: 'Café Coffee Day',
      description: 'Popular coffee shop chain',
      address: 'Multiple locations across Trivandrum',
      latitude: 8.5088,
      longitude: 76.9514,
      phone: '1800 102 5093',
      images: [],
      socials: {
        instagram: 'https://instagram.com/cafecoffeeday',
        facebook: 'https://facebook.com/CafeCoffeeDay'
      }
    },
    {
      name: 'Lulu International Shopping Mall',
      description: 'India\'s largest shopping mall',
      address: 'Akkulam, Trivandrum - 695021',
      latitude: 8.5310,
      longitude: 76.8870,
      phone: '+91 471 600 5000',
      images: [],
      socials: {
        instagram: 'https://instagram.com/lulumallkerala',
        facebook: 'https://facebook.com/LuluMallKerala'
      }
    }
  ],
  
  campaigns: [
    {
      title: 'Summer Sale - 50% Off',
      brandId: 'lulu-mall', // Will be replaced with actual ID
      description: 'Get 50% off on fashion, electronics, and home appliances',
      active: true,
      extraRewardEnabled: true,
      createdAt: new Date().toISOString()
    },
    {
      title: 'Free Coffee on Fridays',
      brandId: 'cafe-coffee-day',
      description: 'Get a free coffee every Friday with any meal',
      active: true,
      extraRewardEnabled: false,
      createdAt: new Date().toISOString()
    },
    {
      title: 'McSaver Combo Offer',
      brandId: 'mcdonalds',
      description: 'Get McSaver combos starting at ₹99',
      active: true,
      extraRewardEnabled: true,
      createdAt: new Date().toISOString()
    }
  ]
};

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');
  
  try {
    // Seed Places
    console.log('📍 Seeding places...');
    let placesCount = 0;
    for (const place of seedData.places) {
      await addDoc(collection(db, 'places'), {
        ...place,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      placesCount++;
    }
    console.log(`✅ Added ${placesCount} places\n`);
    
    // Seed Brands
    console.log('🏢 Seeding brands...');
    const brandIds: { [key: string]: string } = {};
    for (const brand of seedData.brands) {
      const docRef = await addDoc(collection(db, 'brands'), {
        ...brand,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      const brandKey = brand.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      brandIds[brandKey] = docRef.id;
    }
    console.log(`✅ Added ${seedData.brands.length} brands\n`);
    
    // Seed Campaigns
    console.log('📢 Seeding campaigns...');
    let campaignsCount = 0;
    for (const campaign of seedData.campaigns) {
      const brandId = brandIds[campaign.brandId] || brandIds['lulu-international-shopping-mall'];
      await addDoc(collection(db, 'campaigns'), {
        ...campaign,
        brandId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      campaignsCount++;
    }
    console.log(`✅ Added ${campaignsCount} campaigns\n`);
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${placesCount} places`);
    console.log(`   - ${seedData.brands.length} brands`);
    console.log(`   - ${campaignsCount} campaigns`);
    console.log('\n✨ Your Trivandrum One app is now ready with sample data!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedDatabase };
