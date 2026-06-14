import { useState, useEffect, useRef } from "react";

const INIT_PROJECTS = [
  { 
    id: 1, 
    title: "SecureVault – Encrypted Sharing", 
    description: "Full-stack web app for securely encrypting and sharing files and messages using AES-256-GCM.", 
    fullDetails: "Built a robust security-focused platform that implements AES-256-GCM encryption with PBKDF2 key derivation. Features include time-limited access links (5-min expiry), 4-digit access codes, QR code generation, and AI-powered text summarization via GPT-4o. Includes SHA-256 + HMAC integrity verification and automatic cleanup of expired data.", 
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80", 
    stack: ["Node.js", "Express", "React", "PostgreSQL", "AES-256-GCM", "OpenAI"], 
    industry: "Cybersecurity", 
    role: "Lead Developer", 
    github: "https://github.com/sauravkai-01/SecureVault", 
    demo: "https://secure-vault-demo.com", 
    year: 2026 
  },
];

const INIT_CERTS = [
  {
    id: 1,
    title: "Full Stack Web Development",
    org: "Apna College (Sigma)",
    credId: "69dcf5ed6343591aa806eb86",
    verifyUrl: "https://apnacollege.com/verify",
    issued: "2025",
    abbr: "FSW",
    accent: "#3B82F6",
    doc: "/docs/certificate.pdf"
  },
  {
    id: 2,
    title: "Data Structures & Algorithms (C++)",
    org: "Apna College (Sigma)",
    credId: "69c82dcaab1b4690700823e7",
    verifyUrl: "https://apnacollege.com/verify",
    issued: "2024",
    abbr: "DSA",
    accent: "#E8923A",
    doc: "/docs/Sigma c++.pdf"
  },
  {
    id: 3,
    title: "Data Structures & Algorithms (Java)",
    org: "Apna College (Sigma)",
    credId: "69b811bcf93e5634050cce5a",
    verifyUrl: "https://apnacollege.com/verify",
    issued: "2024",
    abbr: "DSA",
    accent: "#326CE5",
    doc: "/docs/Sigma java.pdf"
  },
  {
    id: 4,
    title: "Data Analytics Job Simulation",
    org: "Deloitte (Via Forage)",
    credId: "DEL-FOR-2025",
    verifyUrl: "https://www.theforage.com/simulations/deloitte-data-analytics",
    issued: "2025",
    abbr: "DA",
    accent: "#0EA5E9",
    doc: "/docs/Deloit.pdf"
  },
];

