import { MapPin, TrendingUp, Users, DollarSign, CheckCircle, ArrowRight, BarChart3, Eye } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const locations = [
  { name: 'Kazhakkoottam', screens: 8, dailyImpressions: '6500+', footfall: 'High' },
  { name: 'Palayam', screens: 12, dailyImpressions: '8200+', footfall: 'Very High' },
  { name: 'East Fort', screens: 6, dailyImpressions: '4800+', footfall: 'High' },
  { name: 'Trivandrum Central', screens: 15, dailyImpressions: '10500+', footfall: 'Critical' },
  { name: 'Kowdiar', screens: 5, dailyImpressions: '3200+', footfall: 'Medium' },
  { name: 'Veli Lake Area', screens: 8, dailyImpressions: '5600+', footfall: 'High' },
];

const offerings = [
  { title: 'Residences', description: 'Reach city households through residential displays with tailored local messaging' },
  { title: 'Corporates', description: 'Connect with working professionals in offices and business hubs across Trivandrum' },
  { title: 'Gyms & Cafés', description: 'Engage health-conscious and lifestyle-focused audiences with high dwell-time' },
  { title: 'Malls & Public Spaces', description: 'Influence shoppers and families at prime high-footfall locations' },
  { title: 'Transit Hubs', description: 'Capture commuters at bus stations and transportation junctions' },
  { title: 'Retail & F&B', description: 'Drive foot traffic and sales in stores and restaurants' },
];

const stats = [
  { label: '24+ Locations', value: 'Premium Reach' },
  { label: '100+ Screens', value: 'City-wide Coverage' },
  { label: '50K+ Daily Impressions', value: 'Massive Visibility' },
  { label: '86%+ Urban Coverage', value: 'Target Audience' },
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

const partnerBrands = [
  { name: 'KFC', tagline: 'Crispy favourites near you' },
  { name: 'Swiggy', tagline: 'Your favourites delivered fast' },
  { name: 'Lulu Mall', tagline: 'Shop · Dine · Play' },
  { name: 'Kovalam Tourism', tagline: 'Golden sands & blue waters' },
  { name: 'Taj Hotels', tagline: 'Luxury hospitality' },
  { name: 'Kochi Metro', tagline: 'Swift urban mobility' },
];

export function DOOHAdvertising() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-dark-navy pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-cyan-900/70" />
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              DOOH Advertising Platform
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Reach 50,000+ daily impressions across 100+ screens in 24+ premium locations across Trivandrum
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.label}</div>
                <div className="text-slate-400 text-sm">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark "Who We Reach" Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How Trivandrum One is redefining URBAN STORYTELLING
            </h2>
            <p className="text-slate-400 text-lg">Connect with diverse audiences across strategic locations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Dark Background with Content */}
            <div className="space-y-6">
              {offerings.map((offering, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 mt-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{offering.title}</h3>
                      <p className="text-slate-400 text-sm">{offering.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Large Screen Image Placeholder */}
            <div className="relative h-96 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-white font-bold text-xl">DOOH Screen</p>
                  <p className="text-slate-400 text-sm mt-2">Premium Outdoor Display</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Light Stats & Map Section */}
      <section className="py-20 px-4 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Map-style Graphic */}
            <div className="relative h-80 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                  <p className="text-white font-bold text-xl">Trivandrum Network</p>
                  <p className="text-slate-400 text-sm mt-2">24+ Premium Locations</p>
                  <div className="mt-6 space-y-1 text-xs text-slate-400">
                    <p>🔵 Residential</p>
                    <p>🔵 Commercial</p>
                    <p>🔵 Transit</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Stats Card */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Extensive Network</h3>
                <p className="text-slate-400 mb-6">Our strategic screen placement ensures maximum visibility across key demographics</p>
              </div>

              <div className="space-y-4">
                {locations.slice(0, 3).map((loc, idx) => (
                  <div key={idx} className="flex items-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10 group hover:border-cyan-500/30 transition-all">
                    <div className="flex-1">
                      <p className="font-bold text-white mb-1">{loc.name}</p>
                      <p className="text-sm text-slate-400">{loc.screens} screens • {loc.dailyImpressions}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {loc.footfall}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/')}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg px-8 py-6 rounded-xl flex items-center justify-center gap-2"
                >
                  View All Locations
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Brands Carousel */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Leading Brands</h2>
            <p className="text-slate-400 text-lg">Active campaigns on our DOOH network</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {partnerBrands.map((brand, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold">{brand.name.charAt(0)}</span>
                  </div>
                  <p className="font-bold text-white text-sm mb-1">{brand.name}</p>
                  <p className="text-xs text-slate-400">{brand.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Partners Say</h2>
            <p className="text-slate-400 text-lg">Real results from real campaigns</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-cyan-400">★</span>
                  ))}
                </div>
                <p className="text-white mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="font-bold text-white text-sm">{testimonial.author}</p>
                  <p className="text-slate-400 text-xs">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Flexible Pricing Options</h2>
            <p className="text-slate-400 text-lg">Scalable solutions for businesses of all sizes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((tier, idx) => (
              <Card key={idx} className="adonmo-card overflow-hidden relative">
                <CardContent className="p-8">
                  {idx === 1 && (
                    <div className="absolute top-0 right-0 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-bl-lg">
                      POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">Tier {idx + 1}</h3>
                  <p className="text-slate-400 mb-6 text-sm">{['Starter', 'Growth', 'Enterprise'][idx]} Package</p>
                  <div className="text-4xl font-bold text-cyan-400 mb-6">₹{(5000 + idx * 2500).toLocaleString()}</div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-white text-sm">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      {5 + idx * 5} Screens
                    </li>
                    <li className="flex items-center gap-2 text-white text-sm">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      {10 + idx * 5}K impressions/day
                    </li>
                    <li className="flex items-center gap-2 text-white text-sm">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      {1 + idx} Campaign(s)
                    </li>
                    <li className="flex items-center gap-2 text-white text-sm">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      {idx === 2 && '24/7 '}Support
                    </li>
                  </ul>
                  <Button
                    className={`w-full ${
                      idx === 1
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white'
                        : 'border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10'
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-cyan-500 to-blue-600">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Reach Trivandrum?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Connect with 50,000+ daily viewers across our premium DOOH network
              </p>
              <Button
                size="lg"
                className="bg-white text-cyan-600 hover:bg-slate-100 text-lg px-8 py-6 rounded-xl font-bold"
                onClick={() => navigate('/')}
              >
                Start Your Campaign
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
