const fs = require('fs');

let content = `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, TARIFFS } from '../store';
import { ArrowLeft, Trash2, ShieldCheck, ChevronRight } from 'lucide-react';

export function Cart() {
  const navigate = useNavigate();
  const { state } = useStore();
  const { selectedProduct, selectedPlanInCheckout } = state;

  const planPrice = selectedPlanInCheckout !== 'none' ? TARIFFS[selectedPlanInCheckout].price : 0;
  const total = selectedProduct.price + planPrice;

  return (
    <div className="pb-32 animate-in min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-300">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-medium text-white">Корзина</h1>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Product */}
        <div className="bg-slate-800 rounded-2xl p-4 flex gap-4 border border-slate-700">
          <img src={selectedProduct.image} className="w-20 h-24 object-contain bg-slate-700/50 rounded-lg p-2" alt="Product" />
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="text-sm font-medium text-white">{selectedProduct.title}</div>
              <div className="text-xs text-slate-400 mt-1">{selectedProduct.subtitle}</div>
            </div>
            <div className="flex justify-between items-end">
              <span className="font-bold text-white">{selectedProduct.price.toLocaleString('ru-RU')} ₽</span>
              <button className="text-slate-500"><Trash2 size={18} /></button>
            </div>
          </div>
        </div>

        {/* Subscription */}
        {selectedPlanInCheckout === 'none' ? (
          <div onClick={() => navigate('/subscribe-pitch')} className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 border-dashed flex items-center gap-3 cursor-pointer mt-4">
             <div className="bg-slate-700 p-2 rounded-full"><ShieldCheck size={20} className="text-cyan-500" /></div>
             <div className="flex-1">
               <div className="text-sm text-white font-medium">Добавить сервисный тариф</div>
               <div className="text-xs text-slate-400">Защитите свою технику</div>
             </div>
             <ChevronRight size={16} className="text-cyan-400" />
          </div>
        ) : (
          <div className="bg-slate-800 rounded-2xl p-4 flex gap-4 border border-cyan-500/30">
             <div className="bg-cyan-500/20 p-2 h-max rounded-lg"><ShieldCheck size={24} className="text-cyan-400" /></div>
             <div className="flex-1 flex flex-col justify-between">
               <div>
                 <div className="text-sm font-medium text-white">{TARIFFS[selectedPlanInCheckout].title}</div>
                 <div className="text-xs text-slate-400 mt-1">{TARIFFS[selectedPlanInCheckout].price} ₽ / {TARIFFS[selectedPlanInCheckout].period}</div>
               </div>
               <div className="flex justify-between items-end mt-4">
                 <span className="font-bold text-white">+{planPrice.toLocaleString('ru-RU')} ₽</span>
                 <button onClick={() => navigate('/subscribe-pitch')} className="text-cyan-400 text-sm font-medium">Изменить</button>
               </div>
             </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-[60px] left-0 right-0 p-4 bg-slate-900 border-t border-slate-800 z-40 pb-6">
        <div className="flex justify-between mb-4">
          <span className="text-slate-400">Итого:</span>
          <span className="text-xl font-bold text-white">{total.toLocaleString('ru-RU')} ₽</span>
        </div>
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-cyan-500 text-white font-medium py-3.5 rounded-xl hover:bg-cyan-400 transition-colors"
        >
          Перейти к оформлению
        </button>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/pages/Cart.jsx', content);
console.log('Fixed Cart with TARIFFS');
