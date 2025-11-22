import { useState, useEffect } from 'react';
import { Search, MapPin, Pill, Utensils, Bus, AlertTriangle, Camera, ShoppingBag, Hotel, ArrowRight, Star, TrendingUp, Users, Award, Eye, Sparkles } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { CategoryCard } from '../components/CategoryCard';
import { PlaceCard } from '../components/PlaceCard';
import { TrivandrumCarousel } from '../components/TrivandlumCarousel';
import { LandmarkIcon } from '../components/svg/LandmarkSVGs';
import { Place } from '../types';
import { useNavigate } from 'react-router-dom';
import { blink } from '../lib/firebase';
import { getCurrentLocation, calculateDistance } from '../lib/location';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const categories = [
  { id: 'medicine', icon: Pill, label: 'Medicine', color: 'from-cyan-400 to-blue-500' },
  { id: 'food', icon: Utensils, label: 'Restaurants', color: 'from-cyan-400 to-teal-500' },
  { id: 'transport', icon: Bus, label: 'Transport', color: 'from-blue-500 to-cyan-400' },
  { id: 'emergency', icon: AlertTriangle, label: 'Emergency', color: 'from-red-500 to-orange-500' },
  { id: 'tourist', icon: Camera, label: 'Tourist Spots', color: 'from-cyan-400 to-blue-500' },
  { id: 'shopping', icon: ShoppingBag, label: 'Shopping', color: 'from-purple-500 to-pink-500' },
  { id: 'hotels', icon: Hotel, label: 'Hotels', color: 'from-indigo-500 to-purple-500' },
];

const partnerBrands = [
  { name: 'KFC', tagline: 'Crispy favourites near you' },
  { name: 'Swiggy', tagline: 'Your favourites delivered fast' },
  { name: 'Lulu Mall', tagline: 'Shop · Dine · Play' },
  { name: 'Kovalam Tourism', tagline: 'Golden sands & blue waters' },
  { name: 'Taj Hotels', tagline: 'Luxury hospitality' },
  { name: 'Kochi Metro', tagline: 'Swift urban mobility' },
];

const testimonials = [
  {
    text: 'Our brand visibility across Trivandrum improved significantly after partnering with Trivandrum One.',
    author: 'Local Retailer',
    role: 'Fashion Brand Owner'
  },
  {
    text: 'Great support and quick campaign deployment. The ROI has been exceptional.',
    author: 'Restaurant Owner',
    role: 'F&B Entrepreneur'
  },
  {
    text: 'Seamless integration with our marketing strategy. Highly recommended for city-wide reach.',
    author: 'Digital Marketing Manager',
    role: 'Multi-brand Retailer'
  },
];

