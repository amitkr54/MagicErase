"use client";

import { motion } from "framer-motion";
import { Terminal, Copy, Check, Code2, ExternalLink } from "lucide-react";
import { useState } from "react";

interface APIDocsProps {
    onNotify: (message: string) => void;
}

const codeSnippet = `const removeBackground = async (image) => {
  const response = await fetch('https://api.magicerase.ai/v1/remove', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer YOUR_API_KEY' },
    body: image
  });
  
  return await response.blob();
};`;

export function APIDocs({ onNotify }: APIDocsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="api" className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-brand-primary text-sm font-semibold mb-6">
                            <Code2 className="w-4 h-4" />
                            <span>Developer API</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Integrate <span className="text-gradient">Removal</span> into your Apps
                        </h2>
                        <p className="text-lg text-white/60 mb-8 leading-relaxed">
                            MagicErase provides a high-performance REST API for bulk processing and automated workflows.
                            Our infrastructure scales with your needs, processing millions of images per month.
                        </p>

                        <div className="space-y-6">
                            {[
                                "99.9% Uptime SLA",
                                "Production-ready SDKs",
                                "Detailed Analytics",
                                "Batch processing support"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-white/80">
                                    <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-brand-primary" />
                                    </div>
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => onNotify("API access is coming soon for MagicErase Pro!")}
                            className="mt-10 flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all underline underline-offset-8"
                        >
                            View API Documentation
                            <ExternalLink className="w-4 h-4" />
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                    </div>
                                    <span className="text-xs font-mono text-white/40 flex items-center gap-2">
                                        <Terminal className="w-3 h-3" />
                                        example.js
                                    </span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-white/40" />}
                                </button>
                            </div>
                            <div className="p-8 overflow-x-auto">
                                <pre className="font-mono text-sm text-brand-primary leading-relaxed">
                                    <code>{codeSnippet}</code>
                                </pre>
                            </div>
                        </div>

                        {/* Background glow */}
                        <div className="absolute -inset-4 bg-brand-primary/10 rounded-[3rem] blur-3xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
