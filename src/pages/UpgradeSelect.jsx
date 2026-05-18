import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useStore, TARIFFS } from '../store';

export const UpgradeSelect = () => {
  const navigate = useNavigate();
  const { state } = useStore();
  const { subscription } = state;
  const isPost = subscription.plan === 'postgarantia';
  const tariff = TARIFFS[subscription.plan] || {};

  return (
    <div className="min-h-full bg-[#0F172A] text-white flex flex-col pb-20">
      <header className="flex items-center px-4 py-4 border-b border-white/10 sticky top-0 bg-[#0F172A] z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/70 hover:text-white">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold ml-2">Управление тарифом</h1>
      </header>

      <div className="p-4 flex-1">
        {subscription.isActive && (
          <div className="mb-8">
            <h2 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-3">Текущий тариф</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ShieldCheck size={20} className="text-cyan-400" /> {tariff.title}
                </h3>
                <span className="bg-cyan-500/10 text-cyan-400 text-xs px-2 py-1 rounded-md font-medium">Активен</span>
              </div>
              <p className="text-white/60 text-sm mb-4">Действует до {subscription.expiresAt}</p>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors">
                {isPost ? 'Продлить Постгарантия+ на 1 год' : 'Продлить Гарантия+ на 1 месяц'}
              </button>
            </div>
          </div>
        )}

        {!isPost && (
          <div>
            <h2 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-3">Доступно для вас</h2>
            <div 
              onClick={() => navigate('/profile/post-garantia')}
              className="relative overflow-hidden bg-gradient-to-br from-cyan-900/40 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-5 block cursor-pointer transition-all hover:border-cyan-400"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap size={64} />
              </div>
              <h3 className="text-xl font-bold flex items-center gap-2 mb-2 text-cyan-50">
                Постгарантия+
              </h3>
              <p className="text-cyan-100/70 text-sm mb-4 pr-10">
                Для всех ваших устройств Технопарк, включая технику вне гарантии. Безлимитные консультации и бесплатное ТО.
              </p>
              <div className="flex justify-between items-center text-cyan-300 font-medium">
                <span>6 999 ₽ / год</span>
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
