"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, Copy, QrCode, X } from "lucide-react";
import QRCode from "qrcode";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = { open: boolean; onClose: () => void };
type Tab = "generate" | "scan";

export function QrModal({ open, onClose }: Props) {
  const { t } = useLanguage();
  const [tab] = useState<Tab>("generate");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const scannerRef = useRef<null | { clear: () => void | Promise<void> }>(null);
  const scannerRegionId = useMemo(() => "qr-reader-region", []);

  const pageUrl =
    typeof window === "undefined" ? "" : window.location.href.split("#")[0];
  const menuUrl = pageUrl ? `${pageUrl}#coffee` : "";

  useEffect(() => {
    if (!open) return;
    setCopyState("idle");
    void (async () => {
      if (!menuUrl) return;
      const dataUrl = await QRCode.toDataURL(menuUrl, {
        margin: 2,
        width: 640,
        color: { dark: "#2d1a08", light: "#fef4e3" },
      });
      setQrDataUrl(dataUrl);
    })();
  }, [open, menuUrl]);

  useEffect(() => {
    return () => {
      void (async () => {
        try { await Promise.resolve(scannerRef.current?.clear()); } catch {}
        finally { scannerRef.current = null; }
      })();
    };
  }, [open, tab]);

  async function startScanner() {
    const mod = await import("html5-qrcode");
    const scanner = new mod.Html5Qrcode(scannerRegionId);
    scannerRef.current = scanner;
    await scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 240, height: 240 } },
      (decodedText) => {
        if (decodedText.startsWith("http")) window.location.href = decodedText;
        onClose();
      },
      () => {},
    );
  }

  async function copyLink() {
    if (!menuUrl) return;
    await navigator.clipboard.writeText(menuUrl);
    setCopyState("copied");
    window.setTimeout(() => setCopyState("idle"), 1200);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center p-4"
      style={{ background: "rgba(45,26,8,0.45)", backdropFilter: "blur(8px)" }}
      role="dialog"
      aria-modal="true"
      aria-label={t("qrModal.title")}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-lg rounded-2xl"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-medium)",
          boxShadow: "0 24px 80px rgba(107,62,26,0.22)",
        }}
      >
        {/* Amber accent top bar */}
        <div
          className="h-1 w-full rounded-t-2xl"
          style={{
            background: "linear-gradient(to right, var(--amber-300), var(--amber-400), var(--amber-300))",
          }}
        />

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-accent)",
              }}
            >
              <QrCode className="h-4 w-4" style={{ color: "var(--amber-400)" }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {t("qrModal.title")}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {t("qrModal.subtitle")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition"
            style={{ color: "var(--text-muted)" }}
            aria-label={t("qrModal.close")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 pb-5 pt-4">
          {tab === "generate" ? (
            <div className="grid gap-4">
              <div
                className="grid place-items-center rounded-2xl p-4"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
              >
                {qrDataUrl ? (
                  <Image
                    src={qrDataUrl}
                    alt={t("qrModal.qrAlt")}
                    className="mx-auto h-64 w-64 rounded-xl"
                    width={256}
                    height={256}
                  />
                ) : (
                  <div
                    className="h-64 w-64 animate-pulse rounded-xl"
                    style={{ background: "var(--bg-muted)" }}
                  />
                )}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p
                  className="truncate text-xs"
                  style={{ color: "var(--text-muted)" }}
                  title={pageUrl}
                >
                  {pageUrl}
                </p>
                <button
                  onClick={copyLink}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
                  style={{
                    background: copyState === "copied" ? "var(--bg-muted)" : "var(--bg-elevated)",
                    border: copyState === "copied"
                      ? "1px solid var(--border-strong)"
                      : "1px solid var(--border-medium)",
                    color: copyState === "copied" ? "var(--amber-600)" : "var(--text-secondary)",
                  }}
                >
                  <Copy className="h-4 w-4" />
                  {copyState === "copied" ? t("qrModal.copied") : t("qrModal.copyLink")}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-3">
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {t("qrModal.scanInstructions")}
              </p>
              <div
                className="rounded-2xl p-3"
                style={{ background: "var(--bg-elevated)" }}
              >
                <div id={scannerRegionId} className="w-full" />
              </div>
              <button
                onClick={() => void startScanner()}
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  background: "linear-gradient(135deg, var(--amber-400), var(--amber-500))",
                  color: "var(--text-inverse)",
                }}
              >
                <Camera className="h-4 w-4" />
                {t("qrModal.startCamera")}
              </button>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {t("qrModal.cameraTip")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}