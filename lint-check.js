const { execSync } = require('child_process');
try { 
  execSync('npx eslint . --format json', { stdio: 'pipe' }); 
} catch (e) { 
  const out = JSON.parse(e.stdout.toString() || "[]"); 
  for (const f of out) {
    if (f.messages && f.messages.length > 0) {
       for (const m of f.messages) {
           console.log(`\${f.filePath}:\${m.line} - \${m.message}`);
       }
    }
  }
}
