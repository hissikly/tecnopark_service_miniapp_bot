const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, 'src', 'pages');

fs.readdirSync(pagesDir).forEach(file => {
    if (file.endsWith('.jsx')) {
        let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
        // Fix syntax error introduced by previous script
        content = content.replace(/export const ([A-Za-z0-9]+) = \(\) \{/g, "export const $1 = () => {");
        content = content.replace(/export const ([A-Za-z0-9]+) = \(\{([^\)]+)\}\) \{/g, "export const $1 = ({$2}) => {");
        fs.writeFileSync(path.join(pagesDir, file), content);
    }
});

console.log("Fixed arrow functions syntax in pages");
