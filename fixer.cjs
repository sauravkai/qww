const fs = require('fs');

function fix(file) {
  let c = fs.readFileSync(file, 'utf8');
  c = c.replace(/    \}\n  \}\n\}/g, ''); // just in case
  c = c.replace(/      \}<\/style>/, '      `}</style>');
  c = c.replace(/      `}<\/style>/, '      `}</style>'); // idempotent
  fs.writeFileSync(file, c, 'utf8');
}

fix('src/App.jsx');
fix('portfolio.jsx');
console.log('Fixed');
