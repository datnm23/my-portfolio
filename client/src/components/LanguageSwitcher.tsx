
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex gap-1">
      <button
        onClick={() => changeLanguage("vi")}
        className={`px-2 py-1 text-xs font-semibold rounded transition-smooth ${
          language === "vi"
            ? "bg-accent text-accent-foreground"
            : "bg-secondary text-foreground hover:bg-secondary/80"
        }`}
      >
        VI
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`px-2 py-1 text-xs font-semibold rounded transition-smooth ${
          language === "en"
            ? "bg-accent text-accent-foreground"
            : "bg-secondary text-foreground hover:bg-secondary/80"
        }`}
      >
        EN
      </button>
    </div>
  );
}
