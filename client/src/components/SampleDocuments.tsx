import { Download, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SAMPLE_DOCUMENTS } from "@/const";

interface SampleDocumentsProps {
  category?: string;
}

export default function SampleDocuments({ category = "dutoan" }: SampleDocumentsProps) {
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

  const filteredDocuments = SAMPLE_DOCUMENTS.filter(doc => doc.category === category);

  return (
    <div>
      {/* Documents Grid */}
      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-secondary rounded-lg border border-border p-6 hover:border-accent transition-smooth flex flex-col"
            >
              {/* Header */}
              <div className="mb-4 flex items-start gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded mb-2">
                    {doc.type}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{doc.title}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                {doc.description}
              </p>

              {/* Content Info */}
              <div className="mb-4 p-3 bg-background rounded border border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Nội dung
                </p>
                <p className="text-sm text-foreground">{doc.content}</p>
              </div>

              {/* File Info */}
              <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
                <span>{doc.fileSize}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handlePreview(doc.googleDriveId)}
                  variant="outline"
                  className="flex-1"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Xem trước
                </Button>
                <Button
                  onClick={() => handleDownload(doc.fileName)}
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-secondary rounded-lg border border-border">
          <p className="text-muted-foreground">Không có tài liệu cho danh mục này</p>
        </div>
      )}
    </div>
  );
}
