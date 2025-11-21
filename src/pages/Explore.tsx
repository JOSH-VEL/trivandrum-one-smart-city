import { useState, useEffect } from 'react';
import { MapPin, Search, SlidersHorizontal } from 'lucide-react';
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

export function Explore() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    loadUserLocation();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadPlaces();
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

        // Sort by distance
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
    <div className="min-h-screen bg-dark-navy pt-20 pb-24 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore <span className="gradient-text">Trivandrum</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Discover the best places around you
          </p>
        </div>

        {/* Quick Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                {...category}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search places, areas, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
          <Button
            variant="outline"
            className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            onClick={() => setSelectedCategory('all')}
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className={selectedCategory === 'all' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-none' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}
          >
            All Places
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={selectedCategory === category.id ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-none' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-slate-400">
                {filteredPlaces.length} {filteredPlaces.length === 1 ? 'place' : 'places'} found
              </p>
              {userLocation && (
                <div className="flex items-center gap-2 text-cyan-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Sorted by distance</span>
                </div>
              )}
            </div>

            {filteredPlaces.length === 0 ? (
              <div className="text-center py-12 bg-slate-800 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-lg">No places found</p>
                <p className="text-slate-500 text-sm mt-2">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

