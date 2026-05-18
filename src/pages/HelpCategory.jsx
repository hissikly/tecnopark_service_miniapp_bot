import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ArrowLeft, ChevronRight, PowerOff, Settings2, AlertTriangle, PenTool, Wrench, MessageSquare, MoreHorizontal } from 'lucide-react';

export const HelpCategory = () => {
  const navigate = useNavigate();
  const { dispatch } = useStore();

  const categories = [
    { title: 'Не включается', icon: <PowerOff size={24} /> },
    { title: 'Нужна настройка / подключение', icon: <Settings2 size={24} /> },
    { title: 'Ошибка / сбой', icon: <AlertTriangle size={24} /> },
    { title: 'Вопрос по гарантии', icon: <PenTool size={24} /> },
    { title: 'Нужен ремонт', icon: <Wrench size={24} /> },
    { title: 'Консультация по использованию', icon: <MessageSquare size={24} /> },
    { title: 'Другое', icon: <MoreHorizontal size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-white p-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pt-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-[#222222] rounded-full active:bg-[#333]">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Что случилось?</h1>
      </div>

      <p className="text-gray-400 mb-6 text-sm leading-relaxed">
        Выберите категорию, чтобы мы могли сразу направить вас к нужному специалисту.
      </p>

      {/* Categories */}
      <div className="space-y-3">
        {categories.map((cat, idx) => (
          <div 
            key={idx}
            onClick={() => {
              dispatch({ type: 'SUPPORT_SET_ISSUE', payload: cat.title });
              navigate('/profile/channel');
            }}
            className="bg-[#222222] hover:bg-[#2a2a2a] active:bg-[#333] transition-colors rounded-2xl p-4 flex items-center justify-between cursor-pointer border border-transparent hover:border-white/5"
          >
            <div className="flex items-center gap-4">
              <div className="text-[#00D1FF] bg-[#00D1FF]/10 p-2 rounded-xl">
                {cat.icon}
              </div>
              <span className="font-medium text-lg">{cat.title}</span>
            </div>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        ))}
      </div>
    </div>
  );
};


