"use client";

import { motion } from "framer-motion";
import { Upload, Cpu, Download, ArrowRight } from "lucide-react";

const steps = [
    {
        title: "Upload Image",
        description: "Select any JPG, PNG, WebP or AVIF image from your device. We never upload your data to a server.",
        icon: Upload,
        color: "brand-primary"
    },
    {
        title: "AI Processing",
        description: "Our advanced AI identifies and removes the background in milliseconds using multithreaded WASM technology.",
        icon: Cpu,
        color: "brand-accent"
    },
    {
        title: "Download Result",
        description: "Save your high-quality transparent PNG instantly. No watermarks, no hidden costs.",
        icon: Download,
        color: "brand-secondary"
    }
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        How the <span className="text-gradient">Magic</span> Happens
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 text-lg max-w-2xl mx-auto"
                    >
                        MagicErase uses state-of-the-art AI models that run directly in your browser.
                        No servers involved, ensuring 100% privacy and lightning-fast results.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Decorative connecting lines (desktop only) */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -translate-y-1/2 z-0" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative z-10 glass-card p-10 flex flex-col items-center text-center group hover:bg-white/[0.05] transition-colors"
                        >
                            <div className={`w-20 h-20 rounded-3xl bg-${step.color}/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-${step.color}/10`}>
                                <step.icon className={`w-10 h-10 text-${step.color}`} />
                            </div>
                            <div className="absolute top-6 right-6 text-4xl font-black text-white/5 select-none">
                                0{index + 1}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                            <p className="text-white/50 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
