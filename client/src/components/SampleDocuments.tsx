import { Download, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface SampleDocumentsProps {
  category?: string;
}

export default function SampleDocuments({ category = "dutoan" }: SampleDocumentsProps) {
  const { content: siteContent } = useContent();
  const { language } = useLanguage();

  const handleDownload = (fileName: string) => {
    const link = document.createElement("a");
    link.href = `/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (googleDriveId: string) => {
    // Mở file trong Google Sheets Viewer từ Google Drive
    const viewerUrl = `https://docs.google.com/spreadsheets/d/${googleDriveId}/edit?usp=sharing`;
    window.open(viewerUrl, "_blank");
  };

  const filteredDocuments = siteContent.documents.filter(doc => doc.category === category);

  const t = {
    preview: language === "vi" ? "Xem trước" : "Preview",
    download: language === "vi" ? "Tải xuống" : "Download",
    content: language === "vi" ? "Nội dung" : "Content",
    noDocuments: language === "vi" ? "Không có tài liệu cho danh mục này" : "No documents for this category",
  };

  return (
    <div>
      {/* Documents Grid - Same style as Project Cards */}
      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDocuments.map((doc: any) => {
            // Language-aware content
            const docTitle = language === 'en' ? (doc.title_en || doc.title) : doc.title;
            const docType = language === 'en' ? (doc.type_en || doc.type) : doc.type;
            const docDescription = language === 'en' ? (doc.description_en || doc.description) : doc.description;
            const docContent = language === 'en' ? (doc.content_en || doc.content) : doc.content;

            return (
              <div
                key={doc.id}
                className="group bg-background border-2 border-border rounded-lg overflow-hidden hover:border-accent hover:shadow-xl transition-all duration-300"
              >
                {/* Document Header - Same style as Project Header */}
                <div className="p-6 border-b border-border bg-secondary/30">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <FileText className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-smooth">
                        {docTitle}
                      </h3>
                    </div>
                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold whitespace-nowrap">
                      {docType}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{doc.fileSize}</p>
                </div>

                {/* Document Body - Same style as Project Body */}
                <div className="p-6 space-y-4">
                  <p className="text-foreground/80">{docDescription}</p>

                  {/* Content Info */}
                  {docContent && (
                    <div className="p-3 bg-secondary rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        {t.content}
                      </p>
                      <p className="text-sm text-foreground">{docContent}</p>
                    </div>
                  )}

                  {/* Actions - Same button style */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handlePreview(doc.googleDriveId)}
                      variant="outline"
                      className="flex-1 group-hover:border-accent group-hover:text-accent"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t.preview}
                    </Button>
                    <Button
                      onClick={() => handleDownload(doc.fileName)}
                      className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {t.download}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">{t.noDocuments}</p>
        </div>
      )}
    </div>
  );
}
