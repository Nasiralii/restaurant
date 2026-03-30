"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, MapPin, Phone, Truck, AlertCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatPrice, validateSaudiPhone } from '@/lib/saudi-utils';
import type { MenuItem } from '@/lib/menu';

export function OrderSidebar() {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    addItem, 
    getSubtotal, 
    getVAT, 
    getTotal,
    clearCart 
  } = useCart();
  
  const { t, isRTL } = useLanguage();
  const [showCheckout, setShowCheckout] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (showCheckout) {
    return <CheckoutModal onClose={() => setShowCheckout(false)} />;
  }

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-white/30 backdrop-blur-md z-40 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Order Sidebar */}
      <div className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isCartOpen ? 'translate-x-0' : isRTL ? '-translate-x-full' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">{t('cart.shoppingCart')}</h2>
              {totalItems > 0 && (
                <span className="bg-amber-500 text-white text-xs rounded-full px-2 py-1 font-bold">
                  {totalItems}
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('cart.cartEmpty')}</h3>
                <p className="text-gray-500 mb-6">{t('cart.cartEmptyMessage')}</p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  {t('cart.browseMenu')}
                </button>
              </div>
            ) : (
              <>
                {/* Order Items */}
                <div className="p-4 space-y-4">
                  {items.map((cartItem) => (
                    <div key={cartItem.item.key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      {/* Item Thumbnail */}
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                        {cartItem.item.imageSrc ? (
                          <Image
                            src={cartItem.item.imageSrc}
                            alt={cartItem.item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-300">
                            <ShoppingBag className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{cartItem.item.name}</h4>
                        <p className="text-sm text-gray-500">{formatPrice(cartItem.item.priceSar)}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(cartItem.item.key, cartItem.quantity - 1)}
                            className="w-8 h-8 rounded-full border-2 border-amber-500 text-amber-600 hover:bg-amber-50 transition-colors flex items-center justify-center"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-semibold text-amber-600 min-w-8 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartItem.item.key, cartItem.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors flex items-center justify-center"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(cartItem.item.key)}
                            className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Item Subtotal */}
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(cartItem.item.priceSar * cartItem.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Order Summary (Sticky Bottom) */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 bg-white p-4 space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <span className="font-medium">{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.vat')} (15%)</span>
                  <span className="font-medium">{formatPrice(getVAT())}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>{t('cart.total')}</span>
                  <span className="text-emerald-600">{formatPrice(getTotal())}</span>
                </div>
              </div>
              
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  {t('cart.checkout')}
                </button>
                <button
                  onClick={closeCart}
                  className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('cart.continueBrowsing')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Checkout Modal Component
function CheckoutModal({ onClose }: { onClose: () => void }) {
  const { items, getSubtotal, getVAT, getTotal, clearCart } = useCart();
  const { t } = useLanguage();
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    orderType: 'delivery' as 'delivery' | 'pickup',
    address: '',
    paymentMethod: 'cash' as 'cash' | 'card',
    specialInstructions: ''
  });

  const validatePhone = (phone: string) => {
    if (!phone) {
      setPhoneError(t('validation.phoneRequired'));
      return false;
    }
    if (!validateSaudiPhone(phone)) {
      setPhoneError(t('validation.invalidSaudiPhone'));
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    setFormData({ ...formData, phone });
    if (phoneError) validatePhone(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone
    if (!validatePhone(formData.phone)) {
      return;
    }
    
    // Generate random order number
    const orderNum = Math.floor(Math.random() * 9000) + 1000;
    setOrderNumber(`#${orderNum}`);
    setShowConfirmation(true);
  };

  const handleConfirmOrder = () => {
    clearCart();
    onClose();
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-emerald-600 text-2xl">✓</div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('orderConfirmation.title')}</h2>
            <p className="text-gray-600 mb-4">{t('orderConfirmation.orderNumber')}: <span className="font-semibold">{orderNumber}</span></p>
            <p className="text-gray-600 mb-6">{t('orderConfirmation.estimatedDeliveryTime')}: {t('orderConfirmation.deliveryTime')}</p>
            
            <div className="space-y-3">
              <button className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                {t('orderConfirmation.trackOrder')}
              </button>
              <button
                onClick={handleConfirmOrder}
                className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                {t('orderConfirmation.backToMenu')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-white/30 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Checkout Modal */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{t('checkout.title')}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">{t('checkout.orderSummary')}</h3>
            <div className="space-y-2 text-sm">
              {items.map((cartItem) => (
                <div key={cartItem.item.key} className="flex justify-between">
                  <span className="text-gray-600">{cartItem.quantity} × {cartItem.item.name}</span>
                  <span className="font-medium">
                    {formatPrice(cartItem.item.priceSar * cartItem.quantity)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.vat')} (15%)</span>
                  <span>{formatPrice(getVAT())}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>{t('cart.total')}</span>
                  <span className="text-emerald-600">{formatPrice(getTotal())}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('checkout.customerName')}
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder={t('checkout.namePlaceholder')}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('checkout.phone')}
              </label>
              <div className="relative">
                <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onBlur={() => validatePhone(formData.phone)}
                  className={`w-full pr-10 pl-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    phoneError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t('checkout.phonePlaceholder')}
                />
                {phoneError && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {phoneError}
                  </div>
                )}
              </div>
            </div>

            {/* Order Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('checkout.orderType')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, orderType: 'delivery' })}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.orderType === 'delivery'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Truck className="h-4 w-4 mx-auto mb-1" />
                  <span className="text-sm">{t('checkout.delivery')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, orderType: 'pickup' })}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.orderType === 'pickup'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <MapPin className="h-4 w-4 mx-auto mb-1" />
                  <span className="text-sm">{t('checkout.pickup')}</span>
                </button>
              </div>
            </div>

            {/* Delivery Address */}
            {formData.orderType === 'delivery' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('checkout.deliveryAddress')}
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={2}
                  placeholder={t('checkout.addressPlaceholder')}
                />
              </div>
            )}

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('checkout.paymentMethod')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.paymentMethod === 'cash'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm">{t('checkout.cashOnDelivery')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.paymentMethod === 'card'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm">{t('checkout.creditCard')}</span>
                </button>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('checkout.specialInstructions')}
              </label>
              <textarea
                value={formData.specialInstructions}
                onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                rows={2}
                placeholder={t('checkout.specialInstructionsPlaceholder')}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              {t('checkout.confirmOrder')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
