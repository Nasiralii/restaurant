import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    debug: false,
  },
});

// Types for our database tables
export interface Product {
  id: string;
  name_ar: string;
  name_en?: string;
  description_ar: string;
  description_en?: string;
  price: number;
  category: string;
  image_url?: string;
  is_available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: number;
  customer_name: string;
  customer_phone: string;
  order_type: "delivery" | "pickup";
  delivery_address?: string;
  payment_method: string;
  special_instructions?: string;
  subtotal: number;
  vat_amount: number;
  total_amount: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "on_way"
    | "delivered"
    | "cancelled";
  ordered_at: string;
  confirmed_at?: string;
  prepared_at?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name?: string;
  role: "super_admin" | "admin" | "staff";
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}
