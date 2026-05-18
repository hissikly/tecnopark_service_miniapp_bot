import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ArrowLeft, Send, Paperclip } from 'lucide-react';

export const Chat = () => {
  const navigate = useNavigate();
  const { dispatch } = useStore();
  const handleEnd = () => {
    dispatch({ type: "SUPPORT_ADD_HISTORY" });
    navigate(-1);
  };

  return (
    <div className="h-screen flex flex-col bg-[#141414] text-white">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center gap-3 p-4 border-b border-white/5 bg-[#1a1a1a]/90 backdrop-blur-md">
        <button onClick={handleEnd} className="p-2 bg-[#222222] rounded-full active:bg-[#333]">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold">Поддержка Гарантия+</h1>
          <p className="text-xs text-[#00D1FF]">Эксперт на связи</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* System Message */}
        <div className="flex justify-center text-xs text-gray-500 mb-2">
          <span>Сегодня</span>
        </div>
        
        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-[#222222] rounded-t-2xl rounded-bl-2xl rounded-br-sm p-3 max-w-[80%]">
            <p className="text-sm">Здравствуйте, у меня не включается телевизор.</p>
            <span className="text-[10px] text-gray-500 mt-1 block text-right">14:02</span>
          </div>
        </div>

        {/* Expert Message */}
        <div className="flex justify-start">
          <div className="bg-[#00D1FF]/10 border border-[#00D1FF]/20 rounded-t-2xl rounded-br-2xl rounded-bl-sm p-3 max-w-[80%] text-white">
            <p className="text-sm leading-relaxed">Здравствуйте! Меня зовут Алексей, инженер поддержки. Давайте проверим несколько моментов. Горит ли индикатор питания на самом телевизоре?</p>
            <span className="text-[10px] text-[#00D1FF]/60 mt-1 block text-left">14:03</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 pb-8 bg-[#1a1a1a] border-t border-white/5 flex items-center gap-2">
        <button className="p-3 text-gray-400 hover:text-white transition-colors">
          <Paperclip size={20} />
        </button>
        <div className="flex-1 bg-[#222222] rounded-full px-4 py-3 border border-white/10">
          <input 
            type="text" 
            placeholder="Сообщение..." 
            className="w-full bg-transparent outline-none text-sm placeholder-gray-500"
          />
        </div>
        <button className="p-3 bg-[#00D1FF] text-black rounded-full shadow-[0_0_10px_rgba(0,209,255,0.3)]">
          <Send size={18} className="translate-x-[1px]" />
        </button>
      </div>
    </div>
  );
};


