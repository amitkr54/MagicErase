"use client";

import { motion } from "framer-motion";
import { Check, Zap, Sparkles, Shield, Rocket } from "lucide-react";

interface PricingProps {
    onGetStarted: () => void;
    onNotify: (message: string) => void;
}

const plans = [
    {
        name: "Free",
        price: "0",
        description: "Perfect for secondary projects and casual use.",
        features: [
            "Unlimited removals",
            "Browser-native processing",
            "100% Privacy guaranteed",
            "Support for AVIF/WebP",
            "No watermark"
        ],
        cta: "Get Started",
        highlight: false,
        icon: Shield
    },
    {
        name: "Pro",
        price: "12",
        description: "For professionals who need the absolute best.",
        features: [
            "Everything in Free",
            "Batch processing",
            "HD Export Quality",
            "API Access",
            "Priority support",
            "Custom backgrounds"
        ],
        cta: "Upgrade to Pro",
        highlight: true,
        icon: Zap
    }
];

export function Pricing({ onGetStarted, onNotify }: PricingProps) {
    return (
        <section id="pricing" className="py-32 px-6 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Simple <span className="text-gradient">Pricing</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 text-lg max-w-2xl mx-auto"
                    >
                        Choose the plan that's right for you. MagicErase is free forever for personal use.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={`relative glass-card p-10 border-2 ${plan.highlight ? 'border-brand-primary/50' : 'border-white/5'}`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-primary text-black text-xs font-black rounded-full uppercase tracking-widest flex items-center gap-1">
                                    <Rocket className="w-3 h-3 fill-black" />
                                    Most Popular
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed max-w-[200px]">
                                        {plan.description}
                                    </p>
                                </div>
                                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${plan.highlight ? 'text-brand-primary' : 'text-white'}`}>
                                    <plan.icon className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-black">${plan.price}</span>
                                <span className="text-white/40 font-medium">/month</span>
                            </div>

                            <ul className="space-y-4 mb-10">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white/70">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-brand-primary' : 'bg-white/10'}`}>
                                            <Check className={`w-3 h-3 ${plan.highlight ? 'text-black' : 'text-white'}`} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => plan.highlight ? onNotify("MagicErase Pro is coming soon!") : onGetStarted()}
                                className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 ${plan.highlight
                                        ? 'bg-brand-primary text-black hover:shadow-2xl hover:shadow-brand-primary/20'
                                        : 'glass hover:bg-white/10'
                                    }`}>
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
