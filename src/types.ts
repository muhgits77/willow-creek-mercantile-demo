/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'decor' | 'gifts' | 'seasonal' | 'accessories' | 'kitchen';
  image: string;
  rating: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  dimensions?: string;
  origin?: string; // e.g., "Handcrafted in Kentucky", "Local Artisan"
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  date: string;
}

export interface Category {
  id: 'decor' | 'gifts' | 'seasonal' | 'accessories' | 'kitchen';
  name: string;
  description: string;
  image: string;
}
