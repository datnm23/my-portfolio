import { Link } from "wouter";
import { ArrowLeft, Mail, Phone, MapPin, Loader2, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OWNER_NAME, OWNER_EMAIL, OWNER_PHONE, OWNER_LOCATION, FORMSPREE_ID } from "@/const";
import { trackEvent } from "@/hooks/useGoogleAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PageLayout from "@/components/PageLayout";
import { toast } from "sonner";

export default function Contact() {
  const { language } = useLanguage();
  const { theme, toggleTheme, switchable } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    vi: {
      about: "Giới thiệu",
      portfolio: "Portfolio",
      contact: "Liên hệ",
      back: "Quay lại",
      title: "Liên hệ với tôi",
      description: "Bạn có câu hỏi hoặc muốn thảo luận về dự án? Hãy gửi tin nhắn cho tôi, tôi sẽ phản hồi trong vòng 24 giờ.",
      name: "Tên của bạn",
      email: "Email",
      subject: "Chủ đề",
      message: "Tin nhắn",
      send: "Gửi tin nhắn",
      sending: "Đang gửi...",
      contactInfo: "Thông tin liên hệ",
      responseTime: "Tôi sẽ cố gắng phản hồi tin nhắn của bạn trong vòng 24 giờ.",
      successMessage: "Tin nhắn đã được gửi thành công!",
      errorMessage: "Có lỗi xảy ra. Vui lòng thử lại.",
      allRightsReserved: "All rights reserved.",
    },
    en: {
      about: "About",
      portfolio: "Portfolio",
      contact: "Contact",
      back: "Back",
      title: "Contact Me",
      description: "Do you have questions or want to discuss a project? Send me a message, I'll respond within 24 hours.",
      name: "Your Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      contactInfo: "Contact Information",
      responseTime: "I will try to respond to your message within 24 hours.",
      successMessage: "Message sent successfully!",
      errorMessage: "An error occurred. Please try again.",
      allRightsReserved: "All rights reserved.",
    },
  };

  const content = translations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error(content.errorMessage);
      return;
    }

    setIsLoading(true);

    try {
      // Track form submission
      trackEvent("contact_form_submit", {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
      });

      // Submit to Formspree
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast.success(content.successMessage);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(content.errorMessage);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(content.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen flex flex-col">
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
                  <a className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                    {content.about}
                  </a>
                </Link>
                <Link href="/portfolio">
                  <a className="text-sm font-medium text-foreground hover:text-accent transition-smooth">
                    {language === "vi" ? "Kinh nghiệm" : "Experiences"}
                  </a>
                </Link>
                <Link href="/contact">
                  <a className="text-sm font-medium text-accent hover:text-accent/80 transition-smooth">
                    {content.contact}
                  </a>
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
              {content.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {content.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    {content.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={content.name}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    {content.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={content.email}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                    {content.subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={content.subject}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    {content.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder={content.message}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? content.sending : content.send}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <aside className="lg:col-span-1">
              <div className="bg-secondary p-6 rounded-lg border border-border sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-6">{content.contactInfo}</h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Mail className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{content.email}</p>
                      <a href={`mailto:${OWNER_EMAIL}`} className="text-accent hover:opacity-80 transition-smooth break-all">
                        {OWNER_EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{content.email}</p>
                      <a href={`tel:${OWNER_PHONE}`} className="text-accent hover:opacity-80 transition-smooth">
                        {OWNER_PHONE}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{content.email}</p>
                      <p className="text-foreground">{OWNER_LOCATION}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {content.responseTime}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-secondary border-t border-border mt-12">
          <div className="container py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-muted-foreground mb-4 md:mb-0">
                © 2025 {OWNER_NAME}. {content.allRightsReserved}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageLayout>
  );
}
