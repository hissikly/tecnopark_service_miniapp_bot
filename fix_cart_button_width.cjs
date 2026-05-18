const fs = require('fs');
let content = fs.readFileSync('src/pages/Cart.jsx', 'utf-8');
content = content.replace(
  'className="fixed bottom-[60px] left-0 right-0 p-4 bg-slate-900 border-t border-slate-800 z-40 pb-6"',
  'className="fixed bottom-[60px] left-0 right-0 max-w-md mx-auto p-4 bg-slate-900 border-t border-slate-800 z-40 pb-6"'
);
fs.writeFileSync('src/pages/Cart.jsx', content);
console.log('Fixed Cart bottom button width');
