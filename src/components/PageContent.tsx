"use client";

import { MenuCard } from "@/components/MenuCard";
import { BannerSlider } from "@/components/BannerSlider";
import { TopNav } from "@/components/TopNav";
import { MENU, type MenuCategoryId } from "@/lib/menu";
import { Coffee, CupSoda, Dessert, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function iconForCategory(id: MenuCategoryId) {
  switch (id) {
    case "coffee":
      return <Coffee className="h-4 w-4" />;
    case "desserts":
      return <Dessert className="h-4 w-4" />;
    case "drinks":
      return <CupSoda className="h-4 w-4" />;
  }
}

export function PageContent() {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="sticky top-0 w-full left-0 right-0 z-40 border-b border-black/10 bg-[#fbf7f0]/75 backdrop-blur">
        <TopNav />
      </div>

      <main className="w-full pb-14 mx-auto">
        <header className="">
          <BannerSlider />
        </header>

        <div className="mt-10 grid gap-10 container mx-auto">
          {MENU.map((category) => (
            <section key={category.id} id={category.id} className="scroll-mt-24">
              <div className="flex flex-col gap-2 px-4 sm:flex-row sm:items-end sm:justify-between">
                <div >
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70  py-1 text-sm font-semibold text-[#3a2f27]">
                    {iconForCategory(category.id)}
                    {t(`categories.${category.id}.title`)}
                  </div>
                  <p className="mt-2 text-sm text-[#6b5b4f]">
                    {t(`categories.${category.id}.subtitle`)}
                  </p>
                </div>
                <p className="text-xs text-[#6b5b4f]">
                  {t('home.updatedToday')}
                </p>
              </div>

             <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {category.items.map((item) => (
    <div key={`${category.id}-${item.name}`} className="h-full">
      <MenuCard item={item} />
    </div>
  ))}
</div>
            </section>
          ))}
        </div>

       
      </main>

      <footer className="border-t border-black/10 bg-linear-to-r from-[#fef3c7] via-[#fde68a] to-[#fbbf24]">
  <div className="w-full max-w-400 mx-auto px-4 py-16 sm:px-6 lg:px-10 xl:px-16">
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      
      {/* Brand */}
      <div className="lg:col-span-1">
        <p className="text-lg font-semibold text-[#1f1a14]">{t('home.brand')}</p>
        <p className="mt-3 text-sm leading-7 text-[#5b4b3f]">
          {t('home.tagline')}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <a href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-[#3a2f27] hover:bg-[#c28a52] hover:text-white hover:border-[#c28a52] transition">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-1.699 4.919-4.919 1.266-.058 1.644-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358.2 6.78 2.618 6.98 6.98 1.281.058 1.689.073 4.948.073 3.259 0 3.668-.014 4.947-.072 4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.2-4.358-.2-6.78-2.618-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" aria-label="Twitter/X" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-[#3a2f27] hover:bg-[#c28a52] hover:text-white hover:border-[#c28a52] transition">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" aria-label="TikTok" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-[#3a2f27] hover:bg-[#c28a52] hover:text-white hover:border-[#c28a52] transition">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <p className="text-sm font-semibold text-[#1f1a14]">{t('footer.menu')}</p>
        <ul className="mt-3 space-y-2 text-sm text-[#5b4b3f]">
          <li><a href="#coffee" className="hover:text-[#c28a52] transition">{t('nav.coffee')}</a></li>
          <li><a href="#desserts" className="hover:text-[#c28a52] transition">{t('nav.desserts')}</a></li>
          <li><a href="#drinks" className="hover:text-[#c28a52] transition">{t('nav.drinks')}</a></li>
        </ul>
        <p className="mt-6 text-sm font-semibold text-[#1f1a14]">{t('footer.hours')}</p>
        <ul className="mt-3 space-y-2 text-sm text-[#5b4b3f]">
          <li className="flex justify-between gap-4"><span>{t('footer.hoursSatThu')}</span><span>{t('footer.hoursTime1')}</span></li>
          <li className="flex justify-between gap-4"><span>{t('footer.hoursFri')}</span><span>{t('footer.hoursTime2')}</span></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <p className="text-sm font-semibold text-[#1f1a14]">{t('footer.contact')}</p>
        <ul className="mt-3 space-y-3 text-sm text-[#5b4b3f]">
          <li className="flex items-start gap-2">
            <Phone className="h-4 w-4 mt-0.5 shrink-0 text-[#c28a52]" />
            <span>{t('footer.phone')}</span>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#c28a52]" />
            <span>{t('footer.address')}</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="h-4 w-4 mt-0.5 shrink-0 text-[#c28a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
            <span>{t('footer.email')}</span>
          </li>
        </ul>
      </div>

      {/* Map */}
      <div>
        <p className="text-sm font-semibold text-[#1f1a14]">{t('footer.findUs')}</p>
        <div className="mt-3 overflow-hidden rounded-xl border border-black/10">
          <iframe
            title="Brew & Bite location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.6745!2d46.6829!3d24.6877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQxJzE1LjciTiA0NsKwNDAnNTguNCJF!5e0!3m2!1sen!2ssa!4v1234567890"
            width="100%"
            height="180"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        
         <a href="https://maps.google.com/?q=24.6877,46.6829"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#c28a52] hover:underline"
        >
          <MapPin className="h-3 w-3" />
          {t('footer.openInMaps')}
        </a>
      </div>

    </div>

    <div className="mt-12 border-t border-black/10 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-[#6b5b4f]">
      <p>© {new Date().getFullYear()} {t('home.brand')}. {t('footer.rights')}.</p>
      <div className="flex gap-4">
        <a href="#" className="hover:text-[#c28a52] transition">{t('footer.privacy')}</a>
        <a href="#" className="hover:text-[#c28a52] transition">{t('footer.terms')}</a>
      </div>
    </div>
  </div>
</footer> 
    </>
  );
}
