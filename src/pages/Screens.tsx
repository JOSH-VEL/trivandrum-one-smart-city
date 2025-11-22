import { useState, useEffect } from 'react';
import { MapPin, Monitor, DollarSign, Users, TrendingUp, Eye, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { blink } from '../lib/firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Screen {
  id: string;
  locationName: string;
  area: string;
  description: string;
  latitude: number;
  longitude: number;
  orientation: string;
  dimensions: string;
  resolution: string;
  dailyFootfallEst: number;
  screenType: string;
  pricing: {
    perDay: number;
    perWeek: number;
    perMonth: number;
  };
  availabilityStatus: string;
  adSlotDuration: number;
  images?: string[];
  tags?: string[];
}

export function Screens() {
  const navigate = useNavigate();
  const [screens, setScreens] = useState<Screen[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  useEffect(() => {
    loadScreens();
  }, []);

  const loadScreens = async () => {
    setLoading(true);
    try {
      // Placeholder - will fetch from database once seeded
      const mockScreens: Screen[] = [
        {
          id: 'screen-001',
          locationName: 'East Fort Junction',
          area: 'East Fort',
          description: 'High-traffic junction screen with excellent visibility for commuters and tourists. Prime location near Padmanabhaswamy Temple.',
          latitude: 8.4835,
          longitude: 76.9495,
          orientation: 'landscape',
          dimensions: '20ft x 10ft',
          resolution: '1920x1080',
          dailyFootfallEst: 50000,
          screenType: 'LED',
          pricing: {
            perDay: 5000,
            perWeek: 30000,
            perMonth: 100000,
          },
          availabilityStatus: 'available',
          adSlotDuration: 10,
          images: ['https://images.unsplash.com/photo-1589519160732-57fc498494f8'],
          tags: ['high-traffic', 'temple-area', 'tourist-zone'],
        },
        {
          id: 'screen-002',
          locationName: 'Technopark Main Gate',
          area: 'Kazhakootam',
          description: 'Tech hub screen targeting IT professionals and young demographics. Located at the entrance of Asia\'s largest IT park.',
          latitude: 8.5542,
          longitude: 76.8794,
          orientation: 'portrait',
          dimensions: '10ft x 18ft',
          resolution: '1080x1920',
          dailyFootfallEst: 40000,
          screenType: 'LED',
          pricing: {
            perDay: 4000,
            perWeek: 25000,
            perMonth: 85000,
          },
          availabilityStatus: 'available',
          adSlotDuration: 10,
          images: ['https://images.unsplash.com/photo-1573164574230-db1d5e960238'],
          tags: ['tech-zone', 'professionals', 'high-income'],
        },
        {
          id: 'screen-003',
          locationName: 'Lulu Mall Entrance',
          area: 'Akkulam',
          description: 'Premium mall screen targeting shoppers and families. High dwell time with affluent audience demographics.',
          latitude: 8.5195,
          longitude: 76.9487,
          orientation: 'landscape',
          dimensions: '15ft x 8ft',
          resolution: '1920x1080',
          dailyFootfallEst: 35000,
          screenType: 'LED',
          pricing: {
            perDay: 6000,
            perWeek: 38000,
            perMonth: 130000,
          },
          availabilityStatus: 'available',
          adSlotDuration: 15,
          images: ['https://images.unsplash.com/photo-1582407947304-fd86f028f716'],
          tags: ['mall', 'family', 'shopping', 'premium'],
        },
        {
          id: 'screen-004',
          locationName: 'Medical College Junction',
          area: 'Ulloor',
          description: 'Healthcare zone screen with visibility to students, patients, and medical professionals. Near major hospitals and colleges.',
          latitude: 8.5238,
          longitude: 76.9363,
          orientation: 'landscape',
          dimensions: '18ft x 9ft',
          resolution: '1920x1080',
          dailyFootfallEst: 30000,
          screenType: 'LED',
          pricing: {
            perDay: 3500,
            perWeek: 22000,
            perMonth: 75000,
          },
          availabilityStatus: 'partially-booked',
          adSlotDuration: 10,
          images: ['https://images.unsplash.com/photo-1557804506-669a67965ba0'],
          tags: ['healthcare', 'students', 'professionals'],
        },
        {
          id: 'screen-005',
          locationName: 'Kovalam Beach Road',
          area: 'Kovalam',
          description: 'Tourist hotspot screen with international audience. Perfect for travel, hospitality, and lifestyle brands.',
          latitude: 8.4002,
          longitude: 76.9786,
          orientation: 'landscape',
          dimensions: '22ft x 12ft',
          resolution: '1920x1080',
          dailyFootfallEst: 25000,
          screenType: 'LED',
          pricing: {
            perDay: 4500,
            perWeek: 28000,
            perMonth: 95000,
          },
          availabilityStatus: 'available',
          adSlotDuration: 12,
          images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e'],
          tags: ['tourist', 'beach', 'international', 'leisure'],
        },
        {
          id: 'screen-006',
          locationName: 'Statue Junction',
          area: 'Palayam',
          description: 'Central business district screen with mixed audience. High visibility for all demographics and commuters.',
          latitude: 8.4878,
          longitude: 76.9522,
          orientation: 'portrait',
          dimensions: '12ft x 20ft',
          resolution: '1080x1920',
          dailyFootfallEst: 45000,
          screenType: 'LED',
          pricing: {
            perDay: 5500,
            perWeek: 35000,
            perMonth: 120000,
          },
          availabilityStatus: 'available',
          adSlotDuration: 10,
          images: ['https://images.unsplash.com/photo-1545558014-8692077e9b5c'],
          tags: ['cbd', 'business', 'mixed-audience', 'high-traffic'],
        },
      ];
      setScreens(mockScreens);
    } catch (error) {
      console.error('Error loading screens:', error);
      toast.error('Failed to load screens');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 pt-20 pb-24 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Digital <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Out-of-Home</span> Advertising
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Reach thousands of people daily with premium DOOH screens strategically placed across Trivandrum
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="border-slate-200 bg-white">
            <CardContent className="p-6 text-center">
              <Monitor className="w-12 h-12 mx-auto mb-4 text-cyan-600" />
              <div className="text-3xl font-bold text-slate-900 mb-1">{screens.length}+</div>
              <div className="text-slate-600 text-sm">Active Screens</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <div className="text-3xl font-bold text-slate-900 mb-1">225K+</div>
              <div className="text-slate-600 text-sm">Daily Impressions</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <div className="text-3xl font-bold text-slate-900 mb-1">95%</div>
              <div className="text-slate-600 text-sm">Visibility Rate</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white">
            <CardContent className="p-6 text-center">
              <Eye className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <div className="text-3xl font-bold text-slate-900 mb-1">4.2s</div>
              <div className="text-slate-600 text-sm">Avg. View Time</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* View Toggle */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">Available Screens</h2>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
            >
              Grid View
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              onClick={() => setViewMode('map')}
              className={viewMode === 'map' ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
            >
              Map View
            </Button>
          </div>
        </div>

        {/* Screens Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {screens.map((screen, index) => (
              <motion.div
                key={screen.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 bg-white overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={screen.images?.[0] || 'https://images.unsplash.com/photo-1589519160732-57fc498494f8'}
                      alt={screen.locationName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Status Badge */}
                    <Badge className={`absolute top-3 right-3 ${
                      screen.availabilityStatus === 'available' 
                        ? 'bg-green-500/90' 
                        : 'bg-orange-500/90'
                    } text-white border-0`}>
                      {screen.availabilityStatus === 'available' ? 'Available' : 'Partially Booked'}
                    </Badge>

                    {/* Location Name */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-xl font-bold text-white">
                        {screen.locationName}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-slate-600 mb-4">
                      <MapPin className="w-4 h-4 text-cyan-500" />
                      <span className="text-sm">{screen.area}</span>
                    </div>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {screen.description}
                    </p>

                    {/* Screen Details */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Daily Footfall:</span>
                        <span className="font-semibold text-slate-900">
                          {new Intl.NumberFormat('en-IN').format(screen.dailyFootfallEst)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Dimensions:</span>
                        <span className="font-semibold text-slate-900">{screen.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Type:</span>
                        <span className="font-semibold text-slate-900">{screen.screenType} {screen.orientation}</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 mb-4">
                      <div className="text-xs text-slate-600 mb-1">Starting from</div>
                      <div className="text-2xl font-bold text-slate-900">
                        {formatNumber(screen.pricing.perDay)}<span className="text-sm text-slate-600">/day</span>
                      </div>
                      <div className="text-xs text-slate-600 mt-2">
                        Week: {formatNumber(screen.pricing.perWeek)} • Month: {formatNumber(screen.pricing.perMonth)}
                      </div>
                    </div>

                    {/* Tags */}
                    {screen.tags && screen.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {screen.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-cyan-50 text-cyan-700 border-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Button
                      onClick={() => navigate(`/screens/${screen.id}`)}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                    >
                      View Details & Book
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <Card className="border-0 bg-gradient-to-r from-cyan-500 to-blue-600 overflow-hidden">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Advertise?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Get your brand in front of thousands of potential customers daily with our premium DOOH network
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/contact')}
                  className="bg-white text-cyan-600 hover:bg-slate-100 text-lg px-8 py-6 rounded-xl"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 text-lg px-8 py-6 rounded-xl"
                >
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

