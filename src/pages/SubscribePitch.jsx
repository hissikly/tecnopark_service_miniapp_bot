import React from 'react';
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
        <h1 className="text-lg font-medium text-white">Сервисная поддержка</h1>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Выберите уровень поддержки</h2>
          <p className="text-slate-400">Подписка дает дополнительную сервисную поддержку. Гарантия+ и Постгарантия+ — разные тарифы под разные сценарии.</p>
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
