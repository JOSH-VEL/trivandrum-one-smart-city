import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, MapPin, Clock, Navigation, Search, TrendingUp, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Place } from '../types';
import { blink } from '../lib/firebase';
import { getCurrentLocation, sortByDistance, formatDistance, getETA } from '../lib/location';

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

export function Transport() {
  const [search, setSearch] = useState('');
  const [busStops, setBusStops] = useState<(Place & { distance?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    async function init() {
      const location = await getCurrentLocation();
      if (location) {
        setUserLocation({ lat: location.latitude, lon: location.longitude });
      }
      await loadBusStops(location);
    }
    init();
  }, []);

  async function loadBusStops(location: { latitude: number; longitude: number } | null) {
    setLoading(true);
    try {
      let results = await blink.db.places.list({
        where: { category: 'transport' }
      });

      if (location) {
        results = sortByDistance(results as Place[], location.latitude, location.longitude);
      }

      setBusStops(results as (Place & { distance?: number })[]);
    } catch (error) {
      console.error('Error loading bus stops:', error);
    }
    setLoading(false);
  }

  const filteredStops = busStops.filter(
    (stop) =>
      stop.name.toLowerCase().includes(search.toLowerCase()) ||
      stop.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-24 lg:pb-8 bg-navy">
      <div className="container mx-auto px-4 py-8">
        {/* Animated Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-white flex items-center gap-3">
            <Bus className="w-10 h-10 text-cyan-400" />
            Public Transport
          </h1>
          <p className="text-slate-400 text-lg">
            Find nearby bus stops and plan your journey
          </p>
        </motion.div>

        {/* Animated Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8 adonmo-card">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Bus className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Bus Stops</p>
                    <p className="text-3xl font-bold text-white">{busStops.length}</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Clock className="w-7 h-7 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Avg. Wait Time</p>
                    <p className="text-3xl font-bold text-white">10-15 min</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Navigation className="w-7 h-7 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Coverage</p>
                    <p className="text-3xl font-bold text-white">City-wide</p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search bus stops..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 glass-premium border-slate-700/50 text-white h-12"
            />
          </div>
        </motion.div>

        {/* Bus Stops List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : filteredStops.length > 0 ? (
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredStops.map((stop, index) => (
                <motion.div
                  key={stop.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ x: 8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Card className="adonmo-card">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-white">{stop.name}</CardTitle>
                          <p className="text-sm text-slate-400 mt-1">{stop.area}</p>
                        </div>
                        {stop.distance !== undefined && (
                          <div className="text-right">
                            <Badge variant="secondary" className="mb-1 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                              {formatDistance(stop.distance)}
                            </Badge>
                            <p className="text-xs text-slate-400">
                              {getETA(stop.distance)} away
                            </p>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {stop.description && (
                          <p className="text-sm text-slate-400">{stop.description}</p>
                        )}
                        
                        {stop.timing && (
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Clock className="w-4 h-4 text-cyan-400" />
                            <span>{stop.timing}</span>
                          </div>
                        )}

                        {userLocation && (
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lon}&destination=${stop.latitude},${stop.longitude}`;
                                window.open(url, '_blank');
                              }}
                              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                            >
                              <MapPin className="w-4 h-4 mr-2" />
                              Get Directions
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-12 glass-premium rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-slate-400">No bus stops found</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
