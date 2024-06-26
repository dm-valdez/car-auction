export interface User {
  id: number;
  full_name: string;
  email_address: string;
  phone_number: string;
  password_hash: string;
  is_admin: boolean;
}

export interface Auction {
  id: number;
  car_brand: string;
  year: number;
  type: string;
  opening_price: number;
  price_increment: number;
  expiry_date: Date;
  status?: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface NewBidRequest {
  user_id: number;
  auction_id: number;
  amount: number;
}

export interface RegisterRequest {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  confirmPassword?: string;
  isAdmin?: boolean;
}
