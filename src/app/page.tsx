"use client";

import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { APIDocs } from "@/components/APIDocs";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const navigateToUpload = () => {
    router.push("/upload");
  };

  return (
    <main className="min-h-screen">
      <NavBar
        onImageSelect={(file) => {
          // If user selects image on home page, go to upload page with it?
          // For now, just navigate to upload page.
          router.push("/upload");
        }}
        onGetStarted={navigateToUpload}
        onNotify={triggerToast}
      />

      <Hero
        selectedImage={null}
        onImageSelect={navigateToUpload}
      />

      <HowItWorks />
      <Pricing onGetStarted={navigateToUpload} onNotify={triggerToast} />
      <APIDocs onNotify={triggerToast} />

      <Footer />

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]"
          >
            <div className="bg-white text-black px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border border-white/20 backdrop-blur-md">
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                <Bell className="w-4 h-4 text-black" />
              </div>
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
