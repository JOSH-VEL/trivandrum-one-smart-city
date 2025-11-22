import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, Coins, Phone, Mail, LogOut, Edit2, Save, X, Award, TrendingUp, Calendar, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Profile() {
  const { user, signOut, updateUser } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [preferredArea, setPreferredArea] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || user.displayName || '');
      setPreferredArea(user.preferredArea || '');
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-navy pt-20 pb-24 lg:pb-8">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="max-w-md mx-auto text-center p-8 adonmo-card">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <User className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 text-white">Sign In Required</h2>
              <p className="text-slate-400 mb-6">
                Please sign in to view your profile
              </p>
              <Button onClick={() => navigate('/login')} className="gradient-primary">
                Sign In
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  async function handleUpdate() {
    setLoading(true);
    try {
      await updateUser({
        name,
        preferredArea,
        displayName: name,
      });
      toast.success('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
    setLoading(false);
  }

  async function handleLogout() {
    try {
      await signOut();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout');
    }
  }

  return (
    <div className="min-h-screen bg-navy pt-20 pb-24 lg:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <User className="w-10 h-10 text-cyan-400" />
            My Profile
          </h1>
          <p className="text-slate-400 text-lg">
            Manage your account and view your rewards
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} whileHover={{ scale: 1.02, y: -4 }}>
            <Card className="gradient-primary text-white border-0 shadow-glow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Coins className="w-7 h-7" />
                  </motion.div>
                  <div>
                    <p className="text-sm opacity-90 mb-1">Total Coins</p>
                    <p className="text-4xl font-bold">{user.totalCoins || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} whileHover={{ scale: 1.02, y: -4 }}>
            <Card className="adonmo-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Daily Earned</p>
                    <p className="text-4xl font-bold text-white">{user.dailyCoins || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} whileHover={{ scale: 1.02, y: -4 }}>
            <Card className="adonmo-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Award className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Member Since</p>
                    <p className="text-lg font-bold text-white">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-6 adonmo-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-400" />
                  Account Information
                </CardTitle>
                {!editing && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      onClick={() => setEditing(true)}
                      className="gradient-primary"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-slate-300 mb-2 block">
                    Full Name
                  </Label>
                  {editing ? (
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="glass-premium border-slate-700/50 text-white"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 glass-premium rounded-lg">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="text-white">{name || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-slate-300 mb-2 block">
                    Phone / Email
                  </Label>
                  <div className="flex items-center gap-2 p-3 glass-premium rounded-lg">
                    {user.phone ? <Phone className="w-4 h-4 text-slate-400" /> : <Mail className="w-4 h-4 text-slate-400" />}
                    <span className="text-white">{user.phone || user.email || 'Not provided'}</span>
                    <Badge variant="secondary" className="ml-auto bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      Verified
                    </Badge>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="area" className="text-slate-300 mb-2 block">
                    Preferred Area
                  </Label>
                  {editing ? (
                    <Input
                      id="area"
                      value={preferredArea}
                      onChange={(e) => setPreferredArea(e.target.value)}
                      className="glass-premium border-slate-700/50 text-white"
                      placeholder="e.g., Technopark, Kazhakkoottam, MG Road"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 glass-premium rounded-lg">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-white">{preferredArea || 'Not set'}</span>
                    </div>
                  )}
                </div>
              </div>

              {editing && (
                <motion.div 
                  className="flex gap-3 pt-4 border-t border-slate-700/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button
                      onClick={handleUpdate}
                      disabled={loading}
                      className="w-full gradient-primary"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditing(false);
                        setName(user.name || user.displayName || '');
                        setPreferredArea(user.preferredArea || '');
                      }}
                      className="border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Admin Panel Access */}
        {user.role === 'admin' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="mb-6 adonmo-card border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  Admin Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 mb-4">
                  You have administrator privileges. Access the dashboard to manage campaigns, users, and analytics.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={() => navigate('/admin')} className="gradient-primary">
                    Open Admin Dashboard
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
