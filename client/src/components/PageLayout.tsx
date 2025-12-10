import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
    showSidebars?: boolean;
}

export default function PageLayout({ children, showSidebars = true }: PageLayoutProps) {
    return (
        <div className="min-h-screen flex bg-muted/30">
            {/* Left Sidebar - Decorative */}
            {showSidebars && (
                <aside className="hidden lg:block w-16 xl:w-24 bg-gradient-to-b from-accent/5 via-transparent to-accent/10 border-r border-border/30 sticky top-0 h-screen">
                    <div className="h-full flex flex-col items-center justify-center gap-8 py-12">
                        <div className="w-1 h-32 bg-gradient-to-b from-accent/60 to-transparent rounded-full"></div>
                        <div className="w-2 h-2 bg-accent/40 rounded-full"></div>
                        <div className="w-2 h-2 bg-accent/30 rounded-full"></div>
                        <div className="w-2 h-2 bg-accent/20 rounded-full"></div>
                        <div className="w-1 h-32 bg-gradient-to-t from-accent/60 to-transparent rounded-full"></div>
                    </div>
                </aside>
            )}

            {/* Main Content Area */}
            <main className="flex-1 bg-background shadow-xl min-h-screen">
                {children}
            </main>

            {/* Right Sidebar - Decorative */}
            {showSidebars && (
                <aside className="hidden lg:block w-16 xl:w-24 bg-gradient-to-b from-accent/10 via-transparent to-accent/5 border-l border-border/30 sticky top-0 h-screen">
                    <div className="h-full flex flex-col items-center justify-center gap-8 py-12">
                        <div className="w-1 h-32 bg-gradient-to-b from-accent/60 to-transparent rounded-full"></div>
                        <div className="w-2 h-2 bg-accent/20 rounded-full"></div>
                        <div className="w-2 h-2 bg-accent/30 rounded-full"></div>
                        <div className="w-2 h-2 bg-accent/40 rounded-full"></div>
                        <div className="w-1 h-32 bg-gradient-to-t from-accent/60 to-transparent rounded-full"></div>
                    </div>
                </aside>
            )}
        </div>
    );
}
