import React, { useState } from 'react';
import { Download, Upload, Trash2, FileText, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadFile } from '@/lib/assets';

interface CvManagerProps {
  currentCvPath?: string;
  cvExists: boolean;
  onUpload: (file: File) => Promise<void>;
  onDelete: () => Promise<void>;
  uploading?: boolean;
}

export default function CvManager({
  currentCvPath,
  cvExists,
  onUpload,
  onDelete,
  uploading = false
}: CvManagerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  console.log('CvManager rendered with:', { currentCvPath, cvExists, uploading });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert("Chỉ chấp nhận file PDF!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File CV không được quá 5MB!");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        await onUpload(selectedFile);
        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById('cv-file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
  };

  const handleDownload = () => {
    if (cvExists && currentCvPath) {
      downloadFile(currentCvPath.replace(/^\//, ''));
    }
  };

  return (
    <div className="space-y-6">
      {/* Current CV Status */}
      <div className="bg-background rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          CV hiện tại
        </h3>
        
        {cvExists && currentCvPath ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">
                {currentCvPath.split('/').pop() || 'CV_Nguyen_Manh_Dat.pdf'}
              </p>
              <p className="text-sm text-muted-foreground">
                Đường dẫn: {currentCvPath}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDownload} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Tải xuống
              </Button>
              <Button 
                onClick={onDelete} 
                variant="outline" 
                size="sm"
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">Chưa có CV nào được tìm thấy</p>
          </div>
        )}
      </div>

      {/* Upload New CV */}
      <div className="bg-background rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold mb-3">Upload CV mới</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="cv-file-input" className="block text-sm font-medium mb-2">
              Chọn file PDF
            </label>
            <input
              id="cv-file-input"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-accent-foreground hover:file:bg-accent/90 border border-border rounded-lg"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Chỉ chấp nhận file PDF, tối đa 5MB
            </p>
          </div>

          {selectedFile && (
            <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="w-full"
          >
            {uploading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Đang upload...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload CV
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-4">
        <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
          Hướng dẫn sử dụng
        </h4>
        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
          <li>• CV sẽ được hiển thị trên trang "Giới thiệu" với nút "Tải CV"</li>
          <li>• File CV cũ sẽ được thay thế khi upload file mới</li>
          <li>• Đảm bảo file CV có tên phù hợp và nội dung cập nhật</li>
          <li>• CV sẽ được lưu trong thư mục public của website</li>
        </ul>
      </div>
    </div>
  );
}
