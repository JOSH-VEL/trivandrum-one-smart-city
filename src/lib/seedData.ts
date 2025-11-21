import { blink } from './firebase';

// Dummy seed data for immediate testing
export const seedData = {
  places: [
    // Food & Restaurants
    {
      id: 'place-kfc-1',
      name: 'KFC - Kovalam Bypass',
      category: 'food',
      area: 'Kovalam',
      description: 'Crispy fried chicken and burgers. Open till midnight!',
      latitude: 8.3870,
      longitude: 76.9670,
      timing: '10:00 AM - 12:00 AM',
      phone: '+91 471 2345678',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'place-mcd-1',
      name: 'McDonald\'s - Technopark',
      category: 'food',
      area: 'Technopark',
      description: 'World-famous burgers and fries. Drive-through available.',
      latitude: 8.5502,
      longitude: 76.8795,
      timing: '8:00 AM - 11:00 PM',
      phone: '+91 471 2345679',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'place-ccd-1',
      name: 'Café Coffee Day - MG Road',
      category: 'food',
      area: 'MG Road',
      description: 'Your favorite coffee shop with snacks and desserts.',
      latitude: 8.5074,
      longitude: 76.9560,
      timing: '7:00 AM - 11:00 PM',
      phone: '+91 471 2345680',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'place-paragon-1',
      name: 'Paragon Restaurant',
      category: 'food',
      area: 'Pattom',
      description: 'Authentic Kerala cuisine and biryani. Family dining.',
      latitude: 8.5152,
      longitude: 76.9488,
      timing: '11:00 AM - 11:00 PM',
      phone: '+91 471 2345681',
      createdAt: new Date().toISOString(),
    },
    
    // Medicine & Healthcare
    {
      id: 'place-apollo-1',
      name: 'Apollo Pharmacy - Kazhakkoottam',
      category: 'medicine',
      area: 'Kazhakkoottam',
      description: '24/7 pharmacy with home delivery. All medicines available.',
      latitude: 8.5755,
      longitude: 76.8733,
      timing: '24/7',
      phone: '+91 471 3345678',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'place-medplus-1',
      name: 'MedPlus - Pattom',
      category: 'medicine',
      area: 'Pattom',
      description: 'Trusted pharmacy chain with great discounts.',
      latitude: 8.5162,
      longitude: 76.9478,
      timing: '8:00 AM - 10:00 PM',
      phone: '+91 471 3345679',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'place-ananthapuri-1',
      name: 'Ananthapuri Hospitals',
      category: 'emergency',
      area: 'Chacka',
      description: '24/7 Emergency care, ICU, and all specialties.',
      latitude: 8.5139,
      longitude: 76.9558,
      timing: '24/7',
      phone: '+91 471 2730300',
      createdAt: new Date().toISOString(),
    },
    
    // Tourist Spots
    {
      id: 'place-kovalam-1',
      name: 'Kovalam Beach',
      category: 'tourist',
      area: 'Kovalam',
      description: 'Famous crescent-shaped beach with water sports and resorts.',
      latitude: 8.4004,
      longitude: 76.9790,
      timing: '6:00 AM - 7:00 PM',
      phone: '+91 471 2480085',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'place-zoo-1',
      name: 'Thiruvananthapuram Zoo',
      category: 'tourist',
      area: 'Museum',
      description: 'One of the oldest zoos in India with botanical gardens.',
      latitude: 8.5061,
      longitude: 76.9525,
      timing: '9:00 AM - 5:15 PM',
      phone: '+91 471 2315257',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'place-padmanabha-1',
      name: 'Padmanabhaswamy Temple',
      category: 'tourist',
      area: 'East Fort',
      description: 'Historic temple dedicated to Lord Vishnu. Dress code mandatory.',
      latitude: 8.4826,
      longitude: 76.9493,
      timing: '3:30 AM - 12:00 PM, 5:00 PM - 8:30 PM',
      phone: '+91 471 2450233',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'place-museum-1',
      name: 'Napier Museum',
      category: 'tourist',
      area: 'Museum',
      description: 'Art and history museum with Indo-Saracenic architecture.',
      latitude: 8.5073,
      longitude: 76.9533,
      timing: '10:00 AM - 5:00 PM (Closed Mon)',
      phone: '+91 471 2318294',
      createdAt: new Date().toISOString(),
    },
    
    // Shopping
    {
      id: 'place-lulu-1',
      name: 'Lulu Mall Trivandrum',
      category: 'shopping',
      area: 'Akkulam',
      description: 'Largest mall in Kerala with 300+ brands, food court, cinema.',
      latitude: 8.5289,
      longitude: 76.9138,
      timing: '10:00 AM - 10:00 PM',
      phone: '+91 471 6600600',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'place-malabar-1',
      name: 'Malabar Gold & Diamonds',
      category: 'shopping',
      area: 'MG Road',
      description: 'Premium jewellery showroom with latest collections.',
      latitude: 8.5084,
      longitude: 76.9570,
      timing: '10:00 AM - 8:30 PM',
      phone: '+91 471 2333399',
      createdAt: new Date().toISOString(),
    },
    
    // Transport
    {
      id: 'place-bus-1',
      name: 'East Fort Bus Stand',
      category: 'transport',
      area: 'East Fort',
      description: 'Main city bus stand with routes to all areas.',
      latitude: 8.4866,
      longitude: 76.9492,
      timing: '5:00 AM - 11:00 PM',
      phone: '+91 471 2463886',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'place-bus-2',
      name: 'Technopark Bus Stop',
      category: 'transport',
      area: 'Technopark',
      description: 'Bus stop serving IT employees and residents.',
      latitude: 8.5502,
      longitude: 76.8795,
      timing: '6:00 AM - 10:00 PM',
      phone: '+91 471 2700400',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'place-bus-3',
      name: 'Kesavadasapuram Bus Stop',
      category: 'transport',
      area: 'Pattom',
      description: 'Major bus stop near colleges and residential areas.',
      latitude: 8.5226,
      longitude: 76.9425,
      timing: '5:30 AM - 11:00 PM',
      phone: '',
      createdAt: new Date().toISOString(),
    },
  ],
  
  campaigns: [
    {
      id: 'campaign-1',
      title: 'KFC Mega Feast',
      brandId: 'brand-kfc',
      description: 'Get 40% off on KFC Bucket Meal. Scan QR code to earn coins!',
      active: 1,
      extraRewardEnabled: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'campaign-2',
      title: 'Lulu Mall Weekend Sale',
      brandId: 'brand-lulu',
      description: 'Shop and save! Extra 20% off on fashion this weekend.',
      active: 1,
      extraRewardEnabled: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'campaign-3',
      title: 'Malabar Gold Festival Offers',
      brandId: 'brand-malabar',
      description: '25% off on making charges. Limited period offer!',
      active: 1,
      extraRewardEnabled: 0,
      createdAt: new Date().toISOString(),
    },
  ],
  
  brands: [
    {
      id: 'brand-kfc',
      name: 'KFC',
      description: 'World-famous fried chicken',
      address: 'Kovalam Bypass, Trivandrum',
      latitude: 8.3870,
      longitude: 76.9670,
      phone: '+91 471 2345678',
      socials: JSON.stringify({ instagram: '@kfcindia', facebook: 'KFCIndia' }),
      createdAt: new Date().toISOString(),
    },
    {
      id: 'brand-lulu',
      name: 'Lulu Mall',
      description: 'Kerala\'s largest shopping destination',
      address: 'Akkulam, Trivandrum',
      latitude: 8.5289,
      longitude: 76.9138,
      phone: '+91 471 6600600',
      socials: JSON.stringify({ instagram: '@lulumallkerala', facebook: 'LuluMallTrivandrum' }),
      createdAt: new Date().toISOString(),
    },
    {
      id: 'brand-malabar',
      name: 'Malabar Gold & Diamonds',
      description: 'Trusted jewellery brand',
      address: 'MG Road, Trivandrum',
      latitude: 8.5084,
      longitude: 76.9570,
      phone: '+91 471 2333399',
      socials: JSON.stringify({ instagram: '@malabargoldanddiamonds', facebook: 'MalabarGoldandDiamonds' }),
      createdAt: new Date().toISOString(),
    },
  ],
};

