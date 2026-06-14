const fs = require('fs');

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Add isDark state
  if (!content.includes('const [isDark, setIsDark]')) {
    content = content.replace(
      '  const [tab, setTab] = useState("Projects");',
      '  const [isDark, setIsDark] = useState(false);\n  const [tab, setTab] = useState("Projects");'
    );
  }

  // 2. Add toggle in header
  if (!content.includes('setIsDark(!isDark)')) {
    content = content.replace(
      '<button className="ncta" onClick={() => setContactOpen(true)}>Contact ↗</button>',
      '<button className="ni" onClick={() => setIsDark(!isDark)} title="Toggle Dark Mode">{isDark ? "☀️" : "🌙"}</button>\n              <button className="ncta" onClick={() => setContactOpen(true)}>Contact ↗</button>'
    );
  }

  // 3. Update shell class
  if (!content.includes('`shell${isDark ? " dark" : ""}`')) {
    content = content.replace(
      '<div className="shell">',
      '<div className={`shell${isDark ? " dark" : ""}`}>'
    );
  }

  // 4. Increase font sizes by 2.5px universally using regex to ensure it looks bigger
  content = content.replace(/font-size:\s*(\d*\.?\d+)px/g, (match, p1) => {
    return `font-size:${parseFloat(p1) + 2.5}px`;
  });
  
  // Update clamp for h1
  content = content.replace(/font-size:clamp\(32px,5\.5vw,56px\)/g, 'font-size:clamp(36px,6.5vw,64px)');

  // 5. Add dark mode styles inside <style>
  if (!content.includes('.dark .topbar')) {
    const darkCSS = `
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
        .dark .pc:hover, .dark .cc:hover { border-color: #52525B; }
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
    `;
    content = content.replace('      `}</style>', darkCSS + '\n      `}</style>');
  }

  fs.writeFileSync(file, content, 'utf8');
}

processFile('c:/Users/SAURAV_KAI/OneDrive/Desktop/ml/src/App.jsx');
processFile('c:/Users/SAURAV_KAI/OneDrive/Desktop/ml/portfolio.jsx');
console.log('Done');
