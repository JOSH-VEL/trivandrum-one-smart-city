import { useState } from 'react';
import { User, MapPin, Phone, LogOut, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function Profile() {
  const { user, signOut, updateUser } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [preferredArea, setPreferredArea] = useState(user?.preferredArea || '');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen pt-20 pb-24 lg:pb-8">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto text-center p-8">
            <User className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              Sign in to view and manage your profile
            </p>
            <Button onClick={() => navigate('/login')}>Sign In</Button>
          </Card>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUser({ name, preferredArea });
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast.success('Signed out successfully');
  };

  return (
    <div className="min-h-screen pt-20 pb-24 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Header */}
          <Card className="mb-6 gradient-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-white text-3xl font-bold">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{user.name || 'User'}</h2>
                  <p className="text-muted-foreground">{user.phone}</p>
                  {user.role === 'admin' && (
                    <div className="flex items-center gap-2 mt-2">
                      <Shield className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-accent">Administrator</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coins Display */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Total Coins</p>
                <p className="text-5xl font-bold text-gradient">{user.totalCoins}</p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Info */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Personal Information</CardTitle>
                {!editing && (
                  <Button variant="outline" onClick={() => setEditing(true)}>
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  {editing ? (
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  ) : (
                    <p className="mt-2 text-sm">{user.name || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <p className="mt-2 text-sm text-muted-foreground">{user.phone}</p>
                </div>

                <div>
                  <Label htmlFor="preferredArea">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Preferred Area
                    </span>
                  </Label>
                  {editing ? (
                    <Input
                      id="preferredArea"
                      value={preferredArea}
                      onChange={(e) => setPreferredArea(e.target.value)}
                      placeholder="e.g., Kazhakkoottam"
                    />
                  ) : (
                    <p className="mt-2 text-sm">{user.preferredArea || 'Not set'}</p>
                  )}
                </div>

                {editing && (
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSave} disabled={loading}>
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditing(false);
                        setName(user.name || '');
                        setPreferredArea(user.preferredArea || '');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Admin Panel Access */}
          {user.role === 'admin' && (
            <Card className="mb-6 border-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  Admin Panel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  You have administrator access. Manage campaigns, users, and analytics.
                </p>
                <Button onClick={() => navigate('/admin')}>
                  Open Admin Dashboard
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Sign Out */}
          <Button
            variant="destructive"
            onClick={handleSignOut}
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
