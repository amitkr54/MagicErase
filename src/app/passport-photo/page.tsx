"use client";

import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PassportPhotoPage() {
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
                    router.push("/upload");
                }}
                onGetStarted={navigateToUpload}
                onNotify={triggerToast}
            />

            <Hero
                title="AI Passport Photo Background Remover"
                subtitle="Instantly turn any photo into a professional passport or visa photo with a perfect white background. 100% free, private, and browser-based."
                ctaText="Create Passport Photo"
                selectedImage={null}
                onImageSelect={navigateToUpload}
            />

            <div className="bg-black py-20 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-8">Why use MagicErase for Passport Photos?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h3 className="text-xl font-bold mb-4 text-emerald-400">Strict Compliance</h3>
                                <p className="text-white/60">Automatically creates the solid white background required for US, UK, Indian, and international passport & visa applications.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h3 className="text-xl font-bold mb-4 text-emerald-400">100% Privacy</h3>
                                <p className="text-white/60">We never upload your face to a server. All processing happens directly in your browser, keeping your identity secure.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <h3 className="text-xl font-bold mb-4 text-emerald-400">No Cost</h3>
                                <p className="text-white/60">Unlike retail stores that charge $15+, MagicErase is completely free for everyone, forever.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <HowItWorks />

            <section className="py-20 bg-emerald-500/5">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-8 text-center text-emerald-400">How to make a Passport Photo at home</h2>
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-black">1</span>
                            <p className="text-lg">Take a photo of yourself against any wall with good, even lighting on your face.</p>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-black">2</span>
                            <p className="text-lg">Upload it to MagicErase. Our AI will instantly isolate your face and shoulders.</p>
                        </li>
                        <li className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-black">3</span>
                            <p className="text-lg">Select 'White Background' and download your high-resolution passport-ready photo.</p>
                        </li>
                    </ul>
                </div>
            </section>

            <Pricing onGetStarted={navigateToUpload} onNotify={triggerToast} />
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
