import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Download, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useContent } from "@/contexts/ContentContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PageLayout from "@/components/PageLayout";

export default function Portfolio() {
  const { language } = useLanguage();
  const { theme, toggleTheme, switchable } = useTheme();
  const { content: siteContent } = useContent();

  // Initialize to first category if available, fallback to 'dutoan'
  const firstCategoryId = (siteContent.categories || [])[0]?.id || "dutoan";
  const [activeCategory, setActiveCategory] = useState<string>(firstCategoryId);

  // Backwards compatibility: check both `categories` array and old `category` string
  const filteredProjects = siteContent.projects.filter(p => {
    const hasNewCategories = p.categories?.includes(activeCategory);
    const hasOldCategory = (p as any).category === activeCategory;
    return (hasNewCategories || hasOldCategory) && p.visible !== false;
  });

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
              {(siteContent.categories || []).map((category: typeof siteContent.categories[0]) => (
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

        {/* Projects & Documents Grid */}
        <section className="py-16 md:py-24 mt-8">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12">{t.projects}</h2>

            {(filteredProjects.length > 0 || siteContent.documents.filter(d => d.category === activeCategory).length > 0) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Project Cards */}
                {filteredProjects.map((project) => (
                  <div
                    key={`project-${project.id}`}
                    className="group flex flex-col bg-background border-2 border-border rounded-lg overflow-hidden hover:border-accent hover:shadow-xl transition-all duration-300 h-full"
                  >
                    {/* Project Header */}
                    <div className="p-6 border-b border-border bg-secondary/30">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-smooth">
                          {language === 'en' ? (project.title_en || project.title) : project.title}
                        </h3>
                        <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold whitespace-nowrap">
                          {project.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{language === 'en' ? (project.location_en || project.location) : project.location}</p>
                    </div>

                    {/* Project Body */}
                    <div className="p-6 space-y-4 flex-1">
                      <p className="text-foreground/80">{language === 'en' ? (project.description_en || project.description) : project.description}</p>

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
                          {(language === "vi" ? project.responsibilities_vi : project.responsibilities_en).map((resp: string, idx: number) => (
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
                            {(language === "vi" ? project.highlights_vi : project.highlights_en).map((highlight: string, idx: number) => (
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

                    {/* Linked Documents - Always at bottom */}
                    {project.documentIds && project.documentIds.length > 0 && (
                      <div className="px-6 pb-6 pt-0 mt-auto">
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm font-semibold text-muted-foreground mb-3">
                            {language === "vi" ? "TÀI LIỆU MẪU" : "SAMPLE DOCUMENTS"}
                          </p>
                          <div className="space-y-2">
                            {siteContent.documents
                              .filter((doc: { id: number }) => project.documentIds?.includes(doc.id))
                              .map((doc: { id: number; title: string; title_en?: string; type: string; type_en?: string; fileSize: string; googleDriveId: string; fileName: string }) => {
                                const docTitle = language === 'en' ? (doc.title_en || doc.title) : doc.title;
                                const docType = language === 'en' ? (doc.type_en || doc.type) : doc.type;
                                return (
                                  <div key={doc.id} className="flex items-center justify-between gap-3 p-3 bg-secondary/50 rounded-lg border border-border">
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                      <div className="p-1.5 bg-accent/20 rounded flex-shrink-0">
                                        <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                      </div>
                                      <div className="min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">{docTitle}</p>
                                        <p className="text-xs text-muted-foreground">{docType} • {doc.fileSize}</p>
                                      </div>
                                    </div>
                                    <div className="flex gap-1 flex-shrink-0">
                                      <button
                                        onClick={() => window.open(`https://docs.google.com/spreadsheets/d/${doc.googleDriveId}/edit?usp=sharing`, '_blank')}
                                        className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-accent"
                                        title={language === "vi" ? "Xem trước" : "Preview"}
                                      >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                      </button>
                                      <button
                                        onClick={() => {
                                          const link = document.createElement("a");
                                          link.href = `/${doc.fileName}`;
                                          link.download = doc.fileName;
                                          document.body.appendChild(link);
                                          link.click();
                                          document.body.removeChild(link);
                                        }}
                                        className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-accent"
                                        title={language === "vi" ? "Tải xuống" : "Download"}
                                      >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        </div>
                      </div>
                    )}
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

        {/* Footer */}
        <footer className="py-8 bg-background border-t border-border text-center text-muted-foreground">
          <p>© 2025 Nguyễn Mạnh Đạt. {language === "vi" ? "All rights reserved." : "All rights reserved."}</p>
        </footer>
      </div>
    </PageLayout>
  );
}
