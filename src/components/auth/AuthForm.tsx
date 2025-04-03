
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AuthFormMode, AuthError } from '@/types/auth';

// Define schema based on form type
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
  fullName: z.string().min(2, { message: 'Please enter your name' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const resetSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

const newPasswordSchema = z.object({
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type ResetFormValues = z.infer<typeof resetSchema>;
type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;

interface AuthFormProps {
  mode: AuthFormMode;
  onSubmit: (values: any) => void;
  error: AuthError | null;
  isLoading: boolean;
  onModeChange?: (mode: AuthFormMode) => void;
}

export function AuthForm({ mode, onSubmit, error, isLoading, onModeChange }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  // Select the appropriate schema based on form type
  const getFormSchema = () => {
    switch (mode) {
      case 'login':
      case 'signin':
        return loginSchema;
      case 'signup':
        return signupSchema;
      case 'reset':
        return resetSchema;
      case 'newPassword':
        return newPasswordSchema;
      default:
        return loginSchema;
    }
  };

  // Define form
  const form = useForm({
    resolver: zodResolver(getFormSchema()),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
    },
    mode: 'onSubmit',
  });

  const handleModeClick = (newMode: AuthFormMode) => {
    if (onModeChange) {
      form.reset();
      onModeChange(newMode);
    }
  };

  const handleSubmitForm = (values: any) => {
    onSubmit(values);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">
          {mode === 'login' || mode === 'signin' ? 'Welcome back!' : 
           mode === 'signup' ? 'Create your account' :
           mode === 'reset' ? 'Reset your password' :
           'Set a new password'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {mode === 'login' || mode === 'signin' ? 'Enter your credentials to access your account' : 
           mode === 'signup' ? 'Fill out the form to get started' :
           mode === 'reset' ? 'Enter your email to receive a reset link' :
           'Enter your new password below'}
        </p>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md mb-6">
          {error.message}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-4">
          {(mode === 'signup') && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="John Doe"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(mode !== 'newPassword') && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(mode !== 'reset') && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(mode === 'signup' || mode === 'newPassword') && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(mode === 'login' || mode === 'signin') && onModeChange && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => handleModeClick('reset')}
                className="text-sm hover:underline text-primary"
              >
                Forgot password?
              </button>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                {mode === 'login' || mode === 'signin' ? 'Logging in...' : 
                 mode === 'signup' ? 'Creating account...' :
                 mode === 'reset' ? 'Sending reset link...' :
                 'Updating password...'}
              </div>
            ) : (
              mode === 'login' || mode === 'signin' ? 'Login' : 
              mode === 'signup' ? 'Create Account' :
              mode === 'reset' ? 'Send Reset Link' :
              'Update Password'
            )}
          </Button>
        </form>
      </Form>

      {onModeChange && (
        <div className="text-center mt-6">
          {(mode === 'login' || mode === 'signin') ? (
            <p className="text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => handleModeClick('signup')}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          ) : mode === 'signup' ? (
            <p className="text-sm">
              Already have an account?{' '}
              <button
                onClick={() => handleModeClick('login')}
                className="text-primary hover:underline font-medium"
              >
                Log in
              </button>
            </p>
          ) : mode === 'reset' && (
            <p className="text-sm">
              Remember your password?{' '}
              <button
                onClick={() => handleModeClick('login')}
                className="text-primary hover:underline font-medium"
              >
                Back to login
              </button>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
