import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
    showSidebars?: boolean;
}

export default function PageLayout({ children, showSidebars = true }: PageLayoutProps) {
    // ByteByteGo/Substack style: clean centered layout with generous whitespace
    // No visible sidebars, just natural margins creating visual balance
    return (
        <div className="min-h-screen bg-muted/10">
            {/* Centered main content with max-width for optimal reading */}
            {/* Portfolio/multi-column pages: 1100px max */}
            {/* Blog/single-column pages: 680px max (when showSidebars=false) */}
            <main
                className={`
          mx-auto bg-background min-h-screen
          ${showSidebars
                        ? 'max-w-[1100px] shadow-sm border-x border-border/10'
                        : 'max-w-[680px] px-5'
                    }
        `}
            >
                {children}
            </main>
        </div>
    );
}
