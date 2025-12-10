import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Download, Moon, Sun } from "lucide-react";
import { OWNER_NAME, PROJECTS, PORTFOLIO_CATEGORIES } from "@/const";
import SampleDocuments from "@/components/SampleDocuments";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PageLayout from "@/components/PageLayout";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("dutoan");
  const { language } = useLanguage();
  const { theme, toggleTheme, switchable } = useTheme();
  const filteredProjects = PROJECTS.filter(p => p.category === activeCategory);

  const translations = {
    vi: {
      portfolio: "Portfolio",
      about: "Giới thiệu",
      contact: "Liên hệ",
      back: "Quay lại",
      selectCategory: "Chọn danh mục",
      projects: "Dự án",
      sampleDocuments: "Tài liệu mẫu",
      noProjects: "Chưa có dự án trong danh mục này",
      viewDetails: "Xem chi tiết",
      downloadDocument: "Tải tài liệu",
      previewDocument: "Xem trước",
    },
    en: {
      portfolio: "Portfolio",
      about: "About",
      contact: "Contact",
      back: "Back",
      selectCategory: "Select Category",
      projects: "Projects",
      sampleDocuments: "Sample Documents",
      noProjects: "No projects in this category",
      viewDetails: "View Details",
      downloadDocument: "Download Document",
      previewDocument: "Preview",
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
                  <a className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                    {language === "vi" ? "Trang chủ" : "Home"}
                  </a>
                </Link>
                <Link href="/about">
                  <a className="text-sm font-medium text-foreground hover:text-accent transition-smooth">{t.about}</a>
                </Link>
                <Link href="/portfolio">
                  <a className="text-sm font-medium text-accent hover:text-accent/80 transition-smooth">
                    {language === "vi" ? "Kinh nghiệm" : "Experiences"}
                  </a>
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

        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-accent/5 to-background">
          <div className="container">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/">
                <a className="p-2 hover:bg-secondary rounded-lg transition-smooth">
                  <ArrowLeft size={24} className="text-accent" />
                </a>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t.portfolio}</h1>
            </div>
            <p className="text-lg text-foreground/80 max-w-2xl">
              {language === "vi"
                ? "Khám phá các dự án nổi bật của tôi trong lĩnh vực bóc tách khối lượng, lập hồ sơ dự thầu, và thanh quyết toán công trình."
                : "Explore my featured projects in quantity surveying, bid preparation, and project settlement."}
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="py-8 bg-background/80 backdrop-blur-sm sticky top-16 z-40 border-b border-border">
          <div className="container">
            <div className="flex flex-wrap gap-4">
              {PORTFOLIO_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-smooth ${activeCategory === category.id
                    ? "bg-accent text-accent-foreground shadow-lg"
                    : "bg-background border-2 border-border text-foreground hover:border-accent"
                    }`}
                >
                  {language === "vi" ? category.name_vi : category.name_en}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 md:py-24 mt-8">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12">{t.projects}</h2>

            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group bg-background border-2 border-border rounded-lg overflow-hidden hover:border-accent hover:shadow-xl transition-all duration-300"
                  >
                    {/* Project Header */}
                    <div className="p-6 border-b border-border bg-secondary/30">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-smooth">
                          {project.title}
                        </h3>
                        <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold whitespace-nowrap">
                          {project.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.location}</p>
                    </div>

                    {/* Project Body */}
                    <div className="p-6 space-y-4">
                      <p className="text-foreground/80">{project.description}</p>

                      {/* Role */}
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">
                          {language === "vi" ? "VAI TRÒ" : "ROLE"}
                        </p>
                        <p className="text-foreground">{language === "vi" ? project.role_vi : project.role_en}</p>
                      </div>

                      {/* Responsibilities */}
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">
                          {language === "vi" ? "NHIỆM VỤ CHÍNH" : "KEY RESPONSIBILITIES"}
                        </p>
                        <ul className="space-y-1 text-foreground/80">
                          {(language === "vi" ? project.responsibilities_vi : project.responsibilities_en).map((resp, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-accent">•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Highlights */}
                      {(language === "vi" ? project.highlights_vi : project.highlights_en).length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-muted-foreground mb-2">
                            {language === "vi" ? "ĐIỂM NỔI BẬT" : "HIGHLIGHTS"}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {(language === "vi" ? project.highlights_vi : project.highlights_en).map((highlight, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-secondary border border-border rounded-full text-xs text-foreground/80"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">{t.noProjects}</p>
              </div>
            )}
          </div>
        </section>

        {/* Sample Documents Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12">{t.sampleDocuments}</h2>
            <SampleDocuments category={activeCategory} />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-background border-t border-border text-center text-muted-foreground">
          <p>© 2025 Nguyễn Mạnh Đạt. {language === "vi" ? "All rights reserved." : "All rights reserved."}</p>
        </footer>
      </div>
    </PageLayout>
  );
}
