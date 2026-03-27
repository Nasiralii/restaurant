"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, Copy, QrCode, X } from "lucide-react";
import QRCode from "qrcode";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Tab = "generate" | "scan";

export function QrModal({ open, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("generate");
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

    // Generate a QR for the *current* URL (works locally + after deploy).
    void (async () => {
      if (!menuUrl) return;
      const dataUrl = await QRCode.toDataURL(menuUrl, {
        margin: 2,
        width: 640,
        color: { dark: "#1f1a14", light: "#fbf7f0" },
      });
      setQrDataUrl(dataUrl);
    })();
  }, [open, menuUrl]);

  useEffect(() => {
    // Clean up camera scanner when closing or switching tabs.
    return () => {
      void (async () => {
        try {
          const maybePromise = scannerRef.current?.clear();
          await Promise.resolve(maybePromise);
        } catch {
          // Best-effort cleanup; camera permissions vary by browser.
        } finally {
          scannerRef.current = null;
        }
      })();
    };
  }, [open, tab]);

  async function startScanner() {
    // `html5-qrcode` touches the DOM; keep it lazy so SSR is unaffected.
    const mod = await import("html5-qrcode");
    const Html5Qrcode = mod.Html5Qrcode;

    const scanner = new Html5Qrcode(scannerRegionId);
    scannerRef.current = scanner;

    await scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 240, height: 240 } },
      (decodedText) => {
        // If it’s a URL, navigate; otherwise just close.
        if (decodedText.startsWith("http")) window.location.href = decodedText;
        onClose();
      },
      () => {
        // ignore per-frame decode errors
      },
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
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/35 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="QR code"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-2xl border border-black/10 bg-[#fbf7f0] shadow-xl">
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-[#3a2f27]" />
            <div>
              <p className="text-sm font-semibold text-[#1f1a14]">
                QR code
              </p>
              <p className="text-xs text-[#6b5b4f]">
                Share or scan this page
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-[#3a2f27] hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#c28a52]/60"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

      

        <div className="px-5 pb-5 pt-4">
          {tab === "generate" ? (
            <div className="grid gap-4">
              <div className="grid place-items-center rounded-2xl bg-white p-4">
                {/* Using an <img> because the data URL is generated client-side. */}
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="QR code linking to this page"
                    className="mx-auto h-64 w-64"
                  />
                ) : (
                  <div className="h-64 w-64 animate-pulse rounded-xl bg-black/5" />
                )}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="truncate text-xs text-[#6b5b4f]" title={pageUrl}>
                  {pageUrl}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={copyLink}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#1f1a14] hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#c28a52]/60"
                  >
                    <Copy className="h-4 w-4" />
                    {copyState === "copied" ? "Copied" : "Copy link"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-3">
              <p className="text-sm text-[#5b4b3f]">
                Use your camera to scan a QR code. If it contains a URL, we’ll open it.
              </p>

              <div className="rounded-2xl bg-white p-3">
                <div id={scannerRegionId} className="w-full" />
              </div>

              <button
                onClick={() => void startScanner()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1f1a14] px-4 py-2 text-sm font-semibold text-[#fbf7f0] hover:bg-[#2a231c] focus:outline-none focus:ring-2 focus:ring-[#c28a52]/60 focus:ring-offset-2 focus:ring-offset-[#fbf7f0]"
              >
                <Camera className="h-4 w-4" />
                Start camera
              </button>

              <p className="text-xs text-[#6b5b4f]">
                Tip: On desktop, scanning depends on available camera permissions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

