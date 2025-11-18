import { useState, useEffect } from "react";

type Language = "vi" | "en";

const translations = {
  vi: {
    home: "Trang chủ",
    about: "Giới thiệu",
    portfolio: "Portfolio",
    contact: "Liên hệ",
    downloadCV: "Tải CV",
    introduction: "Giới thiệu",
    skills: "Kỹ năng chuyên môn",
    software: "Phần mềm & Công cụ",
    experience: "Kinh nghiệm làm việc",
    education: "Học vấn",
    connect: "Kết nối",
    info: "Thông tin",
    email: "Email",
    phone: "Điện thoại",
    address: "Địa chỉ",
    backHome: "Quay lại",
    sendMessage: "Gửi tin nhắn",
    contactInfo: "Thông tin liên hệ",
    responseTime: "Tôi sẽ cố gắng phản hồi tin nhắn của bạn trong vòng 24 giờ.",
    allRightsReserved: "All rights reserved.",
  },
  en: {
    home: "Home",
    about: "About",
    portfolio: "Portfolio",
    contact: "Contact",
    downloadCV: "Download CV",
    introduction: "Introduction",
    skills: "Professional Skills",
    software: "Software & Tools",
    experience: "Work Experience",
    education: "Education",
    connect: "Connect",
    info: "Information",
    email: "Email",
    phone: "Phone",
    address: "Address",
    backHome: "Back",
    sendMessage: "Send Message",
    contactInfo: "Contact Information",
    responseTime: "I will try to respond to your message within 24 hours.",
    allRightsReserved: "All rights reserved.",
  },
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>("vi");

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && (savedLanguage === "vi" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: keyof typeof translations.vi): string => {
    return translations[language][key] || translations.vi[key];
  };

  return { language, changeLanguage, t };
};

export default useLanguage;
