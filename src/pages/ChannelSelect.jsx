import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ArrowLeft, MessageCircle, Video, PhoneCall } from 'lucide-react';

export const ChannelSelect = () => {
  const navigate = useNavigate();
  const { dispatch } = useStore();

  const handleChannel = (channel, route) => {
    dispatch({ type: 'SUPPORT_SET_CHANNEL', payload: channel });
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white p-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pt-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-[#222222] rounded-full active:bg-[#333]">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Выберите способ связи</h1>
      </div>

      {/* Description */}
      <div className="bg-[#222222] rounded-2xl p-4 mb-6 border border-white/5">
        <p className="text-sm text-gray-300 leading-relaxed mb-3">
          <strong className="text-white font-medium">Гарантийный случай:</strong> Бесплатный ремонт или замена в сервисном центре.
        </p>
        <p className="text-sm text-gray-300 leading-relaxed mb-3">
          <strong className="text-white font-medium">Негарантийный:</strong> Ремонт со скидкой по вашей подписке «Гарантия+».
        </p>
        <p className="text-sm text-gray-300 leading-relaxed">
          <strong className="text-white font-medium">Удалённо:</strong> Видеоконсультация с экспертом для решения проблемы без выезда.
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-4">
        <button 
          onClick={() => handleChannel('chat', '/profile/chat')}
          className="w-full bg-[#222222] hover:bg-[#2a2a2a] active:bg-[#333] border border-transparent hover:border-[#00D1FF]/30 p-5 rounded-2xl flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="bg-[#00D1FF]/10 text-[#00D1FF] p-3 rounded-xl group-hover:scale-110 transition-transform">
              <MessageCircle size={28} />
            </div>
            <div className="text-left">
              <span className="block font-bold text-lg mb-1">Чат с экспертом</span>
              <span className="block text-xs text-gray-400">Текст, фото, видео</span>
            </div>
          </div>
        </button>

        <button 
          onClick={() => handleChannel('video', '/profile/video')}
          className="w-full bg-[#222222] hover:bg-[#2a2a2a] active:bg-[#333] border border-transparent hover:border-[#00D1FF]/30 p-5 rounded-2xl flex items-center justify-between transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/5 to-transparent pointer-events-none"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="bg-[#00D1FF] text-black p-3 rounded-xl group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,209,255,0.4)]">
              <Video size={28} />
            </div>
            <div className="text-left">
              <span className="block font-bold text-lg mb-1">Видеоконсультация</span>
              <span className="block text-xs text-gray-400">Быстрое удаленное решение</span>
            </div>
          </div>
          <div className="relative z-10 bg-[#00D1FF] text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Рекомендуем</div>
        </button>

        <button 
          onClick={() => handleChannel('call', '/profile/call')}
          className="w-full bg-[#222222] hover:bg-[#2a2a2a] active:bg-[#333] border border-transparent hover:border-[#00D1FF]/30 p-5 rounded-2xl flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="bg-[#00D1FF]/10 text-[#00D1FF] p-3 rounded-xl group-hover:scale-110 transition-transform">
              <PhoneCall size={28} />
            </div>
            <div className="text-left">
              <span className="block font-bold text-lg mb-1">Обратный звонок</span>
              <span className="block text-xs text-gray-400">Перезвоним в течение 5 минут</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};


