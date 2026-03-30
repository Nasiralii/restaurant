"use client";

import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3 seconds

      return () => clearTimeout(timer);
    } else {
      // Allow exit animation to complete
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 bg-blue-600 text-white rounded-lg shadow-lg border border-blue-700 p-4 min-w-80 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      {/* Success Icon */}
      <div className="shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
        <Check className="h-5 w-5 text-white" />
      </div>

      {/* Message */}
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{message}</p>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="shrink-0 p-1 rounded-lg hover:bg-white/20 transition-colors"
      >
        <X className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}
