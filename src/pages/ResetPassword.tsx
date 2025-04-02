
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { updatePassword } from '@/lib/auth';
import AuthForm from '@/components/auth/AuthForm';
import { AuthError, AuthFormMode } from '@/types/auth';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidResetLink, setIsValidResetLink] = useState(false);

  useEffect(() => {
    const checkResetSession = async () => {
      // Check if we're in a password reset flow
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        toast({
          title: 'Invalid or expired link',
          description: 'Please request a new password reset link.',
          variant: 'destructive',
        });
        navigate('/auth', { replace: true });
        return;
      }

      setIsValidResetLink(true);
    };

    checkResetSession();
  }, [navigate, toast]);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await updatePassword(data.password);
      toast({
        title: 'Password updated!',
        description: 'Your password has been successfully changed.',
      });
      navigate('/auth', { replace: true });
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError({
        message: err.message || 'An error occurred while resetting your password',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidResetLink) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">Verifying your reset link...</div>
        </div>
      </div>
    );
  }

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
              mode="newPassword"
              onSubmit={handleSubmit}
              error={error}
              isLoading={isLoading}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
