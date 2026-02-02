"use client";

import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ShoppingBag, Zap, Camera, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductPhotographyPage() {
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
                title={<>Professional <span className="text-gradient">Product Photo</span> Background Remover</>}
                subtitle="The fastest way to create clean, high-quality product images for Amazon, Shopify, and Etsy. AI-powered precision for clothing, accessories, and electronics."
                ctaText="Start Editing Products"
                selectedImage={null}
                onImageSelect={navigateToUpload}
            />

            <div className="bg-black py-20 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Built for E-commerce Sellers</h2>
                            <p className="text-white/60 text-lg">Stop wasting hours on Photoshop. Get marketplace-ready images in seconds.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: "Marketplace Ready", desc: "Instantly create 100% white backgrounds required by Amazon and eBay.", icon: CheckCircle },
                                { title: "Clothing Expertise", desc: "Advanced AI handles complex textile edges and mannequin removal with ease.", icon: ShoppingBag },
                                { title: "High Resolution", desc: "Export high-quality PNGs that keep your product details sharp for zoom features.", icon: Camera },
                                { title: "Instant Batch", desc: "Process entire product catalogs faster than any manual agency.", icon: Zap }
                            ].map((feature, i) => (
                                <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors group">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-white/60 leading-relaxed text-sm">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto bg-gradient-to-br from-emerald-500/10 to-transparent p-12 rounded-[3rem] border border-white/10">
                        <h2 className="text-4xl font-bold mb-12 text-center">Increase your <span className="text-emerald-400">Conversion Rate</span></h2>
                        <div className="space-y-8">
                            <p className="text-xl text-white/80 text-center leading-relaxed">
                                Studies show that clean product images with neutral backgrounds increase sales by up to <strong>67%</strong>.
                                MagicErase helps you achieve that premium Look without the premium price tag.
                            </p>
                            <div className="flex justify-center">
                                <button
                                    onClick={navigateToUpload}
                                    className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:scale-105 transition-transform"
                                >
                                    Start Your First Catalog
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
            </section>

            <HowItWorks />
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
