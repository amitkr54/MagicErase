"use client";

import Link from "next/link";
import { Sparkles, Upload } from "lucide-react";
import { useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

interface NavBarProps {
    onImageSelect: (image: File | string | null) => void;
    onGetStarted: () => void;
    onNotify: (message: string) => void;
}

export function NavBar({ onImageSelect, onGetStarted, onNotify }: NavBarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            if (pathname !== "/upload") {
                router.push("/upload");
            }
            onImageSelect(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (pathname !== "/upload") {
            router.push("/upload");
        } else {
            fileInputRef.current?.click();
        }
    };

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (pathname !== "/") {
            // If not on home page, navigate home first
            return;
        }
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6" id="main-nav">
            <div className="max-w-7xl mx-auto flex items-center justify-between glass px-8 py-4 rounded-3xl">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-white rounded-xl transition-transform group-hover:rotate-12">
                        <Sparkles className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">MagicErase</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
                    <Link
                        href="/passport-photo"
                        className="hover:text-white transition-colors text-emerald-400"
                    >
                        Passport Photo
                    </Link>
                    <Link
                        href="/#how-it-works"
                        onClick={(e) => scrollToSection(e, "how-it-works")}
                        className="hover:text-white transition-colors"
                    >
                        How it works
                    </Link>
                    <Link
                        href="/#pricing"
                        onClick={(e) => scrollToSection(e, "pricing")}
                        className="hover:text-white transition-colors"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/#api"
                        onClick={(e) => scrollToSection(e, "api")}
                        className="hover:text-white transition-colors"
                    >
                        API
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*,image/avif,image/webp"
                        onChange={handleFileChange}
                    />
                    <button
                        onClick={handleUploadClick}
                        className="flex items-center gap-2 px-5 py-2 glass hover:bg-white/5 text-sm font-bold rounded-full transition-all active:scale-95"
                    >
                        <Upload className="w-4 h-4" />
                        Upload
                    </button>
                </div>
            </div>
        </nav>
    );
}
