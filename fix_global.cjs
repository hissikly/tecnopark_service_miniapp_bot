const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// App.jsx
let appPath = path.join(srcDir, 'App.jsx');
let appCode = fs.readFileSync(appPath, 'utf8');
if (!appCode.includes('StoreProvider')) {
    appCode = appCode.replace("import MainLayout", "import { StoreProvider } from './store';\nimport MainLayout");
    appCode = appCode.replace("<BrowserRouter>", "<StoreProvider>\n    <BrowserRouter>");
    appCode = appCode.replace("</BrowserRouter>", "</BrowserRouter>\n    </StoreProvider>");
    fs.writeFileSync(appPath, appCode);
}

// ProductCard.jsx
let productCardPath = path.join(srcDir, 'pages', 'ProductCard.jsx');
let pcCode = `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export function ProductCard() {
  const navigate = useNavigate();
  const { state } = useStore();
  const { selectedProduct } = state;

  return (
    <div className="pb-24 animate-in">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-300">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-white line-clamp-1">{selectedProduct.title}</h1>
      </div>

      {/* Image */}
      <div className="aspect-square bg-slate-800 flex items-center justify-center p-8">
        <img 
          src={selectedProduct.image} 
          alt={selectedProduct.title}
          className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]"
        />
      </div>

      {/* Info */}
      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{selectedProduct.price.toLocaleString('ru-RU')} ₽</h2>
          <p className="text-slate-400">{selectedProduct.subtitle}</p>
        </div>

        {/* Subscription Offer */}
        <div 
          onClick={() => navigate('/subscribe-pitch')}
          className="bg-slate-800/50 border border-cyan-500/30 rounded-2xl p-4 flex items-start gap-4 active:scale-[0.98] transition-transform cursor-pointer"
        >
          <div className="bg-cyan-500/20 p-2 rounded-xl text-cyan-400">
            <ShieldCheck size={28} />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium mb-1">Сервисные услуги и гарантия</h3>
            <p className="text-sm text-slate-400 mb-2">Выберите тарифный план для максимальной защиты и комфортной поддержки новой техники.</p>
            <span className="text-cyan-400 text-sm font-medium">Подробнее</span>
          </div>
        </div>

        {/* Fake sections */}
        <div className="space-y-4 pt-4">
          <div className="h-64 bg-slate-800/30 rounded-2xl border border-slate-700/50 p-4">
            <div className="w-1/3 h-5 bg-slate-700 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-slate-800 rounded"></div>
              <div className="w-5/6 h-4 bg-slate-800 rounded"></div>
              <div className="w-4/6 h-4 bg-slate-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Button */}
      <div className="fixed bottom-[60px] left-0 right-0 p-4 bg-slate-900 border-t border-slate-800 z-40 pb-6">
        <button 
          onClick={() => navigate('/cart')}
          className="w-full bg-cyan-500 text-white font-medium py-3.5 rounded-xl hover:bg-cyan-400 transition-colors"
        >
          В корзину
        </button>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(productCardPath, pcCode);

// SubscribePitch.jsx
let spPath = path.join(srcDir, 'pages', 'SubscribePitch.jsx');
let spCode = `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';

