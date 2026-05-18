const fs = require('fs');
const path = require('path');

function replaceAll(p, fn) {
  const fp = path.join(__dirname, 'src', p);
  if (fs.existsSync(fp)) {
    fs.writeFileSync(fp, fn(fs.readFileSync(fp, 'utf8')));
  }
}

// SubscribePitch / Catalog info
replaceAll('pages/SubscribePitch.jsx', (content) => {
  return content.replace(/<div className="grid grid-cols-1 md:grid-cols-2 gap-4">/g, 
  `<div className="mb-4 text-center">
    <p className="text-sm font-medium">Гарантия+ — для новой покупки. Постгарантия+ — для нескольких устройств.</p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">`);
});

// ChannelSelect router fix
replaceAll('pages/ChannelSelect.jsx', (content) => {
    let newContent = content.replace(/'\/support\/(chat|call|video)'/g, "'/$1'");
    newContent = newContent.replace(/navigate\(\`\/support\/\$\{method\}\`\)/g, "navigate(`/${method}`)");
    return newContent;
});

// App.jsx router fix just in case
replaceAll('App.jsx', (content) => {
    return content; // already has /chat /video /call ? Let's parse
});
