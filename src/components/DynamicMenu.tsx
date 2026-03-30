"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MenuCard } from "@/components/MenuCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/contexts/ToastContext";
import { Coffee, CupSoda, Dessert } from "lucide-react";

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
}

// Map database categories to UI categories
const categoryMapping: Record<string, { id: string; icon: React.ReactNode }> = {
  "قهوة": { id: "coffee", icon: <Coffee className="h-4 w-4" /> },
  "قهوة / Coffee": { id: "coffee", icon: <Coffee className="h-4 w-4" /> },
  "حلويات": { id: "desserts", icon: <Dessert className="h-4 w-4" /> },
  "حلويات / Desserts": { id: "desserts", icon: <Dessert className="h-4 w-4" /> },
  "مشروبات": { id: "drinks", icon: <CupSoda className="h-4 w-4" /> },
  "مشروبات / Drinks": { id: "drinks", icon: <CupSoda className="h-4 w-4" /> },
};

export function DynamicMenu() {
  const { t, isRTL } = useLanguage();
  const { toastMessage, isToastVisible, hideToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_available", true)
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Error fetching products:", error);
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Group products by category (exclude Food categories)
  const groupedProducts = products.reduce((acc, product) => {
    // Skip Food category products
    if (product.category === "Food" || product.category === "Foods" || product.category === "أطعمة" || product.category === "أطعمة / Food") {
      return acc;
    }
    const category = product.category || "أخرى";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">لا توجد منتجات متاحة حالياً</p>
        <p className="text-gray-400 text-sm mt-2">سيتم إضافة المنتجات قريباً</p>
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-14 container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
      {Object.entries(groupedProducts).map(([category, items], idx) => {
        const categoryInfo = categoryMapping[category] || { id: "other", icon: <Coffee className="h-4 w-4" /> };
        
        return (
          <section
            key={category}
            id={categoryInfo.id}
            className="scroll-mt-24"
          >
            {/* Alternating amber-wash background strip */}
            {idx % 2 === 1 && (
              <div
                className="absolute left-0 right-0 h-full -z-10"
                style={{ background: "var(--bg-amber-wash)" }}
              />
            )}

            {/* Section header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-8">
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-2"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-accent)",
                    color: "var(--amber-600)",
                  }}
                >
                  {categoryInfo.icon}
                  {category}
                </div>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {t(`categories.${categoryInfo.id}.subtitle`) || category}
                </p>
              </div>
              <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                {items.length} {isRTL ? "منتج" : "products"}
              </p>
            </div>

            {/* Cards grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <div key={product.id} className="h-full">
                  <MenuCard
                    item={{
                      key: product.id,
                      name: isRTL ? (product.name_ar || "منتج") : (product.name_en || product.name_ar || "Product"),
                      description: isRTL ? (product.description_ar || "") : (product.description_en || product.description_ar || ""),
                      priceSar: product.price ?? 0,
                      imageSrc: product.image_url || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E",
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
