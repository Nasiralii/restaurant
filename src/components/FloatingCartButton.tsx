"use client";

import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice } from '@/lib/saudi-utils';

export function FloatingCartButton() {
  const { toggleCart, getTotalItems, getTotal } = useCart();
  const { t, isRTL } = useLanguage();
  
  const totalItems = getTotalItems();
  const total = getTotal();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={toggleCart}
      className={`fixed bottom-6 ${isRTL ? 'right-6' : 'left-6'} bg-emerald-600 text-white rounded-full p-4 shadow-lg hover:bg-emerald-700 transition-all duration-300 hover:scale-105 z-40 group`}
      aria-label={t('cart.shoppingCart')}
    >
      <div className="relative">
        <ShoppingBag className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
            {totalItems}
          </span>
        )}
      </div>
      
      {/* Tooltip */}
      <div className={`absolute bottom-full ${isRTL ? 'left-0' : 'right-0'} mb-2 bg-gray-900 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
        {totalItems} {t('cart.items')} • {formatPrice(total)}
      </div>
    </button>
  );
}
