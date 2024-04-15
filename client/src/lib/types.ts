export interface FieldConfig {
  value: string
  rules: ValidationRule[]
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'matchField' | 'numeric' | 'date'
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

export interface Bid {
  id: number
  amount: number
  auction_id: string
  user_id: number
  created_at: Date
  updated_at: Date
}

export interface LoginRequest {
  emailAddress: string
  password: string
}

export interface NewAuctionRequest {
  carBrand: string
  type: string
  year: string
  openingPrice: string
  priceIncrement: string
  expirationDate: string
  userId?: number
  status?: string
}

export interface NewBidRequest {
  user_id: number
  auction_id: number
  amount: number
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
