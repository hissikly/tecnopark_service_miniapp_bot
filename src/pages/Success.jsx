import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, TARIFFS } from '../store';
import { CheckCircle2 } from 'lucide-react';

export function Success() {
  const navigate = useNavigate();
  const { state } = useStore();
  const { subscription } = state;
  const plan = subscription?.plan;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center z-50 animate-in">
      <div className="w-24 h-24 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6 relative">
        <CheckCircle2 size={48} className="text-cyan-400" />
        <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping"></div>
      </div>

      <h1 className="text-2xl font-bold text-white mb-3">Заказ успешно оформлен!</h1>
      <p className="text-slate-400 mb-8 max-w-xs leading-relaxed">
        {plan === 'garantia' && 'Подписка Гарантия+ активирована для вашего нового устройства.'}
        {plan === 'postgarantia' && 'Подписка Постгарантия+ активирована. Ваша техника под расширенной защитой.'}
        {(plan === 'none' || !plan) && 'Спасибо за покупку в Технопарк!'}
      </p>

      <div className="w-full space-y-3 mt-4">
        {(plan === 'garantia' || plan === 'postgarantia') && (
          <button 
            onClick={() => navigate('/profile')}
            className="w-full bg-cyan-500 text-white font-medium py-4 rounded-xl hover:bg-cyan-400 active:scale-95 transition-all"
          >
            Перейти в профиль
          </button>
        )}
        {(plan === 'none' || !plan) && (
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-slate-800 text-white font-medium py-4 rounded-xl hover:bg-slate-700 active:scale-95 transition-all"
          >
            На главную
          </button>
        )}
      </div>
    </div>
  );
}
