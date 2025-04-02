
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

// Add the missing AuthFormMode and AuthError types 
export type AuthFormMode = 'signin' | 'signup' | 'reset';

export interface AuthError {
  message: string;
  code?: string;
  statusCode?: number;
}
