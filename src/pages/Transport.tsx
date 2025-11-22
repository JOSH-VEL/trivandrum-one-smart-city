import { useState, useEffect } from 'react';
import { Bus, MapPin, Clock, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Place } from '../types';
import { blink } from '../lib/firebase';
import { getCurrentLocation, sortByDistance, formatDistance, getETA } from '../lib/location';

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
    <div className="min-h-screen pt-20 pb-24 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Public Transport</h1>
          <p className="text-muted-foreground">
            Find nearby bus stops and plan your journey
          </p>
        </div>

        {/* Quick Info Card */}
        <Card className="mb-8 gradient-card border-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bus Stops</p>
                  <p className="text-2xl font-bold">{busStops.length}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Wait Time</p>
                  <p className="text-2xl font-bold">10-15 min</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Navigation className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coverage</p>
                  <p className="text-2xl font-bold">City-wide</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search bus stops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Bus Stops List */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredStops.length > 0 ? (
          <div className="space-y-4">
            {filteredStops.map((stop) => (
              <Card key={stop.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{stop.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{stop.area}</p>
                    </div>
                    {stop.distance !== undefined && (
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-1">
                          {formatDistance(stop.distance)}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {getETA(stop.distance)} away
                        </p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stop.description && (
                      <p className="text-sm text-muted-foreground">{stop.description}</p>
                    )}
                    
                    {stop.timing && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{stop.timing}</span>
                      </div>
                    )}

                    {userLocation && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lon}&destination=${stop.latitude},${stop.longitude}`;
                          window.open(url, '_blank');
                        }}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No bus stops found</p>
          </div>
        )}
      </div>
    </div>
  );
}