// Function to seed the database
export async function seedDatabase() {
  console.log('🌱 Starting database seeding...');
  
  try {
    // Seed places
    console.log('📍 Seeding places...');
    for (const place of seedData.places) {
      try {
        await blink.db.places.create(place);
        console.log(`✅ Created place: ${place.name}`);
      } catch (error: any) {
        if (error.message?.includes('UNIQUE constraint failed')) {
          console.log(`⏭️  Place already exists: ${place.name}`);
        } else {
          console.error(`❌ Error creating place ${place.name}:`, error);
        }
      }
    }
    
    // Seed brands
    console.log('\n🏢 Seeding brands...');
    for (const brand of seedData.brands) {
      try {
        await blink.db.brands.create(brand);
        console.log(`✅ Created brand: ${brand.name}`);
      } catch (error: any) {
        if (error.message?.includes('UNIQUE constraint failed')) {
          console.log(`⏭️  Brand already exists: ${brand.name}`);
        } else {
          console.error(`❌ Error creating brand ${brand.name}:`, error);
        }
      }
    }
    
    // Seed campaigns
    console.log('\n[Campaigns] Seeding campaigns...');
    for (const campaign of seedData.campaigns) {
      try {
        await blink.db.campaigns.create(campaign);
        console.log(`✅ Created campaign: ${campaign.title}`);
      } catch (error: any) {
        if (error.message?.includes('UNIQUE constraint failed')) {
          console.log(`⏭️  Campaign already exists: ${campaign.title}`);
        } else {
          console.error(`❌ Error creating campaign ${campaign.title}:`, error);
        }
      }
    }
    
    console.log('\n✨ Database seeding completed!');
    return { success: true, message: 'Database seeded successfully' };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return { success: false, error };
  }
}

// Helper to check if database is empty
export async function isDatabaseEmpty() {
  try {
    const places = await blink.db.places.list({ limit: 1 });
    return places.length === 0;
  } catch (error) {
    console.error('Error checking database:', error);
    return true;
  }
}
