const fs = require('fs');

// 1. Update PostGarantia.jsx
let postg = fs.readFileSync('src/pages/PostGarantia.jsx', 'utf8');
postg = postg.replace("Защита для вашей техники, даже если основная гарантия уже истекла.", 
"Расширенный тариф для обслуживания нескольких устройств, включая технику после окончания гарантии.");
fs.writeFileSync('src/pages/PostGarantia.jsx', postg);

// 2. Update UpgradeSelect.jsx
let upgr = fs.readFileSync('src/pages/UpgradeSelect.jsx', 'utf8');
upgr = upgr.replace("Для техники после окончания гарантии.", "Для всех ваших устройств Технопарк, включая технику вне гарантии.");
fs.writeFileSync('src/pages/UpgradeSelect.jsx', upgr);

// 3. Update SubDetails.jsx (just to ensure it reflects dynamic if possible, or just add a label)
console.log("Updated PostGarantia and UpgradeSelect positionings");
