export interface FieldConfig {
  value: string
  rules: ValidationRule[]
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength'
  message: string
  minLength?: number
}

export interface LoginRequest {
  emailAddress: string
  password: string
}

export interface LoginResponse {
  message: string
}

export interface GetUserAuthStatusResponse {
  isLoggedIn: boolean
}
