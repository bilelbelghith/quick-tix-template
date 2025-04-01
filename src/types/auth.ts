
export type AuthFormMode = 'login' | 'signup' | 'reset' | 'newPassword';

export interface AuthFormState {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
}

export interface AuthError {
  message: string;
  field?: keyof AuthFormState;
}
