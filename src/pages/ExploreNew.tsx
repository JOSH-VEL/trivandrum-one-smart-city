import { useState, useEffect } from 'react';
import { MapPin, Search, Star, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { PlaceCard } from '../components/PlaceCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Place } from '../types';
import { calculateDistance, getCurrentLocation } from '../lib/location';
import { blink } from '../lib/firebase';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const premiumCategories = [
  { id: 'top-visit', name: 'Top Visit', color: 'from-amber-500 to-orange-600' },
  { id: 'medicine', name: 'Medicine', color: 'from-cyan-400 to-blue-500' },
  { id: 'food', name: 'Restaurants', color: 'from-orange-500 to-red-600' },
  { id: 'transport', name: 'Transport', color: 'from-blue-500 to-cyan-600' },
  { id: 'emergency', name: 'Emergency', color: 'from-red-500 to-orange-500' },
  { id: 'tourist', name: 'Tourist Spots', color: 'from-blue-400 to-cyan-500' },
  { id: 'shopping', name: 'Shopping', color: 'from-purple-500 to-violet-600' },
  { id: 'hotels', name: 'Hotels', color: 'from-indigo-500 to-purple-500' },
];

export function ExploreNew() {
  const [selectedCategory, setSelectedCategory] = useState<string>('top-visit');
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    loadUserLocation();
  }, []);

  useEffect(() => {
    loadPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const loadUserLocation = async () => {
    try {
      const loc = await getCurrentLocation();
      if (loc) {
        setUserLocation({ latitude: loc.latitude, longitude: loc.longitude });
      }
    } catch (error) {
      console.log('Location not available');
    }
  };

  const loadPlaces = async () => {
    setLoading(true);
    try {
      let results;
      
      if (selectedCategory === 'top-visit') {
        // Load advertiser-promoted places (premium content)
        results = await blink.db.places.list({
          orderBy: { createdAt: 'desc' },
          limit: 20,
        });
      } else {
        results = await blink.db.places.list({
          where: { category: selectedCategory },
          orderBy: { createdAt: 'desc' },
          limit: 20,
        });
      }

      // Calculate distances if user location is available
      if (userLocation) {
        const placesWithDistance = results.map((place: any) => ({
          ...place,
          distance: place.latitude && place.longitude
            ? calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                place.latitude,
                place.longitude
              )
            : null,
        }));

        // Sort by distance for better UX
        placesWithDistance.sort((a, b) => {
          if (a.distance === null) return 1;
          if (b.distance === null) return -1;
          return a.distance - b.distance;
        });

        setPlaces(placesWithDistance);
      } else {
        setPlaces(results);
      }
    } catch (error) {
      console.error('Error loading places:', error);
      toast.error('Failed to load places');
    } finally {
      setLoading(false);
    }
  };

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.area?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 pt-20 pb-24 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-heading-main)' }}>
            Explore <span className="text-gradient">Trivandrum</span>
          </h1>
          <p className="text-lg font-medium" style={{ color: 'var(--color-body)' }}>
            Discover the beauty of God's Own Country
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              type="text"
              placeholder="Search places, areas, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg glass-premium border-0 shadow-lg"
              style={{ color: 'var(--color-body)' }}
            />
          </div>
        </motion.div>

        {/* Premium Category Pills - Beautiful & Modern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-cyan-600" />
            <h2 className="text-xl font-bold" style={{ color: 'var(--color-heading-sub)' }}>
              Quick Sorting
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {premiumCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant="outline"
                className={`
                  h-14 px-6 rounded-2xl border-2 font-bold text-base transition-all duration-300
                  ${selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg scale-105`
                    : 'glass-premium border-slate-200 hover:border-cyan-300 hover:shadow-md'
                  }
                `}
              >
                {category.name}
                {selectedCategory === category.id && (
                  <Star className="w-4 h-4 ml-2 fill-current" />
                )}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-lg font-medium" style={{ color: 'var(--color-body)' }}>
                <span className="font-bold" style={{ color: 'var(--color-heading-main)' }}>
                  {filteredPlaces.length}
                </span>{' '}
                premium {filteredPlaces.length === 1 ? 'place' : 'places'} found
              </p>
              {userLocation && (
                <div className="flex items-center gap-2 text-cyan-600 font-medium">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Sorted by distance</span>
                </div>
              )}
            </div>

            {filteredPlaces.length === 0 ? (
              <div className="text-center py-12 glass-premium rounded-2xl">
                <p className="text-xl font-bold mb-2" style={{ color: 'var(--color-heading-main)' }}>
                  No places found
                </p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-body-light)' }}>
                  Try adjusting your filters or search query
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredPlaces.map((place, idx) => (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <PlaceCard place={place} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
