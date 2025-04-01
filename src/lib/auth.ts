
import { supabase } from './supabase';
import { Session } from '@supabase/supabase-js';

export interface AuthSession {
  user: {
    id: string;
    email?: string;
    user_metadata?: {
      full_name?: string;
    };
  };
  session: {
    expires_at: number;
    token_type: string;
    access_token: string;
  };
}

export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new Error(error.message);
  }
};

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const updatePassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }
};

// Convert Supabase Session to our custom AuthSession type
const mapSessionToAuthSession = (session: Session | null): AuthSession | null => {
  if (!session) return null;
  
  return {
    user: {
      id: session.user.id,
      email: session.user.email,
      user_metadata: session.user.user_metadata as { full_name?: string },
    },
    session: {
      expires_at: session.expires_at,
      token_type: session.token_type,
      access_token: session.access_token,
    },
  };
};

export const getSession = async (): Promise<AuthSession | null> => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return mapSessionToAuthSession(data.session);
};
