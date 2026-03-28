import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { MenuItem } from "@/lib/menu";
import { useLanguage } from "@/contexts/LanguageContext";

export function MenuCard({ item }: { item: MenuItem }) {
  const { t } = useLanguage();

  const getItemTranslation = (field: "name" | "description") => {
    if (!item.key) return item[field];
    const translation = t(`items.${item.key}.${field}`);
    if (translation === `items.${item.key}.${field}`) return item[field];
    return translation;
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
        <div className="relative h-44 w-full">
          <Image
            src={item.imageSrc}
            alt={getItemTranslation("name") + " image"}
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
            {item.priceSar} SAR
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3
          className="text-base font-semibold truncate"
          style={{ color: "var(--text-primary)" }}
        >
          {getItemTranslation("name")}
        </h3>
        <p
          className="mt-1 text-sm leading-6 flex-1"
          style={{ color: "var(--text-muted)" }}
        >
          {getItemTranslation("description")}
        </p>

        {/* Order button — slides up on hover */}
        <div className="mt-3 overflow-hidden">
          <a
            href="#order"
            className="inline-flex translate-y-2 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold opacity-0 transition duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
            style={{
              background: "linear-gradient(135deg, var(--amber-400), var(--amber-500))",
              color: "var(--text-inverse)",
              boxShadow: "0 3px 12px rgba(232,135,10,0.30)",
            }}
            aria-label={`Order ${getItemTranslation("name")}`}
          >
            {t("nav.order")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}