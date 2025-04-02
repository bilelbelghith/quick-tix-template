
export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
}

export interface AuthResponseData {
  success: boolean;
  message?: string;
  error?: string;
}

// Updated AuthFormMode to include all used modes
export type AuthFormMode = 'login' | 'signin' | 'signup' | 'reset' | 'newPassword';

export interface AuthError {
  message: string;
  code?: string;
  statusCode?: number;
}
