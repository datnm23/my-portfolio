import { Mail, Phone, MapPin, ArrowRight, Linkedin, Github, Facebook } from "lucide-react";
import { Link } from "wouter";
import { OWNER_NAME, OWNER_EMAIL, OWNER_PHONE, OWNER_LOCATION, SOCIAL_LINKS, AVATAR_URL } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
  const { language } = useLanguage();

  const translations = {
    vi: {
      about: "Giới thiệu",
      portfolio: "Portfolio",
      contact: "Liên hệ",
      title: "Kỹ sư Dự toán Xây dựng",
      subtitle: "Chuyên gia Bóc tách khối lượng & Thanh quyết toán",
      description: "Chuyên về bóc tách khối lượng, lập hồ sơ dự thầu, và thanh quyết toán công trình. Với hơn 7 năm kinh nghiệm trong lĩnh vực xây dựng cơ sở hạ tầng, dân dụng và công nghiệp.",
      viewPortfolio: "Xem Portfolio",
      contactNow: "Liên hệ ngay",
      expertise: "Chuyên môn",
      expertise1: "Bóc tách khối lượng",
      expertise2: "Lập hồ sơ dự thầu",
      expertise3: "Thanh quyết toán",
      readyToCollaborate: "Sẵn sàng hợp tác?",
      collaborationMessage: "Liên hệ với tôi để thảo luận về dự án của bạn hoặc tìm hiểu thêm về kinh nghiệm của tôi.",
      sendMessage: "Gửi tin nhắn",
      email: "Email",
      phone: "Điện thoại",
      address: "Địa chỉ",
      allRightsReserved: "All rights reserved.",
      followMe: "Theo dõi tôi",
    },
    en: {
      about: "About",
      portfolio: "Portfolio",
      contact: "Contact",
      title: "Construction Cost Engineer",
      subtitle: "Quantity Surveying & Project Settlement Expert",
      description: "Specialized in quantity surveying, bid preparation, and project settlement. With over 7 years of experience in infrastructure, civil, and industrial construction.",
      viewPortfolio: "View Portfolio",
      contactNow: "Contact Now",
      expertise: "Expertise",
      expertise1: "Quantity Surveying",
      expertise2: "Bid Preparation",
      expertise3: "Project Settlement",
      readyToCollaborate: "Ready to Collaborate?",
      collaborationMessage: "Contact me to discuss your project or learn more about my experience.",
      sendMessage: "Send Message",
      email: "Email",
      phone: "Phone",
      address: "Address",
      allRightsReserved: "All rights reserved.",
      followMe: "Follow Me",
    },
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-accent hover:opacity-80 transition-smooth">
              Nguyễn Mạnh Đạt
            </a>
          </Link>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8">
              <Link href="/about">
                <a className="text-foreground hover:text-accent transition-smooth">{t.about}</a>
              </Link>
              <Link href="/portfolio">
                <a className="text-foreground hover:text-accent transition-smooth">{t.portfolio}</a>
              </Link>
              <Link href="/contact">
                <a className="text-foreground hover:text-accent transition-smooth">{t.contact}</a>
              </Link>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero Section with Avatar & Social Links */}
      <section className="flex-1 py-20 md:py-32 bg-gradient-to-br from-accent/5 to-background">
        <div className="container">
          <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
            {/* Avatar */}
            <div className="relative">
              <img
                src={AVATAR_URL}
                alt={OWNER_NAME}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-accent shadow-lg object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                {language === "vi" ? "Sẵn sàng" : "Available"}
              </div>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Nguyễn Mạnh Đạt
              </h1>
              <p className="text-xl md:text-2xl text-accent font-semibold">
                {t.title}
              </p>
              <p className="text-lg text-muted-foreground">
                {t.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-foreground/80 leading-relaxed max-w-2xl">
              {t.description}
            </p>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {SOCIAL_LINKS.linkedin && (
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-full transition-smooth"
                  title="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
              )}
              {SOCIAL_LINKS.github && (
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-full transition-smooth"
                  title="GitHub"
                >
                  <Github size={24} />
                </a>
              )}
              {SOCIAL_LINKS.facebook && (
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-full transition-smooth"
                  title="Facebook"
                >
                  <Facebook size={24} />
                </a>
              )}
              {SOCIAL_LINKS.email && (
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="p-3 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-full transition-smooth"
                  title="Email"
                >
                  <Mail size={24} />
                </a>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Link href="/portfolio">
                <a className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth flex items-center justify-center gap-2">
                  {t.viewPortfolio}
                  <ArrowRight size={20} />
                </a>
              </Link>
              <Link href="/contact">
                <a className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-smooth">
                  {t.contactNow}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t.expertise}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t.expertise1, icon: "📊" },
              { title: t.expertise2, icon: "📋" },
              { title: t.expertise3, icon: "✅" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 bg-background rounded-lg border border-border hover:border-accent hover:shadow-lg transition-smooth text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-accent/10">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.readyToCollaborate}</h2>
          <p className="text-lg text-foreground/80 mb-8">{t.collaborationMessage}</p>
          <Link href="/contact">
            <a className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth">
              {t.sendMessage}
            </a>
          </Link>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
              <Mail className="text-accent" size={24} />
              <div>
                <p className="text-sm text-muted-foreground">{t.email}</p>
                <a href={`mailto:${OWNER_EMAIL}`} className="font-semibold text-foreground hover:text-accent transition-smooth">
                  {OWNER_EMAIL}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-accent" size={24} />
              <div>
                <p className="text-sm text-muted-foreground">{t.phone}</p>
                <a href={`tel:${OWNER_PHONE}`} className="font-semibold text-foreground hover:text-accent transition-smooth">
                  {OWNER_PHONE}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-accent" size={24} />
              <div>
                <p className="text-sm text-muted-foreground">{t.address}</p>
                <p className="font-semibold text-foreground">{OWNER_LOCATION}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border text-center text-muted-foreground">
        <p>© 2025 Nguyễn Mạnh Đạt. {t.allRightsReserved}</p>
      </footer>
    </div>
  );
}
