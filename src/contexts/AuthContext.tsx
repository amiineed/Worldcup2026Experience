import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, AuthUser } from '../lib/supabase';
import { toast } from 'sonner';

interface AuthContextType {
  user: AuthUser | null;
  session: any;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const formatUser = (supabaseUser: any): AuthUser => {
    const metadata = supabaseUser.user_metadata || {};
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: metadata.name || metadata.full_name || supabaseUser.email?.split('@')[0],
      avatar_url: metadata.avatar_url || metadata.picture,
      provider: supabaseUser.app_metadata?.provider,
    };
  };

  const refreshUser = async () => {
    try {
      console.log('Refreshing user session...');
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      
      console.log('Current session in refreshUser:', currentSession);
      console.log('Error in refreshUser:', error);
      
      if (error) {
        console.error('Error getting session:', error);
        return;
      }

      if (currentSession?.user) {
        const formattedUser = formatUser(currentSession.user);
        console.log('Formatted user:', formattedUser);
        setUser(formattedUser);
        setSession(currentSession);
      } else {
        // Try to get user directly
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
        console.log('Direct user check:', currentUser);
        console.log('Direct user error:', userError);
        
        if (currentUser) {
          const formattedUser = formatUser(currentUser);
          setUser(formattedUser);
          setSession({ user: currentUser });
        } else {
          setUser(null);
          setSession(null);
        }
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      toast.error('Failed to refresh user session');
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('Google sign in error:', error);
        toast.error('Failed to sign in with Google');
        throw error;
      }
    } catch (error) {
      console.error('Unexpected error during Google sign in:', error);
      toast.error('An unexpected error occurred');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast.error('Failed to sign out');
        throw error;
      }

      setUser(null);
      setSession(null);
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
      toast.error('An unexpected error occurred');
      throw error;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      await refreshUser();
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session?.user) {
            const formattedUser = formatUser(session.user);
            console.log('User signed in:', formattedUser);
            setUser(formattedUser);
            setSession(session);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setUser(null);
          setSession(null);
        } else {
          // Handle other events
          if (session?.user) {
            const formattedUser = formatUser(session.user);
            console.log('Session updated:', formattedUser);
            setUser(formattedUser);
            setSession(session);
          } else {
            setUser(null);
            setSession(null);
          }
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    session,
    loading,
    signInWithGoogle,
    signOut,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
