"use client";

import { MenuCard } from "@/components/MenuCard";
import { BannerSlider } from "@/components/BannerSlider";
import { TopNav } from "@/components/TopNav";
import { MENU, type MenuCategoryId } from "@/lib/menu";
import { Coffee, CupSoda, Dessert, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function iconForCategory(id: MenuCategoryId) {
  switch (id) {
    case "coffee":   return <Coffee   className="h-4 w-4" />;
    case "desserts": return <Dessert  className="h-4 w-4" />;
    case "drinks":   return <CupSoda  className="h-4 w-4" />;
  }
}

export function PageContent() {
  const { t } = useLanguage();

  return (
    <>
      <div className="sticky top-0 w-full left-0 right-0 z-40">
        <TopNav />
      </div>

      <main className="w-full pb-16 mx-auto">
        <header>
          <BannerSlider />
        </header>

        {/* ── MENU SECTIONS ── */}
        <div className="mt-12 grid gap-14 container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          {MENU.map((category, idx) => (
            <section
              key={category.id}
              id={category.id}
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
                    {iconForCategory(category.id)}
                    {t(`categories.${category.id}.title`)}
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {t(`categories.${category.id}.subtitle`)}
                  </p>
                </div>
                <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  {t("home.updatedToday")}
                </p>
              </div>

              {/* Cards grid */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.items.map((item) => (
                  <div key={`${category.id}-${item.name}`} className="h-full">
                    <MenuCard item={item} />
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div
                className="mt-14 h-px w-full"
                style={{
                  background: "linear-gradient(to right, transparent, var(--border-accent), transparent)",
                }}
              />
            </section>
          ))}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "var(--bg-elevated)",
          borderTop: "1px solid var(--border-medium)",
        }}
      >
        {/* Amber top accent line */}
        <div
          className="h-0.5 w-full"
          style={{
            background: "linear-gradient(to right, var(--amber-300), var(--amber-400), var(--amber-300))",
          }}
        />

        <div className="w-full container mx-auto px-4 py-5 sm:px-6 lg:px-10 xl:px-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, var(--amber-300), var(--amber-400))",
                    color: "var(--text-inverse)",
                    boxShadow: "var(--shadow-amber)",
                  }}
                >
                  B
                </span>
                <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                  {t("home.brand")}
                </p>
              </div>
              <p className="text-sm leading-7" style={{ color: "var(--text-muted)" }}>
                {t("home.tagline")}
              </p>

              {/* Social icons */}
              <div className="mt-5 flex items-center gap-2.5">
                {[
                  {
                    label: "Instagram",
                    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-1.699 4.919-4.919 1.266-.058 1.644-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358.2 6.78 2.618 6.98 6.98 1.281.058 1.689.073 4.948.073 3.259 0 3.668-.014 4.947-.072 4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.2-4.358-.2-6.78-2.618-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                  },
                  {
                    label: "Twitter/X",
                    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                  },
                  {
                    label: "TikTok",
                    path: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-medium)",
                      color: "var(--text-muted)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-strong)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--amber-400)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-muted)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-medium)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-surface)";
                    }}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links + Hours */}
            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                {t("footer.menu")}
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  { href: "#coffee",   label: t("nav.coffee") },
                  { href: "#desserts", label: t("nav.desserts") },
                  { href: "#drinks",   label: t("nav.drinks") },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      style={{ color: "var(--text-muted)" }}
                      className="transition-colors duration-150"
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--amber-500)"}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="text-sm font-semibold mt-6 mb-3" style={{ color: "var(--text-primary)" }}>
                {t("footer.hours")}
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between gap-4" style={{ color: "var(--text-muted)" }}>
                  <span>{t("footer.hoursSatThu")}</span>
                  <span style={{ color: "var(--amber-500)", fontWeight: 600 }}>{t("footer.hoursTime1")}</span>
                </li>
                <li className="flex justify-between gap-4" style={{ color: "var(--text-muted)" }}>
                  <span>{t("footer.hoursFri")}</span>
                  <span style={{ color: "var(--amber-500)", fontWeight: 600 }}>{t("footer.hoursTime2")}</span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                {t("footer.contact")}
              </p>
              <ul className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "var(--amber-400)" }} />
                  <span>{t("footer.phone")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "var(--amber-400)" }} />
                  <span>{t("footer.address")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "var(--amber-400)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span>{t("footer.email")}</span>
                </li>
              </ul>
            </div>

            {/* Map */}
            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                {t("footer.findUs")}
              </p>
              <div
                className="overflow-hidden rounded-xl"
                style={{ border: "1px solid var(--border-medium)" }}
              >
                <iframe
                  title="Brew & Bite location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.6745!2d46.6829!3d24.6877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQxJzE1LjciTiA0NsKwNDAnNTguNCJF!5e0!3m2!1sen!2ssa!4v1234567890"
                  width="100%"
                  height="180"
                  style={{ border: 0, display: "block", filter: "saturate(0.75) sepia(0.15)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.google.com/?q=24.6877,46.6829"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs transition-colors duration-150"
                style={{ color: "var(--amber-500)" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--amber-600)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--amber-500)"}
              >
                <MapPin className="h-3 w-3" />
                {t("footer.openInMaps")}
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-12 pt-6 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between text-xs"
            style={{
              borderTop: "1px solid var(--border-subtle)",
              color: "var(--text-muted)",
            }}
          >
            <p>© {new Date().getFullYear()} {t("home.brand")}. {t("footer.rights")}</p>
            <div className="flex gap-4 justify-center sm:justify-end">
              {[t("footer.privacy"), t("footer.terms")].map((label) => (
                <a
                  key={label}
                  href="#"
                  style={{ color: "var(--text-muted)" }}
                  className="transition-colors duration-150"
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--amber-500)"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}