const fs = require('fs');

let content = fs.readFileSync('src/pages/Profile.jsx', 'utf-8');
content = `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, TARIFFS } from '../store';
import { Settings, ShieldCheck, CreditCard, Heart, MapPin, ChevronRight, MessageCircle } from 'lucide-react';

export function Profile() {
  const navigate = useNavigate();
  const { state } = useStore();
  const { activeSubscription } = state;
  const isSubActive = activeSubscription?.isActive;

  return (
    <div className="pb-28 min-h-screen bg-slate-900">
      <div className="px-4 py-6 bg-slate-800 rounded-b-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Профиль</h1>
          <button className="text-slate-400 p-2"><Settings size={22} /></button>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-xl font-bold">И</div>
          <div>
            <div className="text-lg font-medium text-white">Иван Иванов</div>
            <div className="text-sm text-slate-400">+7 999 123-45-67</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 -mt-2">
        {isSubActive ? (
          <div 
            onClick={() => navigate('/profile/subscription')}
            className="bg-gradient-to-br from-cyan-900/40 to-slate-800 border border-cyan-500/30 rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:scale-95 transition-transform"
          >
            <div className="bg-cyan-500/20 p-2.5 rounded-xl"><ShieldCheck size={28} className="text-cyan-400" /></div>
            <div className="flex-1">
              <div className="text-xs text-cyan-400 font-medium uppercase tracking-wider mb-1">Активен тариф</div>
              <h3 className="text-white font-medium">{TARIFFS[activeSubscription.planId].title}</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px] truncate">{TARIFFS[activeSubscription.planId].description}</p>
            </div>
            <ChevronRight className="text-slate-500" />
          </div>
        ) : (
          <div 
            onClick={() => navigate('/subscribe-pitch')}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-4 cursor-pointer"
          >
            <div className="bg-slate-700 p-2.5 rounded-xl"><ShieldCheck size={28} className="text-slate-400" /></div>
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1">Специальные тарифы</h3>
              <div className="text-xs text-slate-400">Сервисная поддержка Технопарка</div>
            </div>
            <ChevronRight className="text-slate-500" />
          </div>
        )}

         <div className="bg-slate-800 rounded-2xl overflow-hidden mt-4">
            {[
              { icon: MessageCircle, label: 'История обращений', route: '/profile/history' }
            ].map((item, i) => (
              <div 
                key={i} 
                className={"flex items-center justify-between p-4 cursor-pointer hover:bg-slate-700/50"}
                onClick={() => item.route && navigate(item.route)}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="text-slate-400" size={20} />
                  <span className="text-slate-300 text-sm">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-slate-500" />
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
`
fs.writeFileSync('src/pages/Profile.jsx', content);
console.log('Fixed Profile.jsx');
