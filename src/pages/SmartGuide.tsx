import { Brain, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export function SmartGuide() {
  return (
    <div className="min-h-screen bg-dark-navy pt-32 pb-20 px-4">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Coming Soon
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Smart AI City Guide
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Explore Trivandrum with real-time AI navigation, personalised suggestions and smart city insights. 
                Our intelligent guide will help you discover hidden gems, optimal routes, and the best experiences tailored just for you.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">AI-Powered Navigation</h3>
                    <p className="text-slate-400">Real-time route optimization and smart recommendations based on your preferences</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Personalized Insights</h3>
                    <p className="text-slate-400">Discover experiences tailored to your interests and local recommendations</p>
                  </div>
                </div>
              </div>

              <div className="inline-block">
                <div className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 font-semibold text-sm animate-pulse">
                  🚀 Launching Q1 2025
                </div>
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="relative h-96 lg:h-full min-h-[400px]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-white font-bold text-xl mb-2">Smart Guide</p>
                  <p className="text-slate-400 text-sm">Intelligent Navigation & Insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Preview Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What's Coming</h2>
            <p className="text-slate-400 text-lg">Get ready for an enhanced Trivandrum experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="adonmo-card group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">AI Navigation</h3>
                <p className="text-slate-400">
                  Smart routing that learns your preferences and adapts in real-time
                </p>
              </CardContent>
            </Card>

            <Card className="adonmo-card group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Local Insights</h3>
                <p className="text-slate-400">
                  Discover hidden gems and trending places in your neighborhood
                </p>
              </CardContent>
            </Card>

            <Card className="adonmo-card group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Smart City Integration</h3>
                <p className="text-slate-400">
                  Seamless integration with all Trivandrum One services
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-cyan-500 to-blue-600">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Be the First to Know
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Subscribe to get early access to the Smart Guide when it launches
              </p>
              <button className="bg-white text-cyan-600 hover:bg-slate-100 font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                Get Early Access
              </button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

