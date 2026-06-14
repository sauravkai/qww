const fs = require('fs');

function applySoftTheme(file) {
  let c = fs.readFileSync(file, 'utf8');

  const themeBlock = `
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
      \`}</style>`;

  // Regular expression to aggressively swap out the entire vibrant theme block and put in the soft theme
  c = c.replace(/\/\* Vibrant Theme Overrides \*\/.+?`\}<\/style>/s, themeBlock);

  fs.writeFileSync(file, c, 'utf8');
}

applySoftTheme('src/App.jsx');
applySoftTheme('portfolio.jsx');
console.log('Soft theme applied.');
