import React from 'react';
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
      <div className="fixed bottom-[72px] left-0 right-0 p-4 bg-slate-900 border-t border-slate-800 z-40 pb-6">
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
