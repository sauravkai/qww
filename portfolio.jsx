import { useState, useEffect, useRef } from "react";

const INIT_PROJECTS = [
  { id: 1, title: "NeuroCommerce AI", description: "AI-powered recommendation engine serving 2M+ daily users...", fullDetails: "This project completely overhauled the e-commerce discovery experience. By utilizing distributed systems and advanced Machine Learning models, we achieved sub-50ms latency for real-time recommendations. The architecture leverages scalable AWS microservices and deeply integrates with PyTorch and React. It successfully increased overall platform conversion rates by 34% within the first quarter of deployment.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80", stack: ["Python", "TensorFlow", "React", "AWS"], industry: "E-Commerce", role: "Architect", github: "https://github.com", demo: "https://example.com", year: 2024, metric: "+34% CVR" },
  { id: 2, title: "FinSight Dashboard", description: "Real-time financial analytics platform processing $1.2B...", fullDetails: "Built for enterprise scale, this dashboard processes over $1.2 billion in daily transactions. It enforces strict end-to-end encryption and achieved full SOC2 compliance. By integrating a Kafka-driven event streaming backend with a highly concurrent Next.js frontend, we drastically reduced reporting times from hours to milliseconds.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80", stack: ["TypeScript", "Next.js", "PostgreSQL", "Kafka"], industry: "FinTech", role: "Lead Dev", github: "https://github.com", demo: "https://example.com", year: 2024, metric: "$1.2B / day" },
  { id: 3, title: "HealthPulse Platform", description: "Telemedicine infrastructure connecting 50K+ patients...", fullDetails: "Connecting over 50,000 patients with healthcare providers, this HIPAA-compliant system offers real-time video streaming combined with seamless Electronic Health Records (EHR) integration. React and WebRTC were used natively to ensure peer-to-peer security with fallbacks for low-bandwidth rural connections.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80", stack: ["React", "Node.js", "MongoDB", "WebRTC"], industry: "HealthTech", role: "Full-Stack", github: "https://github.com", demo: "https://example.com", year: 2023, metric: "50K patients" },
  { id: 4, title: "DevOps Orchestrator", description: "Kubernetes-native CI/CD pipeline reducing deployment...", fullDetails: "We orchestrated a massive Kubernetes-native CI/CD pipeline spanning 200+ microservices globally. The previous deployment pipeline took 45 minutes; we brought that down to 4 minutes flat using Go, Terraform, and custom GitHub Action runners. Zero downtime rollouts were made standard.", image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=400&q=80", stack: ["Go", "Kubernetes", "Terraform", "AWS"], industry: "DevOps", role: "Architect", github: "https://github.com", demo: "https://example.com", year: 2023, metric: "11× faster" },
  { id: 5, title: "EduLearn LMS", description: "Adaptive learning management system with ML...", fullDetails: "An expansive EdTech platform scaling across 30 universities. We implemented ML-driven study path personalization to predict and improve student retention rates. Handled the 100K+ concurrent connections using Vue.js, Django, and an optimized Redis caching layer.", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=400&q=80", stack: ["Vue.js", "Django", "Redis", "GCP"], industry: "EdTech", role: "Lead Dev", github: "https://github.com", demo: "https://example.com", year: 2022, metric: "100K users" },
  { id: 6, title: "LogiChain Tracker", description: "Blockchain-based supply chain visibility solution...", fullDetails: "Partnered closely with a Fortune 500 logistics provider to deploy a decentralized supply chain tracker. By writing unalterable tracking events to a custom blockchain via Solidity smart contracts, the client observed an unprecedented 67% reduction in raw inventory loss over a 6-month trial.", image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c800dc?auto=format&fit=crop&w=400&q=80", stack: ["Solidity", "React", "Node.js", "IPFS"], industry: "Logistics", role: "Full-Stack", github: "https://github.com", demo: "https://example.com", year: 2022, metric: "−67% loss" },
];

const INIT_CERTS = [
  { id: 1, title: "AWS Solutions Architect – Professional", org: "Amazon Web Services", credId: "AWS-SAP-12345", verifyUrl: "https://aws.amazon.com/verification", issued: "Mar 2024", expires: "Mar 2027", abbr: "AWS", accent: "#E8923A" },
  { id: 2, title: "Google Cloud Professional Data Engineer", org: "Google Cloud", credId: "GCP-PDE-67890", verifyUrl: "https://cloud.google.com/certification", issued: "Nov 2023", expires: "Nov 2025", abbr: "GCP", accent: "#3B82F6" },
  { id: 3, title: "Certified Kubernetes Administrator", org: "CNCF / Linux Foundation", credId: "CKA-2023-ABC", verifyUrl: "https://training.linuxfoundation.org", issued: "Jul 2023", expires: "Jul 2026", abbr: "K8s", accent: "#326CE5" },
  { id: 4, title: "Microsoft Azure Solutions Architect Expert", org: "Microsoft", credId: "MS-AZ305-XYZ", verifyUrl: "https://learn.microsoft.com/certifications", issued: "Feb 2023", expires: "Feb 2025", abbr: "AZ", accent: "#0EA5E9" },
];

const INIT_BLOG = [
  { id: 1, title: "Scaling to 10M Users: Lessons from the Trenches", date: "Mar 28, 2025", tag: "Architecture", read: "8 min read", content: "Scaling a product to 10 million users is one of the most humbling experiences in engineering. The naive assumption is that you simply add more servers — but the reality involves rethinking every layer of your stack: database query patterns, caching strategies, CDN edge configuration, queue back-pressure, and connection pool sizing. In our case, the inflection point came at around 500K daily active users when our single Postgres primary started showing signs of saturation. We moved to read replicas first, then eventually to a distributed architecture using Citus for horizontal sharding. The lesson: design for the next 10× from day one, but don't over-engineer before you have the data." },
  { id: 2, title: "The Hidden Cost of Microservices Nobody Talks About", date: "Mar 10, 2025", tag: "Opinion", read: "5 min read", content: "Everyone talks about the benefits of microservices — independent deployability, team autonomy, technology flexibility. But the operational complexity is often severely underestimated. In a monolith, a function call is a function call. In a microservices world, that same operation is now an HTTP request with retry logic, circuit breakers, distributed tracing, and potential partial failures. We spent 6 months optimizing our service mesh after naively decomposing a monolith into 40+ services. My advice: start with a modular monolith. Extract services only when you have a concrete scaling or team-boundary reason — not because a conference talk made it sound cool." },
  { id: 3, title: "Building a Zero-Downtime Deployment Pipeline", date: "Feb 22, 2025", tag: "DevOps", read: "12 min read", content: "Zero-downtime deployments are non-negotiable for customer-facing systems. The approach we landed on combines blue-green deployments at the infrastructure level with feature flags at the application level. Our Kubernetes rollout strategy uses a max-surge of 1 and max-unavailable of 0, which guarantees that new pods are healthy before old ones are terminated. Database migrations are the trickiest part — we use an expand-contract pattern where schema changes are backward-compatible for at least two deploy cycles. This lets us roll forward or backward without data loss. Combined with automated smoke tests in the post-deploy hook, we've achieved 99.97% uptime over the past 18 months." },
];

const INIT_EDU = [
  { id: 1, degree: "M.S. in Computer Science", school: "Stanford University", year: "2018 - 2020", details: "Specialization in Artificial Intelligence and Machine Learning. GPA: 3.9/4.0." },
  { id: 2, degree: "B.S. in Software Engineering", school: "University of Waterloo", year: "2014 - 2018", details: "Graduated with Honors. Dean's List all semesters. Minor in Mathematics." },
];

const SKILLS = {
  Languages: [
    { name: "TypeScript", level: 95, note: "6 years" },
    { name: "Python", level: 92, note: "8 years" },
    { name: "Go", level: 78, note: "4 years" },
    { name: "Rust", level: 62, note: "2 years" },
    { name: "Solidity", level: 55, note: "2 years" },
  ],
  Frameworks: [
    { name: "Next.js / React", level: 97, note: "6 years" },
    { name: "Node.js", level: 93, note: "7 years" },
    { name: "FastAPI / Django", level: 85, note: "5 years" },
    { name: "Kubernetes", level: 82, note: "4 years" },
    { name: "TensorFlow / PyTorch", level: 74, note: "3 years" },
  ],
  Cloud: [
    { name: "AWS", level: 94, note: "6 years" },
    { name: "Docker", level: 96, note: "6 years" },
    { name: "PostgreSQL", level: 90, note: "7 years" },
    { name: "Terraform", level: 88, note: "4 years" },
    { name: "Redis / Kafka", level: 83, note: "4 years" },
  ],
};

const ADMIN_PASS = "demo123";

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);
  const [tab, setTab] = useState("Projects");
  const [projects, setProjects] = useState(INIT_PROJECTS);
  const [certs, setCerts] = useState(INIT_CERTS);
  const [blogPosts, setBlogPosts] = useState(INIT_BLOG);
  const [edu, setEdu] = useState(INIT_EDU);
  const [fStack, setFStack] = useState("All");
  const [fIndustry, setFIndustry] = useState("All");
  const [fRole, setFRole] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [blogOpen, setBlogOpen] = useState(null);
  const [projectOpen, setProjectOpen] = useState(null);
  const [skillCat, setSkillCat] = useState("Languages");
  const [animSkills, setAnimSkills] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminTab, setAdminTab] = useState("projects");
  const [uploadMsg, setUploadMsg] = useState("");
  const [pForm, setPForm] = useState({ title: "", stack: "", industry: "", description: "", github: "", demo: "" });
  const [bForm, setBForm] = useState({ title: "", tag: "", content: "" });
  const [cForm, setCForm] = useState({ title: "", org: "", credId: "", verifyUrl: "", issued: "", expires: "" });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [toast, setToast] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [subEmail, setSubEmail] = useState("");
  const [subDone, setSubDone] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [certFile, setCertFile] = useState(null);
  const toastTimer = useRef(null);

  const allStacks = ["All", ...new Set(projects.flatMap(p => p.stack))];
  const allIndustries = ["All", ...new Set(projects.map(p => p.industry))];
  const allRoles = ["All", ...new Set(projects.map(p => p.role))];
  const filtered = projects.filter(p =>
    (fStack === "All" || p.stack.includes(fStack)) &&
    (fIndustry === "All" || p.industry === fIndustry) &&
    (fRole === "All" || p.role === fRole)
  );

  useEffect(() => {
    if (tab === "Skills") { setAnimSkills(false); setTimeout(() => setAnimSkills(true), 80); }
  }, [tab, skillCat]);

  const navTo = (t) => { setTab(t); setMobileOpen(false); if (t === "Contact") { setContactOpen(true); return; } };

  const showToast = (msg, type = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  const tryUnlock = () => {
    if (adminPass === ADMIN_PASS) { setAdminAuth(true); setPassErr(false); showToast("Welcome back, Alex."); }
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

  const downloadCert = (cert) => {
    const content = `CERTIFICATE OF COMPLETION\n\n${cert.title}\nIssued by: ${cert.org}\nCredential ID: ${cert.credId}\nIssued: ${cert.issued}\nExpires: ${cert.expires}\nVerify at: ${cert.verifyUrl}`;
    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${cert.abbr}_credential.txt`;
    a.click();
    showToast(`Downloaded ${cert.abbr} credential.`);
  };

  const handleAddProject = () => {
    if (!pForm.title.trim()) { showToast("Title is required.", "error"); return; }
    const newP = {
      ...pForm,
      id: Date.now(),
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
    const newB = { ...bForm, id: Date.now(), date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), read: `${Math.max(1, Math.ceil(bForm.content.split(" ").length / 200))} min read`, isDraft: true };
    setBlogPosts(prev => [newB, ...prev]);
    setBForm({ title: "", tag: "", content: "" });
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
    const newC = { ...cForm, id: Date.now(), abbr: cForm.title.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase().slice(0, 3), accent: accents[certs.length % accents.length] };
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
    showToast("Message sent! Alex will get back to you soon.");
    setTimeout(() => { setContactOpen(false); setContactSent(false); setContactForm({ name: "", email: "", message: "" }); }, 2200);
  };

  const handleSubscribe = () => {
    if (!subEmail.includes("@")) { showToast("Enter a valid email.", "error"); return; }
    setSubDone(true);
    showToast(`${subEmail} subscribed!`);
    setSubEmail("");
    setTimeout(() => setSubDone(false), 4000);
  };

  const NAV = ["Projects", "Credentials", "Skills", "Education", "Blog", "Admin"];

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
        .shell{min-height:100vh;background:#FAFAFA}
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
        .hero{padding:72px 0 64px}
        .hero .eyebrow{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .1s forwards;opacity:0}
        .hero .h1{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .25s forwards;opacity:0}
        .hero .hbody{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .35s forwards;opacity:0}
        .hero .hacts{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .45s forwards;opacity:0}
        .hero .metrics{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .6s forwards;opacity:0}
        .eyebrow{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid #EBEBEB;padding:5px 14px 5px 10px;border-radius:100px;font-size:14.5px;color:#52525B;font-weight:500;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,.05)}
        .edot{width:6px;height:6px;border-radius:50%;background:#22C55E;flex-shrink:0;animation:blink 2s ease-in-out infinite}
        @keyframes blink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
        .h1{font-size:clamp(36px,6.5vw,64px);font-weight:700;letter-spacing:-.05em;line-height:1.02;color:#111118;margin-bottom:20px}
        .h1 span{color:#9B9BAA;font-weight:300}
        .hbody{font-size:18px;color:#52525B;max-width:480px;line-height:1.78;margin-bottom:36px}
        .hacts{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:56px}
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

        
        /* Education */
        .egrid{display:grid;grid-template-columns:1fr;gap:20px}
        .ec{background:#fff;border:1px solid #EBEBEB;border-radius:14px;padding:28px}
        .edeg{font-size:19px;font-weight:700;color:#111118;letter-spacing:-.03em;margin-bottom:6px}
        .eschool{font-size:14.5px;color:#71717A;font-weight:600;display:flex;justify-content:space-between;align-items:center}
        .eyear{font-family:'Geist Mono',monospace;font-size:12.5px;font-weight:500;color:#9B9BAA}
        .edet{font-size:15px;color:#52525B;line-height:1.7;margin-top:16px;padding-top:16px;border-top:1px solid #F4F4F5}
        .dark .ec { background:#111118; border-color:#27272a; }
        .dark .edeg { color:#fff; }
        .dark .eschool { color:#A1A1AA; }
        .dark .edet { color:#9B9BAA; border-top-color:#27272a; }
        /* Blog */
        .blist{border:1px solid #EBEBEB;border-radius:14px;overflow:hidden;background:#fff}
        .brow{display:flex;align-items:center;gap:16px;padding:20px 28px;border-bottom:1px solid #F4F4F5;transition:background .13s;cursor:pointer}
        .brow:last-child{border-bottom:none}
        .brow:hover{background:#FAFAFA}
        .btag{font-size:13.5px;font-weight:600;padding:3px 10px;border-radius:6px;background:#F4F4F5;color:#52525B;white-space:nowrap;min-width:88px;text-align:center}
        .btitle{font-size:16.5px;font-weight:600;color:#111118;letter-spacing:-.02em;flex:1;line-height:1.4}
        .bmeta{font-size:14.5px;color:#C4C4CC;white-space:nowrap;font-family:'Geist Mono',monospace}
        .barr{font-size:16.5px;color:#DDDDE0}
        .bdel{width:24px;height:24px;border-radius:6px;background:#FEF2F2;color:#DC2626;font-size:13.5px;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .15s;cursor:pointer;border:1px solid #FECACA;flex-shrink:0}
        .brow:hover .bdel{opacity:1}
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

        /* Skills */
        .stabs{display:flex;gap:6px;margin-bottom:32px}
        .stab{background:#fff;border:1px solid #EBEBEB;color:#71717A;padding:7px 20px;border-radius:9px;font-size:15.5px;font-weight:600;letter-spacing:-.01em;transition:all .13s;box-shadow:0 1px 1px rgba(0,0,0,.03)}
        .stab:hover{border-color:#BBBBC0;color:#111118}
        .stab.on{background:#111118;border-color:#111118;color:#fff;box-shadow:none}
        .slist{border:1px solid #EBEBEB;border-radius:14px;overflow:hidden;background:#fff}
        .srow{display:grid;grid-template-columns:180px 1fr 44px;align-items:center;gap:16px;padding:16px 24px;border-bottom:1px solid #F4F4F5}
        .srow:last-child{border-bottom:none}
        .sname{font-size:16px;font-weight:600;color:#111118;letter-spacing:-.02em}
        .snote{font-size:13.5px;color:#C4C4CC;margin-top:2px;font-family:'Geist Mono',monospace}
        .strack{height:4px;background:#F4F4F5;border-radius:100px;overflow:hidden}
        .sfill{height:100%;border-radius:100px;background:#111118;transition:width .9s cubic-bezier(.34,1.2,.64,1)}
        .spct{font-family:'Geist Mono',monospace;font-size:13.5px;font-weight:500;color:#C4C4CC;text-align:right}

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
          .hero{padding:48px 0 44px}
          .metrics{grid-template-columns:repeat(2,1fr)}
          .pgrid{grid-template-columns:1fr}
          .cgrid{grid-template-columns:1fr}
          .alayout{grid-template-columns:1fr}
          .aside{flex-direction:row;flex-wrap:wrap}
          .akpis{grid-template-columns:repeat(2,1fr)}
          .srow{grid-template-columns:120px 1fr 36px}
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
    
      `
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
      `}</style>

      <div className={`shell${isDark ? " dark" : ""}`}>

        {/* Toast */}
        {toast && <div className={`toast${toast.type === "error" ? " error" : ""}`}>{toast.msg}</div>}

        {/* Contact Modal */}
        {contactOpen && (
          <div className="ov" onClick={() => { if (!contactSent) setContactOpen(false); }}>
            <div className="contact-modal" onClick={e => e.stopPropagation()}>
              {contactSent ? (
                <div className="sent-state">
                  <div className="sent-icon">✓</div>
                  <div className="sent-title">Message sent!</div>
                  <div className="sent-sub">Alex will get back to you within 24 hours.</div>
                </div>
              ) : (
                <>
                  <div className="cm-head">
                    <div><div className="cm-title">Get in touch</div><div className="cm-sub">alex.rivera@example.com · Replies within 24 hrs</div></div>
                    <button className="lbcl" onClick={() => setContactOpen(false)}>✕</button>
                  </div>
                  <div className="cm-body">
                    <div className="fg"><label>Your name</label><input className="fi" placeholder="Jane Smith" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} /></div>
                    <div className="fg"><label>Email address</label><input className="fi" type="email" placeholder="jane@company.com" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} /></div>
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
              <div className="reader-body">{blogOpen.content || "Full content coming soon."}</div>
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
                <div className="lm">AR</div>
                <div><div className="lt">Alex Rivera</div><div className="ls">Senior Full-Stack Architect</div></div>
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
          <div className="hero">
            <div className="eyebrow"><span className="edot" />Available for new engagements · Remote / Hybrid</div>
            <h1 className="h1">Building systems<br /><span>that actually scale.</span></h1>
            <p className="hbody">8+ years designing and shipping high-performance full-stack platforms—from zero to millions of users. Specializing in distributed systems, cloud architecture, and engineering leadership.</p>
            <div className="hacts">
              <button className="bd" onClick={() => navTo("Projects")}>View work ↗</button>
              <button className="bl" onClick={() => setContactOpen(true)}>Get in touch</button>
            </div>
            <div className="metrics">
              {[[String(projects.length), "Projects shipped"], [String(certs.length), "Certifications"], ["10M+", "Users served"], ["8 yrs", "Experience"]].map(([n, l]) => (
                <div key={l} className="metric"><div className="mn">{n}</div><div className="ml">{l}</div></div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects */}
        {tab === "Projects" && (
          <div className="w"><div className="sec">
            <div className="sh">
              <div><div className="st">Selected Work</div><div className="ss">{filtered.length} of {projects.length} projects</div></div>
            </div>
            <div className="filters">
              <div className="frow"><span className="flabel">Stack</span>{allStacks.map(s => <button key={s} className={`chip${fStack === s ? " on" : ""}`} onClick={() => setFStack(s)}>{s}</button>)}</div>
              <div className="frow"><span className="flabel">Industry</span>{allIndustries.map(i => <button key={i} className={`chip${fIndustry === i ? " on" : ""}`} onClick={() => setFIndustry(i)}>{i}</button>)}</div>
              <div className="frow"><span className="flabel">Role</span>{allRoles.map(r => <button key={r} className={`chip${fRole === r ? " on" : ""}`} onClick={() => setFRole(r)}>{r}</button>)}</div>
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
                    <a onClick={e => e.stopPropagation()} href={p.github} target="_blank" rel="noreferrer" className="plnk">GitHub ↗</a>
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
              <div><div className="st">Certifications & Credentials</div><div className="ss">Click any card to view details · All verified</div></div>
            </div>
            <div className="cgrid">
              {certs.map(c => (
                <div key={c.id} className="cc" onClick={() => setLightbox(c)}>
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
                    <a href={c.verifyUrl} target="_blank" rel="noreferrer" className="cbtn cbtnp">Verify ↗</a>
                    <button className="cbtn cbtns" onClick={() => downloadCert(c)}>Download ↓</button>
                  </div>
                </div>
              ))}
            </div>
          </div></div>
        )}

        {/* Skills */}
        {tab === "Skills" && (
          <div className="w"><div className="sec">
            <div className="sh"><div><div className="st">Tech Stack & Proficiency</div><div className="ss">Self-assessed · Updated Q1 2025</div></div></div>
            <div className="stabs">
              {Object.keys(SKILLS).map(k => <button key={k} className={`stab${skillCat === k ? " on" : ""}`} onClick={() => setSkillCat(k)}>{k}</button>)}
            </div>
            <div className="slist">
              {SKILLS[skillCat].map(s => (
                <div key={s.name} className="srow">
                  <div><div className="sname">{s.name}</div><div className="snote">{s.note}</div></div>
                  <div className="strack"><div className="sfill" style={{ width: animSkills ? `${s.level}%` : "0%" }} /></div>
                  <span className="spct">{s.level}%</span>
                </div>
              ))}
            </div>
          </div></div>
        )}

        
        {/* Education */}
        {tab === "Education" && (
          <div className="w"><div className="sec">
            <div className="sh">
              <div><div className="st">Academic Background</div><div className="ss">Formal education and degrees</div></div>
            </div>
            <div className="egrid">
              {edu.map(e => (
                <div key={e.id} className="ec" style={{animation: "fadeUp .6s cubic-bezier(.16,1,.3,1) forwards", opacity: 0}}>
                  <div className="edeg">{e.degree}</div>
                  <div className="eschool"><span>{e.school}</span><span className="eyear">{e.year}</span></div>
                  <div className="edet">{e.details}</div>
                </div>
              ))}
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
              {blogPosts.map(b => (
                <div key={b.id} className="brow" onClick={() => setBlogOpen(b)}>
                  <span className="btag">{b.tag || "Draft"}</span>
                  <span className="btitle">{b.title}{b.isDraft && <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 9, color: "#C4C4CC", marginLeft: 8, letterSpacing: ".06em" }}>DRAFT</span>}</span>
                  <span className="bmeta">{b.date} · {b.read}</span>
                  <span className="barr">→</span>
                  <button className="bdel" onClick={e => { e.stopPropagation(); setDeleteConfirm({ label: b.title, onConfirm: () => handleDeleteBlog(b.id) }); }}>✕</button>
                </div>
              ))}
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
              <>
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
                        <button className="bd" style={{ fontSize: 13 }} onClick={handleAddBlog}>Publish draft →</button>
                        <div className="div" />
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#A1A1AA", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>All posts ({blogPosts.length})</div>
                        <div className="item-list">
                          {blogPosts.map(b => (
                            <div key={b.id} className="item-row">
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
              </>
            )}
          </div></div>
        )}

      </div>
    </>
  );
}
