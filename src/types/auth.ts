
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