const INIT_BLOG = [
  { id: 1, title: "Scaling to 10M Users: Lessons from the Trenches", date: "Mar 28, 2025", tag: "Architecture", read: "8 min read", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80", content: "Scaling a product to 10 million users is one of the most humbling experiences in engineering. The naive assumption is that you simply add more servers — but the reality involves rethinking every layer of your stack: database query patterns, caching strategies, CDN edge configuration, queue back-pressure, and connection pool sizing. In our case, the inflection point came at around 500K daily active users when our single Postgres primary started showing signs of saturation. We moved to read replicas first, then eventually to a distributed architecture using Citus for horizontal sharding. The lesson: design for the next 10× from day one, but don't over-engineer before you have the data.", likes: 198, comments: 16, shares: 24, commentList: [{ id: 1, author: "Jamie", text: "Excellent breakdown of scaling trade-offs." }] },
  { id: 2, title: "The Hidden Cost of Microservices Nobody Talks About", date: "Mar 10, 2025", tag: "Opinion", read: "5 min read", video: "https://www.youtube.com/embed/ysz5S6PUM-U", content: "Everyone talks about the benefits of microservices — independent deployability, team autonomy, technology flexibility. But the operational complexity is often severely underestimated. In a monolith, a function call is a function call. In a microservices world, that same operation is now an HTTP request with retry logic, circuit breakers, distributed tracing, and potential partial failures. We spent 6 months optimizing our service mesh after naively decomposing a monolith into 40+ services. My advice: start with a modular monolith. Extract services only when you have a concrete scaling or team-boundary reason — not because a conference talk made it sound cool.", likes: 143, comments: 11, shares: 19, commentList: [{ id: 1, author: "Morgan", text: "This feels so true for many teams." }] },
  { id: 3, title: "Building a Zero-Downtime Deployment Pipeline", date: "Feb 22, 2025", tag: "DevOps", read: "12 min read", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80", content: "Zero-downtime deployments are non-negotiable for customer-facing systems. The approach we landed on combines blue-green deployments at the infrastructure level with feature flags at the application level. Our Kubernetes rollout strategy uses a max-surge of 1 and max-unavailable of 0, which guarantees that new pods are healthy before old ones are terminated. Database migrations are the trickiest part — we use an expand-contract pattern where schema changes are backward-compatible for at least two deploy cycles. This lets us roll forward or backward without data loss. Combined with automated smoke tests in the post-deploy hook, we've achieved 99.97% uptime over the past 18 months.", likes: 212, comments: 21, shares: 31, commentList: [{ id: 1, author: "Taylor", text: "Great playbook for enterprise deployment." }] },
  { id: 4, title: "Design Systems That Scale Across Teams", date: "Jan 14, 2025", tag: "Design", read: "7 min read", image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=1200&q=80", content: "A design system is only useful if teams can adopt it without friction. This post covers the trade-offs between strict component libraries and flexible product tokens, how to enable rapid iteration with shared documentation, and the governance model that keeps UI consistency aligned across engineering, product, and design teams. We also explore how engineering-led design systems can improve developer velocity by 27% while reducing visual drift in production.", likes: 145, comments: 9, shares: 14, commentList: [{ id: 1, author: "Alex", text: "Very helpful design system guidance." }] },
  { id: 5, title: "AI-Driven UX: When Machine Learning Meets Product Design", date: "Dec 03, 2024", tag: "AI", read: "6 min read", video: "https://www.youtube.com/embed/ysz5S6PUM-U", content: "Applying AI to user experiences requires more than clever models; it requires ethical guardrails, clear feedback loops, and data-informed interaction patterns. I share lessons from building recommendation, personalization, and automation features that increased engagement without compromising trust. The key is to design AI features as collaborators, not replacements, with transparent controls and continuous validation.", likes: 179, comments: 12, shares: 22, commentList: [{ id: 1, author: "Jordan", text: "Loving the human-centered AI perspective." }] },
];

const INIT_EDU = [
  {
    id: 1,
    degree: "B.Tech in Computer Science & Engineering",
    school: "Acharya Institute of Technology",
    details: "Focusing on core CS fundamentals, system architecture, and full-stack engineering. Participating in hackathons and technical workshops.",
    icon: "🎓",
    achievements: [
      { text: "Participant in Hack-A-League 4.0", doc: "/docs/Hackathon.pdf" },
      "Cloud Computing & AWS Industry Workshop",
      { text: "Data Analytics Simulation by Deloitte", doc: "/docs/Deloit.pdf" }
    ]
  },
  {
    id: 2,
    degree: "Class 12th (BSEB)",
    school: "A N College",
    details: "Science Stream (PCM) with 72.6% marks.",
    icon: "📚",
    achievements: [
      "Focused on Mathematics and Physics"
    ]
  },
  {
    id: 3,
    degree: "Class 10th (CBSE)",
    school: "GYANODAYA GURUKUL",
    details: "Completed with 90.6% marks.",
    icon: "📚",
    achievements: [
      "Strong foundation in Science and Mathematics"
    ]
  }
];

const SKILLS = {
  Languages: [
    { name: "C++", level: 90, note: "400+ LeetCode" },
    { name: "Java", level: 85, note: "DSA Proficiency" },
    { name: "Python", level: 80, note: "Scripting & Backend" },
    { name: "JavaScript", level: 88, note: "Frontend/Backend" },
    { name: "SQL", level: 82, note: "Relational DBs" }
  ],
  Backend: [
    { name: "Node.js", level: 88, note: "3 years" },
    { name: "Express.js", level: 90, note: "API Dev" },
    { name: "Spring Boot", level: 75, note: "Java Backend" },
    { name: "Django / Flask", level: 80, note: "Python Frameworks" }
  ],
  Frontend: [
    { name: "React.js", level: 92, note: "Modern Hooks" },
    { name: "Redux", level: 85, note: "State Mgmt" },
    { name: "Tailwind CSS", level: 90, note: "Modern Styling" },
    { name: "Bootstrap", level: 80, note: "Responsive UI" }
  ],
  Deployment: [
    { name: "Docker", level: 75, note: "Containerization" },
    { name: "Git / GitHub", level: 92, note: "Version Control" },
    { name: "CI / CD", level: 70, note: "Pipeline Automation" }
  ]
};

const SKILL_AREA_INFO = {
  Languages: {
    questions: "400+ LeetCode problems solved",
    projects: "Active coding in C++, Java, & Python",
    examples: ["Competitive Programming", "SecureVault"],
  },
  Backend: {
    questions: "RESTful API & Server-side Logic",
    projects: "Built multiple secure backends",
    examples: ["SecureVault", "Express Server"],
  },
  Frontend: {
    questions: "Interactive UI & Component Architecture",
    projects: "Responsive React Applications",
    examples: ["Portfolio", "SecureVault UI"],
  },
  Deployment: {
    questions: "Git & Docker Workflows",
    projects: "CI/CD & Cloud Orchestration",
    examples: ["GitHub Actions", "Dockerizing Apps"],
  },
};

const nextId = () => Date.now();
const makeComment = (text) => ({ id: nextId(), author: "Reader", text });
const formatBlogMeta = (content) => ({
  id: Date.now(),
  date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  read: `${Math.max(1, Math.ceil(content.split(" ").length / 200))} min read`,
});
const getBlogExcerpt = (content) => {
  if (!content) return "";
  const clean = content.replace(/\s+/g, " ").trim();
  return clean.length <= 120 ? clean : `${clean.slice(0, 117).trim()}…`;
};
const getCertAbbr = (title) => title.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase().slice(0, 3);
const extractYouTubeId = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
};
const isVideoFile = (url) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
const getYouTubeEmbedUrl = (url, autoplay = false) => {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?rel=0&playsinline=1&autoplay=${autoplay ? 1 : 0}&mute=${autoplay ? 1 : 0}`;
};
const ADMIN_PASS = "demo123";

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);
  const [tab, setTab] = useState("Projects");
  const [projects, setProjects] = useState(INIT_PROJECTS);
  const [certs, setCerts] = useState(INIT_CERTS);
  const [blogPosts, setBlogPosts] = useState(INIT_BLOG);
  const edu = INIT_EDU;
  const [fStack, setFStack] = useState("All");
  const [fIndustry, setFIndustry] = useState("All");
  const [fRole, setFRole] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [blogOpen, setBlogOpen] = useState(null);
  const [selectedBlogId, setSelectedBlogId] = useState(INIT_BLOG[0]?.id || null);
  const [commentText, setCommentText] = useState("");
  const [likedBlogs, setLikedBlogs] = useState([]);
  const renderBlogMedia = (post, autoplay = false) => {
    if (!post) return null;
    if (post.video) {
      const yt = extractYouTubeId(post.video);
      if (yt) {
        return (
          <div className="reader-media">
            <iframe
              className="reader-video"
              src={getYouTubeEmbedUrl(post.video, autoplay)}
              title={post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
      if (isVideoFile(post.video)) {
        return (
          <div className="reader-media">
            <video
              className="reader-video"
              controls
              autoPlay={autoplay}
              muted={autoplay}
              playsInline
              src={post.video}
            />
          </div>
        );
      }
      return (
        <div className="reader-media">
          <iframe
            className="reader-video"
            src={post.video}
            title={post.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    if (post.image) {
      return (
        <div className="reader-media">
          <img className="reader-img" src={post.image} alt={post.title} />
        </div>
      );
    }
    return null;
  };
  const [projectOpen, setProjectOpen] = useState(null);
  const [skillCat, setSkillCat] = useState("Languages");
  const [animSkills, setAnimSkills] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminTab, setAdminTab] = useState("projects");
  const [uploadMsg, setUploadMsg] = useState("");
  const [pForm, setPForm] = useState({ title: "", stack: "", industry: "", description: "", github: "", demo: "" });
  const [bForm, setBForm] = useState({ title: "", tag: "", content: "", image: "", video: "" });
  const [cForm, setCForm] = useState({ title: "", org: "", credId: "", verifyUrl: "", issued: "", expires: "" });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [toast, setToast] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [subEmail, setSubEmail] = useState("");
  const [subDone, setSubDone] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [certFile, setCertFile] = useState(null);
  const [docPreview, setDocPreview] = useState(null);
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const toastTimer = useRef(null);

  // Secret Admin Reveal: Check URL for ?owner=true or use keyboard shortcut Shift+Alt+A
  useEffect(() => {
    if (window.location.search.includes("owner=true")) {
      setIsAdminVisible(true);
    }
    const handleKeys = (e) => {
      if (e.shiftKey && e.altKey && e.key === "A") {
        setIsAdminVisible(true);
        showToast("Admin mode activated.");
      }
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, []);

  const allStacks = ["All", ...new Set(projects.flatMap(p => p.stack))];
  const allIndustries = ["All", ...new Set(projects.map(p => p.industry))];
  const allRoles = ["All", ...new Set(projects.map(p => p.role))];
  const filtered = projects.filter(p =>
    (fStack === "All" || p.stack.includes(fStack)) &&
    (fIndustry === "All" || p.industry === fIndustry) &&
    (fRole === "All" || p.role === fRole)
  );

  useEffect(() => {
    if (tab === "Skills") {
      const reset = setTimeout(() => setAnimSkills(false), 0);
      const start = setTimeout(() => setAnimSkills(true), 90);
      return () => { clearTimeout(reset); clearTimeout(start); };
    }
  }, [tab, skillCat]);

  const navTo = (t) => { setTab(t); setMobileOpen(false); if (t === "Contact") { setContactOpen(true); return; } };

  const showToast = (msg, type = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  const tryUnlock = () => {
    if (adminPass === ADMIN_PASS) { setAdminAuth(true); setPassErr(false); showToast("Welcome back, Saurav."); }
    else { setPassErr(true); setTimeout(() => setPassErr(false), 2000); showToast("Incorrect password.", "error"); }
  };

  const handleFileUpload = (e) => {
    const f = e.target.files[0];
    if (f) { setCertFile(f); setUploadMsg(`${f.name} · ${(f.size / 1024).toFixed(1)} KB`); }
  };

  const copyCredId = (id, credId) => {
    navigator.clipboard.writeText(credId).then(() => {
      setCopiedId(id);
      showToast("Credential ID copied to clipboard.");
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleBlogLike = (id) => {
    setBlogPosts((prev) => prev.map((post) => {
      if (post.id !== id) return post;
      const liked = likedBlogs.includes(id);
      return { ...post, likes: post.likes + (liked ? -1 : 1) };
    }));
    setLikedBlogs((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const handleBlogShare = async (post) => {
    const url = `${window.location.origin}${window.location.pathname}#blog-${post.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setBlogPosts((prev) => prev.map((item) => item.id === post.id ? { ...item, shares: item.shares + 1 } : item));
      showToast("Blog link copied to clipboard.");
    } catch {
      showToast("Unable to copy share link.", "error");
    }
  };

  const handleAddComment = () => {
    if (!commentText.trim() || !blogOpen) return;
    const newComment = makeComment(commentText.trim());
    setBlogPosts((prev) => prev.map((post) => post.id === blogOpen.id ? {
      ...post,
      comments: post.comments + 1,
      commentList: [...(post.commentList || []), newComment],
    } : post));
    setBlogOpen((prev) => prev ? { ...prev, comments: prev.comments + 1, commentList: [...(prev.commentList || []), newComment] } : prev);
    setCommentText("");
    showToast("Comment added.");
  };

  const downloadCert = (cert) => {
    setDocPreview({ type: "cert", data: cert });
  };

  const performDownloadCert = (cert) => {
    if (cert.doc) {
      const a = document.createElement("a");
      a.href = cert.doc;
      a.download = `${cert.title.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`Downloading ${cert.abbr} (PDF Format)...`);
    } else {
      showToast("PDF asset not found.", "error");
    }
    setDocPreview(null);
  };

  const handleAddProject = () => {
    if (!pForm.title.trim()) { showToast("Title is required.", "error"); return; }
    const newP = {
      ...pForm,
      id: nextId(),
      year: new Date().getFullYear(),
      metric: "New",
      stack: pForm.stack.split(",").map(s => s.trim()).filter(Boolean),
      github: pForm.github || "https://github.com",
      demo: pForm.demo || "https://example.com",
    };
    setProjects(prev => [newP, ...prev]);
    setPForm({ title: "", stack: "", industry: "", description: "", github: "", demo: "" });
    showToast(`"${newP.title}" added to Projects.`);
    setFStack("All"); setFIndustry("All"); setFRole("All");
  };

  const handleDeleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
    showToast("Project removed.");
  };

  const handleAddBlog = () => {
    if (!bForm.title.trim()) { showToast("Title is required.", "error"); return; }
    const blogMeta = formatBlogMeta(bForm.content);
    const newB = {
      ...bForm,
      ...blogMeta,
      isDraft: true,
      image: bForm.image.trim() || undefined,
      video: bForm.video.trim() || undefined,
    };
    setBlogPosts(prev => [newB, ...prev]);
    setBForm({ title: "", tag: "", content: "", image: "", video: "" });
    showToast(`"${newB.title}" published as draft.`);
  };

  const handleDeleteBlog = (id) => {
    setBlogPosts(prev => prev.filter(b => b.id !== id));
    setDeleteConfirm(null);
    showToast("Post removed.");
  };

  const handleAddCert = () => {
    if (!cForm.title.trim()) { showToast("Certificate title is required.", "error"); return; }
    const accents = ["#E8923A", "#3B82F6", "#326CE5", "#0EA5E9", "#8B5CF6", "#10B981"];
    const newC = { ...cForm, id: nextId(), abbr: getCertAbbr(cForm.title), accent: accents[certs.length % accents.length] };
    setCerts(prev => [...prev, newC]);
    setCForm({ title: "", org: "", credId: "", verifyUrl: "", issued: "", expires: "" });
    setCertFile(null); setUploadMsg("");
    showToast(`"${newC.title}" added to Credentials.`);
  };

  const handleDeleteCert = (id) => {
    setCerts(prev => prev.filter(c => c.id !== id));
    setDeleteConfirm(null);
    showToast("Certification removed.");
  };

  const handleContact = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) { showToast("Please fill in all fields.", "error"); return; }
    setContactSent(true);
    showToast("Message sent! Saurav will get back to you soon.");
    setTimeout(() => { setContactOpen(false); setContactSent(false); setContactForm({ name: "", email: "", message: "" }); }, 2200);
  };

  const downloadResume = () => {
    setDocPreview({ type: "resume", doc: "/docs/saurav_cv.pdf" });
  };

  const performDownloadResume = () => {
    const a = document.createElement("a");
    a.href = "/docs/saurav_cv.pdf";
    a.download = "saurav_cv.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("Downloading Resume (PDF Format)...");
    setDocPreview(null);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("sauravkai2023@gmail.com").then(() => {
      setEmailCopied(true);
      showToast("Email copied to clipboard.");
      setTimeout(() => setEmailCopied(false), 2200);
    });
  };

  const handleSubscribe = () => {
    if (!subEmail.includes("@")) { showToast("Enter a valid email.", "error"); return; }
    setSubDone(true);
    showToast(`${subEmail} subscribed!`);
    setSubEmail("");
    setTimeout(() => setSubDone(false), 4000);
  };

  const NAV = ["Projects", "Credentials", "Skills", "Education", "Blog", ...(isAdminVisible ? ["Admin"] : [])];

  return (
    <>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
        body{font-family:'Geist',system-ui,sans-serif;background:#FAFAFA;color:#111118;line-height:1.6}
        a{text-decoration:none;color:inherit}
        button{font-family:inherit;cursor:pointer;border:none;background:none}
        input,textarea{font-family:inherit;outline:none}
        /* Background Video */
        .bg-video-wrap{position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none}
        .bg-video-wrap video{width:100%;height:100%;object-fit:cover;transition:opacity 1s ease}
        .bg-video-overlay{position:absolute;inset:0;background:linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.9) 100%)}
        .dark .bg-video-overlay{background:linear-gradient(180deg, rgba(9,9,11,0.7) 0%, rgba(9,9,11,0.9) 100%)}
        .bg-video-wrap video{opacity:0.3}
        .dark .bg-video-wrap video{opacity:0.15}
        
        .shell{min-height:100vh;background:#fff;color:#111118;transition:background .3s;position:relative;z-index:1}
        .w{max-width:100%;margin:0 auto;padding:0 32px}

        /* Toast */
        .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;
          display:flex;align-items:center;gap:10px;
          background:#111118;color:#fff;
          padding:12px 20px;border-radius:10px;
          font-size:16px;font-weight:500;
          box-shadow:0 8px 30px rgba(0,0,0,.25);
          animation:toastin .22s ease;white-space:nowrap;
          max-width:calc(100vw - 40px);
        }
        .toast.error{background:#DC2626}
        @keyframes toastin{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

        /* Topbar */
        .topbar{position:sticky;top:0;z-index:100;background:rgba(250,250,250,0.9);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid #EBEBEB}
        .ti{display:flex;align-items:center;justify-content:space-between;height:58px}
        .logo{display:flex;align-items:center;gap:11px;cursor:pointer}
        .lm{width:32px;height:32px;border-radius:8px;background:#111118;display:flex;align-items:center;justify-content:center;font-size:15.5px;font-weight:600;color:#fff;flex-shrink:0}
        .lt{font-size:16.5px;font-weight:600;color:#111118;letter-spacing:-.02em}
        .ls{font-size:13.5px;color:#9B9BAA;font-weight:400;margin-top:1px}
        .navlist{display:flex;align-items:center;gap:1px}
        .ni{padding:5px 13px;border-radius:7px;font-size:15.5px;font-weight:500;color:#71717A;transition:color .13s,background .13s;white-space:nowrap}
        .ni:hover{color:#111118;background:rgba(0,0,0,.04)}
        .ni.on{color:#111118;font-weight:600;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.08),0 0 0 1px rgba(0,0,0,.06)}
        .ncta{padding:6px 16px;border-radius:8px;background:#111118;color:#fff;font-size:15.5px;font-weight:600;letter-spacing:-.01em;margin-left:8px;transition:opacity .13s;border:none}
        .ncta:hover{opacity:.8}
        .hbg{display:none;flex-direction:column;gap:4px;padding:8px;border-radius:6px}
        .hbg span{display:block;width:18px;height:1.5px;background:#52525B;border-radius:10px}
        .mobnav{display:none;padding:6px 0 12px;border-top:1px solid #EBEBEB;gap:2px;flex-direction:column}
        .mobnav.open{display:flex}
        .mobitem{padding:10px 32px;font-size:16.5px;font-weight:500;color:#52525B;text-align:left}
        .mobitem.on{color:#111118;background:rgba(0,0,0,.03)}

        /* Hero */
        @keyframes fadeUp{0%{opacity:0;transform:translateY(24px)}100%{opacity:1;transform:translateY(0)}}
        .hero-layout{display:flex;align-items:center;justify-content:space-between;gap:48px;padding:72px 0 64px}
        .hero-text{flex:1;text-align:left;display:flex;flex-direction:column;align-items:flex-start}
        .hero-image-container{flex-shrink:0;position:relative;animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .35s forwards;opacity:0}
        .hero-image{width:420px;height:420px;border-radius:40px;object-fit:cover;box-shadow:0 24px 60px rgba(0,0,0,.12);border:1px solid #EBEBEB;transition:transform .3s ease}
        .hero-image:hover{transform:scale(1.02)}
        .dark .hero-image{border-color:#27272a;box-shadow:0 24px 60px rgba(0,0,0,.5)}
        .hero .eyebrow{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .1s forwards;opacity:0;align-self:flex-start}
        .hero .h1{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .25s forwards;opacity:0;text-align:left}
        .hero .hbody{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .35s forwards;opacity:0;text-align:left}
        .hero .hacts{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .45s forwards;opacity:0;justify-content:flex-start}
        .hero .metrics{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .6s forwards;opacity:0}
        .eyebrow{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid #EBEBEB;padding:5px 14px 5px 10px;border-radius:100px;font-size:14.5px;color:#52525B;font-weight:500;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,.05)}
        .edot{width:6px;height:6px;border-radius:50%;background:#22C55E;flex-shrink:0;animation:blink 2s ease-in-out infinite}
        @keyframes blink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
        .h1{font-size:clamp(40px, 6vw, 68px);font-weight:800;letter-spacing:-.04em;line-height:1.1;color:#111118;margin-bottom:24px}
        .h1 span{color:#6366f1;font-weight:600}
        .hbody{font-size:19px;color:#4B5563;max-width:620px;line-height:1.8;margin-bottom:40px;text-align:left}
        .hacts{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:24px;justify-content:flex-start}
        .social-links{display:flex;gap:12px;margin-top:32px;flex-wrap:wrap}
        .social-link{display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border-radius:14px;background:#fff;border:1px solid #EBEBEB;color:#374151;font-size:14px;font-weight:700;transition:all 0.25s cubic-bezier(.16,1,.3,1);text-decoration:none;box-shadow:0 1px 3px rgba(0,0,0,0.02);cursor:pointer}
        .social-link:hover{background:#F9FAFB;border-color:#D1D5DB;transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,0.06);color:#111118}
        .social-link:active{transform:translateY(0)}
        .social-link svg{width:16px;height:16px;flex-shrink:0;transition:transform .2s ease}
        .social-link:hover svg{transform:scale(1.1)}
        .social-link .icon-linkedin{fill:#0077B5}
        .social-link .icon-github{fill:#181717}
        .social-link .icon-leetcode{fill:#FFA116}
        .social-link .icon-email{fill:#EA4335}
        .dark .social-link .icon-github{fill:#FFF}
        .dark .social-link .icon-linkedin{fill:#0A66C2}
        .dark .social-link{background:#18181B;border-color:#27272A;color:#E4E4E7;box-shadow:none}
        .dark .social-link:hover{background:#27272A;border-color:#3F3F46;color:#FFF;box-shadow:0 8px 25px rgba(0,0,0,0.4)}
        .bd{display:inline-flex;align-items:center;gap:6px;background:#111118;color:#fff;padding:9px 20px;border-radius:9px;font-size:16px;font-weight:600;letter-spacing:-.01em;transition:opacity .13s,transform .1s;border:none;cursor:pointer}
        .bd:hover{opacity:.82}
        .bd:active{transform:scale(.97)}
        .bl{display:inline-flex;align-items:center;gap:6px;background:#fff;color:#3F3F46;border:1px solid #DDDDE0;padding:9px 20px;border-radius:9px;font-size:16px;font-weight:600;letter-spacing:-.01em;transition:border-color .13s,transform .1s;box-shadow:0 1px 2px rgba(0,0,0,.05);cursor:pointer}
        .bl:hover{border-color:#A1A1AA}
        .bl:active{transform:scale(.97)}
        .metrics{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid #EBEBEB;border-radius:14px;overflow:hidden;background:#EBEBEB;gap:1px}
        .metric{background:#fff;padding:24px 28px}
        .mn{font-size:30.5px;font-weight:700;letter-spacing:-.05em;color:#111118;line-height:1}
        .ml{font-size:13.5px;font-weight:600;color:#A1A1AA;margin-top:6px;text-transform:uppercase;letter-spacing:.07em}

        /* Section */
        .sec{padding:48px 0 80px}
        .sh{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:32px;gap:12px;flex-wrap:wrap}
        .st{font-size:23.5px;font-weight:700;letter-spacing:-.04em;color:#111118}
        .ss{font-family:'Geist Mono',monospace;font-size:13.5px;color:#C4C4CC;letter-spacing:.02em;margin-top:4px}
        .div{height:1px;background:#EBEBEB;margin:20px 0}

        /* Filters */
        .filters{display:flex;flex-direction:column;gap:10px;margin-bottom:28px}
        .frow{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
        .flabel{font-family:'Geist Mono',monospace;font-size:12.5px;font-weight:500;color:#C4C4CC;letter-spacing:.08em;text-transform:uppercase;min-width:60px}
        .chip{background:#fff;border:1px solid #EBEBEB;color:#71717A;padding:4px 12px;border-radius:6px;font-size:14.5px;font-weight:500;transition:all .12s;white-space:nowrap;box-shadow:0 1px 1px rgba(0,0,0,.03)}
        .chip:hover{border-color:#BBBBC0;color:#111118}
        .chip.on{background:#111118;border-color:#111118;color:#fff;box-shadow:none}

        /* Project Cards */
        .pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px}
        .pc{background:#fff;border:1px solid #EBEBEB;border-radius:14px;padding:24px;display:flex;flex-direction:column;transition:all .3s cubic-bezier(0.16,1,0.3,1);position:relative;cursor:pointer}
        .pc:hover{border-color:#111;box-shadow:0 18px 48px rgba(0,0,0,.12);transform:scale(1.02) translateY(-4px)}
        .ptop{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
        .pyear{font-family:'Geist Mono',monospace;font-size:12.5px;font-weight:500;color:#C4C4CC;letter-spacing:.04em}
        .pmet{font-family:'Geist Mono',monospace;font-size:12.5px;font-weight:500;color:#16A34A;background:#F0FDF4;border:1px solid #BBF7D0;padding:3px 9px;border-radius:6px}
        .ptitle{font-size:17.5px;font-weight:700;color:#111118;letter-spacing:-.03em;margin-bottom:8px;line-height:1.3}
        .pdesc{font-size:15.5px;color:#71717A;line-height:1.72;margin-bottom:16px;flex:1}
        .pchips{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:16px}
        .sc{font-family:'Geist Mono',monospace;font-size:13px;font-weight:500;background:#F4F4F5;color:#52525B;padding:3px 8px;border-radius:5px}
        .ic{font-family:'Geist Mono',monospace;font-size:13px;border:1px solid #EBEBEB;color:#BBBBC0;padding:3px 8px;border-radius:5px;background:transparent}
        .pfoot{display:flex;align-items:center;gap:12px;padding-top:16px;border-top:1px solid #F4F4F5}
        .plnk{font-size:15px;font-weight:600;color:#9B9BAA;transition:color .13s;display:inline-flex;align-items:center;gap:4px}
        .plnk:hover{color:#111118}
        .prole{margin-left:auto;font-family:'Geist Mono',monospace;font-size:12.5px;font-weight:500;color:#C4C4CC}
        .del-btn{position:absolute;top:14px;right:14px;width:26px;height:26px;border-radius:6px;background:#FEF2F2;color:#DC2626;font-size:15.5px;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .15s;cursor:pointer;border:1px solid #FECACA}
        .pc:hover .del-btn{opacity:1}
        .new-badge{font-family:'Geist Mono',monospace;font-size:12.5px;font-weight:600;background:#EFF6FF;color:#1D4ED8;border:1px solid #BFDBFE;padding:3px 9px;border-radius:6px}
        .empty{text-align:center;padding:64px;color:#C4C4CC;font-size:16.5px}

        /* Confirm Dialog */
        .confirm-ov{position:fixed;inset:0;z-index:400;background:rgba(9,9,11,.4);display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px)}
        .confirm-box{background:#fff;border-radius:14px;padding:28px;max-width:360px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,.18)}
        .confirm-title{font-size:18.5px;font-weight:700;color:#111118;letter-spacing:-.02em;margin-bottom:8px}
        .confirm-sub{font-size:16px;color:#71717A;line-height:1.6;margin-bottom:22px}
        .confirm-actions{display:flex;gap:10px}

        /* Certs */
        .cgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}
        .cc{background:#fff;border:1px solid #EBEBEB;border-radius:14px;overflow:hidden;cursor:pointer;transition:border-color .18s,box-shadow .18s;position:relative}
        .cc:hover{border-color:#BBBBC0;box-shadow:0 6px 24px rgba(0,0,0,.07)}
        .cbanner{height:96px;display:flex;align-items:center;justify-content:center;position:relative;border-bottom:1px solid #F4F4F5}
        .cabbr{width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:'Geist Mono',monospace;font-size:15.5px;font-weight:700;letter-spacing:-.02em}
        .cvbadge{position:absolute;top:10px;right:10px;font-family:'Geist Mono',monospace;font-size:12.5px;font-weight:500;background:#F0FDF4;color:#16A34A;border:1px solid #BBF7D0;padding:3px 8px;border-radius:100px;letter-spacing:.04em}
        .cbody{padding:18px 20px 14px}
        .corg{font-size:12.5px;font-weight:700;color:#C4C4CC;text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px}
        .cname{font-size:16px;font-weight:700;color:#111118;line-height:1.38;margin-bottom:8px;letter-spacing:-.02em}
        .cid{font-family:'Geist Mono',monospace;font-size:12.5px;color:#C4C4CC;cursor:pointer;transition:color .13s;display:flex;align-items:center;gap:5px}
        .cid:hover{color:#111118}
        .cacts{display:flex;gap:8px;padding:12px 20px 18px}
        .cbtn{flex:1;font-size:14.5px;font-weight:600;padding:8px 0;border-radius:8px;transition:all .13s;text-align:center;display:block;cursor:pointer}
        .cbtnp{background:#111118;color:#fff;border:1px solid #111118}
        .cbtnp:hover{opacity:.82}
        .cbtns{background:#fff;color:#52525B;border:1px solid #EBEBEB;box-shadow:0 1px 1px rgba(0,0,0,.03)}
        .cbtns:hover{border-color:#BBBBC0;color:#111118}
        .cdel{position:absolute;top:10px;left:10px;width:24px;height:24px;border-radius:6px;background:#FEF2F2;color:#DC2626;font-size:13.5px;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .15s;cursor:pointer;border:1px solid #FECACA}
        .cc:hover .cdel{opacity:1}

        /* Lightbox */
        .ov{position:fixed;inset:0;z-index:300;background:rgba(9,9,11,.45);display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
        .lb{background:#fff;border-radius:18px;width:100%;max-width:430px;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.2),0 0 0 1px rgba(0,0,0,.04)}
        .lbh{padding:24px 24px 20px;border-bottom:1px solid #F4F4F5;display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
        .lbcl{width:28px;height:28px;border-radius:7px;background:#F4F4F5;color:#71717A;font-size:15.5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .13s,color .13s;cursor:pointer;border:none}
        .lbcl:hover{background:#EBEBEB;color:#111118}
        .lborg{font-size:12.5px;font-weight:700;color:#C4C4CC;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}
        .lbt{font-size:19.5px;font-weight:700;color:#111118;letter-spacing:-.03em;line-height:1.3}
        .lbrow{display:flex;align-items:center;justify-content:space-between;padding:13px 24px;border-bottom:1px solid #F4F4F5}
        .lbrow:last-child{border-bottom:none}
        .lbk{font-size:15px;color:#9B9BAA;font-weight:500}
        .lbv{font-family:'Geist Mono',monospace;font-size:14.5px;font-weight:500;color:#111118;display:flex;align-items:center;gap:6px;cursor:pointer}
        .lbv:hover{color:#3B82F6}
        .lbv.g{color:#16A34A;cursor:default}
        .lbft{padding:18px 24px;border-top:1px solid #F4F4F5;display:flex;gap:10px}

        
        /* Enhanced Education Timeline */
        .timeline{position:relative;max-width:800px;margin:0 auto;padding:0 20px}
        .timeline::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,#e5e7eb,#3b82f6);transform:translateX(-50%)}
        .dark .timeline::before{background:linear-gradient(to bottom,#27272a,#3b82f6)}
        .egrid{display:flex;flex-direction:column;gap:32px;position:relative}
        .ec{position:relative;background:rgba(255,255,255,0.9);backdrop-filter:blur(12px);border:1px solid rgba(229,231,235,.6);border-radius:20px;padding:32px 28px;box-shadow:0 8px 32px rgba(0,0,0,.08);transition:all .3s cubic-bezier(.25,.8,.25,1);margin:0 24px}
        .ec:hover{transform:translateY(-6px);box-shadow:0 20px 48px rgba(0,0,0,.15);border-color:rgba(59,130,246,.3)}
        .dark .ec{background:rgba(17,17,24,.95);backdrop-filter:blur(12px);border-color:rgba(75,85,99,.4);box-shadow:0 8px 32px rgba(0,0,0,.4)}
        .dark .ec:hover{box-shadow:0 20px 48px rgba(0,0,0,.6);border-color:rgba(59,130,246,.5)}
        .ec-badge{position:absolute;left:-48px;top:32px;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 16px rgba(0,0,0,.15);background:var(--bg, #3b82f6);color:#fff;animation:glow 2s ease-in-out infinite alternate}
        .ec-badge::before{content:'';position:absolute;inset:0;border-radius:50%;background:inherit;box-shadow:0 0 20px var(--bg, #3b82f6);opacity:.6;animation:glow 2s ease-in-out infinite alternate}
        .dark .ec-badge{box-shadow:0 4px 20px rgba(0,0,0,.3)}
        .edeg{font-size:20px;font-weight:700;color:#111118;letter-spacing:-.03em;margin-bottom:8px}
        .dark .edeg{color:#fff}
        .eschool{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
        .eschool span{font-size:15px;font-weight:600;color:#374151}
        .dark .eschool span{color:#d1d5db}
        .eyear{font-family:'Geist Mono',monospace;font-size:13px;font-weight:600;background:#f8fafc;border:1px solid #e5e7eb;padding:4px 10px;border-radius:6px}
        .dark .eyear{background:#1f2937;border-color:#374151;color:#9ca3af}
        .edet{font-size:15.5px;color:#6b7280;line-height:1.75;margin-bottom:20px}
        .dark .edet{color:#9ca3af}
        .ec-expand{opacity:0;max-height:0;overflow:hidden;transition:all .3s cubic-bezier(.25,.8,.25,1)}
        .ec:hover .ec-expand{opacity:1;max-height:200px;margin-top:16px;padding-top:20px;border-top:1px solid #f3f4f6}
        .dark .ec:hover .ec-expand{border-top-color:#374151}
        .ec-achievements{display:flex;flex-wrap:wrap;gap:8px}
        .ec-ach{font-size:13px;font-weight:600;color:#1f2937;background:#eff6ff;border:1px solid #dbeafe;padding:6px 12px;border-radius:20px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
        .dark .ec-ach{color:#f1f5f9;background:#1e40af;border-color:#1e3a8a}
        @keyframes glow{0%{box-shadow:0 0 5px var(--bg, #3b82f6)}100%{box-shadow:0 0 20px var(--bg, #3b82f6)}}
        @keyframes staggerIn{0%{opacity:0;transform:translateY(20px)}100%{opacity:1;transform:translateY(0)}}
        .ec{animation:staggerIn .6s cubic-bezier(.16,1,.3,1) calc(var(--idx, 0) * .1s) both}
        @media(max-width:768px){.timeline::before{display:none}.ec-badge{left:20px;top:-18px}}
        /* Blog */
        .blist{display:grid;gap:18px;padding:0;margin:0}
        .bgrid{display:grid;gap:18px}
        .bcard{background:#fff;border:1px solid #F1F1F5;border-radius:24px;overflow:hidden;display:flex;flex-direction:column;cursor:pointer;position:relative;box-shadow:0 14px 36px rgba(15,15,15,.06);transition:transform .24s ease,box-shadow .24s ease,width .24s ease; width:100%;}
        .bcard:hover{transform:translateY(-4px);box-shadow:0 18px 42px rgba(15,15,15,.1);}
        .bcard.active{transform:none;box-shadow:0 14px 36px rgba(15,15,15,.08);}
        .bcard-row{display:flex;flex-direction:column;gap:20px;}
        .bcard-details{display:flex;flex-direction:column;gap:20px;padding:20px}
        .bcard-media{background:#F4F4F5;position:relative;overflow:hidden;min-height:320px;display:flex;align-items:center;justify-content:center;flex:0 0 360px;cursor:pointer}
        .bcard-image,.bcard-video{width:100%;height:100%;object-fit:cover;display:block}
        .bcard-video{background:#000}
        .bcard-media-overlay{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);background:rgba(17,17,24,.8);color:#fff;font-size:14px;font-weight:700;padding:10px 16px;border-radius:999px;pointer-events:none}
        .bcard-video-placeholder{width:100%;min-height:320px;display:flex;align-items:center;justify-content:center;color:#fff;background:#111118;font-size:14px;font-weight:700}
        .bcard-body{display:flex;flex-direction:column;gap:10px}
        .bcard-tag{font-size:12.5px;font-weight:700;color:#166534;background:#DCFCE7;border:1px solid #BBF7D0;padding:4px 10px;border-radius:999px;display:inline-flex;align-self:flex-start}
        .bcard-title{font-size:22px;font-weight:700;color:#111118;line-height:1.2}
        .bcard-caption{font-size:15px;color:#4B5563;line-height:1.75;}
        .bcard-footer{display:flex;align-items:center;justify-content:space-between;padding:0;gap:10px;flex-wrap:wrap}
        @media (min-width: 960px) {
          .bcard-row{flex-direction:row;align-items:stretch;}
          .bcard-details{flex:1;padding:28px 24px 24px 24px;}
          .bcard-media{min-height:auto;height:auto;}
        }
        .bcard-author{display:flex;align-items:center;gap:12px}
        .bcard-avatar{width:40px;height:40px;border-radius:50%;background:#111118;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Geist Mono',monospace;font-weight:700;font-size:16px;}
        .bcard-user{font-size:14px;font-weight:700;color:#111118}
        .bcard-role{font-size:13px;color:#6B7280}
        .bcard-date{font-size:13px;color:#9CA3AF;white-space:nowrap;flex-shrink:0}
        .bcard-media{background:#F4F4F5;position:relative;overflow:hidden;min-height:220px}
        .bcard-image{width:100%;height:260px;object-fit:cover;display:block}
        .bcard-video-placeholder{min-height:260px;display:flex;align-items:center;justify-content:center;color:#fff;background:#111118;font-size:14px;font-weight:700}
        .bcard-body{padding:16px 20px 12px;display:flex;flex-direction:column;gap:10px}
        .bcard-tag{font-size:12.5px;font-weight:700;color:#166534;background:#DCFCE7;border:1px solid #BBF7D0;padding:4px 10px;border-radius:999px;display:inline-flex;align-self:flex-start}
        .bcard-title{font-size:19px;font-weight:700;color:#111118;line-height:1.28}
        .bcard-caption{font-size:15px;color:#4B5563;line-height:1.75;min-height:46px}
        .bcard-footer{display:flex;align-items:center;justify-content:space-between;padding:0 20px 18px 20px;gap:10px;flex-wrap:wrap}
        .bcard-actions-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
        .bcard-action{font-size:13px;font-weight:700;color:#6B7280;background:#F5FCE5;border:1px solid #D9F99D;padding:9px 12px;border-radius:999px;cursor:pointer;transition:background .15s,color .15s,border-color .15s}
        .bcard-action:hover{background:#ECFCCB;color:#365314;border-color:#A3E635}
        .bcard-action.active{background:#166534;color:#fff;border-color:#166534}
        .breader-comments{padding:20px 24px 24px;border-top:1px solid #F4F4F5;background:#FAFAFB}
        .breader-comment-title{font-size:16px;font-weight:700;color:#111118;margin-bottom:14px}
        .breader-comment-list{display:grid;gap:12px;margin-bottom:16px}
        .breader-comment{background:#fff;border:1px solid #E5E7EB;border-radius:14px;padding:14px}
        .breader-comment-author{font-size:13px;font-weight:700;color:#111118;margin-bottom:6px}
        .breader-comment-text{font-size:14px;color:#4B5563;line-height:1.7}
        .breader-comment-empty{font-size:14px;color:#6B7280;margin-bottom:16px}
        .breader-comment-form{display:flex;gap:10px;flex-wrap:wrap}
        .breader-comment-input{flex:1;min-width:220px;background:#fff;border:1px solid #D9D9D9;border-radius:12px;padding:12px 14px;font-size:14px;color:#111118;outline:none}
        .breader-comment-submit{font-size:14px;font-weight:700;color:#fff;background:#111118;border:none;border-radius:12px;padding:12px 18px;cursor:pointer;transition:opacity .15s}
        .breader-comment-submit:hover{opacity:.92}
        .bdel{position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:12px;background:rgba(254,242,242,.95);color:#DC2626;font-size:15px;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .15s,transform .15s;cursor:pointer;border:1px solid #FECACA;z-index:2}
        .bcard:hover .bdel{opacity:1;transform:translateY(-1px)}
        .brow{display:none}
        .sub-row{display:flex;gap:10px;align-items:center;margin-top:16px;flex-wrap:wrap}
        .sub-input{flex:1;min-width:200px;background:#fff;border:1px solid #DDDDE0;border-radius:9px;padding:9px 14px;font-size:16px;color:#111118;transition:border-color .13s;box-shadow:0 1px 2px rgba(0,0,0,.04)}
        .sub-input:focus{border-color:#A1A1AA;outline:none}

        
        .pimg { width: 100%; height: 160px; object-fit: cover; border-radius: 9px; margin-bottom: 16px; background: #FAFAFA; border: 1px solid #F4F4F5; }
        .dark .pimg { border-color: #27272a; background: #18181b; }
        .pm-ov { position: fixed; inset: 0; z-index: 500; background: rgba(9,9,11,.6); display: flex; align-items: center; justify-content: center; padding: 24px; backdrop-filter: blur(8px); }
        .pm-box { background: #fff; border-radius: 18px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; box-shadow: 0 40px 100px rgba(0,0,0,.2); }
        .pm-img { width: 100%; height: 260px; object-fit: cover; border-bottom: 1px solid #F4F4F5; }
        .pm-body { padding: 32px; }
        .pm-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
        .pm-title { font-size: 24px; font-weight: 700; color: #111118; letter-spacing: -.03em; line-height: 1.2; margin-bottom: 8px; }
        .pm-sub { font-size: 14.5px; color: #71717A; line-height: 1.6; }
        .pm-desc { font-size: 15.5px; color: #3F3F46; line-height: 1.8; margin-bottom: 28px; }
        .dark .pm-box { background: #111118; border: 1px solid #27272a; }
        .dark .pm-img { border-bottom-color: #27272a; }
        .dark .pm-title { color: #fff; }
        .dark .pm-sub { color: #9B9BAA; }
        .dark .pm-desc { color: #A1A1AA; }
        .pm-btn { width: 34px; height: 34px; border-radius: 50%; background: #fff; color: #111118; display: flex; align-items: center; justify-content: center; position: absolute; top: 16px; right: 16px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.15s; font-size: 16px; border: none; }
        .pm-btn:hover { transform: scale(1.1); }
  
        /* Blog post reader */
        .reader-ov{position:fixed;inset:0;z-index:300;background:rgba(9,9,11,.45);display:flex;align-items:flex-start;justify-content:center;padding:40px 24px;backdrop-filter:blur(8px);overflow-y:auto}
        .reader{background:#fff;border-radius:18px;width:100%;max-width:660px;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.2)}
        .reader-head{padding:28px 32px 22px;border-bottom:1px solid #F4F4F5;display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
        .reader-tag{font-size:13.5px;font-weight:600;padding:3px 10px;border-radius:6px;background:#F4F4F5;color:#52525B;display:inline-block;margin-bottom:10px}
        .reader-title{font-size:22.5px;font-weight:700;color:#111118;letter-spacing:-.03em;line-height:1.3;margin-bottom:8px}
        .reader-meta{font-size:14.5px;color:#C4C4CC;font-family:'Geist Mono',monospace}
        .reader-body{padding:28px 32px 32px;font-size:17px;color:#3F3F46;line-height:1.82}
        .reader-media{margin:0 0 24px;border-radius:18px;overflow:hidden;}
        .reader-img{width:100%;display:block;height:auto;max-height:360px;object-fit:cover;}
        .reader-video{width:100%;height:360px;border:none;display:block;}
        .bthumb{width:54px;height:54px;border-radius:14px;object-fit:cover;flex-shrink:0;margin-right:14px;border:1px solid #EBEBEB;}
        .video-thumb{width:54px;height:54px;border-radius:14px;background:#111118;color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;flex-shrink:0;margin-right:14px;}

        /* Skills */
        .skill-intro{max-width:720px;font-size:16px;color:#52525B;line-height:1.8;margin:18px 0 30px}
        .skill-intro{max-width:720px;font-size:16px;color:#52525B;line-height:1.8;margin:18px 0 30px}
        .skill-card-panel{background:#fff;border:1px solid #EBEBEB;border-radius:24px;padding:22px 20px 18px;margin-bottom:28px;box-shadow:0 28px 80px rgba(15,23,42,.06)}
        .skill-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
        .scard{background:#f8f9ff;border:1px solid #E5E7EB;border-radius:18px;padding:22px 20px;transition:transform .2s ease,box-shadow .2s ease}
        .scard:hover{transform:translateY(-2px);box-shadow:0 12px 26px rgba(15,23,42,.12)}
        .scard-title{font-size:16px;font-weight:700;color:#111118;margin-bottom:8px}
        .scard-meta{font-size:13.5px;color:#4B5563;font-weight:700;margin-bottom:10px;letter-spacing:.02em}
        .scard-sub{font-size:14px;color:#52525B;line-height:1.75;margin-bottom:14px}
        .scard-list{display:flex;flex-wrap:wrap;gap:8px;font-size:13.25px;color:#52525B}
        .scard-item{background:#fff;border:1px solid #E5E7EB;border-radius:999px;padding:8px 12px;box-shadow:0 1px 2px rgba(15,23,42,.04)}
        .skill-filter-row{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:18px;flex-wrap:wrap}
        .skill-filter-note{font-size:14px;color:#6B7280;}
        .stabs{display:flex;gap:6px;flex-wrap:wrap}
        .stab{background:#fff;border:1px solid #EBEBEB;color:#71717A;padding:10px 18px;border-radius:999px;font-size:15px;font-weight:600;letter-spacing:-.01em;transition:all .15s;box-shadow:0 1px 1px rgba(0,0,0,.03)}
        .stab:hover{border-color:#C7D2FE;color:#111118}
        .stab.on{background:#4338CA;border-color:#4338CA;color:#fff;box-shadow:0 12px 30px rgba(67,56,202,.12)}
        .skill-list-panel{background:#fff;border:1px solid #EBEBEB;border-radius:24px;overflow:hidden;box-shadow:0 28px 80px rgba(15,23,42,.06)}
        .slist{background:#fff}
        .srow{display:grid;grid-template-columns:minmax(200px,240px) minmax(0,1fr) 72px;align-items:center;gap:18px;padding:22px 28px;border-bottom:1px solid #F4F4F5}
        .srow:last-child{border-bottom:none}
        .slabel{display:flex;flex-direction:column;gap:6px}
        .sname{font-size:16.5px;font-weight:700;color:#111118;letter-spacing:-.03em}
        .snote{font-size:13.25px;color:#6B7280;font-family:'Geist Mono',monospace}
        .strack{height:12px;background:#F4F4F5;border-radius:999px;overflow:hidden;box-shadow:inset 0 1px 2px rgba(15,23,42,.06)}
        .sfill{height:100%;border-radius:999px;background:linear-gradient(90deg,#4338CA,#2563EB);transition:width .9s cubic-bezier(.34,1.2,.64,1)}
        .spct{font-family:'Geist Mono',monospace;font-size:13.5px;font-weight:700;color:#4338CA;text-align:right}

        /* Contact Modal */
        .contact-modal{background:#fff;border-radius:18px;width:100%;max-width:480px;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.2),0 0 0 1px rgba(0,0,0,.04)}
        .cm-head{padding:26px 28px 22px;border-bottom:1px solid #F4F4F5;display:flex;align-items:flex-start;justify-content:space-between}
        .cm-title{font-size:20.5px;font-weight:700;color:#111118;letter-spacing:-.03em}
        .cm-sub{font-size:15.5px;color:#9B9BAA;margin-top:3px}
        .cm-body{padding:22px 28px 28px;display:flex;flex-direction:column;gap:14px}
        .sent-state{text-align:center;padding:40px 28px;display:flex;flex-direction:column;align-items:center;gap:12px}
        .sent-icon{width:52px;height:52px;border-radius:50%;background:#F0FDF4;border:1px solid #BBF7D0;display:flex;align-items:center;justify-content:center;font-size:24.5px}
        .sent-title{font-size:19.5px;font-weight:700;color:#111118}
        .sent-sub{font-size:16px;color:#9B9BAA}

        /* Admin */
        .gate{display:flex;flex-direction:column;align-items:center;text-align:center;padding:80px 0;gap:16px}
        .gicon{width:56px;height:56px;border-radius:14px;background:#F4F4F5;display:flex;align-items:center;justify-content:center;font-size:24.5px;border:1px solid #EBEBEB;margin-bottom:4px}
        .gtitle{font-size:21.5px;font-weight:700;letter-spacing:-.04em;color:#111118}
        .gsub{font-size:16px;color:#9B9BAA}
        .ginput{background:#fff;border:1px solid #DDDDE0;border-radius:9px;padding:10px 16px;font-size:16.5px;color:#111118;width:280px;transition:border-color .13s,box-shadow .2s;box-shadow:0 1px 2px rgba(0,0,0,.04)}
        .ginput:focus{border-color:#A1A1AA}
        .ginput.err{border-color:#EF4444;animation:shake .28s ease}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
        .akpis{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px}
        .akpi{background:#fff;border:1px solid #EBEBEB;border-radius:12px;padding:20px 24px}
        .akpin{font-size:28.5px;font-weight:700;letter-spacing:-.05em;color:#111118}
        .akpil{font-size:13.5px;color:#C4C4CC;margin-top:5px;text-transform:uppercase;letter-spacing:.07em;font-weight:600}
        .alayout{display:grid;grid-template-columns:190px 1fr;gap:20px}
        .aside{display:flex;flex-direction:column;gap:2px}
        .ani{padding:9px 14px;border-radius:9px;text-align:left;font-size:15.5px;font-weight:500;color:#71717A;transition:all .13s;width:100%}
        .ani:hover{background:rgba(0,0,0,.04);color:#111118}
        .ani.on{background:#111118;color:#fff;font-weight:600}
        .apanel{background:#fff;border:1px solid #EBEBEB;border-radius:14px;padding:28px}
        .ptit{font-size:18.5px;font-weight:700;color:#111118;letter-spacing:-.03em;margin-bottom:22px}
        .fg{margin-bottom:14px}
        .fg label{display:block;font-size:13.5px;font-weight:700;color:#A1A1AA;text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px}
        .fi{width:100%;background:#FAFAFA;border:1px solid #EBEBEB;border-radius:8px;padding:9px 13px;font-size:16px;color:#111118;transition:border-color .13s,background .13s}
        .fi:focus{background:#fff;border-color:#A1A1AA;outline:none}
        .fta{width:100%;background:#FAFAFA;border:1px solid #EBEBEB;border-radius:8px;padding:9px 13px;font-size:16px;color:#111118;resize:vertical;min-height:90px;transition:border-color .13s,background .13s}
        .fta:focus{background:#fff;border-color:#A1A1AA;outline:none}
        .ok{display:inline-flex;align-items:center;gap:8px;background:#F0FDF4;border:1px solid #BBF7D0;color:#16A34A;padding:9px 14px;border-radius:9px;font-size:15px;font-weight:500;margin-top:12px}
        .uz{border:1.5px dashed #DDDDE0;border-radius:11px;padding:28px;text-align:center;cursor:pointer;position:relative;background:#FAFAFA;transition:border-color .15s,background .15s;margin-bottom:14px}
        .uz:hover{border-color:#A1A1AA;background:#fff}
        .uzin{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
        .uzic{font-size:28.5px;margin-bottom:6px;opacity:.6}
        .uzm{font-size:16px;font-weight:600;color:#52525B;margin-bottom:3px}
        .uzs{font-size:14.5px;color:#C4C4CC}
        .item-list{display:flex;flex-direction:column;gap:8px;margin-top:16px}
        .item-row{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#FAFAFA;border:1px solid #EBEBEB;border-radius:9px;font-size:15.5px}
        .item-row-title{font-weight:600;color:#111118;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .item-row-meta{font-size:13.5px;color:#C4C4CC;font-family:'Geist Mono',monospace;margin-left:12px;white-space:nowrap}
        .item-del{width:24px;height:24px;border-radius:6px;background:#FEF2F2;color:#DC2626;font-size:13.5px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid #FECACA;flex-shrink:0;margin-left:8px}
        .frow2{display:grid;grid-template-columns:1fr 1fr;gap:12px}

        @media(max-width:720px){
          .w{padding:0 20px}
          .navlist,.ncta{display:none}
          .hbg{display:flex}
          .hero-layout{flex-direction:column-reverse;text-align:center;padding:48px 0 44px;gap:32px}
          .hero-text{display:flex;flex-direction:column;align-items:center}
          .hero-image{width:220px;height:220px;border-radius:30px}
          .metrics{grid-template-columns:repeat(2,1fr)}
          .pgrid{grid-template-columns:1fr}
          .cgrid{grid-template-columns:1fr}
          .alayout{grid-template-columns:1fr}
          .aside{flex-direction:row;flex-wrap:wrap}
          .akpis{grid-template-columns:repeat(2,1fr)}
          .skill-cards{grid-template-columns:1fr}
          .skill-card-panel{padding:18px 14px 16px}
          .scard{padding:18px 16px}
          .skill-filter-row{flex-direction:column;align-items:flex-start}
          .skill-filter-note{width:100%;margin-top:8px}
          .srow{grid-template-columns:1fr;gap:12px;padding:18px 18px}
          .spct{text-align:left}
          .brow{flex-wrap:wrap;gap:10px}
          .frow2{grid-template-columns:1fr}
        }

        /* Dark Mode */
        .dark { background:#09090b; color:#fff; }
        .dark.shell { background:#09090b; }
        .dark .topbar { background: rgba(9, 9, 11, 0.9); border-bottom: 1px solid #27272a; }
        .dark .hero .eyebrow { background: #111118; border-color: #27272a; color: #fff; }
        .dark .h1 { color: #fff; }
        .dark .hbody { color: #9B9BAA; }
        .dark .metric { background: #111118; color: #fff; }
        .dark .metrics { background: #27272a; border-color: #27272a; }
        .dark .mn { color: #fff; }
        .dark .pc, .dark .cc, .dark .apanel, .dark .akpi { background: #111118; border-color: #27272a; }
        .dark .pc:hover{border-color:#fff;box-shadow:0 18px 48px rgba(0,0,0,.5);transform:scale(1.02) translateY(-4px)} .dark .cc:hover{border-color:#52525B;}
        .dark .ptitle, .dark .st, .dark .cname, .dark .cm-title { color: #fff; }
        .dark .pdesc { color: #9B9BAA; }
        .dark .sc { background: #18181b; color: #e4e4e7; }
        .dark .chip { background: #111118; border-color: #27272a; color: #9B9BAA; }
        .dark .chip:hover { border-color: #52525B; color: #fff; }
        .dark .chip.on { background: #fff; border-color: #fff; color: #000; }
        .dark .ni { color: #9B9BAA; }
        .dark .ni:hover { color: #fff; background: rgba(255,255,255,.1); }
        .dark .ni.on { color: #000; background: #fff; }
        .dark .ncta { background: #fff; color: #000; }
        .dark .lt { color: #fff; }
        .dark .lm { background: #fff; color: #000; }
        .dark .bd { background: #fff; color: #000; }
        .dark .bl { background: #111118; color: #fff; border-color: #27272a; }
        .dark .bl:hover { border-color: #52525B; }
        .dark .div { background: #27272a; }
        .dark .pfoot { border-top-color: #27272a; }
        .dark .cbanner { border-bottom-color: #27272a; }
        .dark .cbtnp { background: #fff; color: #000; border-color: #fff; }
        .dark .cbtns { background: #111118; color: #fff; border-color: #27272a; }
        .dark .lb { background: #111118; box-shadow: 0 40px 100px rgba(0,0,0,.5); border: 1px solid #27272a; }
        .dark .lbh, .dark .lbrow, .dark .lbft { border-color: #27272a; }
        .dark .lbt, .dark .lbv { color: #fff; }
        .dark .lbcl { background: #18181b; color: #A1A1AA; }
        .dark .lbcl:hover { background: #27272a; color: #fff; }
        .dark .blist, .dark .slist { background: #111118; border-color: #27272a; }
        .dark .brow, .dark .srow { border-color: #27272a; }
        .dark .brow:hover { background: #18181b; }
        .dark .btitle, .dark .sname, .dark .gtitle { color: #fff; }
        .dark .btag { background: #18181b; color: #A1A1AA; }
        .dark .stab { background: #111118; border-color: #27272a; color: #A1A1AA; }
        .dark .stab.on { background: #fff; color: #000; }
        .dark .sub-input, .dark .ginput, .dark .fi, .dark .fta { background: #18181b; border-color: #27272a; color: #fff; }
        .dark .sub-input:focus, .dark .ginput:focus, .dark .fi:focus, .dark .fta:focus { border-color: #52525B; }
        .dark .reader { background: #111118; }
        .dark .reader-head, .dark .reader-tag { border-color: #27272a; background: #18181b; color: #A1A1AA; }
        .dark .reader-title { color: #fff; }
        .dark .reader-body { color: #9B9BAA; }
        .dark .contact-modal { background: #111118; border: 1px solid #27272a; }
        .dark .cm-head { border-color: #27272a; }
        .dark .cm-title, .dark .sent-title { color: #fff; }
        .dark .gicon, .dark .uz { background: #111118; border-color: #27272a; }
        .dark .uz:hover { background: #18181b; border-color: #52525B; }
        .dark .ani { color: #A1A1AA; }
        .dark .ani:hover { background: #18181b; color: #fff; }
        .dark .ani.on { background: #fff; color: #000; }
        .dark .item-row { background: #18181b; border-color: #27272a; }
        .dark .item-row-title { color: #fff; }
        .dark .cvbadge { background: rgba(22, 163, 74, 0.1); border-color: rgba(22, 163, 74, 0.2); }
        .dark .ic { border-color: #27272a; color: #9B9BAA; }
        /* Soft Theme Overrides */
        body, .shell {
          background: #FAFAFA !important;
          color: #1a1a1a !important;
          animation: none !important;
        }
        .dark.shell, .dark body {
          background: #0d0d12 !important;
          color: #f1f1f1 !important;
          animation: none !important;
        }

        /* Beautiful Hero */
        .h1 {
          color: #111118 !important;
          background: none !important;
          -webkit-text-fill-color: initial !important;
          animation: fadeUp .8s cubic-bezier(.16,1,.3,1) .25s forwards !important;
        }
        .dark .h1 { color: #fdfdfd !important; background: none !important; -webkit-text-fill-color: initial !important; }

        /* Interactive Buttons */
        button.bd {
          background: #2563EB !important; 
          border: none !important; color: #fff !important; text-shadow: none !important;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2) !important;
          transition: all 0.25s ease !important;
        }
        button.bd:hover { transform: translateY(-2px) !important; box-shadow: 0 6px 15px rgba(37, 99, 235, 0.3) !important; }

        /* Playful Cards */
        .pc, .ec, .metric, .apanel, .akpi, .blist {
          background: #ffffff !important;
          backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
          border: 1px solid #E5E7EB !important;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }
        .pc:hover, .ec:hover, .cc:hover, .brow:hover {
          transform: translateY(-4px) !important;
          border-color: #D1D5DB !important;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.04) !important;
          z-index: 10;
        }
        .dark .pc, .dark .ec, .dark .metric, .dark .apanel, .dark .akpi, .dark .blist {
          background: #111118 !important; border-color: #27272a !important;
        }
        .dark .pc:hover, .dark .ec:hover, .dark .cc:hover, .dark .brow:hover { 
          border-color: #3f3f46 !important; 
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4) !important; 
        }

        /* Colorful Metrics */
        .mn { color: #111118 !important; }
        .dark .mn { color: #fdfdfd !important; }

        /* Hover states for chips */
        .chip.on {
          background: #111118 !important; 
          border-color: transparent !important; color: #fff !important; 
          box-shadow: 0 4px 10px rgba(0,0,0, 0.1) !important;
        }

        /* Static alignment & fixes */
        .hero .metrics { animation: fadeUp 0.8s cubic-bezier(0.16,1,.3,1) .6s forwards !important; }

        .eyebrow { border-color: #E5E7EB !important; background: #fff !important; color: #4B5563 !important; }
        .dark .eyebrow { border-color: #27272a !important; background: #111118 !important; color: #A1A1AA !important; }
        .edot { background: #10B981 !important; box-shadow: none !important; }
        .dark .edot { background: #10B981 !important; box-shadow: none !important; }

        .ti { background: transparent !important; }
        .topbar { background: rgba(250,250,250,0.85) !important; border-bottom: 1px solid #EBEBEB !important; }
        .dark .topbar { background: rgba(13,13,18,0.85) !important; border-bottom: 1px solid #27272a !important; }

        /* Document Preview Modal */
        .doc-ov{position:fixed;inset:0;z-index:1000;background:rgba(9,9,11,.7);display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(8px)}
        .doc-box{background:#fff;width:95%;max-width:1400px;height:95vh;overflow:hidden;border-radius:24px;box-shadow:0 40px 100px rgba(0,0,0,.3);display:flex;flex-direction:column}
        .doc-header{padding:18px 32px;border-bottom:1px solid #F4F4F5;display:flex;align-items:center;justify-content:space-between;background:#fff;position:sticky;top:0;z-index:10;border-radius:24px 24px 0 0}
        .doc-title{font-size:17px;font-weight:700;color:#111118}
        .doc-body{padding:40px 60px;background:#FAFAFA;flex:1}
        .doc-paper{background:#fff;padding:60px;box-shadow:0 10px 30px rgba(0,0,0,.05);border:1px solid #EBEBEB;min-height:900px;position:relative;display:flex;flex-direction:column;font-family:'Geist',serif}
        
        /* Cert Card in Preview */
        .doc-cert-head{text-align:center;margin-bottom:60px;border-bottom:1px solid #F4F4F5;padding-bottom:40px}
        .doc-cert-subtitle{font-size:14px;color:#9B9BAA;text-transform:uppercase;letter-spacing:.3em;font-weight:600;margin-bottom:15px;display:block}
        .doc-cert-title{font-size:36px;font-weight:800;color:#111118;letter-spacing:-.04em;line-height:1.2;margin:20px 0}
        .doc-cert-receipient{text-align:center;margin:60px 0}
        .doc-cert-for{font-size:17px;color:#71717A;font-style:italic;margin-bottom:10px}
        .doc-cert-name{font-size:32px;font-weight:700;color:#111118;border-bottom:2px solid #111118;display:inline-block;padding:0 30px 5px}
        .doc-cert-desc{text-align:center;font-size:15px;color:#52525B;line-height:1.8;max-width:480px;margin:30px auto 0}
        .doc-cert-footer{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;padding-top:60px}
        .doc-cert-sig{border-top:1px solid #111118;padding-top:10px;width:160px;text-align:center;font-weight:600;font-size:13px;color:#111118}
        .doc-cert-org{font-size:20px;font-weight:800;color:#111118}
        .doc-cert-seal{position:absolute;top:40px;right:40px;width:90px;height:90px;border-radius:50%;border:3px double #EBEBEB;display:flex;align-items:center;justify-content:center;font-weight:800;color:#EBEBEB;transform:rotate(-15deg);font-size:10px;text-align:center;padding:8px}

        /* Resume in Preview */
        .doc-resume-head{border-bottom:3px solid #111118;padding-bottom:24px;margin-bottom:40px}
        .doc-resume-name{font-size:38px;font-weight:800;color:#111118;letter-spacing:-.05em;margin-bottom:8px}
        .doc-resume-role{font-size:18px;font-weight:600;color:#52525B;margin-bottom:12px}
        .doc-resume-contact{display:flex;gap:15px;font-size:13px;color:#71717A;font-family:'Geist Mono',monospace}
        .doc-resume-sec{margin-bottom:35px}
        .doc-resume-stitle{font-size:16px;font-weight:800;color:#111118;text-transform:uppercase;letter-spacing:.15em;border-bottom:1px solid #EBEBEB;margin-bottom:20px;padding-bottom:6px}
        .doc-resume-item{margin-bottom:20px}
        .doc-resume-itop{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:5px}
        .doc-resume-ititle{font-size:16px;font-weight:700;color:#111118}
        .doc-resume-iperiod{font-size:12px;font-family:'Geist Mono',monospace;color:#9B9BAA}
        .doc-resume-iorg{font-size:14px;font-weight:600;color:#52525B;margin-bottom:8px}
        .doc-resume-idet{font-size:14px;color:#52525B;line-height:1.7}
        .doc-resume-skills{display:flex;flex-wrap:wrap;gap:8px}
        .doc-resume-skill{background:#F4F4F5;color:#111118;padding:4px 10px;border-radius:4px;font-size:12px;font-weight:600;font-family:'Geist Mono',monospace}

        @media(max-width:768px){
          .doc-body{padding:20px}
          .doc-paper{padding:30px;min-height:auto}
          .doc-cert-title{font-size:26px}
          .doc-box{max-width:100%}
        }
      `}</style>

      <div className={`shell${isDark ? " dark" : ""}`}>
        {/* Background Video (Homepage only) */}
        {tab === "Projects" && (
          <div className="bg-video-wrap">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="https://assets.mixkit.co/videos/preview/mixkit-abstract-motion-design-of-white-spheres-moving-slowly-31627-large.mp4"
            />
            <div className="bg-video-overlay" />
          </div>
        )}

        {/* Topbar */}
        {toast && <div className={`toast${toast.type === "error" ? " error" : ""}`}>{toast.msg}</div>}

        {/* Contact Modal */}
        {contactOpen && (
          <div className="ov" onClick={() => { if (!contactSent) setContactOpen(false); }}>
            <div className="contact-modal" onClick={e => e.stopPropagation()}>
              {contactSent ? (
                <div className="sent-state">
                  <div className="sent-icon">✓</div>
                  <div className="sent-title">Message sent!</div>
                  <div className="sent-sub">Saurav will get back to you within 24 hours.</div>
                </div>
              ) : (
                <>
                  <div className="cm-head">
                    <div><div className="cm-title">Get in touch</div><div className="cm-sub">sauravkai2023@gmail.com · Replies within 24 hrs</div></div>
                    <button className="lbcl" onClick={() => setContactOpen(false)}>✕</button>
                  </div>
                  <div className="cm-body">
                    <div className="fg"><label>Your name</label><input className="fi" placeholder="Saurav kumar" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} /></div>
                    <div className="fg"><label>Email address</label><input className="fi" type="email" placeholder="sauravkai2023@gmail.com" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} /></div>
                    <div className="fg"><label>Message</label><textarea className="fta" style={{ minHeight: 110 }} placeholder="Tell me about your project or opportunity..." value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} /></div>
                    <button className="bd" style={{ width: "100%", justifyContent: "center" }} onClick={handleContact}>Send message →</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Blog post reader */}
        {blogOpen && (
          <div className="reader-ov" onClick={() => setBlogOpen(null)}>
            <div className="reader" onClick={e => e.stopPropagation()}>
              <div className="reader-head">
                <div>
                  <span className="reader-tag">{blogOpen.tag}</span>
                  <div className="reader-title">{blogOpen.title}</div>
                  <div className="reader-meta">{blogOpen.date} · {blogOpen.read}</div>
                </div>
                <button className="lbcl" onClick={() => setBlogOpen(null)}>✕</button>
              </div>
              {renderBlogMedia(blogOpen)}
              <div className="reader-body">{blogOpen.content || "Full content coming soon."}</div>
              <div className="breader-comments">
                <div className="breader-comment-title">Community discussion</div>
                {(blogOpen.commentList || []).length > 0 ? (
                  <div className="breader-comment-list">
                    {(blogOpen.commentList || []).map((comment) => (
                      <div key={comment.id} className="breader-comment">
                        <div className="breader-comment-author">{comment.author}</div>
                        <div className="breader-comment-text">{comment.text}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="breader-comment-empty">No comments yet. Be the first to share your thoughts.</div>
                )}
                <div className="breader-comment-form">
                  <input
                    className="breader-comment-input"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    onKeyDown={(e) => { if (e.key === "Enter") handleAddComment(); }}
                  />
                  <button className="breader-comment-submit" onClick={handleAddComment}>Post</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Document Preview Modal */}
        {docPreview && (
          <div className="doc-ov" onClick={() => setDocPreview(null)}>
            <div className="doc-box" onClick={e => e.stopPropagation()}>
              <div className="doc-header">
                <div className="doc-title">Document Preview</div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="bd" style={{ fontSize: 13, padding: "7px 16px" }} 
                    onClick={() => docPreview.type === "cert" ? performDownloadCert(docPreview.data) : performDownloadResume()}>
                    Download PDF ↓
                  </button>
                  <button className="lbcl" onClick={() => setDocPreview(null)}>✕</button>
                </div>
              </div>
              <div className="doc-body" style={{ padding: 0, flex: 1, height: "100%" }}>
                <iframe 
                  src={docPreview.type === "cert" ? docPreview.data.doc : docPreview.doc} 
                  style={{ width: "100%", height: "100%", border: "none" }}
                  title="Document Preview"
                />
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirm */}
        {deleteConfirm && (
          <div className="confirm-ov" onClick={(e) => { e.stopPropagation(); setDeleteConfirm(null); }}>
            <div className="confirm-box" onClick={e => e.stopPropagation()}>
              <div className="confirm-title">Delete "{deleteConfirm.label}"?</div>
              <div className="confirm-sub">This action cannot be undone.</div>
              <div className="confirm-actions">
                <button className="bd" style={{ flex: 1, justifyContent: "center", background: "#DC2626", fontSize: 13 }} onClick={deleteConfirm.onConfirm}>Delete</button>
                <button className="bl" style={{ flex: 1, justifyContent: "center", fontSize: 13 }} onClick={(e) => { e.stopPropagation(); setDeleteConfirm(null); }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Lightbox */}
        {lightbox && (
          <div className="ov" onClick={() => setLightbox(null)}>
            <div className="lb" onClick={e => e.stopPropagation()}>
              <div className="lbh">
                <div><div className="lborg">{lightbox.org}</div><div className="lbt">{lightbox.title}</div></div>
                <button className="lbcl" onClick={() => setLightbox(null)}>✕</button>
              </div>
              {[
                ["Credential ID", lightbox.credId, false, true],
                ["Issued", lightbox.issued, false, false],
                ["Expires", lightbox.expires, false, false],
                ["Status", "● Active", true, false],
              ].map(([k, v, g, copyable]) => (
                <div key={k} className="lbrow">
                  <span className="lbk">{k}</span>
                  <span className={`lbv${g ? " g" : ""}`}
                    onClick={copyable ? () => copyCredId(lightbox.id, lightbox.credId) : undefined}
                    title={copyable ? "Click to copy" : undefined}>
                    {v} {copyable && <span style={{ fontSize: 10, color: copiedId === lightbox.id ? "#16A34A" : "#C4C4CC" }}>{copiedId === lightbox.id ? "✓ copied" : "copy"}</span>}
                  </span>
                </div>
              ))}
              <div className="lbft">
                <a href={lightbox.verifyUrl} target="_blank" rel="noreferrer" className="bd" style={{ flex: 1, justifyContent: "center", fontSize: 13 }}>Verify ↗</a>
                <button className="bl" style={{ flex: 1, justifyContent: "center", fontSize: 13 }} onClick={() => downloadCert(lightbox)}>Download ↓</button>
              </div>
            </div>
          </div>
        )}

        
        {/* Project Modal */}
        {projectOpen && (
          <div className="pm-ov" onClick={() => setProjectOpen(null)}>
            <div className="pm-box" onClick={e => e.stopPropagation()} style={{ position: "relative" }}>
              <button className="pm-btn" onClick={() => setProjectOpen(null)}>✕</button>
              {projectOpen.image && <img src={projectOpen.image} className="pm-img" alt={projectOpen.title} />}
              <div className="pm-body">
                <div className="pm-top">
                  <div>
                    <div className="pm-title">{projectOpen.title}</div>
                    <div className="pm-sub">{projectOpen.industry} · {projectOpen.role} · {projectOpen.year}</div>
                  </div>
                </div>
                <div className="pm-desc">{projectOpen.fullDetails || projectOpen.description}</div>
                <div className="pchips" style={{ marginBottom: 24 }}>{projectOpen.stack.map(t => <span key={t} className="sc">{t}</span>)}</div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <a href={projectOpen.github} target="_blank" rel="noreferrer" className="bd" style={{ flex: 1, justifyContent: "center" }}>GitHub ↗</a>
                  <a href={projectOpen.demo} target="_blank" rel="noreferrer" className="bl" style={{ flex: 1, justifyContent: "center" }}>Live Demo ↗</a>
                </div>
              </div>
            </div>
          </div>
        )}
  
        {/* Topbar */}
        <header className="topbar">
          <div className="w">
            <div className="ti">
              <div className="logo" onClick={() => navTo("Projects")}>
                <div className="lm">SK</div>
                <div><div className="lt">Saurav Kumar</div><div className="ls">Full-Stack Developer</div></div>
              </div>
              <nav className="navlist">
                {NAV.map(n => <button key={n} className={`ni${tab === n ? " on" : ""}`} onClick={() => navTo(n)}>{n}</button>)}
              </nav>
              <button className="ni" onClick={() => setIsDark(!isDark)} title="Toggle Dark Mode">{isDark ? "☀️" : "🌙"}</button>
              <button className="ncta" onClick={() => setContactOpen(true)}>Contact ↗</button>
              <button className="hbg" onClick={() => setMobileOpen(o => !o)}><span /><span /><span /></button>
            </div>
            <div className={`mobnav${mobileOpen ? " open" : ""}`}>
              {NAV.map(n => <button key={n} className={`mobitem${tab === n ? " on" : ""}`} onClick={() => navTo(n)}>{n}</button>)}
              <button className="mobitem" onClick={() => { setMobileOpen(false); setContactOpen(true); }}>Contact ↗</button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="w">
          <div className="hero hero-layout">
            <div className="hero-text">
              <div className="eyebrow" style={{ color: '#6366f1', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px' }}>Full-Stack Engineer</div>
              <h1 className="h1" style={{ marginBottom: '20px', lineHeight: '1.1' }}>
                Full-Stack Engineering.<br />
                <span style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Optimized.</span>
              </h1>
              <div className="hbody" style={{ fontSize: '19px', maxWidth: '640px', color: '#374151', lineHeight: '1.8' }}>
                I am <strong>Saurav Kumar</strong>. I build robust, high-performance web applications using <strong>Node.js</strong> and <strong>React</strong>. With a data-driven approach and over <strong>400+ algorithmic problems</strong> solved, I focus on engineering secure, scalable architectures that deliver exceptional digital experiences.
              </div>
              <div className="hacts">
                <button className="bd" onClick={() => navTo("Projects")}>View work ↗</button>
                <button className="bl" onClick={() => setContactOpen(true)}>Get in touch</button>
                <button className="bl" onClick={performDownloadResume}>Download Resume (PDF)</button>
                <button className="bl" onClick={() => window.print()}>Print Portfolio (PDF)</button>
              </div>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/saurav-kumar11008" target="_blank" rel="noreferrer" className="social-link">
                  <svg viewBox="0 0 24 24" className="icon-linkedin"><path d="M19 0H5C2.24 0 0 2.24 0 5V19C0 21.76 2.24 24 5 24H19C21.76 24 24 21.76 24 19V5C24 2.24 21.76 0 19 0ZM7.44 19H4.67V9.67H7.44V19ZM6.06 8.52C5.16 8.52 4.44 7.79 4.44 6.89C4.44 5.99 5.16 5.27 6.06 5.27C6.96 5.27 7.68 5.99 7.68 6.89C7.68 7.79 6.96 8.52 6.06 8.52ZM19.33 19H16.57V14.12C16.57 12.96 16.55 11.46 14.96 11.46C13.34 11.46 13.1 12.72 13.1 14.04V19H10.33V9.67H13V10.95H13.04C13.41 10.24 14.33 9.49 15.69 9.49C18.52 9.49 19.04 11.35 19.04 13.78V19H19.33Z"/></svg>
                  LinkedIn
                </a>
                <a href="https://github.com/sauravkai-01" target="_blank" rel="noreferrer" className="social-link">
                  <svg viewBox="0 0 24 24" className="icon-github"><path d="M12 1.27a11 11 0 00-3.48 21.46c.55.1.75-.24.75-.53v-1.87c-3.06.67-3.71-1.48-3.71-1.48-.5-1.27-1.22-1.61-1.22-1.61-1-1 .08-.68.08-.68 1.1.08 1.68 1.13 1.68 1.13.98 1.69 2.59 1.2 3.22.92.1-.71.38-1.2.7-1.48-2.44-.28-5-1.22-5-5.45 0-1.21.43-2.19 1.14-2.96-.11-.28-.5-1.4.1-2.91 0 0 .93-.3 3.04 1.14a10.5 10.5 0 015.5 0c2.1-1.44 3.03-1.14 3.03-1.14.6 1.51.21 2.63.1 2.91.71.77 1.14 1.75 1.14 2.96 0 4.24-2.57 5.17-5.02 5.44.4.34.75 1.01.75 2.03v3.02c0 .29.2.63.75.53A11 11 0 0012 1.27"/></svg>
                  GitHub
                </a>
                <a href="https://leetcode.com/u/saurav_kai/" target="_blank" rel="noreferrer" className="social-link">
                  <svg viewBox="0 0 24 24" className="icon-leetcode"><path d="M13.483 0a1.374 1.374 0 00-.961.406L5.516 7.412a1.378 1.378 0 101.948 1.948l7.006-7.006A1.374 1.374 0 0013.483 0zm4.274 2.454a1.374 1.374 0 00-.961.406l-5.694 5.694a1.378 1.378 0 101.948 1.948l5.694-5.694a1.374 1.374 0 00-.987-2.354zM8.528 8.528a1.378 1.378 0 101.948 1.948l-2.01 2.01a1.378 1.378 0 101.948 1.948l2.01-2.01a1.378 1.378 0 101.948 1.948L12.412 16.4l-3.884 3.884a1.374 1.374 0 001.948 1.948l3.884-3.884a1.374 1.374 0 00-.961-2.354l2.01-2.01a1.374 1.374 0 00.961.406 1.374 1.374 0 00.961-.406l4.01-4.01a1.374 1.374 0 000-1.948L16.4 4.043a1.374 1.374 0 00-1.948 0L10.442 8.053a1.374 1.374 0 00-.406.961 1.374 1.374 0 00.406.961 1.374 1.374 0 000-1.948 1.374 1.374 0 00-.406-.406 1.374 1.374 0 00-.961-.406 1.374 1.374 0 00-.961.406z"/></svg>
                  LeetCode
                </a>
                <button type="button" className="social-link" onClick={copyEmail}>
                  <svg viewBox="0 0 24 24" className="icon-email"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  {emailCopied ? "Email copied ✓" : "Copy email"}
                </button>
              </div>
            </div>
            <div className="hero-image-container">
              <img src="/profile.png" className="hero-image" alt="Saurav Kumar" />
            </div>
          </div>
          <div className="metrics" style={{ marginTop: -32, position: 'relative', zIndex: 10 }}>
            {[
              [String(projects.length), "Projects delivered"],
              [String(certs.length), "Certifications"],
              ["$2B+", "Revenue generated"],
              ["99.9%", "Uptime achieved"]
            ].map(([n, l]) => (
              <div key={l} className="metric"><div className="mn">{n}</div><div className="ml">{l}</div></div>
            ))}
          </div>
        </div>

        {/* Projects */}
        {tab === "Projects" && (
          <div className="w"><div className="sec">
            <div className="sh">
              <div><div className="st">Selected Work</div><div className="ss">{filtered.length} of {projects.length} projects</div></div>
            </div>
            <div className="filters">
              <div className="frow"><span className="flabel">STACK</span>{allStacks.map(s => <button key={s} className={`chip${fStack === s ? " on" : ""}`} onClick={() => setFStack(s)}>{s}</button>)}</div>
              <div className="frow"><span className="flabel">INDUSTRY</span>{allIndustries.map(i => <button key={i} className={`chip${fIndustry === i ? " on" : ""}`} onClick={() => setFIndustry(i)}>{i}</button>)}</div>
              <div className="frow"><span className="flabel">ROLES</span>{allRoles.map(r => <button key={r} className={`chip${fRole === r ? " on" : ""}`} onClick={() => setFRole(r)}>{r}</button>)}</div>
            </div>
            {filtered.length === 0 && <div className="empty">No projects match the selected filters.</div>}
            <div className="pgrid">
              {filtered.map(p => (
                <div key={p.id} className="pc" onClick={() => setProjectOpen(p)}>
                  <button className="del-btn" title="Remove project" onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ label: p.title, onConfirm: () => handleDeleteProject(p.id) }); }}>✕</button>
                  {p.image && <img src={p.image} className="pimg" alt={p.title} />}
                  <div className="ptop">
                    <span className="pyear">{p.year}</span>
                    <span className="pmet">{p.metric}</span>
                  </div>
                  <div className="ptitle">{p.title}</div>
                  <div className="pdesc">{p.description}</div>
                  <div className="pchips">{p.stack.map(t => <span key={t} className="sc">{t}</span>)}{p.industry && <span className="ic">{p.industry}</span>}</div>
                  <div className="pfoot">
                    <a onClick={e => e.stopPropagation()} href={p.github} target="https://github.com/" rel="noreferrer" className="plnk">GitHub ↗</a>
                    <a onClick={e => e.stopPropagation()} href={p.demo} target="_blank" rel="noreferrer" className="plnk">Live Demo ↗</a>
                    <span className="prole">{p.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div></div>
        )}

        {/* Credentials */}
        {tab === "Credentials" && (
          <div className="w"><div className="sec">
            <div className="sh">
              <div><div className="st">Certifications & Credentials</div><div className="ss">Click any card to view details & download</div></div>
            </div>
            <div className="cgrid">
              {certs.map(c => (
                <div key={c.id} className="cc" onClick={() => downloadCert(c)}>
                  <button className="cdel" title="Remove" onClick={e => { e.stopPropagation(); setDeleteConfirm({ label: c.title, onConfirm: () => handleDeleteCert(c.id) }); }}>✕</button>
                  <div className="cbanner" style={{ background: `${c.accent}0D` }}>
                    <div className="cabbr" style={{ background: `${c.accent}18`, color: c.accent, border: `1.5px solid ${c.accent}33` }}>{c.abbr}</div>
                    <span className="cvbadge">✓ Verified</span>
                  </div>
                  <div className="cbody">
                    <div className="corg">{c.org}</div>
                    <div className="cname">{c.title}</div>
                    <div className="cid" onClick={e => { e.stopPropagation(); copyCredId(c.id, c.credId); }} title="Click to copy ID">
                      ID · {c.credId}
                      <span style={{ fontSize: 10, color: copiedId === c.id ? "#16A34A" : "#C4C4CC" }}>{copiedId === c.id ? "✓" : "⎘"}</span>
                    </div>
                  </div>
                  <div className="cacts" onClick={e => e.stopPropagation()}>
                    <button className="cbtn cbtnp" onClick={() => downloadCert(c)}>View PDF ↗</button>
                    <button className="cbtn cbtns" onClick={() => performDownloadCert(c)}>Download PDF ↓</button>
                  </div>
                </div>
              ))}
            </div>
          </div></div>
        )}

        {/* Skills */}
        {tab === "Skills" && (
          <div className="w"><div className="sec">
            <div className="sh"><div><div className="st">Tech Stack & Proficiency</div><div className="ss">Verified strengths and technology focus areas tailored for enterprise web product delivery.</div></div></div>
            <div className="skill-intro">These categories reflect the skills I bring to product development, architecture, and cloud-native delivery. The proficiency levels are based on active experience and recent delivery work.</div>
            <div className="skill-card-panel">
              <div className="skill-cards">
                {Object.entries(SKILL_AREA_INFO).map(([key, info]) => (
                  <div key={key} className="scard">
                    <div className="scard-title">{key}</div>
                    <div className="scard-meta">{info.questions} · {info.projects}</div>
                    <div className="scard-sub">
                      {key === "Languages" && "Building performant apps and intelligent data workflows through strong language foundations."}
                      {key === "Frameworks" && "Crafting scalable UIs and backend services with modern frameworks and platform tooling."}
                      {key === "Cloud" && "Delivering resilient infrastructure and automation for production-critical systems."}
                    </div>
                    <div className="scard-list">
                      {info.examples.map(p => <span key={p} className="scard-item">{p}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="skill-filter-row">
              <div className="stabs">
                {Object.keys(SKILLS).map(k => <button key={k} className={`stab${skillCat === k ? " on" : ""}`} onClick={() => setSkillCat(k)}>{k}</button>)}
              </div>
              <div className="skill-filter-note">Select a category to see experience and proficiency in that area.</div>
            </div>
            <div className="skill-list-panel">
              <div className="slist">
                {SKILLS[skillCat].map(s => (
                  <div key={s.name} className="srow">
                    <div className="slabel">
                      <div className="sname">{s.name}</div>
                      <div className="snote">{s.note}</div>
                    </div>
                    <div className="strack"><div className="sfill" style={{ width: animSkills ? `${s.level}%` : "0%" }} /></div>
                    <span className="spct">{s.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div></div>
        )}

        
        {/* Education */}
        {tab === "Education" && (
          <div className="w"><div className="sec">
            <div className="sh">
              <div><div className="st">Academic Background</div><div className="ss">Formal education and degrees</div></div>
            </div>
            <div style={{ overflowX: "auto", marginTop: "24px", maxHeight: "none" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#ffffff",
                border: "1px solid #e0e7ff",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 8px 20px -4px rgba(0, 0, 0, 0.06)",
                tableLayout: "fixed"
              }}>
                <thead>
                  <tr style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "800", color: "#ffffff", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", width: "25%", borderRight: "1px solid rgba(255,255,255,0.1)" }}>Degree</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "800", color: "#ffffff", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", width: "22%", borderRight: "1px solid rgba(255,255,255,0.1)" }}>Institution</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "800", color: "#ffffff", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", width: "25%", borderRight: "1px solid rgba(255,255,255,0.1)" }}>Details</th>
                    <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "800", color: "#ffffff", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", width: "28%" }}>Highlights</th>
                  </tr>
                </thead>
                <tbody>
                  {edu && edu.map((e, idx) => {
                    const rowConfigs = [
                      { bg: "#fafbff", hover: "#f5f7ff", border: "#667eea", badgeBg: "#eef2ff", badgeText: "#4f46e5", badgeBorder: "#c7d2fe" },
                      { bg: "#fffbf0", hover: "#fff9f5", border: "#f59e0b", badgeBg: "#fef3c7", badgeText: "#b45309", badgeBorder: "#fde68a" },
                      { bg: "#f8f9fb", hover: "#f5f6f8", border: "#8b5cf6", badgeBg: "#f3e8ff", badgeText: "#7c3aed", badgeBorder: "#e9d5ff" }
                    ];
                    const config = rowConfigs[idx % rowConfigs.length];
                    return (
                      <tr key={e.id} style={{
                        borderBottom: idx !== edu.length - 1 ? "1px solid #f0f0f5" : "none",
                        transition: "all 0.2s ease",
                        background: config.bg,
                        borderLeft: `4px solid ${config.border}`,
                        verticalAlign: "top"
                      }}
                      onMouseEnter={(event) => {
                        event.currentTarget.style.background = config.hover;
                        event.currentTarget.style.boxShadow = "inset 0 0 12px rgba(0, 0, 0, 0.02)";
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.background = config.bg;
                        event.currentTarget.style.boxShadow = "none";
                      }}>
                        <td style={{ padding: "16px 20px", fontWeight: "700", color: "#111827", fontSize: "14px", verticalAlign: "top", textAlign: "left", borderRight: "1px solid #f0f0f5" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                            <span style={{ fontSize: "18px", flexShrink: 0 }}>{e.icon}</span>
                            <span style={{ lineHeight: "1.4" }}>{e.degree}</span>
                          </div>
                        </td>
                        <td style={{ padding: "16px 20px", color: "#374151", fontSize: "13px", fontWeight: "600", verticalAlign: "top", textAlign: "left", borderRight: "1px solid #f0f0f5" }}>{e.school}</td>
                        <td style={{ padding: "16px 20px", color: "#374151", fontSize: "12px", lineHeight: "1.6", verticalAlign: "top", textAlign: "left", borderRight: "1px solid #f0f0f5" }}>{e.details}</td>
                        <td style={{ padding: "16px 20px", verticalAlign: "top", textAlign: "left" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-start" }}>
                            {e.achievements && e.achievements.map((ach, i) => (
                              <div key={i} style={{
                                background: config.badgeBg,
                                color: config.badgeText,
                                padding: "8px 12px",
                                borderRadius: "8px",
                                fontSize: "12px",
                                fontWeight: "600",
                                border: `1px solid ${config.badgeBorder}`,
                                lineHeight: "1.4",
                                transition: "all 0.15s ease",
                                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)",
                                cursor: "default"
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.06)";
                                e.currentTarget.style.transform = "translateY(-1px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.03)";
                                e.currentTarget.style.transform = "translateY(0)";
                              }}>
                                {typeof ach === 'string' ? (
                                  <>✓ {ach}</>
                                ) : (
                                  <a href={ach.doc} target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    ✓ {ach.text} <span style={{ fontSize: '10px', opacity: 0.7, background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px' }}>View Cert ↗</span>
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div></div>
        )}

        {/* Blog */}
        {tab === "Blog" && (
          <div className="w"><div className="sec">
            <div className="sh">
              <div><div className="st">Writing</div><div className="ss">Technical insights & opinions</div></div>
            </div>
            <div className="blist">
              <div className="bgrid">
                {blogPosts.map(b => (
                  <div key={b.id} className={`bcard${selectedBlogId === b.id ? " active" : ""}`} onClick={() => setSelectedBlogId(b.id)}>
                    <button className="bdel" onClick={e => { e.stopPropagation(); setDeleteConfirm({ label: b.title, onConfirm: () => handleDeleteBlog(b.id) }); }}>✕</button>
                    <div className="bcard-row">
                      <div className="bcard-details">
                        <div className="bcard-head">
                          <div className="bcard-author">
                            <div className="bcard-avatar">{(b.tag || "B").slice(0, 1)}</div>
                            <div>
                              <div className="bcard-user">In-Depth Tech Writing</div>
                              <div className="bcard-role">{b.tag || "Draft"} · {b.read}</div>
                            </div>
                          </div>
                          <span className="bcard-date">{b.date}</span>
                        </div>
                        <div className="bcard-body">
                          <div className="bcard-tag">{b.tag || "Draft"}</div>
                          <div className="bcard-title">{b.title}</div>
                          <div className="bcard-caption">{getBlogExcerpt(b.content)}</div>
                        </div>
                        <div className="bcard-footer">
                          <div className="bcard-actions-row">
                            <button className={`bcard-action${likedBlogs.includes(b.id) ? " active" : ""}`} onClick={e => { e.stopPropagation(); handleBlogLike(b.id); }}>
                              ❤️ {b.likes}
                            </button>
                            <button className="bcard-action" onClick={e => { e.stopPropagation(); setBlogOpen(b); }}>
                              💬 {b.comments}
                            </button>
                            <button className="bcard-action" onClick={e => { e.stopPropagation(); handleBlogShare(b); }}>
                              🔄 {b.shares}
                            </button>
                          </div>
                          <div className="bcard-actions" onClick={e => { e.stopPropagation(); setBlogOpen(b); }}>Read more</div>
                        </div>
                      </div>
                      {(b.image || b.video) && (
                        <div className="bcard-media" onClick={() => setBlogOpen(b)}>
                          {b.image && !b.video && <img className="bcard-image" src={b.image} alt={b.title} />}
                          {b.video && isVideoFile(b.video) && (
                            <video className="bcard-video" src={b.video} muted autoPlay loop playsInline />
                          )}
                          {b.video && !isVideoFile(b.video) && extractYouTubeId(b.video) && (
                            <iframe
                              className="bcard-video"
                              src={getYouTubeEmbedUrl(b.video, true)}
                              title={b.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          )}
                          {b.video && !isVideoFile(b.video) && !extractYouTubeId(b.video) && (
                            <div className="bcard-video-placeholder">▶ Video featured content</div>
                          )}
                          {b.video && <div className="bcard-media-overlay">Play</div>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sub-row">
              {subDone
                ? <div className="ok" style={{ flex: 1 }}>✓ You're subscribed! New posts will be sent to your inbox.</div>
                : <>
                  <input className="sub-input" type="email" placeholder="your@email.com" value={subEmail} onChange={e => setSubEmail(e.target.value)} onKeyDown={e => { if (e.key === "Enter") handleSubscribe(); }} />
                  <button className="bd" style={{ fontSize: 13, padding: "9px 20px", whiteSpace: "nowrap" }} onClick={handleSubscribe}>Subscribe →</button>
                </>}
            </div>
          </div></div>
        )}

        {/* Admin */}
        {tab === "Admin" && (
          <div className="w"><div className="sec">
            {!adminAuth ? (
              <div className="gate">
                <div className="gicon">🔐</div>
                <div className="gtitle">Admin Dashboard</div>
                <div className="gsub">Restricted access — enter your credentials to continue</div>
                <input className={`ginput${passErr ? " err" : ""}`} type="password" placeholder="Password  (hint: demo123)"
                  value={adminPass} onChange={e => setAdminPass(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") tryUnlock(); }} />
                <button className="bd" onClick={tryUnlock}>Unlock Dashboard →</button>
              </div>
            ) : (
              <div>
                <div className="sh">
                  <div><div className="st">Admin Dashboard</div><div className="ss">Manage content without touching code</div></div>
                  <button className="bl" style={{ fontSize: 13, padding: "7px 16px" }} onClick={() => { setAdminAuth(false); setAdminPass(""); showToast("Signed out."); }}>Sign out</button>
                </div>
                <div className="akpis">
                  {[["Projects", projects.length], ["Certifications", certs.length], ["Blog posts", blogPosts.length]].map(([l, n]) => (
                    <div key={l} className="akpi"><div className="akpin">{n}</div><div className="akpil">{l}</div></div>
                  ))}
                </div>
                <div className="alayout">
                  <div className="aside">
                    {[["projects", "📁  Projects"], ["blog", "✍️  Blog"], ["certs", "🏆  Certs"]].map(([k, l]) => (
                      <button key={k} className={`ani${adminTab === k ? " on" : ""}`} onClick={() => setAdminTab(k)}>{l}</button>
                    ))}
                  </div>
                  <div className="apanel">

                    {adminTab === "projects" && (
                      <>
                        <div className="ptit">Add new project</div>
                        <div className="fg"><label>Title *</label><input className="fi" placeholder="e.g. NeuroCommerce AI" value={pForm.title} onChange={e => setPForm({ ...pForm, title: e.target.value })} /></div>
                        <div className="fg"><label>Tech stack (comma-separated)</label><input className="fi" placeholder="React, Node.js, AWS" value={pForm.stack} onChange={e => setPForm({ ...pForm, stack: e.target.value })} /></div>
                        <div className="frow2">
                          <div className="fg"><label>Industry</label><input className="fi" placeholder="e.g. FinTech" value={pForm.industry} onChange={e => setPForm({ ...pForm, industry: e.target.value })} /></div>
                          <div className="fg"><label>Role</label><input className="fi" placeholder="e.g. Lead Dev" value={pForm.role} onChange={e => setPForm({ ...pForm, role: e.target.value })} /></div>
                        </div>
                        <div className="frow2">
                          <div className="fg"><label>GitHub URL</label><input className="fi" placeholder="https://github.com/..." value={pForm.github} onChange={e => setPForm({ ...pForm, github: e.target.value })} /></div>
                          <div className="fg"><label>Demo URL</label><input className="fi" placeholder="https://..." value={pForm.demo} onChange={e => setPForm({ ...pForm, demo: e.target.value })} /></div>
                        </div>
                        <div className="fg"><label>Description</label><textarea className="fta" placeholder="Describe the project..." value={pForm.description} onChange={e => setPForm({ ...pForm, description: e.target.value })} /></div>
                        <button className="bd" style={{ fontSize: 13 }} onClick={handleAddProject}>Add project →</button>
                        <div className="div" />
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>Existing projects ({projects.length})</div>
                        <div className="item-list">
                          {projects.map(p => (
                            <div key={p.id} className="item-row">
                              <span className="item-row-title">{p.title}</span>
                              <span className="item-row-meta">{p.year} · {p.role}</span>
                              <button className="item-del" onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ label: p.title, onConfirm: () => handleDeleteProject(p.id) }); }}>✕</button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {adminTab === "blog" && (
                      <>
                        <div className="ptit">New blog post</div>
                        <div className="fg"><label>Title *</label><input className="fi" placeholder="Post title..." value={bForm.title} onChange={e => setBForm({ ...bForm, title: e.target.value })} /></div>
                        <div className="fg"><label>Category / Tag</label><input className="fi" placeholder="e.g. Architecture, DevOps, Opinion" value={bForm.tag} onChange={e => setBForm({ ...bForm, tag: e.target.value })} /></div>
                        <div className="fg"><label>Content</label><textarea className="fta" style={{ minHeight: 130 }} placeholder="Write your post..." value={bForm.content} onChange={e => setBForm({ ...bForm, content: e.target.value })} /></div>
                        <div className="fg"><label>Image URL (optional)</label><input className="fi" placeholder="https://example.com/image.jpg" value={bForm.image} onChange={e => setBForm({ ...bForm, image: e.target.value })} /></div>
                        <div className="fg"><label>Video URL (optional)</label><input className="fi" placeholder="YouTube or MP4 URL" value={bForm.video} onChange={e => setBForm({ ...bForm, video: e.target.value })} /></div>
                        <button className="bd" style={{ fontSize: 13 }} onClick={handleAddBlog}>Publish draft →</button>
                        <div className="div" />
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>All posts ({blogPosts.length})</div>
                        <div className="item-list">
                          {blogPosts.map(b => (
                            <div key={b.id} className="item-row">
                              {b.image ? <img className="bthumb" src={b.image} alt={b.title} /> : b.video ? <div className="bthumb video-thumb">▶</div> : null}
                              <span className="item-row-title">{b.title}</span>
                              <span className="item-row-meta">{b.isDraft ? "Draft" : b.date}</span>
                              <button className="item-del" onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ label: b.title, onConfirm: () => handleDeleteBlog(b.id) }); }}>✕</button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {adminTab === "certs" && (
                      <>
                        <div className="ptit">Add certification</div>
                        <div className="uz">
                          <input type="file" className="uzin" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileUpload} />
                          <div className="uzic">📄</div>
                          <div className="uzm">{certFile ? certFile.name : "Drop PDF or image, or click to browse"}</div>
                          <div className="uzs">{certFile ? uploadMsg : "Integrates with AWS S3 · Cloudinary · Firebase Storage"}</div>
                        </div>
                        <div className="fg"><label>Certificate title *</label><input className="fi" placeholder="e.g. AWS Solutions Architect – Professional" value={cForm.title} onChange={e => setCForm({ ...cForm, title: e.target.value })} /></div>
                        <div className="fg"><label>Issuing organization</label><input className="fi" placeholder="e.g. Amazon Web Services" value={cForm.org} onChange={e => setCForm({ ...cForm, org: e.target.value })} /></div>
                        <div className="fg"><label>Credential ID</label><input className="fi" placeholder="e.g. AWS-SAP-12345" value={cForm.credId} onChange={e => setCForm({ ...cForm, credId: e.target.value })} /></div>
                        <div className="frow2">
                          <div className="fg"><label>Issued</label><input className="fi" placeholder="e.g. Mar 2024" value={cForm.issued} onChange={e => setCForm({ ...cForm, issued: e.target.value })} /></div>
                          <div className="fg"><label>Expires</label><input className="fi" placeholder="e.g. Mar 2027" value={cForm.expires} onChange={e => setCForm({ ...cForm, expires: e.target.value })} /></div>
                        </div>
                        <div className="fg"><label>Verification URL</label><input className="fi" placeholder="https://credly.com/badges/..." value={cForm.verifyUrl} onChange={e => setCForm({ ...cForm, verifyUrl: e.target.value })} /></div>
                        <button className="bd" style={{ fontSize: 13 }} onClick={handleAddCert}>Save certification →</button>
                        <div className="div" />
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>All certifications ({certs.length})</div>
                        <div className="item-list">
                          {certs.map(c => (
                            <div key={c.id} className="item-row">
                              <span className="item-row-title">{c.title}</span>
                              <span className="item-row-meta">{c.abbr} · {c.issued || "—"}</span>
                              <button className="item-del" onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ label: c.title, onConfirm: () => handleDeleteCert(c.id) }); }}>✕</button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                  </div>
                </div>
              </div>
            )}
          </div></div>
        )}

      </div>
    </>
  );
}
