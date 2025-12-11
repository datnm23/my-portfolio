import { ArrowLeft, Download, Moon, Sun } from "lucide-react";
import { CV_FILE_PATH } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useContent } from "@/contexts/ContentContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PageLayout from "@/components/PageLayout";
import { Link } from "wouter";

export default function About() {
  const { language } = useLanguage();
  const { theme, toggleTheme, switchable } = useTheme();
  const { content: siteContent } = useContent();

  const translations = {
    vi: {
      about: "Giới thiệu",
      portfolio: "Portfolio",
      contact: "Liên hệ",
      back: "Quay lại",
      downloadCV: "Tải CV",
      title: "Kỹ sư Dự toán Xây dựng",
      subtitle: "Chuyên gia Bóc tách khối lượng & Thanh quyết toán",
      introduction: "Giới thiệu",
      skills: "Kỹ năng chuyên môn",
      software: "Phần mềm & Công cụ",
      experience: "Kinh nghiệm làm việc",
      education: "Học vấn",
      info: "Thông tin",
      email: "Email",
      phone: "Điện thoại",
      address: "Địa chỉ",
      responseTime: "Tôi sẽ cố gắng phản hồi tin nhắn của bạn trong vòng 24 giờ.",
      allRightsReserved: "All rights reserved.",
    },
    en: {
      about: "About",
      portfolio: "Portfolio",
      contact: "Contact",
      back: "Back",
      downloadCV: "Download CV",
      title: "Construction Cost Engineer",
      subtitle: "Quantity Surveying & Project Settlement Expert",
      introduction: "Introduction",
      skills: "Professional Skills",
      software: "Software & Tools",
      experience: "Work Experience",
      education: "Education",
      info: "Information",
      email: "Email",
      phone: "Phone",
      address: "Address",
      responseTime: "I will try to respond to your message within 24 hours.",
      allRightsReserved: "All rights reserved.",
    },
  };

  const content = translations[language];

  // Use skills from siteContent (editable in Admin) - handle both string[] and object[] formats
  const skillsList = (siteContent.skills || []).map((skill: any) =>
    typeof skill === 'string' ? skill : (skill.name || skill.name_vi || '')
  );

  const renderRatingBars = (rating: number) => {
    return (
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 flex-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-sm ${i < rating ? "bg-accent" : "bg-border"
                }`}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-muted-foreground min-w-[2.5rem] text-right">
          {rating}/5
        </span>
      </div>
    );
  };

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
                  <a className="text-sm font-medium text-accent hover:text-accent/80 transition-smooth">{content.about}</a>
                </Link>
                <Link href="/portfolio">
                  <a className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                    {language === "vi" ? "Kinh nghiệm" : "Experiences"}
                  </a>
                </Link>
                <Link href="/contact">
                  <a className="text-sm font-medium text-foreground hover:text-accent transition-smooth">{content.contact}</a>
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

        {/* Main Content */}
        <main className="flex-1 container py-12 md:py-20">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-accent hover:opacity-80 transition-smooth mb-8">
              <ArrowLeft className="h-4 w-4" />
              {content.back}
            </a>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {language === 'en' ? (siteContent.ownerName_en || siteContent.ownerName) : siteContent.ownerName}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {content.subtitle}
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 flex-wrap">
                <a href={`mailto:${siteContent.ownerEmail}`} className="text-accent hover:opacity-80 transition-smooth">
                  {siteContent.ownerEmail}
                </a>
                <span className="text-muted-foreground">•</span>
                <a href={`tel:${siteContent.ownerPhone}`} className="text-accent hover:opacity-80 transition-smooth">
                  {siteContent.ownerPhone}
                </a>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{language === 'en' ? (siteContent.ownerLocation_en || siteContent.ownerLocation) : siteContent.ownerLocation}</span>
              </div>
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = CV_FILE_PATH;
                  link.download = "CV_Nguyen_Manh_Dat.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="w-fit px-6 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {content.downloadCV}
              </button>
            </div>
          </div>

          {/* Content */}
          <div>
            {/* About Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">{content.introduction}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {(language === 'en'
                  ? (siteContent.introduction_en || '')
                  : (siteContent.introduction_vi || '')
                ).split('\n\n').map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>


            {/* Skills Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">{content.skills}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(siteContent.skills || []).map((skill: any, index: number) => {
                  // Handle both string format and object format
                  const skillName = typeof skill === 'string'
                    ? skill
                    : (language === 'en' ? (skill.name_en || skill.name) : skill.name);
                  const skillRating = typeof skill === 'object' ? (skill.rating || 4) : 4;

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-foreground font-medium">{skillName}</span>
                        <span className="text-sm text-muted-foreground">{skillRating}/5</span>
                      </div>
                      <div className="flex gap-1.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 flex-1 rounded-sm ${i < skillRating ? "bg-accent" : "bg-border"}`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Software Skills Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">{content.software}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(siteContent.softwareSkills || []).map((software: any, index: number) => (
                  <div key={index} className="bg-secondary p-4 rounded-lg border border-border text-center hover:bg-accent/10 transition-smooth">
                    <img src={`${import.meta.env.BASE_URL}${software.icon.replace(/^\//, '')}`} alt={software.name} className="w-12 h-12 mx-auto mb-2 object-contain" />
                    <p className="text-sm font-semibold text-foreground">{software.name}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">{content.experience}</h2>
              <div className="space-y-8">
                {siteContent.experiences.filter((exp: any) => exp.visible !== false).map((exp: any) => {
                  // Language-aware content
                  const expTitle = language === 'en' ? (exp.title_en || exp.title) : exp.title;
                  const expDescription = language === 'en' ? (exp.description_en || exp.description) : exp.description;
                  const expResponsibilities = language === 'en'
                    ? (exp.responsibilities_en || exp.responsibilities)
                    : exp.responsibilities;

                  return (
                    <div key={exp.id} className="border-l-2 border-accent pl-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-lg font-bold text-foreground">{expTitle}</h3>
                        <span className="text-sm text-muted-foreground">{exp.period}</span>
                      </div>
                      <p className="text-accent font-semibold mb-2">{exp.company}</p>
                      <p className="text-muted-foreground mb-3">{expDescription}</p>
                      <ul className="space-y-2">
                        {(expResponsibilities || []).map((resp: string, idx: number) => (
                          <li key={idx} className="text-sm text-muted-foreground flex gap-3">
                            <span className="text-accent mt-1">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Education Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">{content.education}</h2>
              <div className="border-l-2 border-accent pl-6">
                <h3 className="text-lg font-bold text-foreground">
                  {language === "vi" ? "Kỹ thuật xây dựng đường bộ và sân bay" : "Road and Airport Construction Engineering"}
                </h3>
                <p className="text-accent font-semibold mb-2">
                  {language === "vi" ? "Đại học Thủy Lợi" : "Thuyloi University"}
                </p>
                <p className="text-sm text-muted-foreground mb-2">09/2012 - 03/2017</p>
                <p className="text-muted-foreground">
                  {language === "vi" ? "Tốt nghiệp loại Khá (Trên trung bình)" : "Graduated with Good Honors (Above Average)"}
                </p>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 bg-background border-t border-border text-center text-muted-foreground">
          <p>© 2025 Nguyễn Mạnh Đạt. {content.allRightsReserved}</p>
        </footer>
      </div>
    </PageLayout>
  );
}
