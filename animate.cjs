const fs = require('fs');

function addAnimation(file) {
  let content = fs.readFileSync(file, 'utf8');

  const insert = `/* Hero */
        @keyframes fadeUp{0%{opacity:0;transform:translateY(24px)}100%{opacity:1;transform:translateY(0)}}
        .hero{padding:72px 0 64px}
        .hero .eyebrow{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .1s forwards;opacity:0}
        .hero .h1{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .25s forwards;opacity:0}
        .hero .hbody{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .35s forwards;opacity:0}
        .hero .hacts{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .45s forwards;opacity:0}
        .hero .metrics{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .6s forwards;opacity:0}`;

  content = content.replace(/\/\*\s*Hero\s*\*\/\s+\.hero\{padding:72px 0 64px\}/g, insert);

  fs.writeFileSync(file, content, 'utf8');
}

addAnimation('src/App.jsx');
addAnimation('portfolio.jsx');
console.log('Done animations');
