import { Link } from "wouter";
import { ArrowLeft, Plus, Trash2, Edit2, Save, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { OWNER_NAME, SAMPLE_DOCUMENTS, PORTFOLIO_CATEGORIES, SOCIAL_LINKS, GOOGLE_ANALYTICS_ID, FORMSPREE_ID } from "@/const";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { toast } from "sonner";

interface Document {
  id: number;
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  type: string;
  category: string;
  content: string;
  googleDriveId: string;
}

interface AdminConfig {
  socialLinks: typeof SOCIAL_LINKS;
  googleAnalyticsId: string;
  formspreeId: string;
}

export default function Admin() {
  const { isAuthenticated, password, setPassword, error, login, logout } = useAdminAuth();
  const [documents, setDocuments] = useState<Document[]>(SAMPLE_DOCUMENTS);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Document | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"documents" | "config">("documents");
  const [config, setConfig] = useState<AdminConfig>({
    socialLinks: SOCIAL_LINKS,
    googleAnalyticsId: GOOGLE_ANALYTICS_ID,
    formspreeId: FORMSPREE_ID,
  });
  const [newDoc, setNewDoc] = useState<Partial<Document>>({
    title: "",
    description: "",
    fileName: "",
    fileSize: "",
    type: "",
    category: "dutoan",
    content: "",
    googleDriveId: "",
  });

  const handleLogin = () => {
    if (login(password)) {
      toast.success("Đăng nhập thành công!");
    } else {
      toast.error("Mật khẩu không chính xác!");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Đã đăng xuất!");
  };

  const handleEdit = (doc: Document) => {
    setEditingId(doc.id);
    setEditForm({ ...doc });
  };

  const handleSaveEdit = () => {
    if (editForm) {
      setDocuments(documents.map(d => d.id === editForm.id ? editForm : d));
      setEditingId(null);
      setEditForm(null);
      toast.success("Cập nhật tài liệu thành công!");
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa tài liệu này?")) {
      setDocuments(documents.filter(d => d.id !== id));
      toast.success("Xóa tài liệu thành công!");
    }
  };

  const handleAddDocument = () => {
    if (!newDoc.title || !newDoc.googleDriveId) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const doc: Document = {
      id: Math.max(...documents.map(d => d.id), 0) + 1,
      title: newDoc.title || "",
      description: newDoc.description || "",
      fileName: newDoc.fileName || "",
      fileSize: newDoc.fileSize || "",
      type: newDoc.type || "",
      category: newDoc.category || "dutoan",
      content: newDoc.content || "",
      googleDriveId: newDoc.googleDriveId || "",
    };

    setDocuments([...documents, doc]);
    setNewDoc({
      title: "",
      description: "",
      fileName: "",
      fileSize: "",
      type: "",
      category: "dutoan",
      content: "",
      googleDriveId: "",
    });
    setShowAddForm(false);
    toast.success("Thêm tài liệu thành công!");
  };

  const handleConfigChange = (field: string, value: string) => {
    if (field.startsWith("social_")) {
      const socialField = field.replace("social_", "");
      setConfig({
        ...config,
        socialLinks: {
          ...config.socialLinks,
          [socialField]: value,
        },
      });
    } else {
      setConfig({
        ...config,
        [field]: value,
      });
    }
  };

  const handleSaveConfig = () => {
    toast.success("Cấu hình đã được cập nhật! Vui lòng cập nhật thủ công trong shared/const.ts");
    console.log("Config to update:", config);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <nav className="sticky top-0 z-50 bg-background border-b border-border">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/">
              <a className="text-2xl font-bold text-accent hover:opacity-80 transition-smooth">
                {OWNER_NAME.split(" ")[2]}
              </a>
            </Link>
          </div>
        </nav>

        <main className="flex-1 container py-12 md:py-20 flex items-center justify-center">
          <div className="max-w-md w-full bg-secondary p-8 rounded-lg border border-border">
            <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Admin Panel</h1>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Nhập mật khẩu"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                onClick={handleLogin}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-accent hover:opacity-80 transition-smooth">
              {OWNER_NAME.split(" ")[2]}
            </a>
          </Link>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Đăng xuất
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container py-12 md:py-20">
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-accent hover:opacity-80 transition-smooth mb-8">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </a>
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-8">Admin Panel</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-2 font-semibold transition-smooth ${
              activeTab === "documents"
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Quản lý Tài liệu
          </button>
          <button
            onClick={() => setActiveTab("config")}
            className={`px-4 py-2 font-semibold transition-smooth ${
              activeTab === "config"
                ? "text-accent border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Cấu hình
          </button>
        </div>

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Tài liệu mẫu</h2>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm tài liệu
              </Button>
            </div>

            {/* Add Form */}
            {showAddForm && (
              <div className="bg-secondary p-6 rounded-lg border border-border mb-8">
                <h3 className="text-lg font-bold text-foreground mb-4">Thêm tài liệu mới</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Tiêu đề"
                    value={newDoc.title || ""}
                    onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Tên file"
                    value={newDoc.fileName || ""}
                    onChange={(e) => setNewDoc({ ...newDoc, fileName: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Kích thước file"
                    value={newDoc.fileSize || ""}
                    onChange={(e) => setNewDoc({ ...newDoc, fileSize: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                  <select
                    value={newDoc.category || "dutoan"}
                    onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    {PORTFOLIO_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name_vi}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Google Drive ID"
                    value={newDoc.googleDriveId || ""}
                    onChange={(e) => setNewDoc({ ...newDoc, googleDriveId: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground col-span-2"
                  />
                  <textarea
                    placeholder="Mô tả"
                    value={newDoc.description || ""}
                    onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground col-span-2"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={handleAddDocument}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Lưu
                  </Button>
                  <Button
                    onClick={() => setShowAddForm(false)}
                    variant="outline"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Hủy
                  </Button>
                </div>
              </div>
            )}

            {/* Documents List */}
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-secondary p-6 rounded-lg border border-border">
                  {editingId === doc.id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editForm?.title || ""}
                        onChange={(e) => setEditForm({ ...editForm!, title: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                      />
                      <textarea
                        value={editForm?.description || ""}
                        onChange={(e) => setEditForm({ ...editForm!, description: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                        rows={3}
                      />
                      <input
                        type="text"
                        value={editForm?.googleDriveId || ""}
                        onChange={(e) => setEditForm({ ...editForm!, googleDriveId: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                        placeholder="Google Drive ID"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSaveEdit}
                          className="bg-accent text-accent-foreground hover:bg-accent/90"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Lưu
                        </Button>
                        <Button
                          onClick={() => setEditingId(null)}
                          variant="outline"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Hủy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{doc.title}</h3>
                      <p className="text-muted-foreground mb-4">{doc.description}</p>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(doc)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Sửa
                        </Button>
                        <Button
                          onClick={() => handleDelete(doc.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Config Tab */}
        {activeTab === "config" && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Cấu hình</h2>
            
            <div className="space-y-8">
              {/* Social Links */}
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Mạng xã hội</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">LinkedIn</label>
                    <input
                      type="text"
                      value={config.socialLinks.linkedin || ""}
                      onChange={(e) => handleConfigChange("social_linkedin", e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                      placeholder="https://www.linkedin.com/in/your-profile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">GitHub</label>
                    <input
                      type="text"
                      value={config.socialLinks.github || ""}
                      onChange={(e) => handleConfigChange("social_github", e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                      placeholder="https://github.com/your-profile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Facebook</label>
                    <input
                      type="text"
                      value={config.socialLinks.facebook || ""}
                      onChange={(e) => handleConfigChange("social_facebook", e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                      placeholder="https://www.facebook.com/your-profile"
                    />
                  </div>
                </div>
              </div>

              {/* Google Analytics */}
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Google Analytics</h3>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">GA ID</label>
                  <input
                    type="text"
                    value={config.googleAnalyticsId}
                    onChange={(e) => handleConfigChange("googleAnalyticsId", e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
              </div>

              {/* Formspree */}
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Formspree</h3>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Formspree ID</label>
                  <input
                    type="text"
                    value={config.formspreeId}
                    onChange={(e) => handleConfigChange("formspreeId", e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    placeholder="example@formspree.io"
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveConfig}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Lưu cấu hình
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
