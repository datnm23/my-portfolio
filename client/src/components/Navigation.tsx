import { Moon, Sun, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useContent } from "@/contexts/ContentContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useState } from "react";

interface NavigationProps {
  activePage?: "home" | "about" | "portfolio" | "contact";
}

const navTranslations = {
  vi: {
    home: "Trang chủ",
    about: "Giới thiệu",
    portfolio: "Kinh nghiệm",
    contact: "Liên hệ",
  },
  en: {
    home: "Home",
    about: "About",
    portfolio: "Experiences",
    contact: "Contact",
  },
};

export default function Navigation({ activePage = "home" }: NavigationProps) {
  const { language } = useLanguage();
  const { theme, toggleTheme, switchable } = useTheme();
  const { content: siteContent } = useContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = navTranslations[language as keyof typeof navTranslations];

  const navItems = [
    { key: "home", label: t.home, href: "/" },
    { key: "about", label: t.about, href: "/about" },
    { key: "portfolio", label: t.portfolio, href: "/portfolio" },
    { key: "contact", label: t.contact, href: "/contact" },
  ];

  const ownerName =
    language === "en"
      ? siteContent.ownerName_en || siteContent.ownerName
      : siteContent.ownerName;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-foreground hover:text-accent transition-smooth"
        >
          {ownerName}
        </Link>
        <div className="flex items-center gap-6">
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`text-sm font-medium transition-smooth ${
                  activePage === item.key
                    ? "text-accent hover:text-accent/80"
                    : "text-foreground hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          {switchable && toggleTheme && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary transition-smooth"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          )}

          <LanguageSwitcher />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-secondary transition-smooth"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-sm">
          <div className="container py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 transition-smooth ${
                  activePage === item.key
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
