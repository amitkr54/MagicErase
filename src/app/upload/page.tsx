"use client";

import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { UploadZone } from "@/components/UploadZone";
import { ImageProcessor } from "@/components/ImageProcessor";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";

export default function UploadPage() {
    const [selectedImage, setSelectedImage] = useState<File | string | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const triggerToast = (message: string) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleReset = () => {
        setSelectedImage(null);
    };

    return (
        <main className="min-h-screen bg-black">
            <NavBar
                onImageSelect={setSelectedImage}
                onGetStarted={() => setSelectedImage(null)}
                onNotify={triggerToast}
            />

            <section className="pt-40 pb-20 px-6 min-h-[calc(100vh-100px)] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    {!selectedImage ? (
                        <motion.div
                            key="upload-zone"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full"
                        >
                            <UploadZone onImageSelect={setSelectedImage} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="processor"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full flex justify-center"
                        >
                            <ImageProcessor
                                image={selectedImage}
                                onReset={handleReset}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

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
                        <div className="bg-white text-black px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold">
                            <Bell className="w-4 h-4" />
                            {toast}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
