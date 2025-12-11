import { Mail, Phone, MapPin, ArrowRight, Linkedin, Github, Facebook, Moon, Sun } from "lucide-react";
import { Link } from "wouter";
import { OWNER_NAME, OWNER_EMAIL, OWNER_PHONE, OWNER_LOCATION, SOCIAL_LINKS, AVATAR_URL } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PageLayout from "@/components/PageLayout";

export default function Home() {
  const { language } = useLanguage();
  const { theme, toggleTheme, switchable } = useTheme();

  const translations = {
    vi: {
      home: "Trang chủ",
      about: "Giới thiệu",
      experiences: "Kinh nghiệm",
      contact: "Liên hệ",
      title: "Kỹ sư Dự toán Xây dựng",
      subtitle: "Chuyên gia Bóc tách khối lượng & Thanh quyết toán",
      description: "Chuyên về bóc tách khối lượng, lập hồ sơ dự thầu, và thanh quyết toán công trình. Với hơn 7 năm kinh nghiệm trong lĩnh vực xây dựng cơ sở hạ tầng, dân dụng và công nghiệp.",
      viewWork: "Xem Portfolio",
      letsConnect: "Liên hệ ngay",
      aboutMe: "Giới thiệu",
      aboutMeHighlight: "về tôi",
      aboutDescription: "Chuyên về bóc tách khối lượng, lập hồ sơ dự thầu, và thanh quyết toán công trình. Với hơn 7 năm kinh nghiệm trong lĩnh vực xây dựng cơ sở hạ tầng, dân dụng và công nghiệp.",
      email: "Email",
      phone: "Điện thoại",
      address: "Địa chỉ",
      allRightsReserved: "All rights reserved.",
    },
    en: {
      home: "Home",
      about: "About",
      experiences: "Experiences",
      contact: "Contact",
      title: "Construction Cost Engineer",
      subtitle: "Quantity Surveying & Project Settlement Expert",
      description: "Specialized in quantity surveying, bid preparation, and project settlement. With over 7 years of experience in infrastructure, civil, and industrial construction.",
      viewWork: "View My Work",
      letsConnect: "Let's Connect",
      aboutMe: "About",
      aboutMeHighlight: "Me",
      aboutDescription: "Specialized in quantity surveying, bid preparation, and project settlement. With over 7 years of experience in infrastructure, civil, and industrial construction.",
      email: "Email",
      phone: "Phone",
      address: "Address",
      allRightsReserved: "All rights reserved.",
    },
  };

  const t = translations[language as keyof typeof translations];

  return (
    <PageLayout>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/">
              <a className="text-xl font-bold text-foreground hover:text-accent transition-smooth">
                Nguyễn Mạnh Đạt
              </a>
            </Link>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex gap-6">
                <Link href="/">
                  <a className="text-sm font-medium text-accent hover:text-accent/80 transition-smooth">{t.home}</a>
                </Link>
                <Link href="/about">
                  <a className="text-sm font-medium text-foreground hover:text-accent transition-smooth">{t.about}</a>
                </Link>
                <Link href="/portfolio">
                  <a className="text-sm font-medium text-foreground hover:text-accent transition-smooth">{t.experiences}</a>
                </Link>
                <Link href="/contact">
                  <a className="text-sm font-medium text-foreground hover:text-accent transition-smooth">{t.contact}</a>
                </Link>
              </div>
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
            </div>
          </div>
        </nav>

        {/* Hero Section - Split Layout */}
        <section className="flex-1 py-12 md:py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-6 order-2 lg:order-1">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Nguyễn Mạnh Đạt
                </h1>
                <p className="text-2xl md:text-3xl font-semibold text-foreground">
                  {t.title}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.description}
                </p>

                {/* Social Links */}
                <div className="flex gap-3 pt-2">
                  {SOCIAL_LINKS.linkedin && (
                    <a
                      href={SOCIAL_LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 border border-border hover:border-accent hover:bg-accent/5 rounded-full transition-smooth"
                      title="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {SOCIAL_LINKS.github && (
                    <a
                      href={SOCIAL_LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 border border-border hover:border-accent hover:bg-accent/5 rounded-full transition-smooth"
                      title="GitHub"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {SOCIAL_LINKS.facebook && (
                    <a
                      href={SOCIAL_LINKS.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 border border-border hover:border-accent hover:bg-accent/5 rounded-full transition-smooth"
                      title="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                  )}
                  {SOCIAL_LINKS.email && (
                    <a
                      href={`mailto:${SOCIAL_LINKS.email}`}
                      className="p-2.5 border border-border hover:border-accent hover:bg-accent/5 rounded-full transition-smooth"
                      title="Email"
                    >
                      <Mail size={20} />
                    </a>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/portfolio">
                    <a className="min-h-[48px] px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth flex items-center justify-center gap-2">
                      {t.viewWork}
                      <ArrowRight size={18} />
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a className="min-h-[48px] px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-smooth flex items-center justify-center">
                      {t.letsConnect}
                    </a>
                  </Link>
                </div>
              </div>

              {/* Right Column - Profile Image */}
              <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                <div className="relative">
                  {/* Glow effect background */}
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl scale-110"></div>
                  {/* Profile image */}
                  <img
                    src={AVATAR_URL}
                    alt={OWNER_NAME}
                    className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-accent/30 shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="py-20 md:py-32 bg-secondary/20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                {t.aboutMe} <span className="text-accent">{t.aboutMeHighlight}</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.aboutDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-4 bg-accent/10 rounded-full">
                  <Mail className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t.email}</p>
                  <a href={`mailto:${OWNER_EMAIL}`} className="font-semibold text-foreground hover:text-accent transition-smooth">
                    {OWNER_EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-4 bg-accent/10 rounded-full">
                  <Phone className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t.phone}</p>
                  <a href={`tel:${OWNER_PHONE}`} className="font-semibold text-foreground hover:text-accent transition-smooth">
                    {OWNER_PHONE}
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-4 bg-accent/10 rounded-full">
                  <MapPin className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t.address}</p>
                  <p className="font-semibold text-foreground">{OWNER_LOCATION}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-secondary/30 border-t border-border text-center text-muted-foreground">
          <p className="text-sm">© 2025 Nguyễn Mạnh Đạt. {t.allRightsReserved}</p>
        </footer>
      </div>
    </PageLayout>
  );
}
