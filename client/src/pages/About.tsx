import { ArrowLeft, Download } from "lucide-react";
import { OWNER_NAME, OWNER_EMAIL, OWNER_PHONE, OWNER_LOCATION, SKILLS, EXPERIENCES, CV_FILE_PATH, SOFTWARE_SKILLS } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "wouter";

export default function About() {
  const { language } = useLanguage();

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
      introText1: "Tôi là một kỹ sư dự toán xây dựng với hơn 7 năm kinh nghiệm trong lĩnh vực xây dựng cơ sở hạ tầng, dân dụng và công nghiệp. Chuyên môn của tôi bao gồm bóc tách khối lượng, lập hồ sơ dự thầu, thanh quyết toán công trình, và quản lý dự án.",
      introText2: "Tôi đã làm việc với nhiều công ty xây dựng hàng đầu, tham gia vào các dự án quy mô lớn từ cơ sở hạ tầng đến các tòa nhà cao tầng. Với kinh nghiệm này, tôi có khả năng xử lý các dự án phức tạp, đảm bảo tính chính xác và hiệu quả trong mọi khía cạnh của công việc.",
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
      introText1: "I am a construction cost engineer with over 7 years of experience in infrastructure, civil, and industrial construction. My expertise includes quantity surveying, bid preparation, project settlement, and project management.",
      introText2: "I have worked with leading construction companies, participating in large-scale projects from infrastructure to high-rise buildings. With this experience, I can handle complex projects, ensuring accuracy and efficiency in all aspects of the work.",
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

  // Skill ratings (1-5)
  const skillRatings = [
    { name: language === "vi" ? "Bóc tách khối lượng" : "Quantity Surveying", rating: 5 },
    { name: language === "vi" ? "Lập hồ sơ dự thầu" : "Bid Preparation", rating: 5 },
    { name: language === "vi" ? "Thanh quyết toán" : "Project Settlement", rating: 5 },
    { name: language === "vi" ? "Quản lý dự án" : "Project Management", rating: 4 },
    { name: language === "vi" ? "Microsoft Office" : "Microsoft Office", rating: 5 },
    { name: language === "vi" ? "AutoCAD" : "AutoCAD", rating: 4 },
    { name: language === "vi" ? "G8" : "G8", rating: 4 },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < rating ? "bg-accent" : "bg-border"
            }`}
          />
        ))}
      </div>
    );
  };

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
                <a className="text-foreground hover:text-accent transition-smooth font-semibold text-accent">{content.about}</a>
              </Link>
              <Link href="/portfolio">
                <a className="text-foreground hover:text-accent transition-smooth">{content.portfolio}</a>
              </Link>
              <Link href="/contact">
                <a className="text-foreground hover:text-accent transition-smooth">{content.contact}</a>
              </Link>
            </div>
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
            {OWNER_NAME}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {content.subtitle}
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 flex-wrap">
              <a href={`mailto:${OWNER_EMAIL}`} className="text-accent hover:opacity-80 transition-smooth">
                {OWNER_EMAIL}
              </a>
              <span className="text-muted-foreground">•</span>
              <a href={`tel:${OWNER_PHONE}`} className="text-accent hover:opacity-80 transition-smooth">
                {OWNER_PHONE}
              </a>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{OWNER_LOCATION}</span>
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
        <div className="max-w-4xl">
          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">{content.introduction}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{content.introText1}</p>
              <p>{content.introText2}</p>
            </div>
          </section>

          {/* Skills Section with Ratings */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">{content.skills}</h2>
            <div className="space-y-6">
              {skillRatings.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-foreground font-medium min-w-fit pr-4">{skill.name}</span>
                  <div className="flex-1">
                    {renderStars(skill.rating)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Software Skills Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">{content.software}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {SOFTWARE_SKILLS.map((software, index) => (
                <div key={index} className="bg-secondary p-4 rounded-lg border border-border text-center hover:bg-accent/10 transition-smooth">
                  <div className="text-4xl mb-2">{software.icon}</div>
                  <p className="text-sm font-semibold text-foreground">{software.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">{content.experience}</h2>
            <div className="space-y-8">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="border-l-2 border-accent pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-accent font-semibold mb-2">{exp.company}</p>
                  <p className="text-muted-foreground mb-3">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
  );
}
