import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MessageSquare, Video, CheckCircle2, Clock, Phone } from 'lucide-react';
import { useStore } from '../store';

export const History = () => {
  const navigate = useNavigate();
  const { state } = useStore();
  const { history } = state;

  const getIcon = (channel) => {
    if (channel === 'video') return Video;
    if (channel === 'call') return Phone;
    return MessageSquare;
  };

  return (
    <div className="min-h-[100dvh] bg-[#0F172A] text-white flex flex-col pb-20">
      <header className="flex items-center px-4 py-4 border-b border-white/10 sticky top-0 bg-[#0F172A] z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/70 hover:text-white">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold ml-2">История обращений</h1>
      </header>

      <div className="p-4 flex-1">
        {history.length === 0 ? (
           <p className="text-white/50 text-center mt-10">Нет обращений</p>
        ) : (
          <div className="space-y-4">
            {history.map(req => {
              const Icon = getIcon(req.channel);
              return (
                <div key={req.id} className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-start gap-4">
                  <div className="p-3 rounded-full bg-white/5 text-white/50">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold">{req.issueType}</h3>
                    </div>
                    <div className="text-sm text-white/50 mb-3">{req.channel === 'video' ? 'Видео' : req.channel === 'call' ? 'Звонок' : 'Чат'} • {new Date(req.date).toLocaleDateString()}</div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <span className="flex items-center gap-1.5 text-[#22c55e]">
                        <CheckCircle2 size={16} color="#22c55e" /> {req.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
