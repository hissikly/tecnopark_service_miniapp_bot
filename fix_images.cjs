const fs = require('fs');

// 1. Update ProductCard
let productCard = fs.readFileSync('src/pages/ProductCard.jsx', 'utf8');
productCard = productCard.replace(
  '<div className="w-32 h-56 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">Холодильник</div>',
  `<img src="/fridge.png" alt="Холодильник холодильник" className="max-h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />\n        <div className="w-32 h-56 bg-gray-200 rounded-lg hidden items-center justify-center text-gray-400 text-sm">Холодильник</div>`
);
fs.writeFileSync('src/pages/ProductCard.jsx', productCard);

// 2. Update Cart
let cart = fs.readFileSync('src/pages/Cart.jsx', 'utf8');
cart = cart.replace(
  '<div className="text-5xl">🧊</div>',
  `<img src="/fridge.png" alt="Холодильник" className="w-20 h-20 object-contain drop-shadow-md" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />\n            <div className="text-5xl hidden">🧊</div>`
);
fs.writeFileSync('src/pages/Cart.jsx', cart);

// 3. Update Checkout
let checkout = fs.readFileSync('src/pages/Checkout.jsx', 'utf8');
checkout = checkout.replace(
  '<div className="text-3xl">🧊</div>',
  `<img src="/fridge.png" alt="Холодильник" className="w-12 h-12 object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />\n          <div className="text-3xl hidden">🧊</div>`
);
fs.writeFileSync('src/pages/Checkout.jsx', checkout);

console.log("Images updated!");
