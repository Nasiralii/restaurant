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
        eyebrow: t("banner.coffee.eyebrow"),
        title: t("banner.coffee.title"),
        description: t("banner.coffee.description"),
      },
      {
        id: "desserts",
        imageSrc:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80",
        eyebrow: t("banner.desserts.eyebrow"),
        title: t("banner.desserts.title"),
        description: t("banner.desserts.description"),
      },
      {
        id: "drinks",
        imageSrc:
          "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1600&q=80",
        eyebrow: t("banner.drinks.eyebrow"),
        title: t("banner.drinks.title"),
        description: t("banner.drinks.description"),
      },
    ],
    [t],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  function go(delta: number) {
    setIndex((i) => {
      const next = (i + delta) % slides.length;
      return next < 0 ? next + slides.length : next;
    });
  }

  const active = slides[index];

  return (
    <div className="relative -mt-6 isolate h-[62vh] sm:h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src={active.imageSrc}
        alt={active.eyebrow}
        fill
        sizes="100vw"
        priority
        className="object-cover transition-opacity duration-700"
      />

      {/* Warm amber-brown overlay — lighter than before, brand-tinted */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(45,26,8,0.30) 0%, rgba(107,62,26,0.48) 50%, rgba(45,26,8,0.72) 100%)",
        }}
      />

      {/* Amber warm vignette from bottom — brand signature */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 130% 60% at 50% 100%, rgba(232,135,10,0.18) 0%, transparent 65%)",
        }}
      />

      {/* Top amber shimmer — like sunlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(252,216,138,0.20) 0%, transparent 60%)",
        }}
      />

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center banner-slide-animation">

        {/* Eyebrow pill — amber brand */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-4"
          style={{
            background: "rgba(232,135,10,0.22)",
            border: "1px solid rgba(232,135,10,0.50)",
            color: "#fcd98a",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "#f9b830" }}
          />
          {active.eyebrow}
        </div>

        {/* Title — warm cream */}
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-2xl leading-tight"
          style={{ color: "#fdf8f1" }}
        >
          {active.title}
        </h1>

        {/* Description — warm linen */}
        <p
          className="mt-4 text-sm sm:text-base leading-7 max-w-lg"
          style={{ color: "#f0dcc0" }}
        >
          {active.description}
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Primary — solid amber brand */}
          <Link
            href="#coffee"
            className="rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #e8870a, #c96d00)",
              color: "#ffffff",
              boxShadow: "0 4px 20px rgba(232,135,10,0.45)",
            }}
          >
            {t("nav.viewMenu")}
          </Link>

          {/* Secondary — frosted warm white */}
          <Link
            href="#order"
            className="rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200"
            style={{
              background: "rgba(253,248,241,0.14)",
              border: "1px solid rgba(253,248,241,0.35)",
              color: "#fdf8f1",
              backdropFilter: "blur(10px)",
            }}
          >
            {t("nav.order")}
          </Link>
        </div>
      </div>

      {/* Dots + arrows */}
      <div className="absolute inset-x-0 bottom-0 pb-6 sm:pb-8 flex items-center justify-center gap-4">

        {/* Prev */}
        <button
          type="button"
          onClick={() => go(-1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: "rgba(232,135,10,0.18)",
            border: "1px solid rgba(232,135,10,0.40)",
            color: "#fcd98a",
            backdropFilter: "blur(8px)",
          }}
          aria-label={t("banner.previous")}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,135,10,0.35)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,135,10,0.18)";
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${t("banner.goToSlide")} ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === index ? "28px" : "8px",
                background: i === index
                  ? "linear-gradient(to right, #f9b830, #e8870a)"
                  : "rgba(253,248,241,0.40)",
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => go(1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: "rgba(232,135,10,0.18)",
            border: "1px solid rgba(232,135,10,0.40)",
            color: "#fcd98a",
            backdropFilter: "blur(8px)",
          }}
          aria-label={t("banner.next")}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,135,10,0.35)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,135,10,0.18)";
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}