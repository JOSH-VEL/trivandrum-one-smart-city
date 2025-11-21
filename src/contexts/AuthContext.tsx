/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { blink } from '../lib/firebase';

interface User {
  id: string;
  email?: string;
  phone?: string;
  displayName?: string;
  name?: string;
  totalCoins?: number;
  dailyCoins?: number;
  role?: string;
  createdAt?: string;
  preferredArea?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  sendOTP: (phoneNumber: string) => Promise<void>;
  verifyOTP: (code: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingPhone, setPendingPhone] = useState<string>('');

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged(async (state) => {
      if (state.user) {
        // Fetch full user data from database
        try {
          const userRecord = await blink.db.users.list({
            where: { id: state.user.id },
            limit: 1
          });
          
          if (userRecord && userRecord.length > 0) {
            setUser(userRecord[0] as User);
          } else {
            // Create new user record
            const newUser = {
              id: state.user.id,
              email: state.user.email || '',
              phone: state.user.metadata?.phone || '',
              name: state.user.displayName || '',
              totalCoins: 0,
              dailyCoins: 0,
              role: 'user',
              createdAt: new Date().toISOString()
            };
            await blink.db.users.create(newUser);
            setUser(newUser);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(state.user as User);
        }
      } else {
        setUser(null);
      }
      setLoading(state.isLoading);
    });

    return unsubscribe;
  }, []);

  const sendOTP = async (phoneNumber: string) => {
    setPendingPhone(phoneNumber);
    // Using magic link for simplicity - in production use proper OTP service
    await blink.auth.sendMagicLink(`${phoneNumber}@trivandrum.one`);
  };

  const verifyOTP = async (code: string) => {
    if (pendingPhone) {
      try {
        // Try to sign in
        await blink.auth.signInWithEmail(`${pendingPhone}@trivandrum.one`, code);
      } catch {
        // If doesn't exist, create new account
        await blink.auth.signUp({
          email: `${pendingPhone}@trivandrum.one`,
          password: code,
          metadata: { phone: pendingPhone }
        });
      }
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    await blink.auth.signInWithEmail(email, password);
  };

  const signUpWithEmail = async (email: string, password: string, name?: string) => {
    await blink.auth.signUp({
      email,
      password,
      displayName: name,
      metadata: { signupMethod: 'email' }
    });
  };

  const signOut = async () => {
    await blink.auth.logout();
    setUser(null);
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) return;
    
    await blink.db.users.update(user.id, data);
    setUser({ ...user, ...data });
  };

  const value = {
    user,
    loading,
    sendOTP,
    verifyOTP,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
