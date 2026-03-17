"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

const BUCKET = "portfolio-media";

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  image_url: string;
  tag: string;
  tech_stack: { name: string; icon: string; color: string }[];
  sort_order: number;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  pdf_path: string;
  sort_order: number;
}

const emptyProject: Omit<Project, "id"> = {
  title: "",
  description: "",
  url: "",
  image_url: "",
  tag: "Website",
  tech_stack: [],
  sort_order: 0,
};

const emptyCert: Omit<Certificate, "id"> = {
  name: "",
  issuer: "",
  date: "",
  pdf_path: "",
  sort_order: 0,
};

export default function AdminPage() {
  const [session, setSession] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Data
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [activeTab, setActiveTab] = useState<"projects" | "certificates">("projects");

  // Edit state
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingCert, setEditingCert] = useState<Partial<Certificate> | null>(null);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Upload state
  const [uploading, setUploading] = useState(false);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(!!s);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch data
  const fetchData = useCallback(async () => {
    const [{ data: p }, { data: c }] = await Promise.all([
      supabase.from("portfolio_projects").select("*").order("sort_order"),
      supabase.from("portfolio_certificates").select("*").order("sort_order"),
    ]);
    if (p) setProjects(p);
    if (c) setCertificates(c);
  }, []);

  useEffect(() => {
    if (session) fetchData();
  }, [session, fetchData]);

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // ── File upload helper ──
  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const safeName = file.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.\-_]/g, "")
      .toLowerCase();
    const storagePath = `${folder}/${Date.now()}-${safeName}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, file, { contentType: file.type, upsert: true });

    setUploading(false);
    if (error) {
      setMsg(`Upload failed: ${error.message}`);
      return null;
    }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
    return data.publicUrl;
  };

  // ── Handle project image upload ──
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;
    const url = await uploadFile(file, "projects");
    if (url) {
      setEditingProject({ ...editingProject, image_url: url });
      setMsg("Image uploaded!");
    }
  };

  // ── Handle certificate PDF upload ──
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingCert) return;
    const url = await uploadFile(file, "certificates");
    if (url) {
      setEditingCert({ ...editingCert, pdf_path: url });
      setMsg("PDF uploaded!");
    }
  };

  // Save project
  const saveProject = async () => {
    if (!editingProject?.title) return;
    setSaving(true);
    setMsg("");

    let techStack = editingProject.tech_stack || [];
    if (techInput.trim()) {
      try {
        techStack = JSON.parse(techInput);
      } catch {
        setMsg("Invalid tech_stack JSON");
        setSaving(false);
        return;
      }
    }

    const payload = {
      title: editingProject.title,
      description: editingProject.description || "",
      url: editingProject.url || "",
      image_url: editingProject.image_url || "",
      tag: editingProject.tag || "Website",
      tech_stack: techStack,
      sort_order: editingProject.sort_order || 0,
    };

    if (editingProject.id) {
      const { error } = await supabase.from("portfolio_projects").update(payload).eq("id", editingProject.id);
      if (error) setMsg(error.message);
      else setMsg("Project updated!");
    } else {
      const { error } = await supabase.from("portfolio_projects").insert(payload);
      if (error) setMsg(error.message);
      else setMsg("Project created!");
    }
    setSaving(false);
    setEditingProject(null);
    setTechInput("");
    fetchData();
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("portfolio_projects").delete().eq("id", id);
    fetchData();
  };

  // Save certificate
  const saveCert = async () => {
    if (!editingCert?.name) return;
    setSaving(true);
    setMsg("");

    const payload = {
      name: editingCert.name,
      issuer: editingCert.issuer || "",
      date: editingCert.date || "",
      pdf_path: editingCert.pdf_path || "",
      sort_order: editingCert.sort_order || 0,
    };

    if (editingCert.id) {
      const { error } = await supabase.from("portfolio_certificates").update(payload).eq("id", editingCert.id);
      if (error) setMsg(error.message);
      else setMsg("Certificate updated!");
    } else {
      const { error } = await supabase.from("portfolio_certificates").insert(payload);
      if (error) setMsg(error.message);
      else setMsg("Certificate created!");
    }
    setSaving(false);
    setEditingCert(null);
    fetchData();
  };

  const deleteCert = async (id: string) => {
    if (!confirm("Delete this certificate?")) return;
    await supabase.from("portfolio_certificates").delete().eq("id", id);
    fetchData();
  };

  // Flash messages
  useEffect(() => {
    if (msg) {
      const t = setTimeout(() => setMsg(""), 3000);
      return () => clearTimeout(t);
    }
  }, [msg]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F14]">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // ── Login screen ──
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F14] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold text-gradient mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/80 placeholder:text-neutral/30 focus:outline-none focus:border-primary/40 transition-colors"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/80 placeholder:text-neutral/30 focus:outline-none focus:border-primary/40 transition-colors"
              required
            />
            {authError && (
              <p className="text-sm text-error text-center">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary/90 text-black font-medium hover:bg-primary transition-colors"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── Admin dashboard ──
  return (
    <div className="min-h-screen bg-[#0F0F14] text-neutral/80">
      {/* Header */}
      <div className="border-b border-white/[0.05] bg-[#0F0F14]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gradient">Portfolio Admin</h1>
          <button
            onClick={handleLogout}
            className="text-xs px-4 py-2 rounded-lg border border-white/[0.08] text-neutral/40 hover:text-neutral/70 hover:border-white/[0.15] transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Flash message */}
      {msg && (
        <div className="container mx-auto px-6 pt-4">
          <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary text-center">
            {msg}
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        {/* Tab toggle */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "projects"
                ? "bg-primary/15 text-primary border border-primary/25"
                : "bg-white/[0.03] text-neutral/40 border border-white/[0.06] hover:text-neutral/60"
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "certificates"
                ? "bg-secondary/15 text-secondary border border-secondary/25"
                : "bg-white/[0.03] text-neutral/40 border border-white/[0.06] hover:text-neutral/60"
            }`}
          >
            Certificates ({certificates.length})
          </button>
        </div>

        {/* ── PROJECTS TAB ── */}
        {activeTab === "projects" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral/90">Projects</h2>
              <button
                onClick={() => {
                  setEditingProject({ ...emptyProject });
                  setTechInput("[]");
                }}
                className="text-sm px-4 py-2 rounded-lg bg-primary/15 text-primary border border-primary/25 hover:bg-primary/25 transition-all"
              >
                + Add Project
              </button>
            </div>

            <div className="space-y-3">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all"
                >
                  <div className="flex items-center gap-4">
                    {p.image_url && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/[0.05] flex-shrink-0">
                        <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-neutral/80">{p.title}</h3>
                      <p className="text-xs text-neutral/40">{p.tag} · Order: {p.sort_order}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProject(p);
                        setTechInput(JSON.stringify(p.tech_stack, null, 2));
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-neutral/50 hover:text-primary hover:border-primary/30 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(p.id)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-neutral/50 hover:text-error hover:border-error/30 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Project edit modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="w-full max-w-lg rounded-2xl bg-[#14141c] border border-white/[0.08] p-6 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-lg font-bold text-neutral/90 mb-4">
                    {editingProject.id ? "Edit Project" : "New Project"}
                  </h3>
                  <div className="space-y-3">
                    <input
                      placeholder="Title"
                      value={editingProject.title || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/80 placeholder:text-neutral/30 focus:outline-none focus:border-primary/40 text-sm"
                    />
                    <textarea
                      placeholder="Description"
                      value={editingProject.description || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/80 placeholder:text-neutral/30 focus:outline-none focus:border-primary/40 text-sm min-h-[80px] resize-none"
                    />
                    <input
                      placeholder="URL (e.g. https://...)"
                      value={editingProject.url || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, url: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/80 placeholder:text-neutral/30 focus:outline-none focus:border-primary/40 text-sm"
                    />

                    {/* Image upload */}
                    <div>
                      <label className="text-xs text-neutral/40 mb-1.5 block">Project Image</label>
                      <div className="flex items-center gap-3">
                        {editingProject.image_url && (
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/[0.05] flex-shrink-0">
                            <img src={editingProject.image_url} alt="preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 space-y-2">
                          <input
                            ref={imgInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => imgInputRef.current?.click()}
                            disabled={uploading}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-dashed border-white/[0.12] text-neutral/40 hover:text-primary hover:border-primary/30 text-sm transition-all disabled:opacity-50"
                          >
                            {uploading ? "Uploading..." : "📷 Upload Image"}
                          </button>
                          <input
                            placeholder="or paste URL"
                            value={editingProject.image_url || ""}
                            onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/80 placeholder:text-neutral/30 focus:outline-none focus:border-primary/40 text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <input
                        placeholder="Tag (e.g. Website)"
                        value={editingProject.tag || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, tag: e.target.value })}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/80 placeholder:text-neutral/30 focus:outline-none focus:border-primary/40 text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Order"
                        value={editingProject.sort_order || 0}
                        onChange={(e) => setEditingProject({ ...editingProject, sort_order: parseInt(e.target.value) || 0 })}
                        className="w-20 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/80 placeholder:text-neutral/30 focus:outline-none focus:border-primary/40 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral/40 mb-1 block">Tech Stack (JSON array)</label>
                      <textarea
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/80 font-mono text-xs focus:outline-none focus:border-primary/40 min-h-[100px] resize-none"
                        placeholder='[{"name":"React","icon":"FaReact","color":"text-primary"}]'
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={saveProject}
                      disabled={saving}
                      className="flex-1 py-2.5 rounded-xl bg-primary/90 text-black font-medium text-sm hover:bg-primary transition-colors disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => { setEditingProject(null); setTechInput(""); }}
                      className="px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/50 text-sm hover:text-neutral/70 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── CERTIFICATES TAB ── */}
        {activeTab === "certificates" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral/90">Certificates</h2>
              <button
                onClick={() => setEditingCert({ ...emptyCert })}
                className="text-sm px-4 py-2 rounded-lg bg-secondary/15 text-secondary border border-secondary/25 hover:bg-secondary/25 transition-all"
              >
                + Add Certificate
              </button>
            </div>

            <div className="space-y-3">
              {certificates.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all"
                >
                  <div>
                    <h3 className="text-sm font-medium text-neutral/80">{c.name}</h3>
                    <p className="text-xs text-neutral/40">{c.issuer} · {c.date} · Order: {c.sort_order}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingCert(c)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-neutral/50 hover:text-secondary hover:border-secondary/30 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCert(c.id)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-neutral/50 hover:text-error hover:border-error/30 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Certificate edit modal */}
            {editingCert && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="w-full max-w-lg rounded-2xl bg-[#14141c] border border-white/[0.08] p-6">
                  <h3 className="text-lg font-bold text-neutral/90 mb-4">
                    {editingCert.id ? "Edit Certificate" : "New Certificate"}
                  </h3>
                  <div className="space-y-3">
                    <input
                      placeholder="Certificate Name"
                      value={editingCert.name || ""}
                      onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/80 placeholder:text-neutral/30 focus:outline-none focus:border-secondary/40 text-sm"
                    />
                    <div className="flex gap-3">
                      <input
                        placeholder="Issuer (e.g. Adobe)"
                        value={editingCert.issuer || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/80 placeholder:text-neutral/30 focus:outline-none focus:border-secondary/40 text-sm"
                      />
                      <input
                        placeholder="Date (e.g. 2023-04)"
                        value={editingCert.date || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                        className="w-32 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/80 placeholder:text-neutral/30 focus:outline-none focus:border-secondary/40 text-sm"
                      />
                    </div>

                    {/* PDF upload */}
                    <div>
                      <label className="text-xs text-neutral/40 mb-1.5 block">Certificate PDF</label>
                      <div className="space-y-2">
                        <input
                          ref={pdfInputRef}
                          type="file"
                          accept=".pdf"
                          onChange={handlePdfUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => pdfInputRef.current?.click()}
                          disabled={uploading}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-dashed border-white/[0.12] text-neutral/40 hover:text-secondary hover:border-secondary/30 text-sm transition-all disabled:opacity-50"
                        >
                          {uploading ? "Uploading..." : "📄 Upload PDF"}
                        </button>
                        {editingCert.pdf_path && (
                          <p className="text-xs text-neutral/30 truncate">
                            Current: <a href={editingCert.pdf_path} target="_blank" className="text-primary/50 hover:text-primary underline">{editingCert.pdf_path.split("/").pop()}</a>
                          </p>
                        )}
                        <input
                          placeholder="or paste PDF URL"
                          value={editingCert.pdf_path || ""}
                          onChange={(e) => setEditingCert({ ...editingCert, pdf_path: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/80 placeholder:text-neutral/30 focus:outline-none focus:border-secondary/40 text-xs"
                        />
                      </div>
                    </div>

                    <input
                      type="number"
                      placeholder="Sort Order"
                      value={editingCert.sort_order || 0}
                      onChange={(e) => setEditingCert({ ...editingCert, sort_order: parseInt(e.target.value) || 0 })}
                      className="w-32 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/80 placeholder:text-neutral/30 focus:outline-none focus:border-secondary/40 text-sm"
                    />
                  </div>
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={saveCert}
                      disabled={saving}
                      className="flex-1 py-2.5 rounded-xl bg-secondary/90 text-black font-medium text-sm hover:bg-secondary transition-colors disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditingCert(null)}
                      className="px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral/50 text-sm hover:text-neutral/70 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
