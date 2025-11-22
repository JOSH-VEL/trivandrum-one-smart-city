import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ExploreNew } from './pages/ExploreNew';
import { Screens } from './pages/Screens';
import { SmartGuide } from './pages/SmartGuide';
import { DOOHAdvertising } from './pages/DOOHAdvertising';
import { NetworkAdvertisers } from './pages/NetworkAdvertisers';
import { Transport } from './pages/TransportEnhanced';
import { RewardsEnhanced as Rewards } from './pages/RewardsEnhanced';
import { ProfileNew } from './pages/ProfileNew';
import { Login } from './pages/Login';
import { CampaignReward } from './pages/CampaignReward';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { isDatabaseEmpty, seedDatabase } from './lib/seedData';

const queryClient = new QueryClient();

function App() {
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    // Auto-seed database if empty
    const initDatabase = async () => {
      try {
        const empty = await isDatabaseEmpty();
        if (empty) {
          setSeeding(true);
          console.log('🌱 Database is empty, seeding with dummy data...');
          await seedDatabase();
          console.log('✅ Database seeded successfully');
          setSeeding(false);
        }
      } catch (error) {
        console.error('❌ Error initializing database:', error);
        setSeeding(false);
      }
    };

    initDatabase();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <AuthProvider>
              <div className="min-h-screen bg-background">
                <Navbar />
                {seeding && (
                  <div className="fixed inset-0 bg-navy/90 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-white text-lg font-semibold">Setting up your experience...</p>
                      <p className="text-slate-400 text-sm mt-2">Loading places and offers</p>
                    </div>
                  </div>
                )}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/explore" element={<ExploreNew />} />
                  <Route path="/screens" element={<Screens />} />
                  <Route path="/smart-guide" element={<SmartGuide />} />
                  <Route path="/dooh" element={<DOOHAdvertising />} />
                  <Route path="/network-advertisers" element={<NetworkAdvertisers />} />
                  <Route path="/transport" element={<Transport />} />
                  <Route path="/rewards" element={<Rewards />} />
                  <Route path="/profile" element={<ProfileNew />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/ad/:campaignId" element={<CampaignReward />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
                <Toaster position="top-center" />
              </div>
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

