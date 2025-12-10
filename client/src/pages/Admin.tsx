import { Link } from "wouter";
import { ArrowLeft, Plus, Trash2, Edit2, Save, X, LogOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OWNER_NAME, PORTFOLIO_CATEGORIES } from "@/const";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useContent } from "@/contexts/ContentContext";
import { toast } from "sonner";

type TabType = "about" | "experiences" | "projects" | "documents" | "config";

export default function Admin() {
  const { isAuthenticated, password, setPassword, error, login, logout } = useAdminAuth();
  const { content, updateContent, resetToDefaults } = useContent();
  const [activeTab, setActiveTab] = useState<TabType>("about");

  // Edit states
  const [editingExpId, setEditingExpId] = useState<number | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [editingDocId, setEditingDocId] = useState<number | null>(null);

  // Form states
  const [showAddExp, setShowAddExp] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddDoc, setShowAddDoc] = useState(false);

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

  const handleReset = () => {
    if (confirm("Đặt lại tất cả nội dung về mặc định? Hành động này không thể hoàn tác.")) {
      resetToDefaults();
      toast.success("Đã đặt lại nội dung về mặc định!");
    }
  };

  // Skills handlers
  const handleAddSkill = () => {
    const skill = prompt("Nhập kỹ năng mới:");
    if (skill) {
      updateContent({ skills: [...content.skills, skill] });
      toast.success("Đã thêm kỹ năng!");
    }
  };

  const handleDeleteSkill = (index: number) => {
    updateContent({ skills: content.skills.filter((_, i) => i !== index) });
    toast.success("Đã xóa kỹ năng!");
  };

  // Experience handlers
  const handleAddExperience = () => {
    const newExp = {
      id: Date.now(),
      title: "Chức vụ mới",
      company: "Công ty",
      period: "MM/YYYY - MM/YYYY",
      description: "Mô tả công việc",
      responsibilities: ["Nhiệm vụ 1"],
    };
    updateContent({ experiences: [...content.experiences, newExp] });
    setEditingExpId(newExp.id);
    setShowAddExp(false);
    toast.success("Đã thêm kinh nghiệm!");
  };

  const handleUpdateExperience = (id: number, updates: Partial<typeof content.experiences[0]>) => {
    updateContent({
      experiences: content.experiences.map(e => e.id === id ? { ...e, ...updates } : e)
    });
  };

  const handleDeleteExperience = (id: number) => {
    if (confirm("Xóa kinh nghiệm này?")) {
      updateContent({ experiences: content.experiences.filter(e => e.id !== id) });
      toast.success("Đã xóa kinh nghiệm!");
    }
  };

  // Project handlers
  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      title: "Dự án mới",
      location: "Địa điểm",
      year: "2024",
      description: "Mô tả dự án",
      role_vi: "Vai trò",
      role_en: "Role",
      category: "dutoan",
      responsibilities_vi: ["Nhiệm vụ 1"],
      responsibilities_en: ["Task 1"],
      highlights_vi: ["Điểm nổi bật 1"],
      highlights_en: ["Highlight 1"],
    };
    updateContent({ projects: [...content.projects, newProject] });
    setEditingProjectId(newProject.id);
    setShowAddProject(false);
    toast.success("Đã thêm dự án!");
  };

  const handleUpdateProject = (id: number, updates: Partial<typeof content.projects[0]>) => {
    updateContent({
      projects: content.projects.map(p => p.id === id ? { ...p, ...updates } : p)
    });
  };

  const handleDeleteProject = (id: number) => {
    if (confirm("Xóa dự án này?")) {
      updateContent({ projects: content.projects.filter(p => p.id !== id) });
      toast.success("Đã xóa dự án!");
    }
  };

  // Document handlers
  const handleAddDocument = () => {
    const newDoc = {
      id: Date.now(),
      title: "Tài liệu mới",
      description: "Mô tả tài liệu",
      fileName: "file.xlsx",
      fileSize: "100 KB",
      type: "Hồ sơ",
      category: "dutoan",
      content: "Nội dung",
      googleDriveId: "",
    };
    updateContent({ documents: [...content.documents, newDoc] });
    setEditingDocId(newDoc.id);
    setShowAddDoc(false);
    toast.success("Đã thêm tài liệu!");
  };

  const handleUpdateDocument = (id: number, updates: Partial<typeof content.documents[0]>) => {
    updateContent({
      documents: content.documents.map(d => d.id === id ? { ...d, ...updates } : d)
    });
  };

  const handleDeleteDocument = (id: number) => {
    if (confirm("Xóa tài liệu này?")) {
      updateContent({ documents: content.documents.filter(d => d.id !== id) });
      toast.success("Đã xóa tài liệu!");
    }
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
          <div className="flex gap-2">
            <Button onClick={handleReset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-accent hover:opacity-80 transition-smooth mb-6">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </a>
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-6">Quản lý nội dung</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4">
          {[
            { id: "about", label: "Thông tin cá nhân" },
            { id: "experiences", label: "Kinh nghiệm" },
            { id: "projects", label: "Dự án" },
            { id: "documents", label: "Tài liệu" },
            { id: "config", label: "Cấu hình" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-2 rounded-lg font-medium transition-smooth ${activeTab === tab.id
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* About Tab */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <div className="bg-secondary p-6 rounded-lg border border-border">
              <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Họ tên</label>
                  <input
                    type="text"
                    value={content.ownerName}
                    onChange={(e) => updateContent({ ownerName: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={content.ownerEmail}
                    onChange={(e) => updateContent({ ownerEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    value={content.ownerPhone}
                    onChange={(e) => updateContent({ ownerPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Địa chỉ</label>
                  <input
                    type="text"
                    value={content.ownerLocation}
                    onChange={(e) => updateContent({ ownerLocation: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-lg border border-border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Kỹ năng</h2>
                <Button onClick={handleAddSkill} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {content.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 bg-background px-3 py-1 rounded-full border border-border">
                    <span>{skill}</span>
                    <button onClick={() => handleDeleteSkill(index)} className="text-red-500 hover:text-red-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-lg border border-border">
              <h2 className="text-xl font-bold mb-4">Mạng xã hội</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={content.socialLinks.linkedin}
                    onChange={(e) => updateContent({ socialLinks: { ...content.socialLinks, linkedin: e.target.value } })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">GitHub</label>
                  <input
                    type="url"
                    value={content.socialLinks.github}
                    onChange={(e) => updateContent({ socialLinks: { ...content.socialLinks, github: e.target.value } })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Facebook</label>
                  <input
                    type="url"
                    value={content.socialLinks.facebook}
                    onChange={(e) => updateContent({ socialLinks: { ...content.socialLinks, facebook: e.target.value } })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Experiences Tab */}
        {activeTab === "experiences" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Kinh nghiệm làm việc</h2>
              <Button onClick={handleAddExperience}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm kinh nghiệm
              </Button>
            </div>

            {content.experiences.map((exp) => (
              <div key={exp.id} className="bg-secondary p-6 rounded-lg border border-border">
                {editingExpId === exp.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => handleUpdateExperience(exp.id, { title: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background font-bold"
                      placeholder="Chức vụ"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleUpdateExperience(exp.id, { company: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      placeholder="Công ty"
                    />
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => handleUpdateExperience(exp.id, { period: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      placeholder="Thời gian (VD: 01/2020 - 12/2022)"
                    />
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleUpdateExperience(exp.id, { description: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      placeholder="Mô tả"
                      rows={2}
                    />
                    <div>
                      <label className="block text-sm font-medium mb-2">Nhiệm vụ (mỗi dòng 1 nhiệm vụ)</label>
                      <textarea
                        value={exp.responsibilities.join("\n")}
                        onChange={(e) => handleUpdateExperience(exp.id, { responsibilities: e.target.value.split("\n").filter(r => r.trim()) })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        rows={4}
                      />
                    </div>
                    <Button onClick={() => setEditingExpId(null)} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Xong
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{exp.title}</h3>
                        <p className="text-accent">{exp.company}</p>
                        <p className="text-muted-foreground text-sm">{exp.period}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => setEditingExpId(exp.id)} variant="outline" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleDeleteExperience(exp.id)} variant="outline" size="sm" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2">{exp.description}</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Dự án</h2>
              <Button onClick={handleAddProject}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm dự án
              </Button>
            </div>

            {content.projects.map((project) => (
              <div key={project.id} className="bg-secondary p-6 rounded-lg border border-border">
                {editingProjectId === project.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleUpdateProject(project.id, { title: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        placeholder="Tên dự án"
                      />
                      <input
                        type="text"
                        value={project.location}
                        onChange={(e) => handleUpdateProject(project.id, { location: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        placeholder="Địa điểm"
                      />
                      <input
                        type="text"
                        value={project.year}
                        onChange={(e) => handleUpdateProject(project.id, { year: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        placeholder="Năm"
                      />
                      <select
                        value={project.category}
                        onChange={(e) => handleUpdateProject(project.id, { category: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      >
                        {PORTFOLIO_CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name_vi}</option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleUpdateProject(project.id, { description: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      placeholder="Mô tả"
                      rows={2}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={project.role_vi}
                        onChange={(e) => handleUpdateProject(project.id, { role_vi: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        placeholder="Vai trò (VI)"
                      />
                      <input
                        type="text"
                        value={project.role_en}
                        onChange={(e) => handleUpdateProject(project.id, { role_en: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        placeholder="Role (EN)"
                      />
                    </div>
                    <Button onClick={() => setEditingProjectId(null)} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Xong
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{project.title}</h3>
                        <p className="text-accent">{project.location} • {project.year}</p>
                        <span className="inline-block mt-1 px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                          {PORTFOLIO_CATEGORIES.find(c => c.id === project.category)?.name_vi || project.category}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => setEditingProjectId(project.id)} variant="outline" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleDeleteProject(project.id)} variant="outline" size="sm" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Tài liệu mẫu</h2>
              <Button onClick={handleAddDocument}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm tài liệu
              </Button>
            </div>

            {content.documents.map((doc) => (
              <div key={doc.id} className="bg-secondary p-6 rounded-lg border border-border">
                {editingDocId === doc.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={doc.title}
                      onChange={(e) => handleUpdateDocument(doc.id, { title: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      placeholder="Tiêu đề"
                    />
                    <textarea
                      value={doc.description}
                      onChange={(e) => handleUpdateDocument(doc.id, { description: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      placeholder="Mô tả"
                      rows={2}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        value={doc.fileName}
                        onChange={(e) => handleUpdateDocument(doc.id, { fileName: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        placeholder="Tên file"
                      />
                      <input
                        type="text"
                        value={doc.fileSize}
                        onChange={(e) => handleUpdateDocument(doc.id, { fileSize: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        placeholder="Kích thước"
                      />
                      <select
                        value={doc.category}
                        onChange={(e) => handleUpdateDocument(doc.id, { category: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      >
                        {PORTFOLIO_CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name_vi}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="text"
                      value={doc.googleDriveId}
                      onChange={(e) => handleUpdateDocument(doc.id, { googleDriveId: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      placeholder="Google Drive ID"
                    />
                    <Button onClick={() => setEditingDocId(null)} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Xong
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{doc.title}</h3>
                        <p className="text-muted-foreground text-sm">{doc.fileName} • {doc.fileSize}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => setEditingDocId(doc.id)} variant="outline" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleDeleteDocument(doc.id)} variant="outline" size="sm" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{doc.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Config Tab */}
        {activeTab === "config" && (
          <div className="space-y-6">
            <div className="bg-secondary p-6 rounded-lg border border-border">
              <h2 className="text-xl font-bold mb-4">Hướng dẫn</h2>
              <div className="text-muted-foreground space-y-2">
                <p>• Tất cả thay đổi được lưu tự động vào localStorage của trình duyệt.</p>
                <p>• Dữ liệu sẽ được giữ nguyên khi refresh trang.</p>
                <p>• Nhấn nút "Reset" ở góc trên để đặt lại về mặc định.</p>
                <p>• Dữ liệu chỉ lưu trên trình duyệt này, không đồng bộ giữa các thiết bị.</p>
              </div>
            </div>

            <div className="bg-secondary p-6 rounded-lg border border-border">
              <h2 className="text-xl font-bold mb-4">Thống kê nội dung</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-background rounded-lg">
                  <div className="text-3xl font-bold text-accent">{content.skills.length}</div>
                  <div className="text-sm text-muted-foreground">Kỹ năng</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg">
                  <div className="text-3xl font-bold text-accent">{content.experiences.length}</div>
                  <div className="text-sm text-muted-foreground">Kinh nghiệm</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg">
                  <div className="text-3xl font-bold text-accent">{content.projects.length}</div>
                  <div className="text-sm text-muted-foreground">Dự án</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg">
                  <div className="text-3xl font-bold text-accent">{content.documents.length}</div>
                  <div className="text-sm text-muted-foreground">Tài liệu</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
