"use client";

import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, ArrowRight, Zap, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface HeroProps {
    selectedImage: File | string | null;
    onImageSelect: (image: File | string | null) => void;
}

export function Hero({ onImageSelect }: HeroProps) {
    const router = useRouter();

    const handleTrySample = () => {
        router.push("/upload");
    };

    return (
        <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-brand-accent text-sm font-semibold mb-6">
                        <Zap className="w-4 h-4 fill-brand-accent" />
                        <span>AI-Powered Magic</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
                        Remove <span className="text-gradient">Backgrounds</span> in Seconds.
                    </h1>
                    <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-lg">
                        High-quality background removal that runs entirely in your browser.
                        No cloud uploads, 100% private, and completely free.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => router.push("/upload")}
                            className="btn-primary flex items-center gap-2 group"
                        >
                            <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                            Upload Image
                        </button>
                        <button
                            onClick={handleTrySample}
                            className="btn-secondary flex items-center gap-2"
                        >
                            Try Sample
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="mt-12 flex items-center gap-8 opacity-60">
                        <div className="flex items-center gap-2 text-sm">
                            <Shield className="w-4 h-4" />
                            100% Private
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Sparkles className="w-4 h-4" />
                            Free Forever
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative group"
                >
                    <div className="aspect-square rounded-[3rem] overflow-hidden glass hover:border-white/20 transition-all duration-500 shadow-2xl shadow-brand-primary/10">
                        <img
                            src="/demo.png"
                            alt="Demo"
                            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                            <div>
                                <p className="font-bold text-xl mb-1 text-white">Portrait Removal</p>
                                <p className="text-white/60 text-sm">Fine edge detection</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-black" />
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-primary/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl animate-pulse-slow" />
                </motion.div>
            </div>
        </section>
    );
}
