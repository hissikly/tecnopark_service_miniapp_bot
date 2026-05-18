const fs = require('fs');

fs.writeFileSync('src/pages/ProductCard.jsx', fs.readFileSync('src/pages/ProductCard.jsx', 'utf8')
  .replace("Добавьте Гарантия+", "Выберите сервисную подписку")
  .replace("10 видеоконсультаций, приоритетная поддержка, ремонт", "Гарантия+ (для 1 устройства) или Постгарантия+ (для нескольких)")
);

console.log("ProductCard updated!");
