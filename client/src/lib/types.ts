export interface FieldConfig {
  value: string
  rules: ValidationRule[]
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'matchField'
  message: string
  minLength?: number
  fieldName?: string
}

export interface User {
  id: number
  full_name: string
  email_address: string
  phone_number: string
  is_admin: boolean
}

export interface Auction {
  id: number
  car_brand: string
  year: number
  type: string
  opening_price: number
  price_increment: number
  expiry_date: Date
  status?: string
  user_id: number
  created_at: Date
  updated_at: Date
}

export interface LoginRequest {
  emailAddress: string
  password: string
}

export interface LoginResponse {
  message: string
}

export interface RegisterRequest {
  fullName: string,
  emailAddress: string,
  password: string,
  phoneNumber: string
}

export interface GetUserAuthStatusResponse {
  isLoggedIn: boolean
  user: User
}
