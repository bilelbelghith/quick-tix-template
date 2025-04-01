
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth callback error:', error);
        toast({
          title: 'Authentication Error',
          description: error.message || 'There was a problem with the authentication process',
          variant: 'destructive',
        });
        setMessage('Authentication failed. Redirecting...');
        setTimeout(() => navigate('/auth', { replace: true }), 2000);
        return;
      }

      // Handle successful auth
      toast({
        title: 'Authentication Successful',
        description: 'You have been successfully authenticated.',
      });
      setMessage('Authentication successful! Redirecting...');
      setTimeout(() => navigate('/dashboard', { replace: true }), 1000);
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Almost there!</h2>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export default AuthCallback;
