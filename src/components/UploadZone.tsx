"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Image as ImageIcon, CheckCircle, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadZoneProps {
    onImageSelect: (file: File) => void;
}

export function UploadZone({ onImageSelect }: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            onImageSelect(file);
        }
    }, [onImageSelect]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImageSelect(e.target.files[0]);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`relative group cursor-pointer rounded-[2.5rem] border-4 border-dashed transition-all duration-500 overflow-hidden ${isDragging
                        ? "border-brand-primary bg-brand-primary/5 scale-[1.02] shadow-2xl shadow-brand-primary/20"
                        : "border-white/10 glass hover:border-brand-primary/30 hover:bg-white/[0.02]"
                    }`}
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="py-20 px-8 flex flex-col items-center text-center">
                    <div className={`w-24 h-24 rounded-3xl mb-8 flex items-center justify-center transition-all duration-500 ${isDragging ? "bg-brand-primary scale-110 rotate-12" : "bg-brand-primary/10 group-hover:bg-brand-primary/20"
                        }`}>
                        <Upload className={`w-10 h-10 transition-colors ${isDragging ? "text-black" : "text-brand-primary"}`} />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Drag and drop an image <br />
                        <span className="text-white/40 font-medium text-3xl">or </span>
                        <span className="text-brand-primary hover:underline">browse to upload.</span>
                    </h2>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,image/avif,image/webp"
                    />

                    <button className="mt-10 btn-primary px-10 py-5 text-xl">
                        Upload your photo
                    </button>

                    <p className="mt-8 text-white/40 text-sm">
                        File must be JPEG, JPG, PNG, WebP or AVIF and up to 40MB
                    </p>

                    <div className="mt-12 flex items-center gap-10">
                        <div className="flex items-center gap-2 text-white/60 font-medium">
                            <CheckCircle className="w-5 h-5 text-brand-primary fill-brand-primary/10" />
                            Free to use
                        </div>
                        <div className="flex items-center gap-2 text-white/60 font-medium">
                            <CheckCircle className="w-5 h-5 text-brand-primary fill-brand-primary/10" />
                            No credit card required
                        </div>
                    </div>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-primary/0 group-hover:border-brand-primary/40 rounded-tl-3xl transition-all" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand-primary/0 group-hover:border-brand-primary/40 rounded-tr-3xl transition-all" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand-primary/0 group-hover:border-brand-primary/40 rounded-bl-3xl transition-all" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-primary/0 group-hover:border-brand-primary/40 rounded-br-3xl transition-all" />

                {/* Processing background element */}
                <AnimatePresence>
                    {isDragging && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-brand-primary/10 backdrop-blur-[2px] pointer-events-none flex items-center justify-center"
                        >
                            <span className="text-brand-primary font-black text-6xl opacity-20 select-none uppercase tracking-widest animate-pulse">
                                Drop Here
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <p className="mt-10 text-center text-white/30 text-xs tracking-wide">
                By uploading your image, you agree to the MagicErase <span className="underline cursor-pointer">Terms of Use</span> and <span className="underline cursor-pointer">Privacy Policy</span>
            </p>
        </div>
    );
}
