const fs = require('fs');

// 1. Update ProductCard
fs.writeFileSync('src/pages/ProductCard.jsx', fs.readFileSync('src/pages/ProductCard.jsx', 'utf8')
  .replace("Добавьте Гарантия+", "Выберите сервисную тариф")
  .replace("10 видеоконсультаций, приоритетная поддержка, ремонт", "Гарантия+ (для 1) или Постгарантия+ (для нескольких)")
);

// 2. Update SubscribePitch
fs.writeFileSync('src/pages/SubscribePitch.jsx', `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export const SubscribePitch = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('garantia');

  const handleAddSubscription = () => {
    localStorage.setItem('tp_selected_plan', selectedPlan);
    navigate('/cart', { state: { plan: selectedPlan } });
  };

  const handleSkip = () => {
    localStorage.setItem('tp_selected_plan', 'none');
    navigate('/cart', { state: { plan: 'none' } });
  };

  return (
    <div className="min-h-screen bg-tp-darker text-tp-text p-4 pb-20 overflow-y-auto">
      <div className="max-w-md mx-auto space-y-6 pt-6">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Выберите тариф</h1>
          <p className="text-tp-textMuted text-sm">Сервисная поддержка и помощь после покупки</p>
        </div>

        <div onClick={() => setSelectedPlan('garantia')} className={\`bg-tp-card rounded-2xl p-5 border-2 transition-colors cursor-pointer \${selectedPlan === 'garantia' ? 'border-tp-cyan' : 'border-transparent'}\`}>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold">Гарантия+</h2>
            <div className="text-right">
              <div className="text-xl font-black text-tp-cyan">699 ₽</div>
              <div className="text-xs text-tp-textMuted">/ месяц</div>
            </div>
          </div>
          <p className="text-tp-textMuted text-sm mb-4">Для новой покупки. Защита одного устройства.</p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2 items-center"><ShieldCheck size={16} className="text-tp-cyan"/> 10 видеоконсультаций</li>
            <li className="flex gap-2 items-center"><ShieldCheck size={16} className="text-tp-cyan"/> Скидка на ремонт</li>
          </ul>
        </div>

        <div onClick={() => setSelectedPlan('postgarantia')} className={\`bg-gradient-to-br from-[#1C2433] to-[#122b3b] rounded-2xl p-5 border-2 transition-colors relative cursor-pointer \${selectedPlan === 'postgarantia' ? 'border-tp-cyan' : 'border-transparent'}\`}>
          <div className="absolute -top-3 -right-2 bg-tp-cyan text-tp-darker text-[10px] font-bold px-3 py-1 rounded-full uppercase">Расширенный</div>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold">Постгарантия+</h2>
            <div className="text-right">
              <div className="text-xl font-black text-tp-cyan">6 999 ₽</div>
              <div className="text-xs text-tp-textMuted">/ год</div>
            </div>
          </div>
          <p className="text-tp-textMuted text-sm mb-4">Для клиентов с несколькими устройствами, включая технику вне гарантии.</p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2 items-center"><Zap size={16} className="text-tp-cyan"/> Безлимит консультаций</li>
            <li className="flex gap-2 items-center"><Zap size={16} className="text-tp-cyan"/> Бесплатное ТО (5 устройств)</li>
          </ul>
        </div>

        <div className="space-y-3 mt-8">
          <button onClick={handleAddSubscription} className="w-full bg-tp-cyan text-tp-darker font-bold py-4 rounded-xl flex items-center justify-center gap-2">Выбрать {selectedPlan === 'garantia' ? 'Гарантия+' : 'Постгарантия+'} <ArrowRight size={20} /></button>
          <button onClick={handleSkip} className="w-full bg-tp-darker text-tp-textMuted border border-tp-textMuted/30 font-medium py-3 rounded-xl">Продолжить без подписки</button>
        </div>
      </div>
    </div>
  );
};
export default SubscribePitch;
`);

// 3. Update Cart
let cart = fs.readFileSync('src/pages/Cart.jsx', 'utf8');
cart = cart.replace('Подписка «Гарантия+»', 'Сервисный тариф')
           .replace('10 видеоконсультаций и скидки на ремонт', 'Опция: Гарантия+ (699 ₽) или Постгарантия+ (6 999 ₽)')
           .replace('hasSubscription \n                      ? \'bg-tp-darker text-tp-cyan border border-tp-cyan/30\' \n                      : \'bg-tp-cyan text-tp-darker\'', `hasSubscription ? 'bg-tp-darker text-tp-cyan border border-tp-cyan/30' : 'bg-tp-cyan text-tp-darker'`)
           // simplifying cart logic a bit to point back to pitch
           .replace('setHasSubscription(!hasSubscription)', 'navigate(\'/subscribe-pitch\')')
           .replace('{hasSubscription ? \'Добавлено\' : \'Добавить\'}', `hasSubscription ? 'Изменить' : 'Выбрать тариф'`);
fs.writeFileSync('src/pages/Cart.jsx', cart);

console.log("Updated ProductCard, SubscribePitch, Cart");
