import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
    showSidebars?: boolean;
}

export default function PageLayout({ children, showSidebars = true }: PageLayoutProps) {
    return (
        <div className="min-h-screen flex justify-center bg-muted/30">
            {/* Left Sidebar - Decorative (15% width on large screens) */}
            {showSidebars && (
                <aside className="hidden xl:block flex-shrink-0 w-[15vw] max-w-[280px] bg-gradient-to-b from-accent/5 via-transparent to-accent/10 border-r border-border/30">
                </aside>
            )}

            {/* Main Content Area - max-width 1400px for optimal readability */}
            <main className="flex-1 bg-background shadow-xl min-h-screen max-w-[1400px]">
                {children}
            </main>

            {/* Right Sidebar - Decorative (15% width on large screens) */}
            {showSidebars && (
                <aside className="hidden xl:block flex-shrink-0 w-[15vw] max-w-[280px] bg-gradient-to-b from-accent/10 via-transparent to-accent/5 border-l border-border/30">
                </aside>
            )}
        </div>
    );
}
