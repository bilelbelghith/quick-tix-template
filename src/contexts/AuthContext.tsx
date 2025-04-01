
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { AuthSession, getSession } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  session: AuthSession | null;
  user: {
    id: string;
    email?: string;
    fullName?: string;
  } | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  checkSession: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const user = session ? {
    id: session.user.id,
    email: session.user.email,
    fullName: session.user.user_metadata?.full_name,
  } : null;

  const checkSession = async () => {
    try {
      setIsLoading(true);
      const session = await getSession();
      setSession(session);
    } catch (error) {
      console.error('Error checking session:', error);
      toast({
        title: 'Authentication Error',
        description: 'There was a problem with your authentication. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session as AuthSession);
        setIsLoading(false);

        // Handle specific auth events
        if (event === 'SIGNED_IN') {
          toast({
            title: 'Welcome back!',
            description: 'You have successfully signed in.',
          });
          navigate('/dashboard');
        }

        if (event === 'SIGNED_OUT') {
          toast({
            title: 'Signed out',
            description: 'You have been signed out successfully.',
          });
          navigate('/');
        }

        if (event === 'PASSWORD_RECOVERY') {
          navigate('/auth/reset-password');
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
