import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, SlidersHorizontal, Filter, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { PlaceCard } from '../components/PlaceCard';
import { CategoryCard } from '../components/CategoryCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Place } from '../types';
import { calculateDistance, getCurrentLocation } from '../lib/location';
import { blink } from '../lib/firebase';
import { toast } from 'react-hot-toast';

const categories = [
  { id: 'food', name: 'Restaurants', iconLabel: 'FOOD', color: 'from-orange-500 to-red-600' },
  { id: 'medicine', name: 'Medicine', iconLabel: 'MEDICINE', color: 'from-green-500 to-emerald-600' },
  { id: 'tourist', name: 'Tourist Spots', iconLabel: 'TOURIST', color: 'from-blue-500 to-cyan-600' },
  { id: 'emergency', name: 'Emergency', iconLabel: 'EMERGENCY', color: 'from-red-500 to-pink-600' },
  { id: 'shopping', name: 'Shopping', iconLabel: 'SHOPPING', color: 'from-purple-500 to-violet-600' },
];

// Animation variants
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const cardVariants: any = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

export function Explore() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
      let results: any[] = [];
      
      if (selectedCategory === 'all') {
        results = await blink.db.places.list({
          orderBy: { createdAt: 'desc' },
          limit: 50,
        });
      } else {
        results = await blink.db.places.list({
          where: { category: selectedCategory },
          orderBy: { createdAt: 'desc' },
          limit: 50,
        });
      }

      // Sanitize and validate place data
      const sanitizedResults = results.map((place: any) => ({
        ...place,
        // Ensure all fields are safe strings/numbers
        id: String(place.id || '').trim(),
        name: String(place.name || 'Unknown Place').trim(),
        description: String(place.description || '').trim(),
        area: String(place.area || '').trim(),
        category: String(place.category || '').trim(),
        latitude: Number(place.latitude) || null,
        longitude: Number(place.longitude) || null,
      }));

      // Calculate distances if user location is available
      if (userLocation) {
        const placesWithDistance = sanitizedResults.map((place: any) => ({
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

        // Sort by distance
        placesWithDistance.sort((a, b) => {
          if (a.distance === null) return 1;
          if (b.distance === null) return -1;
          return a.distance - b.distance;
        });

        setPlaces(placesWithDistance);
      } else {
        setPlaces(sanitizedResults);
      }
    } catch (error) {
      console.error('Error loading places:', error);
      toast.error('Failed to load places');
      setPlaces([]); // Set empty array on error
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
    <div className="min-h-screen bg-white pt-20 pb-24 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Animated Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Explore <span className="text-gradient">Trivandrum</span>
          </h1>
          <p className="text-slate-600 text-lg">
            Discover the best places around you
          </p>
        </motion.div>

        {/* Animated Quick Categories */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-navy flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-600" />
              Quick Categories
            </h2>
          </div>
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <CategoryCard
                  {...category}
                  onClick={() => setSelectedCategory(category.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="mb-8 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <Input
              type="text"
              placeholder="Search places, areas, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 glass-premium border-slate-300/50 text-navy placeholder:text-slate-400 h-12 text-base"
            />
            {searchQuery && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-navy transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="glass-premium border-slate-300/50 text-slate-600 hover:bg-slate-100 hover:text-navy h-12"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </motion.div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="mb-6 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setSelectedCategory('all')}
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className={selectedCategory === 'all' ? 'gradient-primary text-white border-none shadow-glow-cyan' : 'glass-premium border-slate-300/50 text-slate-600 hover:bg-slate-100'}
            >
              All Places
            </Button>
          </motion.div>
          {categories.map((category) => (
            <motion.div key={category.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={selectedCategory === category.id ? 'gradient-primary text-white border-none shadow-glow-cyan' : 'glass-premium border-slate-300/50 text-slate-600 hover:bg-slate-100'}
              >
                {category.name}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <motion.div 
              className="mb-4 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-slate-600">
                <span className="text-navy font-semibold">{filteredPlaces.length}</span> {filteredPlaces.length === 1 ? 'place' : 'places'} found
              </p>
              {userLocation && (
                <motion.div 
                  className="flex items-center gap-2 text-blue-600"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Sorted by distance</span>
                </motion.div>
              )}
            </motion.div>

            <AnimatePresence mode="wait">
              {filteredPlaces.length === 0 ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12 glass-premium rounded-lg border border-slate-300/30"
                >
                  <p className="text-slate-600 text-lg">No places found</p>
                  <p className="text-slate-500 text-sm mt-2">Try adjusting your filters or search query</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="grid"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredPlaces.map((place, index) => (
                    <motion.div
                      key={place.id}
                      variants={cardVariants}
                      custom={index}
                      layout
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <PlaceCard place={place} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
