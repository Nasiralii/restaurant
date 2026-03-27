"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

type Slide = {
  id: string;
  imageSrc: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function BannerSlider() {
  const { t } = useLanguage();
  
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "coffee",
        imageSrc:
          "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=1600&q=80",
        eyebrow: t('banner.coffee.eyebrow'),
        title: t('banner.coffee.title'),
        description: t('banner.coffee.description'),
      },
      {
        id: "desserts",
        imageSrc:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80",
        eyebrow: t('banner.desserts.eyebrow'),
        title: t('banner.desserts.title'),
        description: t('banner.desserts.description'),
      },
      {
        id: "drinks",
        imageSrc:
          "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1600&q=80",
        eyebrow: t('banner.drinks.eyebrow'),
        title: t('banner.drinks.title'),
        description: t('banner.drinks.description'),
      },
    ],
    [t],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(t);
  }, [slides.length]);

  function go(delta: number) {
    setIndex((i) => {
      const next = (i + delta) % slides.length;
      return next < 0 ? next + slides.length : next;
    });
  }

  const active = slides[index];

  return (
    <div className="relative -mt-6 isolate h-screen w-full overflow-hidden">
      {/* Background image — fills full height */}
      <Image
        src={active.imageSrc}
        alt={active.eyebrow}
        fill
        sizes="100vw"
        priority
        className="object-cover transition-opacity duration-700"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#1f1a14]/70 via-[#1f1a14]/30 to-transparent" />

      {/* Content pinned to bottom */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:px-12 sm:pb-12 banner-slide-animation">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-semibold tracking-widest uppercase text-white/70">
              {active.eyebrow}
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-white/80 tracking-tight sm:text-5xl">
              {active.title}
            </h1>
            <p className="mt-3 text-base leading-7 text-white/80">
              {active.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="#coffee"
              className="rounded-full bg-[#1f1a14] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/30 hover:bg-[#302a22] focus:outline-none focus:ring-2 focus:ring-[#c28a52]/60"
            >
              {t('nav.viewMenu')}
            </Link>
            <Link
              href="#order"
              className="rounded-full bg-[#391c02] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/30 hover:bg-[#4f2f0b] focus:outline-none focus:ring-2 focus:ring-[#c28a52]/60"
            >
              {t('nav.order')}
            </Link>
          </div>
        </div>

        {/* Dots + arrows */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${t('banner.goToSlide')} ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-[#c28a52]" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#c28a52]/60"
              aria-label={t('banner.previous')}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#c28a52]/60"
              aria-label={t('banner.next')}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}