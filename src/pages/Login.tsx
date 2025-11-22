import { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Search, MapPin, Pill, Utensils, Bus, AlertTriangle, Camera, ShoppingBag, Hotel, ArrowRight, Star, TrendingUp, Users, Award, Sparkles, Target, Zap } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { CategoryCard } from '../components/CategoryCard';
import { PlaceCard } from '../components/PlaceCard';
import { TrivandrumCarousel } from '../components/TrivandlumCarousel';
import { Place } from '../types';
import { useNavigate } from 'react-router-dom';
import { blink } from '../lib/firebase';
import { getCurrentLocation, calculateDistance } from '../lib/location';
import toast from 'react-hot-toast';
import { useRef } from 'react';

const categories = [
  { id: 'medicine', icon: Pill, label: 'Medicine', color: 'from-cyan-400 to-blue-500' },
  { id: 'food', icon: Utensils, label: 'Restaurants', color: 'from-cyan-400 to-teal-500' },
  { id: 'transport', icon: Bus, label: 'Transport', color: 'from-blue-500 to-cyan-400' },
  { id: 'emergency', icon: AlertTriangle, label: 'Emergency', color: 'from-red-500 to-orange-500' },
  { id: 'tourist', icon: Camera, label: 'Tourist Spots', color: 'from-cyan-400 to-blue-500' },
  { id: 'shopping', icon: ShoppingBag, label: 'Shopping', color: 'from-purple-500 to-pink-500' },
  { id: 'hotels', icon: Hotel, label: 'Hotels', color: 'from-indigo-500 to-purple-500' },
];

// Animation variants
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const fadeInUp: any = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Animated Counter Component
function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
      let start = 0;
      const end = target;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, target, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="text-center"
    >
      <div className="text-4xl font-bold text-white mb-2">
        {count >= 1000 ? `${(count / 1000).toFixed(0)}K+` : `${count}+`}
      </div>
      <div className="text-slate-400 text-sm">{label}</div>
    </motion.div>
  );
}

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
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Enhanced with animations */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-200/20 via-blue-100/15 to-teal-100/10"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(0, 188, 212, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(30, 144, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(32, 201, 201, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(0, 188, 212, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0, 188, 212, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 188, 212, 0.08) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          }} />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-cyan text-cyan-400 text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              India's Premier Smart City Platform
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-navy mb-6 leading-tight"
            >
              Discover <span className="text-gradient">Trivandrum</span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Everything you need, <span className="text-gradient-sunset">instantly</span>
              </motion.span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto"
            >
              Your comprehensive guide to essential services, tourist attractions, and rewards across Trivandrum
            </motion.p>

            {/* Enhanced Search Box */}
            <motion.div 
              variants={itemVariants}
              className="max-w-2xl mx-auto"
            >
              <div className="relative flex items-center gap-3 p-2 rounded-2xl glass-premium hover:border-cyan-400/50 transition-all duration-300">
                <Search className="w-5 h-5 text-slate-400 ml-4" />
                <Input
                  type="text"
                  placeholder="Search Food, Medicine, Bus Route, Attractions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 bg-transparent border-0 text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={handleSearch}
                    className="gradient-primary hover:shadow-glow text-white rounded-xl px-8 py-6 text-base font-semibold"
                  >
                    Search
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Animated Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AnimatedCounter target={500} label="Listed Places" />
            <AnimatedCounter target={50000} label="Active Users" />
            <AnimatedCounter target={100} label="DOOH Screens" />
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-slate-400 text-sm">Support</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trivandrum Carousel */}
      <motion.section 
        className="py-16 px-4 bg-blue-50/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="flex items-center justify-between mb-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-4xl font-bold text-navy mb-2">Explore Trivandrum</h2>
              <p className="text-slate-600 text-lg">Discover the beauty of Gods Own Country</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TrivandrumCarousel />
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Categories - Adonmo Card Style with Animation */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">Quick Access</h2>
            <p className="text-slate-600 text-lg">Find what you need in seconds</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <CategoryCard
                  icon={category.icon}
                  label={category.label}
                  onClick={() => navigate(`/explore?category=${category.id}`)}
                  gradient={category.color}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nearby Places with Animation */}
      {userLocation && nearbyPlaces.length > 0 && (
        <motion.section 
          className="py-20 px-4 bg-teal-50/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              className="flex items-center justify-between mb-8"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-2 flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-blue-600" />
                  Nearby Places
                </h2>
                <p className="text-slate-600 text-lg">Based on your current location</p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={() => navigate('/explore')}
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {nearbyPlaces.slice(0, 6).map((place, index) => (
                <motion.div
                  key={place.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <PlaceCard place={place} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Features Section - Adonmo Style with Animations */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Why Choose <span className="text-gradient">Trivandrum One</span>?
            </h2>
            <p className="text-slate-600 text-lg">The complete smart city experience</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: TrendingUp,
                title: 'Earn Rewards',
                description: 'Scan QR codes from DOOH displays and earn coins for every interaction',
                gradient: 'from-cyan-500 to-blue-600'
              },
              {
                icon: Target,
                title: 'Smart Discovery',
                description: 'Find restaurants, medicines, transport, and tourist spots near you instantly',
                gradient: 'from-purple-500 to-pink-600'
              },
              {
                icon: Zap,
                title: '24/7 Access',
                description: 'Access essential services and emergency contacts anytime, anywhere',
                gradient: 'from-orange-500 to-red-600'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="adonmo-card group h-full">
                  <CardContent className="p-8 text-center">
                    <motion.div 
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Adonmo Style with Animations */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-0 gradient-primary shadow-glow">
              <CardContent className="p-12 text-center">
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Ready to explore Trivandrum?
                </motion.h2>
                <motion.p 
                  className="text-white/90 text-lg mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Join thousands of users discovering the smart way to navigate our beautiful city
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      onClick={() => navigate('/explore')}
                      className="bg-white text-cyan-600 hover:bg-slate-100 text-lg px-8 py-6 rounded-xl font-semibold shadow-xl"
                    >
                      Start Exploring
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate('/rewards')}
                      className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl font-semibold"
                    >
                      Learn About Rewards
                    </Button>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
