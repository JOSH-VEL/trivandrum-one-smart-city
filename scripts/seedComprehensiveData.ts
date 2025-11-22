import { blink } from '../src/lib/firebase';
import { places, screens, campaigns, brands } from '../src/lib/comprehensiveSeedData';

async function seedComprehensiveData() {
  console.log('🌱 Starting comprehensive data seeding...');

  try {
    // Seed places
    console.log('📍 Seeding places...');
    for (const place of places) {
      try {
        await blink.db.places.create(place);
        console.log(`✓ Added place: ${place.name}`);
      } catch (error) {
        console.error(`✗ Failed to add place ${place.name}:`, error);
      }
    }

    // Seed brands
    console.log('🏢 Seeding brands...');
    for (const brand of brands) {
      try {
        await blink.db.brands.create(brand);
        console.log(`✓ Added brand: ${brand.name}`);
      } catch (error) {
        console.error(`✗ Failed to add brand ${brand.name}:`, error);
      }
    }

    // Seed campaigns
    console.log('📢 Seeding campaigns...');
    for (const campaign of campaigns) {
      try {
        await blink.db.campaigns.create(campaign);
        console.log(`✓ Added campaign: ${campaign.title}`);
      } catch (error) {
        console.error(`✗ Failed to add campaign ${campaign.title}:`, error);
      }
    }

    console.log('✅ Comprehensive data seeding completed!');
    console.log(`📊 Summary:`);
    console.log(`   - ${places.length} places`);
    console.log(`   - ${brands.length} brands`);
    console.log(`   - ${campaigns.length} campaigns`);
    console.log(`   - ${screens.length} screens (in memory)`);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedComprehensiveData();
}

export { seedComprehensiveData };
