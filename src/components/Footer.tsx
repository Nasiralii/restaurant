"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full py-12 mt-20" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-medium)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="grid h-8 w-8 place-items-center rounded-full text-sm font-bold"
                style={{
                  background: "linear-gradient(135deg, var(--amber-300), var(--amber-400))",
                  color: "var(--text-inverse)",
                }}
              >
                B
              </span>
              <span className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                {t("home.brand")}
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {t("footer.tagline") || "قهوة مميزة وحلويات طازجة"}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
              {t("footer.contact") || "تواصل معنا"}
            </h4>
            <div className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{t("footer.address") || "الرياض، المملكة العربية السعودية"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>0500 000 000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@brewandbite.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{t("footer.hours") || "يومياً 7 ص - 12 ص"}</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
              {t("footer.followUs") || "تابعنا"}
            </h4>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              @brewandbite
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 text-center text-sm" style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border-subtle)" }}>
          © {new Date().getFullYear()} {t("home.brand")}. {t("footer.rights") || "جميع الحقوق محفوظة"}
        </div>
      </div>
    </footer>
  );
}
