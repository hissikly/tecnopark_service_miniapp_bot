import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ChevronLeft, Phone } from 'lucide-react';

export const PhoneCall = () => {
  const navigate = useNavigate();
  const [requested, setRequested] = useState(false);
  const { dispatch } = useStore();
  const handleDone = () => {
    dispatch({ type: "SUPPORT_ADD_HISTORY" });
    navigate("/profile");
  };

  return (
    <div className="flex flex-col h-full bg-[#0F172A] text-white">
      {/* Header */}
      <header className="flex items-center px-4 py-4 border-b border-white/10 sticky top-0 bg-[#0F172A] z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/70 hover:text-white">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold ml-2">Обратный звонок</h1>
      </header>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col items-center justify-center -mt-10">
        <div className="w-24 h-24 rounded-full bg-cyan-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
          <Phone className="text-cyan-400 w-10 h-10" />
        </div>
        
        {!requested ? (
          <>
            <h2 className="text-2xl font-semibold mb-2">Заказать звонок</h2>
            <p className="text-white/60 text-center mb-8">
              Укажите номер, и наш эксперт перезвонит вам в течение 5 минут.
            </p>
            
            <div className="w-full bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
              <label className="text-white/50 text-sm mb-1 block">Ваш номер телефона</label>
              <input 
                type="tel" 
                defaultValue="+7 (999) 123-45-67" 
                className="w-full bg-transparent text-white text-lg outline-none"
              />
            </div>
            
            <button 
              onClick={() => setRequested(true)}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-[#0F172A] font-semibold py-4 rounded-xl text-lg transition-colors"
            >
              Перезвоните мне
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-2 text-cyan-400">Заявка принята</h2>
            <p className="text-white/60 text-center mb-8">
              Ожидайте звонка от нашего эксперта.
              <br />Примерное время ожидания: <span className="text-white font-medium">3-5 минут</span>.
            </p>
            
            <button 
              onClick={handleDone}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-4 rounded-xl text-lg transition-colors"
            >
              Вернуться в профиль
            </button>
          </>
        )}
      </div>
    </div>
  );
};
