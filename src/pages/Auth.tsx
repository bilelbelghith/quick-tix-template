import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { signIn, signUp, resetPassword } from '@/lib/auth';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthFormMode, AuthError } from '@/types/auth';
import Navbar from '@/components/Navbar';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const getInitialMode = (): AuthFormMode => {
    const path = location.pathname;
    if (path === '/auth/signup') return 'signup';
    if (path === '/auth/reset-password') return 'reset';
    return 'login';
  };

  const [mode, setMode] = useState<AuthFormMode>(getInitialMode());
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleModeChange = (newMode: AuthFormMode) => {
    setError(null);
    setMode(newMode);
    
    let path = '/auth';
    if (newMode === 'signup') path = '/auth/signup';
    if (newMode === 'reset') path = '/auth/reset-password';
    navigate(path, { replace: true });
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (mode === 'login' || mode === 'signin') {
        await signIn(data.email, data.password);
      } else if (mode === 'signup') {
        await signUp(data.email, data.password, data.fullName);
        toast({
          title: 'Account created!',
          description: 'Please check your email to verify your account.',
        });
        setMode('login');
      } else if (mode === 'reset') {
        await resetPassword(data.email);
        toast({
          title: 'Password reset email sent',
          description: 'Check your email for instructions to reset your password.',
        });
        setMode('login');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError({
        message: err.message || 'An error occurred during authentication',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card p-8 rounded-lg shadow-md border">
            <AuthForm
              mode={mode}
              onSubmit={handleSubmit}
              error={error}
              isLoading={isLoading}
              onModeChange={handleModeChange}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
