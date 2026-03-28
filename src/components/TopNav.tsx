"use client";

import { useState, useEffect } from "react";
import { QrCode, Menu, X } from "lucide-react";
import { QrModal } from "@/components/QrModal";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export function TopNav() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const menuItems = [
    { href: "#coffee",   label: t("nav.coffee") },
    { href: "#desserts", label: t("nav.desserts") },
    { href: "#drinks",   label: t("nav.drinks") },
    { href: "#order",    label: t("nav.order") },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  return (
    <>
      <div
        className="sticky top-0 z-50 w-full px-4 py-3 sm:px-6 lg:px-10 xl:px-16"
        style={{
          background: "rgba(253, 248, 241, 0.96)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--border-subtle)",
          boxShadow: "0 1px 0 rgba(168,119,61,0.08)",
        }}
      >
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between">

          {/* LOGO */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 font-semibold"
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-full text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, var(--amber-300), var(--amber-400))",
                color: "var(--text-inverse)",
                boxShadow: "0 2px 10px rgba(232,135,10,0.30)",
              }}
            >
              B
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {t("home.brand")}
            </span>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-0.5">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--amber-600)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-elevated)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            <LanguageToggle />

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, var(--amber-400), var(--amber-500))",
                color: "var(--text-inverse)",
                boxShadow: "0 2px 12px rgba(232,135,10,0.28)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 18px rgba(232,135,10,0.38)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 12px rgba(232,135,10,0.28)";
              }}
            >
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">{t("nav.qr")}</span>
            </button>

            <button
              className="md:hidden rounded-full p-2 transition"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* BACKDROP */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50"
          style={{ background: "rgba(45,26,8,0.40)", backdropFilter: "blur(4px)" }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-full max-w-xs shadow-2xl transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "var(--bg-surface)",
          borderLeft: "1px solid var(--border-medium)",
        }}
      >
        <div
          className="flex items-center justify-between p-4"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
            {t("footer.menu")}
          </h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-full p-2 transition"
            style={{ color: "var(--text-muted)" }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col p-3 gap-1.5">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200"
              style={{
                color: "var(--text-secondary)",
                background: "var(--bg-elevated)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--amber-600)";
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-muted)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-elevated)";
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <QrModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}