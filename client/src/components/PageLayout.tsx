import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
    showSidebars?: boolean;
}

export default function PageLayout({ children, showSidebars = true }: PageLayoutProps) {
    // DHH/HEY style: centered content with natural margins, no decorative sidebars
    // Main content max-width ~700px for optimal reading, wider for portfolio pages
    return (
        <div className="min-h-screen bg-muted/20">
            {showSidebars ? (
                // With sidebars: 3-column layout for visual balance
                <div className="flex justify-center">
                    {/* Left margin/sidebar area */}
                    <aside className="hidden lg:block flex-shrink-0 w-[12%] max-w-[200px] bg-gradient-to-b from-accent/3 via-transparent to-accent/5">
                    </aside>

                    {/* Main content - max 1200px for portfolio, centered */}
                    <main className="flex-1 bg-background min-h-screen max-w-[1200px] shadow-sm border-x border-border/20">
                        {children}
                    </main>

                    {/* Right margin/sidebar area */}
                    <aside className="hidden lg:block flex-shrink-0 w-[12%] max-w-[200px] bg-gradient-to-b from-accent/5 via-transparent to-accent/3">
                    </aside>
                </div>
            ) : (
                // Without sidebars: simple centered layout like DHH blog
                <main className="mx-auto bg-background min-h-screen max-w-[720px] px-6">
                    {children}
                </main>
            )}
        </div>
    );
}
