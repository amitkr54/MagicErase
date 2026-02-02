import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Upload & Remove Background | MagicErase AI",
    description: "Start your high-precision image extraction. Drag and drop any JPG, PNG, WebP, or AVIF to remove backgrounds instantly with MagicErase.",
    keywords: ["upload image", "remove bg", "ai extractor", "transparent png cutouts"],
};

export default function UploadLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
