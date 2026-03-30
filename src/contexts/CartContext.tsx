"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { MenuItem } from '@/lib/menu';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: MenuItem; quantity?: number; openCart?: boolean } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { key: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_CART_OPEN'; payload: boolean };

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (item: MenuItem, quantity?: number, openCart?: boolean) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  getSubtotal: () => number;
  getVAT: () => number;
  getTotal: () => number;
  getTotalItems: () => number;
  getCartTotal: () => number; // Alias for getTotal
  getCartCount: () => number; // Alias for getTotalItems
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VAT_RATE = 0.15; // 15% VAT for Saudi Arabia

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, quantity = 1, openCart = false } = action.payload;
      const existingItem = state.items.find(cartItem => cartItem.item.key === item.key);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(cartItem =>
            cartItem.item.key === item.key
              ? { ...cartItem, quantity: Math.min(cartItem.quantity + quantity, 99) } // Max 99 items
              : cartItem
          ),
          isCartOpen: openCart
        };
      }
      return {
        ...state,
        items: [...state.items, { item, quantity }],
        isCartOpen: openCart
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(cartItem => cartItem.item.key !== action.payload)
      };
    case 'UPDATE_QUANTITY': {
      const { key, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(cartItem => cartItem.item.key !== key)
        };
      }
      return {
        ...state,
        items: state.items.map(cartItem =>
          cartItem.item.key === key
            ? { ...cartItem, quantity: Math.min(quantity, 99) } // Max 99 items
            : cartItem
        )
      };
    }
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      };
    case 'SET_CART_OPEN':
      return {
        ...state,
        isCartOpen: action.payload
      };
    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  isCartOpen: false
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('restaurant-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'SET_CART_OPEN', payload: false });
        // Restore items
        parsedCart.items?.forEach((cartItem: CartItem) => {
          dispatch({ type: 'ADD_ITEM', payload: { item: cartItem.item, quantity: cartItem.quantity } });
        });
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem('restaurant-cart', JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [state]);

  const addItem = (item: MenuItem, quantity: number = 1, openCart: boolean = false) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity, openCart } });
  };

  const removeItem = (key: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: key });
  };

  const updateQuantity = (key: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { key, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'SET_CART_OPEN', payload: false });
  };

  const openCart = () => {
    dispatch({ type: 'SET_CART_OPEN', payload: true });
  };

  const getSubtotal = () => {
    return state.items.reduce((sum, cartItem) => sum + (cartItem.item.priceSar * cartItem.quantity), 0);
  };

  const getVAT = () => {
    return Math.round(getSubtotal() * VAT_RATE * 100) / 100; // Round to 2 decimal places
  };

  const getTotal = () => {
    return Math.round((getSubtotal() + getVAT()) * 100) / 100; // Round to 2 decimal places
  };

  const getTotalItems = () => {
    return state.items.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
  };

  const value: CartContextType = {
    items: state.items,
    isCartOpen: state.isCartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
    openCart,
    getSubtotal,
    getVAT,
    getTotal,
    getTotalItems,
    getCartTotal: getTotal, // Alias for getTotal
    getCartCount: getTotalItems // Alias for getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
