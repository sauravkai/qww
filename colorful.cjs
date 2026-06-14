const fs = require('fs');

function applyVibrantTheme(file) {
  let c = fs.readFileSync(file, 'utf8');

  const themeBlock = `
        /* Vibrant Theme Overrides */
        @keyframes meshBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        body, .shell {
          background: linear-gradient(-45deg, rgba(238,119,82,0.04), rgba(231,60,126,0.04), rgba(35,166,213,0.04), rgba(35,213,171,0.04)) !important;
          background-size: 400% 400% !important;
          animation: meshBG 18s ease infinite !important;
        }
        .dark.shell, .dark body {
          background: linear-gradient(-45deg, #1A0B2E, #09121F, #081C15, #1F0D1C) !important;
          background-size: 400% 400% !important;
          animation: meshBG 18s ease infinite !important;
        }

        /* Beautiful Hero */
        .h1 {
          background: linear-gradient(135deg, #FF6B6B 0%, #845EC2 50%, #00C9A7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          animation: meshBG 6s ease infinite, fadeUp .8s cubic-bezier(.16,1,.3,1) .25s forwards !important;
          background-size: 200% 200%;
        }
        .dark .h1 { 
          background: linear-gradient(135deg, #FF9671, #FFC75F, #F9F871); 
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
        }

        /* Interactive Buttons */
        button.bd {
          background: linear-gradient(90deg, #845EC2, #D65DB1, #FF9671) !important;
          border: none !important; color: #fff !important; text-shadow: 0 1px 2px rgba(0,0,0,0.2);
          box-shadow: 0 4px 15px rgba(214, 93, 177, 0.4) !important;
          transition: all 0.3s ease !important;
        }
        button.bd:hover { transform: translateY(-3px) scale(1.05) !important; box-shadow: 0 8px 25px rgba(214, 93, 177, 0.6) !important; }

        /* Playful Cards */
        .pc, .ec, .metric, .apanel, .akpi, .blist {
          background: rgba(255, 255, 255, 0.6) !important;
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8) !important;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        .pc:hover, .ec:hover, .cc:hover, .brow:hover {
          transform: translateY(-8px) scale(1.025) !important;
          border-color: #845EC2 !important;
          box-shadow: 0 20px 40px rgba(132, 94, 194, 0.2) !important;
          z-index: 10;
        }
        .dark .pc, .dark .ec, .dark .metric, .dark .apanel, .dark .akpi, .dark .blist {
          background: rgba(20, 20, 30, 0.5) !important; border-color: rgba(255,255,255,0.04) !important;
        }
        .dark .pc:hover, .dark .ec:hover, .dark .cc:hover, .dark .brow:hover { 
          border-color: #F9F871 !important; 
          box-shadow: 0 20px 40px rgba(249, 248, 113, 0.15) !important; 
        }

        /* Colorful Metrics */
        .mn { color: #845EC2 !important; }
        .dark .mn { color: #bb86fc !important; }

        /* Hover states for chips */
        .chip.on {
          background: linear-gradient(90deg, #845EC2, #D65DB1) !important; 
          border-color: transparent !important; color: #fff !important; 
          box-shadow: 0 4px 12px rgba(132, 94, 194, 0.3) !important;
        }

        /* Float animations */
        @keyframes customFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .hero .metrics { animation: customFloat 6s ease-in-out infinite, fadeUp 0.8s cubic-bezier(0.16,1,.3,1) .6s forwards !important; }

        .eyebrow { border-color: rgba(132, 94, 194, 0.3) !important; background: rgba(132, 94, 194, 0.05) !important; color: #845EC2 !important; }
        .dark .eyebrow { border-color: rgba(255, 150, 113, 0.3) !important; background: rgba(255, 150, 113, 0.1) !important; color: #FF9671 !important; }
        .edot { background: #845EC2 !important; box-shadow: 0 0 8px #845EC2 !important; }
        .dark .edot { background: #FF9671 !important; box-shadow: 0 0 8px #FF9671 !important; }

        .ti { background: transparent !important; }
        .topbar { background: rgba(255,255,255,0.7) !important; }
        .dark .topbar { background: rgba(10,10,18,0.7) !important; border-bottom: 1px solid rgba(255,255,255,0.05) !important; }
      </style>`;

  if (!c.includes('/* Vibrant Theme Overrides */')) {
    c = c.replace('</style>', themeBlock);
    fs.writeFileSync(file, c, 'utf8');
  }
}

applyVibrantTheme('src/App.jsx');
applyVibrantTheme('portfolio.jsx');
console.log('Colorful theme applied.');
