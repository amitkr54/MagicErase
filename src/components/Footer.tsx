export function Footer() {
    return (
        <footer className="py-20 px-6 border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-white/40 text-sm">
                    © 2026 MagicErase AI. Built with speed and privacy in mind.
                </div>
                <div className="flex gap-8 text-sm text-white/40">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                </div>
            </div>
        </footer>
    );
}
