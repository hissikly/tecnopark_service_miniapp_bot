import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ChevronLeft, Check, ShieldAlert } from 'lucide-react';

export const PostGarantia = () => {
  const navigate = useNavigate();
  const { dispatch } = useStore();
  const handleUpgrade = () => {
    dispatch({ type: "UPGRADE_PLAN" });
    navigate("/success");
  };

  const benefits = [
    "Безлимитные видеоконсультации со специалистами",
    "Скидка до 50% на постгарантийный ремонт",
    "Бесплатное техническое обслуживание (до 5 устройств в год)",
    "Выезд мастера на дом в удобное время",
    "Персональный менеджер поддержки 24/7"
  ];

  return (
    <div className="flex flex-col h-full bg-[#0F172A] text-white">
      {/* Header */}
      <header className="flex items-center px-4 py-4 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/70 hover:text-white bg-black/20 rounded-full backdrop-blur-sm">
          <ChevronLeft size={24} />
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 -mt-14">
        {/* Hero Section */}
        <div className="pt-20 pb-10 px-4 bg-gradient-to-b from-cyan-900/40 to-[#0F172A]">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <ShieldAlert className="text-cyan-400" size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Постгарантия+</h1>
          <p className="text-white/60 text-lg">Расширенный тариф для обслуживания нескольких устройств, включая технику после окончания гарантии.</p>
        </div>

        <div className="px-4 py-6 space-y-8">
          {/* Price Box */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex justify-between items-center">
            <div>
              <div className="text-white/60 text-sm mb-1">Стоимость тарифа</div>
              <div className="text-2xl font-bold text-cyan-400">6 999 <span className="text-lg">₽ / год</span></div>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Что входит в тариф</h2>
            <ul className="space-y-4">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start">
                  <div className="mt-0.5 bg-cyan-500/20 p-1 rounded-full text-cyan-400 shrink-0 mr-3">
                    <Check size={16} />
                  </div>
                  <span className="text-white/80 leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="p-4 border-t border-white/10 bg-[#0F172A]/90 backdrop-blur-md sticky bottom-0">
        <button 
          onClick={handleUpgrade}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-[#0F172A] font-semibold py-4 rounded-xl text-lg transition-colors"
        >
          Перейти на Постгарантия+
        </button>
      </div>
    </div>
  );
};
