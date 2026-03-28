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
                <a
                  href="#"
                  aria-label="Instagram"
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
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="currentColor"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="white"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Twitter/X"
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
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
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
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="WhatsApp"
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
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                </a>
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