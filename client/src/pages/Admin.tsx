import { Link } from "wouter";
import { ArrowLeft, Plus, Trash2, Edit2, Save, X, LogOut, RotateCcw, Cloud, CloudOff, RefreshCw, Check, AlertCircle, Eye, EyeOff, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { OWNER_NAME } from "@/const";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useContent } from "@/contexts/ContentContext";
import { toast } from "sonner";
import { getGistConfig, saveGistConfig, clearGistConfig, testGistConnection, GistConfig } from "@/lib/gistApi";

type TabType = "about" | "experiences" | "projects" | "documents" | "categories" | "config";

export default function Admin() {
  const { isAuthenticated, password, setPassword, error, login, logout } = useAdminAuth();
  const { content, updateContent, resetToDefaults, syncStatus, lastSynced, syncFromGist, syncToGist } = useContent();
  const [activeTab, setActiveTab] = useState<TabType>("about");

  // Gist config states
  const [gistId, setGistId] = useState("");
  const [gistToken, setGistToken] = useState("");
  const [gistConnected, setGistConnected] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);

  // Edit states
  const [editingExpId, setEditingExpId] = useState<number | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [editingDocId, setEditingDocId] = useState<number | null>(null);

  // Form states
  const [showAddExp, setShowAddExp] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddDoc, setShowAddDoc] = useState(false);

  // Load Gist config on mount
  useEffect(() => {
    const config = getGistConfig();
    if (config) {
      setGistId(config.gistId);
      setGistToken(config.token);
      setGistConnected(true);
    }
  }, []);

  // Gist handlers
  const handleTestGistConnection = async () => {
    if (!gistId || !gistToken) {
      toast.error("Vui lòng nhập Gist ID và Token");
      return;
    }
    setTestingConnection(true);
    const result = await testGistConnection({ gistId, token: gistToken });
    setTestingConnection(false);

    if (result.success) {
      saveGistConfig({ gistId, token: gistToken });
      setGistConnected(true);
      syncFromGist();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleDisconnectGist = () => {
    clearGistConfig();
    setGistConnected(false);
    setGistId("");
    setGistToken("");
    toast.success("Đã ngắt kết nối Gist");
  };

  const handleSyncToGist = async () => {
    const success = await syncToGist();
    if (success) {
      toast.success("Đã đồng bộ lên Gist!");
    } else {
      toast.error("Lỗi khi đồng bộ lên Gist");
    }
  };

  const handleSyncFromGist = async () => {
    const success = await syncFromGist();
    if (success) {
      toast.success("Đã tải dữ liệu từ Gist!");
    } else {
      toast.error("Lỗi khi tải từ Gist");
    }
  };

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
      visible: true,
    };
    updateContent({ experiences: [...content.experiences, newExp] });
    setEditingExpId(newExp.id);
    setShowAddExp(false);
    toast.success("Đã thêm kinh nghiệm!");
  };

  const handleToggleExperienceVisibility = (id: number) => {
    const exp = content.experiences.find(e => e.id === id);
    if (exp) {
      handleUpdateExperience(id, { visible: exp.visible === false ? true : false });
      toast.success(exp.visible === false ? "Đã hiện kinh nghiệm!" : "Đã ẩn kinh nghiệm!");
    }
  };

  const handleUpdateExperience = (id: number, updates: Partial<typeof content.experiences[0]>) => {
    updateContent({
      experiences: content.experiences.map(e => e.id === id ? { ...e, ...updates } : e)
    });
  };

  const handleMoveExperience = (id: number, direction: 'up' | 'down') => {
    const index = content.experiences.findIndex(e => e.id === id);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= content.experiences.length) return;

    const newExperiences = [...content.experiences];
    [newExperiences[index], newExperiences[newIndex]] = [newExperiences[newIndex], newExperiences[index]];
    updateContent({ experiences: newExperiences });
    toast.success("Đã di chuyển kinh nghiệm!");
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
      category: "dutoan", // deprecated
      categories: ["dutoan"],
      responsibilities_vi: ["Nhiệm vụ 1"],
      responsibilities_en: ["Task 1"],
      highlights_vi: ["Điểm nổi bật 1"],
      highlights_en: ["Highlight 1"],
      visible: true,
      documentIds: [],
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

  const handleToggleProjectVisibility = (id: number) => {
    const project = content.projects.find(p => p.id === id);
    if (project) {
      handleUpdateProject(id, { visible: !project.visible });
      toast.success(project.visible ? "Đã ẩn dự án!" : "Đã hiện dự án!");
    }
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

  // Category handlers
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  const handleAddCategory = () => {
    const newId = `cat_${Date.now()}`;
    const newCategory = {
      id: newId,
      name_vi: "Danh mục mới",
      name_en: "New Category",
      description_vi: "",
      description_en: "",
    };
    updateContent({ categories: [...(content.categories || []), newCategory] });
    setEditingCategoryId(newId);
    toast.success("Đã thêm danh mục!");
  };

  const handleUpdateCategory = (id: string, updates: Partial<typeof content.categories[0]>) => {
    updateContent({
      categories: (content.categories || []).map((c: typeof content.categories[0]) => c.id === id ? { ...c, ...updates } : c)
    });
  };

  const handleDeleteCategory = (id: string) => {
    // Check if category is in use
    const projectsUsingCategory = content.projects.filter((p: typeof content.projects[0]) => p.categories?.includes(id));
    const docsUsingCategory = content.documents.filter((d: typeof content.documents[0]) => d.category === id);

    if (projectsUsingCategory.length > 0 || docsUsingCategory.length > 0) {
      toast.error(`Không thể xóa! Danh mục đang được sử dụng bởi ${projectsUsingCategory.length} dự án và ${docsUsingCategory.length} tài liệu.`);
      return;
    }

    if (confirm("Xóa danh mục này?")) {
      updateContent({ categories: (content.categories || []).filter((c: typeof content.categories[0]) => c.id !== id) });
      toast.success("Đã xóa danh mục!");
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
            { id: "categories", label: "Danh mục" },
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

            {content.experiences.map((exp, index) => (
              <div key={exp.id} className={`bg-secondary p-6 rounded-lg border border-border ${exp.visible === false ? 'opacity-50' : ''}`}>
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
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{exp.title}</h3>
                          {exp.visible === false && (
                            <span className="text-xs bg-yellow-500/20 text-yellow-600 px-2 py-0.5 rounded">Ẩn</span>
                          )}
                        </div>
                        <p className="text-accent">{exp.company}</p>
                        <p className="text-muted-foreground text-sm">{exp.period}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleMoveExperience(exp.id, 'up')}
                          variant="outline"
                          size="sm"
                          disabled={index === 0}
                          title="Di chuyển lên"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleMoveExperience(exp.id, 'down')}
                          variant="outline"
                          size="sm"
                          disabled={index === content.experiences.length - 1}
                          title="Di chuyển xuống"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleToggleExperienceVisibility(exp.id)}
                          variant="outline"
                          size="sm"
                          title={exp.visible !== false ? "Ẩn kinh nghiệm" : "Hiện kinh nghiệm"}
                        >
                          {exp.visible !== false ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
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
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Danh mục (chọn nhiều)</label>
                      <div className="flex flex-wrap gap-3">
                        {(content.categories || []).map((cat: typeof content.categories[0]) => (
                          <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={project.categories?.includes(cat.id) || false}
                              onChange={(e) => {
                                const current = project.categories || [];
                                const updated = e.target.checked
                                  ? [...current, cat.id]
                                  : current.filter((c: string) => c !== cat.id);
                                handleUpdateProject(project.id, { categories: updated });
                              }}
                              className="w-4 h-4 rounded border-border"
                            />
                            <span className="text-sm">{cat.name_vi}</span>
                          </label>
                        ))}
                      </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Nhiệm vụ (VI) - mỗi dòng 1 nhiệm vụ</label>
                        <textarea
                          value={project.responsibilities_vi.join("\n")}
                          onChange={(e) => handleUpdateProject(project.id, { responsibilities_vi: e.target.value.split("\n") })}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                          rows={4}
                          placeholder="Nhiệm vụ 1&#10;Nhiệm vụ 2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Responsibilities (EN)</label>
                        <textarea
                          value={project.responsibilities_en.join("\n")}
                          onChange={(e) => handleUpdateProject(project.id, { responsibilities_en: e.target.value.split("\n") })}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                          rows={4}
                          placeholder="Task 1&#10;Task 2"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Điểm nổi bật (VI) - mỗi dòng 1 điểm</label>
                        <textarea
                          value={project.highlights_vi.join("\n")}
                          onChange={(e) => handleUpdateProject(project.id, { highlights_vi: e.target.value.split("\n") })}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                          rows={4}
                          placeholder="Điểm nổi bật 1&#10;Điểm nổi bật 2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Highlights (EN)</label>
                        <textarea
                          value={project.highlights_en.join("\n")}
                          onChange={(e) => handleUpdateProject(project.id, { highlights_en: e.target.value.split("\n") })}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                          rows={4}
                          placeholder="Highlight 1&#10;Highlight 2"
                        />
                      </div>
                    </div>

                    {/* Document Linking */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Tài liệu mẫu liên quan</label>
                      <div className="flex flex-wrap gap-2 p-3 bg-background border border-border rounded-lg max-h-32 overflow-y-auto">
                        {content.documents.length > 0 ? (
                          content.documents.map((doc: any) => (
                            <label
                              key={doc.id}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${(project.documentIds || []).includes(doc.id)
                                ? 'bg-accent/20 border-accent text-accent'
                                : 'bg-secondary border-border hover:border-accent/50'
                                }`}
                            >
                              <input
                                type="checkbox"
                                checked={(project.documentIds || []).includes(doc.id)}
                                onChange={(e) => {
                                  const currentIds = project.documentIds || [];
                                  if (e.target.checked) {
                                    handleUpdateProject(project.id, { documentIds: [...currentIds, doc.id] });
                                  } else {
                                    handleUpdateProject(project.id, { documentIds: currentIds.filter(id => id !== doc.id) });
                                  }
                                }}
                                className="hidden"
                              />
                              <span className="text-sm">{doc.title}</span>
                            </label>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">Không có tài liệu nào trong danh mục này</p>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Click để chọn/bỏ chọn tài liệu liên kết với dự án.
                      </p>
                    </div>

                    <Button onClick={() => setEditingProjectId(null)} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Xong
                    </Button>
                  </div>
                ) : (
                  <div className={project.visible === false ? "opacity-50" : ""}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{project.title}</h3>
                          {project.visible === false && (
                            <span className="text-xs bg-yellow-500/20 text-yellow-600 px-2 py-0.5 rounded">Ẩn</span>
                          )}
                        </div>
                        <p className="text-accent">{project.location} • {project.year}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(project.categories || []).map((catId: string) => (
                            <span key={catId} className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                              {(content.categories || []).find((c: typeof content.categories[0]) => c.id === catId)?.name_vi || catId}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleToggleProjectVisibility(project.id)}
                          variant="outline"
                          size="sm"
                          title={project.visible !== false ? "Ẩn dự án" : "Hiện dự án"}
                        >
                          {project.visible !== false ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
                        <Button onClick={() => setEditingProjectId(project.id)} variant="outline" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleDeleteProject(project.id)} variant="outline" size="sm" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{project.description}</p>

                    {/* Linked Documents Info */}
                    {project.documentIds && project.documentIds.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Tài liệu liên kết ({project.documentIds.length}):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {content.documents
                            .filter((doc: any) => project.documentIds?.includes(doc.id))
                            .map((doc: any) => (
                              <span
                                key={doc.id}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs rounded-lg"
                              >
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {doc.title}
                              </span>
                            ))
                          }
                        </div>
                      </div>
                    )}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={doc.fileName}
                        onChange={(e) => handleUpdateDocument(doc.id, { fileName: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        placeholder="Tên file (vd: mau-dutoan.xlsx)"
                      />
                      <input
                        type="text"
                        value={doc.fileSize}
                        onChange={(e) => handleUpdateDocument(doc.id, { fileSize: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        placeholder="Kích thước (vd: 150 KB)"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-muted-foreground">Danh mục</label>
                        <select
                          value={doc.category}
                          onChange={(e) => handleUpdateDocument(doc.id, { category: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        >
                          {(content.categories || []).map((cat: typeof content.categories[0]) => (
                            <option key={cat.id} value={cat.id}>{cat.name_vi}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-muted-foreground">Loại tài liệu</label>
                        <input
                          type="text"
                          value={doc.type}
                          onChange={(e) => handleUpdateDocument(doc.id, { type: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                          placeholder="Loại (vd: Bảng tính, Hồ sơ, Mẫu)"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-muted-foreground">Nội dung/Mô tả chi tiết</label>
                      <textarea
                        value={doc.content}
                        onChange={(e) => handleUpdateDocument(doc.id, { content: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        placeholder="Mô tả chi tiết về nội dung file"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-muted-foreground">Google Drive ID (để xem trước)</label>
                      <input
                        type="text"
                        value={doc.googleDriveId}
                        onChange={(e) => handleUpdateDocument(doc.id, { googleDriveId: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                        placeholder="ID từ link Google Drive/Sheets"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Lấy ID từ link: https://docs.google.com/spreadsheets/d/<strong>ID_Ở_ĐÂY</strong>/edit
                      </p>
                    </div>
                    <Button onClick={() => setEditingDocId(null)} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Xong
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{doc.title}</h3>
                          <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded">
                            {(content.categories || []).find((c: typeof content.categories[0]) => c.id === doc.category)?.name_vi || doc.category}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">{doc.fileName} • {doc.fileSize} • {doc.type}</p>
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
                    {doc.content && (
                      <p className="text-sm text-foreground/70 mt-2 italic">Nội dung: {doc.content}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Quản lý danh mục</h2>
              <Button onClick={handleAddCategory}>
                <Plus className="h-4 w-4 mr-2" /> Thêm danh mục
              </Button>
            </div>

            <div className="space-y-4">
              {(content.categories || []).map((cat: typeof content.categories[0]) => (
                <div key={cat.id} className="bg-secondary p-4 rounded-lg border border-border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      {/* ID */}
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium w-24 shrink-0">ID:</label>
                        {editingCategoryId === cat.id ? (
                          <input
                            type="text"
                            value={cat.id}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateCategory(cat.id, { id: e.target.value })}
                            className="flex-1 px-2 py-1 rounded border border-border bg-background text-sm"
                          />
                        ) : (
                          <code className="text-sm bg-background px-2 py-1 rounded">{cat.id}</code>
                        )}
                      </div>

                      {/* Name VI */}
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium w-24 shrink-0">Tên (VI):</label>
                        {editingCategoryId === cat.id ? (
                          <input
                            type="text"
                            value={cat.name_vi}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateCategory(cat.id, { name_vi: e.target.value })}
                            className="flex-1 px-2 py-1 rounded border border-border bg-background text-sm"
                          />
                        ) : (
                          <span className="text-sm">{cat.name_vi}</span>
                        )}
                      </div>

                      {/* Name EN */}
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium w-24 shrink-0">Tên (EN):</label>
                        {editingCategoryId === cat.id ? (
                          <input
                            type="text"
                            value={cat.name_en}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateCategory(cat.id, { name_en: e.target.value })}
                            className="flex-1 px-2 py-1 rounded border border-border bg-background text-sm"
                          />
                        ) : (
                          <span className="text-sm">{cat.name_en}</span>
                        )}
                      </div>

                      {/* Description VI */}
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium w-24 shrink-0">Mô tả (VI):</label>
                        {editingCategoryId === cat.id ? (
                          <input
                            type="text"
                            value={cat.description_vi || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateCategory(cat.id, { description_vi: e.target.value })}
                            className="flex-1 px-2 py-1 rounded border border-border bg-background text-sm"
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">{cat.description_vi || "—"}</span>
                        )}
                      </div>

                      {/* Description EN */}
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium w-24 shrink-0">Mô tả (EN):</label>
                        {editingCategoryId === cat.id ? (
                          <input
                            type="text"
                            value={cat.description_en || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateCategory(cat.id, { description_en: e.target.value })}
                            className="flex-1 px-2 py-1 rounded border border-border bg-background text-sm"
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">{cat.description_en || "—"}</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingCategoryId(editingCategoryId === cat.id ? null : cat.id)}
                      >
                        {editingCategoryId === cat.id ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Usage info */}
                  <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                    Đang được sử dụng bởi: {content.projects.filter((p: typeof content.projects[0]) => p.categories?.includes(cat.id)).length} dự án, {content.documents.filter((d: typeof content.documents[0]) => d.category === cat.id).length} tài liệu
                  </div>
                </div>
              ))}

              {(!content.categories || content.categories.length === 0) && (
                <div className="text-center py-8 text-muted-foreground">
                  Chưa có danh mục nào. Nhấn "Thêm danh mục" để tạo mới.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Config Tab */}
        {activeTab === "config" && (
          <div className="space-y-6">
            {/* GitHub Gist Configuration */}
            <div className="bg-secondary p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {gistConnected ? <Cloud className="text-green-500" /> : <CloudOff className="text-muted-foreground" />}
                  GitHub Gist Sync
                </h2>
                {gistConnected && (
                  <div className="flex items-center gap-2 text-sm">
                    {syncStatus === 'syncing' && <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />}
                    {syncStatus === 'synced' && <Check className="h-4 w-4 text-green-500" />}
                    {syncStatus === 'error' && <AlertCircle className="h-4 w-4 text-red-500" />}
                    <span className="text-muted-foreground">
                      {syncStatus === 'syncing' && 'Đang đồng bộ...'}
                      {syncStatus === 'synced' && lastSynced && `Đồng bộ lúc ${lastSynced.toLocaleTimeString()}`}
                      {syncStatus === 'error' && 'Lỗi đồng bộ'}
                      {syncStatus === 'offline' && 'Offline'}
                    </span>
                  </div>
                )}
              </div>

              {!gistConnected ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Kết nối GitHub Gist để đồng bộ dữ liệu giữa các thiết bị.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Gist ID</label>
                      <input
                        type="text"
                        value={gistId}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGistId(e.target.value)}
                        placeholder="abc123..."
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Lấy từ URL: gist.github.com/username/<b>gist_id</b>
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Personal Access Token</label>
                      <input
                        type="password"
                        value={gistToken}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGistToken(e.target.value)}
                        placeholder="ghp_xxxxxxxxxxxx"
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Tạo tại github.com/settings/tokens (quyền: gist)
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleTestGistConnection}
                    disabled={testingConnection || !gistId || !gistToken}
                    className="w-full md:w-auto"
                  >
                    {testingConnection ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                        Đang kết nối...
                      </>
                    ) : (
                      <>
                        <Cloud className="h-4 w-4 mr-2" />
                        Kết nối Gist
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-green-600 dark:text-green-400">Đã kết nối với GitHub Gist</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleSyncFromGist} variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Tải từ Gist
                    </Button>
                    <Button onClick={handleSyncToGist} variant="outline" size="sm">
                      <Cloud className="h-4 w-4 mr-2" />
                      Đồng bộ lên Gist
                    </Button>
                    <Button onClick={handleDisconnectGist} variant="outline" size="sm" className="text-red-500">
                      <CloudOff className="h-4 w-4 mr-2" />
                      Ngắt kết nối
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-secondary p-6 rounded-lg border border-border">
              <h2 className="text-xl font-bold mb-4">Hướng dẫn</h2>
              <div className="text-muted-foreground space-y-2">
                <p>• Tất cả thay đổi được lưu tự động vào localStorage của trình duyệt.</p>
                <p>• Dữ liệu sẽ được giữ nguyên khi refresh trang.</p>
                <p>• Nhấn nút "Reset" ở góc trên để đặt lại về mặc định.</p>
                <p>• Kết nối GitHub Gist để đồng bộ dữ liệu giữa các thiết bị.</p>
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
