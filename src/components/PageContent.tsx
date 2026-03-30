"use client";

import { DynamicMenu } from "@/components/DynamicMenu";
import { OrderSidebar } from "@/components/OrderSidebar";
import { FloatingCartButton } from "@/components/FloatingCartButton";
import { Toast } from "@/components/Toast";
import { TopNav } from "@/components/TopNav";
import { BannerSlider } from "@/components/BannerSlider";
import { Footer } from "@/components/Footer";
import { useToast } from "@/contexts/ToastContext";

export function PageContent() {
  const { toastMessage, isToastVisible, hideToast } = useToast();

  return (
    <>
      <div className="sticky top-0 w-full left-0 right-0 z-40">
        <TopNav />
      </div>

      <main className="w-full pb-16 mx-auto">
        <header>
          <BannerSlider />
        </header>

        {/* ── DYNAMIC MENU SECTIONS ── */}
        <DynamicMenu />
      </main>

      <Footer />

      {/* Toast Notification */}
      <Toast message={toastMessage} isVisible={isToastVisible} onClose={hideToast} />

      {/* Floating Cart Button (mobile) */}
      <FloatingCartButton />

      {/* Order Sidebar */}
      <OrderSidebar />
    </>
  );
}
