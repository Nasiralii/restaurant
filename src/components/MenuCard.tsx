import Image from "next/image";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import type { MenuItem } from "@/lib/menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { formatPrice } from "@/lib/saudi-utils";

export function MenuCard({ item }: { item: MenuItem }) {
  const { t } = useLanguage();
  const { items, addItem, updateQuantity, removeItem, openCart } = useCart();
  const { showToast } = useToast();

  const getItemTranslation = (field: "name" | "description") => {
    if (!item.key) return item[field];
    const translation = t(`items.${item.key}.${field}`);
    if (translation === `items.${item.key}.${field}`) return item[field];
    return translation;
  };

  // Find if item is already in cart
  const cartItem = items.find(cartItem => cartItem.item.key === item.key);
  const quantityInCart = cartItem?.quantity || 0;

  const handleOrderClick = () => {
    if (quantityInCart > 0) {
      openCart();
    } else {
      addItem(item, 1, true); // Add item and open cart
    }
  };

  const handleAddToCart = () => {
    // Only add item to cart, don't open sidebar
    if (quantityInCart > 0) {
      updateQuantity(item.key, quantityInCart + 1);
      // Show toast for additional item
      showToast(`${getItemTranslation("name")} added to cart!`);
    } else {
      addItem(item, 1, false); // Add item without opening cart
      // Show toast for first item
      showToast(`${getItemTranslation("name")} added to cart!`);
    }
  };

  return (
    <article
      className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-card)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lift), 0 0 0 1px rgba(232,135,10,0.12)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="relative h-56 w-full">
          <Image
            src={item?.imageSrc || "/placeholder.png"}
            alt={(getItemTranslation("name") || "Product") + " image"}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 ease-out group-hover:scale-105"
            priority={false}
          />
          {/* Warm amber overlay on hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: "linear-gradient(to top, rgba(107,62,26,0.30) 0%, transparent 55%)",
            }}
          />
          {/* Price badge on top-right of image */}
          <div
            className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-bold"
            style={{
              background: "rgba(253,248,241,0.94)",
              border: "1px solid var(--border-accent)",
              color: "var(--amber-600)",
              backdropFilter: "blur(6px)",
            }}
          >
            {formatPrice(item?.priceSar || 0)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3
          className="text-base font-semibold truncate"
          style={{ color: "var(--text-primary)" }}
        >
          {getItemTranslation("name") || "منتج"}
        </h3>
        <p
          className="mt-1 text-sm leading-6 flex-1"
          style={{ color: "var(--text-muted)" }}
        >
          {getItemTranslation("description") || ""}
        </p>

        {/* Order buttons */}
        <div className="mt-3">
          {quantityInCart > 0 ? (
            // Original buttons when item is in cart
            <div className="flex gap-2">
              {/* Original Add to Cart Button - no changes */}
              <button
                onClick={handleAddToCart}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ease-out cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, var(--amber-400), var(--amber-500))",
                  color: "var(--text-inverse)",
                  boxShadow: "0 3px 12px rgba(232,135,10,0.30)",
                }}
                aria-label={`Add ${getItemTranslation("name")} to cart`}
              >
                <ShoppingBag className="h-4 w-4" />
                {t('cart.addToCart')}
              </button>
              
              {/* Original Order Now Button */}
              <button
                onClick={handleOrderClick}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ease-out text-white cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  boxShadow: "0 3px 12px rgba(16,185,129,0.30)",
                }}
                aria-label={`Order ${getItemTranslation("name")}`}
              >
                {t("nav.order")}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            // Original Add to Cart and Order Now buttons in a row
            <div className="flex gap-2">
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ease-out cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, var(--amber-400), var(--amber-500))",
                  color: "var(--text-inverse)",
                  boxShadow: "0 3px 12px rgba(232,135,10,0.30)",
                }}
                aria-label={`Add ${getItemTranslation("name")} to cart`}
              >
                <ShoppingBag className="h-4 w-4" />
                {t('cart.addToCart')}
              </button>
              
              {/* Order Now Button */}
              <button
                onClick={handleOrderClick}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ease-out text-white cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  boxShadow: "0 3px 12px rgba(16,185,129,0.30)",
                }}
                aria-label={`Order ${getItemTranslation("name")}`}
              >
                {t("nav.order")}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}