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
    { href: "#coffee", label: t('nav.coffee') },
    { href: "#desserts", label: t('nav.desserts') },
    { href: "#drinks", label: t('nav.drinks') },
    { href: "#order", label: t('nav.order') },
  ];

  // 🔥 Lock scroll when menu opens
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  return (
    <>
      {/* NAVBAR */}
      <div className="sticky top-0 z-50 w-full border-b border-black/10 bg-linear-to-r from-[#fca311]/90 via-[#f5e1a4]/90 to-[#f27935]/95 px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-10 xl:px-16">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between">

          {/* LOGO */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 font-semibold text-black"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1f1a14] text-white">
              B
            </span>
            {t('home.brand')}
          </a>

          {/* DESKTOP MENU (Tablet + Desktop) */}
          <nav className="hidden md:flex items-center gap-2">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-black hover:bg-black/10 transition"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">

            {/* LANGUAGE TOGGLE */}
            <LanguageToggle />

            {/* QR BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[#c28a52] px-4 py-2 text-sm font-semibold text-[#1f1a14] hover:bg-[#d29a63]"
            >
              <QrCode className="h-4 w-4" />
              {t('nav.qr')}
            </button>

            {/* MOBILE MENU BUTTON (ONLY MOBILE) */}
            <button
              className="md:hidden rounded-full p-2 hover:bg-black/10"
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
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-full max-w-xs bg-white shadow-2xl transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-bold text-[#1f1a14]">{t('footer.menu')}</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-full p-2 hover:bg-black/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* MENU ITEMS */}
        <nav className="flex flex-col p-3 gap-2">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg bg-[#f7e6cf] px-4 py-3 text-sm font-semibold text-[#3a2f27] hover:bg-[#f2d2a9] transition"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* QR MODAL */}
      <QrModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}