export function SubscribePitch() {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  const handleSelect = (plan) => {
    dispatch({ type: 'SET_PLAN', payload: plan });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-slate-900 pb-24 animate-in">
      <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-300">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-white">Сервисные услуги</h1>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Выберите уровень поддержки</h2>
          <p className="text-slate-400">Техника Технопарк — это уверенность, а наши сервисы делают её абсолютной.</p>
        </div>

        <div className="space-y-4">
          
          {/* Garantia */}
          <div onClick={() => handleSelect('garantia')} className="bg-slate-800 rounded-2xl border border-slate-700 p-5 cursor-pointer hover:border-cyan-500/50 transition-colors">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <h3 className="text-xl font-medium text-white text-cyan-400">Гарантия+</h3>
                   <span className="text-sm text-slate-400">Для вашей новой покупки</span>
                </div>
                <div className="text-right">
                   <div className="text-lg font-medium text-white">699 ₽</div>
                   <div className="text-xs text-slate-400">в месяц</div>
                </div>
             </div>
             <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-cyan-500" /> 10 видеоконсультаций
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-cyan-500" /> Приоритетное обслуживание
                </li>
             </ul>
             <button className="w-full py-2 bg-slate-700 text-white rounded-lg">Выбрать</button>
          </div>

          {/* PostGarantia */}
          <div onClick={() => handleSelect('postgarantia')} className="bg-slate-800 rounded-2xl border border-cyan-500 p-5 cursor-pointer relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-cyan-500 text-xs font-bold px-3 py-1 rounded-bl-lg text-white">СУПЕР ПАКЕТ</div>
             <div className="flex justify-between items-start mb-4">
                <div>
                   <h3 className="text-xl font-medium text-white text-cyan-400">Постгарантия+</h3>
                   <span className="text-sm text-slate-400">Расширенный тариф для всех устройств</span>
                </div>
                <div className="text-right">
                   <div className="text-lg font-medium text-white">6 999 ₽</div>
                   <div className="text-xs text-slate-400">в год</div>
                </div>
             </div>
             <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-cyan-500" /> Безлимит консультаций
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-cyan-500" /> Скидки на ремонт
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-cyan-500" /> Бесплатное ТО до 5 устройств
                </li>
             </ul>
             <button className="w-full py-2 bg-cyan-500 text-white rounded-lg font-medium">Выбрать</button>
          </div>

        </div>

        <button onClick={() => handleSelect('none')} className="w-full py-3 text-slate-400 text-sm font-medium hover:text-white transition-colors">
           Продолжить без подписки
        </button>

      </div>
    </div>
  );
}
`;
fs.writeFileSync(spPath, spCode);

let cartPath = path.join(srcDir, 'pages', 'Cart.jsx');
let cartCode = `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ArrowLeft, Trash2, ShieldCheck, ChevronRight } from 'lucide-react';

