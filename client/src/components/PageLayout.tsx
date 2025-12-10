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
                <aside className="hidden lg:block w-32 xl:w-48 2xl:w-72 bg-gradient-to-b from-accent/5 via-transparent to-accent/10 border-r border-border/30 sticky top-0 h-screen">
                </aside>
            )}

            {/* Main Content Area */}
            <main className="flex-1 bg-background shadow-xl min-h-screen">
                {children}
            </main>

            {/* Right Sidebar - Decorative */}
            {showSidebars && (
                <aside className="hidden lg:block w-32 xl:w-48 2xl:w-72 bg-gradient-to-b from-accent/10 via-transparent to-accent/5 border-l border-border/30 sticky top-0 h-screen">
                </aside>
            )}
        </div>
    );
}

