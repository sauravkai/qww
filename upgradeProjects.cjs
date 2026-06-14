const fs = require('fs');

function upgrade(file) {
  let c = fs.readFileSync(file, 'utf8');

  // 1. Update INIT_PROJECTS
  // Regex to find INIT_PROJECTS and inject fullDetails and image placeholder
  c = c.replace(/description: "AI-powered recommendation engine serving 2M\+ daily users with sub-50ms latency, increasing conversion rates by 34%."/, 
                'description: "AI-powered recommendation engine serving 2M+ daily users...", fullDetails: "This project completely overhauled the e-commerce discovery experience. By utilizing distributed systems and advanced Machine Learning models, we achieved sub-50ms latency for real-time recommendations. The architecture leverages scalable AWS microservices and deeply integrates with PyTorch and React. It successfully increased overall platform conversion rates by 34% within the first quarter of deployment.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"');
  
  c = c.replace(/description: "Real-time financial analytics platform processing \$1\.2B in daily transactions with end-to-end encryption and SOC2 compliance."/,
                'description: "Real-time financial analytics platform processing $1.2B...", fullDetails: "Built for enterprise scale, this dashboard processes over $1.2 billion in daily transactions. It enforces strict end-to-end encryption and achieved full SOC2 compliance. By integrating a Kafka-driven event streaming backend with a highly concurrent Next.js frontend, we drastically reduced reporting times from hours to milliseconds.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"');

  c = c.replace(/description: "Telemedicine infrastructure connecting 50K\+ patients with providers, HIPAA-compliant with real-time video and EHR integration."/,
                'description: "Telemedicine infrastructure connecting 50K+ patients...", fullDetails: "Connecting over 50,000 patients with healthcare providers, this HIPAA-compliant system offers real-time video streaming combined with seamless Electronic Health Records (EHR) integration. React and WebRTC were used natively to ensure peer-to-peer security with fallbacks for low-bandwidth rural connections.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80"');

  c = c.replace(/description: "Kubernetes-native CI\/CD pipeline reducing deployment time from 45 min to 4 min across 200\+ microservices."/,
                'description: "Kubernetes-native CI/CD pipeline reducing deployment...", fullDetails: "We orchestrated a massive Kubernetes-native CI/CD pipeline spanning 200+ microservices globally. The previous deployment pipeline took 45 minutes; we brought that down to 4 minutes flat using Go, Terraform, and custom GitHub Action runners. Zero downtime rollouts were made standard.", image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=400&q=80"');

  c = c.replace(/description: "Adaptive learning management system with ML-driven personalization serving 100K\+ students across 30 universities."/,
                'description: "Adaptive learning management system with ML...", fullDetails: "An expansive EdTech platform scaling across 30 universities. We implemented ML-driven study path personalization to predict and improve student retention rates. Handled the 100K+ concurrent connections using Vue.js, Django, and an optimized Redis caching layer.", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=400&q=80"');

  c = c.replace(/description: "Blockchain-based supply chain visibility solution cutting inventory loss by 67% for a Fortune 500 client."/,
                'description: "Blockchain-based supply chain visibility solution...", fullDetails: "Partnered closely with a Fortune 500 logistics provider to deploy a decentralized supply chain tracker. By writing unalterable tracking events to a custom blockchain via Solidity smart contracts, the client observed an unprecedented 67% reduction in raw inventory loss over a 6-month trial.", image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c800dc?auto=format&fit=crop&w=400&q=80"');

  // 2. Add state
  if (!c.includes('const [projectOpen, setProjectOpen]')) {
    c = c.replace('const [blogOpen, setBlogOpen] = useState(null);',
                  'const [blogOpen, setBlogOpen] = useState(null);\n  const [projectOpen, setProjectOpen] = useState(null);');
  }

  // 3. Update PC CSS
  const pimgCSS = `
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
  `;
  if (!c.includes('.pimg { width: 100%')) {
    c = c.replace('/* Blog post reader */', pimgCSS + '\n        /* Blog post reader */');
  }

  // 4. Update PC JSX to include image and onClick
  c = c.replace(/<div key=\{p\.id\} className="pc">/g, '<div key={p.id} className="pc" onClick={() => setProjectOpen(p)}>');
  
  if (!c.includes('<img src={p.image}')) {
    c = c.replace(/<div className="ptop">/g, 
      '{p.image && <img src={p.image} className="pimg" alt={p.title} />}\n                  <div className="ptop">'
    );
  }

  // 5. Inject project modal
  const pmJSX = `
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
  `;
  if (!c.includes('{/* Project Modal */}')) {
    c = c.replace('{/* Topbar */}', pmJSX + '\n        {/* Topbar */}');
  }

  // Ensure button clicks within card don't trigger modal if they are external links
  c = c.replace(/onClick=\{\(\) => setDeleteConfirm/g, 'onClick={(e) => { e.stopPropagation(); setDeleteConfirm');
  c = c.replace(/<a href=\{p\.github\}.*?className="plnk">GitHub ↗<\/a>/g, (match) => match.replace('<a ', '<a onClick={e => e.stopPropagation()} '));
  c = c.replace(/<a href=\{p\.demo\}.*?className="plnk">Live Demo ↗<\/a>/g, (match) => match.replace('<a ', '<a onClick={e => e.stopPropagation()} '));

  fs.writeFileSync(file, c, 'utf8');
}

upgrade('src/App.jsx');
upgrade('portfolio.jsx');
console.log('Project enhancements complete');
