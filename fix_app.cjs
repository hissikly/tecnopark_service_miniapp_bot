const fs = require('fs');

let app = fs.readFileSync('src/App.jsx', 'utf8');

// I'll just change the import syntax for Home, Catalog, ProductCard, SubscribePitch, Cart, Checkout, Success, Profile, SubDetails, HelpCategory, ChannelSelect, Chat, VideoCall, PhoneCall, History, UpgradeSelect, PostGarantia
// But wait, there's a mix of named and default exports. I can just export const everywhere! This is more stable.
// Let's create a regex replacer for all files in src/pages
const path = require('path');
const pagesDir = path.join(__dirname, 'src', 'pages');

fs.readdirSync(pagesDir).forEach(file => {
    if (file.endsWith('.jsx')) {
        let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
        // Example: export default function Checkout() => export const Checkout = () =>
        content = content.replace(/export default function ([A-Za-z0-9]+)\s*\(/g, "export const $1 = (");
        content = content.replace(/export default ([A-Za-z0-9]+);/g, ""); // Remove default exports if they exist at the end
        fs.writeFileSync(path.join(pagesDir, file), content);
    }
});

console.log("Fixed exports in all pages");
