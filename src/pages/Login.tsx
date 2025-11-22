import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Check, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function Login() {
  const navigate = useNavigate();
  const { sendOTP, verifyOTP, signInWithEmail, signUpWithEmail } = useAuth();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      toast.error('Please enter your phone number');
      return;
    }

    // Add country code if not present
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

    setLoading(true);
    try {
      await sendOTP(formattedPhone);
      setStep('otp');
      toast.success('OTP sent! For demo, use any 6-digit code to login.');
    } catch (error: any) {
      console.error('Send OTP error:', error);
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }

    setLoading(true);
    try {
      await verifyOTP(otp);
      toast.success('Signed in successfully');
      navigate('/profile');
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      if (authMode === 'signin') {
        await signInWithEmail(email, password);
        toast.success('Signed in successfully');
        navigate('/profile');
      } else {
        if (!name) {
          toast.error('Please enter your name');
          setLoading(false);
          return;
        }
        await signUpWithEmail(email, password, name);
        toast.success('Account created successfully');
        navigate('/profile');
      }
    } catch (error: any) {
      console.error('Email auth error:', error);
      toast.error(authMode === 'signin' ? 'Invalid email or password' : 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 lg:pb-8 flex items-center">
      <div id="recaptcha-container"></div>
      
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-center text-2xl">Welcome to Trivandrum One</CardTitle>
            <CardDescription className="text-center">
              Sign in or create an account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <div className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <Button
                      variant={authMode === 'signin' ? 'default' : 'outline'}
                      onClick={() => setAuthMode('signin')}
                      className="flex-1"
                    >
                      Sign In
                    </Button>
                    <Button
                      variant={authMode === 'signup' ? 'default' : 'outline'}
                      onClick={() => setAuthMode('signup')}
                      className="flex-1"
                    >
                      Sign Up
                    </Button>
                  </div>

                  {authMode === 'signup' && (
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleEmailAuth()}
                      className="mt-2"
                    />
                  </div>

                  <Button
                    onClick={handleEmailAuth}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? 'Processing...' : authMode === 'signin' ? 'Sign In' : 'Sign Up'}
                  </Button>

                  {authMode === 'signin' && (
                    <p className="text-xs text-center text-muted-foreground">
                      Test account: joshveltomy@gmail.com / password@123
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="phone">
                {step === 'phone' ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex gap-2 mt-2">
                        <span className="inline-flex items-center px-3 rounded-md border border-input bg-muted text-sm">
                          +91
                        </span>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="9876543210"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendOTP()}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleSendOTP}
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? 'Sending...' : 'Send OTP'}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By continuing, you agree to receive SMS notifications
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleVerifyOTP()}
                        className="text-center text-2xl tracking-widest mt-2"
                        maxLength={6}
                      />
                    </div>

                    <Button
                      onClick={handleVerifyOTP}
                      disabled={loading}
                      className="w-full"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      {loading ? 'Verifying...' : 'Verify & Sign In'}
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        setStep('phone');
                        setOtp('');
                      }}
                      className="w-full"
                    >
                      Change Phone Number
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Didn't receive the code?{' '}
                      <button
                        onClick={handleSendOTP}
                        className="text-primary hover:underline"
                        disabled={loading}
                      >
                        Resend OTP
                      </button>
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
