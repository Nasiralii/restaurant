import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { MenuItem } from "@/lib/menu";

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group rounded-2xl border border-black/10 bg-[#fdf7f1] p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg hover:border-[#c28a52]/60">
      <div className="relative mb-4 overflow-hidden rounded-xl bg-[#f2e0c8]">
        <div className="relative h-40 w-full sm:h-52">
          <Image
            src={item.imageSrc}
            alt={`${item.name} image`}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 ease-out group-hover:scale-105"
            priority={false}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-0 transition duration-300 ease-out group-hover:opacity-100" />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-[#2b2119]">
            {item.name}
          </h3>
          <p className="mt-1 text-sm leading-6 text-[#7a5a44]">
            {item.description}
          </p>
        </div>
        <div className="shrink-0 rounded-full bg-[#2b2119] px-3 py-1 text-sm font-semibold text-[#f8e4c9]">
          {item.priceSar} SAR
        </div>
      </div>

      <div className="mt-2 overflow-hidden">
        <a
          href="#order"
          className="inline-flex translate-y-2 items-center gap-2 rounded-full bg-[#2b2119] px-4 py-2 text-sm font-semibold text-[#fdf7f1] opacity-0 shadow-sm ring-1 ring-transparent transition duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:ring-[#c28a52]/70 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-[#c28a52]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdf7f1]"
          aria-label={`Order ${item.name}`}
        >
          Order Now
          <ArrowUpRight className="h-4 w-4 opacity-90" />
        </a>
      </div>
    </article>
  );
}

