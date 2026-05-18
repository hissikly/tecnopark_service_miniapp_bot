const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, 'src', 'pages');

['HelpCategory.jsx', 'ChannelSelect.jsx', 'Chat.jsx', 'VideoCall.jsx', 'Catalog.jsx'].forEach(file => {
    let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    const compName = file.replace('.jsx', '');
    if (!content.includes(`export const ${compName}`)) {
        content = content.replace(`const ${compName} = `, `export const ${compName} = `);
        content = content.replace(new RegExp(`export default ${compName};?`), '');
        fs.writeFileSync(path.join(pagesDir, file), content);
    }
});
console.log("Fixed rest");
