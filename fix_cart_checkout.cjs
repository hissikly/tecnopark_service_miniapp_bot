const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf-8');
  for (const [oldStr, newStr] of replacements) {
    content = content.replace(oldStr, newStr);
  }
  fs.writeFileSync(filePath, content, 'utf-8');
}

// FIX CART
replaceInFile('src/pages/Cart.jsx', [
  ['selectedPlan } = state;', 'selectedPlanInCheckout } = state;'],
  ['const planPrice = selectedPlan ===', 'const planPrice = selectedPlanInCheckout ==='],
  ['selectedPlan === \'none\'', 'selectedPlanInCheckout === \'none\''],
  ['selectedPlan === \'garantia\' ?', 'selectedPlanInCheckout === \'garantia\' ?'],
  ['selectedPlan === \'garantia\' ?', 'selectedPlanInCheckout === \'garantia\' ?'], // multiple occurrences
  ['selectedPlan === \'garantia\' ?', 'selectedPlanInCheckout === \'garantia\' ?']
]);

// FIX CHECKOUT
let checkoutContent = fs.readFileSync('src/pages/Checkout.jsx', 'utf-8');
checkoutContent = `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, TARIFFS } from '../store';
import { MapPin, Truck, CreditCard, ShieldCheck } from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const { selectedProduct, selectedPlanInCheckout } = state;

  const planPrice = selectedPlanInCheckout !== 'none' ? TARIFFS[selectedPlanInCheckout].price : 0;
  const basePrice = selectedProduct.price;
  const deliveryCost = 500;
  const finalTotal = basePrice + planPrice + deliveryCost;

  const handlePay = () => {
    dispatch({ type: 'ACTIVATE_SUBSCRIPTION' }); // This consumes selectedPlanInCheckout
    navigate('/success');
  };

  return (
    <div className="min-h-screen bg-tp-darker text-tp-text p-4 pb-24">
      <h1 className="text-2xl font-bold mb-6 pt-4 text-white">Оформление заказа</h1>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="bg-slate-800 p-4 rounded-2xl space-y-4 border border-slate-700">
          <h2 className="font-bold border-b border-slate-700 pb-2 flex items-center gap-2 text-white">
            <Truck size={18} className="text-cyan-400" /> Доставка
          </h2>
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-slate-400 mt-1" />
            <div>
              <p className="font-medium text-white">г. Москва, ул. Тверская, 1, кв. 10</p>
              <p className="text-sm text-slate-400">Завтра, 10:00 - 18:00</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-2xl space-y-4 border border-slate-700">
          <h2 className="font-bold border-b border-slate-700 pb-2 text-white">Состав заказа</h2>
          
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">{selectedProduct.title}</span>
            <span className="text-white">{basePrice.toLocaleString()} ₽</span>
          </div>
          
          {selectedPlanInCheckout !== 'none' && (
            <div className="flex justify-between text-sm items-center">
              <span className="flex items-center gap-1 text-cyan-400">
                <ShieldCheck size={16} /> {TARIFFS[selectedPlanInCheckout].title} ({TARIFFS[selectedPlanInCheckout].period})
              </span>
              <span className="text-white">{planPrice} ₽</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Доставка</span>
            <span className="text-white">{deliveryCost} ₽</span>
          </div>

          <div className="pt-2 border-t border-slate-700 flex justify-between font-bold text-lg">
            <span className="text-white">Итого</span>
            <span className="text-cyan-400">{finalTotal.toLocaleString()} ₽</span>
          </div>
        </div>

        <button 
          onClick={handlePay}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 rounded-xl mt-6 transition-colors shadow-lg shadow-cyan-500/20"
        >
          Оплатить {finalTotal.toLocaleString()} ₽
        </button>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/pages/Checkout.jsx', checkoutContent);
console.log('Fixed Cart and Checkout');
