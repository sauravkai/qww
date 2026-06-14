const fs = require('fs');

function enhance(file) {
  let c = fs.readFileSync(file, 'utf8');

  // 1. Add INIT_EDU
  if (!c.includes('const INIT_EDU =')) {
    c = c.replace(/];\s*\n\s*const SKILLS = \{/, `];\n\nconst INIT_EDU = [\n  { id: 1, degree: "M.S. in Computer Science", school: "Stanford University", year: "2018 - 2020", details: "Specialization in Artificial Intelligence and Machine Learning. GPA: 3.9/4.0." },\n  { id: 2, degree: "B.S. in Software Engineering", school: "University of Waterloo", year: "2014 - 2018", details: "Graduated with Honors. Dean's List all semesters. Minor in Mathematics." },\n];\n\nconst SKILLS = {`);
  }

  // 2. Add state
  if (!c.includes('const [edu, setEdu] =')) {
    c = c.replace(/const \[blogPosts, setBlogPosts\] = useState\(INIT_BLOG\);/, 
      'const [blogPosts, setBlogPosts] = useState(INIT_BLOG);\n  const [edu, setEdu] = useState(INIT_EDU);'
    );
  }

  // 3. Add to NAV
  c = c.replace(/const NAV = \["Projects", "Credentials", "Skills", "Blog", "Admin"\];/, 
                'const NAV = ["Projects", "Credentials", "Skills", "Education", "Blog", "Admin"];');

  // 4. Update PC CSS for interactivity. Using regex to ignore the padding diffs from the font bump scripts.
  c = c.replace(/\.pc\{background:#fff;border:1px solid #EBEBEB;border-radius:([0-9\.]+)px;padding:([0-9\.]+)px;display:flex;flex-direction:column;transition:border-color \.18s,box-shadow \.18s;position:relative\}/, 
                '.pc{background:#fff;border:1px solid #EBEBEB;border-radius:$1px;padding:$2px;display:flex;flex-direction:column;transition:all .3s cubic-bezier(0.16,1,0.3,1);position:relative;cursor:pointer}');
  
  c = c.replace(/\.pc:hover\{border-color:#BBBBC0;box-shadow:0 6\.5*px 26\.5*px rgba\(0,0,0,\.07\)\}/, 
                '.pc:hover{border-color:#111;box-shadow:0 18px 48px rgba(0,0,0,.12);transform:scale(1.02) translateY(-4px)}');

  // Fallback if previous replacement failed (for font-size differences)
  c = c.replace(/\.pc:hover\{border-color:#BBBBC0;[^}]+\}/, 
                '.pc:hover{border-color:#111;box-shadow:0 18px 48px rgba(0,0,0,.12);transform:scale(1.02) translateY(-4px)}');


  c = c.replace(/\.dark \.pc:hover,\s*\.dark \.cc:hover \{ border-color: #52525B; \}/,
                '.dark .pc:hover{border-color:#fff;box-shadow:0 18px 48px rgba(0,0,0,.5);transform:scale(1.02) translateY(-4px)} .dark .cc:hover{border-color:#52525B;}');

  // 5. Inject Education CSS block
  if (!c.includes('/* Education */')) {
    const eduCSS = `
        /* Education */
        .egrid{display:grid;grid-template-columns:1fr;gap:20px}
        .ec{background:#fff;border:1px solid #EBEBEB;border-radius:14px;padding:28px}
        .edeg{font-size:21px;font-weight:700;color:#111118;letter-spacing:-.03em;margin-bottom:6px}
        .eschool{font-size:16px;color:#71717A;font-weight:600;display:flex;justify-content:space-between;align-items:center}
        .eyear{font-family:'Geist Mono',monospace;font-size:14px;font-weight:500;color:#9B9BAA}
        .edet{font-size:16px;color:#52525B;line-height:1.7;margin-top:16px;padding-top:16px;border-top:1px solid #F4F4F5}
        .dark .ec { background:#111118; border-color:#27272a; }
        .dark .edeg { color:#fff; }
        .dark .eschool { color:#A1A1AA; }
        .dark .edet { color:#9B9BAA; border-top-color:#27272a; }`;
    c = c.replace('/* Blog */', eduCSS + '\n        /* Blog */');
  }

  // 6. Inject the Education render block
  if (!c.includes('tab === "Education"')) {
    const eduJSX = `
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
`;
    c = c.replace('{/* Blog */}', eduJSX + '        {/* Blog */}');
  }

  fs.writeFileSync(file, c, 'utf8');
}

enhance('src/App.jsx');
enhance('portfolio.jsx');
console.log('Update finished regex.');