export function Cart() {
  const navigate = useNavigate();
  const { state } = useStore();
  const { selectedProduct, selectedPlan } = state;

  const planPrice = selectedPlan === 'garantia' ? 699 : (selectedPlan === 'postgarantia' ? 6999 : 0);
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
        {selectedPlan === 'none' ? (
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
                 <div className="text-sm font-medium text-white">{selectedPlan === 'garantia' ? 'Подписка Гарантия+' : 'Подписка Постгарантия+'}</div>
                 <div className="text-xs text-slate-400 mt-1">{selectedPlan === 'garantia' ? '699 ₽ / месяц' : '6999 ₽ / год'}</div>
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
fs.writeFileSync(cartPath, cartCode);

let mlPath = path.join(srcDir, 'layouts', 'MainLayout.jsx');
let mlCode = `import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User } from 'lucide-react';

export default function MainLayout() {
  const location = useLocation();
  const isFullScreen = ['/success', '/profile/chat', '/profile/video', '/profile/call'].includes(location.pathname);

  return (
    <div className="min-h-[100dvh] bg-slate-900 text-slate-50 flex flex-col mx-auto max-w-md relative pb-safe">
      <main className="flex-1 w-full flex flex-col selection:bg-cyan-500/30">
        <Outlet />
      </main>

      {!isFullScreen && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 z-50 px-6 py-2 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div className="flex justify-between items-center">
            <NavLink to="/" className={({isActive}) => \`flex flex-col items-center gap-1 \${isActive ? 'text-cyan-500' : 'text-slate-500'}\`}>
              <Home size={22} className={({isActive}) => isActive ? "fill-cyan-500/20" : ""} />
              <span className="text-[10px] font-medium">Главная</span>
            </NavLink>
            <NavLink to="/catalog" className={({isActive}) => \`flex flex-col items-center gap-1 \${isActive ? 'text-cyan-500' : 'text-slate-500'}\`}>
              <Search size={22} />
              <span className="text-[10px] font-medium">Каталог</span>
            </NavLink>
            <NavLink to="/cart" className={({isActive}) => \`flex flex-col items-center gap-1 \${isActive ? 'text-cyan-500' : 'text-slate-500'}\`}>
              <ShoppingCart size={22} />
              <span className="text-[10px] font-medium">Корзина</span>
            </NavLink>
            <NavLink to="/profile" className={({isActive}) => \`flex flex-col items-center gap-1 \${isActive ? 'text-cyan-500' : 'text-slate-500'}\`}>
              <User size={22} />
              <span className="text-[10px] font-medium">Профиль</span>
            </NavLink>
          </div>
        </nav>
      )}
    </div>
  );
}`;
fs.writeFileSync(mlPath, mlCode);

let profPath = path.join(srcDir, 'pages', 'Profile.jsx');
let profCode = `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Settings, ShieldCheck, CreditCard, Heart, MapPin, ChevronRight, MessageSquareHeadset } from 'lucide-react';

export function Profile() {
  const navigate = useNavigate();
  const { state } = useStore();
  const { subscription } = state;

  return (
    <div className="pb-28 min-h-screen bg-slate-900">
      {/* Header */}
      <div className="px-4 py-6 bg-slate-800 rounded-b-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Профиль</h1>
          <button className="text-slate-400 p-2"><Settings size={22} /></button>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-xl font-bold">И</div>
          <div>
            <div className="text-lg font-medium text-white">Иван Иванов</div>
            <div className="text-sm text-slate-400">+7 999 123-45-67</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 -mt-2">
        {/* Subscription Card */}
        {subscription.isActive ? (
          <div 
            onClick={() => navigate('/profile/subscription')}
            className="bg-gradient-to-br from-cyan-900/40 to-slate-800 border border-cyan-500/30 rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:scale-95 transition-transform"
          >
            <div className="bg-cyan-500/20 p-2.5 rounded-xl"><ShieldCheck size={28} className="text-cyan-400" /></div>
            <div className="flex-1">
              <div className="text-xs text-cyan-400 font-medium uppercase tracking-wider mb-1">Активно</div>
              <h3 className="text-white font-medium">{subscription.plan === 'garantia' ? 'Гарантия+' : 'Постгарантия+'}</h3>
            </div>
            <ChevronRight className="text-slate-500" />
          </div>
        ) : (
          <div 
            onClick={() => navigate('/subscribe-pitch')}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-4 cursor-pointer"
          >
            <div className="bg-slate-700 p-2.5 rounded-xl"><ShieldCheck size={28} className="text-slate-400" /></div>
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">Подключить сервис</h3>
              <div className="text-xs text-slate-400">Специальные тарифы Технопарка</div>
            </div>
            <ChevronRight className="text-slate-500" />
          </div>
        )}

        {/* City */}
         <div className="bg-slate-800 rounded-2xl p-4 flex items-center justify-between mt-2">
           <div className="flex items-center gap-3">
             <MapPin className="text-slate-400" size={20} />
             <span className="text-slate-300 text-sm">Ваш город</span>
           </div>
           <div className="flex items-center gap-2">
             <span className="text-white font-medium text-sm">Москва</span>
             <ChevronRight size={16} className="text-slate-500" />
           </div>
         </div>

         {/* Menus */}
         <div className="bg-slate-800 rounded-2xl overflow-hidden mt-2">
            {[
              { icon: CreditCard, label: 'Мои карты и бонусы' },
              { icon: Heart, label: 'Избранное' },
              { icon: MessageSquareHeadset, label: 'История обращений', route: '/profile/history' }
            ].map((item, i) => (
              <div 
                key={i} 
                className={"flex items-center justify-between p-4 cursor-pointer hover:bg-slate-700/50 " + (i !== 0 ? "border-t border-slate-700/50" : "")}
                onClick={() => item.route && navigate(item.route)}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="text-slate-400" size={20} />
                  <span className="text-slate-300 text-sm">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-slate-500" />
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}`;
fs.writeFileSync(profPath, profCode);

let succPath = path.join(srcDir, 'pages', 'Success.jsx');
let succCode = `import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { CheckCircle2 } from 'lucide-react';

export function Success() {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const { selectedPlan } = state;

  useEffect(() => {
    dispatch({ type: 'ACTIVATE_SUBSCRIPTION' });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center z-50 animate-in">
      <div className="w-24 h-24 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6 relative">
        <CheckCircle2 size={48} className="text-cyan-400" />
        <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping"></div>
      </div>

      <h1 className="text-2xl font-bold text-white mb-3">Заказ успешно оформлен!</h1>
      <p className="text-slate-400 mb-8 max-w-xs leading-relaxed">
        {selectedPlan === 'garantia' && 'Подписка Гарантия+ активирована. Техника в безопасности!'}
        {selectedPlan === 'postgarantia' && 'Подписка Постгарантия+ активирована. Все устройства теперь под защитой!'}
        {selectedPlan === 'none' && 'Спасибо за покупку в Технопарк!'}
      </p>

      <div className="w-full space-y-3 mt-4">
        {selectedPlan !== 'none' && (
          <button 
            onClick={() => navigate('/profile/subscription')}
            className="w-full bg-cyan-500 text-white font-medium py-4 rounded-xl hover:bg-cyan-400 active:scale-95 transition-all"
          >
            Управление подпиской
          </button>
        )}
        <button 
          onClick={() => navigate('/profile')}
          className="w-full bg-slate-800 text-white font-medium py-4 rounded-xl hover:bg-slate-700 active:scale-95 transition-all"
        >
          Перейти в профиль
        </button>
      </div>
    </div>
  );
}`;
fs.writeFileSync(succPath, succCode);