export function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    loadUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      loadNearbyPlaces();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation]);

  async function loadUserLocation() {
    try {
      const location = await getCurrentLocation();
      if (location) {
        setUserLocation({ latitude: location.latitude, longitude: location.longitude });
        toast.success('Location enabled');
      }
    } catch (error) {
      console.error('Location error:', error);
    }
  }

  async function loadNearbyPlaces() {
    if (!userLocation) return;

    setLoading(true);
    try {
      const results = await blink.db.places.list();
      
      const placesWithDistance = results.map((place: any) => ({
        ...place,
        distance: calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          place.latitude || 0,
          place.longitude || 0
        ),
      }));

      const sorted = placesWithDistance.sort((a, b) => a.distance - b.distance);
      setNearbyPlaces(sorted.slice(0, 6));
    } catch (error) {
      console.error('Error loading places:', error);
    }
    setLoading(false);
  }

  function handleSearch() {
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  }

  return (
    <div className="min-h-screen bg-dark-navy">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-cyan-900/70" />
        
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              India's Premier Smart City Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Discover{' '}
              <span style={{
                background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block'
              }}>
                Trivandrum
              </span>
              <br />
              Everything you need,{' '}
              <span style={{
                background: 'linear-gradient(90deg, #FF6600, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block'
              }}>
                instantly
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Your comprehensive guide to essential services, tourist attractions, and rewards across Trivandrum
            </p>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto">
              <div className="relative flex items-center gap-3 p-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
                <Search className="w-5 h-5 text-slate-400 ml-4" />
                <Input
                  type="text"
                  placeholder="Search Food, Medicine, Bus Route, Attractions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 bg-transparent border-0 text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button 
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl px-8 font-bold"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">500+</div>
              <div className="text-slate-300 text-sm font-medium">Listed Places</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">50K+</div>
              <div className="text-slate-300 text-sm font-medium">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">100+</div>
              <div className="text-slate-300 text-sm font-medium">DOOH Screens</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
              <div className="text-slate-300 text-sm font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trivandrum Carousel */}
      <section className="py-16 px-4 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Explore Trivandrum</h2>
              <p className="text-slate-300 font-medium">Discover the beauty of God's Own Country</p>
            </div>
          </div>
          <TrivandrumCarousel />
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-heading-main)' }}>Quick Access</h2>
            <p className="text-slate-300 text-lg font-medium">Find what you need in seconds</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                label={category.label}
                onClick={() => navigate(`/explore?category=${category.id}`)}
                gradient={category.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Places */}
      {userLocation && nearbyPlaces.length > 0 && (
        <section className="py-20 px-4 bg-white/5">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-cyan-400" />
                  Nearby Places
                </h2>
                <p className="text-slate-300 font-medium">Based on your current location</p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/explore')}
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-bold"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyPlaces.slice(0, 6).map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blended: Discover City + Brands Section */}
      <section className="py-20 px-4 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span style={{ color: 'var(--color-heading-main)' }}>Discover</span> <span className="text-gradient">Trivandrum</span> • <span style={{ color: 'var(--color-heading-main)' }}>Discover the</span> <span className="text-gradient-sunset">Brands</span>
            </h2>
            <p className="text-slate-300 text-lg font-medium">
              Explore the beauty of God's Own Country and the brands that make it special
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Tourist Places */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--color-heading-main)' }}>
                <Camera className="w-6 h-6 text-cyan-400" />
                Top Tourist Destinations
              </h3>
              <div className="space-y-4 overflow-x-auto pb-4">
                <div className="flex gap-4">
                  {[
                    { name: 'Kovalam Beach', landmark: 'kovalam', desc: 'Golden sands & blue waters' },
                    { name: 'Ponmudi Hills', landmark: 'ponmudi', desc: 'Misty mountains & tea gardens' },
                    { name: 'Veli Lake', landmark: 'veli', desc: 'Serene backwaters' },
                    { name: 'Napier Museum', landmark: 'padmanabhaswamy', desc: 'Art & heritage' },
                  ].map((place, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex-shrink-0 w-48 p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="mb-3 group-hover:scale-110 transition-transform flex justify-center">
                        {LandmarkIcon({ landmark: place.landmark, size: 56 })}
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{place.name}</h4>
                      <p className="text-xs text-slate-400 leading-tight">{place.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Featured Advertisers */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--color-heading-main)' }}>
                <Sparkles className="w-6 h-6 text-cyan-400" />
                Featured Brands
              </h3>
              <div className="space-y-4 overflow-x-auto pb-4">
                <div className="flex gap-4">
                  {partnerBrands.slice(0, 4).map((brand, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex-shrink-0 w-48 p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold text-lg">{brand.name.charAt(0)}</span>
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{brand.name}</h4>
                      <p className="text-xs text-slate-400 leading-tight">{brand.tagline}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Network Summary + CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <Card className="overflow-hidden border-0 glass-premium">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--color-heading-main)' }}>
                  How Trivandrum One is redefining{' '}
                  <span style={{
                    background: 'linear-gradient(90deg, #0891B2, #06B6D4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'inline-block'
                  }}>
                    urban storytelling
                  </span>
                </h2>
                <p className="text-lg font-medium leading-relaxed max-w-3xl mx-auto" style={{ color: 'var(--color-body)' }}>
                  City-wide DOOH network across residences, corporates, gyms, cafés, malls and transit hubs, connecting brands with locals and visitors in real time.
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/network-advertisers')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg px-10 py-6 rounded-xl font-bold shadow-premium"
                >
                  View Network & Advertiser Details
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-heading-main)' }}>Why Choose Trivandrum One?</h2>
            <p className="text-slate-300 text-lg font-medium">The complete smart city experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="adonmo-card group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Earn Rewards</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Scan QR codes from DOOH displays and earn coins for every interaction
                </p>
              </CardContent>
            </Card>

            <Card className="adonmo-card group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Smart Discovery</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Find restaurants, medicines, transport, and tourist spots near you instantly
                </p>
              </CardContent>
            </Card>

            <Card className="adonmo-card group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">24/7 Access</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Access essential services and emergency contacts anytime, anywhere
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-cyan-500 to-blue-600">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to explore Trivandrum?
              </h2>
              <p className="text-white/90 text-lg mb-8 font-medium">
                Join thousands of users discovering the smart way to navigate our beautiful city
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/explore')}
                  className="bg-white text-cyan-600 hover:bg-slate-100 text-lg px-8 py-6 rounded-xl font-bold"
                >
                  Start Exploring
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/rewards')}
                  className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 text-lg px-8 py-6 rounded-xl font-bold"
                >
                  Learn About Rewards
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
