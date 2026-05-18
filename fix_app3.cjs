const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, 'src', 'pages');

const fixExport = (file, componentName) => {
    let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    if (!content.includes(`export const ${componentName}`)) {
        content = content.replace(`const ${componentName} = `, `export const ${componentName} = `);
        // Also remove export default if any
        content = content.replace(new RegExp(`export default ${componentName};?`), '');
        fs.writeFileSync(path.join(pagesDir, file), content);
    }
}

fixExport('Profile.jsx', 'Profile');
fixExport('Checkout.jsx', 'Checkout');
fixExport('Home.jsx', 'Home');
fixExport('Success.jsx', 'Success');
fixExport('SubDetails.jsx', 'SubDetails');

console.log("Fixed arrow function exports");
