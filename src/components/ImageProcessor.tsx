"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, RefreshCw, X, Check, Loader2, Maximize2, Palette, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { removeBackground, Config } from "@imgly/background-removal";
import { cn } from "@/lib/utils";

interface ImageProcessorProps {
    image: File | string;
    onReset: () => void;
}

/**
 * Decodes a File (AVIF, WebP, etc) to a standard PNG Blob using a browser canvas.
 * This ensures the background removal engine receives a format it can handle natively
 * and avoids "undefined is not iterable" errors seen with raw ImageData.
 */
const decodeToBlob = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(url);
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                reject(new Error("Failed to get canvas context"));
                return;
            }
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error("Failed to convert canvas to blob"));
                }
            }, "image/png");
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Failed to load image for decoding. Your browser might not support this format."));
        };

        img.src = url;
    });
};

export function ImageProcessor({ image, onReset }: ImageProcessorProps) {
    const [originalUrl, setOriginalUrl] = useState<string>("");
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(true);
    const [progress, setProgress] = useState(0);
    const [sliderPosition, setSliderPosition] = useState(50);
    const [error, setError] = useState<string | null>(null);
    const [activeBackground, setActiveBackground] = useState<{
        type: "transparent" | "color" | "gradient" | "image";
        value: string;
    }>({ type: "transparent", value: "transparent" });

    const backgrounds = {
        colors: [
            { name: "White", value: "#ffffff" },
            { name: "Black", value: "#000000" },
            { name: "Soft Blue", value: "#e0f2fe" },
            { name: "Rose", value: "#fff1f2" },
            { name: "Emerald", value: "#ecfdf5" },
        ],
        gradients: [
            { name: "Sunset", value: "linear-gradient(to right, #ff5f6d, #ffc371)" },
            { name: "Ocean", value: "linear-gradient(to right, #2193b0, #6dd5ed)" },
            { name: "Midnight", value: "linear-gradient(to bottom, #232526, #414345)" },
            { name: "Purple", value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
        ],
        images: [
            { name: "Studio", value: "https://images.unsplash.com/photo-1621839673705-68b7eda1f72d?auto=format&fit=crop&q=80&w=2000" },
            { name: "Office", value: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" },
            { name: "Loft", value: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2000" },
        ]
    };

    useEffect(() => {
        // Create an absolute URL for displaying the original image
        const displayUrl = typeof image === "string"
            ? (image.startsWith("/") ? window.location.origin + image : image)
            : URL.createObjectURL(image);

        setOriginalUrl(displayUrl);

        const processImage = async () => {
            try {
                setIsProcessing(true);
                setError(null);

                const config: Config = {
                    publicPath: "https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/",
                    progress: (key, current, total) => {
                        const p = Math.round((current / total) * 100);
                        setProgress(p);
                    },
                };

                let source: Blob | string;

                // For AVIF and WebP, we decode manually to a standard PNG Blob
                if (typeof image !== "string" && (image.type === "image/avif" || image.type === "image/webp")) {
                    console.log(`Pre-decoding ${image.type} image to PNG Blob via Canvas...`);
                    source = await decodeToBlob(image);
                } else {
                    // For standard formats or strings, use the absolute URL or File
                    source = typeof image === "string" ? displayUrl : (image as File);
                }

                console.log("Background removal started with source type:", typeof source === "string" ? "URL" : "Blob/File");
                const blob = await removeBackground(source, config);

                const resultUrl = URL.createObjectURL(blob);
                setProcessedUrl(resultUrl);
                setIsProcessing(false);
            } catch (err) {
                console.error("Processing failed in ImageProcessor:", err);
                setError(`Processing failed: ${err instanceof Error ? err.message : String(err)}`);
                setIsProcessing(false);
            }
        };

        processImage();

        return () => {
            if (typeof image !== "string") {
                URL.revokeObjectURL(displayUrl);
            }
        };
    }, [image]);

    const handleDownload = () => {
        if (!processedUrl) return;
        const link = document.createElement("a");
        link.href = processedUrl;
        link.download = "magic-erase-result.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        const container = e.currentTarget.getBoundingClientRect();
        const x = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const position = ((x - container.left) / container.width) * 100;
        setSliderPosition(Math.max(0, Math.min(100, position)));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl"
        >
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Result</h2>
                    <p className="text-white/60">
                        {isProcessing ? "Our AI is working its magic..." : "Perfect! Your background-free image is ready."}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onReset}
                        className="p-3 rounded-full glass hover:bg-white/5 transition-colors"
                    >
                        <X className="w-5 h-5 text-white/70" />
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div
                        className="relative aspect-video rounded-3xl overflow-hidden glass cursor-col-resize group"
                        onMouseMove={handleMouseMove}
                        onTouchMove={handleMouseMove}
                    >
                        {/* Background Layer */}
                        <div className="absolute inset-0 transition-all duration-500" style={{
                            background: activeBackground.type === "color" || activeBackground.type === "gradient"
                                ? activeBackground.value
                                : activeBackground.type === "image"
                                    ? `url(${activeBackground.value}) center/cover no-repeat`
                                    : "transparent"
                        }}>
                            {activeBackground.type === "transparent" && (
                                <div className="absolute inset-0 opacity-10" style={{
                                    backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                                    backgroundSize: '20px 20px',
                                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                                }} />
                            )}
                        </div>

                        <img
                            src={originalUrl}
                            alt="Original"
                            className="absolute inset-0 w-full h-full object-contain"
                        />

                        {processedUrl && (
                            <div
                                className="absolute inset-0 overflow-hidden"
                                style={{ width: `${sliderPosition}%` }}
                            >
                                <img
                                    src={processedUrl}
                                    alt="Processed"
                                    className="absolute inset-0 h-full object-contain"
                                    style={{ width: `calc(100% * 100 / ${sliderPosition})` }}
                                />
                            </div>
                        )}

                        {/* Processing Overlay */}
                        <AnimatePresence>
                            {isProcessing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center border-2 border-brand-primary/50 rounded-3xl"
                                >
                                    <Loader2 className="w-12 h-12 text-brand-primary animate-spin mb-4" />
                                    <p className="text-xl font-bold mb-2">{progress}%</p>
                                    <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-brand-primary"
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-white/40 mt-4 px-6 text-center">
                                        Running locally on your device<br />
                                        <span className="text-[10px] opacity-60">Initial run may take longer to download models</span>
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Slider Line */}
                        {processedUrl && !isProcessing && (
                            <>
                                <div
                                    className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-10 pointer-events-none"
                                    style={{ left: `${sliderPosition}%` }}
                                >
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xl">
                                        <RefreshCw className="w-4 h-4 text-black" />
                                    </div>
                                </div>

                                {/* Labels */}
                                <div className="absolute top-6 left-6 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-xs font-bold pointer-events-none">
                                    AFTER
                                </div>
                                <div className="absolute top-6 right-6 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-xs font-bold pointer-events-none">
                                    BEFORE
                                </div>
                            </>
                        )}

                        {error && (
                            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-8 text-center">
                                <p className="text-red-400 font-bold mb-4">{error}</p>
                                <button
                                    onClick={onReset}
                                    className="btn-secondary text-sm px-6 py-2"
                                >
                                    Try again
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Background Selector UI */}
                    <div className="mt-6 flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-white/40 uppercase tracking-widest">
                            <Palette className="w-4 h-4" />
                            Background Gallery
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveBackground({ type: "transparent", value: "transparent" })}
                                className={cn(
                                    "w-10 h-10 rounded-xl border-2 transition-all",
                                    activeBackground.type === "transparent" ? "border-brand-primary scale-110" : "border-white/10 hover:border-white/20"
                                )}
                                style={{ backgroundImage: 'linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)', backgroundSize: '10px 10px' }}
                                title="Transparent"
                            />
                            {backgrounds.colors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setActiveBackground({ type: "color", value: color.value })}
                                    className={cn(
                                        "w-10 h-10 rounded-xl border-2 transition-all",
                                        activeBackground.type === "color" && activeBackground.value === color.value ? "border-brand-primary scale-110" : "border-white/10 hover:border-white/20"
                                    )}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                />
                            ))}
                            <div className="w-px h-8 bg-white/10 mx-1" />
                            {backgrounds.gradients.map((grad) => (
                                <button
                                    key={grad.name}
                                    onClick={() => setActiveBackground({ type: "gradient", value: grad.value })}
                                    className={cn(
                                        "w-10 h-10 rounded-xl border-2 transition-all",
                                        activeBackground.type === "gradient" && activeBackground.value === grad.value ? "border-brand-primary scale-110" : "border-white/10 hover:border-white/20"
                                    )}
                                    style={{ background: grad.value }}
                                    title={grad.name}
                                />
                            ))}
                            <div className="w-px h-8 bg-white/10 mx-1" />
                            {backgrounds.images.map((img) => (
                                <button
                                    key={img.name}
                                    onClick={() => setActiveBackground({ type: "image", value: img.value })}
                                    className={cn(
                                        "w-10 h-10 rounded-xl border-2 overflow-hidden transition-all",
                                        activeBackground.type === "image" && activeBackground.value === img.value ? "border-brand-primary scale-110" : "border-white/10 hover:border-white/20"
                                    )}
                                    title={img.name}
                                >
                                    <img src={img.value} className="w-full h-full object-cover" alt={img.name} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="glass-card p-6 flex-1 flex flex-col">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            Export Options
                        </h3>

                        <div className="space-y-4 flex-1">
                            <button
                                disabled={isProcessing}
                                onClick={handleDownload}
                                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Download PNG
                            </button>
                            <button
                                disabled={isProcessing}
                                className="w-full btn-secondary py-3 opacity-50 cursor-not-allowed group relative"
                            >
                                Download Vector (SVG)
                                <span className="absolute -top-3 -right-2 px-2 py-0.5 bg-brand-secondary text-[10px] font-bold rounded-full">PRO</span>
                            </button>
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <div className="flex items-center gap-3 text-sm text-white/60">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <Check className="w-5 h-5 text-green-500" />
                                </div>
                                Full HD Quality
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/60 mt-4">
                                <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center">
                                    <Maximize2 className="w-5 h-5 text-brand-accent" />
                                </div>
                                Transparent BG
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <p className="text-xs text-white/40 leading-relaxed">
                            Processed using MagicErase AI V1. All processing happens on your device to ensure maximum privacy.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
